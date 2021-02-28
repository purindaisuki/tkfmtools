import React, { createContext, useEffect, useState } from 'react';
import { navigate } from "gatsby";

const defaultLanguage = 'zh-TW'

export const LanguageContext = createContext({
    userLanguage: defaultLanguage,
    isDefault: true,
})

export default function LanguageProvider({ children, pageContext }) {
    const [userLanguage, setUserLanguage] = useState(defaultLanguage)

    // get user language
    useEffect(() => {
        const localSetting = localStorage.getItem('language')
        if (localSetting) {
            setUserLanguage(localSetting)
            return
        }

        const lang = navigator.language || navigator.userLanguage
        if (/en*/.test(lang)) {
            setUserLanguage('en')
        }
    })

    // redirect user to their locale page
    useEffect(() => {
        if (
            pageContext.lang !== defaultLanguage ||
            userLanguage === defaultLanguage
        ) {
            return
        }

        const path = window.location.pathname
        if (
            !path.match(`${userLanguage}$`) &&
            !path.includes(`${userLanguage}/`)
        ) {
            const pathArray = path.split('/')
            if (__PATH_PREFIX__) {
                pathArray.splice(2, 0, userLanguage)
            } else {
                pathArray.splice(1, 0, userLanguage)
            }
            const to = pathArray.join('/')
            navigate(to, { replace: true })
        }
    }, [userLanguage])

    const provider = {
        userLanguage: pageContext.lang,
        isDefault: pageContext.lang === defaultLanguage,
        ...pageContext.stringData,
        setUserLanguage: (toLanguage) => {
            setUserLanguage(toLanguage)
            localStorage.setItem('language', toLanguage)
        }
    }

    return (
        <LanguageContext.Provider value={provider}>
            {children}
        </LanguageContext.Provider>
    )
}
