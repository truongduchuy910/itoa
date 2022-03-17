const { gen, sampleOne } = require('testcheck');
const { Text, Relationship } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { getItem } = require('@itoa/server-side-graphql-client');

const alphanumGenerator = gen.alphaNumString.notEmpty();

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('Company', {
        fields: {
          name: { type: Text },
          location: { type: Relationship, ref: 'Location.company' },
        },
      });

      itoa.createList('Location', {
        fields: {
          name: { type: Text },
          company: { type: Relationship, ref: 'Company.location', isRequired: true },
        },
      });
    },
  });
}
multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe('update one to one relationship back reference', () => {
      test(
        'nested create',
        runner(setupItoa, async ({ itoa }) => {
          const locationName = sampleOne(alphanumGenerator);
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                createCompany(data: {
                  location: { create: { name: "${locationName}" } }
                }) {
                  id
                  location {
                    id
                  }
                }
              }`,
          });

          expect(errors).toBe(undefined);

          const companyId = data.createCompany.id;
          const locationId = data.createCompany.location.id;

          const company = await getItem({
            itoa,
            listKey: 'Company',
            itemId: companyId,
            returnFields: 'id location { id }',
          });
          // Everything should now be connected. 1:1 has a single connection on the first list defined.
          expect(company.location.id.toString()).toBe(locationId.toString());
        })
      );
    });
  })
);
