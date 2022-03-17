const MongoStore = require("connect-mongo");
const { Itoa } = require("@itoa/itoa");
const { MongooseAdapter } = require("@itoa/adapter-mongoose");
const { reads } = require("./lib/files");
const { roleSeller } = require("./schemas/access");

const authService = {
  gqlNames: {
    authenticateMutationName: "authenticateUserWithPassword",
    authenticatedQueryName: "authenticatedUser",
    unauthenticateMutationName: "unauthenticateUser",
  },
  identityField: "username",
  secretField: "password",
  uri: process.env.AUTH_URI,
};

/**
 * STARTUPS FUNCTION
 */
const startups = reads("", "./startups").map((config) => {
  return require(config.path);
});
async function onConnect(itoa) {
  startups.map((startup) => {
    startup(itoa, authService);
  });
}
const { COOKIE, DB_CORE, DB_SESSION } = process.env;
var itoa = new Itoa({
  defaultAccess: { list: roleSeller },
  adapter: new MongooseAdapter({
    mongoUri: DB_CORE,
  }),
  session: {
    secret: COOKIE,
    store: new MongoStore({
      mongoUrl: DB_SESSION,
    }),
  },
  authService,
  onConnect,
});
/**
 * EXTEND GRAPHQL
 */
const extendSchemas = reads("", "./extends").map((config) => {
  const schema = require(config.path);
  itoa.extendGraphQLSchema(schema);
  return { config, schema };
});
/**
 *
 */
const schemas = reads("", "./schemas").map((config) => {
  const schema = require(config.path);
  return { config, schema };
});
module.exports = { schemas, extendSchemas, startups, itoa, authService };
