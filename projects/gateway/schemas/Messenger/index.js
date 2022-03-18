let { Text, Relationship, Checkbox, Integer } = require("@itoa/fields");
// const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");
module.exports = {
  active: true,
  fields: {
    appId: { type: Text, isRequired: true },
    pageId: { type: Text, isRequired: true },
    token: { type: Text },
    name: { type: Text },
  },
  labelField: "name",
  plugins: [atTracking()],
};
