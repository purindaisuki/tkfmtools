const path = require('path')

const langConfig = {
    'zh-TW': {
        default: true,
        path: '',
        locale: 'zh-TW',
        siteLanguage: 'zh-TW',
        ogLanguage: 'zh_tw',
    },
    'en': {
        path: 'en',
        locale: 'en',
        siteLanguage: 'en',
        ogLanguage: 'en_US',
    },
}

const stringData = {
    'zh-TW': {
        pageString: require('./src/stringdata/pageString_tr.json'),
        charString: require('./src/stringdata/characterString_tr.json'),
        itemString: require('./src/stringdata/itemString_tr.json'),
    }
    , 'en': {
        pageString: require('./src/stringdata/pageString_en.json'),
        charString: require('./src/stringdata/characterString_en.json'),
        itemString: require('./src/stringdata/itemString_en.json'),
    }
}

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
                stringData: stringData[entry[0]] ? stringData[entry[0]] : {},
            }
        })
    })
}

/*
// create node automatically with the filename
exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions

    // Check for "Mdx" type so that other files (e.g. images) are exluded
    if (node.internal.type === 'Mdx') {
        // Use path.basename
        // https://nodejs.org/api/path.html#path_path_basename_path_ext
        const name = path.basename(node.fileAbsolutePath, '.mdx')

        // Check if post.name is "index" -- because that's the file for default language
        const isDefault = name === 'index'

        const defaultKey = findKey(langConfig, key => key.default === true)

        // Files are defined with "name-with-dashes.lang.mdx"
        // name returns "name-with-dashes.lang"
        // So grab the lang from that string
        // If it's the default language, pass the locale for that
        const lang = isDefault ? defaultKey : name.split('.')[1]

        createNodeField({ node, name: 'lang', value: lang })
        createNodeField({ node, name: 'isDefault', value: isDefault })
    }
}
*/