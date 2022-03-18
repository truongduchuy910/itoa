let { Text, Slug, Relationship, Integer, Editor } = require('@itoa/fields');

// const { ram } = require("@itoa/cache");
var ram = {};
let { image } = require('../../stores');
const { editor, lang } = require('../../fields');
const { idTracking } = require('@itoa/list-plugins');

module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
      label: 'Tên danh mục (bắt buộc )',
    },
    description: editor(),
    ...image('file', 'Hình ảnh đại diện'),
    parent: {
      type: Relationship,
      label: 'Thuộc danh mục? (không bắt buộc)',
      ref: 'ProductCategory.childs',
    },
    prioritize: { type: Integer, label: 'độ ưu tiên' },

    url: {
      type: Slug,
      from: 'name',
      schemaDoc: 'Đường dẫn',
      adminConfig: {
        isReadOnly: true,
      },
    },
    childs: {
      type: Relationship,
      label: 'Các danh mục con',
      ref: 'ProductCategory.parent',
      many: true,
      adminConfig: {
        isReadOnly: true,
      },
    },
    products: {
      type: Relationship,
      ref: 'Product.categories',
      many: true,
      adminConfig: {
        isReadOnly: true,
        className: 'col-sm-12 col-md-6',
      },
    },
    ...lang,
  },
  labelResolver: item => {
    const parent = ram.allProductCategories.find(c => c.id == item.parent);
    const grandfather = parent ? ram.allProductCategories.find(c => c.id == parent.parent) : null;
    // great-grandfather
    return `${grandfather ? grandfather.name + ' / ' : ''}${parent ? parent.name + ' / ' : ''}${
      item.name
    }`;
  },
  cacheHint: {
    scope: 'PUBLIC',
    maxAge: 60 * 5,
  },
  plugins: [idTracking()],
};
