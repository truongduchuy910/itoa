let { Text, Relationship } = require("@itoa/fields");
const { gql } = require("@apollo/client");
const { atTracking } = require("@itoa/list-plugins");
// const hooks = require("./hooks");
// const templates = require("./templates");
module.exports = {
  active: true,
  fields: {
    tag: { type: Text, isRequired: true },
    text: { type: Text, isRequired: true },
  },
//   hooks: {
//     validateInput: async ({
//       operation,
//       existingItem,
//       originalInput,
//       resolvedData,
//       context,
//       listKey,
//       fieldPath,
//       addValidationError,
//     }) => {
//       const { tag, text: rawText } = resolvedData;
//       const text = `(TB) ${rawText}
// 💌 Trân trọng,`;
//       const {
//         data: { allNotificationGroups = [] },
//       } = await context.executeGraphQL({
//         query: gql`
//           query($group: NotificationGroupWhereInput) {
//             allNotificationGroups(where: $group) {
//               #
//               messenger {
//                 id
//               }
//               messengers {
//                 id
//               }
//               #
//               esms {
//                 id
//               }
//               phone
//               #
//               mailer {
//                 id
//               }
//               mailers {
//                 id
//               }
//             }
//           }
//         `,
//         variables: { group: { tag } },
//       });
//       const [group] = allNotificationGroups;
//       if (!group) throw new Error("Không tìm thấy group");
//       /**
//        *
//        * CREATE
//        *
//        */
//       const {
//         messenger = {},
//         messengers = [],
//         esms = {},
//         phone,
//         mailer = {},
//         mailers = [],
//       } = group;

//       if (esms)
//         context.executeGraphQL({
//           query: gql`
//             mutation($esms: EsmsvnNotificationCreateInput) {
//               createEsmsvnNotification(data: $esms) {
//                 id
//                 esmsId
//               }
//             }
//           `,
//           variables: {
//             esms: {
//               from: { connect: { id: esms.id } },
//               to: phone,
//               type: "static",
//               text,
//             },
//           },
//         });

//       if (mailer)
//         context.executeGraphQL({
//           query: gql`
//             mutation($mailer: MailerNotificationCreateInput) {
//               createMailerNotification(data: $mailer) {
//                 id
//                 messageId
//               }
//             }
//           `,
//           variables: {
//             mailer: {
//               from: { connect: { id: mailer.id } },
//               to: { connect: mailers.map((m) => ({ id: m.id })) },
//               subject: text.slice(0, 125),
//               text,
//             },
//           },
//         });

//       if (messenger)
//         context.executeGraphQL({
//           query: gql`
//             mutation($messengers: [MessengerNotificationsCreateInput]) {
//               createMessengerNotifications(data: $messengers) {
//                 id
//               }
//             }
//           `,
//           variables: {
//             messengers: messengers.map((m) => {
//               return {
//                 data: {
//                   messenger: { connect: { id: messenger.id } },
//                   recipient: { connect: { id: m.id } },
//                   text,
//                   type: "MESSAGE_TAG",
//                   tag: "CONFIRMED_EVENT_UPDATE",
//                 },
//               };
//             }),
//           },
//         });

//       return resolvedData;
//     },
//   },

  plugins: [atTracking()],
};
