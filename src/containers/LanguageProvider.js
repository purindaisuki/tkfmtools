import React, { createContext, useContext, useEffect, useState } from 'react';

import pageString_tr from 'data/string/pageString_tr.json';
import charString_tr from 'data/string/characterString_tr.json';
import itemString_tr from 'data/string/itemString_tr.json';
import pageString_en from 'data/string/pageString_en.json';
import charString_en from 'data/string/characterString_en.json';
import itemString_en from 'data/string/itemString_en.json';
import langConfig from 'languangeConfig.json';

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

export const useLanguage = () => useContext(LanguageContext)

export default function LanguageProvider({ children, pageContext }) {
    const [userLanguage, setUserLanguage] = useState(defaultLanguage)

    // get user language
    // use useEffect to solve rehydration issue between react and gatsby
    useEffect(() => {
        // only run at first render
        const localSetting = localStorage.getItem('language')
        if (localSetting) {
            setUserLanguage(localSetting)
            return
        }

        const lang = navigator.language || navigator.userLanguage
        if (/en*/.test(lang)) {
            setUserLanguage('en')
        }
    }, [])

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
