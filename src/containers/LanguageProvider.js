import React, { createContext, useContext } from "react";
import page_tr from "data/string/page_zh-TW.json";
import char_tr from "data/string/character_zh-TW.json";
import item_tr from "data/string/item_zh-TW.json";
import stage_tr from "data/string/stage_zh-TW.json";
import page_en from "data/string/page_en.json";
import char_en from "data/string/character_en.json";
import item_en from "data/string/item_en.json";
import stage_en from "data/string/stage_en.json";
import page_ja from "data/string/page_ja.json";
import char_ja from "data/string/character_ja.json";
import item_ja from "data/string/item_ja.json";
import stage_ja from "data/string/stage_ja.json";
import page_ko from "data/string/page_ko.json";
import char_ko from "data/string/character_ko.json";
import item_ko from "data/string/item_ko.json";
import stage_ko from "data/string/stage_ko.json";
import langConfig from "languageConfig.json";

const stringData = {
  "zh-TW": {
    pageString: page_tr,
    charString: char_tr,
    itemString: item_tr,
    stageString: stage_tr,
  },
  en: {
    pageString: page_en,
    charString: char_en,
    itemString: item_en,
    stageString: stage_en,
  },
  ja: {
    pageString: page_ja,
    charString: char_ja,
    itemString: item_ja,
    stageString: stage_ja,
  },
  ko: {
    pageString: page_ko,
    charString: char_ko,
    itemString: item_ko,
    stageString: stage_ko,
  },
};

const defaultLanguage = Object.keys(langConfig).filter(
  (key) => langConfig[key].default
)[0];

const LanguageContext = createContext({
  userLanguage: defaultLanguage,
  isDefault: true,
});

export const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({ children, pageContext }) => {
  const provider = {
    userLanguage: pageContext.lang,
    isDefault: pageContext.lang === defaultLanguage,
    ...stringData[pageContext.lang],
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
