let { Text, Relationship } = require("@itoa/fields");
const { atTracking } = require("@itoa/list-plugins");
module.exports = {
  active: true,
  fields: {
    tag: { type: Text },
    //
    messenger: { type: Relationship, ref: "Messenger" },
    messengers: { type: Relationship, ref: "MessengerUser", many: true },
    //
    esms: { type: Relationship, ref: "Esmsvn" },
    phone: { type: Text },
    //
    mailer: { type: Relationship, ref: "Mailer" },
    mailers: { type: Relationship, ref: "Mailer", many: true },
  },
  plugins: [atTracking()],
  labelField: "tag",
};
