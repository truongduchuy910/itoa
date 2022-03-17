const { Text, Relationship } = require('@itoa/fields');
const { setupServer } = require('@itoa/test-utils');
const { FixtureGroup, timeQuery, populate, range } = require('../lib/utils');

function setupItoa(adapterName) {
  return setupServer({
    adapterName,
    createLists: itoa => {
      itoa.createList('User', {
        fields: {
          name: { type: Text },
          posts: { type: Relationship, ref: 'Post', many: true },
        },
      });
      itoa.createList('Post', {
        fields: {
          title: { type: Text },
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
      createUser(data: { name: "test", posts: { create: [] } }) { id }
    }`;
    const { time, success } = await timeQuery({ itoa, query });
    console.log({ adapterName, time, success, name: 'Cold create with relationship, N=1' });
  },
});

group.add({
  fn: async ({ itoa, adapterName }) => {
    const query = `
    mutation {
      createUser(data: { name: "test", posts: { create: [] } }) { id }
    }`;
    const { time, success } = await timeQuery({ itoa, query });
    console.log({ adapterName, time, success, name: 'Warm create with relationship, N=1' });
  },
});

range(14).forEach(i => {
  const N = 1;
  const M = 2 ** i;
  group.add({
    fn: async ({ itoa, adapterName }) => {
      const query = `
      mutation createMany($users: [UsersCreateInput]){
        createUsers(data: $users) { id }
      }`;
      const posts = { create: populate(M, i => ({ title: `post${i}` })) };
      const variables = { users: populate(N, i => ({ data: { name: `test${i}`, posts } })) };
      const { time, success } = await timeQuery({ itoa, query, variables });
      console.log({
        adapterName,
        time,
        success,
        name: `Create-many with relationship, users=${N} posts=${M}`,
      });
    },
  });
});

const k = 14;
range(k).forEach(i => {
  const N = 2 ** i;
  const M = 2 ** (k - 1 - i);
  group.add({
    fn: async ({ itoa, adapterName }) => {
      const query = `
      mutation createMany($users: [UsersCreateInput]){
        createUsers(data: $users) { id }
      }`;
      const posts = { create: populate(M, i => ({ title: `post${i}` })) };
      const variables = { users: populate(N, i => ({ data: { name: `test${i}`, posts } })) };
      const { time, success } = await timeQuery({ itoa, query, variables });
      console.log({
        adapterName,
        time,
        success,
        name: `Create-many with relationship, users=${N} posts=${M}`,
      });
    },
  });
});

module.exports = [group];
