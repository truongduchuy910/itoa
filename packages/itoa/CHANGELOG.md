# @itoa/itoa

## 21.0.0

### Major Changes

- ...

### Patch Changes

- Updated dependencies []:
  - @itoa/access-control@8.0.0
  - @itoa/app-version@3.0.0
  - @itoa/session@9.0.0
  - @itoa/utils@8.0.0

## 20.0.0

### Major Changes

- change color theme, add facebook app

### Patch Changes

- Updated dependencies []:
  - @itoa/utils@7.0.0
  - @itoa/access-control@7.1.5

## 19.3.3

### Patch Changes

- [#95](https://github.com/itoa-vn/itoapull/95) [`c8ff78b95`](https://github.com/itoa-vn/itoacommit/c8ff78b95af5d56d44bbc11c51e7cf28b81323b4) Thanks [@bladey](https://github.com/bladey)! - Renamed branch `master` to `main`.

- Updated dependencies [[`c8ff78b95`](https://github.com/itoa-vn/itoacommit/c8ff78b95af5d56d44bbc11c51e7cf28b81323b4)]:
  - @itoa/access-control@7.1.2
  - @itoa/app-version@2.1.2
  - @itoa/session@8.3.2
  - @itoa/utils@6.1.2

## 19.3.2

### Patch Changes

- [#95](https://github.com/itoa-vn/itoapull/95) [`a890b0576`](https://github.com/itoa-vn/itoacommit/a890b057628b60c2d1870cc3f5afd8e87b03f7df) Thanks [@bladey](https://github.com/bladey)! - Renamed branch `master` to `main`.

- Updated dependencies [[`a890b0576`](https://github.com/itoa-vn/itoacommit/a890b057628b60c2d1870cc3f5afd8e87b03f7df)]:
  - @itoa/access-control@7.1.1
  - @itoa/app-version@2.1.1
  - @itoa/session@8.3.1
  - @itoa/utils@6.1.1

## 19.3.1

### Patch Changes

- [`6ff2bbe15`](https://github.com/itoa-vn/itoacommit/6ff2bbe150f140a013f2145f866f43fe185518eb) [#39](https://github.com/itoa-vn/itoapull/39) Thanks [@timleslie](https://github.com/timleslie)! - Added explicit handling of `null` values for relationship fields in `create` and `update` mutations.

## 19.3.0

### Minor Changes

- [`345a5f0f6`](https://github.com/itoa-vn/itoacommit/345a5f0f66a34c75696230ad2fcfb7a2eac86cb4) [#23](https://github.com/itoa-vn/itoapull/23) Thanks [@bladey](https://github.com/bladey)! - Itoa 5 is now in a 6 to 12 month active maintenance phase, packages will no longer have active development releases. For more information please read our Itoa 5 and beyond post located here - https://github.com/itoa-vn/itoaissues/21

### Patch Changes

- Updated dependencies [[`345a5f0f6`](https://github.com/itoa-vn/itoacommit/345a5f0f66a34c75696230ad2fcfb7a2eac86cb4)]:
  - @itoa/access-control@7.1.0
  - @itoa/app-version@2.1.0
  - @itoa/session@8.3.0
  - @itoa/utils@6.1.0

## 19.2.1

### Patch Changes

- [`04bf1e4bb`](https://github.com/itoa-vn/itoacommit/04bf1e4bb0223f4e2e06664bbc9e95c51118eb84) [#2](https://github.com/itoa-vn/itoapull/2) Thanks [@bladey](https://github.com/bladey)! - Updated repository URL in package.json.

- Updated dependencies [[`04bf1e4bb`](https://github.com/itoa-vn/itoacommit/04bf1e4bb0223f4e2e06664bbc9e95c51118eb84), [`15b1132d2`](https://github.com/itoa-vn/itoacommit/15b1132d20d13f79bbf1707e1897b31da887c2b7)]:
  - @itoa/access-control@7.0.1
  - @itoa/app-version@2.0.1
  - @itoa/session@8.2.1
  - @itoa/utils@6.0.2

## 19.2.0

### Minor Changes

- [`4035218df`](https://github.com/itoa-vn/itoacommit/4035218df390beff3d42c0d3fc21335230d8a60d) [#4512](https://github.com/itoa-vn/itoapull/4512) Thanks [@renovate](https://github.com/apps/renovate)! - Upgraded dependency `apollo-server-express` to `^2.21.0`. Apollo Server can now be installed with `graphql@15` without causing peer dependency errors or warnings.

* [`8d0be8a89`](https://github.com/itoa-vn/itoacommit/8d0be8a89e2d9b89826365f81f47b8d8863b93d0) [#4815](https://github.com/itoa-vn/itoapull/4815) Thanks [@timleslie](https://github.com/timleslie)! - Added a `.sudo()` method to `context` objects, which is equivalent to the common operation `context.createContext({ skipAccessControl: true })`.

### Patch Changes

- Updated dependencies [[`28a61dc67`](https://github.com/itoa-vn/itoacommit/28a61dc67b990ebd16bfc4e1c0a1e9ffb0e54d81), [`92727414a`](https://github.com/itoa-vn/itoacommit/92727414af4e6efcb8d691f8197c6165ae469577)]:
  - @itoa/access-control@7.0.0
  - @itoa/app-version@2.0.0

## 19.1.0

### Minor Changes

- [`3c1fa3203`](https://github.com/itoa-vn/itoacommit/3c1fa3203a6a9eeb2525c256f858f2e6cebea804) [#4738](https://github.com/itoa-vn/itoapull/4738) Thanks [@MurzNN](https://github.com/MurzNN)! - Added an `APP_URL` environment variable and `--app-url` command line option to a set custom URL to be reported when starting the server.

## 19.0.0

### Major Changes

- [`749d1c86c`](https://github.com/itoa-vn/itoacommit/749d1c86c89690ef10014a4a0a12641eb24bfe1d) [#4709](https://github.com/itoa-vn/itoapull/4709) Thanks [@timleslie](https://github.com/timleslie)! - Database adapters no longer support custom `ListAdapter` classes via the `listAdapterClass` option of `adapterConfig` in `createList()`.

* [`588be9ea1`](https://github.com/itoa-vn/itoacommit/588be9ea16ab5fb6e74f844b917ca8aeb91a9ac9) [#3222](https://github.com/itoa-vn/itoapull/3222) Thanks [@timleslie](https://github.com/timleslie)! - Removed support for multiple database adapters in a single `Itoa` system. The `adapters` and `defaultAdapter` config options were removed from the `Itoa()` constructor. If you were accessing the adapter object via `itoa.adapters.KnexAdapter` or `itoa.adapters.MongooseAdapter` you should now simply access `itoa.adapter`.

### Patch Changes

- Updated dependencies [[`619ef5051`](https://github.com/itoa-vn/itoacommit/619ef50512c09d7cf988dc3c877eed868eba68a6), [`86b597d41`](https://github.com/itoa-vn/itoacommit/86b597d410c907ed54a4948da438de48e313302f), [`c1257ca83`](https://github.com/itoa-vn/itoacommit/c1257ca834ccf5a0407debe6e7d27b45ed32a26a), [`621db113a`](https://github.com/itoa-vn/itoacommit/621db113a6a579cc3da19ae9cef50dc63ac8ca55), [`5e22cc765`](https://github.com/itoa-vn/itoacommit/5e22cc765a8f18c467457fd2ba738cd90273c8c5), [`b9ec7fff9`](https://github.com/itoa-vn/itoacommit/b9ec7fff9d96ac56e2836543d698cf0b62b5dc8f), [`5ad7c12e8`](https://github.com/itoa-vn/itoacommit/5ad7c12e86573e73e85368076bdc1296f3f69db3), [`94c8d349d`](https://github.com/itoa-vn/itoacommit/94c8d349d3795cd9abec407f78752417623ee56f)]:
  - @itoa/access-control@6.3.2
  - @itoa/session@8.2.0
  - @itoa/utils@6.0.1

## 18.1.0

### Minor Changes

- [`4768fbf83`](https://github.com/itoa-vn/itoacommit/4768fbf831ffff648e540c479a1954ae40e05aaa) [#4654](https://github.com/itoa-vn/itoapull/4654) Thanks [@timleslie](https://github.com/timleslie)! - Added an `args` paramter to `Itoa.connect(args)`, which is passed through as the second argument to the config function `onConnect(itoa, args)`.

### Patch Changes

- [`3b7a056bb`](https://github.com/itoa-vn/itoacommit/3b7a056bb835482ceb408a70bf97300741552d19) [#4652](https://github.com/itoa-vn/itoapull/4652) Thanks [@timleslie](https://github.com/timleslie)! - Removed `addFieldValidationError` from the args passed to list validation hooks, as it was unused and could lead to confusion. Updated docs to clarify the validation hook arguments. Thanks @pahaz for the fix.

* [`74a8528ea`](https://github.com/itoa-vn/itoacommit/74a8528ea0dad739f4f16af32fe4f8926a188b61) [#4649](https://github.com/itoa-vn/itoapull/4649) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `serialize-error` to `^8.0.0`.

* Updated dependencies [[`b76241695`](https://github.com/itoa-vn/itoacommit/b7624169554b01dba2185ef43856a223d32f12be)]:
  - @itoa/utils@6.0.0
  - @itoa/access-control@6.3.1

## 18.0.0

### Major Changes

- [`1200c3562`](https://github.com/itoa-vn/itoacommit/1200c356272ae8deea9da4267ce62c1449498e95) [#4588](https://github.com/itoa-vn/itoapull/4588) Thanks [@timleslie](https://github.com/timleslie)! - Updated `itoa.getTypedefs` and `itoa.getResolvers` to explicity return `scalar Upload` and its associated resolver.

### Minor Changes

- [`1200c3562`](https://github.com/itoa-vn/itoacommit/1200c356272ae8deea9da4267ce62c1449498e95) [#4588](https://github.com/itoa-vn/itoapull/4588) Thanks [@timleslie](https://github.com/timleslie)! - Updated graphql server to use the `graphql-upload` package directly to support uploads, rather than the built-in support provided by Apollo Server.

## 17.1.2

### Patch Changes

- [`a3a58bcca`](https://github.com/itoa-vn/itoacommit/a3a58bcca56943f2240104dae3c816188eead6f1) [#4412](https://github.com/itoa-vn/itoapull/4412) Thanks [@timleslie](https://github.com/timleslie)! - Added a check to prevent using graphQL keywords `Query`, `Mutation` and `Subscription` as list names.

## 17.1.1

### Patch Changes

- [`3dd5c570a`](https://github.com/itoa-vn/itoacommit/3dd5c570a27d0795a689407d96fc9623c90a66df) [#4061](https://github.com/itoa-vn/itoapull/4061) Thanks [@timleslie](https://github.com/timleslie)! - Updated error handling to throw Error objects rather than Strings for invalid field configurations.

## 17.1.0

### Minor Changes

- [`20c921c80`](https://github.com/itoa-vn/itoacommit/20c921c805f9ba8e779d0af584e6ff036c264bd4) [#3849](https://github.com/itoa-vn/itoapull/3849) Thanks [@gautamsi](https://github.com/gautamsi)! - Added `fieldPath` as an argument to all field hooks.

## 17.0.0

### Major Changes

- [`cc56990f2`](https://github.com/itoa-vn/itoacommit/cc56990f2e9a4ecf0c112362e8d472b9286f76bc) [#3596](https://github.com/itoa-vn/itoapull/3596) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `pluralize` to `^8.0.0`.
  This may cause changes to your GraphQL schema if you have list names which are now treated differently by this library.
  Check the [`pluralize` release notes](https://github.com/plurals/pluralize/releases/v8.0.0) for details.
  You can override the behaviour of `pluralize` by passing in `singular` or `plural` config options to `itoa.createList()`.

### Patch Changes

- [`df0687184`](https://github.com/itoa-vn/itoacommit/df068718456d23819a7cae491870be4560b2010d) [#3743](https://github.com/itoa-vn/itoapull/3743) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `apollo-server-express` to `^2.18.0`. This brings in some [changes related to apollo reporting](https://github.com/apollographql/apollo-server/blob/main/CHANGELOG.md#v2180), which maybe of interested to users who use this feature.

## 16.0.0

### Major Changes

- [`83007be79`](https://github.com/itoa-vn/itoacommit/83007be798ebd751d7eb708cde366dc35999af72) [#3593](https://github.com/itoa-vn/itoapull/3593) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `pino` to `^6.6.1`. See the pino [release notes](https://github.com/pinojs/pino/releases/v6.0.0) for breaking changes to logging output.

### Patch Changes

- [`38e3ad9c3`](https://github.com/itoa-vn/itoacommit/38e3ad9c3e7124d06f11c7046821c857cf7f9ad2) [#3685](https://github.com/itoa-vn/itoapull/3685) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Remove unused dependency on `@itoa/fields`

* [`304701d7c`](https://github.com/itoa-vn/itoacommit/304701d7c23e98c8dc40c0f3f5512a0370107c06) [#3585](https://github.com/itoa-vn/itoapull/3585) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `graphql` to `^15.3.0`.

- [`7a1f8bbdc`](https://github.com/itoa-vn/itoacommit/7a1f8bbdcdf68c9579e17db77fa826e811abcab4) [#3645](https://github.com/itoa-vn/itoapull/3645) Thanks [@timleslie](https://github.com/timleslie)! - Removed dependency on `@itoa/logger`, which is no longer maintained.

* [`d95010eea`](https://github.com/itoa-vn/itoacommit/d95010eea35f40274f412dad5c2fed6b16ae6c60) [#3663](https://github.com/itoa-vn/itoapull/3663) Thanks [@Vultraz](https://github.com/Vultraz)! - Enabled schema tracing if APOLLO_KEY is set.

- [`104232785`](https://github.com/itoa-vn/itoacommit/104232785aac856be6a3ba55f8fa0fd8357237ed) [#3576](https://github.com/itoa-vn/itoapull/3576) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `express-pino-logger` to `^5.0.0`.

## 15.0.0

### Major Changes

- [`77aa2d7d1`](https://github.com/itoa-vn/itoacommit/77aa2d7d156a83759a7f3c26e8c5bd019966b054) [#3629](https://github.com/itoa-vn/itoapull/3629) Thanks [@timleslie](https://github.com/timleslie)! - Removed the automatic mapping of native types to itoa field types when defining fields. Itoa will no longer convert `{ type: String }` to `{ type: Text }`, `{ type: Number }` to `{ type: Float }`, or `{ type: Boolean }` to `{ type: Checkbox }`.

### Patch Changes

- [`4f6883dc3`](https://github.com/itoa-vn/itoacommit/4f6883dc38962805f96256f9fdf42fb77bb3326a) [#3610](https://github.com/itoa-vn/itoapull/3610) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `prettier` to `^2.1.1`.

* [`d7eac6629`](https://github.com/itoa-vn/itoacommit/d7eac662956fc2dffd9ea5cfedf60e51ecc1b80d) [#3608](https://github.com/itoa-vn/itoapull/3608) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `ora` to `^5.1.0`.

- [`d07f6bfb6`](https://github.com/itoa-vn/itoacommit/d07f6bfb6b3bd65036c2030d2758abdf4eca1a9e) [#3567](https://github.com/itoa-vn/itoapull/3567) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `endent` to `^2.0.1`.

- Updated dependencies [[`4f6883dc3`](https://github.com/itoa-vn/itoacommit/4f6883dc38962805f96256f9fdf42fb77bb3326a), [`dd49d2c04`](https://github.com/itoa-vn/itoacommit/dd49d2c040ea8fb8dfc36d2e556be88ca1b74b15), [`8bd44758a`](https://github.com/itoa-vn/itoacommit/8bd44758ac742c95f42151c9fbc16700b698e8e4), [`0b400eb8f`](https://github.com/itoa-vn/itoacommit/0b400eb8f4674f37d8ea304130b9e339fad60d48), [`fe054e53e`](https://github.com/itoa-vn/itoacommit/fe054e53e71f13a69af1d6dd2a1cd8c68bb31059)]:
  - @itoa/fields@17.1.2
  - @itoa/logger@6.0.0

## 14.0.2

### Patch Changes

- [`cd15192cd`](https://github.com/itoa-vn/itoacommit/cd15192cdae5e476f64a257c196ca569a9440d5a) [#3510](https://github.com/itoa-vn/itoapull/3510) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `graphql` to `^14.7.0`.

* [`7bfdb79ee`](https://github.com/itoa-vn/itoacommit/7bfdb79ee43235418f098e5fe7412968dcf6c397) [#3564](https://github.com/itoa-vn/itoapull/3564) Thanks [@Vultraz](https://github.com/Vultraz)! - Added an error when creating a list with the reserved name 'Upload'.

- [`d71f98791`](https://github.com/itoa-vn/itoacommit/d71f987917509a206b1e0a994dbc6641a7cf4e06) [#3484](https://github.com/itoa-vn/itoapull/3484) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `endent` to `^1.4.1`.

* [`28b88abd3`](https://github.com/itoa-vn/itoacommit/28b88abd369f0df12eae72107db7c24323eda4b5) [#3507](https://github.com/itoa-vn/itoapull/3507) Thanks [@renovate](https://github.com/apps/renovate)! - Updated Apollo GraphQL packages dependencies.

* Updated dependencies [[`cd15192cd`](https://github.com/itoa-vn/itoacommit/cd15192cdae5e476f64a257c196ca569a9440d5a), [`d500613d8`](https://github.com/itoa-vn/itoacommit/d500613d8917e3cbcea2817501d607eddd3b1a8d), [`6c97a5534`](https://github.com/itoa-vn/itoacommit/6c97a5534e8a18d15aeac8b0471810fdd4d04f80), [`34fcc7052`](https://github.com/itoa-vn/itoacommit/34fcc7052a24db61f1f2f12c46110c060934f4ca), [`c3488c5e8`](https://github.com/itoa-vn/itoacommit/c3488c5e88628b15eb9fe804551c3c5c44c07e0f), [`e62b3308b`](https://github.com/itoa-vn/itoacommit/e62b3308bd841b5f58ac9fa1f84707f9187fda6b), [`7036585f2`](https://github.com/itoa-vn/itoacommit/7036585f25c3b690b7a6fd04c39b5b781ff5bcd9), [`2e6a06202`](https://github.com/itoa-vn/itoacommit/2e6a06202299b36c36fd3efd895f2280479eac31), [`a42ee3a30`](https://github.com/itoa-vn/itoacommit/a42ee3a306c899a7ae46909fe132522cbeff7812), [`438051442`](https://github.com/itoa-vn/itoacommit/4380514421020f4418a9f966c9fec60e014478b9), [`b3aa85031`](https://github.com/itoa-vn/itoacommit/b3aa850311cbc1622568f69f9cb4b9f46ab9db22), [`518718e19`](https://github.com/itoa-vn/itoacommit/518718e197d0a2d723c8e184552ddd5d8e165f12), [`766303d46`](https://github.com/itoa-vn/itoacommit/766303d46d14275f49c200444a00ef6283be2322), [`28b88abd3`](https://github.com/itoa-vn/itoacommit/28b88abd369f0df12eae72107db7c24323eda4b5)]:
  - @itoa/fields@17.1.1
  - @itoa/logger@5.1.3

## 14.0.1

### Patch Changes

- [`6cb4476ff`](https://github.com/itoa-vn/itoacommit/6cb4476ff15923933862c1cd7d4b1ade794106c6) [#3481](https://github.com/itoa-vn/itoapull/3481) Thanks [@Noviny](https://github.com/Noviny)! - Updated dependencies through a major version - this shouldn't require change by consumers.

* [`5935b89f8`](https://github.com/itoa-vn/itoacommit/5935b89f8862b36f14d09da68f056f759a860f3e) [#3477](https://github.com/itoa-vn/itoapull/3477) Thanks [@Noviny](https://github.com/Noviny)! - Updating dependencies:

  These changes bring the itoa dev experience inline with installing itoa from npm :D

- [`877a5a90d`](https://github.com/itoa-vn/itoacommit/877a5a90d608f0a13b6c0ea103cb96e3ac2caacc) [#3438](https://github.com/itoa-vn/itoapull/3438) Thanks [@renovate](https://github.com/apps/renovate)! - Updated Apollo GraphQL package dependencies.

* [`7f04d9dd2`](https://github.com/itoa-vn/itoacommit/7f04d9dd21ad792b540d9e0a5d83356c091597ad) [#3478](https://github.com/itoa-vn/itoapull/3478) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependency `cors` to `^2.8.5`.

* Updated dependencies [[`6cb4476ff`](https://github.com/itoa-vn/itoacommit/6cb4476ff15923933862c1cd7d4b1ade794106c6), [`5935b89f8`](https://github.com/itoa-vn/itoacommit/5935b89f8862b36f14d09da68f056f759a860f3e), [`db0797f7f`](https://github.com/itoa-vn/itoacommit/db0797f7f442c2c42cc941633930de527c722f48), [`ac44568f9`](https://github.com/itoa-vn/itoacommit/ac44568f91fd54ccbc39accf83bcfb3276ce1a72), [`877a5a90d`](https://github.com/itoa-vn/itoacommit/877a5a90d608f0a13b6c0ea103cb96e3ac2caacc), [`483b20ec5`](https://github.com/itoa-vn/itoacommit/483b20ec53ff89f1d026c0495fdae5df60a7cf59), [`0fc878fa9`](https://github.com/itoa-vn/itoacommit/0fc878fa918c3196196f943f195ffaa62fce504b), [`ea367f759`](https://github.com/itoa-vn/itoacommit/ea367f7594f47efc3528d9917cce010b3a16bf4d), [`69d627813`](https://github.com/itoa-vn/itoacommit/69d627813adfc10d29707f5c882ca15621de12a5), [`07e246d15`](https://github.com/itoa-vn/itoacommit/07e246d15586dede7fa9a04bcc13020c8c5c3a25), [`0153168d7`](https://github.com/itoa-vn/itoacommit/0153168d73ce8cd7ede4eb9c8518e5e2bf859709)]:
  - @itoa/fields@17.1.0
  - @itoa/utils@5.4.3
  - @itoa/session@8.1.1

## 14.0.0

### Major Changes

- [`d38c9174f`](https://github.com/itoa-vn/itoacommit/d38c9174f8146ad6e268be87cf5d54d5074bc593) [#3394](https://github.com/itoa-vn/itoapull/3394) Thanks [@timleslie](https://github.com/timleslie)! - Converted `Field` getters `.gqlUpdateInputFields` and `.gqlCreateInputFields` into methods, `.gqlUpdateInputFields({ schemaName })` and `...gqlCreateInputFields({ schemaName })`.

### Minor Changes

- [`25f50dadc`](https://github.com/itoa-vn/itoacommit/25f50dadc07d888de18d485244c84d17462dce2e) [#3420](https://github.com/itoa-vn/itoapull/3420) Thanks [@timleslie](https://github.com/timleslie)! - Added `listKey` as an argument to all hooks.

* [`c243839c1`](https://github.com/itoa-vn/itoacommit/c243839c12abc8cffe8ff788fe57dcb880dc3a41) [#3427](https://github.com/itoa-vn/itoapull/3427) Thanks [@timleslie](https://github.com/timleslie)! - Added `plugins` argument to `itoa.createAuthStrategy()`. See [docs](/docs/api/authentication.md) for more details.

### Patch Changes

- [`f714ac1e2`](https://github.com/itoa-vn/itoacommit/f714ac1e2c49ef44d756e35042bdb7da6db589a7) [#3426](https://github.com/itoa-vn/itoapull/3426) Thanks [@timleslie](https://github.com/timleslie)! - Fixed errors when calling `itoa.createContext()` with no arguments.

- Updated dependencies [[`d38c9174f`](https://github.com/itoa-vn/itoacommit/d38c9174f8146ad6e268be87cf5d54d5074bc593), [`e8b2e4772`](https://github.com/itoa-vn/itoacommit/e8b2e477206acffb143f19fb14be1e3b4cd0eb91)]:
  - @itoa/fields@17.0.0
  - @itoa/test-utils@8.0.1

## 13.1.1

### Patch Changes

- [`0369985e3`](https://github.com/itoa-vn/itoacommit/0369985e320afd6112f2664f8a8edc1ed7167130) [#3391](https://github.com/itoa-vn/itoapull/3391) Thanks [@timleslie](https://github.com/timleslie)! - Removed the `MockAdapter`, `MockListAdapter` and `MockIdType` classes from `@itoa/test-utils`.

- Updated dependencies [[`9338f3739`](https://github.com/itoa-vn/itoacommit/9338f3739ecff5f626a713a06ce65c1e29888d25), [`3db2f3956`](https://github.com/itoa-vn/itoacommit/3db2f395688342fe9a1dda14be5ce8308c9c39a6), [`7e78ffdaa`](https://github.com/itoa-vn/itoacommit/7e78ffdaa96050e49e8e2678a3c4f1897fedae4f), [`7b0875723`](https://github.com/itoa-vn/itoacommit/7b0875723783780988f2dee4e5ee406a3b44ca98), [`0369985e3`](https://github.com/itoa-vn/itoacommit/0369985e320afd6112f2664f8a8edc1ed7167130), [`714316718`](https://github.com/itoa-vn/itoacommit/7143167187e3e3519b0b58e2b04ff0fee8fc75dc), [`7422922f5`](https://github.com/itoa-vn/itoacommit/7422922f5649a2b52699f67a77645e9c91800688), [`df8f92a37`](https://github.com/itoa-vn/itoacommit/df8f92a378d2d787f5bee774f013767c09ec35cf), [`cc5bb8915`](https://github.com/itoa-vn/itoacommit/cc5bb891579281338ad7fad0873531be81d877d4), [`1b3943e4f`](https://github.com/itoa-vn/itoacommit/1b3943e4f66c61c446085736949c6b83e9087afb), [`b300720eb`](https://github.com/itoa-vn/itoacommit/b300720eb4e079bc30efb17ed3b48ab71cadc160)]:
  - @itoa/fields@16.1.0
  - @itoa/test-utils@8.0.0

## 13.1.0

### Minor Changes

- [`845b6a21b`](https://github.com/itoa-vn/itoacommit/845b6a21b62e615135eb738ad332fc035b93191b) [#2039](https://github.com/itoa-vn/itoapull/2039) Thanks [@molomby](https://github.com/molomby)! - Added [authentication hooks](https://www.itoa.vn/api/hooks).

  You can now customise the behaviour of authentication mutations as follows:

  ```js
  itoa.creatAuthStrategy({
    type: PasswordAuthStrategy,
    list: 'User',
    hooks: {
      resolveAuthInput: async (...) => {...},
      validateAuthInput: async (...) => {...},
      beforeAuth: async (...) => {...},
      afterAuth: async (...) => {...},

      beforeUnauth: async (...) => {...},
      afterUnauth: async (...) => {...},
    },
  })
  ```

### Patch Changes

- [`1a89bbdc6`](https://github.com/itoa-vn/itoacommit/1a89bbdc6b2122a5c8217e6f6c750f7cfb69dc2c) [#3355](https://github.com/itoa-vn/itoapull/3355) Thanks [@singhArmani](https://github.com/singhArmani)! - - Added a function `gqlNames(listKey)` to the `context` object created by `itoa.createContext` This allows extracting graphQL query and mutation names from the `context` object.
  - Made the `itoa` argument optional when a `context` value is provided in any of the utility functions in `server-side-graphql-client` package.

* [`7650ecd3e`](https://github.com/itoa-vn/itoacommit/7650ecd3e60b52983015ac0058b8b0066b074e1e) [#3331](https://github.com/itoa-vn/itoapull/3331) Thanks [@Vultraz](https://github.com/Vultraz)! - Import gql literal from Apollo server.

* Updated dependencies [[`d38a41f25`](https://github.com/itoa-vn/itoacommit/d38a41f25a1b4c90c05d2fb85116dc385d4ee77a), [`5ede731fc`](https://github.com/itoa-vn/itoacommit/5ede731fc58a79e7322b852bdd2d971ece45281e), [`f8d4b175b`](https://github.com/itoa-vn/itoacommit/f8d4b175bbc29962569acb24b34c29c44b61791f), [`1d9068770`](https://github.com/itoa-vn/itoacommit/1d9068770d03658954044c530e56e66169667e25), [`694f3acfb`](https://github.com/itoa-vn/itoacommit/694f3acfb9faa78aebfcf48cf711165560f16ff7), [`149d6fd6f`](https://github.com/itoa-vn/itoacommit/149d6fd6ff057c17570346063c173376769dcc79), [`e44102e9f`](https://github.com/itoa-vn/itoacommit/e44102e9f7f770b1528d642d763ccf9f88f3cbb1)]:
  - @itoa/fields@16.0.0
  - @itoa/session@8.1.0

## 13.0.0

### Major Changes

- [`af5171563`](https://github.com/itoa-vn/itoacommit/af51715637433bcdd2538835c98ac71a8eb86122) [#3283](https://github.com/itoa-vn/itoapull/3283) Thanks [@timleslie](https://github.com/timleslie)! - Removed `BaseListAdapter.findFieldAdapterForQuerySegment()` and `MongoRelationshipInterface.supportsRelationshipQuery()`.

* [`271f1a40b`](https://github.com/itoa-vn/itoacommit/271f1a40b97e03aaa00ce920a6515b8f18669428) [#3289](https://github.com/itoa-vn/itoapull/3289) Thanks [@timleslie](https://github.com/timleslie)! - Removed `itoa.createHTTPContext()`.

- [`22b4a5c1a`](https://github.com/itoa-vn/itoacommit/22b4a5c1a13c3cca47190467be9d56e836f180f1) [#3302](https://github.com/itoa-vn/itoapull/3302) Thanks [@MadeByMike](https://github.com/MadeByMike)! - Removed the `itoa.createItems` and `itoa.createItem` methods. These have been replaced with the corresponding functions `createItems` and `createItem` in `@itoa/server-side-graphql-client`.

  If you have examples like:

  ```
  itoa.createItems({
    User: [{ name: 'Ticiana' }, { name: 'Lauren' }],
  });
  ```

  You will need to change this to:

  ```
  const { createItems } = require('@itoa/server-side-graphql-client');
  createItems({
    itoa,
    listKey: 'User',
    items: [{ data: { name: 'Ticiana' } }, {data:  { name: 'Lauren' } }]
  })
  ```

* [`e07c42d4e`](https://github.com/itoa-vn/itoacommit/e07c42d4ec75d5703bec4a2e419a42d18bed90ca) [#3288](https://github.com/itoa-vn/itoapull/3288) Thanks [@timleslie](https://github.com/timleslie)! - Removed `itoa.registerSchema()`.

### Minor Changes

- [`afe661e60`](https://github.com/itoa-vn/itoacommit/afe661e607539df13584d460e1016ba0fa883cb8) [#3274](https://github.com/itoa-vn/itoapull/3274) Thanks [@jordanoverbye](https://github.com/jordanoverbye)! - Added the ability for static cache hints to be added to custom queries generated using `itoa.extendGraphQLSchema()`

* [`5a3849806`](https://github.com/itoa-vn/itoacommit/5a3849806d00e62b722461d02f6e4639bc45c1eb) [#3262](https://github.com/itoa-vn/itoapull/3262) Thanks [@MadeByMike](https://github.com/MadeByMike)! - Added a new private internal schema that will allow a better method of bypassing access control on the `executeGraphQL` function.

  The schema name `internal` is now a reserved name and if you have a schema with this name you will need to change it with this update.

  Note: You cannot change access control on the `internal` schema.

### Patch Changes

- [`04f9be03d`](https://github.com/itoa-vn/itoacommit/04f9be03de7fe82035205379208511c6e49890b3) [#3319](https://github.com/itoa-vn/itoapull/3319) Thanks [@timleslie](https://github.com/timleslie)! - Fixed invalid GraphQL schema when using `access: { update: false, auth: true }` on a list configured with an `AuthStrategy`.

* [`ef7074977`](https://github.com/itoa-vn/itoacommit/ef70749775ce1565eafd7f94c3d7438c8ebd474e) [#3282](https://github.com/itoa-vn/itoapull/3282) Thanks [@timleslie](https://github.com/timleslie)! - Updated `BaseItoaAdapter` to pass `rels` to `._connect()`.

* Updated dependencies [[`af5171563`](https://github.com/itoa-vn/itoacommit/af51715637433bcdd2538835c98ac71a8eb86122), [`086b6baec`](https://github.com/itoa-vn/itoacommit/086b6baecdb8730bd7ae7001a96ae881fb13bac2), [`7da9d67d7`](https://github.com/itoa-vn/itoacommit/7da9d67d7d481c44a81406c6b34540a3f0a8340d), [`5a3849806`](https://github.com/itoa-vn/itoacommit/5a3849806d00e62b722461d02f6e4639bc45c1eb), [`086b6baec`](https://github.com/itoa-vn/itoacommit/086b6baecdb8730bd7ae7001a96ae881fb13bac2), [`5332988e3`](https://github.com/itoa-vn/itoacommit/5332988e3fafe6a3594f7dcecd79a9402df28015), [`c3883e01c`](https://github.com/itoa-vn/itoacommit/c3883e01c01b83cf5938de9bebf2dd68f4861364), [`fd2b8d1cf`](https://github.com/itoa-vn/itoacommit/fd2b8d1cf0b23b177951d65006a0d0faf666a5d6), [`2e10b1083`](https://github.com/itoa-vn/itoacommit/2e10b1083c0ab3925b877f16543c3d302f618313)]:
  - @itoa/fields@15.0.0
  - @itoa/access-control@6.3.0
  - @itoa/test-utils@7.1.1

## 12.0.0

### Major Changes

- [`49984caae`](https://github.com/itoa-vn/itoacommit/49984caaec803ed86b027c9634ac6b3f671e9ba7) [#3227](https://github.com/itoa-vn/itoapull/3227) Thanks [@Vultraz](https://github.com/Vultraz)! - Moved `name` config option from Itoa constructor to Admin UI constructor.

* [`5fc97cbf4`](https://github.com/itoa-vn/itoacommit/5fc97cbf4489587a3a8cb38c04ba81fc2cb1fc5a) [#3171](https://github.com/itoa-vn/itoapull/3171) Thanks [@timleslie](https://github.com/timleslie)! - Hooks no longer recieve a `{ query }` argument. This functionality has been superseded by `context.executeGraphQL()`.

  ```
  {
    ...
    hooks: {
      resolveInput: async ({ actions: { query } } ) => {
        ...
        const { data, errors } = await query(`{ ... }`);
        ...
      }
    }
  }
  ```

  should be changed to

  ```
  {
    ...
    hooks: {
      resolveInput: async ({ context } ) => {
        ...
        const { data, errors } = await context.executeGraphQL({ query: `{ ... }` });
        ...
      }
    }
  }
  ```

  See [the docs](/docs/discussions/server-side-graphql.md) for more details on how to use `context.executeGraphQL()`.

- [`56e1798d6`](https://github.com/itoa-vn/itoacommit/56e1798d6815723cfba01e6d7dc6b4fe73d4447b) [#3169](https://github.com/itoa-vn/itoapull/3169) Thanks [@timleslie](https://github.com/timleslie)! - Resolver functions for custom queries and mutations no longer recieve a `{ query }` argument. This functionality has been superseded by `context.executeGraphQL()`.

  ```
  itoa.extendGraphQLSchema({
    queries: {
      schema: '...',
      resolver: async (item, args, context, info, { query }) => {
        ...
        const { data, errors } = await query(`{ ... }`);
        ...
      }
    }
  });
  ```

  should be changed to

  ```
  itoa.extendGraphQLSchema({
    queries: {
      schema: '...',
      resolver: async (item, args, context) => {
        ...
        const { data, errors } = await context.executeGraphQL({ query: `{ ... }` });
        ...
      }
    }
  });
  ```

  See [the docs](/docs/discussions/server-side-graphql.md) for more details on how to use `context.executeGraphQL()`.

* [`81b4df318`](https://github.com/itoa-vn/itoacommit/81b4df3182fc63c583e3fae5c05c528b678cab95) [#3172](https://github.com/itoa-vn/itoapull/3172) Thanks [@timleslie](https://github.com/timleslie)! - Removed the method `itoa.executeQuery()`, which has been superseded by `itoa.executeGraphQL()`.
  See [the docs](/docs/discussions/server-side-graphql.md) for more details on how to use `itoa.executeGraphQL()`.

- [`3ce644d5f`](https://github.com/itoa-vn/itoacommit/3ce644d5f2b6e674adb2f155c0e729536079347a) [#3174](https://github.com/itoa-vn/itoapull/3174) Thanks [@timleslie](https://github.com/timleslie)! - Replaced `itoa.getGraphQlContext()` with `itoa.createHTTPContext()`, to be used primarily by the Apollo server.
  If you need to create a context for executing server-side GraphQL operations please use `itoa.createContext()`.
  See [the docs](/docs/discussions/server-side-graphql.md) for more details on how to use `itoa.createContext()`.

### Minor Changes

- [`e6909b003`](https://github.com/itoa-vn/itoacommit/e6909b0037c9d3dc4fc6131da7968a424ce02be9) [#3190](https://github.com/itoa-vn/itoapull/3190) Thanks [@jesstelford](https://github.com/jesstelford)! - Add Mutation.updateAuthenticated<List>, commonly used as Mutation.updateAuthenticatedUser

### Patch Changes

- [`5ad84ccd8`](https://github.com/itoa-vn/itoacommit/5ad84ccd8d008188e293629e90a4d7e7fde55333) [#3235](https://github.com/itoa-vn/itoapull/3235) Thanks [@timleslie](https://github.com/timleslie)! - Refactored hook management into a separate module.

* [`61cdafe20`](https://github.com/itoa-vn/itoacommit/61cdafe20e0a22b5a1f9b6a2dcc4aefa45a26902) [#3241](https://github.com/itoa-vn/itoapull/3241) Thanks [@timleslie](https://github.com/timleslie)! - Fixed a bug where `existingItem` had the wrong value in hooks during an `updateManyMutation`.

- [`8480f889a`](https://github.com/itoa-vn/itoacommit/8480f889a492d83ee805f19877d49fd112117939) [#3173](https://github.com/itoa-vn/itoapull/3173) Thanks [@timleslie](https://github.com/timleslie)! - Removed `itoa._buildQueryHelper()` and `itoa._executeOperation()`.

* [`02f069f0b`](https://github.com/itoa-vn/itoacommit/02f069f0b6e28ccfe6d5cdeb59ab01bde27a655e) [#3226](https://github.com/itoa-vn/itoapull/3226) Thanks [@Vultraz](https://github.com/Vultraz)! - Don't pass name through to adapter.connect.

- [`e114894d1`](https://github.com/itoa-vn/itoacommit/e114894d1bbcea8940cf14486fc336aa8d112da7) [#3234](https://github.com/itoa-vn/itoapull/3234) Thanks [@timleslie](https://github.com/timleslie)! - Factored out utility `List` functions into a separate module.

* [`06f86c6f5`](https://github.com/itoa-vn/itoacommit/06f86c6f5c573411f0efda565a269d1d7ccb3c66) [#3233](https://github.com/itoa-vn/itoapull/3233) Thanks [@timleslie](https://github.com/timleslie)! - Updated internal access control functions to directly accept access control definition.

- [`622cc7d69`](https://github.com/itoa-vn/itoacommit/622cc7d6976ecb71f5b135c931ac0fcb4afdb1c7) [#2745](https://github.com/itoa-vn/itoapull/2745) Thanks [@Vultraz](https://github.com/Vultraz)! - Added defaultPageSize and maximumPageSize config options fto the Admin UI. These can be used to set defaults for all lists (previously, these defaults were 50 and 1000, respectively).

- Updated dependencies [[`753fa13ab`](https://github.com/itoa-vn/itoacommit/753fa13ab976cebdd145f4da948e13244612eedb), [`e710cd445`](https://github.com/itoa-vn/itoacommit/e710cd445bfb71317ca38622cc3795da61d13dff), [`49984caae`](https://github.com/itoa-vn/itoacommit/49984caaec803ed86b027c9634ac6b3f671e9ba7), [`136cb505c`](https://github.com/itoa-vn/itoacommit/136cb505ce11931de7fc470debe438e335588781), [`4b95d8a46`](https://github.com/itoa-vn/itoacommit/4b95d8a46d53d32b2873e350716311441cd37262), [`e63b9f25a`](https://github.com/itoa-vn/itoacommit/e63b9f25adb64cecf0f65c6f97fe30c95e483996), [`5fc97cbf4`](https://github.com/itoa-vn/itoacommit/5fc97cbf4489587a3a8cb38c04ba81fc2cb1fc5a), [`0cbb7e7b0`](https://github.com/itoa-vn/itoacommit/0cbb7e7b096c2a99685631a601fce7273d03cc70), [`79d4c0d92`](https://github.com/itoa-vn/itoacommit/79d4c0d9250c1d1c1c46bcb2eaddae313eb7ac5f), [`51aef1ef0`](https://github.com/itoa-vn/itoacommit/51aef1ef06a89422e89a6118b7820848d5970669)]:
  - @itoa/test-utils@7.1.0
  - @itoa/session@8.0.0
  - @itoa/fields@14.0.0

## 11.2.0

### Minor Changes

- [`f296866df`](https://github.com/itoa-vn/itoacommit/f296866dfab3af54381fd527473e3dc98425b3b9) [#3199](https://github.com/itoa-vn/itoapull/3199) Thanks [@Vultraz](https://github.com/Vultraz)! - Support GraphQL AST input in `executeGraphQL`. This should be created with the `gql` template literal imported from `apollo-server-express`.

### Patch Changes

- Updated dependencies [[`4ddc3dc6f`](https://github.com/itoa-vn/itoacommit/4ddc3dc6f87c192627d00db85a1080411400eeb5), [`69d7f2e50`](https://github.com/itoa-vn/itoacommit/69d7f2e50ef2325c0d3b02b8bb5c310590796fed), [`2806a0bdf`](https://github.com/itoa-vn/itoacommit/2806a0bdfd65429e7c44ed070983f121d6934955), [`3adb2ac2a`](https://github.com/itoa-vn/itoacommit/3adb2ac2ac4ab65636ffea1b2b1f7044410c2b8b)]:
  - @itoa/fields@13.0.2
  - @itoa/test-utils@7.0.1
  - @itoa/utils@5.4.2
  - @itoa/session@7.0.1

## 11.1.3

### Patch Changes

- [`f6667f082`](https://github.com/itoa-vn/itoacommit/f6667f082539c11c5de02877f8c0e5174d74492f) [#3193](https://github.com/itoa-vn/itoapull/3193) Thanks [@timleslie](https://github.com/timleslie)! - Fixed bug when calling `itoa.executeGraphQL()` without a `context` argument.

## 11.1.2

### Patch Changes

- [`2c1cc55b0`](https://github.com/itoa-vn/itoacommit/2c1cc55b0eaaeb0aea04a14b70afde3ecd7c1d8d) [#3186](https://github.com/itoa-vn/itoapull/3186) Thanks [@timleslie](https://github.com/timleslie)! - Fixed a bug when calling `context.executeGraphQL()` without a `context` argument.

## 11.1.1

### Patch Changes

- [`3ecf74462`](https://github.com/itoa-vn/itoacommit/3ecf74462524f4940474eaf75eea958acbda9ee4) [#3165](https://github.com/itoa-vn/itoapull/3165) Thanks [@timleslie](https://github.com/timleslie)! - Added deprecation warnings for `itoa.executeQuery`, `{ actions: { query } }` in hooks, and the `query` argument in custom query and mutation resolvers. These are being deprecated in favour of `itoa.executeGraphQL()` and `context.executeGraphQL()`. See [the docs](docs/discussions/server-side-graphql.md) for more details.

- Updated dependencies [[`c6eac2dc2`](https://github.com/itoa-vn/itoacommit/c6eac2dc2dec857c668a5794fd84829d164563f3), [`4884ce609`](https://github.com/itoa-vn/itoacommit/4884ce6094b3c9ec203c702a5de97b983bd14176)]:
  - @itoa/test-utils@7.0.0
  - @itoa/fields@13.0.1

## 11.1.0

### Minor Changes

- [`dec3d336a`](https://github.com/itoa-vn/itoacommit/dec3d336adbe8156722fbe65f315a57b2f5c08e7) [#3153](https://github.com/itoa-vn/itoapull/3153) Thanks [@timleslie](https://github.com/timleslie)! - Made `context` available to user designed access control functions.

* [`78a5d5a45`](https://github.com/itoa-vn/itoacommit/78a5d5a457f80bba592e5a81056125b11469a5a8) [#3154](https://github.com/itoa-vn/itoapull/3154) Thanks [@timleslie](https://github.com/timleslie)! - Added improved support for [server-side GraphQL operations](/docs/discussions/server-side-graphql.md).

### Patch Changes

- [`1c69f4dc8`](https://github.com/itoa-vn/itoacommit/1c69f4dc8ab1eb23bc0a34850f48a51f2e9f1dce) [#3141](https://github.com/itoa-vn/itoapull/3141) Thanks [@molomby](https://github.com/molomby)! - Adding URL formulation rules to the style guide.

* [`950f23443`](https://github.com/itoa-vn/itoacommit/950f23443ef8f1a176a3cf6b039f93a29d954f5e) [#3138](https://github.com/itoa-vn/itoapull/3138) Thanks [@MadeByMike](https://github.com/MadeByMike)! - Moved adapter mocks into test utils package.

- [`3c3c67abb`](https://github.com/itoa-vn/itoacommit/3c3c67abb5ec82155fec893d389eac3bbeb12bbd) [#3149](https://github.com/itoa-vn/itoapull/3149) Thanks [@timleslie](https://github.com/timleslie)! - Added internal method `Itoa._getAccessControlContext()`, no functional changes.

- Updated dependencies [[`c235e34c7`](https://github.com/itoa-vn/itoacommit/c235e34c7a72cd05b05b3d1af08c93c1e98a8e91), [`dec3d336a`](https://github.com/itoa-vn/itoacommit/dec3d336adbe8156722fbe65f315a57b2f5c08e7), [`b693b2fa8`](https://github.com/itoa-vn/itoacommit/b693b2fa8a391d7f5bcfbea11061679bd4b559d8), [`950f23443`](https://github.com/itoa-vn/itoacommit/950f23443ef8f1a176a3cf6b039f93a29d954f5e)]:
  - @itoa/fields@13.0.0
  - @itoa/access-control@6.2.0
  - @itoa/test-utils@6.2.0

## 11.0.0

### Major Changes

- [`8df24d2ab`](https://github.com/itoa-vn/itoacommit/8df24d2ab4bed8a7fc1a856c20a571781dd7c04e) [#3069](https://github.com/itoa-vn/itoapull/3069) Thanks [@Vultraz](https://github.com/Vultraz)! - Prevented parsing the GraphQL schema twice.
  - `itoa.getTypeDefs` now returns the parsed GraphQL AST instead of the raw SDL.
  - `itoa.dumpSchema` now returns the GraphQL schema as a string instead of writing it to file. Additionally, its first `file` argument was removed and now only takes a the schema name, which defaults to `public`.

### Minor Changes

- [`7c38e2671`](https://github.com/itoa-vn/itoacommit/7c38e267143491f38699326f02764f40f337d416) [#3085](https://github.com/itoa-vn/itoapull/3085) Thanks [@MadeByMike](https://github.com/MadeByMike)! - Added a new \_verifyTables method to the knex adapter. This is then used by the Itoa CLI to warn when tables have not been initialised or the database might need a migration.

### Patch Changes

- [`33046a66f`](https://github.com/itoa-vn/itoacommit/33046a66f33a82cf099880303b44d9736344667d) [#2703](https://github.com/itoa-vn/itoapull/2703) Thanks [@jesstelford](https://github.com/jesstelford)! - Disallow itoa.executeQuery until after itoa.connect is called

## 10.1.0

### Minor Changes

- [`463f55233`](https://github.com/itoa-vn/itoacommit/463f552335013d5ba9ebf2e8f7a9ebf8e2b0e0db) [#3095](https://github.com/itoa-vn/itoapull/3095) Thanks [@timleslie](https://github.com/timleslie)! - Added `{ item, args, context, info, gqlName }` to the arguments available in access control functions for custom queries/mutations.

### Patch Changes

- Updated dependencies [[`463f55233`](https://github.com/itoa-vn/itoacommit/463f552335013d5ba9ebf2e8f7a9ebf8e2b0e0db)]:
  - @itoa/access-control@6.1.0

## 10.0.0

### Major Changes

- [`839666e25`](https://github.com/itoa-vn/itoacommit/839666e25d8bffefd034e6344e11d72dd43b925b) [#2872](https://github.com/itoa-vn/itoapull/2872) Thanks [@wcalebgray](https://github.com/wcalebgray)! - Added async capability for all Access Control resolvers. This changes the below methods to async functions, returning Promises:

  ```
  access-control
  - validateCustomAccessControl
  - validateListAccessControl
  - validateFieldAccessControl
  - validateAuthAccessControl

  itoa/List
  - checkFieldAccess
  - checkListAccess

  itoa/providers/custom
  - computeAccess

  itoa/providers/listAuth
  - checkAccess

  ```

  Changed `itoa/Itoa`'s `getGraphQlContext` return object (context) to include async resolvers for the following methods:

  ```
  - context.getCustomAccessControlForUser
  - context.getListAccessControlForUser
  - context.getFieldAccessControlForUser
  - context.getAuthAccessControlForUser
  ```

### Minor Changes

- [`4104e1f15`](https://github.com/itoa-vn/itoacommit/4104e1f15c545c05f680e8d16413862e875ca57a) [#2714](https://github.com/itoa-vn/itoapull/2714) Thanks [@Vultraz](https://github.com/Vultraz)! - Expanded list metadata queries.

* [`cbfc67470`](https://github.com/itoa-vn/itoacommit/cbfc6747011329f7210e79ebe228f44ed8607321) [#3011](https://github.com/itoa-vn/itoapull/3011) Thanks [@gautamsi](https://github.com/gautamsi)! - Added additional parameters to list plugins which expose `{ listKey, itoa }` to plugins. This helps plugin know name of list and itoa instance. Existing plugins are not affected by this change.

  New plugin signature: `(config, { listKey, itoa }) => config`

- [`b696b2acb`](https://github.com/itoa-vn/itoacommit/b696b2acbf7def8dba41f46ccef5ff852703b95a) [#3052](https://github.com/itoa-vn/itoapull/3052) Thanks [@Vultraz](https://github.com/Vultraz)! - Added an `auxiliary` input field to `_ksListsMeta(where: {})`.

### Patch Changes

- [`aacc4a7f8`](https://github.com/itoa-vn/itoacommit/aacc4a7f8f88c242ae4bd784330d25056842d3fb) [#2990](https://github.com/itoa-vn/itoapull/2990) Thanks [@Vultraz](https://github.com/Vultraz)! - Updated various Apollo dependencies to their latest versions.

* [`3204ae785`](https://github.com/itoa-vn/itoacommit/3204ae78576b0ab5649d5f5ae9cfbb1def347af1) [#3037](https://github.com/itoa-vn/itoapull/3037) Thanks [@Vultraz](https://github.com/Vultraz)! - Added `key` and `path` fields to replace `name` in `_ListMeta` and `_ListSchemaFields`, respectively. `name` in both types has been deprecated.

- [`4b06157be`](https://github.com/itoa-vn/itoacommit/4b06157be6cffde2d88969823f7c410fefd82317) [#2046](https://github.com/itoa-vn/itoapull/2046) Thanks [@Vultraz](https://github.com/Vultraz)! - Removed some workarounds for issues with older graphql versions

* [`64c0d68ac`](https://github.com/itoa-vn/itoacommit/64c0d68acb1ee969097a8fe59b5c296473790c5c) [#2650](https://github.com/itoa-vn/itoapull/2650) Thanks [@Vultraz](https://github.com/Vultraz)! - Added the boilerplate for subscription support to the providers (no functionality yet).

- [`d970580e1`](https://github.com/itoa-vn/itoacommit/d970580e14904ba2f2ac5e969257e71f77ab67d7) [#3045](https://github.com/itoa-vn/itoapull/3045) Thanks [@timleslie](https://github.com/timleslie)! - Restructured internal files.

- Updated dependencies [[`c2ebb51c7`](https://github.com/itoa-vn/itoacommit/c2ebb51c786297879fe9fac2007804055631e9e2), [`c3faeeff4`](https://github.com/itoa-vn/itoacommit/c3faeeff41f9b29a9fc31ca4e7778b596fcb20b9), [`397982096`](https://github.com/itoa-vn/itoacommit/39798209642571d3ba698e11410f5161cd1943bb), [`538378e4e`](https://github.com/itoa-vn/itoacommit/538378e4eb143dbe6e7a943408e0af302eb86b85), [`9f67e0e91`](https://github.com/itoa-vn/itoacommit/9f67e0e912b4f7dcb90fcb07c4b30bd6c45de464), [`ea9608342`](https://github.com/itoa-vn/itoacommit/ea960834262cec66f52fa39c1b3b07b702b3cd4d), [`8fddd97b2`](https://github.com/itoa-vn/itoacommit/8fddd97b20f1928ff7306d5d0dcc96e58ffe55fb), [`fdfb01417`](https://github.com/itoa-vn/itoacommit/fdfb01417b6d330342f4b6c326767c9567e35ca5), [`83548d43d`](https://github.com/itoa-vn/itoacommit/83548d43d661959a34a6de475994430ee1de3a1d), [`5ea313461`](https://github.com/itoa-vn/itoacommit/5ea313461aa2cba310b2634cc87780092c84b5be), [`aacc4a7f8`](https://github.com/itoa-vn/itoacommit/aacc4a7f8f88c242ae4bd784330d25056842d3fb), [`04c57fa78`](https://github.com/itoa-vn/itoacommit/04c57fa7840714d3413e093d468b78d740c95c9a), [`f33388b50`](https://github.com/itoa-vn/itoacommit/f33388b5061d59747ab46e238f43e9b08f52bd1e), [`4b06157be`](https://github.com/itoa-vn/itoacommit/4b06157be6cffde2d88969823f7c410fefd82317), [`649017fbd`](https://github.com/itoa-vn/itoacommit/649017fbd5ea17c36e8c49d44836e1f2bcae2692), [`839666e25`](https://github.com/itoa-vn/itoacommit/839666e25d8bffefd034e6344e11d72dd43b925b), [`64c0d68ac`](https://github.com/itoa-vn/itoacommit/64c0d68acb1ee969097a8fe59b5c296473790c5c), [`170faf568`](https://github.com/itoa-vn/itoacommit/170faf568fef5b74147791476b466dc7a25c7d6f), [`de27d2c16`](https://github.com/itoa-vn/itoacommit/de27d2c16b520ae5126a74efb85c70ae88ae6b60)]:
  - @itoa/fields@12.0.0
  - @itoa/access-control@6.0.0
  - @itoa/logger@5.1.2
  - @itoa/app-version@1.0.2

## 9.0.1

### Patch Changes

- Updated dependencies [[`a124417f`](https://github.com/itoa-vn/itoacommit/a124417fddc75889db5e4e8e0d5625fb4af12590), [`54931d75`](https://github.com/itoa-vn/itoacommit/54931d75d3f26f4f300c2c4c3ee65ed3183b4a6a), [`e9a0de2c`](https://github.com/itoa-vn/itoacommit/e9a0de2cc03c211beca01ec206244105bdca6afc), [`59ed6310`](https://github.com/itoa-vn/itoacommit/59ed6310bacc76f571639de048689becbedbeac5)]:
  - @itoa/fields@11.0.0

## 9.0.0

### Major Changes

- [`12126788`](https://github.com/itoa-vn/itoacommit/121267885eb3e279eb5b6d035568f547323dd245) [#2893](https://github.com/itoa-vn/itoapull/2893) Thanks [@timleslie](https://github.com/timleslie)! - Added a method `Itoa.getAdminViews({ schemaName })` which returns the views for the Admin UI. `List.getAdminMeta()` no longer returns a `views` values.

* [`b5c44934`](https://github.com/itoa-vn/itoacommit/b5c4493442c5e4cfeba23c058a9a6819c628aab9) [#2903](https://github.com/itoa-vn/itoapull/2903) Thanks [@Vultraz](https://github.com/Vultraz)! - Fixed several access control input issues:
  - `itemIds` is now properly set in list-level updateMany mutation checks. Previously this data was incorrectly assigned to `itemId` which is now `undefined` in list-level checks.
  - `itemIds` is now set in field-level updateMany mutation checks (previously `undefined`).
  - `itemId` is now set in field-level updateMany mutation checks (previously `undefined`). This is the ID of the item currently being checked.
  - `itemId` is now properly set in field-level updateSingle mutation checks (previously `undefined`).
  - All field-level access control checks now have `gqlName` properly set (previously `undefined`).

- [`0fbc5b98`](https://github.com/itoa-vn/itoacommit/0fbc5b989a9f96248d1bd7f2f589fe77cb1d8f7d) [#2882](https://github.com/itoa-vn/itoapull/2882) Thanks [@Vultraz](https://github.com/Vultraz)! - The `cookieSecret` option no longer defaults to a static value. It is now required in production mode. In development mode, if undefined, a random new value is generated each time the server is started.

* [`da1359df`](https://github.com/itoa-vn/itoacommit/da1359dfc1bff7e27505eff876efe3a0865bae2d) [#2861](https://github.com/itoa-vn/itoapull/2861) Thanks [@timleslie](https://github.com/timleslie)! - Moved the cookie configuration from individual options to an object which is passed directly to the express-session middleware.
  Previously you could only set `secure` and `maxAge` via `secureCookies` and `cookieMaxAge`.
  These options have been removed.
  You can now set a config option called `cookie` which can contain `secure` and `maxAge`, as well as `domain`, `expires`, `httpOnly`, `path` and `sameSite`.

  The `sameSite` option is now explicitly defaulted to `false`.

  See the [express-session middleware docs](https://github.com/expressjs/session#cookie) for more details on these options..

  #### Default

  ```javascript
  const itoa = new Itoa({
    cookie: {
      // domain: undefined,
      // expires: undefined,
      // httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      sameSite: false,
      // path: '/',
      secure: process.env.NODE_ENV === 'production', // Defaults to true in production
    },
  });
  ```

### Minor Changes

- [`9bad0e5f`](https://github.com/itoa-vn/itoacommit/9bad0e5fe67d2379537f4cb145058c6c809b3533) [#2660](https://github.com/itoa-vn/itoapull/2660) Thanks [@Vultraz](https://github.com/Vultraz)! - Added new `sortBy` query argument.

  Each list now has an additional `Sort<List>By` enum type that represents the valid sorting options for all orderable fields in the list. `sortBy` takes one or more of these enum types, allowing for multi-field/column sorting.

### Patch Changes

- [`e0e3e30a`](https://github.com/itoa-vn/itoacommit/e0e3e30a9051741de3f5a0c12ba00f2238d54800) [#2697](https://github.com/itoa-vn/itoapull/2697) Thanks [@Vultraz](https://github.com/Vultraz)! - Converted some stray promise chains to async/await.

* [`c8e52f3b`](https://github.com/itoa-vn/itoacommit/c8e52f3ba892269922c1ed3af0c2114f07387704) [#2907](https://github.com/itoa-vn/itoapull/2907) Thanks [@Vultraz](https://github.com/Vultraz)! - Included id fields in the \_ksListsMeta schema query.

- [`2a1e4f49`](https://github.com/itoa-vn/itoacommit/2a1e4f49d7f234c49e5b04440ff786ddf3e9e7ed) [#2901](https://github.com/itoa-vn/itoapull/2901) Thanks [@Vultraz](https://github.com/Vultraz)! - Fixed Admin UI sometimes using the wrong auth mutation name.

* [`9e2e0071`](https://github.com/itoa-vn/itoacommit/9e2e00715aff50f2ddfedf3dbc14f390275ff23b) [#2853](https://github.com/itoa-vn/itoapull/2853) Thanks [@timleslie](https://github.com/timleslie)! - Upgraded dev dependencies.

* Updated dependencies [[`72e0a4e1`](https://github.com/itoa-vn/itoacommit/72e0a4e19942df11c72d11c2cf6ee9bc94300d87), [`e0e3e30a`](https://github.com/itoa-vn/itoacommit/e0e3e30a9051741de3f5a0c12ba00f2238d54800), [`5ec4e5d5`](https://github.com/itoa-vn/itoacommit/5ec4e5d547503baeae2ac2f6317b66c2ebae93b7), [`6e507838`](https://github.com/itoa-vn/itoacommit/6e5078380e1d17eb2884554eef114fdd521a15f4), [`0fbc5b98`](https://github.com/itoa-vn/itoacommit/0fbc5b989a9f96248d1bd7f2f589fe77cb1d8f7d), [`e3d46ce4`](https://github.com/itoa-vn/itoacommit/e3d46ce4bd9f9ec8808ab3194672c6849e624e27), [`d8584765`](https://github.com/itoa-vn/itoacommit/d85847652e224e5000e036be2df0b8a45ab96385), [`da1359df`](https://github.com/itoa-vn/itoacommit/da1359dfc1bff7e27505eff876efe3a0865bae2d), [`285026a0`](https://github.com/itoa-vn/itoacommit/285026a04ffce23ab72d7defc18ced2e980b0de4), [`d4811b02`](https://github.com/itoa-vn/itoacommit/d4811b0231c5d64e95dbbce57531df0931d4defa), [`e2800875`](https://github.com/itoa-vn/itoacommit/e28008756cbcc1e07e012a9fdb0cfa0ad94f3673), [`60e2c7eb`](https://github.com/itoa-vn/itoacommit/60e2c7eb2298a016c68a19a056040a3b45beab2a), [`99da34a8`](https://github.com/itoa-vn/itoacommit/99da34a8db26b8861b08cee330407605e787a80c), [`bcf03a7f`](https://github.com/itoa-vn/itoacommit/bcf03a7f8067a3f29f22dde397b957bf5cee1a07), [`e765ad20`](https://github.com/itoa-vn/itoacommit/e765ad20abae9838f64b72b7d43767ec87db336a), [`d7eb2601`](https://github.com/itoa-vn/itoacommit/d7eb260144d2aa31e7ef4e636e7a23f91dc37285)]:
  - @itoa/fields@10.0.0
  - @itoa/utils@5.4.1
  - @itoa/session@7.0.0

## 8.1.4

### Patch Changes

- [`8a135a88`](https://github.com/itoa-vn/itoacommit/8a135a88ae6f3a4434db0ba7033cad2e5f18651e) [#2808](https://github.com/itoa-vn/itoapull/2808) Thanks [@Vultraz](https://github.com/Vultraz)! - Fixed list-level `adminDoc` not doing anything.

- Updated dependencies [[`b897ba14`](https://github.com/itoa-vn/itoacommit/b897ba14e34aa441b2d658c30b3dda9d1ebd48e2), [`f266a692`](https://github.com/itoa-vn/itoacommit/f266a6923a24c84936d66e00ec7de0ea0956445b), [`4e56eed6`](https://github.com/itoa-vn/itoacommit/4e56eed68c643fd436c371e2635d3024c51968b0)]:
  - @itoa/fields@9.0.5

## 8.1.3

### Patch Changes

- [`830ed52a`](https://github.com/itoa-vn/itoacommit/830ed52a389c29107089a6a2cf8bb29f2d06750c) [#2814](https://github.com/itoa-vn/itoapull/2814) Thanks [@timleslie](https://github.com/timleslie)! - The `authenticateMutation` resolver now passes the `context` object through to the `authStrategy.validate` method.

## 8.1.2

### Patch Changes

- [`6a27fcf1`](https://github.com/itoa-vn/itoacommit/6a27fcf1896c5a745308346e5b0e66dd8bdd57a3) [#2749](https://github.com/itoa-vn/itoapull/2749) Thanks [@jesstelford](https://github.com/jesstelford)! - More resilient mongo migration output for Itoa Arcade in the upgrade-relationships command.

* [`98e9f6d1`](https://github.com/itoa-vn/itoacommit/98e9f6d16e16ee13d2a8a22eb25be9cd2afc6fc0) [#2314](https://github.com/itoa-vn/itoapull/2314) Thanks [@gautamsi](https://github.com/gautamsi)! - \* Made all values in `adminConfig` list options available to `admin-ui` as part of list's `adminMeta`.

  - Added `adminConfig` option to all Fields which are made available to field's `adminMeta` in `admin-ui`.
  - Added `adminMeta` option in `AdminUIApp` constructor which is also made available to `adminMeta` of `admin-ui`.

  All the improvements are useful in `admin-ui` customizations like UI Hooks or custom Field Views.

* Updated dependencies [[`9d862edc`](https://github.com/itoa-vn/itoacommit/9d862edc506460d4a0456e48ec418b9042b582ad), [`98e9f6d1`](https://github.com/itoa-vn/itoacommit/98e9f6d16e16ee13d2a8a22eb25be9cd2afc6fc0)]:
  - @itoa/fields@9.0.2

## 8.1.1

### Patch Changes

- [`ec8d84c4`](https://github.com/itoa-vn/itoacommit/ec8d84c49a5c22cd0c96ffb2209e61f6775aaf40) [#2685](https://github.com/itoa-vn/itoapull/2685) Thanks [@Vultraz](https://github.com/Vultraz)! - Made extendGraphQLSchema(), createList(), and createAuthStrategy() error if called after prepare().

* [`a50494e5`](https://github.com/itoa-vn/itoacommit/a50494e53bdc9712f8aa4a54b9718609b65d85e1) [#2688](https://github.com/itoa-vn/itoapull/2688) Thanks [@jesstelford](https://github.com/jesstelford)! - Improve legibility of `itoa upgrade-relationships` CLI command

## 8.1.0

### Minor Changes

- [`515b4ff6`](https://github.com/itoa-vn/itoacommit/515b4ff697e4df40ece8e5ab30def93f9df866d1) [#2664](https://github.com/itoa-vn/itoapull/2664) Thanks [@Vultraz](https://github.com/Vultraz)! - Added a `where: { key }` argument to List meta queries.

* [`f9fe301f`](https://github.com/itoa-vn/itoacommit/f9fe301f525f3591e20d069083276d296543d54a) [#2673](https://github.com/itoa-vn/itoapull/2673) Thanks [@Vultraz](https://github.com/Vultraz)! - Added `fields` list to ListSchema. This optionally takes a `where: { type }` argument and returns all matching field names on a list along with their types.

## 8.0.0

### Major Changes

- [`fd685241`](https://github.com/itoa-vn/itoacommit/fd68524135025e4d800b4a98932916736dd50e9d) [#2000](https://github.com/itoa-vn/itoapull/2000) Thanks [@timleslie](https://github.com/timleslie)! - ## Release - Arcade

  This release introduces a **new and improved data schema** for Itoa.
  The new data schema simplifies the way your data is stored and will unlock the development of new functionality within Itoa.

  > **Important:** You will need to make changes to your database to take advantage of the new data schema. Please read the full [release notes](https://www.itoa.vn/discussions/new-data-schema) for instructions on updating your database.

### Patch Changes

- Updated dependencies [[`fd685241`](https://github.com/itoa-vn/itoacommit/fd68524135025e4d800b4a98932916736dd50e9d)]:
  - @itoa/fields@9.0.0

## 7.1.0

### Minor Changes

- [`3407fa68`](https://github.com/itoa-vn/itoacommit/3407fa68b91d7ebb3e7288c7e95631013fe12535) [#2575](https://github.com/itoa-vn/itoapull/2575) Thanks [@MadeByMike](https://github.com/MadeByMike)! - Added a cli script `itoa create-tables` that will initialise an empty database with the Knex Adapter.

### Patch Changes

- [`4a7d1eab`](https://github.com/itoa-vn/itoacommit/4a7d1eabf9b44fac7e16dfe20afdce409986e8dc) [#2627](https://github.com/itoa-vn/itoapull/2627) Thanks [@jordanoverbye](https://github.com/jordanoverbye)! - Updated documentation for the last argument in custom resolver functions.

* [`c08c28d2`](https://github.com/itoa-vn/itoacommit/c08c28d22f2c6a2bfa73ab0ea347c9e0da8a9063) [#2593](https://github.com/itoa-vn/itoapull/2593) Thanks [@jossmac](https://github.com/jossmac)! - Applied a more consistent voice throughout documentation.

- [`c2b1b725`](https://github.com/itoa-vn/itoacommit/c2b1b725a9474348964a4ac2e0f5b4aaf1a7f486) [#2615](https://github.com/itoa-vn/itoapull/2615) Thanks [@Vultraz](https://github.com/Vultraz)! - Improved list label logic.

- Updated dependencies [[`e7e4bc1d`](https://github.com/itoa-vn/itoacommit/e7e4bc1d22149d4daceb31d303f6ad10c2b853ba), [`58c4ffc3`](https://github.com/itoa-vn/itoacommit/58c4ffc3d4b1edf8bdfbc4ea299133d303239fc6), [`007063c4`](https://github.com/itoa-vn/itoacommit/007063c4f17e6e7038312ed9126eaf91757e7939), [`c08c28d2`](https://github.com/itoa-vn/itoacommit/c08c28d22f2c6a2bfa73ab0ea347c9e0da8a9063), [`d138736d`](https://github.com/itoa-vn/itoacommit/d138736db184c5884171c7a65e43377f248046b5), [`2ae2bd47`](https://github.com/itoa-vn/itoacommit/2ae2bd47eb54a816cfd4c8cd178c460729cbc258), [`2cbd38b0`](https://github.com/itoa-vn/itoacommit/2cbd38b05adc98cface11a8767f66b48a1cb0bbf)]:
  - @itoa/fields@8.0.0
  - @itoa/app-version@1.0.1
  - @itoa/session@6.0.1

## 7.0.0

### Major Changes

- [`61a70503`](https://github.com/itoa-vn/itoacommit/61a70503f6c184a8f0f5440466399f12e6d7fa41) [#2529](https://github.com/itoa-vn/itoapull/2529) Thanks [@timleslie](https://github.com/timleslie)! - `@itoa/session` now provides a `SessionManager` class which replaces the former function based API. The method `itoa.getCookieSecret()` has been removed.

* [`cec7ba5e`](https://github.com/itoa-vn/itoacommit/cec7ba5e2061280eff2a1d989054ecb02760e36d) [#2544](https://github.com/itoa-vn/itoapull/2544) Thanks [@timleslie](https://github.com/timleslie)! - Removed the `prepareFieldAdapter()` method of `BaseListAdapter`, `MongooseAdapter` and `KnexListAdapter`. No action is required unless you were explicitly using this method in your code.

### Minor Changes

- [`ca28681c`](https://github.com/itoa-vn/itoacommit/ca28681ca23c74bc57041fa36c20b93a4520e762) [#2543](https://github.com/itoa-vn/itoapull/2543) Thanks [@timleslie](https://github.com/timleslie)! - `BaseItoaAdapter.connect` and `BaseItoaAdapter.postConnect` both now accept a `rels` argument, which provides information about the relationships in the system.

### Patch Changes

- [`b6a555c2`](https://github.com/itoa-vn/itoacommit/b6a555c28296394908757f7404b72bc6b828b52a) [#2540](https://github.com/itoa-vn/itoapull/2540) Thanks [@timleslie](https://github.com/timleslie)! - Removed the undocumented `audiences` feature.

* [`68be8f45`](https://github.com/itoa-vn/itoacommit/68be8f452909100fbddec431d6fe60c20a06a700) [#2549](https://github.com/itoa-vn/itoapull/2549) Thanks [@jesstelford](https://github.com/jesstelford)! - Removed unused 'existingItem' parameter from calls to .defaultValue() methods.

* Updated dependencies [[`b6a555c2`](https://github.com/itoa-vn/itoacommit/b6a555c28296394908757f7404b72bc6b828b52a), [`68be8f45`](https://github.com/itoa-vn/itoacommit/68be8f452909100fbddec431d6fe60c20a06a700), [`61a70503`](https://github.com/itoa-vn/itoacommit/61a70503f6c184a8f0f5440466399f12e6d7fa41), [`663ae7b4`](https://github.com/itoa-vn/itoacommit/663ae7b453f450f077795fbbc6c9f138e6b27f52)]:
  - @itoa/session@6.0.0
  - @itoa/fields@7.0.2
  - @itoa/utils@5.4.0

## 6.0.2

### Patch Changes

- [`51546e41`](https://github.com/itoa-vn/itoacommit/51546e4142fb8c66cfc413479c671a59618f885b) [#2524](https://github.com/itoa-vn/itoapull/2524) Thanks [@jesstelford](https://github.com/jesstelford)! - Created `upcase` util to make the first letter for word uppercase.

* [`d30b7498`](https://github.com/itoa-vn/itoacommit/d30b74984b21ae9fc2a3b39850f674639fbac074) [#2535](https://github.com/itoa-vn/itoapull/2535) Thanks [@timleslie](https://github.com/timleslie)! - The new package `@itoa/app-version` consolidates the express middleware and graphQL provider support for returning the `appVersion`.

- [`8f22ab5e`](https://github.com/itoa-vn/itoacommit/8f22ab5eefc034f9fef4fd0f9ec2c2583fc5514f) [#2536](https://github.com/itoa-vn/itoapull/2536) Thanks [@timleslie](https://github.com/timleslie)! - Refactored internals with no functional changes.

* [`599c0929`](https://github.com/itoa-vn/itoacommit/599c0929b213ebd4beb79e3ccaa685b92348ca81) [#2542](https://github.com/itoa-vn/itoapull/2542) Thanks [@Vultraz](https://github.com/Vultraz)! - Fixed error when using custom GraphQL schema caused by a regression in CustomProvider.

- [`fb510d67`](https://github.com/itoa-vn/itoacommit/fb510d67ab124d8c1bda1884fa2a0d48262b5e4d) [#2527](https://github.com/itoa-vn/itoapull/2527) Thanks [@jesstelford](https://github.com/jesstelford)! - Updated to latest version of globby for discovering test files to run.

- Updated dependencies [[`51546e41`](https://github.com/itoa-vn/itoacommit/51546e4142fb8c66cfc413479c671a59618f885b), [`83bdf743`](https://github.com/itoa-vn/itoacommit/83bdf743748e39d1ea73eff2c8e3576cc713c624), [`d748156b`](https://github.com/itoa-vn/itoacommit/d748156ba5ebe33f4271fae0df781e0c63f2b7e6), [`d30b7498`](https://github.com/itoa-vn/itoacommit/d30b74984b21ae9fc2a3b39850f674639fbac074), [`1d9c6762`](https://github.com/itoa-vn/itoacommit/1d9c6762d32409c71da6a68a083a81197c35aac3)]:
  - @itoa/utils@5.3.0
  - @itoa/fields@7.0.1
  - @itoa/app-version@1.0.0

## 6.0.1

### Patch Changes

- Updated dependencies [[`161bf3e5`](https://github.com/itoa-vn/itoacommit/161bf3e57acb1b3d88a0836507d4c8dd4935f260)]:
  - @itoa/fields@7.0.0

## 6.0.0

### Major Changes

- [`10e88dc3`](https://github.com/itoa-vn/itoacommit/10e88dc3d81f5e021db0bfb31f7547852c602c14) [#2468](https://github.com/itoa-vn/itoapull/2468) Thanks [@timleslie](https://github.com/timleslie)! - Removed `Itoa.getAdminSchema` in favour of a new `Itoa.getResolvers({ schemaName })` method, along with the pre-existing `Itoa.getTypeDefs({ schemaName })`.

* [`97fb01fe`](https://github.com/itoa-vn/itoacommit/97fb01fe5a32f5003a084c1fd357852fc28f74e4) [#2457](https://github.com/itoa-vn/itoapull/2457) Thanks [@timleslie](https://github.com/timleslie)! - Introduced `ListAuthProvider` to generate authentication mutations and queries. This introduces the following breaking changes:
  - `Itoa.createAuthStrategy()` must be called _after_ the associated `List` has been created.
  - `List.hasAuth()` has been removed.
  - `List.getAuth()` has been removed.
  - `List.gqlNames.authenticatedQueryName` has been removed.
  - `List.gqlNames.authenticateMutationPrefix` has been removed.
  - `List.gqlNames.unauthenticateMutationName` has been removed.
  - `List.gqlNames.authenticateOutputName` has been removed.
  - `List.gqlNames.unauthenticateOutputName` has been removed.
  - `List.checkAuthAccess()` has been removed.
  - `List.authenticatedQuery()` has been removed.
  - `List.authenticateMutation()` has been removed.
  - `List.unauthenticateMutation()` has been removed.

### Minor Changes

- [`42497b8e`](https://github.com/itoa-vn/itoacommit/42497b8ebbaeaf0f4d7881dbb76c6abafde4cace) [#2456](https://github.com/itoa-vn/itoapull/2456) Thanks [@timleslie](https://github.com/timleslie)! - Add `getAuthAccessControlForUser()` to the graphQL context to provide custom access control of authentication queries and mutations.

### Patch Changes

- [`e46f0adf`](https://github.com/itoa-vn/itoacommit/e46f0adf97141e1f1205787453173a0585df5bc3) [#2459](https://github.com/itoa-vn/itoapull/2459) Thanks [@timleslie](https://github.com/timleslie)! - Refactored internal structures (removed `_graphQLQuery`, added `_schemas` and `_executeOperation()`).

* [`6975f169`](https://github.com/itoa-vn/itoacommit/6975f16959bde3fe0e861977471c94a8c9f2c0b0) [#2455](https://github.com/itoa-vn/itoapull/2455) Thanks [@timleslie](https://github.com/timleslie)! - Refactored internals to allow providers to throw consistent errors.

- [`6111e065`](https://github.com/itoa-vn/itoacommit/6111e06554a6aa6db0f7df1a6c16f9da8e81fce4) [#2436](https://github.com/itoa-vn/itoapull/2436) Thanks [@timleslie](https://github.com/timleslie)! - Refactored `Itoa.extendGraphQLSchema()` to use a `CustomProvider` graphQL provider.

* [`2d1069f1`](https://github.com/itoa-vn/itoacommit/2d1069f11f5f8941b0a18e482541043c853ebb4f) [#2465](https://github.com/itoa-vn/itoapull/2465) Thanks [@timleslie](https://github.com/timleslie)! - Added a ListCRUDProvider to generate the CRUD graphQL API for lists.

- [`949f2f6a`](https://github.com/itoa-vn/itoacommit/949f2f6a3889492015281ffba45a8b3d37e6d888) [#2467](https://github.com/itoa-vn/itoapull/2467) Thanks [@timleslie](https://github.com/timleslie)! - Removed the undocumented env-var `DEBUG_GRAPHQL_SCHEMAS`.

* [`5ba330b8`](https://github.com/itoa-vn/itoacommit/5ba330b8b2609ea0033a636daf9a215a5a192c20) [#2487](https://github.com/itoa-vn/itoapull/2487) Thanks [@Noviny](https://github.com/Noviny)! - Small changes to package.json (mostly adding a repository field)

* Updated dependencies [[`fe42a997`](https://github.com/itoa-vn/itoacommit/fe42a997c81825a819ac28f05e02d1ed61099542), [`42497b8e`](https://github.com/itoa-vn/itoacommit/42497b8ebbaeaf0f4d7881dbb76c6abafde4cace), [`6b353eff`](https://github.com/itoa-vn/itoacommit/6b353effc8b617137a3978b2c845e01403889722), [`5ba330b8`](https://github.com/itoa-vn/itoacommit/5ba330b8b2609ea0033a636daf9a215a5a192c20)]:
  - @itoa/fields@6.3.2
  - @itoa/access-control@5.2.0
  - @itoa/logger@5.1.1
  - @itoa/session@5.1.1
  - @itoa/utils@5.2.2

## 5.6.0

### Minor Changes

- [`3abc5883`](https://github.com/itoa-vn/itoacommit/3abc58831e0f9b5871569a3fa6b21be7dc269cf3) [#2430](https://github.com/itoa-vn/itoapull/2430) Thanks [@timleslie](https://github.com/timleslie)! - Added support for the new GraphQL Provider Framework (#2418).

### Patch Changes

- [`7ce804a8`](https://github.com/itoa-vn/itoacommit/7ce804a877300709375e5bc14206080ab15aec54) [#2401](https://github.com/itoa-vn/itoapull/2401) Thanks [@acoreyj](https://github.com/acoreyj)! - Made sure `createRelationships` function in `relationship-utils.js` uses the correct relatedListKey by splitting out possible field name;

  This fixes an issue where createItems throws an Error when using Lists Back References.
  Fixes #2360

* [`8bdbb114`](https://github.com/itoa-vn/itoacommit/8bdbb114f6b2864693ae6e534df6fe8ee8345a60) [#2433](https://github.com/itoa-vn/itoapull/2433) Thanks [@timleslie](https://github.com/timleslie)! - Added a VersionProvider to generate the `appVersion` graphQL query.

* Updated dependencies [[`d8a7b8a2`](https://github.com/itoa-vn/itoacommit/d8a7b8a23b4c3e1545d101a92323be165ad362e2), [`9a388f01`](https://github.com/itoa-vn/itoacommit/9a388f01e388272d56f81af2247d8030e0f2c972), [`bd4096ee`](https://github.com/itoa-vn/itoacommit/bd4096ee86f7790c76db23090b38f880e5aa7ecc), [`dcdd8ed9`](https://github.com/itoa-vn/itoacommit/dcdd8ed9142cf3328a7af80bc167ef93c7669b09), [`c059b63c`](https://github.com/itoa-vn/itoacommit/c059b63c6ebdbb60ac4095d1efd791d598b2756c)]:
  - @itoa/fields@6.3.1
  - @itoa/utils@5.2.1

## 5.5.0

### Minor Changes

- [`517b23e4`](https://github.com/itoa-vn/itoacommit/517b23e4b17414ed1807e8d7af1e67377ba3b7bf) [#2391](https://github.com/itoa-vn/itoapull/2391) Thanks [@timleslie](https://github.com/timleslie)! - Removed support for Node 8.x, as it is [no longer in maintenance mode](https://nodejs.org/en/about/releases/).

### Patch Changes

- Updated dependencies [[`517b23e4`](https://github.com/itoa-vn/itoacommit/517b23e4b17414ed1807e8d7af1e67377ba3b7bf)]:
  - @itoa/access-control@5.1.0
  - @itoa/fields@6.3.0
  - @itoa/logger@5.1.0
  - @itoa/session@5.1.0
  - @itoa/utils@5.2.0

## 5.4.4

### Patch Changes

- [`b8631cf7`](https://github.com/itoa-vn/itoacommit/b8631cf770db14b90f83300358213b7572ca01f2) [#2320](https://github.com/itoa-vn/itoapull/2320) Thanks [@Vultraz](https://github.com/Vultraz)! - Updated `graphql` dependency from 14.4.2 to 14.6.0 and `graphql-type-json` depedency from 0.2.1 to 0.3.1.

* [`ae4cf2d1`](https://github.com/itoa-vn/itoacommit/ae4cf2d108768d7ccbd23a409e7170fc92c81316) [#2345](https://github.com/itoa-vn/itoapull/2345) Thanks [@molomby](https://github.com/molomby)! - Removing unnecessary calls to field type postRead hooks on delete operations. The internal \_delete() functions provide by the DB adapter now return a count of the records removed.

* Updated dependencies [[`b8631cf7`](https://github.com/itoa-vn/itoacommit/b8631cf770db14b90f83300358213b7572ca01f2)]:
  - @itoa/fields@6.2.3

## 5.4.3

### Patch Changes

- [`eb36cf37`](https://github.com/itoa-vn/itoacommit/eb36cf3731984cc7cf60b60cb1c043962252610f) [#2255](https://github.com/itoa-vn/itoapull/2255) - Removed unused dependencies.

* [`8f54a4eb`](https://github.com/itoa-vn/itoacommit/8f54a4eb2d63ed042d736fd20ab622f326e111b8) [#2269](https://github.com/itoa-vn/itoapull/2269) - Added a check for invalid relationship configurations.
* Updated dependencies [[`6bc87d43`](https://github.com/itoa-vn/itoacommit/6bc87d43de4861068de257735c1a6cf886cd3c17), [`6eb23086`](https://github.com/itoa-vn/itoacommit/6eb23086485d9bcbb93e35ec716d846790d611f2), [`8f54a4eb`](https://github.com/itoa-vn/itoacommit/8f54a4eb2d63ed042d736fd20ab622f326e111b8)]:
  - @itoa/fields@6.2.0

## 5.4.2

### Patch Changes

- [`cc58f0e0`](https://github.com/itoa-vn/itoacommit/cc58f0e05d1de06432e149f0767122ae51d1c31a) [#2202](https://github.com/itoa-vn/itoapull/2202) - Apps which don't define `build()` no longer cause itoa to fail.
- Updated dependencies [[`220d3a4b`](https://github.com/itoa-vn/itoacommit/220d3a4bc4265dc56653bed4b292f3e4d708502b), [`11586035`](https://github.com/itoa-vn/itoacommit/115860350aa901749d240cb275cada29b8d541f8)]:
  - @itoa/fields@6.1.0

## 5.4.1

### Patch Changes

- [`f3ea15f8`](https://github.com/itoa-vn/itoacommit/f3ea15f86f7bbd08abddcf3a63c5c66e86693d29) [#2189](https://github.com/itoa-vn/itoapull/2189) - Upgraded prettier to 1.19.1 and formatted code accordingly.

* [`05d07adf`](https://github.com/itoa-vn/itoacommit/05d07adf84059ff565cd2394f68d71d92e657485) [#2169](https://github.com/itoa-vn/itoapull/2169) - Ensured that `executeQuery()` does not throw when a queried field has cache hint setttings.

- [`78193f9c`](https://github.com/itoa-vn/itoacommit/78193f9c9d93655fb0d4b8dc494fbe4c622a4d64) [#2152](https://github.com/itoa-vn/itoapull/2152) - Fixed `configureExpress()`.
- Updated dependencies [[`38f88b62`](https://github.com/itoa-vn/itoacommit/38f88b62d9592d91b56528d4d9c40e9399440c4a), [`f3ea15f8`](https://github.com/itoa-vn/itoacommit/f3ea15f86f7bbd08abddcf3a63c5c66e86693d29), [`ef419b59`](https://github.com/itoa-vn/itoacommit/ef419b59729a050f25fc886be6ec8ce17cbb1104)]:
  - @itoa/build-field-types@5.1.4
  - @itoa/fields@6.0.5
  - @itoa/utils@5.1.3

## 5.4.0

### Minor Changes

- [`ae078619`](https://github.com/itoa-vn/itoacommit/ae0786197713db779791bf4da5d92a144d46fe6f) [#2119](https://github.com/itoa-vn/itoapull/2119) - Allow configuring cors & pinoOptions for default server by adding them to the export in index.js

### Patch Changes

- [`ae078619`](https://github.com/itoa-vn/itoacommit/ae0786197713db779791bf4da5d92a144d46fe6f) [#2119](https://github.com/itoa-vn/itoapull/2119) - Document cors & pinoOptions params for itoa.prepare()
- Updated dependencies [[`3d2c4b3f`](https://github.com/itoa-vn/itoacommit/3d2c4b3fb8f05e79fc1a4a8e39077058466795a2)]:
  - @itoa/utils@5.1.2
  - @itoa/fields@6.0.3

## 5.3.0

### Minor Changes

- [`77056ebd`](https://github.com/itoa-vn/itoacommit/77056ebdb31e58d27372925e8e24311a8c7d9e33) [#2008](https://github.com/itoa-vn/itoapull/2008) Thanks [@molomby](https://github.com/molomby)! - Adding 'operation' argument to all hooks

* [`733ac847`](https://github.com/itoa-vn/itoacommit/733ac847cab488dc92a30e7b458191d750fd5a3d) [#1983](https://github.com/itoa-vn/itoapull/1983) Thanks [@MadeByMike](https://github.com/MadeByMike)! - Fixed a bug with schema generation and display in the AdminUI when a list contains only fields where access control is false.

- [`6a348b93`](https://github.com/itoa-vn/itoacommit/6a348b93607c305c4ba61c1406a4acd508f33f64) [#1978](https://github.com/itoa-vn/itoapull/1978) Thanks [@MadeByMike](https://github.com/MadeByMike)! - Added a new field type `Virtual`. This allows creation of fields that return data computed from other field values or outside Itoa.

### Patch Changes

- [`e68fc43b`](https://github.com/itoa-vn/itoacommit/e68fc43ba006f9c958f9c81ae20b230d05c2cab6) [#1990](https://github.com/itoa-vn/itoapull/1990) Thanks [@timleslie](https://github.com/timleslie)! - Fixed a bug where the returned value of a `deleteItem()` mutation was not always correctly populated.

* [`d4d89836`](https://github.com/itoa-vn/itoacommit/d4d89836700413c1da2b76e9b82b649c2cac859d) [#2067](https://github.com/itoa-vn/itoapull/2067) - Fixed handling of cache headers with mutations.

- [`5540771e`](https://github.com/itoa-vn/itoacommit/5540771e52b5cb1aa33c0486dede7f2f9bc0944f) [#2006](https://github.com/itoa-vn/itoapull/2006) Thanks [@timleslie](https://github.com/timleslie)! - Consolidated implementation of all `listAdapter.find\*()` methods to use the `itemsQuery()` API for internal consistency.

* [`1f4dc33d`](https://github.com/itoa-vn/itoacommit/1f4dc33d8a5ac4e38427eb215a7a8bc3504ae153) [#2044](https://github.com/itoa-vn/itoapull/2044) Thanks [@Vultraz](https://github.com/Vultraz)! - Disabled GraphiQL playground in production mode.

- [`ee6fbcb2`](https://github.com/itoa-vn/itoacommit/ee6fbcb264a640f58332c50a2f502a4380c0d071) [#2047](https://github.com/itoa-vn/itoapull/2047) Thanks [@Vultraz](https://github.com/Vultraz)! - Cleaned up duplicate code in aux list creation.
- Updated dependencies [[`267dab2f`](https://github.com/itoa-vn/itoacommit/267dab2fee5bbea711c417c13366862e8e0ab3be), [`8188d76c`](https://github.com/itoa-vn/itoacommit/8188d76cb3f5d3e112ef95fd4e1887db9a520d9d), [`af1e9e4d`](https://github.com/itoa-vn/itoacommit/af1e9e4d3b74753b903b20641b51df99184793df), [`946a52fd`](https://github.com/itoa-vn/itoacommit/946a52fd7057bb73f4ffd465ef51498172926866), [`1f4dc33d`](https://github.com/itoa-vn/itoacommit/1f4dc33d8a5ac4e38427eb215a7a8bc3504ae153), [`ee6fbcb2`](https://github.com/itoa-vn/itoacommit/ee6fbcb264a640f58332c50a2f502a4380c0d071), [`0145f7e2`](https://github.com/itoa-vn/itoacommit/0145f7e21d9297e3037c709587eb3b4220ba3f01), [`95372949`](https://github.com/itoa-vn/itoacommit/953729498fd0c7f68c82f6d4e438808777887d36), [`2cc83b12`](https://github.com/itoa-vn/itoacommit/2cc83b12be757019ba25658139478e8f5b2b19c6), [`a1dcbd7b`](https://github.com/itoa-vn/itoacommit/a1dcbd7bd7448fdcacbfe9fb0196bfee3c4a5326), [`6a348b93`](https://github.com/itoa-vn/itoacommit/6a348b93607c305c4ba61c1406a4acd508f33f64)]:
  - @itoa/fields@6.0.0
  - @itoa/build-field-types@5.1.2
  - @itoa/app-graphql@5.0.1

## 5.2.1

### Patch Changes

- [`697082cc`](https://github.com/itoa-vn/itoacommit/697082cc9e21ea9792e005a858432a6d81b1eb3a) [#1946](https://github.com/itoa-vn/itoapull/1946) Thanks [@timleslie](https://github.com/timleslie)! - Updated the documentation to clarify the difference between `appVersion.addVersionToHttpHeaders` and `appVersion.access`.
- Updated dependencies [[`1a723a54`](https://github.com/itoa-vn/itoacommit/1a723a544a918457a9de241a8387f2ce5b555e50), [`ddfc7845`](https://github.com/itoa-vn/itoacommit/ddfc7845399e5108f7fd68169153983122554e96), [`946eb315`](https://github.com/itoa-vn/itoacommit/946eb3157a1cc4946fe9e2c2b1101edf4918ab86), [`ddbf1063`](https://github.com/itoa-vn/itoacommit/ddbf10630530c7c7c9e388c6b047b2cbac96dab9)]:
  - @itoa/fields@5.2.0
  - @itoa/build-field-types@5.1.1

## 5.2.0

### Minor Changes

- [`9ffa8a73`](https://github.com/itoa-vn/itoacommit/9ffa8a734c91dd6de2a31898629e1ba7feaee832) [#1931](https://github.com/itoa-vn/itoapull/1931) Thanks [@timleslie](https://github.com/timleslie)! - Added an `appVersion` parameter to the `Itoa()` constructor. This version will be set as the `X-Itoa-App-Version` HTTP header on all requests. It can be queried via the GraphQL API as `{ appVersion }`. See the docs for more configuration details.

### Patch Changes

- Updated dependencies [[`a1e26deb`](https://github.com/itoa-vn/itoacommit/a1e26deb45d8c53e5d18b06c6573f66c4375b68c)]:
  - @itoa/build-field-types@5.1.0

## 5.1.1

### Patch Changes

- [`45fd7ab8`](https://github.com/itoa-vn/itoacommit/45fd7ab899655364d0071c0d276d188378944ff5) [#1894](https://github.com/itoa-vn/itoapull/1894) Thanks [@Vultraz](https://github.com/Vultraz)! - Removed duplicate password auth implementation as it's in its own package now.

* [`b0756c65`](https://github.com/itoa-vn/itoacommit/b0756c65525625919c72364d8cefc32d864c7c0e) [#1873](https://github.com/itoa-vn/itoapull/1873) Thanks [@timleslie](https://github.com/timleslie)! - Fixed a bug (#1864) where `this.cacheHint` was used before being set.

- [`d132a3c6`](https://github.com/itoa-vn/itoacommit/d132a3c64aec707b98ed9a9ceffee44a98749b0a) [#1883](https://github.com/itoa-vn/itoapull/1883) Thanks [@Vultraz](https://github.com/Vultraz)! - Added output which indicates where app is running when running the create itoa script.
- Updated dependencies [[`8735393e`](https://github.com/itoa-vn/itoacommit/8735393ec7b01dd0491700244e915b4b47c1cc53), [`8226eb47`](https://github.com/itoa-vn/itoacommit/8226eb4709ea8ad5773c900eaaa96068d3cb6bad), [`8226eb47`](https://github.com/itoa-vn/itoacommit/8226eb4709ea8ad5773c900eaaa96068d3cb6bad), [`20632bca`](https://github.com/itoa-vn/itoacommit/20632bca495058f2845d36fe95650eede0a9ebdc), [`3138013c`](https://github.com/itoa-vn/itoacommit/3138013c49205bd7f9b05833ae6158ebeb281dc0), [`5595e4c4`](https://github.com/itoa-vn/itoacommit/5595e4c45c618fa7e13a3d91e3ea3892b4f10475)]:
  - @itoa/build-field-types@5.0.1
  - @itoa/fields@5.1.0

## 5.1.0

### Minor Changes

- [`9f6bcddd`](https://github.com/itoa-vn/itoacommit/9f6bcddd84cc1d60f139ca116e9006258e417469) [#1851](https://github.com/itoa-vn/itoapull/1851) Thanks [@jesstelford](https://github.com/jesstelford)! - Added runtime database version validation

### Patch Changes

- Updated dependencies [[`9f6bcddd`](https://github.com/itoa-vn/itoacommit/9f6bcddd84cc1d60f139ca116e9006258e417469), [`ebbcad70`](https://github.com/itoa-vn/itoacommit/ebbcad7042596a9c83c32c8e08dad50f9fcb59fd), [`31b646ac`](https://github.com/itoa-vn/itoacommit/31b646ac3c06b82e809f5e55e8443ae5d21dac0f)]:
  - @itoa/utils@5.1.0
  - @itoa/fields@5.0.2

## 5.0.0

### Major Changes

- [`7b4ed362`](https://github.com/itoa-vn/itoacommit/7b4ed3623f5774d7783c39962bfa1ce97938e310) [#1821](https://github.com/itoa-vn/itoapull/1821) Thanks [@jesstelford](https://github.com/jesstelford)! - Release @itoa/\* packages (つ＾ ◡ ＾)つ

  - This is the first release of `@itoa/*` packages (previously `@itoa-alpha/*`).
  - All packages in the `@itoa-alpha` namespace are now available in the `@itoa` namespace, starting at version `5.0.0`.
  - To upgrade your project you must update any `@itoa-alpha/*` dependencies in `package.json` to point to `"@itoa/*": "^5.0.0"` and update any `require`/`import` statements in your code.

### Patch Changes

- Updated dependencies [[`7b4ed362`](https://github.com/itoa-vn/itoacommit/7b4ed3623f5774d7783c39962bfa1ce97938e310)]:
  - @itoa/access-control@5.0.0
  - @itoa/app-graphql@5.0.0
  - @itoa/build-field-types@5.0.0
  - @itoa/fields@5.0.0
  - @itoa/logger@5.0.0
  - @itoa/session@5.0.0
  - @itoa/utils@5.0.0

# @itoa-alpha/itoa

## 16.1.0

### Minor Changes

- [`3bc02545`](https://github.com/itoa-vn/itoacommit/3bc025452fb8e6e69790bdbee032ddfdeeb7dabb) [#1803](https://github.com/itoa-vn/itoapull/1803) Thanks [@Vultraz](https://github.com/Vultraz)! - Disallow leading underscores in list and field names

* [`a48281ba`](https://github.com/itoa-vn/itoacommit/a48281ba605bf5bebc89fcbb36d3e69c17182eec) [#1783](https://github.com/itoa-vn/itoapull/1783) Thanks [@timleslie](https://github.com/timleslie)! - The `itoa` cli now accepts a return of `{ itoa, apps, configureExpress }` from the entry file. `configureExpress` will be called on the Express app before applying the itoa middlewares.

### Patch Changes

- [`0a36b0f4`](https://github.com/itoa-vn/itoacommit/0a36b0f403da73a76106b5e14940a789466b4f94) [#1784](https://github.com/itoa-vn/itoapull/1784) Thanks [@Vultraz](https://github.com/Vultraz)! - Removed adapterConnectOptions key (unused as of 144e6e86)

* [`effc1f63`](https://github.com/itoa-vn/itoacommit/effc1f639d5824720b7a9d82c2ee881d77acb901) [#1789](https://github.com/itoa-vn/itoapull/1789) Thanks [@timleslie](https://github.com/timleslie)! - `Relationship.convertResolvedOperationsToFieldValue()` has been removed.

* Updated dependencies [[`7129c887`](https://github.com/itoa-vn/itoacommit/7129c8878a825d961f2772be497dcd5bd6b2b697), [`effc1f63`](https://github.com/itoa-vn/itoacommit/effc1f639d5824720b7a9d82c2ee881d77acb901)]:
  - @itoa-alpha/app-graphql@8.2.1
  - @itoa-alpha/fields@15.0.0

## 16.0.1

### Patch Changes

- [`b0aee895`](https://github.com/itoa-vn/itoacommit/b0aee895f664cf5665fa700e68ffc532c35f424d) [#1776](https://github.com/itoa-vn/itoapull/1776) Thanks [@jesstelford](https://github.com/jesstelford)! - Avoid the build command from hanging when an entry file may have a long-running process.

## 16.0.0

### Major Changes

- [`6d7d0df0`](https://github.com/itoa-vn/itoacommit/6d7d0df0515c3aa21c7d24db17919ddbb5701ce9) [#1729](https://github.com/itoa-vn/itoapull/1729) Thanks [@timleslie](https://github.com/timleslie)! - This change significantly changes how and when we populate `many`-relationships during queries and mutations.
  The behaviour of the GraphQL API has not changed, but queries should be more performant, particularly for items with many related items.
  The `existingItem` parameter in hooks will no longer have the `many`-relationship fields populated.
  `List.listQuery()` no longer populates `many` relationship fields.
  For most users there should not need to be any changes to code unless they are explicitly relying on a `many`-relationship field in a hook, in which case they will need to execute an explicit query to obtain the desired values.

### Patch Changes

- Updated dependencies [[`6d7d0df0`](https://github.com/itoa-vn/itoacommit/6d7d0df0515c3aa21c7d24db17919ddbb5701ce9)]:
  - @itoa-alpha/fields@14.0.0

## 15.4.1

### Patch Changes

- [14fee364](https://github.com/itoa-vn/itoacommit/14fee364): Correctly pass `gqlName` for all access checks

## 15.4.0

### Minor Changes

- [b12e4ccb](https://github.com/itoa-vn/itoacommit/b12e4ccb): Add a global maxTotalResults limit to Itoa object
- [1405eb07](https://github.com/itoa-vn/itoacommit/1405eb07): Add `listKey`, `fieldKey` (fields only), `operation`, `gqlName`, `itemId` and `itemIds` as arguments to imperative access control functions.

### Patch Changes

- [3a52447d](https://github.com/itoa-vn/itoacommit/3a52447d): Update `getAccessControlledItem()` to remove short-circuit code which code lead to future data inconsistency.
- [65d32b54](https://github.com/itoa-vn/itoacommit/65d32b54): Fix session storage

## 15.3.1

### Patch Changes

- [b2c5277e](https://github.com/itoa-vn/itoacommit/b2c5277e): Use compose() function from utils package.

- Updated dependencies [4e6a574d](https://github.com/itoa-vn/itoacommit/4e6a574d):
  - @itoa-alpha/fields@13.0.0

## 15.3.0

### Minor Changes

- [552e6fb6](https://github.com/itoa-vn/itoacommit/552e6fb6): Add support for schema cache hints

### Patch Changes

- [9b532072](https://github.com/itoa-vn/itoacommit/9b532072): Rename Itoa to ItoaJS in docs where possible in docs

## 15.2.1

### Patch Changes

- [d218cd55](https://github.com/itoa-vn/itoacommit/d218cd55): Make executeQuery() backwards compatible with old, single-schema KS

## 15.2.0

### Minor Changes

- [b9e2c45b](https://github.com/itoa-vn/itoacommit/b9e2c45b): Add support for query validation

## 15.1.2

### Patch Changes

- [258424d7](https://github.com/itoa-vn/itoacommit/258424d7): Correctly pass `originalInput` argument through to `beforeChange()` and `afterChange()` hooks.

## 15.1.1

### Patch Changes

- [bb3b389b](https://github.com/itoa-vn/itoacommit/bb3b389b): Correctly apply access control to gqlAuxFieldResolvers()

## 15.1.0

### Minor Changes

- [f56ffdfd](https://github.com/itoa-vn/itoacommit/f56ffdfd): Apply access control to auxiliary lists

### Patch Changes

- [42a45bbd](https://github.com/itoa-vn/itoacommit/42a45bbd): Remove hard-coded paths from app build process

## 15.0.0

### Major Changes

- [b61289b4](https://github.com/itoa-vn/itoacommit/b61289b4): Allow passing `{ access: ...}` when calling `itoa.extendGraphQLSchema()`. The `types` argument is now a list of objects of the form `{ access: ..., type: ...}`, rather than a list of strings.
- [0bba9f07](https://github.com/itoa-vn/itoacommit/0bba9f07): Check access control on custom queries/mutations before executing custom resolvers.
- [9ade2b2d](https://github.com/itoa-vn/itoacommit/9ade2b2d): Add support for `access: { auth: ... }` which controls whether authentication queries and mutations are accessible on a List

  If you have a `List` which is being used as the target of an Authentication Strategy, you should set `access: { auth: true }` on that list.

### Patch Changes

- [857386db](https://github.com/itoa-vn/itoacommit/857386db): Fix bug where a schema with no mutations would fail at schema generation time
- [d253220f](https://github.com/itoa-vn/itoacommit/d253220f): Updates the arg package that resolves a possible bug with connection strings in the CLI
- [9498c690](https://github.com/itoa-vn/itoacommit/9498c690): Fix meta queries with maxResults limits

## 14.0.0

### Major Changes

- [decf7319](https://github.com/itoa-vn/itoacommit/decf7319): Remove `skipAccessControl` option from `itoa.getTypeDefs()`, `List.getGqlTypes()`, `List.getGqlQueries()`, and `List.getGqlMutations()`.
- [89c0d7e9](https://github.com/itoa-vn/itoacommit/89c0d7e9): The `.access` property of Lists is now keyed by `schemaName`. As such, a number of getters and methods have been replaced with methods which take `{ schemaName }`.

  - `getGqlTypes()` -> `getGqlTypes({ schemaName })`
  - `getGqlQueries()` -> `getGqlQueries({ schemaName })`
  - `get gqlFieldResolvers()` -> `gqlFieldResolvers({ schemaName })`
  - `get gqlAuxFieldResolvers()` -> `gqlAuxFieldResolvers({ schemaName })`
  - `get gqlAuxQueryResolvers()` -> `gqlAuxQueryResolvers({ schemaName })`
  - `get gqlAuxMutationResolvers()` -> `gqlAuxMutationResolvers({ schemaName })`
  - `getGqlMutations()` -> `getGqlMutations({ schemaName })`
  - `get gqlQueryResolvers()` -> `gqlQueryResolvers({ schemaName })`
  - `get gqlMutationResolvers()` -> `gqlMutationResolvers({ schemaName })`

- [a8e9378d](https://github.com/itoa-vn/itoacommit/a8e9378d): `Itoa`, `List` and `Field` constructors now take `schemaNames` as config options. A number of methods also now take `schemaName` parameters.
  - `itoa.getTypeDefs()` -> `itoa.getTypeDefs({ schemaName })`
  - `itoa.getAdminSchema()` -> `itoa.getAdminSchema({ schemaName })`
  - `itoa.dumpSchema(file)` -> `itoa.dumpSchema(file, schemaName)`
  - `itoa.getAdminMeta()` -> `itoa.getAdminMeta({ schemaName })`
  - `list.getAdminMeta()` -> `list.getAdminMeta({ schemaName })`
  - `field.getAdminMeta()` -> `field.getAdminMeta({ schemaName })`

### Minor Changes

- [0a627ef9](https://github.com/itoa-vn/itoacommit/0a627ef9): Adds a `cookieMaxAge` and `secureCookies` option to the itoa constructor.

  These will default to 30 days for `cookieMaxAge` and `true` in production `false` in other environments for `secureCookies`.

  ### Usage

  ```javascript
  const itoa = new Itoa({
    cookieMaxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secureCookies: true,
  });
  ```

  Note: `commonSessionMiddleware` now accepts a config object rather than multiple arguments.

- [f8ad0975](https://github.com/itoa-vn/itoacommit/f8ad0975): The `cors` and `pinoOptions` parameters now live on `itoa.prepare()` rather than `new GraphQLApp()`

### Patch Changes

- [bc0b9813](https://github.com/itoa-vn/itoacommit/bc0b9813): `parseListAccess` and `parseFieldAccess` now take `schemaNames` as an argument, and return a nested access object, with the `schemaNames` as keys.

  For example,

  ```js
  parseListAccess({ defaultAccess: false, access: { public: true }, schemaNames: ['public', 'private'] }
  ```

  will return

  ```js
  {
    public: { create: true, read: true, update: true, delete: true },
    private: { create: false, read: false, update: false, delete: false },
  }
  ```

  These changes are backwards compatible with regard to the `access` argument, so

  ```js
  const access = { create: true, read: true, update: true, delete: true };
  parseListAccess({ access, schemaNames: ['public', 'private'] }
  ```

  will return

  ```js
  {
    public: { create: true, read: true, update: true, delete: true },
    private: { create: true, read: true, update: true, delete: true },
  }
  ```

- [76c3efa9](https://github.com/itoa-vn/itoacommit/76c3efa9): `itoa.getGraphQlContext()` no longer provides a default value for `schemaName`.

- Updated dependencies [89c0d7e9](https://github.com/itoa-vn/itoacommit/89c0d7e9):
  - @itoa-alpha/fields@11.0.0

## 13.1.0

### Minor Changes

- [63350996](https://github.com/itoa-vn/itoacommit/63350996): Add queryLimits and maxResults to List API

## 13.0.0

### Major Changes

- [8d0d98c7](https://github.com/itoa-vn/itoacommit/8d0d98c7): `cookieSecret` and `sessionStore` config options are now passed to the `Itoa` constructor instead of the individual auth or graphql packages.

### Minor Changes

- [8bb1bb0e](https://github.com/itoa-vn/itoacommit/8bb1bb0e): Add a `itoa.executeQuery()` method to run GraphQL queries and mutations directly against a Itoa instance. NOTE: These queries are executed without any Access Control checks by default.

## 12.0.1

### Patch Changes

- [1a20fd27](https://github.com/itoa-vn/itoacommit/1a20fd27): Fix bug with custom query/mutation resolvers

## 12.0.0

### Major Changes

- [33001656](https://github.com/itoa-vn/itoacommit/33001656): \* Added `itoa.extendGraphQLSchema()` as the interface for custom mutations and queries.

  ```javascript
  itoa.extendGraphQLSchema({
    types: ['type Foo { foo: Int }', ...],
    queries: [{ schema: '...', resolver: () => {} }, ...],
    mutations: [{ schema: '...', resolver: () => {} }, ...],
  });
  ```

  - `new List()` and `itoa.createList()` no longer accept `queries` or `mutations` options! Please use `extendGraphQLSchema()` instead.

## 11.0.0

### Major Changes

- [e42fdb4a](https://github.com/itoa-vn/itoacommit/e42fdb4a): Makes the password auth strategy its own package.
  Previously: `const { Itoa, PasswordAuthStrategy } = require('@itoa-alpha/itoa');`
  After change: `const { PasswordAuthStrategy } = require('@itoa-alpha/auth-password');`

## 10.5.0

### Minor Changes

- [b86f0e26](https://github.com/itoa-vn/itoacommit/b86f0e26): Renames the package `@itoa-alpha/passport-auth` to `@itoa-alpha/auth-passport`. Anyone using `passport-auth` should switch over to the new package - the old one will no longer be receiving updates.

## 10.4.0

### Minor Changes

- [d3238352](https://github.com/itoa-vn/itoacommit/d3238352): Implemented custom queries in the same format as custom mutations.

## 10.3.0

### Minor Changes

- [759a3c17](https://github.com/itoa-vn/itoacommit/759a3c17): Add a `types` property to custom mutations.

## 10.2.0

### Minor Changes

- [e5d4ee76](https://github.com/itoa-vn/itoacommit/e5d4ee76): Expose 'originalInput' to access control functions for lists & fields

## 10.1.0

### Minor Changes

- [36616092](https://github.com/itoa-vn/itoacommit/36616092): Added `plugins` option to the config of `createList`

## 10.0.0

### Major Changes

- [144e6e86](https://github.com/itoa-vn/itoacommit/144e6e86): - API Changes to Adapters: - Configs are now passed directly to the adapters rather than via `adapterConnectOptions`. - Default connections strings changed for both Knex and Mongoose adapters to be more inline with system defaults. - `itoa.connect()` no longer accepts a `to` paramter - the connection options must be passed to the adapter constructor (as above).

### Minor Changes

- [e049cfcb](https://github.com/itoa-vn/itoacommit/e049cfcb): Support defaultValue as a function at mutation execution time

## 9.1.0

### Minor Changes

- [d7819a55](https://github.com/itoa-vn/itoacommit/d7819a55): Run .resolveInput() on all fields/field hooks regardless of if data has been passed as part of the mutation. This enables .resolveInput() to be run on fields without data during an update mutation.

## 9.0.0

### Major Changes

- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Adding isIndexed field config and support for in most field types

### Minor Changes

- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Check for the number type in label resolver to prevent false positive on zero.
- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Switching lists to use standard field types for primary keys (instead of weird pseudo-field)

### Patch Changes

- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Upgrade prettier to 1.18.2
- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Ensure resolveInput for list receives result from fields
- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Upgrade graphql to 14.4.2
- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Upgrade promise utility dependencies
- [42c3fbc9](https://github.com/itoa-vn/itoacommit/42c3fbc9): Upgrade express to 4.17.1

## 8.0.0

### Major Changes

- [4007f5dd](https://github.com/itoa-vn/itoacommit/4007f5dd):

  Adding field instance to the BaseFieldAdapter constructor arguments

### Patch Changes

- [18064167](https://github.com/itoa-vn/itoacommit/18064167):

  Adding `knexOptions` to the KnexFieldAdapter to support DB-level config for nullability (`isNotNullable`) and defaults (`defaultTo`)

## 7.0.3

### Patch Changes

- [2b094b7f](https://github.com/itoa-vn/itoacommit/2b094b7f):

  Refactoring the knex adapter (and field adapters) to give the field type more control of the table schema (add 0 or multiple columns, etc)

## 7.0.2

### Patch Changes

- [04371d0d](https://github.com/itoa-vn/itoacommit/04371d0d):

  Don't error when Auth Strategy doesn't provide getInputFragment() or validate() method.

* Updated dependencies [b6a9f6b9](https://github.com/itoa-vn/itoacommit/b6a9f6b9):
  - @itoa-alpha/fields@8.0.0

## 7.0.1

### Patch Changes

- [de9e709d](https://github.com/itoa-vn/itoacommit/de9e709d):

  Convert GraphQL SDL to AST before passing to Apollo

  Apollo released a breaking change in a semver-minor which causes it to
  stop understanding the SDL (string) GraphQL typeDefs we were passing it.
  This fix ensures we're converting to an AST to avoid the error being
  thrown.

  See https://github.com/itoa-vn/itoaissues/1340

## 7.0.0

### Major Changes

- [91fffa1e](https://github.com/itoa-vn/itoacommit/91fffa1e):

  Gather views from fields via the renamed method `#extendAdminViews()` (was `#extendViews()`)

### Patch Changes

- [91fffa1e](https://github.com/itoa-vn/itoacommit/91fffa1e):

  Correctly read `--connect-to` option on the CLI

## 6.0.0

### Major Changes

- [1b4cf4e0](https://github.com/itoa-vn/itoacommit/1b4cf4e0):

  - `PasswordAuthStrategy#validate()` now accepts an object of `{ [identityField], [secretField] }` (was `{ identity, secret }`).
  - Auth Strategies can now add AdminMeta via a `#getAdminMeta()` method which will be attached to the `authStrategy` key of `adminMeta` in the Admin UI.
  - Added (un)authentication GraphQL mutations:
    - ```graphql
      mutation {
        authenticate<List>With<Strategy>(<strategy-args) {
          token # Add this token as a header: { Authorization: 'Bearer <token>' }
          item # The authenticated item from <List>
        }
      }
      ```
      For the `PasswordAuthStrategy`, that is:
      ```javascript
      const authStrategy = itoa.createAuthStrategy({
        type: PasswordAuthStrategy,
        list: 'User',
        config: {
          identityField: 'username',
          secretField: 'pass',
        },
      });
      ```
      ```graphql
      mutation {
        authenticateUserWithPassword(username: "jesstelford", pass: "abc123") {
          token
          item {
            username
          }
        }
      }
      ```
    - ```graphql
      mutation {
        unauthenticate<List> {
          success
        }
      }
      ```

### Patch Changes

- [3958a9c7](https://github.com/itoa-vn/itoacommit/3958a9c7):

  Fields configured with isRequired now behave as expected on create and update, returning a validation error if they are null.

- [19fe6c1b](https://github.com/itoa-vn/itoacommit/19fe6c1b):

  Move frontmatter in docs into comments

- [b69a2276](https://github.com/itoa-vn/itoacommit/b69a2276):

  Removed unnecessary port parameter from itoa.prepare calls

- [ec9e6e2a](https://github.com/itoa-vn/itoacommit/ec9e6e2a):

  Fixed behaviour of isRequired within update operations.

* Updated dependencies [30c1b1e1](https://github.com/itoa-vn/itoacommit/30c1b1e1):
* Updated dependencies [1b4cf4e0](https://github.com/itoa-vn/itoacommit/1b4cf4e0):
  - @itoa-alpha/fields@7.0.0
  - @itoa-alpha/app-graphql@6.1.0
  - @itoa-alpha/session@2.0.0

## 5.0.1

### Patch Changes

- [af3f31dd](https://github.com/itoa-vn/itoacommit/af3f31dd):

  Set the default build directory the CLI `itoa start` command

## 5.0.0

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

### Minor Changes

- [a8061c78](https://github.com/itoa-vn/itoacommit/a8061c78):

  Add support for setting PORT and CONNECT_TO environment variables

- [b2651279](https://github.com/itoa-vn/itoacommit/b2651279):

  Improved DX with loading indicators when using itoa CLI

- [a98bce08](https://github.com/itoa-vn/itoacommit/a98bce08):

  Add support for an `onConnect` function to be passed to the Itoa constructor, which is called when all adapters have connected.

### Patch Changes

- [ff7547c5](https://github.com/itoa-vn/itoacommit/ff7547c5):

  Capture early requests to the itoa server while still booting

* Updated dependencies [b2651279](https://github.com/itoa-vn/itoacommit/b2651279):
  - @itoa-alpha/app-graphql@6.0.0

## 4.0.0

### Major Changes

- [24cd26ee](https://github.com/itoa-vn/itoacommit/24cd26ee):

  - Remove `.config` property from `Itoa` and `List` classes

- [2ef2658f](https://github.com/itoa-vn/itoacommit/2ef2658f):

  - Moved Social Login Strategies into its own package `@itoa-alpha/passport-auth`.
  - Created base strategy `PassportAuthStrategy`. This enables quick addition of new Social Login Strategy based on PassportJs.
  - Refactored Twitter and Facebook to extend base `PassportAuthStrategy`.
  - Added Google and GitHub Auth Strategy by extending base `PassportAuthStrategy`.
  - Removed `passport` and related dependencies from `@itoa-alpha/itoa`.
  - `test-projects/facebook-login` project is renamed into `test-projects/social-login`
  - `social-login` project now support for social login with Twitter, Facebook, Google and GitHub inbuilt strategies from `@itoa-alpha/passport-auth` along with an example of how to implement your own PassportJs strategy for WordPress in `WordPressAuthStrategy.js`

- [ae5cf6cc](https://github.com/itoa-vn/itoacommit/ae5cf6cc):

  - List adapter config must now be specified within the `adapterConfig` field, rather than directly on the `config` object.

- [b22d6c16](https://github.com/itoa-vn/itoacommit/b22d6c16):

  Remove custom server execution from the CLI.

  The Itoa CLI does not execute custom servers anymore, instead of running `itoa` to start a Itoa instance that has a custom server, run the server file directly with `node`.

  ```diff
  - "start": "itoa",
  + "start": "node server.js"
  ```

### Minor Changes

- [6f598e83](https://github.com/itoa-vn/itoacommit/6f598e83):

  - Add `build` and `start` commands

- [6f598e83](https://github.com/itoa-vn/itoacommit/6f598e83):

  - Add Admin UI static building

### Patch Changes

- [211b71c1](https://github.com/itoa-vn/itoacommit/211b71c1):

  - Fix bug in resolver for createMany mutations

- [bd0ea21f](https://github.com/itoa-vn/itoacommit/bd0ea21f):

  - Add .isRequired and .isUnique properties to field adapters

- [81dc0be5](https://github.com/itoa-vn/itoacommit/81dc0be5):

  - Update dependencies

- [60181234](https://github.com/itoa-vn/itoacommit/60181234):

  Use `unique()` from `@itoa-alpha/utils`

- [9dbed649](https://github.com/itoa-vn/itoacommit/9dbed649):

  Use explicit field properties rather than field.config.

* Updated dependencies [e6e95173](https://github.com/itoa-vn/itoacommit/e6e95173):
* Updated dependencies [9dbed649](https://github.com/itoa-vn/itoacommit/9dbed649):
* Updated dependencies [119448fc](https://github.com/itoa-vn/itoacommit/119448fc):
* Updated dependencies [1a7b706c](https://github.com/itoa-vn/itoacommit/1a7b706c):
* Updated dependencies [1a7b706c](https://github.com/itoa-vn/itoacommit/1a7b706c):
* Updated dependencies [bd0ea21f](https://github.com/itoa-vn/itoacommit/bd0ea21f):
* Updated dependencies [119448fc](https://github.com/itoa-vn/itoacommit/119448fc):
* Updated dependencies [b7a2ea9c](https://github.com/itoa-vn/itoacommit/b7a2ea9c):
  - @itoa-alpha/fields@6.0.0
  - @itoa-alpha/build-field-types@1.0.0
  - @itoa-alpha/access-control@1.0.4
  - @itoa-alpha/utils@3.0.0

## 3.1.0

- [patch][5180d2fb](https://github.com/itoa-vn/itoacommit/5180d2fb):

  - Remove erroneous addition of CRUD operations for Auxiliary Lists from GraphQL API

- [minor][cbe80e61](https://github.com/itoa-vn/itoacommit/cbe80e61):

  - Expose GraphQL `context` object to hooks for advanced use cases.

- [patch][ec76b500](https://github.com/itoa-vn/itoacommit/ec76b500):

  - Don't exclude aux field resolvers from GraphQL schema

- Updated dependencies [85b74a2c](https://github.com/itoa-vn/itoacommit/85b74a2c):
  - @itoa-alpha/fields@5.0.0

## 3.0.0

- [patch][b4dcf44b](https://github.com/itoa-vn/itoacommit/b4dcf44b):

  - Use named exports from @itoa-alpha/itoa package.

- [patch][b69fb9b7](https://github.com/itoa-vn/itoacommit/b69fb9b7):

  - Update dev devependencies

- [patch][baff3c89](https://github.com/itoa-vn/itoacommit/baff3c89):

  - Use the updated logger API

- [patch][302930a4](https://github.com/itoa-vn/itoacommit/302930a4):

  - Minor internal code cleanups

- [major][656e90c2](https://github.com/itoa-vn/itoacommit/656e90c2):

  - `WebServer.start()` no longer takes any arguments. Developer must now explicitly call `itoa.connect()` before calling `WebServer.start()`.

- [major][b4dcf44b](https://github.com/itoa-vn/itoacommit/b4dcf44b):

  - Make all parts of the API available as named exports.

- Updated dependencies [baff3c89](https://github.com/itoa-vn/itoacommit/baff3c89):
- Updated dependencies [37dcee37](https://github.com/itoa-vn/itoacommit/37dcee37):
  - @itoa-alpha/logger@2.0.0
  - @itoa-alpha/fields@4.0.0

## 2.0.0

- [major][8d385ede](https://github.com/itoa-vn/itoacommit/8d385ede):

  - Remove itoa.getAuxQueryResolvers method

- [major][52f1c47b](https://github.com/itoa-vn/itoacommit/52f1c47b):

  - Replace `Itoa.registerGraphQLQueryMethod` with `Itoa.registerSchema`. Add `schemaName` parameter to `getAccessContext`. The `getGraphQLQuery` parameter to `List` now takes a `schemaName` argument. These changes allow us to register more than one ApolloServer instance in our Itoa system.

## 1.0.4

- Updated dependencies [98c02a46](https://github.com/itoa-vn/itoacommit/98c02a46):
  - @itoa-alpha/access-control@1.0.2
  - @itoa-alpha/fields@3.0.1
  - @itoa-alpha/utils@2.0.0

## 1.0.3

- Updated dependencies [9a9f214a](https://github.com/itoa-vn/itoacommit/9a9f214a):
- Updated dependencies [de616f7e](https://github.com/itoa-vn/itoacommit/de616f7e):
  - @itoa-alpha/fields@3.0.0
  - @itoa-alpha/core@2.0.0

## 1.0.2

- [patch][11c372fa](https://github.com/itoa-vn/itoacommit/11c372fa):

  - Update minor-level dependencies

- [patch][619b17c2](https://github.com/itoa-vn/itoacommit/619b17c2):

  - Reformat code using latest version of Prettier (1.16.4)

- [patch][7417ea3a](https://github.com/itoa-vn/itoacommit/7417ea3a):

  - Update patch-level dependencies

- Updated dependencies [dcb93771](https://github.com/itoa-vn/itoacommit/dcb93771):
  - @itoa-alpha/fields@2.0.0

## 1.0.1

- [patch][1f0bc236](https://github.com/itoa-vn/itoacommit/1f0bc236):

  - Update the package.json author field to "The Itoa Development Team"

- [patch][9534f98f](https://github.com/itoa-vn/itoacommit/9534f98f):

  - Add README.md to package

## 1.0.0

- [major] 8b6734ae:

  - This is the first release of itoa-alpha (previously voussoir).
    All packages in the `@voussoir` namespace are now available in the `@itoa-alpha` namespace, starting at version `1.0.0`.
    To upgrade your project you must update any `@voussoir/<foo>` dependencies in `package.json` to point to `@itoa-alpha/<foo>: "^1.0.0"` and update any `require`/`import` statements in your code.

# @voussoir/itoa

## 1.0.0

- [major] 6fa810f7:

  - Rename `@voussoir/core` -> `@voussoir/itoa`. This is to free up the
    `@voussoir/core` package for a different purpose, and make the main import for
    new Itoa projects be `@voussoir/itoa`. The exports have stayed the
    same.

- Updated dependencies [1db45262]:
  - @voussoir/fields@3.1.0
  - @voussoir/core@3.0.0

# @voussoir/core

## 2.1.0

- [minor] 64e6abcc:

  - Allow lists and fields to specify a schemaDoc field

- [minor] 7a4950bf:

  - Allow mutations: [{ schema: ..., resolver: ...}] to be specified in createList

## 2.0.0

- [minor] 5f891cff:

  - Add a setupHooks method to BaseFieldAdapter

- [minor] aca26f71:

  - Expose access to GraphQL query method within hooks

- [minor] 6471fc4a:

  - Add fieldAdaptersByPath object to field adapters

- [patch] 797dc862:

  - Move itemsQueryMeta onto the base adapter class

- [patch] 266b5733:

  - Don't try to resolve nested mutations which will be later backfilled

- [major] 48773907:

  - Move findFieldAdapterForQuerySegment onto the BaseListAdapter

- [minor] f37a8086:

  - Can now dump the GraphQL schema with itoa.dumpSchema(filePath)

- [patch] e6e3ea06:

  - Explicitly check whether field types are supported by the adapter

- [major] 860c3b80:

  - Add a postConnect method to list adapters to capture all the work which needs to be done after the database has been connected to

- Updated dependencies [723371a0]:
- Updated dependencies [53e27d75]:
- Updated dependencies [5f8043b5]:
- Updated dependencies [a3d5454d]:
  - @voussoir/access-control@0.4.1
  - @voussoir/fields@3.0.0
  - @voussoir/utils@1.0.0

## 1.1.0

- [patch] 8d8666ad:

  - Dependency upgrade: graphql -> 14.0.3, graphql-tools -> 4.0.3

- [minor] 6d8ce0fc:

  - Add createMany and updateMany mutations

## 1.0.0

- [patch] a95e0c69:

  - Report correct gqlName when reporting errors in deleteMutation

- [patch] 21626b66:

  - preSave/postRead item hooks run consistently

- [patch] 84b62eaa:

  - Decouple access of items in the database from operations of them provide room for pre/post hooks

- [patch] cd885800:

  - Update the field hooks API to use the officially sanctioned hook names.

- [patch] c6fff24c:

  - Call field hooks when deleting many items at once.

- [major] c83c9ed5:

  - Add Itoa.getAccessContext and remove List.getAccessControl, List.getFieldAccessControl, and Field.validateAccessControl.

- [patch] ffc98ac4:

  - Rename the access control function parameter `item` to `existingItem`

- [minor] c3ebd9e6:

  - Update resolver code to make all list access checks explicit

- [minor] ebae2d6f:

  - Minor tweaks to the graphQL schema behaviour

- [major] 78fd9555:

  - Field configuration now tasks isRequired and isUnique, rather than required and unique

- [patch] 3801e040:

  - Separate out the pre-hooks for resolving relationship fields from the field.resolveInput hooks

- [major] d22820b1:

  - Rename itoa.session to itoa.sessionManager
    - Rename itoa.session.validate to itoa.sessionManager.populateAuthedItemMiddleware
    - Rename itoa.session.create to itoa.sessionManager.startAuthedSession
    - Rename itoa.session.destroy to itoa.sessionManager.endAuthedSession

- Updated dependencies [01718870]:
  - @voussoir/fields@2.0.0

## 0.7.0

- [patch] d1777cc1:

  - Consolidate logging and error handling mechanisms within core/List/index.js

- [minor] 45d4c379:

  - Update the functional API for Itoa List objects for consistency

- [patch] 9c383fe8:

  - Always use \$set and { new: true } in the mongoose adapter update() method

- Updated dependencies [3ae588b7]:
  - @voussoir/access-control@0.3.0
  - @voussoir/fields@1.4.0

## 0.6.0

- [minor] d94b517:

  Add \_ksListsMeta query to gather type and relationship information

- [minor] a3b995c:

  Add \_ksListsMeta query to gather type and relationship information

- [patch] ca7ce46:

  Correctly hide fields from Relationships when not readable

## 0.5.0

- [minor] d94b517:

  Add \_ksListsMeta query to gather type and relationship information

- [minor] a3b995c:

  Add \_ksListsMeta query to gather type and relationship information

- [patch] ca7ce46:

  Correctly hide fields from Relationships when not readable

- [minor] 47c7dcf6"
  :

  - Bump all packages with a minor version to set a new baseline

## 0.4.0

- [minor] d94b517:

  Add \_ksListsMeta query to gather type and relationship information

- [minor] a3b995c:

  Add \_ksListsMeta query to gather type and relationship information

- [patch] ca7ce46:

  Correctly hide fields from Relationships when not readable

## 0.3.0

- [patch] Bump all packages for Babel config fixes [d51c833](d51c833)
- [minor] Support unique field constraint for mongoose adapter [750a83e](750a83e)
- [patch] Surface errors that occur at the adapter level during a create mutation. [81641b2](81641b2)
- [patch] Updated dependencies [445b699](445b699)
- [patch] Updated dependencies [9c75136](9c75136)
  - @voussoir/fields@1.0.0
  - @voussoir/access-control@0.1.3
  - @voussoir/utils@0.2.0

## 0.2.0

- [minor] Add missing dependencies for which the mono-repo was hiding that they were missing [fed0cdc](fed0cdc)

## 0.1.2

- [patch] Rename readme files [a8b995e](a8b995e)

## 0.1.1

- [patch] Remove tests and markdown from npm [dc3ee7d](dc3ee7d)

# @itoa/core

# @itoa-alpha/core

## 2.0.4

- Updated dependencies [b7a2ea9c](https://github.com/itoa-vn/itoacommit/b7a2ea9c):
  - @itoa-alpha/server@5.0.0

## 2.0.3

- [patch][b69fb9b7](https://github.com/itoa-vn/itoacommit/b69fb9b7):

  - Update dev devependencies

- [patch][78d25c40](https://github.com/itoa-vn/itoacommit/78d25c40):

  - Restructure internal code

- Updated dependencies [656e90c2](https://github.com/itoa-vn/itoacommit/656e90c2):
  - @itoa-alpha/server@4.0.0

## 2.0.2

- Updated dependencies [5ebf4c3a](https://github.com/itoa-vn/itoacommit/5ebf4c3a):
  - @itoa-alpha/server@3.0.0

## 2.0.1

- [patch][5ddb2ed6](https://github.com/itoa-vn/itoacommit/5ddb2ed6):

  - Always display clickable links when starting a server in dev mode

## 2.0.0

- [major][de616f7e](https://github.com/itoa-vn/itoacommit/de616f7e):

  - Update authStrategy APIs
    - Removes `authStrategy` from the `config` API of `Webserver`.
    - Removes `authStrategy` from the `serverConfig` of the core `itoa` system builder.
    - Removes the `setAuthStrategy` method from `AdminUI`.
    - Adds `authStrategy` to the `config` API of `AdminUI`.
    - `Webserver` checks `itoa.auth` to determine whether to set up auth session middlewares.

## 1.0.1

- [patch][1f0bc236](https://github.com/itoa-vn/itoacommit/1f0bc236):

  - Update the package.json author field to "The Itoa Development Team"

- [patch][9534f98f](https://github.com/itoa-vn/itoacommit/9534f98f):

  - Add README.md to package

## 1.0.0

- [major] 8b6734ae:

  - This is the first release of itoa-alpha (previously voussoir).
    All packages in the `@voussoir` namespace are now available in the `@itoa-alpha` namespace, starting at version `1.0.0`.
    To upgrade your project you must update any `@voussoir/<foo>` dependencies in `package.json` to point to `@itoa-alpha/<foo>: "^1.0.0"` and update any `require`/`import` statements in your code.

# @voussoir/core

## 3.0.0

- [patch] 113e16d4:

  - Remove unused dependencies

- [major] 1db45262:

  - Use the `@voussoir/core` package as the entry point for custom servers.

    **Migration Guide**

      <!-- prettier-ignore -->

    1. Ensure your main entry point is `index.js`
    1. Add the new itoa module: `yarn add @voussoir/itoa`
    1. Remove the old itoa module: `yarn remove @voussoir/core`
    1. Update your imports:
       ```diff
       - const { Itoa } = require('@voussoir/core');
       + const { Itoa } = require('@voussoir/itoa');
       ```
    1. Update your `package.json` to start Itoa like so:
       ```json
       {
         "scripts": {
           "start": "itoa"
         }
       }
       ```
    1. Export your `itoa` and (optional) `admin` instances from `index.js`:
       ```javascript
       const itoa = new Itoa(/* .. */);
       const admin = new AdminUI(/* .. */);
       /* .. */
       module.exports = {
         itoa,
         admin,
       };
       ```
    1. Remove any usage of `@voussoir/server` / instantiations of `new WebServer()`
    1. If using an auth strategy, export it:
       ```javascript
       const authStrategy = itoa.createAuthStrategy(/* .. */);
       /* .. */
       module.exports = {
         itoa,
         admin,
         serverConfig: {
           authStrategy,
         },
       };
       ```
    1. If using any custom routes / modifying `server.app` in any way you'll need a
       _Custom Server_:

       1. Create a `server.js` along side your `index.js`
       1. Add the new core package: `yarn add @voussoir/core`
       1. Start with this boilerplate custom server in `server.js`:

          ```javascript
          const itoaServer = require('@voussoir/core');

          itoaServer
            .prepare({ port: 3000 })
            .then(({ server, itoa }) => {
              // [*] Custom routes get attached to `server.app` here.
              // If needed, you can access your Itoa instance via `itoa`.

              return server.start();
            })
            .then(({ port }) => {
              console.log(`Listening on port ${port}`);
            })
            .catch(error => {
              console.error(error);
            });
          ```

       1. Put your custom routes, etc, at the `[*]` marker in `server.js`.

    1. Run `yarn start`
