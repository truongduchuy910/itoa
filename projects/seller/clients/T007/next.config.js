module.exports = {
  i18n: {
    locales: ["vi", "en", "zh", "ja", "ko", "fr", "ru"],
    defaultLocale: "vi",
  },
  env: {
    HOST: process.env.NODE_ENV === "production" ? null : process.env.HOST,
  },

  images: {
    domains: [
      process.env.NODE_ENV === "production" ? "itoa.vn" : "localhost",
      "ecom.itoa.vn",
    ],
    path: "/loader",
  },
  async rewrites() {
    return process.env.NODE_ENV === "production"
      ? []
      : [
          {
            source: "/admin/api",
            destination: "http://localhost:7005/quan-tri/api",
          },
        ];
  },
};
