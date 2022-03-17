const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { Integer, Virtual } = require('@itoa/fields');

function makeSetupItoa(fields) {
  return function setupItoa(adapterName) {
    return setupServer({
      adapterName,
      createLists: itoa => {
        itoa.createList('Post', {
          fields: {
            value: { type: Integer },
            ...fields,
          },
        });
      },
    });
  };
}

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe('Virtual field type', () => {
      test(
        'Default - resolver returns a string',
        runner(
          makeSetupItoa({
            foo: { type: Virtual, resolver: () => 'Hello world!' },
          }),
          async ({ itoa }) => {
            const { data, errors } = await itoa.executeGraphQL({
              query: `mutation {
                createPost(data: { value: 1 }) { value, foo }
              }`,
            });
            expect(errors).toBe(undefined);
            expect(data.createPost.value).toEqual(1);
            expect(data.createPost.foo).toEqual('Hello world!');
          }
        )
      );

      test(
        'graphQLReturnType',
        runner(
          makeSetupItoa({
            foo: { type: Virtual, graphQLReturnType: 'Int', resolver: () => 42 },
          }),
          async ({ itoa }) => {
            const { data, errors } = await itoa.executeGraphQL({
              query: `mutation {
                createPost(data: { value: 1 }) { value, foo }
              }`,
            });
            expect(errors).toBe(undefined);
            expect(data.createPost.value).toEqual(1);
            expect(data.createPost.foo).toEqual(42);
          }
        )
      );

      test(
        'args',
        runner(
          makeSetupItoa({
            foo: {
              type: Virtual,
              graphQLReturnType: 'Int',
              args: [
                { name: 'x', type: 'Int' },
                { name: 'y', type: 'Int' },
              ],
              resolver: (item, { x = 5, y = 6 }) => x * y,
            },
          }),
          async ({ itoa }) => {
            const { data, errors } = await itoa.executeGraphQL({
              query: `mutation {
                createPost(data: { value: 1 }) { value, foo(x: 10, y: 20) }
              }`,
            });
            expect(errors).toBe(undefined);
            expect(data.createPost.value).toEqual(1);
            expect(data.createPost.foo).toEqual(200);
          }
        )
      );

      test(
        'args - use defaults',
        runner(
          makeSetupItoa({
            foo: {
              type: Virtual,
              graphQLReturnType: 'Int',
              args: [
                { name: 'x', type: 'Int' },
                { name: 'y', type: 'Int' },
              ],
              resolver: (item, { x = 5, y = 6 }) => x * y,
            },
          }),
          async ({ itoa }) => {
            const { data, errors } = await itoa.executeGraphQL({
              query: `mutation {
                createPost(data: { value: 1 }) { value, foo }
              }`,
            });
            expect(errors).toBe(undefined);
            expect(data.createPost.value).toEqual(1);
            expect(data.createPost.foo).toEqual(30);
          }
        )
      );

      test(
        'graphQLReturnFragment',
        runner(
          makeSetupItoa({
            foo: {
              type: Virtual,
              extendGraphQLTypes: [`type Movie { title: String, rating: Int }`],
              graphQLReturnType: '[Movie]',
              resolver: () => [{ title: 'CATS!', rating: 100 }],
            },
          }),
          async ({ itoa }) => {
            const { data, errors } = await itoa.executeGraphQL({
              query: `mutation {
                createPost(data: { value: 1 }) { value, foo { title rating } }
              }`,
            });
            expect(errors).toBe(undefined);
            expect(data.createPost.value).toEqual(1);
            expect(data.createPost.foo).toEqual([{ title: 'CATS!', rating: 100 }]);
          }
        )
      );
    });
  })
);
