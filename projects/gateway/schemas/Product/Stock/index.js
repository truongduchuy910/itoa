let { Relationship, Integer, File } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");

let { image } = require("../../stores");

module.exports = {
  active: true,
  fields: {
    product: {
      type: Relationship,
      ref: "Product.stocks",
      label: "Sản phẩm",
    },
    attributeValues: {
      type: Relationship,
      ref: "ProductAttributeValue",
      many: true,
      label: "Giá trị thuộc tính",
      adminConfig: { className: "col-md-12 col-lg-6" },
    },
    quantity: {
      type: Integer,
      label: "Số lượng",
      adminConfig: { className: "col-md-12 col-lg-6" },
    },
    ...image("image", "Hình ảnh"),
  },
  labelField: "quantity",

  plugins: [idTracking()],
};
