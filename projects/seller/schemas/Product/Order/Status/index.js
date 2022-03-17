let { Text, Select } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");

module.exports = {
  active: true,
  fields: {
    value: {
      type: Text,
      isRequired: true,
      label: "Trạng thái đơn hàng",
    },
    color: {
      type: Select,
      options: [
        { value: "primary", label: "primary" },
        { value: "secondary", label: "secondary" },
        { value: "success", label: "success" },
        { value: "danger", label: "danger" },
        { value: "warning", label: "warning" },
        { value: "info", label: "info" },
        { value: "light", label: "light" },
        { value: "dark", label: "dark" },
      ],
    },
  },
  labelField: "value",
  plugins: [idTracking()],
};
