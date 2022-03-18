let { Text, Slug, Currency, Relationship } = require('@itoa/fields');
const { atTracking } = require('@itoa/list-plugins');
// const RemoteRelationship = require('@itoa/fields-remote-relationship');
module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
      label: 'Tên sản phẩm (Bắt buộc)',
    },
    price: {
      type: Currency,
      isRequired: true,
      label: 'Giá (Bắt buộc)',
      adminConfig: { className: 'col-sm-12 col-md-6' },
    },
    tags: { type: Relationship, ref: 'ProductTag', many: true },
    url: {
      type: Slug,
      from: 'name',
      schemaDoc: 'Đường dẫn',
      adminConfig: {
        isReadOnly: true,
      },
    },
    // hashtag: {
    //   type: RemoteRelationship,
    //   ref: 'User',
    //   throught: 'ProductRemote',
    //   url: 'http://localhost:3000/admin/api',
    // },
  },
  labelField: 'name',
  cacheHint: {
    scope: 'PUBLIC',
    maxAge: 60,
  },
  access: {
    read: item => {
      return true;
    },
  },
  plugins: [atTracking()],
};
