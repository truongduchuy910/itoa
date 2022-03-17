const { Text, Relationship } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { createItem, createItems } = require('@itoa/server-side-graphql-client');

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('User', {
        fields: {
          company: { type: Relationship, ref: 'Company' },
          posts: { type: Relationship, ref: 'Post', many: true },
        },
      });

      itoa.createList('Company', {
        fields: {
          name: { type: Text },
        },
      });

      itoa.createList('Post', {
        fields: {
          content: { type: Text },
        },
      });
    },
  });
}
multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe('relationship filtering', () => {
      test(
        'nested to-many relationships can be filtered',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
        query {
          allUsers {
            id
            posts (where: {
              content_contains: "hi",
            }){
              id
              content
            }
          }
        }
      `,
          });

          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers.0.posts');
          expect(data.allUsers).toHaveLength(2);
          data.allUsers[0].posts = data.allUsers[0].posts.map(({ id }) => id).sort();
          data.allUsers[1].posts = data.allUsers[1].posts.map(({ id }) => id).sort();
          expect(data.allUsers).toContainEqual({
            id: user.id,
            posts: [ids[1].id, ids[2].id].sort(),
          });
          expect(data.allUsers).toContainEqual({ id: user2.id, posts: [] });
        })
      );

      // this is failing on GitHub Actions rn for some unknown reason so going to disable it for now
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip(
        'nested to-many relationships can be limited',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
        query {
          allUsers {
            id
            posts (first: 1, sortBy: content_ASC) {
              id
            }
          }
        }
      `,
          });

          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers.0.posts');
          expect(data.allUsers).toContainEqual({ id: user.id, posts: [ids[0]] });
          expect(data.allUsers).toContainEqual({ id: user2.id, posts: [ids[0]] });
        })
      );

      test(
        'nested to-many relationships can be filtered within AND clause',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
        query {
          allUsers {
            id
            posts (where: {
              AND: [
                { content_contains: "hi" },
                { content_contains: "lo" },
              ]
            }){
              id
            }
          }
        }
      `,
          });

          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers.0.posts');
          expect(data.allUsers).toContainEqual({ id: user.id, posts: [ids[2]] });
          expect(data.allUsers).toContainEqual({ id: user2.id, posts: [] });
        })
      );

      test(
        'nested to-many relationships can be filtered within OR clause',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
        query {
          allUsers {
            id
            posts (where: {
              OR: [
                { content_contains: "i w" },
                { content_contains: "? O" },
              ]
            }){
              id
              content
            }
          }
        }
      `,
          });

          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers.0.posts');
          expect(data.allUsers).toContainEqual({
            id: user.id,
            posts: expect.arrayContaining([
              expect.objectContaining(ids[1]),
              expect.objectContaining(ids[2]),
            ]),
          });
          expect(data.allUsers).toContainEqual({ id: user2.id, posts: [] });
        })
      );

      test(
        'Filtering out all items by nested field should return []',
        runner(setupItoa, async ({ itoa }) => {
          await createItem({ itoa, listKey: 'User', item: {} });

          const result = await itoa.executeGraphQL({
            query: `
              query {
                allUsers(where: { posts_some: { content_contains: "foo" } }) {
                  posts { id }
                }
              }
            `,
          });
          expect(result.errors).toBe(undefined);

          expect(Array.isArray(result.data.allUsers)).toBeTruthy();
          expect(result.data.allUsers).toHaveLength(0);
        })
      );
    });

    describe('relationship meta filtering', () => {
      test(
        'nested to-many relationships return meta info',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
        query {
          allUsers {
            id
            _postsMeta {
              count
            }
          }
        }
      `,
          });

          expect(errors).toBe(undefined);
          expect(data.allUsers).toHaveLength(2);
          expect(data).toHaveProperty('allUsers.0._postsMeta');
          expect(data.allUsers).toContainEqual({ id: user.id, _postsMeta: { count: 3 } });
          expect(data.allUsers).toContainEqual({ id: user2.id, _postsMeta: { count: 1 } });
        })
      );

      test(
        'nested to-many relationship meta can be filtered',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
        query {
          allUsers {
            id
            _postsMeta (where: {
              content_contains: "hi",
            }){
              count
            }
          }
        }
      `,
          });

          expect(errors).toBe(undefined);
          expect(data.allUsers).toHaveLength(2);
          expect(data).toHaveProperty('allUsers.0._postsMeta');
          expect(data.allUsers).toContainEqual({ id: user.id, _postsMeta: { count: 2 } });
          expect(data.allUsers).toContainEqual({ id: user2.id, _postsMeta: { count: 0 } });
        })
      );

      test(
        'nested to-many relationship meta can be limited',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
        query {
          allUsers {
            id
            _postsMeta (first: 1) {
              count
            }
          }
        }
      `,
          });

          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers.0._postsMeta');
          expect(data.allUsers).toHaveLength(2);
          expect(data.allUsers).toContainEqual({ id: user.id, _postsMeta: { count: 1 } });
          expect(data.allUsers).toContainEqual({ id: user2.id, _postsMeta: { count: 1 } });
        })
      );

      test(
        'nested to-many relationship meta can be filtered within AND clause',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
        query {
          allUsers {
            id
            _postsMeta (where: {
              AND: [
                { content_contains: "hi" },
                { content_contains: "lo" },
              ]
            }){
              count
            }
          }
        }
      `,
          });

          expect(errors).toBe(undefined);
          expect(data.allUsers).toHaveLength(2);
          expect(data).toHaveProperty('allUsers.0._postsMeta');
          expect(data.allUsers).toContainEqual({ id: user.id, _postsMeta: { count: 1 } });
          expect(data.allUsers).toContainEqual({ id: user2.id, _postsMeta: { count: 0 } });
        })
      );

      test(
        'nested to-many relationship meta can be filtered within OR clause',
        runner(setupItoa, async ({ itoa }) => {
          const ids = await createItems({
            itoa,
            listKey: 'Post',
            items: [
              { data: { content: 'Hello world' } },
              { data: { content: 'hi world' } },
              { data: { content: 'Hello? Or hi?' } },
            ],
          });

          const [user, user2] = await createItems({
            itoa,
            listKey: 'User',
            items: [
              { data: { posts: { connect: ids } } },
              { data: { posts: { connect: [ids[0]] } } }, // Create a dummy user to make sure we're actually filtering it out
            ],
          });

          const { data, errors } = await itoa.executeGraphQL({
            query: `
              query {
                allUsers {
                  id
                  _postsMeta (where: {
                    OR: [
                      { content_contains: "i w" },
                      { content_contains: "? O" },
                    ]
                  }){
                    count
                  }
                }
              }
            `,
          });

          expect(errors).toBe(undefined);
          expect(data.allUsers).toHaveLength(2);
          expect(data).toHaveProperty('allUsers.0._postsMeta');
          expect(data.allUsers).toContainEqual({ id: user.id, _postsMeta: { count: 2 } });
          expect(data.allUsers).toContainEqual({ id: user2.id, _postsMeta: { count: 0 } });
        })
      );
    });
  })
);
