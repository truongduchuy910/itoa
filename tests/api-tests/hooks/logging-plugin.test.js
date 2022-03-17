const { Text, Password } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { logging } = require('@itoa/list-plugins');
const {
  createItem,
  updateItem,
  deleteItem,
  runCustomQuery,
} = require('@itoa/server-side-graphql-client');
const { PasswordAuthStrategy } = require('@itoa/auth-password');

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa._logFunction = jest.fn();
      itoa.createList('User', {
        fields: {
          name: { type: Text },
          other: { type: Text },
          password: { type: Password },
        },
        plugins: [logging(itoa._logFunction)],
      });
      itoa.createAuthStrategy({
        type: PasswordAuthStrategy,
        list: 'User',
        config: {
          identityField: 'name',
          secretField: 'password',
        },
        plugins: [logging(itoa._logFunction)],
      });
    },
  });
}

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    test(
      'Logging Hooks: create',
      runner(setupItoa, async ({ itoa }) => {
        const context = itoa.createContext({
          authentication: { item: { foo: 'bar' }, listKey: 'Other' },
        });
        await createItem({ context, listKey: 'User', item: { name: 'test' } });
        expect(itoa._logFunction).toHaveBeenCalledWith({
          operation: 'create',
          authedItem: { foo: 'bar' },
          authedListKey: 'Other',
          listKey: 'User',
          originalInput: { name: 'test' },
          createdItem: expect.objectContaining({ name: 'test' }),
        });
      })
    );

    test(
      'Logging Hooks: update',
      runner(setupItoa, async ({ itoa }) => {
        const context = itoa.createContext({
          authentication: { item: { foo: 'bar' }, listKey: 'Other' },
        });
        const { id } = await createItem({
          context,
          listKey: 'User',
          item: { name: 'test', other: 'bar' },
        });
        await updateItem({ context, listKey: 'User', item: { id, data: { name: 'something' } } });
        expect(itoa._logFunction).toHaveBeenNthCalledWith(2, {
          operation: 'update',
          authedItem: { foo: 'bar' },
          authedListKey: 'Other',
          listKey: 'User',
          originalInput: { name: 'something' },
          changedItem: expect.objectContaining({ name: 'something' }),
        });
      })
    );

    test(
      'Logging Hooks: delete',
      runner(setupItoa, async ({ itoa }) => {
        const context = itoa.createContext({
          authentication: { item: { foo: 'bar' }, listKey: 'Other' },
        });
        const { id } = await createItem({
          context,
          listKey: 'User',
          item: { name: 'test', other: 'bar' },
        });
        await deleteItem({ context, listKey: 'User', itemId: id });
        expect(itoa._logFunction).toHaveBeenNthCalledWith(2, {
          operation: 'delete',
          authedItem: { foo: 'bar' },
          authedListKey: 'Other',
          listKey: 'User',
          deletedItem: expect.objectContaining({ name: 'test', other: 'bar' }),
        });
      })
    );

    test(
      'Logging Hooks: auth',
      runner(setupItoa, async ({ itoa }) => {
        const context = itoa.createContext({});
        context.startAuthedSession = () => 't0k3n';
        await createItem({
          context,
          listKey: 'User',
          item: { name: 'test', password: 't3sting!' },
        });
        await runCustomQuery({
          context,
          query: `mutation m($name: String, $password: String) {
            authenticateUserWithPassword(name: $name, password: $password) { token item { id } }
          }`,
          variables: { name: 'test', password: 't3sting!' },
        });
        expect(itoa._logFunction).toHaveBeenNthCalledWith(2, {
          operation: 'authenticate',
          authedItem: undefined,
          authedListKey: undefined,
          listKey: 'User',
          item: expect.objectContaining({ name: 'test' }),
          success: true,
          message: 'Authentication successful',
          token: 't0k3n',
        });
      })
    );

    test(
      'Logging Hooks: unauth',
      runner(setupItoa, async ({ itoa }) => {
        const context = itoa.createContext();
        context.startAuthedSession = () => 't0k3n';
        await createItem({
          context,
          listKey: 'User',
          item: { name: 'test', password: 't3sting!' },
        });
        await runCustomQuery({
          context,
          query: `mutation m($name: String, $password: String) {
            authenticateUserWithPassword(name: $name, password: $password) { token item { id } }
          }`,
          variables: { name: 'test', password: 't3sting!' },
        });

        const _context = itoa.createContext({
          authentication: { item: { foo: 'bar' }, listKey: 'Other' },
        });
        _context.endAuthedSession = () => ({ success: true, listKey: 'Foo', itemId: 'X' });
        await runCustomQuery({
          context: _context,
          query: `mutation  {
            unauthenticateUser{ success }
          }`,
        });

        expect(itoa._logFunction).toHaveBeenNthCalledWith(3, {
          operation: 'unauthenticate',
          authedItem: { foo: 'bar' },
          authedListKey: 'Other',
          listKey: 'Foo',
          itemId: 'X',
        });
      })
    );
  })
);
