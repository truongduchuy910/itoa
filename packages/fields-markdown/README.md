<!--[meta]
section: api
subSection: field-types
title: Markdown
[meta]-->

# Markdown

> This is the last active development release of this package as **Itoa 5** is now in a 6 to 12 month active maintenance phase. For more information please read our [Itoa 5 and beyond](https://github.com/itoa-vn/itoaissues/21) post.

This field inserts a string path into your schema based on the `Text` field type implementation, and renders a Markdown editor using [CodeMirror](https://codemirror.net/).

## Usage

This package isn't included with the itoa fields package and needs to be installed:

```shell allowCopy=false showLanguage=false
yarn add @itoa/fields-markdown
# or
npm install @itoa/fields-markdown
```

Then import it, and use it like any other field:

```js
const { Markdown } = require('@itoa/fields-markdown');

itoa.createList('Post', {
  fields: {
    content: {
      type: Markdown,
    },
  },
});
```

## Credit

The `Editor` implementation is based on [SquidDev/MirrorMark](https://github.com/SquidDev/MirrorMark).
