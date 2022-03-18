let { Text, Relationship, Checkbox, Integer, Select } = require("@itoa/fields");
// const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");
const { gql } = require("@apollo/client");
const axios = require("axios");

module.exports = {
  active: true,
  fields: {
    // address
    messenger: { type: Relationship, ref: "Messenger", isRequired: true },
    recipient: { type: Relationship, ref: "MessengerUser", isRequired: true },
    persona: { type: Relationship, ref: "MessengerPersona", isRequired: true },
    // message
    text: { type: Text, isRequired: true },
    attachment: { type: Text },

    // config
    type: {
      type: Select,
      options: ["RESPONSE", "UPDATE", "MESSAGE_TAG"],
      adminDoc:
        "https://developers.facebook.com/docs/messenger-platform/send-messages#messaging_types",
    },
    tag: {
      type: Select,
      options: [
        "CONFIRMED_EVENT_UPDATE",
        "POST_PURCHASE_UPDATE",
        "ACCOUNT_UPDATE",
        "HUMAN_AGENT",
        "CUSTOMER_FEEDBACK",
      ],
      adminDoc:
        "https://developers.facebook.com/docs/messenger-platform/send-messages/message-tags",
    },
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
      const {
        type,
        tag,
        messenger,
        recipient,
        text,
        attachment,
        persona,
      } = resolvedData;

      const {
        data: { sender, user, person },
      } = await context.executeGraphQL({
        query: gql`
          query(
            $messenger: MessengerWhereUniqueInput!
            $recipient: MessengerUserWhereUniqueInput! # $persona: MessengerPersonaWhereUniqueInput!
          ) {
            sender: Messenger(where: $messenger) {
              appId
              pageId
              token
              name
            }
            user: MessengerUser(where: $recipient) {
              psid
              personId
              full_name
            }
            # person: MessengerPersona(where: $persona) {
            #   personaId
            # }
          }
        `,
        variables: {
          messenger: { id: messenger },
          recipient: { id: recipient },
          persona: { id: persona },
        },
      });
      if (!sender) throw new Error("Không tìm thấy messenger");
      if (!user) throw new Error("Không tìm thấy user");
      // if (!person) throw new Error("Không tìm thấy person");

      const { token } = sender;
      const { personId, psid } = user;
      try {
        const {
          data: { recipient_id, message_id },
        } = await axios.post(
          "https://graph.facebook.com/v12.0/me/messages?access_token=" + token,
          {
            messaging_type: type,
            tag,
            recipient: {
              id: personId || psid,
            },
            // persona_id: person.personaId,
            message: {
              text,
              attachment,
            },
          }
        );
        console.log(
          sender.name,
          "messenger notification 👉",
          user.full_name,
          "📨",
          // person.personaId,
          text,
          recipient_id,
          message_id
        );
      } catch ({
        response: {
          data: { error },
        },
      }) {
        throw new Error(error.message);
      }
      return resolvedData;
    },
  },
  labelField: "subject",
  plugins: [atTracking()],
};
