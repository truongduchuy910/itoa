const { Relationship, Virtual, Select } = require("@itoa/fields");
module.exports = {
  active: true,
  fields: {
    operation: {
      type: Select,
      options: [
        { value: "create", label: "create" },
        { value: "read", label: "read" },
        { value: "update", label: "update" },
        { value: "delete", label: "delete" },
      ],
      isRequired: true,
    },
    type: {
      type: Select,
      options: [
        { value: "not", label: "not" },
        { value: "member", label: "member" },
        { value: "share", label: "share" },
        { value: "own", label: "own" },
        { value: "any", label: "any" },
      ],
    },
    permissions: {
      type: Relationship,
      ref: "UserPermission.access",
      many: true,
    },
    schemas: {
      type: Relationship,
      ref: "UserSchema",
      many: true,
    },
  },
  labelResolver: (item) => `${item.operation}:${item.type}`,
};
