const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { Text, Relationship } = require('@itoa/fields');

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('User', {
        fields: {
          noDash: { type: Text },
          single_dash: { type: Text },
          many_many_many_dashes: { type: Text },
          multi____dash: { type: Text },
        },
      });
      itoa.createList('SecondaryList', {
        fields: {
          someUser: { type: Relationship, ref: 'User' },
        },
      });
    },
  });
}

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe('filtering on list name', () => {
      test(
        'filter works when there is no dash in list name',
        runner(setupItoa, async ({ itoa }) => {
          const { data, errors } = await itoa.executeGraphQL({
            query: `{ allUsers(where: { noDash: "aValue" })}`,
          });
          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers', []);
        })
      );
      test(
        'filter works when there is one dash in list name',
        runner(setupItoa, async ({ itoa }) => {
          const { data, errors } = await itoa.executeGraphQL({
            query: `{ allUsers(where: { single_dash: "aValue" })}`,
          });
          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers', []);
        })
      );
      test(
        'filter works when there are multiple dashes in list name',
        runner(setupItoa, async ({ itoa }) => {
          const { data, errors } = await itoa.executeGraphQL({
            query: `{ allUsers(where: { many_many_many_dashes: "aValue" })}`,
          });
          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers', []);
        })
      );
      test(
        'filter works when there are multiple dashes in a row in a list name',
        runner(setupItoa, async ({ itoa }) => {
          const { data, errors } = await itoa.executeGraphQL({
            query: `{ allUsers(where: { multi____dash: "aValue" })}`,
          });
          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allUsers', []);
        })
      );
      test(
        'filter works when there is one dash in list name as part of a relationship',
        runner(setupItoa, async ({ itoa }) => {
          const { data, errors } = await itoa.executeGraphQL({
            query: `{ allSecondaryLists(where: { user_is_null: true })}`,
          });
          expect(errors).toBe(undefined);
          expect(data).toHaveProperty('allSecondaryLists', []);
        })
      );
    });
  })
);
