let { Text, Relationship, Checkbox, Integer } = require("@itoa/fields");
// const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");
module.exports = {
  active: true,
  fields: {
    brandname: { type: Text },
    apiKey: { type: Text, isUnique: true },
    secretKey: { type: Text },
  },
  labelField: "brandname",
  plugins: [atTracking()],
};
