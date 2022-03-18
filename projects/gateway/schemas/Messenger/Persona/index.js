let { Text, Relationship } = require("@itoa/fields");
// const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");
const axios = require("axios");
const { gql } = require("@apollo/client");
module.exports = {
  active: true,
  fields: {
    personaId: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
      },
    },
    messenger: { type: Relationship, ref: "Messenger" },
    name: { type: Text, isUnique: true },
    profile_picture_url: { type: Text },
  },
  hooks: {
    resolveInput: async ({
      operation,
      existingItem,
      originalInput,
      resolvedData,
      context,
      listKey,
      fieldPath,
      addValidationError,
    }) => {
      if (operation === "update") return resolvedData;

      const { name, profile_picture_url, messenger } = resolvedData;
      const {
        data: { sender },
      } = await context.executeGraphQL({
        query: gql`
          query($where: MessengerWhereUniqueInput!) {
            sender: Messenger(where: $where) {
              appId
              pageId
              token
            }
          }
        `,
        variables: { where: { id: messenger } },
      });
      if (!sender) throw new Error("Không tìm thấy messenger");

      const { token } = sender;
      //  data: { id: '487498686093552' }
      const { data = {} } = await axios.post(
        "https://graph.facebook.com/me/personas?access_token=" + token,
        {
          name,
          profile_picture_url,
        }
      );
      resolvedData.personaId = data.id;
      return resolvedData;
    },
  },
  labelField: "name",
  plugins: [atTracking()],
};
