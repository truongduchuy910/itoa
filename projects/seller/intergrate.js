const { HttpLink, InMemoryCache, ApolloClient } = require("@apollo/client");
/**
 *
 */
const api = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.itoa.vn/admin/api",
  }),
  cache: new InMemoryCache(),
});
module.exports = { api };
