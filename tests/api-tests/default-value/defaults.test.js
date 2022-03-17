const { createItem } = require('@itoa/server-side-graphql-client');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { Text } = require('@itoa/fields');

const setupList = (adapterName, fields) => () =>
  setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('User', { fields });
    },
  });

describe('defaultValue field config', () => {
  multiAdapterRunners().map(({ runner, adapterName }) =>
    describe(`Adapter: ${adapterName}`, () => {
      test(
        'Has no default by default',
        runner(setupList(adapterName, { name: { type: Text } }), async ({ itoa }) => {
          const listKey = 'User';
          const result = await createItem({ itoa, listKey, item: {}, returnFields: 'name' });
          expect(result).toMatchObject({ name: null });
        })
      );

      test(
        'Sets undefined as a default',
        runner(
          setupList(adapterName, { name: { type: Text, defaultValue: undefined } }),
          async ({ itoa }) => {
            const listKey = 'User';
            const result = await createItem({ itoa, listKey, item: {}, returnFields: 'name' });
            expect(result).toMatchObject({ name: null });
          }
        )
      );

      test(
        'Sets null as a default',
        runner(
          setupList(adapterName, { name: { type: Text, defaultValue: null } }),
          async ({ itoa }) => {
            const listKey = 'User';
            const result = await createItem({ itoa, listKey, item: {}, returnFields: 'name' });
            expect(result).toMatchObject({ name: null });
          }
        )
      );

      test(
        'Sets a scalar as a default',
        runner(
          setupList(adapterName, { name: { type: Text, defaultValue: 'hello' } }),
          async ({ itoa }) => {
            const listKey = 'User';
            const result = await createItem({ itoa, listKey, item: {}, returnFields: 'name' });
            expect(result).toMatchObject({ name: 'hello' });
          }
        )
      );

      test(
        'executes a function to get default',
        runner(
          setupList(adapterName, { name: { type: Text, defaultValue: () => 'foobar' } }),
          async ({ itoa }) => {
            const listKey = 'User';
            const result = await createItem({ itoa, listKey, item: {}, returnFields: 'name' });
            expect(result).toMatchObject({ name: 'foobar' });
          }
        )
      );

      test(
        'handles promises returned from function',
        runner(
          setupList(adapterName, {
            name: { type: Text, defaultValue: () => Promise.resolve('zippity') },
          }),
          async ({ itoa }) => {
            const listKey = 'User';
            const result = await createItem({ itoa, listKey, item: {}, returnFields: 'name' });
            expect(result).toMatchObject({ name: 'zippity' });
          }
        )
      );

      test('executes the function with the correct parameters', () => {
        const defaultValue = jest.fn();
        return runner(
          setupList(adapterName, { name: { type: Text, defaultValue } }),
          async ({ itoa }) => {
            await createItem({ itoa, listKey: 'User', item: {} });
            expect(defaultValue).toHaveBeenCalledTimes(1);
            expect(defaultValue).toHaveBeenCalledWith(
              expect.objectContaining({
                context: expect.any(Object),
                originalInput: expect.any(Object),
              })
            );
          }
        )();
      });

      test('passes the originalInput', () => {
        const defaultValue = jest.fn(({ originalInput }) => `${originalInput.salutation} X`);
        return runner(
          setupList(adapterName, {
            name: { type: Text, defaultValue },
            salutation: { type: Text },
          }),
          async ({ itoa }) => {
            const item = { salutation: 'Doctor' };
            const listKey = 'User';
            const result = await createItem({ itoa, listKey, item, returnFields: 'name' });
            expect(defaultValue).toHaveBeenCalledTimes(1);
            expect(defaultValue).toHaveBeenCalledWith(
              expect.objectContaining({
                context: expect.any(Object),
                originalInput: { salutation: 'Doctor' },
              })
            );
            expect(result).toMatchObject({ name: 'Doctor X' });
          }
        )();
      });
    })
  );
});
