const path = require('path')
const langConfig = require('./src/languageConfig.json')

// Absolute imports
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
    })
}

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions

    // Delete the incoming page that was automatically created by Gatsby
    deletePage(page)

    Object.entries(langConfig)
        .map(entry => {
            const localizedPath = entry[1].default
                ? page.path
                : `${entry[1].path}${page.path}`

            const withTabs = localizedPath.includes('enlist/') ||
                localizedPath.includes('drop/') ||
                localizedPath.includes('analysis/')


            const withLineupData = localizedPath.includes('analysis/') || localizedPath.includes('team/')
            const withTeamData = localizedPath.includes('team/')

            // Check if the page is a localized 404
            if (localizedPath.match(/^[a-z]{2}\/404\/$/)) {
                page.matchPath = `/${entry[0]}/*`
                // Recreate the modified page
                return createPage({
                    ...page,
                    path: localizedPath,
                    context: {
                        ...page.context,
                        lang: entry[0],
                    }
                })
            }

            return createPage({
                ...page,
                path: localizedPath,
                // Pass in the stringData as context to every page
                context: {
                    ...page.context,
                    lang: entry[0],
                    withTabs: withTabs,
                    withLineupData: withLineupData,
                    withTeamData: withTeamData,
                    pagePath: page.path,
                }
            })
        })
}
