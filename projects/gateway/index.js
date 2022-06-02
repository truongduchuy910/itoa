require("./environment");
const {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} = require("@apollo/gateway");
const MongoStore = require("connect-mongo");
const { Itoa } = require("@itoa/itoa");
const { AdminUIApp } = require("@itoa/app-admin-ui");
const { GraphQLApp } = require("@itoa/app-graphql");
const { PasswordAuthStrategy } = require("@itoa/auth-password");
const { reads } = require("./lib/files");

const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [
    { name: "account", url: "http://gamma.itoa.vn:3000/admin/api" },
    { name: "seller", url: "http://gamma.itoa.vn:3001/admin/api" },
    { name: "api", url: "http://gamma.itoa.vn:3002/admin/api" },
  ],
});

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.req) {
      request.http.headers = context.req.headers;
    }
  }
}

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService({ name, url }) {
    return new AuthenticatedDataSource({ url });
  },
});

var itoa = new Itoa({
  gateway,
  session: {
    secret: process.env.COOKIE,
    store: new MongoStore({
      mongoUrl: process.env.DB_SESSION,
    }),
  },
  appName: "gateway",
});
const schemas = reads("", "./schemas").map((config) => {
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
    name: "Itoa.vn",
    enableDefaultRoute: false,
    authService: {
      gqlNames: {
        authenticateMutationName: "authenticateUserWithPassword",
        authenticatedQueryName: "authenticatedUser",
        unauthenticateMutationName: "unauthenticateUser",
      },
      identityField: "username",
      secretField: "password",
      uri: "/admin/api",
    },
  }),
];
module.exports = {
  itoa,
  apps,
};
