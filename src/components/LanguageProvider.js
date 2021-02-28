import React, { createContext, useEffect, useState } from 'react';
import { navigate } from "gatsby";
import pageString_tr from '../stringdata/pageString_tr.json';
import charString_tr from '../stringdata/characterString_tr.json';
import itemString_tr from '../stringdata/itemString_tr.json';
import pageString_en from '../stringdata/pageString_en.json';
import charString_en from '../stringdata/characterString_en.json';
import itemString_en from '../stringdata/itemString_en.json';
import langConfig from '../languangeConfig.json';

const stringData = {
    'zh-TW': {
        pageString: pageString_tr,
        charString: charString_tr,
        itemString: itemString_tr,
    }
    , 'en': {
        pageString: pageString_en,
        charString: charString_en,
        itemString: itemString_en,
    }
}

const defaultLanguage = Object.keys(langConfig).filter(key => langConfig[key].default)[0]

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
                pathArray.splice(1, 1, userLanguage)
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
        ...stringData[pageContext.lang],
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
