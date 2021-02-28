const path = require('path')
const langConfig = require('./src/languangeConfig.json')

const removeTrailingSlash = path =>
    path === '/' ? path : path.replace(/\/$/, '')

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions

    // Delete the incoming page that was automatically created by Gatsby
    deletePage(page)

    Object.entries(langConfig).map(entry => {
        const localizedPath = entry[1].default
            ? page.path
            : `${entry[1].path}${page.path}`

        return createPage({
            ...page,
            // remove trailing slash
            path: removeTrailingSlash(localizedPath),
            // Pass in the stringData as context to every page
            context: {
                ...page.context,
                lang: entry[0],
            }
        })
    })
}
