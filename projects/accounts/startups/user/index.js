const { Itoa } = require("@itoa/itoa");
const { gql } = require("@apollo/client");
const chalk = require("chalk");
/**
 * @param {Itoa} itoa
 */
module.exports = async function (itoa) {
  const {
    data: {
      _allUsersMeta: { count = 0 },
    },
    errors,
  } = await itoa.executeGraphQL({
    context: itoa.createContext({ skipAccessControl: true }),
    query: gql`
      query {
        _allUsersMeta {
          count
        }
      }
    `,
  });

  // LOG
  console.log(chalk.yellow("startup"), "user");
  console.log("  find", count, "users");
  if (errors && errors.length) {
    errors.map((error) => {
      console.log("  error", error);
    });
  }
  if (count !== 0) return;
  const {
    data: { createUser },
  } = await itoa.executeGraphQL({
    context: itoa.createContext({ skipAccessControl: true }),
    query: gql`
      mutation initialUser($data: UserCreateInput) {
        createUser(data: $data) {
          id
          name
        }
      }
    `,
    variables: {
      data: {
        phone: "0332813077",
        password: "0332813077",
      },
    },
  });
  console.log(`  create`, createUser.name);
};
