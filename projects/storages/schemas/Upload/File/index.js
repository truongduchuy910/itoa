let { File, Text } = require("@itoa/fields");
let { file } = require("../../stores");

const { atTracking, idTracking } = require("@itoa/list-plugins");
module.exports = {
  active: true,
  fields: {
    ...file("file", "Tệp", true),
    address: {
      type: Text,
      label: "Địa chỉ",
      isUnique: true,
    },
  },

  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [atTracking(), idTracking()],
};
