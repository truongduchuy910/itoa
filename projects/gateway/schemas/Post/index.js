let { Text, Relationship, Slug, Integer } = require("@itoa/fields");
let { image } = require("../stores");

const { content } = require("./hooks");
const { editor, lang } = require("../fields");
const { atTracking, idTracking } = require("@itoa/list-plugins");

module.exports = {
  active: true,
  fields: {
    title: {
      type: Text,
      isRequired: true,
      label: "Tên bài viết",
    },
    ...image("thumbnail", "Bìa"),
    content: editor("Nội dung"),
    hashtags: {
      type: Relationship,
      ref: "PostHashtag",
      many: true,
      label: "Phân loại",
    },
    embed: { type: Text, label: "Mã nhúng" },
    description: {
      type: Text,
      label: "Mô tả ngắn",
      adminConfig: {
        isReadOnly: true,
      },
    },
    keywords: {
      type: Text,
      label: "Các từ khóa",
      adminConfig: {
        isReadOnly: true,
      },
    },
    url: {
      type: Slug,
      adminConfig: {
        isReadOnly: true,
      },
      from: "title",
    },
    page: {
      type: Relationship,
      ref: "Page.company",
      label: "Ghim",
    },
    prioritize: { type: Integer, label: "độ ưu tiên" },
    body: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
      },
    },
    ...lang,
  },
  labelField: "title",

  feed: 100,
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [atTracking(), idTracking()],
};
