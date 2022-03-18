let { Text, Relationship, Checkbox } = require("@itoa/fields");
// const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");

module.exports = {
  active: true,
  fields: {
    personId: { type: Text },
    messenger: { type: Relationship, ref: "Messenger" },
    psid: { type: Text, isUnique: true },
    //
    full_name: { type: Text },
    profile_pic: { type: Text },
    access_token: { type: Text },
    //
    isPerson: { type: Checkbox },
    of: { type: Relationship, ref: "MessengerUser.users" },
    //
    isPage: { type: Checkbox },
    users: { type: Relationship, ref: "MessengerUser.of", many: true },
    //
    email: {
      type: Text,
    },
    phone: {
      type: Text,
    },
    // ip,
  },
  hooks: {
    // validateInput: async (params) => {
    // await ip.hooks.validateInput(params);
    // },
  },
  labelField: "full_name",
  plugins: [atTracking()],
};
