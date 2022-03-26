const MongoStore = require("connect-mongo");
const { Itoa } = require("@itoa/itoa");
const { MongooseAdapter } = require("@itoa/adapter-mongoose");
const { reads } = require("./lib/files");
// const { Authorization } = require("./packages/authorization");
/**
 * STARTUPS FUNCTION
 */
const startups = reads("", "./startups").map((config) => {
  return require(config.path);
});
async function onConnect(itoa) {
  startups.map((startup) => {
    startup(itoa);
  });
}

const { DB_CORE, DB_SESSION, COOKIE } = process.env;
var itoa = new Itoa({
  // defaultAccess: new Authorization(),
  onConnect,
  adapter: new MongooseAdapter({
    mongoUri: DB_CORE,
  }),
  session: {
    secret: COOKIE,
    store: new MongoStore({
      mongoUrl: DB_SESSION,
    }),
  },
  appName: "Account",
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
module.exports = { schemas, extendSchemas, startups, itoa };
