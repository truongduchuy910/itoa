const { Relationship, Checkbox } = require('@itoa/fields');
const { MongoId } = require('@itoa/fields-mongoid');
const { atTracking, byTracking } = require('@itoa/list-plugins');
const { hook } = require('./hook');
var interaction = {
  active: true,
  fields: {
    status: { type: Checkbox },
    reactions: {
      type: Relationship,
      ref: 'InteractionReaction.interaction',
      many: true,
    },
    comments: {
      type: Relationship,
      ref: 'InteractionComment.interaction',
      many: true,
    },
    target: { type: MongoId },
  },
  labelField: '',
  access: { read: true },
  hooks: hook,
  cacheHint: {
    scope: 'PUBLIC',
    maxAge: 60 * 60, // 1 hour
  },
  plugins: [atTracking(), byTracking()],
};
module.exports = interaction;
