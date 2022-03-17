require('./environment');
const { GraphQLApp } = require('@itoa/app-graphql');
const { AdminUIApp } = require('@itoa/app-admin-ui');
const { itoa, schemas, authService } = require('./itoa');
const { configureExpress } = require('./express');
const { PasswordAuthStrategy } = require('@itoa/auth-password');
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
    authService,
  }),
];

module.exports = {
  itoa,
  apps,
  configureExpress,
};
