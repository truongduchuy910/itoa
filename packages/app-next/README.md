<!--[meta]
section: api
subSection: apps
title: Next.js app
[meta]-->

# Next.js app

> This is the last active development release of this package as **Itoa 5** is now in a 6 to 12 month active maintenance phase. For more information please read our [Itoa 5 and beyond](https://github.com/itoa-vn/itoaissues/21) post.

[![View changelog](https://img.shields.io/badge/changelogs.xyz-Explore%20Changelog-brightgreen)](https://changelogs.xyz/@itoa/app-next)

A ItoaJS app for serving a [Next.js](https://nextjs.org/) application.

## Usage

```javascript
const { NextApp } = require('@itoa/app-next');

module.exports = {
  itoa,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ enableDefaultRoute: false }),
    new NextApp({ dir: 'app' }),
  ],
  distDir,
};
```

### Config

| Option | Type     | Default | Required | Description                       |
| ------ | -------- | ------- | -------- | --------------------------------- |
| `dir`  | `String` | `null`  | `true`   | The directory of the Next.js app. |
