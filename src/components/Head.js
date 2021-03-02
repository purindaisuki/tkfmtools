import React, { useContext } from 'react';
import { Helmet } from "react-helmet";
import { LanguageContext } from './LanguageProvider';

export default ({ title, description, path }) => {
    const { isDefault, userLanguage } = useContext(LanguageContext)
    const url = path === '/' ? '' : path.split('/').join('_')

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
                    + (isDefault ? '' : '_' + userLanguage)}.png`}
            />
            <meta
                property="twitter:url"
                content={`https://purindaisuki.github.io/tkfmtools${(isDefault
                    ? '' : ('/' + userLanguage)) + path}`}
            />
            <meta
                property="twitter:image"
                content={`https://purindaisuki.github.io/tkfmtools/website_preview${url
                    + (isDefault ? '' : '_' + userLanguage)}.png`}
            />
            <title lang={userLanguage}>{title}</title>
        </Helmet>
    )
}