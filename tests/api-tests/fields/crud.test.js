const globby = require('globby');
const path = require('path');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
import {
  createItem,
  deleteItem,
  getItems,
  getItem,
  updateItem,
} from '@itoa/server-side-graphql-client';

const testModules = globby.sync(`packages/**/src/**/test-fixtures.js`, {
  absolute: true,
});
testModules.push(path.resolve('packages/fields/tests/test-fixtures.js'));

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`${adapterName} adapter`, () => {
    testModules
      .map(require)
      .filter(
        ({ skipCrudTest, unSupportedAdapterList = [] }) =>
          !skipCrudTest && !unSupportedAdapterList.includes(adapterName)
      )
      .forEach(mod => {
        (mod.testMatrix || ['default']).forEach(matrixValue => {
          const listKey = 'Test';
          const itoaTestWrapper = (testFn = () => {}) =>
            runner(
              () => {
                const createLists = itoa => {
                  // Create a list with all the fields required for testing
                  itoa.createList(listKey, { fields: mod.getTestFields(matrixValue) });
                };
                return setupServer({ adapterName, createLists });
              },
              async ({ itoa, ...rest }) => {
                // Populate the database before running the tests
                for (const item of mod.initItems(matrixValue)) {
                  await createItem({ itoa, listKey, item });
                }
                return testFn({ itoa, listKey, adapterName, ...rest });
              }
            );

          if (mod.crudTests) {
            describe(`${mod.name} - ${matrixValue} - Custom CRUD operations`, () => {
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
              mod.crudTests(itoaTestWrapper);
            });
          }

          if (!mod.skipCommonCrudTest) {
            describe(`${mod.name} - ${matrixValue} - CRUD operations`, () => {
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
              const {
                fieldName,
                exampleValue,
                exampleValue2,
                subfieldName,
                createReturnedValue,
                updateReturnedValue,
              } = mod;

              // Some  field types can have subfields
              const returnFields = subfieldName
                ? `id name ${fieldName} { ${subfieldName} }`
                : `id name ${fieldName}`;

              const withHelpers = wrappedFn => {
                return async ({ itoa, listKey }) => {
                  const items = await getItems({
                    itoa,
                    listKey,
                    returnFields,
                    sortBy: 'name_ASC',
                  });
                  return wrappedFn({ itoa, listKey, items });
                };
              };

              // Individual field types can have CRUD constraints.
              // For example, password field can only be written but not read.
              if (!mod.skipCreateTest) {
                test(
                  'Create',
                  itoaTestWrapper(
                    withHelpers(async ({ itoa, listKey }) => {
                      const data = await createItem({
                        itoa,
                        listKey,
                        item: { name: 'Newly created', [fieldName]: exampleValue(matrixValue) },
                        returnFields,
                      });
                      expect(data).not.toBe(null);
                      expect(
                        subfieldName ? data[fieldName][subfieldName] : data[fieldName]
                      ).toEqual(
                        createReturnedValue ? createReturnedValue : exampleValue(matrixValue)
                      );
                    })
                  )
                );
              }

              if (!mod.skipReadTest) {
                test(
                  'Read',
                  itoaTestWrapper(
                    withHelpers(async ({ itoa, listKey, items }) => {
                      const data = await getItem({
                        itoa,
                        listKey,
                        itemId: items[0].id,
                        returnFields,
                      });
                      expect(data).not.toBe(null);
                      expect(
                        subfieldName ? data[fieldName][subfieldName] : data[fieldName]
                      ).toEqual(
                        subfieldName ? items[0][fieldName][subfieldName] : items[0][fieldName]
                      );
                    })
                  )
                );
              }

              if (!mod.skipUpdateTest) {
                describe('Update', () => {
                  test(
                    'Updating the value',
                    itoaTestWrapper(
                      withHelpers(async ({ itoa, items, listKey }) => {
                        const data = await updateItem({
                          itoa,
                          listKey,
                          item: {
                            id: items[0].id,
                            data: { [fieldName]: exampleValue2(matrixValue) },
                          },
                          returnFields,
                        });
                        expect(data).not.toBe(null);
                        expect(
                          subfieldName ? data[fieldName][subfieldName] : data[fieldName]
                        ).toEqual(
                          updateReturnedValue ? updateReturnedValue : exampleValue2(matrixValue)
                        );
                      })
                    )
                  );

                  test(
                    'Updating the value to null',
                    itoaTestWrapper(
                      withHelpers(async ({ itoa, items, listKey }) => {
                        const data = await updateItem({
                          itoa,
                          listKey,
                          item: {
                            id: items[0].id,
                            data: { [fieldName]: null },
                          },
                          returnFields,
                        });
                        expect(data).not.toBe(null);
                        expect(data[fieldName]).toBe(null);
                      })
                    )
                  );

                  test(
                    'Updating without this field',
                    itoaTestWrapper(
                      withHelpers(async ({ itoa, items, listKey }) => {
                        const data = await updateItem({
                          itoa,
                          listKey,
                          item: {
                            id: items[0].id,
                            data: { name: 'Updated value' },
                          },
                          returnFields,
                        });
                        expect(data).not.toBe(null);
                        expect(data.name).toBe('Updated value');
                        expect(
                          subfieldName ? data[fieldName][subfieldName] : data[fieldName]
                        ).toEqual(
                          subfieldName ? items[0][fieldName][subfieldName] : items[0][fieldName]
                        );
                      })
                    )
                  );
                });
              }

              if (!mod.skipDeleteTest) {
                test(
                  'Delete',
                  itoaTestWrapper(
                    withHelpers(async ({ itoa, items, listKey }) => {
                      const data = await deleteItem({
                        itoa,
                        listKey,
                        itemId: items[0].id,
                        returnFields,
                      });
                      expect(data).not.toBe(null);
                      expect(data.name).toBe(items[0].name);
                      expect(
                        subfieldName ? data[fieldName][subfieldName] : data[fieldName]
                      ).toEqual(
                        subfieldName ? items[0][fieldName][subfieldName] : items[0][fieldName]
                      );

                      const allItems = await getItems({
                        itoa,
                        listKey,
                        returnFields,
                      });
                      expect(allItems).toEqual(expect.not.arrayContaining([data]));
                    })
                  )
                );
              }
            });
          }
        });
      });
  })
);
