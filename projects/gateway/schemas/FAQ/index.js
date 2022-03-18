let { Text, Integer } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");


const { lang, editor } = require("../fields");
module.exports = {
  active: true,
  fields: {
    title: {
      type: Text,
      isRequired: true,
      label: "Tiêu đề câu hỏi",
    },
    body: editor("Nội dung"),
    prioritize: { type: Integer, label: "độ ưu tiên" },
    ...lang,
  },
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [idTracking()],
};
