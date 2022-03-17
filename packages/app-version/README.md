<!--[meta]
section: api
subSection: utilities
title: App version plugin
[meta]-->

# App version plugin

> This is the last active development release of this package as **Itoa 5** is now in a 6 to 12 month active maintenance phase. For more information please read our [Itoa 5 and beyond](https://github.com/itoa-vn/itoaissues/21) post.

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@itoa/app-version)

This package provides support for including a version string both as an HTTP response header and as a graphQL query.

The function `appVersionMiddleware(version)` will return a piece of middleware which will set the `X-Itoa-App-Version` response header to `version` on all HTTP requests.

The graphQL provider `AppVersionProvider` will add an `{ appVersion }` query to your graphQL API which returns `version` as a string.

## Usage

### Indirectly

This package is designed to be used indirectly via the conveniance API on the `Itoa` class:

```javascript
const itoa = new Itoa({
  appVersion: {
    version: '1.0.0',
    addVersionToHttpHeaders: true,
    access: true,
  },
});
```

### Directly

It can also be used directly if you would like to manually manage your middleware stack of graphQL providers.

```javascript
const { AppVersionProvider, appVersionMiddleware } = require('@itoa/app-version');

const version = '1.0.0';

app.use(appVersionMiddleware(version));

itoa._providers.push(
  new AppVersionProvider({
    version,
    access: true,
    schemaNames: ['public'],
  })
);
```
