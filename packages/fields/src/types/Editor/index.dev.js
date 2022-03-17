const { Text } = require('@itoa/fields');

module.exports = {
  type: 'Editor',
  implementation: Text.implementation,
  views: {
    Controller: Text.views.Controller,
    Field: require.resolve('./views/Field'),
    Filter: Text.views.Filter,
  },
  adapters: Text.adapters,
};
