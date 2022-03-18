const { default: axios } = require("axios");
const nodemailer = require("nodemailer");

async function messenger({ psid, access_token, text }) {
  const { data } = await axios.post(
    `https://graph.facebook.com/v10.0/me/messages?access_token=${access_token}`,
    {
      recipient: { id: psid },
      messaging_type: "MESSAGE_TAG",
      tag: "POST_PURCHASE_UPDATE",
      message: {
        text,
      },
    },
  );
  return data;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAILHOST,
  port: process.env.EMAILPORT,
  secure: true,
  auth: {
    user: process.env.EMAILNAME,
    pass: process.env.EMAILPASS,
  },
});
async function email({ from, to, subject, text, html }) {
  return await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}
module.exports = { messenger, email };
