import langConfig from "./src/languageConfig.json";

export { wrapRootElement, wrapPageElement } from "./gatsby-ssr";

export const onRouteUpdate = ({ location }) => {
  if (!__PATH_PREFIX__) return;

  const locale = location.pathname.split("/")[2];

  if (
    Object.keys(langConfig)
      .filter((key) => !langConfig[key].default)
      .includes(locale)
  ) {
    // localize manifest filename
    const manifestEl = document.head.querySelector('link[rel="manifest"]');
    manifestEl.setAttribute(
      "href",
      `${__PATH_PREFIX__}/manifest_${locale}.webmanifest`
    );
  }
};
