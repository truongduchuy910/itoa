let { Text, Relationship, Checkbox, Integer } = require('@itoa/fields');
// const { ip } = require("../../fields");
const { atTracking } = require('@itoa/list-plugins');
// const nodemailer = require('nodemailer');
const { gql } = require('@apollo/client');

module.exports = {
  active: true,
  fields: {
    from: { type: Relationship, ref: 'Mailer', isRequired: true },
    to: { type: Relationship, ref: 'Mailer', isRequired: true, many: true },
    cc: { type: Text },
    bcc: { type: Text },
    subject: { type: Text },
    text: { type: Text, isRequired: true },
    html: { type: Text },
    messageId: { type: Text },
  },
  // hooks: {
  //   resolveInput: async ({
  //     operation,
  //     existingItem,
  //     originalInput,
  //     resolvedData,
  //     context,
  //     listKey,
  //     fieldPath,
  //     addValidationError,
  //   }) => {
  //     const { from, to, subject, text, html } = resolvedData;
  //     const {
  //       data: { mailer, mailers = [] },
  //     } = await context.executeGraphQL({
  //       query: gql`
  //         query ($mailer: MailerWhereUniqueInput!, $mailers: [ID]) {
  //           mailer: Mailer(where: $mailer) {
  //             username
  //             password
  //             host
  //             port
  //           }
  //           mailers: allMailers(where: { id_in: $mailers }) {
  //             username
  //           }
  //         }
  //       `,
  //       variables: {
  //         mailer: { id: from },
  //         mailers: to,
  //       },
  //     });
  //     if (!mailer) throw new Error('Không tìm thấy thông tin người gửi');
  //     if (!mailers.length) throw new Error('Không tìm thấy thông tin người nhận');

  //     const { username, password, host, port, secure } = mailer;

  //     const transporter = nodemailer.createTransport({
  //       host,
  //       port,
  //       secure,
  //       auth: {
  //         user: username,
  //         pass: password,
  //       },
  //     });
  //     const { messageId, envelope, accepted, rejected, pending } = await transporter.sendMail({
  //       from: username,
  //       to: mailers.map(mailer => mailer.username).join(','),
  //       subject,
  //       text,
  //       html,
  //     });
  //     console.log('accepted', accepted);
  //     resolvedData.messageId = messageId;
  //     return resolvedData;
  //   },
  // },
  labelField: 'subject',
  plugins: [atTracking()],
};
