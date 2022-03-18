let { Text, Slug } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");
const { lang } = require("../../fields");

module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    url: {
      type: Slug,
      from: "name",
      schemaDoc: "Đường dẫn",
    },
    ...lang,
  },
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [idTracking()],
};
