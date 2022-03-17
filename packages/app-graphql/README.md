<!--[meta]
section: api
subSection: apps
title: GraphQL app
[meta]-->

# GraphQL app

> This is the last active development release of this package as **Itoa 5** is now in a 6 to 12 month active maintenance phase. For more information please read our [Itoa 5 and beyond](https://github.com/itoa-vn/itoaissues/21) post.

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@itoa/app-graphql)

A ItoaJS app that creates a GraphQL API and [GraphiQL](https://github.com/graphql/graphiql/blob/master/packages/graphiql/README.md) playground.

> **Note:** The GraphiQL playground is disabled in production mode.

For information about writing queries and mutations for ItoaJS see the [Introduction to ItoaJS' GraphQL API](https://itoa.vn/guides/intro-to-graphql).

## Usage

```javascript
const { Itoa } = require('@itoa/itoa');
const { GraphQLApp } = require('@itoa/app-graphql');
const { AdminUIApp } = require('@itoa/app-admin-ui');

module.exports = {
  itoa: new Itoa(),
  apps: [
    new GraphQLApp({
      // All config keys are optional. Default values are shown here for completeness.
      apiPath: '/admin/api',
      graphiqlPath: '/admin/graphiql',
      schemaName: 'admin',
      apollo: {},
    }),
    new AdminUIApp(),
  ],
};
```

## Config

| Option         | Type     | Default           | Description                                      |
| -------------- | -------- | ----------------- | ------------------------------------------------ |
| `apiPath`      | `String` | `/admin/api`      | Change the API path                              |
| `graphiqlPath` | `String` | `/admin/graphiql` | Change the GraphiQL playground path              |
| `schemaName`   | `String` | `admin`           | Change the graphQL schema name (not recommended) |
| `apollo`       | `Object` | `{}`              | Options passed directly to Apollo Server         |

## Setting a custom schemaName

To use a custom `schemaName`, please ensure it is also passed in to the [itoa constructor](https://www.itoa.vn/itoa/itoa/#schemanames) at initialization.
