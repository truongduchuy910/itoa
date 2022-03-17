const { gen, sampleOne } = require('testcheck');
const { Text, Relationship } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { createItem } = require('@itoa/server-side-graphql-client');

const alphanumGenerator = gen.alphaNumString.notEmpty();

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('Note', {
        fields: {
          content: { type: Text },
        },
      });

      itoa.createList('User', {
        fields: {
          username: { type: Text },
          notes: { type: Relationship, ref: 'Note', many: true },
        },
      });

      itoa.createList('NoteNoRead', {
        fields: {
          content: { type: Text },
        },
        access: {
          read: () => false,
        },
      });

      itoa.createList('UserToNotesNoRead', {
        fields: {
          username: { type: Text },
          notes: { type: Relationship, ref: 'NoteNoRead', many: true },
        },
      });

      itoa.createList('NoteNoCreate', {
        fields: {
          content: { type: Text },
        },
        access: {
          create: () => false,
        },
      });

      itoa.createList('UserToNotesNoCreate', {
        fields: {
          username: { type: Text },
          notes: { type: Relationship, ref: 'NoteNoCreate', many: true },
        },
      });
    },
  });
}

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe('no access control', () => {
      test(
        'removes matched items from list',
        runner(setupItoa, async ({ itoa }) => {
          const noteContent = `foo${sampleOne(alphanumGenerator)}`;
          const noteContent2 = `foo${sampleOne(alphanumGenerator)}`;

          // Create two items with content that can be matched
          const createNote = await createItem({
            itoa,
            listKey: 'Note',
            item: { content: noteContent },
          });
          const createNote2 = await createItem({
            itoa,
            listKey: 'Note',
            item: { content: noteContent2 },
          });

          // Create an item to update
          const createUser = await createItem({
            itoa,
            listKey: 'User',
            item: {
              username: 'A thing',
              notes: { connect: [{ id: createNote.id }, { id: createNote2.id }] },
            },
          });

          // Update the item and link the relationship field
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                updateUser(
                  id: "${createUser.id}"
                  data: {
                    username: "A thing",
                    notes: { disconnect: [{ id: "${createNote2.id}" }] }
                  }
                ) {
                  id
                  notes {
                    id
                    content
                  }
                }
              }`,
          });

          expect(data).toMatchObject({
            updateUser: {
              id: expect.any(String),
              notes: [{ id: createNote.id, content: noteContent }],
            },
          });
          expect(errors).toBe(undefined);
        })
      );

      test(
        'silently succeeds if used during create',
        runner(setupItoa, async ({ itoa }) => {
          const FAKE_ID = '5b84f38256d3c2df59a0d9bf';

          // Create an item that does the linking
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                createUser(data: {
                  notes: {
                    disconnect: [{ id: "${FAKE_ID}" }]
                  }
                }) {
                  id
                  notes {
                    id
                  }
                }
              }`,
          });
          expect(errors).toBe(undefined);
          expect(data.createUser).toMatchObject({ id: expect.any(String), notes: [] });
          expect(data.createUser).not.toHaveProperty('errors');
        })
      );
    });

    describe('non-matching filter', () => {
      test(
        'silently succeeds if items to disconnect cannot be found during update',
        runner(setupItoa, async ({ itoa }) => {
          const FAKE_ID = '5b84f38256d3c2df59a0d9bf';

          // Create an item to link against
          const createUser = await createItem({ itoa, listKey: 'User', item: {} });

          // Create an item that does the linking
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                updateUser(
                  id: "${createUser.id}",
                  data: {
                    notes: {
                      disconnect: [{ id: "${FAKE_ID}" }]
                    }
                  }
                ) {
                  id
                  notes {
                  id
                }
                }
              }`,
          });
          expect(errors).toBe(undefined);
          expect(data.updateUser).toMatchObject({ id: expect.any(String), notes: [] });
          expect(data.updateUser).not.toHaveProperty('errors');
        })
      );

      test(
        'removes items that match, silently ignores those that do not',
        runner(setupItoa, async ({ itoa }) => {
          const FAKE_ID = '5b84f38256d3c2df59a0d9bf';
          const noteContent = sampleOne(alphanumGenerator);
          const noteContent2 = sampleOne(alphanumGenerator);

          // Create an item to link against
          const createNote = await createItem({
            itoa,
            listKey: 'Note',
            item: { content: noteContent },
          });
          const createNote2 = await createItem({
            itoa,
            listKey: 'Note',
            item: { content: noteContent2 },
          });

          // Create an item to update
          const createUser = await createItem({
            itoa,
            listKey: 'User',
            item: {
              username: 'A thing',
              notes: { connect: [{ id: createNote.id }, { id: createNote2.id }] },
            },
          });

          // Update the item and link the relationship field
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                updateUser(
                  id: "${createUser.id}"
                  data: {
                    notes: { disconnect: [{ id: "${createNote.id}" }, { id: "${FAKE_ID}" }] }
                  }
                ) {
                  id
                  notes {
                    id
                    content
                  }
                }
              }`,
          });

          expect(data).toMatchObject({
            updateUser: {
              id: expect.any(String),
              notes: [{ id: expect.any(String), content: noteContent2 }],
            },
          });
          expect(errors).toBe(undefined);
        })
      );
    });

    describe('with access control', () => {
      describe('read: false on related list', () => {
        test(
          'has no impact when disconnecting directly with an id',
          runner(setupItoa, async ({ itoa }) => {
            const noteContent = sampleOne(alphanumGenerator);

            // Create an item to link against
            const createNote = await createItem({
              itoa,
              listKey: 'NoteNoRead',
              item: { content: noteContent },
            });

            // Create an item to update
            const createUser = await createItem({
              itoa,
              listKey: 'UserToNotesNoRead',
              item: {
                username: 'A thing',
                notes: { connect: [{ id: createNote.id }] },
              },
            });

            // Update the item and link the relationship field
            const { errors } = await itoa.executeGraphQL({
              query: `
                mutation {
                  updateUserToNotesNoRead(
                    id: "${createUser.id}"
                    data: {
                      username: "A thing",
                      notes: { disconnect: [{ id: "${createNote.id}" }] }
                    }
                  ) {
                    id
                  }
                }`,
            });

            expect(errors).toBe(undefined);

            const result = await itoa.executeGraphQL({
              query: `
                query getUserNodes($userId: ID!){
                  UserToNotesNoRead(where: { id: $userId }) {
                    id
                    notes { id }
                  }
                }`,
              variables: { userId: createUser.id },
              context: itoa.createContext().sudo(),
            });
            expect(result.errors).toBe(undefined);
            expect(result.data.UserToNotesNoRead.notes).toHaveLength(0);
          })
        );

        test.failing('silently ignores items that otherwise would match the filter', () => {
          // TODO: Fill this in once we support more than just id filtering for
          // disconnection
          expect(false).toBe(true);
        });
      });
    });
  })
);
