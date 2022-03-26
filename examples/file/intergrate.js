const fetch = require('cross-fetch')
const { HttpLink, InMemoryCache, ApolloClient } = require("@apollo/client");
/**
 *
 */
const api = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.itoa.vn/admin/api",
    fetch
  }),
  cache: new InMemoryCache(),
});
module.exports = { api };
