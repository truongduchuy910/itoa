const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');
const MongoStore = require('connect-mongo');
const { Itoa } = require('@itoa/itoa');
const { AdminUIApp } = require('@itoa/app-admin-ui');
const { GraphQLApp } = require('@itoa/app-graphql');
const { reads } = require('./lib/files');

const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [
    { name: 'basic', url: 'http://localhost:3000/admin/api' },
    { name: 'products', url: 'http://localhost:3001/admin/api' },
  ],
});

const gateway = new ApolloGateway({ supergraphSdl });

var itoa = new Itoa({
  gateway,
  session: {
    secret: 'truongduc910',
    store: new MongoStore({
      mongoUrl: 'mongodb://localhost:27017/session',
    }),
  },
  appName: 'gateway',
});
const schemas = reads('', './schemas').map(config => {
  const schema = require(config.path);
  return { config, schema };
});
schemas.map(({ config, schema }) => {
  if (!schema.active) return;
  itoa.createList(config.name, schema);
});
var apps = [new GraphQLApp(), new AdminUIApp()];
module.exports = {
  itoa,
  apps,
};
