let { File, Text, Relationship, Select } = require("@itoa/fields");
const { idTracking } = require("@itoa/list-plugins");

const { lang } = require("../fields");
let { image } = require("../stores");

const options = [
  { width: 250, height: 250, label: "Square", value: "square" },
  { width: 200, height: 200, label: "Small Square", value: "small" },
  { width: 468, height: 60, label: "Banner", value: "banner" },
  { width: 728, height: 90, label: "Leaderboard", value: "leaderboard" },
  { width: 300, height: 250, label: "Inline Rectangle", value: "inline" },
  { width: 120, height: 600, label: "Skyscraper", value: "skyscraper" },
  { width: 160, height: 600, label: "Wide Skyscraper", value: "wide" },
  { width: 300, height: 600, label: "Half-Page Ad", value: "half" },
];

module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
      label: "Tiêu đề",
    },
    slogan: {
      type: Text,
    },
    ...image(),
    description: {
      type: Text,
      label: "Mô tả",
    },
    url: { type: Text, from: "name" },
    page: { type: Relationship, ref: "Page.banners" },
    type: { type: Select, options },
    ...lang,
  },
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60 * 5, // 1 hour
  },
  plugins: [idTracking()],
};
