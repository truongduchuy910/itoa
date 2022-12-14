<!--[meta]
section: api
subSection: field-types
title: Color
[meta]-->

# Color

> This is the last active development release of this package as **Itoa 5** is now in a 6 to 12 month active maintenance phase. For more information please read our [Itoa 5 and beyond](https://github.com/itoa-vn/itoaissues/21) post.

Stores hexadecimal RGBA (Red, Green, Blue, Alpha) color values.
Presented in the Admin UI as an interactive color picker.

## Usage

```js
const { Color } = require('@itoa/fields-color');

itoa.createList('Product', {
  fields: {
    heroColor: { type: Color },
  },
});
```

## Config

| Option       | Type      | Default | Description                                                     |
| ------------ | --------- | ------- | --------------------------------------------------------------- |
| `isRequired` | `Boolean` | `false` | Does this field require a value?                                |
| `isUnique`   | `Boolean` | `false` | Adds a unique index that allows only unique values to be stored |
