const string_zh_TW = require("./src/data/string/page_zh-TW.json");
const string_en = require("./src/data/string/page_en.json");
const string_ja = require("./src/data/string/page_ja.json");
const string_ko = require("./src/data/string/page_ko.json");

module.exports = {
  siteMetadata: {
    title: "Tenkafu MA! toolbox",
  },
  pathPrefix: "/tkfmtools",
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: string_zh_TW.index.helmet.title,
        short_name: "TkfmToolbox",
        description: string_zh_TW.index.helmet.description,
        lang: "zh-TW",
        start_url: "/",
        background_color: "#424242",
        theme_color: "#F48FB1",
        display: "standalone",
        icon: "src/images/favicon.png",
        localize: [
          {
            start_url: "/en/",
            lang: "en",
            name: string_en.index.helmet.title,
            description: string_en.index.helmet.description,
          },
          {
            start_url: "/ja/",
            lang: "ja",
            name: string_ja.index.helmet.title,
            description: string_ja.index.helmet.description,
          },
          {
            start_url: "/ko/",
            lang: "ko",
            name: string_ko.index.helmet.title,
            description: string_ko.index.helmet.description,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-KHV3HZD",
        includeInDevelopment: false,
        defaultDataLayer: {
          platform: "gatsby",
        },
      },
    },
  ],
};
