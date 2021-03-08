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
			resolve: "gatsby-plugin-transform-imports",
			options: {
				"react-bootstrap": {
                    "transform": "react-bootstrap/esm/${member}",
                    "preventFullImport": true
                },
                "@material-ui/core": {
                    "transform": "@material-ui/core/esm/${member}",
                    "preventFullImport": true
                }
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