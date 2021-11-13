export { wrapRootElement, wrapPageElement } from "./gatsby-ssr";

export const onRouteUpdate = ({ location }) => {
  const locale = location.pathname.split("/")[2];

  if (["en", "ja", "ko"].includes(locale)) {
    const manifestEl = document.head.querySelector('link[rel="manifest"]');
    manifestEl.setAttribute(
      "href",
      `/tkfmtools/manifest_${locale}.webmanifest`
    );
  }
};
