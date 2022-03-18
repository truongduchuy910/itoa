let { File, Text } = require("@itoa/fields");
let { image } = require("../../stores");

const { atTracking, idTracking } = require("@itoa/list-plugins");

module.exports = {
  active: true,
  fields: {
    ...image("file", "Hình ảnh", true),
    alt: {
      type: Text,
      label: "Từ khoá tìm kiếm (Nên đặt)",
    },
  },
  labelResolver: (item) => {
    return `${item.alt ? item.alt : item.file.originalFilename}`;
  },
  hooks: {
    resolveInput: async ({ resolvedData = {} }) => {
      if (!resolvedData.alt && resolvedData.file) resolvedData.file.filename;
      return resolvedData;
    },
  },

  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [atTracking(), idTracking()],
};
