let emoji = ["😄", "😁", "😊"];
const messenger = (text) => `
🎉 ${text} ${emoji[Math.floor(Math.random() * emoji.length)]}
---
Trân trọng,
Itoa Chatbot 🤖, ${new Date().toLocaleString()}`;
const email = (text) => `
🎉 ${text}.
---
Trân trọng,
Itoa Chatbot 🤖
${new Date().toLocaleString()}`;
module.exports = { messenger, email };
