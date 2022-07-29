<!--[meta]
section: guides
title: Itoa apps
[meta]-->

# Itoa apps

A Itoa instance acts as a function of your schema which
creates a GraphQL API for querying and an Admin UI for managing your data:

```javascript allowCopy=false showLanguage=false
schema => ({ GraphQL, AdminUI });
```

## Introduction

Here, `GraphQL` and `AdminUI` are referred to as **Apps**.

A Itoa **App** has two primary purposes

1. Prepare an `express`-compatible middleware for handling incoming http requests
2. Provide a `build()` method to create a static production build for this app

At a minimum a Itoa application requires one app, the [GraphQL API](/packages/app-graphql/README.md):

```javascript title=index.js
const { GraphQLApp } = require('@itoa/app-graphql');
const { Itoa } = require('@itoa/itoa');

const itoa = new Itoa();

module.exports = {
  itoa,
  apps: [new GraphQLApp()],
};
```

Most of the time the `GraphQLApp` will be paired with an `AdminUIApp` which
provides the functionality of the Itoa Admin UI:

```diff title=index.js allowCopy=false showLanguage=false
 const { GraphQLApp } = require('@itoa/app-graphql');
 const { Itoa } = require('@itoa/itoa');
+const { AdminUIApp } = require('@itoa/app-admin-ui');

 const itoa = new Itoa();

 module.exports = {
   itoa,
   apps: [
     new GraphQLApp(),
+    new AdminUIApp(),
   ]
 }
```

In both cases, the `itoa dev` and `itoa start` commands will consume the
exported `.apps` array, making their middleware available in the order the apps
are specified.

If you're using a [Custom Server](/docs/guides/custom-server.md), it will be your
responsibility to ensure each app's middleware is correctly injected into any
http server you setup.

Other interesting Itoa compatible Apps are:

- [Static App](/packages/app-static/README.md) for serving static files.
- [Next.js App](/packages/app-next/README.md) for serving a Next.js App on the same server as the API

## Custom apps

If you need to provide your own custom middleware for your system you can create a custom app and include it in your exported `apps`.

<!-- prettier-ignore-start -->

```javascript title=index.js
class CustomApp {
  prepareMiddleware({ itoa, dev, distDir }) {
    const middleware = express();
    return middleware;
  }
}

module.exports = {
  itoa,
  apps: [
    new GraphQLApp(),
    new AdminUIApp(),
    new CustomApp(),
  ],
};
```

<!-- prettier-ignore-end -->
