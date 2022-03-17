const { Text } = require('@itoa/fields');
const { setupServer } = require('@itoa/test-utils');
const { FixtureGroup, timeQuery, populate, range } = require('../lib/utils');

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('User', {
        fields: {
          name: { type: Text },
        },
      });
    },
  });
}

const group = new FixtureGroup(setupItoa);

group.add({
  fn: async ({ itoa, adapterName }) => {
    const query = `
    mutation {
      createUser(data: { name: "test" }) { id }
    }`;
    const { time, success } = await timeQuery({ itoa, query });
    console.log({ adapterName, time, success, name: 'Cold create, N=1' });
  },
});

group.add({
  fn: async ({ itoa, adapterName }) => {
    const query = `
    mutation {
      createUser(data: { name: "test" }) { id }
    }`;
    const { time, success } = await timeQuery({ itoa, query });
    console.log({ adapterName, time, success, name: 'Warm create, N=1' });
  },
});

range(15).forEach(i => {
  const N = 2 ** i;
  group.add({
    fn: async ({ itoa, adapterName }) => {
      const query = `
      mutation createMany($users: [UsersCreateInput]){
        createUsers(data: $users) { id }
      }`;
      const variables = { users: populate(N, i => ({ data: { name: `test${i}` } })) };
      const { time, success } = await timeQuery({ itoa, query, variables });
      console.log({ adapterName, time, success, name: `Create-many, N=${N}` });
    },
  });
});

module.exports = [group];
