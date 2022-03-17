const { gen, sampleOne } = require('testcheck');
const { Text, Relationship } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { createItem, createItems } = require('@itoa/server-side-graphql-client');

const alphanumGenerator = gen.alphaNumString.notEmpty();

const createInitialData = async itoa => {
  const { data, errors } = await itoa.executeGraphQL({
    query: `
      mutation {
        createCompanies(data: [
          { data: { name: "${sampleOne(alphanumGenerator)}" } },
          { data: { name: "${sampleOne(alphanumGenerator)}" } },
          { data: { name: "${sampleOne(alphanumGenerator)}" } }
        ]) { id }
        createLocations(data: [
          { data: { name: "${sampleOne(alphanumGenerator)}" } },
          { data: { name: "${sampleOne(alphanumGenerator)}" } },
          { data: { name: "${sampleOne(alphanumGenerator)}" } }
          { data: { name: "${sampleOne(alphanumGenerator)}" } }
        ]) { id }
      }`,
  });
  expect(errors).toBe(undefined);
  const owners = await createItems({
    itoa,
    listKey: 'Owner',
    items: data.createCompanies.map(({ id }) => ({
      data: { name: `Owner_of_${id}`, companies: { connect: [{ id }] } },
    })),
  });
  const custodians = await createItems({
    itoa,
    listKey: 'Custodian',
    items: data.createLocations.map(({ id }) => ({
      data: { name: `Custodian_of_${id}`, locations: { connect: [{ id }] } },
    })),
  });
  return { locations: data.createLocations, companies: data.createCompanies, owners, custodians };
};

const createCompanyAndLocation = async itoa => {
  const [cu1, cu2] = await createItems({
    itoa,
    listKey: 'Custodian',
    items: [
      { data: { name: sampleOne(alphanumGenerator) } },
      { data: { name: sampleOne(alphanumGenerator) } },
    ],
  });

  return createItem({
    itoa,
    listKey: 'Owner',
    item: {
      name: sampleOne(alphanumGenerator),
      companies: {
        create: [
          {
            name: sampleOne(alphanumGenerator),
            location: {
              create: {
                name: sampleOne(alphanumGenerator),
                custodians: { connect: [{ id: cu1.id }] },
              },
            },
          },
          {
            name: sampleOne(alphanumGenerator),
            location: {
              create: {
                name: sampleOne(alphanumGenerator),
                custodians: { connect: [{ id: cu1.id }] },
              },
            },
          },
          {
            name: sampleOne(alphanumGenerator),
            location: {
              create: {
                name: sampleOne(alphanumGenerator),
                custodians: { connect: [{ id: cu2.id }] },
              },
            },
          },
        ],
      },
    },
    returnFields: 'id name companies { id name location { id name custodians { id name } } }',
  });
};

const setupItoa = adapterName =>
  setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('Owner', {
        fields: {
          name: { type: Text },
          companies: { type: Relationship, ref: 'Company.owners', many: true },
        },
      });
      itoa.createList('Company', {
        fields: {
          name: { type: Text },
          location: { type: Relationship, ref: 'Location.company' },
          owners: { type: Relationship, ref: 'Owner.companies', many: true },
        },
      });
      itoa.createList('Location', {
        fields: {
          name: { type: Text },
          company: { type: Relationship, ref: 'Company.location' },
          custodians: { type: Relationship, ref: 'Custodian.locations', many: true },
        },
      });
      itoa.createList('Custodian', {
        fields: {
          name: { type: Text },
          locations: { type: Relationship, ref: 'Location.custodians', many: true },
        },
      });
    },
  });

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe(`One-to-one relationships`, () => {
      describe('Read', () => {
        test(
          'Where A',
          runner(setupItoa, async ({ itoa }) => {
            await createInitialData(itoa);
            const owner = await createCompanyAndLocation(itoa);
            const name1 = owner.companies[0].location.custodians[0].name;
            const { data, errors } = await itoa.executeGraphQL({
              query: `{
                  allOwners(where: { companies_some: { location: { custodians_some: { name: "${name1}" } } } }) { id companies { location { custodians { name } } } }
                }`,
            });
            expect(errors).toBe(undefined);
            expect(data.allOwners.length).toEqual(1);
            expect(data.allOwners[0].id).toEqual(owner.id);
          })
        );
        test(
          'Where B',
          runner(setupItoa, async ({ itoa }) => {
            await createInitialData(itoa);
            const owner = await createCompanyAndLocation(itoa);
            const name1 = owner.name;
            const { data, errors } = await itoa.executeGraphQL({
              query: `{
                  allCustodians(where: { locations_some: { company: { owners_some: { name: "${name1}" } } } }) { id locations { company { owners { name } } } }
                }`,
            });
            expect(errors).toBe(undefined);
            expect(data.allCustodians.length).toEqual(2);
          })
        );
        test(
          'Where C',
          runner(setupItoa, async ({ itoa }) => {
            await createInitialData(itoa);
            const owner = await createCompanyAndLocation(itoa);
            const name1 = owner.name;
            const { data, errors } = await itoa.executeGraphQL({
              query: `{
                  allOwners(where: { companies_some: { location: { custodians_some: { locations_some: { company: { owners_some: { name: "${name1}" } } } } } } }) { id companies { location { custodians { name } } } }
                }`,
            });
            expect(errors).toBe(undefined);
            expect(data.allOwners.length).toEqual(1);
            expect(data.allOwners[0].id).toEqual(owner.id);
          })
        );
        test(
          'Where D',
          runner(setupItoa, async ({ itoa }) => {
            await createInitialData(itoa);
            const owner = await createCompanyAndLocation(itoa);
            const name1 = owner.companies[0].location.custodians[0].name;

            const { data, errors } = await itoa.executeGraphQL({
              query: `{
                  allCustodians(where: { locations_some: { company: { owners_some: { companies_some: { location: { custodians_some: { name: "${name1}" } } } } } } }) { id locations { company { owners { name } } } }
                }`,
            });
            expect(errors).toBe(undefined);
            expect(data.allCustodians.length).toEqual(2);
          })
        );
      });
    });
  })
);
