let { Text, Relationship, Checkbox, Integer } = require('@itoa/fields');
// const { ip } = require("../../fields");
const { atTracking } = require('@itoa/list-plugins');
module.exports = {
  active: true,
  fields: {
    username: { type: Text, isUnique: true },
    password: { type: Text },
    host: { type: Text },
    port: { type: Integer },
    secure: { type: Checkbox },
  },
  labelField: 'username',
  plugins: [atTracking()],
};
