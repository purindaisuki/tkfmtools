import React, { createContext, useState } from 'react';
import pageString_tr from '../stringdata/pageString_tr.json';
import pageString_en from '../stringdata/pageString_en.json';
import characterString_tr from '../stringdata/characterString_tr.json';
import characterString_en from '../stringdata/characterString_en.json';
import itemString_tr from '../stringdata/itemString_tr.json';
import itemString_en from '../stringdata/itemString_en.json';

const stringDataList = {
    "zh-TW": {
        pageString: pageString_tr,
        charString: characterString_tr,
        itemString: itemString_tr,
    }
    , "en": {
        pageString: pageString_en,
        charString: characterString_en,
        itemString: itemString_en,
    }
}

export const LanguageContext = createContext({
    userLanguage: 'zh-TW',
    ...stringDataList['zh-TW'],
})

export default function LanguageProvider({ children }) {
    const getDefaultLanguage = () => {
        if (typeof localStorage !== `undefined`) {
            const localSetting = localStorage.getItem('language')
            if (localSetting) {
                return localSetting
            }
        }
        if (typeof navigator !== `undefined`) {
            const lang = navigator.language || navigator.userLanguage
            if (/en*/.test(lang)) {
                return 'en'
            }
        }
        return 'zh-TW'
    }

    const [userLanguage, setUserLanguage] = useState(getDefaultLanguage())

    const provider = {
        userLanguage,
        ...stringDataList[userLanguage],
        setUserLanguage: (toLanguage) => {
            setUserLanguage(toLanguage)
            if (typeof localStorage !== `undefined`) {
                localStorage.setItem('language', toLanguage)
            }
        }
    }

    return (
        <LanguageContext.Provider value={provider}>
            {children}
        </LanguageContext.Provider>
    )
}
