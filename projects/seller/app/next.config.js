module.exports = {
  i18n: {
    locales: ["vi", "en", "zh", "ja", "ko", "fr", "ru"],
    defaultLocale: "vi",
  },
  env: {
    HOST: process.env.NODE_ENV === "production" ? null : process.env.HOST,
  },

  images: {
    path: "/loader",
    minimumCacheTTL: 60,
  },
};
