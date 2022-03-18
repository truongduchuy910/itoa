let { Relationship } = require("@itoa/fields");
const { atTracking, idTracking } = require("@itoa/list-plugins");

const { roleAny } = require("../../access");
const { of, ip } = require("../../fields");
module.exports = {
  active: true,
  fields: {
    items: {
      type: Relationship,
      ref: "ProductCartItem.cart",
      many: true,
    },
    of,
    ip,
  },

  hooks: {
    validateInput: async (params) => {
      const { operation, listKey, originalInput, resolvedData, existingItem } = params;
      console.log(operation, listKey, resolvedData, existingItem);
      await of.hooks.validateInput(params);
      await ip.hooks.validateInput(params);
    },
  },
  access: roleAny,
  plugins: [atTracking(), idTracking()],
};
