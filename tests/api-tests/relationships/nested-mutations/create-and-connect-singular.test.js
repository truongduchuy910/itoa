const { Text, Relationship } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');

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
    },
  });
}
multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe('errors on incomplete data', () => {
      test(
        'when neither id or create data passed',
        runner(setupItoa, async ({ itoa }) => {
          // Create an item that does the linking
          const { errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                createEvent(data: { group: {} }) {
                  id
                }
              }`,
          });

          expect(errors).toMatchObject([
            { message: 'Nested mutation operation invalid for Event.group<Group>' },
          ]);
        })
      );

      test(
        'when both id and create data passed',
        runner(setupItoa, async ({ itoa }) => {
          // Create an item that does the linking
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                createEvent(data: { group: {
                  connect: { id: "abc123"},
                  create: { name: "foo" }
                } }) {
                  id
                }
              }`,
          });

          expect(data.createEvent).toBe(null);
          expect(errors).toMatchObject([
            { message: 'Nested mutation operation invalid for Event.group<Group>' },
          ]);
        })
      );
    });
  })
);
