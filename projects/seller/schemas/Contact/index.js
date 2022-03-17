let { Text, Checkbox } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");
const { roleAny } = require("../access");
const { of } = require("../fields");
module.exports = {
  active: true,
  fields: {
    phone: {
      type: Text,
      isRequired: true,
    },
    name: {
      type: Text,
      isRequired: true,
    },
    address: {
      type: Text,
      isRequired: true,
    },
    email: {
      type: Text,
    },
    note: {
      isRequired: true,
      type: Text,
    },
    message: {
      type: Text,
    },
    isDefault: {
      type: Checkbox,
    },
    of,
  },
  hooks: {
    validateInput: async (params) => {
      await of.hooks.validateInput(params);
    },
  },
  plugins: [idTracking()],
  access: roleAny,
};
