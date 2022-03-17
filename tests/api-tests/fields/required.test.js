const globby = require('globby');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { Text } = require('@itoa/fields');

const testModules = globby.sync(`packages/**/src/**/test-fixtures.js`, {
  absolute: true,
});
multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    testModules
      .map(require)
      .filter(
        ({ skipRequiredTest, unSupportedAdapterList = [] }) =>
          !skipRequiredTest && !unSupportedAdapterList.includes(adapterName)
      )
      .forEach(mod => {
        (mod.testMatrix || ['default']).forEach(matrixValue => {
          describe(`${mod.name} - ${matrixValue} - isRequired`, () => {
            beforeAll(() => {
              if (mod.beforeAll) {
                mod.beforeAll();
              }
            });
            afterAll(async () => {
              if (mod.afterAll) {
                await mod.afterAll();
              }
            });
            const itoaTestWrapper = testFn =>
              runner(
                () =>
                  setupServer({
                    adapterName,
                    createLists: itoa => {
                      itoa.createList('Test', {
                        fields: {
                          name: { type: Text },
                          testField: {
                            type: mod.type,
                            isRequired: true,
                            ...(mod.fieldConfig ? mod.fieldConfig(matrixValue) : {}),
                          },
                        },
                      });
                    },
                  }),
                testFn
              );
            test(
              'Create an object without the required field',
              itoaTestWrapper(async ({ itoa }) => {
                const { data, errors } = await itoa.executeGraphQL({
                  query: `
                  mutation {
                    createTest(data: { name: "test entry" } ) { id }
                  }`,
                });
                expect(data.createTest).toBe(null);
                expect(errors).not.toBe(null);
                expect(errors.length).toEqual(1);
                expect(errors[0].message).toEqual('You attempted to perform an invalid mutation');
                expect(errors[0].path[0]).toEqual('createTest');
              })
            );

            test(
              'Update an object with the required field having a null value',
              itoaTestWrapper(async ({ itoa }) => {
                const { data: data0, errors: errors0 } = await itoa.executeGraphQL({
                  query: `
                  mutation($data: TestCreateInput) {
                    createTest(data: $data ) { id }
                  }`,
                  variables: {
                    data: {
                      name: 'test entry',
                      testField: mod.exampleValue(matrixValue),
                    },
                  },
                });
                expect(errors0).toBe(undefined);
                const { data, errors } = await itoa.executeGraphQL({
                  query: `
                  mutation {
                    updateTest(id: "${data0.createTest.id}" data: { name: "updated test entry", testField: null } ) { id }
                  }`,
                });
                expect(data.updateTest).toBe(null);
                expect(errors).not.toBe(undefined);
                expect(errors.length).toEqual(1);
                expect(errors[0].message).toEqual('You attempted to perform an invalid mutation');
                expect(errors[0].path[0]).toEqual('updateTest');
              })
            );

            test(
              'Update an object without the required field',
              itoaTestWrapper(async ({ itoa }) => {
                const { data: data0, errors: errors0 } = await itoa.executeGraphQL({
                  query: `
                  mutation($data: TestCreateInput) {
                    createTest(data: $data ) { id }
                  }`,
                  variables: {
                    data: {
                      name: 'test entry',
                      testField: mod.exampleValue(matrixValue),
                    },
                  },
                });
                expect(errors0).toBe(undefined);
                const { data, errors } = await itoa.executeGraphQL({
                  query: `
                  mutation {
                    updateTest(id: "${data0.createTest.id}" data: { name: "updated test entry" } ) { id }
                  }`,
                });
                expect(data.updateTest).not.toBe(null);
                expect(errors).toBe(undefined);
              })
            );
          });
        });
      });
  })
);
