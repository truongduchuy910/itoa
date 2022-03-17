const { gen, sampleOne } = require('testcheck');
const { Text, Relationship } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');

const alphanumGenerator = gen.alphaNumString.notEmpty();

const createInitialData = async itoa => {
  const { data, errors } = await itoa.executeGraphQL({
    query: `
      mutation {
        createUsers(data: [
          { data: { name: "${sampleOne(alphanumGenerator)}" } },
          { data: { name: "${sampleOne(alphanumGenerator)}" } },
          { data: { name: "${sampleOne(alphanumGenerator)}" } }
        ]) { id }
      }`,
  });
  expect(errors).toBe(undefined);
  return { users: data.createUsers };
};

const createUserAndFriend = async itoa => {
  const {
    data: { createUser },
    errors,
  } = await itoa.executeGraphQL({
    query: `
      mutation {
        createUser(data: {
          friends: { create: [{ name: "${sampleOne(alphanumGenerator)}" }] }
        }) { id friends { id } }
      }`,
  });
  expect(errors).toBe(undefined);
  const { User, Friend } = await getUserAndFriend(itoa, createUser.id, createUser.friends[0].id);

  // Sanity check the links are setup correctly
  expect(User.friends.map(({ id }) => id.toString())).toStrictEqual([Friend.id.toString()]);

  return { user: createUser, friend: createUser.friends[0] };
};

const getUserAndFriend = async (itoa, userId, friendId) => {
  const { data } = await itoa.executeGraphQL({
    query: `
      {
        User(where: { id: "${userId}"} ) { id friends { id } }
        Friend: User(where: { id: "${friendId}"} ) { id }
      }`,
  });
  return data;
};

const createReadData = async itoa => {
  // create locations [A, A, B, B, C, C];
  const { data, errors } = await itoa.executeGraphQL({
    query: `mutation create($users: [UsersCreateInput]) { createUsers(data: $users) { id name } }`,
    variables: {
      users: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E'].map(name => ({ data: { name } })),
    },
  });
  expect(errors).toBe(undefined);
  const { createUsers } = data;
  await Promise.all(
    [
      [0, 1, 2, 3, 4, 5], //  -> (A1) -> [A, A, B, B, C, C]
      [0, 2, 4], //  -> (A2) -> [A, B, C]
      [0, 1], //  -> (B1) -> [A, A]
      [0, 2], //  -> (B2) -> [A, B]
      [0, 4], //  ->  (C1) -> [A, C]
      [2, 3], //  ->  (C2) -> [B, B]
      [0], //  -> (D1) -> [A]
      [2], //  -> (D2) -> [B]
      [], //  ->  (E1) -> []
    ].map(async (locationIdxs, j) => {
      const ids = locationIdxs.map(i => ({ id: createUsers[i].id }));
      const { data, errors } = await itoa.executeGraphQL({
        query: `mutation update($friends: [UserWhereUniqueInput], $user: ID!) { updateUser(id: $user data: {
    friends: { connect: $friends }
  }) { id friends { name }}}`,
        variables: { friends: ids, user: createUsers[j].id },
      });
      expect(errors).toBe(undefined);
      return data.updateUser;
    })
  );
};

const setupItoa = adapterName =>
  setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('User', {
        fields: {
          name: { type: Text },
          friends: { type: Relationship, ref: 'User', many: true },
        },
      });
    },
  });

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe(`Many-to-many relationships`, () => {
      describe('Read', () => {
        test(
          '_some',
          runner(setupItoa, async ({ itoa }) => {
            await createReadData(itoa);
            await Promise.all(
              [
                ['A', 6],
                ['B', 5],
                ['C', 3],
                ['D', 0],
              ].map(async ([name, count]) => {
                const { data, errors } = await itoa.executeGraphQL({
                  query: `{ allUsers(where: { friends_some: { name: "${name}"}}) { id }}`,
                });
                expect(errors).toBe(undefined);
                expect(data.allUsers.length).toEqual(count);
              })
            );
          })
        );
        test(
          '_none',
          runner(setupItoa, async ({ itoa }) => {
            await createReadData(itoa);
            await Promise.all(
              [
                ['A', 3],
                ['B', 4],
                ['C', 6],
                ['D', 9],
              ].map(async ([name, count]) => {
                const { data, errors } = await itoa.executeGraphQL({
                  query: `{ allUsers(where: { friends_none: { name: "${name}"}}) { id }}`,
                });
                expect(errors).toBe(undefined);
                expect(data.allUsers.length).toEqual(count);
              })
            );
          })
        );
        test(
          '_every',
          runner(setupItoa, async ({ itoa }) => {
            await createReadData(itoa);
            await Promise.all(
              [
                ['A', 3],
                ['B', 3],
                ['C', 1],
                ['D', 1],
              ].map(async ([name, count]) => {
                const { data, errors } = await itoa.executeGraphQL({
                  query: `{ allUsers(where: { friends_every: { name: "${name}"}}) { id }}`,
                });
                expect(errors).toBe(undefined);
                expect(data.allUsers.length).toEqual(count);
              })
            );
          })
        );
      });

      describe('Count', () => {
        test(
          'Count',
          runner(setupItoa, async ({ itoa }) => {
            await createInitialData(itoa);
            const { data, errors } = await itoa.executeGraphQL({
              query: `
                {
                  _allUsersMeta { count }
                }
            `,
            });
            expect(errors).toBe(undefined);
            expect(data._allUsersMeta.count).toEqual(3);
          })
        );
      });

      describe('Create', () => {
        test(
          'With connect',
          runner(setupItoa, async ({ itoa }) => {
            const { users } = await createInitialData(itoa);
            const user = users[0];
            const { data, errors } = await itoa.executeGraphQL({
              query: `
                mutation {
                  createUser(data: {
                    friends: { connect: [{ id: "${user.id}" }] }
                  }) { id friends { id } }
                }
            `,
            });
            expect(errors).toBe(undefined);
            expect(data.createUser.friends.map(({ id }) => id.toString())).toEqual([user.id]);

            const { User, Friend } = await getUserAndFriend(itoa, data.createUser.id, user.id);
            // Everything should now be connected
            expect(User.friends.map(({ id }) => id.toString())).toEqual([Friend.id.toString()]);
          })
        );

        test(
          'With create',
          runner(setupItoa, async ({ itoa }) => {
            const friendName = sampleOne(alphanumGenerator);
            const { data, errors } = await itoa.executeGraphQL({
              query: `
                mutation {
                  createUser(data: {
                    friends: { create: [{ name: "${friendName}" }] }
                  }) { id friends { id } }
                }
            `,
            });
            expect(errors).toBe(undefined);

            const { User, Friend } = await getUserAndFriend(
              itoa,
              data.createUser.id,
              data.createUser.friends[0].id
            );

            // Everything should now be connected
            expect(User.friends.map(({ id }) => id.toString())).toEqual([Friend.id.toString()]);
          })
        );
      });

      describe('Update', () => {
        test(
          'With connect',
          runner(setupItoa, async ({ itoa }) => {
            // Manually setup a connected Company <-> Location
            const { user, friend } = await createUserAndFriend(itoa);

            // Sanity check the links don't yet exist
            // `...not.toBe(expect.anything())` allows null and undefined values
            expect(user.friends).not.toBe(expect.anything());

            const { errors } = await itoa.executeGraphQL({
              query: `
                mutation {
                  updateUser(
                    id: "${user.id}",
                    data: { friends: { connect: [{ id: "${friend.id}" }] } }
                  ) { id friends { id } } }
            `,
            });
            expect(errors).toBe(undefined);

            const { User, Friend } = await getUserAndFriend(itoa, user.id, friend.id);
            // Everything should now be connected
            expect(User.friends.map(({ id }) => id.toString())).toEqual([Friend.id.toString()]);
          })
        );

        test(
          'With create',
          runner(setupItoa, async ({ itoa }) => {
            const { users } = await createInitialData(itoa);
            let user = users[0];
            const friendName = sampleOne(alphanumGenerator);
            const { data, errors } = await itoa.executeGraphQL({
              query: `
                mutation {
                  updateUser(
                    id: "${user.id}",
                    data: { friends: { create: [{ name: "${friendName}" }] } }
                  ) { id friends { id name } }
                }
            `,
            });
            expect(errors).toBe(undefined);

            const { User, Friend } = await getUserAndFriend(
              itoa,
              user.id,
              data.updateUser.friends[0].id
            );

            // Everything should now be connected
            expect(User.friends.map(({ id }) => id.toString())).toEqual([Friend.id.toString()]);
          })
        );

        test(
          'With disconnect',
          runner(setupItoa, async ({ itoa }) => {
            // Manually setup a connected Company <-> Location
            const { user, friend } = await createUserAndFriend(itoa);

            // Run the query to disconnect the location from company
            const { data, errors } = await itoa.executeGraphQL({
              query: `
                mutation {
                  updateUser(
                    id: "${user.id}",
                    data: { friends: { disconnect: [{ id: "${friend.id}" }] } }
                  ) { id friends { id name } }
                }
            `,
            });
            expect(errors).toBe(undefined);
            expect(data.updateUser.id).toEqual(user.id);
            expect(data.updateUser.friends).toEqual([]);

            // Check the link has been broken
            const result = await getUserAndFriend(itoa, user.id, friend.id);
            expect(result.User.friends).toEqual([]);
          })
        );

        test(
          'With disconnectAll',
          runner(setupItoa, async ({ itoa }) => {
            // Manually setup a connected Company <-> Location
            const { user, friend } = await createUserAndFriend(itoa);

            // Run the query to disconnect the location from company
            const { data, errors } = await itoa.executeGraphQL({
              query: `
                mutation {
                  updateUser(
                    id: "${user.id}",
                    data: { friends: { disconnectAll: true } }
                  ) { id friends { id name } }
                }
            `,
            });
            expect(errors).toBe(undefined);
            expect(data.updateUser.id).toEqual(user.id);
            expect(data.updateUser.friends).toEqual([]);

            // Check the link has been broken
            const result = await getUserAndFriend(itoa, user.id, friend.id);
            expect(result.User.friends).toEqual([]);
          })
        );
      });

      describe('Delete', () => {
        test(
          'delete',
          runner(setupItoa, async ({ itoa }) => {
            // Manually setup a connected Company <-> Location
            const { user, friend } = await createUserAndFriend(itoa);

            // Run the query to disconnect the location from company
            const { data, errors } = await itoa.executeGraphQL({
              query: `mutation { deleteUser(id: "${user.id}") { id } } `,
            });
            expect(errors).toBe(undefined);
            expect(data.deleteUser.id).toBe(user.id);

            // Check the link has been broken
            const result = await getUserAndFriend(itoa, user.id, friend.id);
            expect(result.User).toBe(null);
          })
        );
      });
    });
  })
);
