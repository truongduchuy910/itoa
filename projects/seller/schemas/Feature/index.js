let { Text, Editor } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");

const { lang } = require("../fields");
let { image } = require("../stores");

module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
      label: "Tiêu đề",
    },
    ...image("image", "Hình ảnh/Icon"),
    description: {
      type: Editor,
      label: "Mô tả",
    },
    content: {
      type: Editor,
      label: "Nội dung chi tiết",
    },
    ...lang,
  },
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [idTracking()],
};
