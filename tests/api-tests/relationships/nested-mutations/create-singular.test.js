const { gen, sampleOne } = require('testcheck');
const { Text, Relationship } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { createItem, getItem } = require('@itoa/server-side-graphql-client');

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('Group', {
        fields: {
          name: { type: Text },
        },
      });

      itoa.createList('Event', {
        fields: {
          title: { type: Text },
          group: { type: Relationship, ref: 'Group' },
        },
      });

      itoa.createList('GroupNoRead', {
        fields: {
          name: { type: Text },
        },
        access: {
          read: () => false,
        },
      });

      itoa.createList('EventToGroupNoRead', {
        fields: {
          title: { type: Text },
          group: { type: Relationship, ref: 'GroupNoRead' },
        },
      });

      itoa.createList('GroupNoReadHard', {
        fields: { name: { type: Text } },
        access: { read: false },
      });

      itoa.createList('EventToGroupNoReadHard', {
        fields: {
          title: { type: Text },
          group: { type: Relationship, ref: 'GroupNoReadHard' },
        },
      });

      itoa.createList('GroupNoCreate', {
        fields: {
          name: { type: Text },
        },
        access: {
          create: () => false,
        },
      });

      itoa.createList('EventToGroupNoCreate', {
        fields: {
          title: { type: Text },
          group: { type: Relationship, ref: 'GroupNoCreate' },
        },
      });

      itoa.createList('GroupNoCreateHard', {
        fields: { name: { type: Text } },
        access: { create: false },
      });

      itoa.createList('EventToGroupNoCreateHard', {
        fields: {
          title: { type: Text },
          group: { type: Relationship, ref: 'GroupNoCreateHard' },
        },
      });

      itoa.createList('GroupNoUpdate', {
        fields: { name: { type: Text } },
        access: { update: () => false },
      });

      itoa.createList('EventToGroupNoUpdate', {
        fields: {
          title: { type: Text },
          group: { type: Relationship, ref: 'GroupNoUpdate' },
        },
      });

      itoa.createList('GroupNoUpdateHard', {
        fields: { name: { type: Text } },
        access: { update: false },
      });

      itoa.createList('EventToGroupNoUpdateHard', {
        fields: {
          title: { type: Text },
          group: { type: Relationship, ref: 'GroupNoUpdateHard' },
        },
      });
    },
  });
}
multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe('no access control', () => {
      test(
        'create nested from within create mutation',
        runner(setupItoa, async ({ itoa }) => {
          const groupName = sampleOne(gen.alphaNumString.notEmpty());

          // Create an item that does the nested create
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                createEvent(data: {
                  title: "A thing",
                  group: { create: { name: "${groupName}" } }
                }) {
                  id
                  group {
                    id
                    name
                  }
                }
              }`,
          });

          expect(errors).toBe(undefined);
          expect(data).toMatchObject({
            createEvent: {
              id: expect.any(String),
              group: { id: expect.any(String), name: groupName },
            },
          });

          const {
            data: { Group },
            errors: errors2,
          } = await itoa.executeGraphQL({
            query: `
              query {
                Group(where: { id: "${data.createEvent.group.id}" }) {
                  id
                  name
                }
              }`,
          });
          expect(errors2).toBe(undefined);
          expect(Group).toMatchObject({ id: data.createEvent.group.id, name: groupName });
        })
      );

      test(
        'create nested from within update mutation',
        runner(setupItoa, async ({ itoa }) => {
          const groupName = sampleOne(gen.alphaNumString.notEmpty());

          // Create an item to update
          const createEvent = await createItem({
            itoa,
            listKey: 'Event',
            item: { title: 'A thing' },
          });

          // Update an item that does the nested create
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                updateEvent(
                  id: "${createEvent.id}"
                  data: {
                    title: "A thing",
                    group: { create: { name: "${groupName}" } }
                  }
                ) {
                  id
                  group {
                    id
                    name
                  }
                }
              }`,
          });

          expect(errors).toBe(undefined);
          expect(data).toMatchObject({
            updateEvent: {
              id: expect.any(String),
              group: { id: expect.any(String), name: groupName },
            },
          });

          const {
            data: { Group },
            errors: errors2,
          } = await itoa.executeGraphQL({
            query: `
              query {
                Group(where: { id: "${data.updateEvent.group.id}" }) {
                  id
                  name
                }
              }`,
          });
          expect(errors2).toBe(undefined);
          expect(Group).toMatchObject({ id: data.updateEvent.group.id, name: groupName });
        })
      );
    });

    describe('with access control', () => {
      [
        { name: 'GroupNoRead', allowed: true, func: 'read: () => false' },
        { name: 'GroupNoReadHard', allowed: true, func: 'read: false' },
        { name: 'GroupNoCreate', allowed: false, func: 'create: () => false' },
        { name: 'GroupNoCreateHard', allowed: false, func: 'create: false' },
        { name: 'GroupNoUpdate', allowed: true, func: 'update: () => false' },
        { name: 'GroupNoUpdateHard', allowed: true, func: 'update: false' },
      ].forEach(group => {
        describe(`${group.func} on related list`, () => {
          if (group.allowed) {
            test(
              'does not throw error when creating nested within create mutation',
              runner(setupItoa, async ({ itoa }) => {
                const groupName = sampleOne(gen.alphaNumString.notEmpty());

                // Create an item that does the nested create
                const { data, errors } = await itoa.executeGraphQL({
                  query: `
                    mutation {
                      createEventTo${group.name}(data: {
                        title: "A thing",
                        group: { create: { name: "${groupName}" } }
                      }) {
                        id
                      }
                    }`,
                });

                expect(errors).toBe(undefined);
                expect(data).toMatchObject({
                  [`createEventTo${group.name}`]: { id: expect.any(String) },
                });

                // See that it actually stored the group ID on the Event record
                const event = await getItem({
                  itoa,
                  listKey: `EventTo${group.name}`,
                  itemId: data[`createEventTo${group.name}`].id,
                  returnFields: 'id group { id name }',
                  context: itoa.createContext({ schemaName: 'internal' }),
                });
                expect(event).toBeTruthy();
                expect(event.group).toBeTruthy();
                expect(event.group.name).toBe(groupName);
              })
            );

            test(
              'does not throw error when creating nested within update mutation',
              runner(setupItoa, async ({ itoa }) => {
                const groupName = sampleOne(gen.alphaNumString.notEmpty());

                // Create an item to update
                const eventModel = await createItem({
                  itoa,
                  listKey: `EventTo${group.name}`,
                  item: { title: 'A thing' },
                });

                // Update an item that does the nested create
                const { data, errors } = await itoa.executeGraphQL({
                  query: `
                    mutation {
                      updateEventTo${group.name}(
                        id: "${eventModel.id}"
                        data: {
                          title: "A thing",
                          group: { create: { name: "${groupName}" } }
                        }
                      ) {
                        id
                      }
                    }`,
                });

                expect(errors).toBe(undefined);
                expect(data).toMatchObject({
                  [`updateEventTo${group.name}`]: { id: expect.any(String) },
                });

                // See that it actually stored the group ID on the Event record
                const event = await getItem({
                  itoa,
                  listKey: `EventTo${group.name}`,
                  itemId: data[`updateEventTo${group.name}`].id,
                  returnFields: 'id group { id name }',
                  context: itoa.createContext({ schemaName: 'internal' }),
                });
                expect(event).toBeTruthy();
                expect(event.group).toBeTruthy();
                expect(event.group.name).toBe(groupName);
              })
            );
          } else {
            test(
              'throws error when creating nested within create mutation',
              runner(setupItoa, async ({ itoa }) => {
                const alphaNumGenerator = gen.alphaNumString.notEmpty();
                const eventName = sampleOne(alphaNumGenerator);
                const groupName = sampleOne(alphaNumGenerator);

                // Create an item that does the nested create
                const { data, errors } = await itoa.executeGraphQL({
                  query: `
                    mutation {
                      createEventTo${group.name}(data: {
                        title: "${eventName}",
                        group: { create: { name: "${groupName}" } }
                      }) {
                        id
                      }
                    }`,
                  expectedStatusCode: group.name === 'GroupNoCreateHard' ? 400 : 200,
                });

                if (group.name === 'GroupNoCreateHard') {
                  // For { create: false } the mutation won't even exist, so we expect a different behaviour
                  expect(data[`createEventTo${group.name}`]).toBe(null);
                } else {
                  // Assert it throws an access denied error
                  expect(data[`createEventTo${group.name}`]).toBe(null);
                  expect(errors).toHaveLength(1);
                  const error = errors[0];
                  expect(error.message).toEqual(
                    `Unable to create a EventTo${group.name}.group<${group.name}>`
                  );
                  expect(error.path).toHaveLength(1);
                  expect(error.path[0]).toEqual(`createEventTo${group.name}`);
                }
                // Confirm it didn't insert either of the records anyway
                const result = await itoa.executeGraphQL({
                  query: `
                    query {
                      all${group.name}s(where: { name: "${groupName}" }) {
                        id
                        name
                      }
                    }`,
                });
                expect(result.errors).toBe(undefined);
                expect(result.data[`all${group.name}s`]).toMatchObject([]);

                // Confirm it didn't insert either of the records anyway
                const result2 = await itoa.executeGraphQL({
                  query: `
                    query {
                      allEventTo${group.name}s(where: { title: "${eventName}" }) {
                        id
                        title
                      }
                    }`,
                });
                expect(result2.errors).toBe(undefined);
                expect(result2.data[`allEventTo${group.name}s`]).toMatchObject([]);
              })
            );

            test(
              'throws error when creating nested within update mutation',
              runner(setupItoa, async ({ itoa }) => {
                const groupName = sampleOne(gen.alphaNumString.notEmpty());

                // Create an item to update
                const eventModel = await createItem({
                  itoa,
                  listKey: `EventTo${group.name}`,
                  item: { title: 'A thing' },
                });

                // Update an item that does the nested create
                const { data, errors } = await itoa.executeGraphQL({
                  query: `
                    mutation {
                      updateEventTo${group.name}(
                        id: "${eventModel.id}"
                        data: {
                          title: "A thing",
                          group: { create: { name: "${groupName}" } }
                        }
                      ) {
                        id
                      }
                    }`,
                  expectedStatusCode: group.name === 'GroupNoCreateHard' ? 400 : 200,
                });

                // Assert it throws an access denied error
                if (group.name === 'GroupNoCreateHard') {
                  // For { create: false } the mutation won't even exist, so we expect a different behaviour
                  expect(data[`updateEventTo${group.name}`]).toBe(null);
                } else {
                  expect(data[`updateEventTo${group.name}`]).toBe(null);
                  expect(errors).toHaveLength(1);
                  const error = errors[0];
                  expect(error.message).toEqual(
                    `Unable to create a EventTo${group.name}.group<${group.name}>`
                  );
                  expect(error.path).toHaveLength(1);
                  expect(error.path[0]).toEqual(`updateEventTo${group.name}`);
                }

                // Confirm it didn't insert the record anyway
                const result = await itoa.executeGraphQL({
                  query: `
                    query {
                      all${group.name}s(where: { name: "${groupName}" }) {
                        id
                        name
                      }
                    }`,
                });
                expect(result.errors).toBe(undefined);
                expect(result.data[`all${group.name}s`]).toMatchObject([]);
              })
            );
          }
        });
      });
    });
  })
);
