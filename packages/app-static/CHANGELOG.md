# @itoa/app-static

## 6.0.0

### Major Changes

- ...

## 5.2.2

### Patch Changes

- [#95](https://github.com/itoa-vn/itoapull/95) [`c8ff78b95`](https://github.com/itoa-vn/itoacommit/c8ff78b95af5d56d44bbc11c51e7cf28b81323b4) Thanks [@bladey](https://github.com/bladey)! - Renamed branch `master` to `main`.

## 5.2.1

### Patch Changes

- [#95](https://github.com/itoa-vn/itoapull/95) [`a890b0576`](https://github.com/itoa-vn/itoacommit/a890b057628b60c2d1870cc3f5afd8e87b03f7df) Thanks [@bladey](https://github.com/bladey)! - Renamed branch `master` to `main`.

## 5.2.0

### Minor Changes

- [`345a5f0f6`](https://github.com/itoa-vn/itoacommit/345a5f0f66a34c75696230ad2fcfb7a2eac86cb4) [#23](https://github.com/itoa-vn/itoapull/23) Thanks [@bladey](https://github.com/bladey)! - Itoa 5 is now in a 6 to 12 month active maintenance phase, packages will no longer have active development releases. For more information please read our Itoa 5 and beyond post located here - https://github.com/itoa-vn/itoaissues/21

## 5.1.4

### Patch Changes

- [`04bf1e4bb`](https://github.com/itoa-vn/itoacommit/04bf1e4bb0223f4e2e06664bbc9e95c51118eb84) [#2](https://github.com/itoa-vn/itoapull/2) Thanks [@bladey](https://github.com/bladey)! - Updated repository URL in package.json.

## 5.1.3

### Patch Changes

- [`6cb4476ff`](https://github.com/itoa-vn/itoacommit/6cb4476ff15923933862c1cd7d4b1ade794106c6) [#3481](https://github.com/itoa-vn/itoapull/3481) Thanks [@Noviny](https://github.com/Noviny)! - Updated dependencies through a major version - this shouldn't require change by consumers.

## 5.1.2

### Patch Changes

- [`c08c28d2`](https://github.com/itoa-vn/itoacommit/c08c28d22f2c6a2bfa73ab0ea347c9e0da8a9063) [#2593](https://github.com/itoa-vn/itoapull/2593) Thanks [@jossmac](https://github.com/jossmac)! - Applied a more consistent voice throughout documentation.

## 5.1.1

### Patch Changes

- [`5ba330b8`](https://github.com/itoa-vn/itoacommit/5ba330b8b2609ea0033a636daf9a215a5a192c20) [#2487](https://github.com/itoa-vn/itoapull/2487) Thanks [@Noviny](https://github.com/Noviny)! - Small changes to package.json (mostly adding a repository field)

## 5.1.0

### Minor Changes

- [`517b23e4`](https://github.com/itoa-vn/itoacommit/517b23e4b17414ed1807e8d7af1e67377ba3b7bf) [#2391](https://github.com/itoa-vn/itoapull/2391) Thanks [@timleslie](https://github.com/timleslie)! - Removed support for Node 8.x, as it is [no longer in maintenance mode](https://nodejs.org/en/about/releases/).

## 5.0.0

### Major Changes

- [`7b4ed362`](https://github.com/itoa-vn/itoacommit/7b4ed3623f5774d7783c39962bfa1ce97938e310) [#1821](https://github.com/itoa-vn/itoapull/1821) Thanks [@jesstelford](https://github.com/jesstelford)! - Release @itoa/\* packages (つ＾ ◡ ＾)つ

  - This is the first release of `@itoa/*` packages (previously `@itoa-alpha/*`).
  - All packages in the `@itoa-alpha` namespace are now available in the `@itoa` namespace, starting at version `5.0.0`.
  - To upgrade your project you must update any `@itoa-alpha/*` dependencies in `package.json` to point to `"@itoa/*": "^5.0.0"` and update any `require`/`import` statements in your code.

# @itoa-alpha/app-static

## 1.1.2

### Patch Changes

- [9b532072](https://github.com/itoa-vn/itoacommit/9b532072): Rename Itoa to ItoaJS in docs where possible in docs

## 1.1.1

### Patch Changes

- [5598701f](https://github.com/itoa-vn/itoacommit/5598701f): throwing errors when the StaticApp doesn't have a string valued passed to the "path" or "src" properties

## 1.1.0

### Minor Changes

- [fe23c719](https://github.com/itoa-vn/itoacommit/fe23c719): Added a new fallback option to support client-side routing

## 1.0.3

### Patch Changes

- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Upgrade express to 4.17.1

## 1.0.2

### Patch Changes

- [19fe6c1b](https://github.com/itoa-vn/itoacommit/19fe6c1b):

  Move frontmatter in docs into comments

## 1.0.1

### Patch Changes

- [af3f31dd](https://github.com/itoa-vn/itoacommit/af3f31dd):

  Output builds to correct directory

## 1.0.0

### Major Changes

- [dfcabe6a](https://github.com/itoa-vn/itoacommit/dfcabe6a):

  Specify custom servers from within the index.js file

  - Major Changes:
    - The `index.js` export for `admin` must now be exported in the `servers`
      array:
      ```diff
       module.exports = {
         itoa,
      -  admin,
      +  apps: [admin],
       }
      ```
    - The `itoa.prepare()` method (often used within a _Custom Server_
      `server.js`) no longer returns a `server`, it now returns a `middlewares`
      array:
      ```diff
      +const express = require('express');
       const port = 3000;
       itoa.prepare({ port })
      -  .then(async ({ server, itoa: itoaApp }) => {
      +  .then(async ({ middlewares, itoa: itoaApp }) => {
           await itoaApp.connect();
      -    await server.start();
      +    const app = express();
      +    app.use(middlewares);
      +    app.listen(port)
         });
      ```
