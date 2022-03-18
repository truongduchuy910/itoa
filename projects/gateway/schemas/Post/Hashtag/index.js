let {
  Relationship,
  Text,
  Slug,
  Integer,
  Checkbox,
  File,
} = require("@itoa/fields");
const { Color } = require("@itoa/fields-color");
const { idTracking } = require("@itoa/list-plugins");

const { lang, editor } = require("../../fields");
const { image } = require("../../stores");

module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    description: editor("Mô tả"),
    parent: {
      type: Relationship,
      label: "Thuộc danh mục? (không bắt buộc)",
      ref: "PostHashtag.childs",
    },
    prioritize: { type: Integer, label: "độ ưu tiên" },
    ...image("image", "Hình ảnh đại diện"),
    color: { type: Color },
    url: {
      type: Slug,
      from: "name",
      adminConfig: {
        isReadOnly: true,
      },
      label: "Đường dẫn, slug (tạo tự động)",
      schemaDoc: "Đường dẫn",
    },
    childs: {
      type: Relationship,
      label: "Các danh mục con",
      ref: "PostHashtag.parent",
      many: true,
      adminConfig: {
        isReadOnly: true,
      },
    },
    pin: {
      // Danh mục đươc ghim lên trang chủ
      type: Checkbox,
    },
    ...lang,
  },
  labelField: "name",

  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [idTracking()],
};
