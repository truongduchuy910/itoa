let {
  Text,
  Relationship,
  Slug,
  Checkbox,
  Select,
  Currency,
  Images,
  Virtual,
} = require("@itoa/fields");
const { atTracking, idTracking } = require("@itoa/list-plugins");
const { editor, lang } = require("../fields");

let { image } = require("../stores");

const { attributes } = require("./hooks");

module.exports = {
  active: true,
  fields: {
    ...image("image", "Hình ảnh"),
    images: {
      type: Images,
      ref: "UploadImage",
      search: "alt",
      file: "file",
      label: "Hình thêm",
      many: true,
      cacheHint: {
        maxAge: 80,
      },
    },
    name: {
      type: Text,
      isRequired: true,
      label: "Tên sản phẩm (Bắt buộc)",
    },
    price: {
      type: Currency,
      isRequired: true,
      label: "Giá (Bắt buộc)",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    sale: {
      type: Currency,
      label: "Giảm còn",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    percent: {
      type: Virtual,
      graphQLReturnType: `Int`,
      args: [{ name: "step", type: "Int" }],
      resolver: (item, { step = 1 }) => {
        const { sale, price } = item;
        const percent = Math.round(100 - (sale / price) * 100);
        return sale ? Math.ceil(percent / step) * step : 0;
      },
    },
    /**
     *
     */
    status: {
      type: Select,
      options: [
        { value: "bestSeller", label: "Bán chạy" },
        { value: "newArrival", label: "Mới về" },
        { value: "hotDeal", label: "Hot deal" },
      ],
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    /**
     *
     */

    brand: {
      type: Relationship,
      ref: "ProductBrand",
      label: "Thương hiệu",
      adminConfig: { className: "col-sm-12 col-md-6" },
      cacheHint: {
        maxAge: 80,
      },
    },

    categories: {
      type: Relationship,
      ref: "ProductCategory.products",
      label: "Danh mục",
      many: true,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },

    attributes: {
      type: Relationship,
      ref: "ProductAttribute.products",
      many: true,
      label: "Nhóm thuộc tính (Chọn sau khi tạo)",
      adminConfig: { className: "col-sm-12 col-md-6" },
      hooks: attributes,
    },
    /**
     *
     */
    description: editor("Mô tả"),
    ...image("detail", "Hình ảnh thông tin chi tiết"),
    guide: editor("Hướng dẫn"),
    isDraft: {
      type: Checkbox,
      label: "đây là bản nháp?",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    isOutOfStock: {
      type: Checkbox,
      label: "Hết hàng, tạm dừng?",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    /**
     *
     */

    url: {
      type: Slug,
      from: "name",
      schemaDoc: "Đường dẫn",
      adminConfig: {
        isReadOnly: true,
      },
    },
    stocks: {
      type: Relationship,
      ref: "ProductStock.product",
      many: true,
      adminConfig: {
        isReadOnly: true,
      },
    },
    ...lang,
  },
  labelField: "name",
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60,
  },
  plugins: [atTracking(), idTracking()],
};
