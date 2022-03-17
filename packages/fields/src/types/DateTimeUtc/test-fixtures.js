import { getItems } from '@itoa/server-side-graphql-client';
import Text from '../Text';
import DateTimeUtc from './';

export const name = 'DateTimeUtc';
export const type = DateTimeUtc;
export const exampleValue = () => '1990-12-31T12:34:56.789Z';
export const exampleValue2 = () => '2000-01-20T00:08:00.000Z';
export const supportsUnique = true;
export const fieldName = 'lastOnline';

export const getTestFields = () => ({ name: { type: Text }, lastOnline: { type } });

export const initItems = () => {
  return [
    { name: 'person1', lastOnline: '1949-04-12T00:08:00.000Z' },
    { name: 'person2', lastOnline: '1950-10-01T23:59:59.999Z' },
    { name: 'person3', lastOnline: '1990-12-31T12:34:56.789Z' },
    { name: 'person4', lastOnline: '2000-01-20T00:08:00.000Z' },
    { name: 'person5', lastOnline: '2020-06-10T10:20:30.456Z' },
    { name: 'person6', lastOnline: null },
    { name: 'person7' },
  ];
};

export const storedValues = () => [
  { name: 'person1', lastOnline: '1949-04-12T00:08:00.000Z' },
  { name: 'person2', lastOnline: '1950-10-01T23:59:59.999Z' },
  { name: 'person3', lastOnline: '1990-12-31T12:34:56.789Z' },
  { name: 'person4', lastOnline: '2000-01-20T00:08:00.000Z' },
  { name: 'person5', lastOnline: '2020-06-10T10:20:30.456Z' },
  { name: 'person6', lastOnline: null },
  { name: 'person7', lastOnline: null },
];

export const supportedFilters = () => [
  'null_equality',
  'equality',
  'ordering',
  'in_empty_null',
  'in_equal',
];

export const filterTests = withItoa => {
  const match = async (itoa, where, expected, sortBy = 'name_ASC') =>
    expect(
      await getItems({
        itoa,
        listKey: 'Test',
        where,
        returnFields: 'name lastOnline',
        sortBy,
      })
    ).toEqual(expected);

  test(
    'Sorting: sortBy: lastOnline_ASC',
    withItoa(({ itoa, adapterName }) =>
      match(
        itoa,
        undefined,
        [
          { name: 'person6', lastOnline: null },
          { name: 'person7', lastOnline: null },
          { name: 'person1', lastOnline: '1949-04-12T00:08:00.000Z' },
          { name: 'person2', lastOnline: '1950-10-01T23:59:59.999Z' },
          { name: 'person3', lastOnline: '1990-12-31T12:34:56.789Z' },
          { name: 'person4', lastOnline: '2000-01-20T00:08:00.000Z' },
          { name: 'person5', lastOnline: '2020-06-10T10:20:30.456Z' },
        ],
        'lastOnline_ASC'
      )
    )
  );

  test(
    'Sorting: sortBy: lastOnline_DESC',
    withItoa(({ itoa, adapterName }) =>
      match(
        itoa,
        undefined,
        [
          { name: 'person5', lastOnline: '2020-06-10T10:20:30.456Z' },
          { name: 'person4', lastOnline: '2000-01-20T00:08:00.000Z' },
          { name: 'person3', lastOnline: '1990-12-31T12:34:56.789Z' },
          { name: 'person2', lastOnline: '1950-10-01T23:59:59.999Z' },
          { name: 'person1', lastOnline: '1949-04-12T00:08:00.000Z' },
          { name: 'person6', lastOnline: null },
          { name: 'person7', lastOnline: null },
        ],
        'lastOnline_DESC'
      )
    )
  );
};
