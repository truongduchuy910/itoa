let { Text, Integer } = require("@itoa/fields");
const { ip } = require("../fields");
const { atTracking } = require("@itoa/list-plugins");
module.exports = {
  active: true,
  fields: {
    identity: { type: Text, isRequired: true },
    text: { type: Text, isRequired: true },
    amount: { type: Text, isRequired: true },
    orderId: { type: Text },
    ip,
  },
  hooks: {
    validateInput: async (params) => {
      await ip.hooks.validateInput(params);
    },
  },
  plugins: [atTracking()],
  labelField: "identity",
};
