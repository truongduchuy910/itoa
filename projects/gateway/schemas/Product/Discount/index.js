let { Text, Slug, Relationship, Select, Integer } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");
const { lang } = require("../../fields");
let { image } = require("../../stores");

module.exports = {
  active: true,
  fields: {
    code: {
      isRequired: true,
      type: Text,
      isRequired: true,
      isUnique: true,
      label: "Mã",
    },
    type: {
      type: Select,
      options: [
        { value: "percentage", label: "Phần trăm" },
        { value: "fixed", label: "Cố định" },
      ],
      label: "Hình thức khuyến mãi",
    },
    value: {
      type: Integer,
      label: "Giá trị",
    },
    name: {
      type: Text,
      label: "Tên khuyến mãi",
    },
    description: { type: Text, label: "Mô tả" },
    condition: {
      type: Integer,
      label: "Cho đơn hàng tối thiểu",
    },
    ...image("image", "Hình ảnh đại diện"),
    //
    orders: {
      type: Relationship,
      label: "Đã áp dụng cho đơn hàng",
      ref: "ProductOrder.discount",
      many: true,
      adminConfig: {
        isReadOnly: true,
      },
    },
    url: {
      type: Slug,
      from: "name",
      schemaDoc: "Đường dẫn",
      adminConfig: {
        isReadOnly: true,
      },
    },
    ...lang,
  },
  plugins: [idTracking()],
};
