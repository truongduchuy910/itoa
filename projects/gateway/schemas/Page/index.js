let {
  Images,
  Relationship,
  Text,
  File,
  Integer,
  Select,
  Checkbox,
} = require("@itoa/fields");

const { Color } = require("@itoa/fields-color");
const { atTracking, idTracking } = require("@itoa/list-plugins");

const { modelPage } = require("../access");
const { lang, editor } = require("../fields");
let { image } = require("../stores");

module.exports = {
  active: true,
  fields: {
    store: {
      type: Text,
      label: "Tên cửa hàng",
      isRequired: true,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    ...image("logo"),
    slogan: {
      type: Text,
      label: "Slogan & lĩnh vực",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    address: {
      type: Text,
      label: "Địa chỉ, trụ sở",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    phone: {
      type: Text,
      label: "Số điện thoại (Hotline)",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    email: {
      type: Text,
      label: "E-mail",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    intro: editor("Giới thiệu gắn"),
    contact: editor("Chi nhánh"),
    pageId: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
      label: "Facebook Page ID",
    },
    twitter: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    instagram: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    pinterest: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    youtube: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    googlePlus: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    googleMap: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    zalo: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    pixelId: {
      type: Text,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    gtag: { type: Text, adminConfig: { className: "col-sm-12 col-md-6" } },
    greeting: { type: Text, adminConfig: { className: "col-sm-12 col-md-6" } },
    //
    shipMoneySupport: {
      type: Integer,
      label: "Tiền ship cố định",
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    ship: editor("Thông tin ship"),
    transfer: editor("Thông tin chuyển khoản "),

    color: {
      type: Color,
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    colorMode: {
      type: Select,
      options: [
        { label: "Sáng", value: "light" },
        { label: "Tối", value: "dark" },
      ],
      adminConfig: { className: "col-sm-12 col-md-6" },
    },
    blocks: { type: Text, adminConfig: { className: "col-sm-12 col-md-6" } },
    ordering: { type: Checkbox },
    company: {
      type: Relationship,
      ref: "Post.page",
      label: "Về chúng tôi (Chân trang)",
      many: true,
    },
    banners: { type: Relationship, ref: "Banner.page", many: true },
    ...lang,
  },
  labelField: "store",
  access: modelPage,
  cacheHint: {
    scope: "PUBLIC",
    maxAge: 60,
  },
  plugins: [atTracking(), idTracking()],
};
