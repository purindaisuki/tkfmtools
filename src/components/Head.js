import React, { useContext } from 'react';
import { Helmet } from "react-helmet";
import { LanguageContext } from './LanguageProvider';

export default ({ title, description }) => {
    const { userLanguage } = useContext(LanguageContext)

    return (
        <Helmet>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <title lang={userLanguage}>{title}</title>
        </Helmet>
    )
}