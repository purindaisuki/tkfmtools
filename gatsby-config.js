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
	],
}