const { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } = require('@apollo/gateway');
const MongoStore = require('connect-mongo');
const { Itoa } = require('@itoa/itoa');
const { AdminUIApp } = require('@itoa/app-admin-ui');
const { GraphQLApp } = require('@itoa/app-graphql');
const { PasswordAuthStrategy } = require('@itoa/auth-password');
const { reads } = require('./lib/files');

const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [
    { name: 'basic', url: 'http://localhost:3000/admin/api' },
    { name: 'seller', url: 'http://localhost:3001/admin/api' },
    { name: 'api', url: 'http://localhost:3002/admin/api' },
  ],
});

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.req) {
      request.http.headers = context.req.headers;
    }
  }
}
class CookieDataSource extends RemoteGraphQLDataSource {
  didReceiveResponse({ response, request, context }) {
    if (context.req) {
      // console.log(context.req.body.query);
    }
    const { errors = [] } = response;
    if (errors.length) {
      errors.map(error => console.log(JSON.stringify(error)));
    }
    return response;
  }
  willSendRequest({ request, context }) {
    if (context.req) {
      request.http.headers = context.req.headers;
    }
  }
}

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService({ name, url }) {
    return new CookieDataSource({ url });
  },
});

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
    name: 'Itoa.vn',
    enableDefaultRoute: false,
    authService: {
      gqlNames: {
        authenticateMutationName: 'authenticateUserWithPassword',
        authenticatedQueryName: 'authenticatedUser',
        unauthenticateMutationName: 'unauthenticateUser',
      },
      identityField: 'username',
      secretField: 'password',
      uri: '/admin/api',
    },
  }),
];
module.exports = {
  itoa,
  apps,
};
