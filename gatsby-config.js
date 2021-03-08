module.exports = {
	siteMetadata: {
		title: `Tenkafu MA! toolbox`,
	},
	pathPrefix: `/tkfmtools`,
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-postcss`,
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
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "GTM-KHV3HZD",
				includeInDevelopment: true,
				defaultDataLayer: {
					platform: "gatsby",
				},
			},
		},
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				trackingIds: [
					"G-Z22RL2KGP1",
				],
			},
			gtagConfig: {
				anonymize_ip: true,
				cookie_expires: 0,
			},
			pluginConfig: {
				head: false,
				respectDNT: true,
			},
		},
	],
}