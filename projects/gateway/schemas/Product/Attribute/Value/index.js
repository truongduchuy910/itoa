let { Text } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");
const { lang } = require("../../../fields");
let { image } = require("../../../stores");

module.exports = {
  active: true,
  fields: {
    value: {
      type: Text,
      isRequired: true,
      label: "Giá trị thuộc tính",
    },
    ...image("file", "Hình ảnh"),
    ...lang,
  },
  plugins: [idTracking()],

  labelField: "value",

};
