const { Text } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');

const falseFn = () => false;

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('User', {
        fields: { name: { type: Text } },
      });
      itoa.extendGraphQLSchema({
        queries: [
          {
            schema: 'double(x: Int): Int',
            resolver: (_, { x }) => 2 * x,
            access: true,
          },
          {
            schema: 'quads(x: Int): Int',
            resolver: (_, { x }) => 4 * x,
            access: falseFn,
          },
        ],
        mutations: [
          {
            schema: 'triple(x: Int): Int',
            resolver: (_, { x }) => 3 * x,
            access: true,
          },
        ],
      });
    },
  });
}
multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    describe('itoa.extendGraphQLSchema()', () => {
      it(
        'Sets up access control properly',
        runner(setupItoa, async ({ itoa }) => {
          expect(itoa._customProvider._extendedQueries.map(({ access }) => access)).toEqual([
            { internal: true, public: true },
            { internal: true, public: falseFn },
          ]);
          expect(itoa._customProvider._extendedMutations.map(({ access }) => access)).toEqual([
            { internal: true, public: true },
          ]);
        })
      );

      it(
        'Executes custom queries correctly',
        runner(setupItoa, async ({ itoa }) => {
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              query {
                double(x: 10)
              }
            `,
          });

          if (errors && errors.length) {
            throw errors;
          }

          expect(data.double).toEqual(20);
        })
      );
      it(
        'Denies access acording to access control',
        runner(setupItoa, async ({ itoa }) => {
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              query {
                quads(x: 10)
              }
            `,
          });
          expect(data.quads).toBe(null);
          expect(errors).not.toBe(undefined);
          expect(errors).toHaveLength(1);
        })
      );
      it(
        'Executes custom mutations correctly',
        runner(setupItoa, async ({ itoa }) => {
          const { data, errors } = await itoa.executeGraphQL({
            query: `
              mutation {
                triple(x: 10)
              }
            `,
          });

          if (errors && errors.length) {
            throw errors;
          }

          expect(data.triple).toEqual(30);
        })
      );
    });
  })
);
