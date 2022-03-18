const { Relationship, Select, Editor, Text } = require("@itoa/fields");
module.exports = {
  active: true,
  fields: {
    name: { type: Text, isRequired: true, isUnique: true },
    description: {
      type: Text,
      isMutipleline: true,
    },
  },
};
