const { Checkbox, Relationship } = require('@itoa/fields');
const { atTracking, byTracking } = require('@itoa/list-plugins');
const relationship = {
  active: true,
  fields: {
    isAccepted: {
      type: Checkbox,
      default: false,
    },
    to: {
      type: Relationship,
      ref: 'User',
    },
  },
  // ...multipleLanguage("Translate"),
  labelField: '',
  access: true,
  hooks: {},
  cacheHint: {
    scope: 'PUBLIC',
    maxAge: 60 * 60, // 1 hour
  },
  plugins: [atTracking(), , byTracking()],
};
module.exports = relationship;
