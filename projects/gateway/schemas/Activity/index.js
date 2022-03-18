let { Text, Integer } = require('@itoa/fields');
const { atTracking } = require('@itoa/list-plugins');
const { ip } = require('../fields');
module.exports = {
  active: true,
  fields: {
    operation: { type: Text },
    status: { type: Integer },
    response: { type: Text },
    ip,
  },
  hooks: {
    validateInput: async params => {
      await ip.hooks.validateInput(params);
    },
  },
  plugins: [atTracking()],
  labelField: 'full_name',
};
