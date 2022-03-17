const { Text, Relationship } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { createItems, updateItems } = require('@itoa/server-side-graphql-client');

const createInitialData = async itoa => {
  const roles = await createItems({
    itoa,
    listKey: 'Role',
    items: [{ data: { name: 'RoleA' } }, { data: { name: 'RoleB' } }, { data: { name: 'RoleC' } }],
    returnFields: 'id name',
  });
  const companies = await createItems({
    itoa,
    listKey: 'Company',
    items: [
      { data: { name: 'CompanyA' } },
      { data: { name: 'CompanyB' } },
      { data: { name: 'CompanyC' } },
    ],
    returnFields: 'id name',
  });
  const employees = await createItems({
    itoa,
    listKey: 'Employee',
    items: [
      {
        data: {
          name: 'EmployeeA',
          company: { connect: { id: companies.find(({ name }) => name === 'CompanyA').id } },
          role: { connect: { id: roles.find(({ name }) => name === 'RoleA').id } },
        },
      },
      {
        data: {
          name: 'EmployeeB',
          company: { connect: { id: companies.find(({ name }) => name === 'CompanyB').id } },
          role: { connect: { id: roles.find(({ name }) => name === 'RoleB').id } },
        },
      },
      {
        data: {
          name: 'EmployeeC',
          company: { connect: { id: companies.find(({ name }) => name === 'CompanyC').id } },
          role: { connect: { id: roles.find(({ name }) => name === 'RoleC').id } },
        },
      },
    ],
    returnFields: 'id name',
  });
  await createItems({
    itoa,
    listKey: 'Location',
    items: [
      {
        data: {
          name: 'LocationA',
          employees: {
            connect: employees
              .filter(e => ['EmployeeA', 'EmployeeB'].includes(e.name))
              .map(e => ({ id: e.id })),
          },
        },
      },
      {
        data: {
          name: 'LocationB',
          employees: {
            connect: employees
              .filter(e => ['EmployeeB', 'EmployeeC'].includes(e.name))
              .map(e => ({ id: e.id })),
          },
        },
      },
      {
        data: {
          name: 'LocationC',
          employees: {
            connect: employees
              .filter(e => ['EmployeeC', 'EmployeeA'].includes(e.name))
              .map(e => ({ id: e.id })),
          },
        },
      },
    ],
    returnFields: 'id name',
  });
  await updateItems({
    itoa,
    listKey: 'Role',
    items: [
      {
        id: roles.find(({ name }) => name === 'RoleA').id,
        data: {
          company: { connect: { id: companies.find(({ name }) => name === 'CompanyA').id } },
          employees: { connect: [{ id: employees.find(({ name }) => name === 'EmployeeA').id }] },
        },
      },
      {
        id: roles.find(({ name }) => name === 'RoleB').id,
        data: {
          company: { connect: { id: companies.find(({ name }) => name === 'CompanyB').id } },
          employees: { connect: [{ id: employees.find(({ name }) => name === 'EmployeeB').id }] },
        },
      },
      {
        id: roles.find(({ name }) => name === 'RoleC').id,
        data: {
          company: { connect: { id: companies.find(({ name }) => name === 'CompanyC').id } },
          employees: { connect: [{ id: employees.find(({ name }) => name === 'EmployeeC').id }] },
        },
      },
    ],
  });
};

const setupItoa = adapterName =>
  setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('Employee', {
        fields: {
          name: { type: Text },
          company: { type: Relationship, ref: 'Company.employees', many: false },
          role: { type: Relationship, ref: 'Role', many: false },
        },
      });
      itoa.createList('Company', {
        fields: {
          name: { type: Text },
          employees: { type: Relationship, ref: 'Employee.company', many: true },
        },
      });
      itoa.createList('Role', {
        fields: {
          name: { type: Text },
          company: { type: Relationship, ref: 'Company', many: false },
          employees: { type: Relationship, ref: 'Employee', many: true },
        },
      });
      itoa.createList('Location', {
        fields: {
          name: { type: Text },
          employees: { type: Relationship, ref: 'Employee', many: true },
        },
      });
    },
  });

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    test(
      'Query',
      runner(setupItoa, async ({ itoa }) => {
        await createInitialData(itoa);
        const { data, errors } = await itoa.executeGraphQL({
          query: `{
                  allEmployees(where: {
                    company: { employees_some: { role: { name: "RoleA" } } }
                  }) { id name }
                }`,
        });
        expect(errors).toBe(undefined);
        expect(data.allEmployees).toHaveLength(1);
        expect(data.allEmployees[0].name).toEqual('EmployeeA');
      })
    );
  })
);
