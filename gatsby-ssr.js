import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import LineupDataProvider from "containers/LineupDataProvider";
import TeamDataProvider from "containers/TeamDataProvider";
import Layout from "containers/Layout";
import { panelsStyle } from "containers/Panels";
import LanguageProvider from "containers/LanguageProvider";
import { lightTheme, darkTheme, fontFamily } from "components/theme";

const WithData = ({ children, withLineupData, withTeamData }) =>
  withLineupData ? (
    <LineupDataProvider>
      {withTeamData ? (
        <TeamDataProvider>{children}</TeamDataProvider>
      ) : (
        children
      )}
    </LineupDataProvider>
  ) : withTeamData ? (
    <TeamDataProvider>{children}</TeamDataProvider>
  ) : (
    children
  );

export const wrapPageElement = ({ element, props: { pageContext } }) => (
  <LanguageProvider pageContext={pageContext}>
    <Layout withTabs={pageContext.withTabs} pagePath={pageContext.pagePath}>
      <WithData
        withLineupData={pageContext.withLineupData}
        withTeamData={pageContext.withTeamData}
      >
        {element}
      </WithData>
    </Layout>
  </LanguageProvider>
);

const theme = createTheme({
  typography: { fontFamily: fontFamily },
});

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);

export const onRenderBody = ({ setHeadComponents }) => {
  const layouts = setHeadComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `
            (function() {
              var preferredTheme = localStorage.getItem('color-theme');
              var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
          
              var colorMode = preferredTheme ? preferredTheme : (darkQuery ? 'dark' : 'light');
          
              var root = document.documentElement;
              var iterate = (obj) => {
                Object.keys(obj).forEach(key => {
                  if (typeof obj[key] === 'object') {
                    iterate(obj[key]);
                  } else {
                    root.style.setProperty(
                      "--" + key,
                      obj[key]
                    );
                  }
                })
              };
              var parsedTheme = JSON.parse('${JSON.stringify({
                light: lightTheme,
                dark: darkTheme,
              })}');
              var theme = parsedTheme[colorMode];
              iterate(theme);
              root.style.setProperty('--initial-color-mode', colorMode);

              var preferredLayout = JSON.parse(localStorage.getItem('global-layout'));
              var layoutMode = preferredLayout !== null ? preferredLayout
              : window.innerWidth > 1000 ? 1 : 0;
              localStorage.setItem('global-layout', JSON.stringify(layoutMode));

              var parsedLayout = JSON.parse('${JSON.stringify(panelsStyle)}');
              var layout = parsedLayout[layoutMode];

              iterate(layout);

              root.style.setProperty('--initial-layout', layoutMode);
            })();
            `
          .replace(/\n/g, " ")
          .replace(/ {2}/g, ""),
      }}
    />,
  ]);
};
