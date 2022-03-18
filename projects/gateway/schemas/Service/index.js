let { Text, Relationship } = require("@itoa/fields");

let { image } = require("../stores");
const { idTracking } = require("@itoa/list-plugins");
const { lang, editor } = require("../fields");

module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
      label: "Tiêu đề",
    },
    ...image("image", "Hình ảnh đại diện"),
    description: {
      type: Text,
      label: "Mô tả",
    },
    post: {
      type: Relationship,
      ref: "Post",
      label: "Bài viết (chọn hoặc tạo mới)",
    },
    content: editor("Nội dung"),
    ...lang,
  },

  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [idTracking()],
};
