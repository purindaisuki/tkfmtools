module.exports = {
	siteMetadata: {
		title: `Tenkafu MA! toolbox`,
	},
	pathPrefix: `/tkfmtools`,
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-material-ui`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/images`,
				name: `images`,
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
				optimize_id: "OPT_CONTAINER_ID",
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