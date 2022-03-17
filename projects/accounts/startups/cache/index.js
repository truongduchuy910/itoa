const { Itoa } = require("@itoa/itoa");
const chalk = require("chalk");
const { gql } = require("@apollo/client");
var { ram } = require("@itoa/cache");
/**
 * @param {Itoa} itoa
 */
module.exports = async function (itoa) {
  const context = itoa.createContext({ skipAccessControl: true });
  const {
    data: { allUsers = [], allProductCategories = [] },
    errors = [],
  } = await itoa.executeGraphQL({
    context,
    query: gql`
      query {
        allProductCategories {
          id
          name
        }
        allUsers {
          id
          domain
          language
        }
      }
    `,
    skipAccessControl: true,
  });
  ram.allUsers = allUsers;
  ram.allProductCategories = allProductCategories;
  // LOG
  console.log(chalk.yellow("startup"), "cache");
  console.log("  find", allUsers.length, "users");
  console.log("  find", allProductCategories.length, "categories");
  if (errors && errors.length) {
    errors.map((error) => {
      console.log("  error", error);
    });
  }
};
