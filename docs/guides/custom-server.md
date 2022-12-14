<!--[meta]
section: guides
title: Custom server
subSection: advanced
[meta]-->

# Custom server

By default, the Itoa CLI starts an `express`-powered server for you when
running the `itoa dev` or `itoa start` commands.

In some circumstances, you may want to have more control over the server which
handles the GraphQL API and Admin UI. Things such as:

- Add additional routes
- Setup additional server middleware (`compress`/`brotli`/etc)
- Notify a 3rd party service when the API is ready

A **custom server** can replace the default and act as the entry point to your
application which consumes your [schema definition](/docs/guides/schema.md). A custom
server must handle initialising a http server which correctly executes any given Itoa apps.

> **Note:** Before reaching for a custom server, consider using a Itoa app which can enhance the functionality of the default server.

Apps available in Itoa include:

- [Static App](/packages/app-static/README.md) for serving static files.
- [Next.js App](/packages/app-next/README.md) for serving a Next.js App on the same server as the API
- [Nuxt.js App](/packages/app-nuxt/README.md) for serving a Nuxt.js App on the same server as the API

## You may not need a custom server

If all you want to do is some basic configuration of the default Express instance, you don't need a
custom server. The Itoa CLI accepts an additional `configureExpress` export in your `index.js` file.
This function takes a single `app` parameter. The running Express instance will be passed to this function
before any middlewares are set up, so you can perform any Express configuration you need here.

```javascript title=index.js
module.exports = {
  configureExpress: app => {
    app.set('view engine', 'pug');
  },
};
```

## Minimal custom server

```json title=package.json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

```javascript title=index.js
const { Itoa } = require('@itoa/itoa');
const { GraphQLApp } = require('@itoa/app-graphql');

const itoa = new Itoa({...});

module.exports = {
  itoa,
  apps: [new GraphQLApp()],
};
```

```javascript title=server.js
const express = require('express');
const { itoa, apps } = require('./index.js');

itoa
  .prepare({
    apps: apps,
    dev: process.env.NODE_ENV !== 'production',
  })
  .then(async ({ middlewares }) => {
    await itoa.connect();
    const app = express();

    app.use(middlewares).listen(3000);
  });
```

## All-in-one custom server

When using a custom server, there is nothing special about the `index.js` file.
In this example there is no `index.js` file, instead the `itoa` instance and
`apps` are declared directly in `server.js`.

```json title=package.json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

```javascript title=server.js
const express = require('express');
const { Itoa } = require('@itoa/itoa');
const { GraphQLApp } = require('@itoa/app-graphql');

const itoa = new Itoa({...});

itoa
  .prepare({
    apps: [new GraphQLApp()],
    dev: process.env.NODE_ENV !== 'production',
  })
  .then(async ({ middlewares }) => {
    await itoa.connect();
    const app = express();

    app.use(middlewares).listen(3000);
  });
```

## Custom server w/middleware

For really fine-grained control, a custom server can skip calling
`itoa.prepare()` in favour of calling an app's `.prepareMiddleware()`
function directly.

```json title=package.json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

```javascript title=server.js
const express = require('express');
const { Itoa } = require('@itoa/itoa');
const { GraphQLApp } = require('@itoa/app-graphql');
const { AdminUIApp } = require('@itoa/app-admin-ui');

const itoa = new Itoa({...});

const dev = process.env.NODE_ENV !== 'production';
const apps = [new GraphQLApp(), new AdminUIApp()];
const preparations = apps.map(app =>
  app.prepareMiddleware({ itoa, dev })
);

Promise.all(preparations).then(async middlewares => {
  await itoa.connect();
  const app = express();

  app.use(middlewares).listen(3000);
});
```

## Custom server for ServerLess environments

The current version of Itoa cannot be run in a ServerLess environment such as
[AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

This is because the bundled dependencies cause the uncompressed size to exceed the limit of 250mb
and the dependencies do not compact nicely with "serverless-webpack" due to dynamic require statements.

The ItoaJS team are working to resolve this in the next major update.

For now it is best to explore other deployment options such as Docker containers, Heroku or just a simple server behind a load balancer.
