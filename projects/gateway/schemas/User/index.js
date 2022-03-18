const { Text, Password, Relationship, Checkbox } = require("@itoa/fields");
const { atTracking } = require("@itoa/list-plugins");
const { S3Adapter } = require("@itoa/file-adapters");

module.exports = {
  active: true,
  fields: {
    username: {
      type: Text,
      isRequired: true,
      isUnique: true,
    },
    password: {
      type: Password,
    },
    // ========================================
    phone: {
      type: Text,
    },
    fullname: {
      type: Text,
    },
    requests: {
      type: Relationship,
      ref: "UserRequest.user",
      many: true,
    },
    // ========================================
    name: { type: Text, adminConfig: { className: "col-sm-12 col-md-6" } },
    email: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    domain: { type: Text },
    // ROLE
    isAdmin: {
      type: Checkbox,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    isActive: {
      type: Checkbox,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    isSeller: {
      type: Checkbox,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
  },
  labelField: "username",
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60, // second
  },
  auth: {
    identityField: "username",
    secretField: "password",
  },
  plugins: [atTracking()],
};
