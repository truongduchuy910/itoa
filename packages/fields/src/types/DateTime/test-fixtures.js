import { getItems } from '@itoa/server-side-graphql-client';
import Text from '../Text';
import DateTime from './';

export const name = 'DateTime';
export const type = DateTime;
export const exampleValue = () => '1990-12-31T12:34:56.789+01:23';
export const exampleValue2 = () => '2000-01-20T00:08:00.000+10:00';
export const supportsUnique = true;
export const fieldName = 'lastOnline';

export const getTestFields = () => ({ name: { type: Text }, lastOnline: { type } });

export const initItems = () => {
  return [
    { name: 'person1', lastOnline: '1666-04-12T00:08:00.000+10:00' },
    { name: 'person2', lastOnline: '1950-10-01T23:59:59.999-10:00' },
    { name: 'person3', lastOnline: '1990-12-31T12:34:56.789+01:23' },
    { name: 'person4', lastOnline: '2000-01-20T00:08:00.000+10:00' },
    { name: 'person5', lastOnline: '2020-06-10T10:20:30.456+10:00' },
    { name: 'person6', lastOnline: null },
    { name: 'person7' },
  ];
};

export const storedValues = () => [
  { name: 'person1', lastOnline: '1666-04-12T00:08:00.000+10:00' },
  { name: 'person2', lastOnline: '1950-10-01T23:59:59.999-10:00' },
  { name: 'person3', lastOnline: '1990-12-31T12:34:56.789+01:23' },
  { name: 'person4', lastOnline: '2000-01-20T00:08:00.000+10:00' },
  { name: 'person5', lastOnline: '2020-06-10T10:20:30.456+10:00' },
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
          { name: 'person1', lastOnline: '1666-04-12T00:08:00.000+10:00' },
          { name: 'person2', lastOnline: '1950-10-01T23:59:59.999-10:00' },
          { name: 'person3', lastOnline: '1990-12-31T12:34:56.789+01:23' },
          { name: 'person4', lastOnline: '2000-01-20T00:08:00.000+10:00' },
          { name: 'person5', lastOnline: '2020-06-10T10:20:30.456+10:00' },
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
          { name: 'person5', lastOnline: '2020-06-10T10:20:30.456+10:00' },
          { name: 'person4', lastOnline: '2000-01-20T00:08:00.000+10:00' },
          { name: 'person3', lastOnline: '1990-12-31T12:34:56.789+01:23' },
          { name: 'person2', lastOnline: '1950-10-01T23:59:59.999-10:00' },
          { name: 'person1', lastOnline: '1666-04-12T00:08:00.000+10:00' },
          { name: 'person6', lastOnline: null },
          { name: 'person7', lastOnline: null },
        ],
        'lastOnline_DESC'
      )
    )
  );
};
