const string_zh_TW = require(`./src/data/string/page_zh-TW.json`);
const string_en = require(`./src/data/string/page_en.json`);
const string_ja = require(`./src/data/string/page_ja.json`);
const string_ko = require(`./src/data/string/page_ko.json`);

const pathPrefix = `/tkfmtools`;

module.exports = {
  siteMetadata: {
    title: `TenkafuMA toolbox`,
  },
  pathPrefix,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: string_zh_TW.index.helmet.title,
        short_name: `TkfmToolbox`,
        description: string_zh_TW.index.helmet.description,
        lang: `zh-TW`,
        start_url: `/`,
        shortcuts: [
          {
            name: string_zh_TW.enlist.filter.name,
            short_name: `徵才篩選器`,
            description: string_zh_TW.enlist.filter.helmet.description,
            url: `${pathPrefix}/enlist/filter/`,
            icons: [
              {
                src: `${pathPrefix}/shortcut_recruitment_filter.png`,
                sizes: `192x192`,
              },
            ],
          },
          {
            name: string_zh_TW.team.index.name,
            short_name: string_zh_TW.team.index.name,
            description: string_zh_TW.team.index.helmet.description,
            url: `${pathPrefix}/team/`,
            icons: [
              { src: `${pathPrefix}/shortcut_team.png`, sizes: `192x192` },
            ],
          },
          {
            name: string_zh_TW.analysis.index.name,
            short_name: string_zh_TW.analysis.index.name,
            description: string_zh_TW.analysis.index.helmet.description,
            url: `${pathPrefix}/analysis/`,
            icons: [
              { src: `${pathPrefix}/shortcut_analysis.png`, sizes: `192x192` },
            ],
          },
          {
            name: string_zh_TW.battle.index.name,
            short_name: string_zh_TW.battle.index.name,
            description: string_zh_TW.battle.index.helmet.description,
            url: `${pathPrefix}/battle/`,
            icons: [
              { src: `${pathPrefix}/shortcut_battle.png`, sizes: `192x192` },
            ],
          },
        ],
        background_color: `#424242`,
        theme_color: `#F48FB1`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
        cache_busting_mode: `none`,
        localize: [
          {
            start_url: `/en/`,
            scope: `${pathPrefix}/en/`,
            lang: `en`,
            name: string_en.index.helmet.title,
            description: string_en.index.helmet.description,
            shortcuts: [
              {
                name: string_en.enlist.filter.name,
                short_name: string_en.enlist.filter.name,
                description: string_en.enlist.filter.helmet.description,
                url: `${pathPrefix}/en/enlist/filter/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_recruitment_filter.png`,
                    sizes: `192x192`,
                  },
                ],
              },
              {
                name: string_en.team.index.name,
                short_name: string_en.team.index.name,
                description: string_en.team.index.helmet.description,
                url: `${pathPrefix}/en/team/`,
                icons: [
                  { src: `${pathPrefix}/shortcut_team.png`, sizes: `192x192` },
                ],
              },
              {
                name: string_en.analysis.index.name,
                short_name: string_en.analysis.index.name,
                description: string_en.analysis.index.helmet.description,
                url: `${pathPrefix}/en/analysis/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_analysis.png`,
                    sizes: `192x192`,
                  },
                ],
              },
              {
                name: string_en.battle.index.name,
                short_name: string_en.battle.index.name,
                description: string_en.battle.index.helmet.description,
                url: `${pathPrefix}/en/battle/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_battle.png`,
                    sizes: `192x192`,
                  },
                ],
              },
            ],
          },
          {
            start_url: `/ja/`,
            scope: `${pathPrefix}/ja/`,
            lang: `ja`,
            name: string_ja.index.helmet.title,
            description: string_ja.index.helmet.description,
            shortcuts: [
              {
                name: string_ja.enlist.filter.name,
                short_name: string_ja.enlist.filter.name,
                description: string_ja.enlist.filter.helmet.description,
                url: `${pathPrefix}/ja/enlist/filter/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_recruitment_filter.png`,
                    sizes: `192x192`,
                  },
                ],
              },
              {
                name: string_ja.team.index.name,
                short_name: string_ja.team.index.name,
                description: string_ja.team.index.helmet.description,
                url: `${pathPrefix}/ja/team/`,
                icons: [
                  { src: `${pathPrefix}/shortcut_team.png`, sizes: `192x192` },
                ],
              },
              {
                name: string_ja.analysis.index.name,
                short_name: string_ja.analysis.index.name,
                description: string_ja.analysis.index.helmet.description,
                url: `${pathPrefix}/ja/analysis/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_analysis.png`,
                    sizes: `192x192`,
                  },
                ],
              },
              {
                name: string_ja.battle.index.name,
                short_name: string_ja.battle.index.name,
                description: string_ja.battle.index.helmet.description,
                url: `${pathPrefix}/ja/battle/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_battle.png`,
                    sizes: `192x192`,
                  },
                ],
              },
            ],
          },
          {
            start_url: `/ko/`,
            scope: `${pathPrefix}/ko/`,
            lang: `ko`,
            name: string_ko.index.helmet.title,
            description: string_ko.index.helmet.description,
            shortcuts: [
              {
                name: string_ko.enlist.filter.name,
                short_name: string_ko.enlist.filter.name,
                description: string_ko.enlist.filter.helmet.description,
                url: `${pathPrefix}/ko/enlist/filter/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_recruitment_filter.png`,
                    sizes: `192x192`,
                  },
                ],
              },
              {
                name: string_ko.team.index.name,
                short_name: string_ko.team.index.name,
                description: string_ko.team.index.helmet.description,
                url: `${pathPrefix}/ko/team/`,
                icons: [
                  { src: `${pathPrefix}/shortcut_team.png`, sizes: `192x192` },
                ],
              },
              {
                name: string_ko.analysis.index.name,
                short_name: string_ko.analysis.index.name,
                description: string_ko.analysis.index.helmet.description,
                url: `${pathPrefix}/ko/analysis/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_analysis.png`,
                    sizes: `192x192`,
                  },
                ],
              },
              {
                name: string_ko.battle.index.name,
                short_name: string_ko.battle.index.name,
                description: string_ko.battle.index.helmet.description,
                url: `${pathPrefix}/ko/battle/`,
                icons: [
                  {
                    src: `${pathPrefix}/shortcut_battle.png`,
                    sizes: `192x192`,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        precachePages: [
          "/",
          "/{en,ja,ko}/",
          "/enlist/filter/",
          "/{en,ja,ko}/enlist/filter/",
        ],
        workboxConfig: {
          globPatterns: ["**/*.{html,js,css}"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
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
