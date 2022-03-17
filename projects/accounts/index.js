require("./environment");
const { GraphQLApp } = require("@itoa/app-graphql");
const { AdminUIApp } = require("@itoa/app-admin-ui");
const { PasswordAuthStrategy } = require("@itoa/auth-password");
const { itoa, schemas } = require("./itoa");
const { configureExpress } = require("./express");
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
 * SCHEMAS
 */
schemas.map(({ config, schema }) => {
  if (!schema.active) return;
  itoa.createList(config.name, schema);
  if (!schema.auth) return;
  const { identityField, secretField } = schema.auth;
  itoa.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: config.name,
    config: {
      identityField,
      secretField,
    },
  });
});
var apps = [
  new GraphQLApp(),
  new AdminUIApp({
    name: "Itoa.vn",
    enableDefaultRoute: false,
    authService,
  }),
];
const dir = process.env.APP;
// if (dir) apps.push(new NextApp({ dir }));

module.exports = {
  itoa,
  apps,
  configureExpress,
};
