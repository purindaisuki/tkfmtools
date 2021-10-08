module.exports = {
  siteMetadata: {
    title: `Tenkafu MA! toolbox`,
  },
  pathPrefix: `/tkfmtools`,
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
