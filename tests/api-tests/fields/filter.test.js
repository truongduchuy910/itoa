const globby = require('globby');
const path = require('path');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
import { createItem, getItems } from '@itoa/server-side-graphql-client';

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
          const withItoa = (testFn = () => {}) =>
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
                // Note: this seeding has to be in an order defined by the array returned by `mod.initItems()`
                for (const item of mod.initItems(matrixValue)) {
                  await createItem({ itoa, listKey, item });
                }
                return testFn({ itoa, listKey, adapterName, ...rest });
              }
            );

          if (mod.filterTests) {
            describe(`${mod.name} - ${matrixValue} - Custom Filtering`, () => {
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
              mod.filterTests(withItoa, matrixValue);
            });
          }

          if (!mod.skipCommonFilterTest) {
            describe(`${mod.name} - ${matrixValue} - Common Filtering`, () => {
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
              const { readFieldName, fieldName, subfieldName, storedValues: _storedValues } = mod;
              const storedValues = _storedValues(matrixValue);
              const returnFields = readFieldName
                ? `name ${readFieldName}`
                : subfieldName
                ? `name ${fieldName} { ${subfieldName} }`
                : `name ${fieldName}`;

              const match = async (itoa, where, expected, sortBy = 'name_ASC') =>
                expect(await getItems({ itoa, listKey, where, returnFields, sortBy })).toEqual(
                  expected.map(i => storedValues[i])
                );

              test(
                `No Filter`,
                withItoa(({ itoa }) => match(itoa, undefined, [0, 1, 2, 3, 4, 5, 6]))
              );

              test(
                `Empty Filter`,
                withItoa(({ itoa }) => match(itoa, {}, [0, 1, 2, 3, 4, 5, 6]))
              );
              if (mod.supportedFilters(adapterName).includes('null_equality')) {
                test(
                  'Equals null',
                  withItoa(({ itoa }) => match(itoa, { [`${fieldName}`]: null }, [5, 6]))
                );
                test(
                  'Not Equals null',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not`]: null }, [0, 1, 2, 3, 4])
                  )
                );
              }
              if (mod.supportedFilters(adapterName).includes('equality')) {
                test(
                  'Equals',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}`]: storedValues[3][fieldName] }, [3])
                  )
                );
                test(
                  'Not Equals',
                  withItoa(({ itoa }) =>
                    match(
                      itoa,
                      { [`${fieldName}_not`]: storedValues[3][fieldName] },
                      [0, 1, 2, 4, 5, 6]
                    )
                  )
                );
              }
              if (mod.supportedFilters(adapterName).includes('equality_case_insensitive')) {
                test(
                  `Equals - Case Insensitive`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_i`]: storedValues[3][fieldName] }, [2, 3, 4])
                  )
                );

                test(
                  `Not Equals - Case Insensitive`,
                  withItoa(({ itoa }) =>
                    match(
                      itoa,
                      { [`${fieldName}_not_i`]: storedValues[3][fieldName] },
                      [0, 1, 5, 6]
                    )
                  )
                );
              }
              if (mod.supportedFilters(adapterName).includes('string')) {
                test(
                  `Contains`,
                  withItoa(({ itoa }) => match(itoa, { [`${fieldName}_contains`]: 'oo' }, [3, 4]))
                );
                test(
                  `Not Contains`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not_contains`]: 'oo' }, [0, 1, 2, 5, 6])
                  )
                );
                test(
                  `Starts With`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_starts_with`]: 'foo' }, [3, 4])
                  )
                );
                test(
                  `Not Starts With`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not_starts_with`]: 'foo' }, [0, 1, 2, 5, 6])
                  )
                );
                test(
                  `Ends With`,
                  withItoa(({ itoa }) => match(itoa, { [`${fieldName}_ends_with`]: 'BAR' }, [2, 3]))
                );
                test(
                  `Not Ends With`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not_ends_with`]: 'BAR' }, [0, 1, 4, 5, 6])
                  )
                );
              }
              if (mod.supportedFilters(adapterName).includes('string_case_insensitive')) {
                test(
                  `Contains - Case Insensitive`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_contains_i`]: 'oo' }, [2, 3, 4])
                  )
                );

                test(
                  `Not Contains - Case Insensitive`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not_contains_i`]: 'oo' }, [0, 1, 5, 6])
                  )
                );

                test(
                  `Starts With - Case Insensitive`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_starts_with_i`]: 'foo' }, [2, 3, 4])
                  )
                );

                test(
                  `Not Starts With - Case Insensitive`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not_starts_with_i`]: 'foo' }, [0, 1, 5, 6])
                  )
                );

                test(
                  `Ends With - Case Insensitive`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_ends_with_i`]: 'BAR' }, [2, 3, 4])
                  )
                );

                test(
                  `Not Ends With - Case Insensitive`,
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not_ends_with_i`]: 'BAR' }, [0, 1, 5, 6])
                  )
                );
              }
              if (mod.supportedFilters(adapterName).includes('ordering')) {
                test(
                  'Less than',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_lt`]: storedValues[2][fieldName] }, [0, 1])
                  )
                );
                test(
                  'Less than or equal',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_lte`]: storedValues[2][fieldName] }, [0, 1, 2])
                  )
                );
                test(
                  'Greater than',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_gt`]: storedValues[2][fieldName] }, [3, 4])
                  )
                );
                test(
                  'Greater than or equal',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_gte`]: storedValues[2][fieldName] }, [2, 3, 4])
                  )
                );
              }
              if (mod.supportedFilters(adapterName).includes('in_empty_null')) {
                test(
                  'In - Empty List',
                  withItoa(({ itoa }) => match(itoa, { [`${fieldName}_in`]: [] }, []))
                );

                test(
                  'Not In - Empty List',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not_in`]: [] }, [0, 1, 2, 3, 4, 5, 6])
                  )
                );

                test(
                  'In - null',
                  withItoa(({ itoa }) => match(itoa, { [`${fieldName}_in`]: [null] }, [5, 6]))
                );

                test(
                  'Not In - null',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_not_in`]: [null] }, [0, 1, 2, 3, 4])
                  )
                );
              }
              if (mod.supportedFilters(adapterName).includes('in_equal')) {
                test(
                  'In - values',
                  withItoa(({ itoa }) =>
                    match(
                      itoa,
                      {
                        [`${fieldName}_in`]: [
                          storedValues[0][fieldName],
                          storedValues[2][fieldName],
                          storedValues[4][fieldName],
                        ],
                      },
                      [0, 2, 4]
                    )
                  )
                );

                test(
                  'Not In - values',
                  withItoa(({ itoa }) =>
                    match(
                      itoa,
                      {
                        [`${fieldName}_not_in`]: [
                          storedValues[0][fieldName],
                          storedValues[2][fieldName],
                          storedValues[4][fieldName],
                        ],
                      },
                      [1, 3, 5, 6]
                    )
                  )
                );
              }
              if (mod.supportedFilters(adapterName).includes('is_set')) {
                test(
                  'Is Set - true',
                  withItoa(({ itoa }) =>
                    match(itoa, { [`${fieldName}_is_set`]: true }, [0, 2, 3, 4])
                  )
                );

                test(
                  'Is Set - false',
                  withItoa(({ itoa }) => match(itoa, { [`${fieldName}_is_set`]: false }, [1, 5, 6]))
                );
              }
            });
          }
        });
      });
  })
);
