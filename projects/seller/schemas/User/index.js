const { Text, Password, Checkbox } = require("@itoa/fields");
const { modelUser } = require("../access");
const { lang } = require("../fields");
const { atTracking } = require("@itoa/list-plugins");
module.exports = {
  active: false,
  fields: {
    phone: {
      type: Text,
      isRequired: true,
      adminConfig: { className: "col-sm-12 col-md-6" },
      isUnique: true,
    },
    password: {
      adminConfig: { className: "col-sm-12 col-md-6" },
      type: Password,
    },
    name: { type: Text, adminConfig: { className: "col-sm-12 col-md-6" } },
    email: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    domain: { type: Text },
    // ROLE
    isAdmin: {
      type: Checkbox,
      access: {
        update: ({ authentication: { item: user } }) => {
          return user && user.isAdmin;
        },
      },
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    isSeller: {
      type: Checkbox,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    ...lang,
  },
  labelField: "domain",
  access: modelUser,
  hooks: {
    afterChange: async ({ context, existingItem }) => {
    },
  },
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  auth: {
    identityField: "phone",
    secretField: "password",
  },
  plugins: [atTracking()],
};
