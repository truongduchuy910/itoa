let { Text } = require("@itoa/fields");
const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");

module.exports = {
  active: true,
  fields: {
    domain: { type: Text },
    partner: { type: Text, isRequired: true },
    access: { type: Text, isRequired: true },
    secret: { type: Text, isRequired: true },
    endpoint: { type: Text, isRequired: true },
    ip,
  },
  hooks: {
    validateInput: async (params) => {
      await ip.hooks.validateInput(params);
    },
  },
  plugins: [atTracking()],
  labelField: "partner",
};
