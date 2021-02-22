module.exports = {
	siteMetadata: {
		title: "Tenkafu MA! toolbox",
	},
	pathPrefix: `/tkfmtools`,
	plugins: [
		"gatsby-plugin-styled-components",
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/public/img`,
				name: 'images',
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
	],
}