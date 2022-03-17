import { getItems } from '@itoa/server-side-graphql-client';
import Text from '../src/types/Text';

export const name = 'ID';
export { Text as type };
export const exampleValue = () => '"foo"';

export const getTestFields = () => {
  return {
    name: { type: Text },
  };
};

export const initItems = () => {
  return [{ name: 'person1' }, { name: 'person2' }, { name: 'person3' }, { name: 'person4' }];
};

export const skipCrudTest = true;
export const skipCommonFilterTest = true;

const getIDs = async itoa => {
  const IDs = {};
  await itoa.lists['Test'].adapter.findAll().then(data => {
    data.forEach(entry => {
      IDs[entry.name] = entry.id.toString();
    });
  });
  return IDs;
};

export const filterTests = withItoa => {
  const match = async (itoa, where, expected) =>
    expect(
      await getItems({
        itoa,
        listKey: 'Test',
        where,
        returnFields: 'id name',
        sortBy: 'name_ASC',
      })
    ).toEqual(expected);

  test(
    'No filter',
    withItoa(async ({ itoa }) => {
      const IDs = await getIDs(itoa);
      return match(itoa, undefined, [
        { id: IDs['person1'], name: 'person1' },
        { id: IDs['person2'], name: 'person2' },
        { id: IDs['person3'], name: 'person3' },
        { id: IDs['person4'], name: 'person4' },
      ]);
    })
  );

  test(
    'Empty filter',
    withItoa(async ({ itoa }) => {
      const IDs = await getIDs(itoa);
      return match(itoa, {}, [
        { id: IDs['person1'], name: 'person1' },
        { id: IDs['person2'], name: 'person2' },
        { id: IDs['person3'], name: 'person3' },
        { id: IDs['person4'], name: 'person4' },
      ]);
    })
  );

  test(
    'Filter: id',
    withItoa(async ({ itoa }) => {
      const IDs = await getIDs(itoa);
      const id = IDs['person2'];
      return match(itoa, { id }, [{ id: IDs['person2'], name: 'person2' }]);
    })
  );

  test(
    'Filter: id_not',
    withItoa(async ({ itoa }) => {
      const IDs = await getIDs(itoa);
      const id = IDs['person2'];
      return match(itoa, { id_not: id }, [
        { id: IDs['person1'], name: 'person1' },
        { id: IDs['person3'], name: 'person3' },
        { id: IDs['person4'], name: 'person4' },
      ]);
    })
  );

  test(
    'Filter: id_in',
    withItoa(async ({ itoa }) => {
      const IDs = await getIDs(itoa);
      const id2 = IDs['person2'];
      const id3 = IDs['person3'];
      return match(itoa, { id_in: [id2, id3] }, [
        { id: IDs['person2'], name: 'person2' },
        { id: IDs['person3'], name: 'person3' },
      ]);
    })
  );

  test(
    'Filter: id_in - empty list',
    withItoa(({ itoa }) => {
      return match(itoa, { id_in: [] }, []);
    })
  );

  test(
    'Filter: id_in - missing id',
    withItoa(({ itoa, adapterName }) => {
      const fakeID = '0123456789abcdef01234567';
      return match(itoa, { id_in: [fakeID] }, []);
    })
  );

  test(
    'Filter: id_not_in',
    withItoa(async ({ itoa }) => {
      const IDs = await getIDs(itoa);
      const id2 = IDs['person2'];
      const id3 = IDs['person3'];
      return match(itoa, { id_not_in: [id2, id3] }, [
        { id: IDs['person1'], name: 'person1' },
        { id: IDs['person4'], name: 'person4' },
      ]);
    })
  );

  test(
    'Filter: id_not_in - empty list',
    withItoa(async ({ itoa }) => {
      const IDs = await getIDs(itoa);
      return match(itoa, { id_not_in: [] }, [
        { id: IDs['person1'], name: 'person1' },
        { id: IDs['person2'], name: 'person2' },
        { id: IDs['person3'], name: 'person3' },
        { id: IDs['person4'], name: 'person4' },
      ]);
    })
  );

  test(
    'Filter: id_not_in - missing id',
    withItoa(async ({ itoa, adapterName }) => {
      const IDs = await getIDs(itoa);
      const fakeID = '0123456789abcdef01234567';
      return match(itoa, { id_not_in: [fakeID] }, [
        { id: IDs['person1'], name: 'person1' },
        { id: IDs['person2'], name: 'person2' },
        { id: IDs['person3'], name: 'person3' },
        { id: IDs['person4'], name: 'person4' },
      ]);
    })
  );
};
