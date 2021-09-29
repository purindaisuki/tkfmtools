import React, { createContext, useContext } from "react";
import langConfig from "languageConfig.json";

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
    ...pageContext.stringData,
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
