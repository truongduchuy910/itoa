let { Text } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");

const { lang } = require("../fields");
let { image } = require("../stores");

module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
      label: "Tên khách hàng",
    },
    profile: {
      type: Text,
      label: "Giới thiệu & hồ sơ",
    },
    description: {
      type: Text,
      label: "Nội dung",
    },
    ...image("image", "Hình ảnh"),
    ...lang,
  },

  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [idTracking()],
};
