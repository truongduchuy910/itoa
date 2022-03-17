const { Text, Integer } = require('@itoa/fields');
const { multiAdapterRunners, setupServer } = require('@itoa/test-utils');
const { createItem } = require('@itoa/server-side-graphql-client');

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('Test', {
        fields: {
          name: { type: Text },
        },
      });
      itoa.createList('Number', {
        fields: {
          name: { type: Integer },
        },
      });
      itoa.createList('Custom', {
        fields: {
          other: { type: Text },
        },
        adapterConfig: { searchField: 'other' },
      });
    },
  });
}

multiAdapterRunners().map(({ runner, adapterName }) =>
  describe(`Adapter: ${adapterName}`, () => {
    test(
      'users',
      runner(setupItoa, async ({ itoa }) => {
        const create = async (listKey, item) => createItem({ itoa, listKey, item });
        await Promise.all([
          create('Test', { name: 'one' }),
          create('Test', { name: '%islikelike%' }),
          create('Test', { name: 'three' }),
          create('Number', { name: 12345 }),
        ]);

        const { data, errors } = await itoa.executeGraphQL({
          query: `
          query {
            allTests(
              search: "one",
            ) {
              name
            }
          }
      `,
        });
        expect(errors).toBe(undefined);
        expect(data).toHaveProperty('allTests');
        expect(data.allTests).toEqual([{ name: 'one' }]);
      })
    );

    test(
      'users - case sensitive',
      runner(setupItoa, async ({ itoa }) => {
        const create = async (listKey, item) => createItem({ itoa, listKey, item });
        await Promise.all([
          create('Test', { name: 'one' }),
          create('Test', { name: '%islikelike%' }),
          create('Test', { name: 'three' }),
          create('Number', { name: 12345 }),
        ]);

        const { data, errors } = await itoa.executeGraphQL({
          query: `
          query {
            allTests(
              search: "ONE",
            ) {
              name
            }
          }
      `,
        });
        expect(errors).toBe(undefined);
        expect(data).toHaveProperty('allTests');
        expect(data.allTests).toEqual([{ name: 'one' }]);
      })
    );

    test(
      'users - partial case sensitive',
      runner(setupItoa, async ({ itoa }) => {
        const create = async (listKey, item) => createItem({ itoa, listKey, item });
        await Promise.all([
          create('Test', { name: 'one' }),
          create('Test', { name: '%islikelike%' }),
          create('Test', { name: 'three' }),
          create('Number', { name: 12345 }),
        ]);

        const { data, errors } = await itoa.executeGraphQL({
          query: `
          query {
            allTests(
              search: "N",
            ) {
              name
            }
          }
      `,
        });
        expect(errors).toBe(undefined);
        expect(data).toHaveProperty('allTests');
        expect(data.allTests).toEqual([{ name: 'one' }]);
      })
    );

    test(
      'users - like escapes',
      runner(setupItoa, async ({ itoa }) => {
        const create = async (listKey, item) => createItem({ itoa, listKey, item });
        await Promise.all([
          create('Test', { name: 'one' }),
          create('Test', { name: '%islikelike%' }),
          create('Test', { name: 'three' }),
          create('Number', { name: 12345 }),
        ]);

        const { data, errors } = await itoa.executeGraphQL({
          query: `
          query {
            allTests(
              search: ${JSON.stringify(`%islikelike%`)},
            ) {
              name
            }
          }
      `,
        });
        expect(errors).toBe(undefined);
        expect(data).toHaveProperty('allTests');
        expect(data.allTests).toEqual([{ name: '%islikelike%' }]);
      })
    );

    test(
      'users - regex',
      runner(setupItoa, async ({ itoa }) => {
        const create = async (listKey, item) => createItem({ itoa, listKey, item });

        await Promise.all([
          create('Test', { name: 'one' }),
          create('Test', { name: '%islikelike%' }),
          create('Test', { name: 'three' }),
          create('Number', { name: 12345 }),
        ]);

        const { data, errors } = await itoa.executeGraphQL({
          query: `
          query {
            allTests(
              search: ${JSON.stringify(`/thr(.*)/`)},
            ) {
              name
            }
          }
      `,
        });
        expect(errors).toBe(undefined);
        expect(data).toHaveProperty('allTests');
        expect(data.allTests).toEqual([]); // No results
      })
    );

    test(
      'users - numbers',
      runner(setupItoa, async ({ itoa }) => {
        const create = async (listKey, item) => createItem({ itoa, listKey, item });
        await Promise.all([
          create('Test', { name: 'one' }),
          create('Test', { name: '%islikelike%' }),
          create('Test', { name: 'three' }),
          create('Number', { name: 12345 }),
        ]);

        const { data, errors } = await itoa.executeGraphQL({
          query: `
          query {
            allNumbers(
              search: "12345",
            ) {
              name
            }
          }
      `,
        });
        expect(errors).toBe(undefined);
        expect(data).toHaveProperty('allNumbers');
        expect(data.allNumbers).toEqual([]); // No results
      })
    );

    test(
      'empty string',
      runner(setupItoa, async ({ itoa }) => {
        const create = async (listKey, item) => createItem({ itoa, listKey, item });
        await Promise.all([
          create('Test', { name: 'one' }),
          create('Test', { name: '%islikelike%' }),
          create('Test', { name: 'three' }),
          create('Number', { name: 12345 }),
        ]);

        const { data, errors } = await itoa.executeGraphQL({
          query: `
          query {
            allTests(
              sortBy: name_ASC,
              search: "",
            ) {
              name
            }
          }
      `,
        });
        expect(errors).toBe(undefined);
        expect(data).toHaveProperty('allTests');
        expect(data.allTests).toEqual([
          { name: '%islikelike%' },
          { name: 'one' },
          { name: 'three' },
        ]); // All results
      })
    );
    test(
      'custom',
      runner(setupItoa, async ({ itoa }) => {
        const create = async (listKey, item) => createItem({ itoa, listKey, item });
        await Promise.all([
          create('Test', { name: 'one' }),
          create('Test', { name: '%islikelike%' }),
          create('Test', { name: 'three' }),
          create('Number', { name: 12345 }),
          create('Custom', { other: 'one' }),
          create('Custom', { other: 'two' }),
        ]);

        const { data, errors } = await itoa.executeGraphQL({
          query: `
          query {
            allCustoms(
              search: "one",
            ) {
              other
            }
          }
      `,
        });
        expect(errors).toBe(undefined);
        expect(data).toHaveProperty('allCustoms');
        expect(data.allCustoms).toEqual([{ other: 'one' }]);
      })
    );
  })
);
