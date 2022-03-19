const { Text, Relationship, Virtual } = require('@itoa/fields');
const { atTracking, byTracking } = require('@itoa/list-plugins');
const { content } = require('./hook');
const comment = {
  active: true,
  fields: {
    content: {
      type: Text,
      isRequired: true,
    },
    interaction: {
      type: Relationship,
      ref: 'Interaction.comments',
      many: false,
    },
    // https://v5.keystonejs.com/keystonejs/fields/src/types/virtual/
    // interacted: { type: Virtual, resolver: async (item, args, context) => {} },
    // my_interaction: {
    //   type: Relationship,
    //   ref: 'Interaction',
    //   many: false,
    // },
  },
  labelField: '',
  access: true,
  hooks: content,
  cacheHint: {
    scope: 'PUBLIC',
    maxAge: 60 * 60, // 1 hour
  },
  plugins: [atTracking(), byTracking()],
};

module.exports = comment;
