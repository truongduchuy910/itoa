const { gen, sampleOne } = require('testcheck');
const { Text, Relationship } = require('@itoa/fields');
const { setupServer, multiAdapterRunners } = require('@itoa/test-utils');
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
        'removes all items from list',
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
                    notes: { disconnectAll: true }
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

          expect(data).toMatchObject({ updateUser: { id: expect.any(String), notes: [] } });
          expect(errors).toBe(undefined);
        })
      );

      test(
        'silently succeeds if used during create',
        runner(setupItoa, async ({ itoa }) => {
          // Create an item that does the linking
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                createUser(data: {
                  notes: {
                    disconnectAll: true
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
        })
      );
    });

    describe('with access control', () => {
      describe('read: false on related list', () => {
        test(
          'has no effect when specifying disconnectAll',
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
                      notes: { disconnectAll: true }
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

        test.failing('silently keeps items that otherwise would be removed', () => {
          // TODO: Fill this in when we support more filtering on Unique items than
          // just ID.
          expect(false).toBe(true);
        });
      });
    });
  })
);
