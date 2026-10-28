const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  reactStrictMode: true,

  images: {
    domains: [
      "images-na.ssl-images-amazon.com",
      "utfs.io",
      "cdn.discordapp.com",
      "media.discordapp.net",
      "t4.ftcdn.net",
      "img.freepik.com",
    ],
  },
});
