let { Text } = require('@itoa/fields');
const { atTracking, byTracking } = require('@itoa/list-plugins');
module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
      label: 'Tên sản phẩm (Bắt buộc)',
    },
  },
  access: {
    read: ({ authentication = {}, context }) => {
      const { item } = authentication;
      return true;
    },
  },
  plugins: [atTracking()],
};
