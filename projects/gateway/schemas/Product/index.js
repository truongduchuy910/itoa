let { Text, Slug, Checkbox, Select, Currency, Virtual } = require('@itoa/fields');
const { atTracking, idTracking, byTracking } = require('@itoa/list-plugins');
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
    sale: {
      type: Currency,
      label: 'Giảm còn',
      adminConfig: { className: 'col-sm-12 col-md-6' },
    },
    percent: {
      type: Virtual,
      graphQLReturnType: `Int`,
      args: [{ name: 'step', type: 'Int' }],
      resolver: (item, { step = 1 }) => {
        const { sale, price } = item;
        const percent = Math.round(100 - (sale / price) * 100);
        return sale ? Math.ceil(percent / step) * step : 0;
      },
    },
    status: {
      type: Select,
      options: [
        { value: 'bestSeller', label: 'Bán chạy' },
        { value: 'newArrival', label: 'Mới về' },
        { value: 'hotDeal', label: 'Hot deal' },
      ],
      adminConfig: { className: 'col-sm-12 col-md-6' },
    },
    isDraft: {
      type: Checkbox,
      label: 'đây là bản nháp?',
      adminConfig: { className: 'col-sm-12 col-md-6' },
    },
    isOutOfStock: {
      type: Checkbox,
      label: 'Hết hàng, tạm dừng?',
      adminConfig: { className: 'col-sm-12 col-md-6' },
    },
    url: {
      type: Slug,
      from: 'name',
      schemaDoc: 'Đường dẫn',
      adminConfig: {
        isReadOnly: true,
      },
    },
    author: {
      type: Virtual,
      graphQLReturnType: 'User',
      graphQLReturnFragment: `{
        id
        username
      }`,
      resolver: (item, { step = 1 }) => {
        return { id: item.createdBy, __typename: 'User' };
      },
    },
  },
  labelField: 'name',
  cacheHint: {
    scope: 'PUBLIC',
    maxAge: 60,
  },
  access: {
    read: ({ authentication = {}, context }) => {
      console.log('authentication', authentication);
      return true;
    },
  },
  plugins: [atTracking(), idTracking()],
};
