/*
 * This is a itoa list that stores facebook messages
 */
let { Text, Relationship } = require("@itoa/fields");
const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");

module.exports = {
  active: true,
  fields: {
    page: {
      type: Relationship,
      ref: "MessengerUser",
    },
    person: {
      type: Relationship,
      ref: "MessengerUser",
    },
    timestamp: { type: Text },
    message: { type: Text },
    ip,
  },
  hooks: {
    validateInput: async (params) => {
      await ip.hooks.validateInput(params);
    },
  },
  labelField: "message",
  plugins: [atTracking()],
};
