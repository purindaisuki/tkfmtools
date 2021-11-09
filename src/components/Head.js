import React from "react";
import { Helmet } from "react-helmet";
import { useLanguage } from "containers/LanguageProvider";
import langConfig from "languageConfig.json";

const DefaultHead = ({ title }) => {
  const { userLanguage } = useLanguage();

  return (
    <Helmet htmlAttributes={{ lang: userLanguage }}>
      <meta charSet="utf-8" />
      <title lang={userLanguage}>{title}</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={langConfig[userLanguage].ogLocale} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default ({ title, description, path }) => {
  const { isDefault, userLanguage } = useLanguage();
  const url = path === "/" ? "" : path?.split("/").slice(0, -1).join("_");

  return (
    <>
      <DefaultHead title={title} />
      {path && (
        <Helmet htmlAttributes={{ lang: userLanguage }}>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
          <meta
            property="og:url"
            content={`https://purindaisuki.github.io/tkfmtools${
              (isDefault ? "" : "/" + userLanguage) + path
            }`}
          />
          <meta
            property="og:image"
            content={`https://purindaisuki.github.io/tkfmtools/website_preview${
              url + (isDefault ? "" : "_en")
            }.png`}
          />
          <meta property="og:image:width" content="1440" />
          <meta property="og:image:height" content="756" />
          <meta
            property="twitter:url"
            content={`https://purindaisuki.github.io/tkfmtools${
              (isDefault ? "" : "/" + userLanguage) + path
            }`}
          />
          <meta
            property="twitter:image"
            content={`https://purindaisuki.github.io/tkfmtools/website_preview${
              url + (isDefault ? "" : "_en")
            }.png`}
          />
          <meta
            name="google-site-verification"
            content="F_IfmH-gHHQSs2j53dl-2l-zMqnWtwWOnfqdQiwLUow"
          />
        </Helmet>
      )}
    </>
  );
};
