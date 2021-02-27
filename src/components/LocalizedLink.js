import React, { useContext } from "react";
import { Link } from "gatsby";
import { LanguageContext } from './LanguageProvider';

const LocalizedLink = ({ to, disableLocale, ...props }) => {
    const { userLanguage, isDefault } = useContext(LanguageContext)

    const isIndex = to === '/'

    const path = disableLocale || isDefault
        ? to
        : isIndex
            ? `/${userLanguage}`
            : `/${userLanguage}${to}`


    return <Link {...props} to={path} />
}

export default LocalizedLink