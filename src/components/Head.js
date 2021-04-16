import React from 'react';
import { Helmet } from "react-helmet";

import { useLanguage } from 'containers/LanguageProvider';

export default ({ title, description, path }) => {
    const { isDefault, userLanguage } = useLanguage()
    const url = path === '/' ? '' : path.split('/').slice(0, -1).join('_')

    return (
        <Helmet>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta
                property="og:url"
                content={`https://purindaisuki.github.io/tkfmtools${(isDefault
                    ? '' : ('/' + userLanguage)) + path}`}
            />
            <meta
                property="og:image"
                content={`https://purindaisuki.github.io/tkfmtools/website_preview${url
                    + (isDefault ? '' : '_en')}.png`}
            />
            <meta
                property="twitter:url"
                content={`https://purindaisuki.github.io/tkfmtools${(isDefault
                    ? '' : ('/' + userLanguage)) + path}`}
            />
            <meta
                property="twitter:image"
                content={`https://purindaisuki.github.io/tkfmtools/website_preview${url
                    + (isDefault ? '' : '_en')}.png`}
            />
            <title lang={userLanguage}>{title}</title>
        </Helmet>
    )
}