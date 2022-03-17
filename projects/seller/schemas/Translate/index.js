let { Text } = require("@itoa/fields");
const { MongoId } = require("@itoa/fields-mongoid");
const { idTracking } = require("@itoa/list-plugins");


module.exports = {
  active: true,
  fields: {
    item: { type: MongoId, isRequired: true },
    listKey: { type: Text, isRequired: true },
    fieldName: { type: Text, isRequired: true },
    lang: { type: Text, isRequired: true },
    content: { type: Text, isRequired: true },
  },

  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [idTracking()],
};
