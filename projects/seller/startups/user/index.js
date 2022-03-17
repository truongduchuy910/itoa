const { Itoa } = require('@itoa/itoa');
const { gql, request } = require('graphql-request');
const chalk = require('chalk');
var { ram } = require('@itoa/cache');
/**
 * @param {Itoa} itoa
 */
module.exports = async function (itoa, authService) {
  const { allUsers, _allUsersMeta = {} } = await request(
    authService.uri,
    gql`
      query {
        _allUsersMeta(where: { isSeller: true }) {
          count
        }
        allUsers(where: { isSeller: true, domain_not: null }) {
          id
          domain
        }
      }
    `
  );
  ram.allUsers = allUsers;
  console.log('  find', _allUsersMeta.count, 'users');
};
