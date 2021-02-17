import React, { createContext, useState } from 'react';
import strings_zh_Tw from '../strings.json'
import strings_en from '../strings_en.json'

const stringDataList = { "zh-TW": strings_zh_Tw, "en": strings_en }

export const LanguageContext = createContext({
    userLanguage: 'zh-TW',
    stringData: stringDataList['zh-TW']
})

export default function LanguageProvider({ children }) {
    const getDefaultLanguage = () => {
        const localSetting = localStorage.getItem('language')
        if (localSetting) {
            return localSetting
        }
        const lang = navigator.language || navigator.userLanguage
        if (/en*/.test(lang)) {
            return 'en'
        }
        return 'zh-TW'
    }

    const [userLanguage, setUserLanguage] = useState(getDefaultLanguage())

    const provider = {
        userLanguage,
        stringData: stringDataList[userLanguage],
        setUserLanguage: (toLanguage) => {
            setUserLanguage(toLanguage);
            window.localStorage.setItem('language', toLanguage);
        }
    }

    return (
        <LanguageContext.Provider value={provider}>
            {children}
        </LanguageContext.Provider>
    )
}