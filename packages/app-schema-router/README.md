<!--[meta]
section: api
subSection: apps
title: GraphQL Schema Router
[meta]-->

# GraphQL Schema Router

> This is the last active development release of this package as **Itoa 5** is now in a 6 to 12 month active maintenance phase. For more information please read our [Itoa 5 and beyond](https://github.com/itoa-vn/itoaissues/21) post.

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@itoa/app-schema-router)

A ItoaJS App that route requests to different GraphQL schemas.

The `SchemaRouterApp` allows you to define a `routerFn` which takes `(req, res)` and returns
a `routerId`, which is used to pick between different GraphQL schemas which exist at the same
`apiPath`.

## Usage

```javascript
const { Itoa } = require('@itoa/itoa');
const { GraphQLAppPlayground } = require('@itoa/app-graphql-playground');
const { SchemaRouterApp } = require('@itoa/app-schema-router');
const { GraphQLApp } = require('@itoa/app-graphql');
const { AdminUIApp } = require('@itoa/app-admin-ui');

module.exports = {
  itoa: new Itoa(),
  apps: [
    new GraphQLAppPlayground({ apiPath })
    new SchemaRouterApp({
      apiPath,
      routerFn: (req) => req.session.itoaItemId ? 'private' : 'public',
      apps: {
        public: new GraphQLApp({ apiPath, schemaName: 'public', graphiqlPath: undefined }),
        private: new GraphQLApp({ apiPath, schemaName: 'private', graphiqlPath: undefined }),
      },
    }),
    new AdminUIApp()
  ],
};
```

## Config

| Option     | Type       | Default      | Description                                                    |
| ---------- | ---------- | ------------ | -------------------------------------------------------------- |
| `apiPath`  | `String`   | `/admin/api` | The GraphQL API path                                           |
| `routerFn` | `Function` | `() => {}`   | A function which takes `(req, res)` and returns a `routerId`   |
| `apps`     | `Object`   | `{}`         | An object with `routerId`s as keys and `GraphQLApp`s as values |
