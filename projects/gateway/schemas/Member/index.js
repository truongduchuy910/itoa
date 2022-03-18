/*
 * This is a itoa list that stores facebook messages
 */
let { Text } = require("@itoa/fields");
const { ip, editor } = require("../fields");
const { atTracking } = require("@itoa/list-plugins");
module.exports = {
  active: true,
  fields: {
    name: { type: Text },
    degree: { type: Text },
    experience: { type: Text },
    description: editor(),
    ip,
  },
  hooks: {
    validateInput: async (params) => {
      await ip.hooks.validateInput(params);
    },
  },
  plugins: [atTracking()],
  labelField: "name",
};
