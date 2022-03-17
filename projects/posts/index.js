require('./environment');
const { GraphQLApp } = require('@itoa/app-graphql');
const { AdminUIApp } = require('@itoa/app-admin-ui');
const { itoa, schemas, authService } = require('./itoa');
const { configureExpress } = require('./express');
/**
 * SCHEMAS
 */
schemas.map(({ config, schema }) => {
  if (!schema.active) return;
  itoa.createList(config.name, schema);
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
