const { Text } = require("@itoa/fields");
const { ip } = require("../fields");
const { atTracking } = require("@itoa/list-plugins");
module.exports = {
  active: true,
  fields: { StagingToken: { type: Text }, ProductionToken: { type: Text }, ip },
  hooks: {
    validateInput: async (params) => {
      await ip.hooks.validateInput(params);
    },
  },
  plugins: [atTracking()],
};
