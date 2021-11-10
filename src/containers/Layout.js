import React, { createContext, useContext, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import useSwitch from "hooks/useSwitch";
import useWindowSize from "hooks/useWindowSize";
import WithTabs from "containers/withTabs";
import { panelsStyle } from "containers/Panels";
import { useLanguage } from "containers/LanguageProvider";
import { lightTheme, darkTheme } from "components/theme";
import Head from "components/Head";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import BackToTop from "components/BackToTop";
import langConfig from "languageConfig.json";
import "components/global.css";

const transformTheme = (theme) => {
  const newTheme = {};
  Object.keys(theme).forEach((key) => {
    const value = theme[key];
    if (typeof value === "object" && !!value) {
      newTheme[key] = transformTheme(value);
    } else {
      newTheme[key] = `var(--${key})`;
    }
  });

  return newTheme;
};

export const LayoutContext = createContext();

export const useLayoutConfig = () => useContext(LayoutContext);

const Layout = ({ children, pagePath, isIndex, withTabs }) => {
  const { userLanguage, isDefault, pageString } = useLanguage();

  const { layout, setLayout } = useSwitch("global-layout", [0, 1]);

  const [width] = useWindowSize();

  const [state, setState] = useState({
    isDark: false,
    layoutIndex: 1,
    didLoad: false,
    withSidebar: true,
    isSidebarOpen: false,
  });

  // get user theme
  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.style.getPropertyValue("--initial-color-mode");
    const initLayout = root.style.getPropertyValue("--initial-layout");

    root.removeAttribute("style");

    setState((state) => ({
      ...state,
      isDark: initialTheme === "dark",
      layoutIndex: parseInt(initLayout),
      withSidebar: width <= 1268,
      didLoad: true,
    }));
  }, []);

  useEffect(() => {
    setState((state) => ({
      ...state,
      withSidebar: width <= 1268,
    }));
  }, [width]);

  const toggleTheme = (event) => {
    // ignore tab and shift key
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState((state) => ({
      ...state,
      isDark: !state.isDark,
    }));

    localStorage.setItem("color-theme", !state.isDark ? "dark" : "light");
  };

  const toggleSidebar = (boolean) => (event) => {
    if (!state.withSidebar) {
      return;
    }

    if (
      event &&
      event.target.closest(".MuiListItem-root") !== null &&
      event.target.closest("a") === null
    ) {
      return;
    }

    setState((state) => ({
      ...state,
      isSidebarOpen: boolean,
    }));
  };

  const currentTheme = state.isDark ? darkTheme : lightTheme;
  const theme = state.didLoad ? currentTheme : transformTheme(currentTheme);
  const panelLayout = state.didLoad
    ? panelsStyle[layout !== undefined ? layout : 0]
    : transformTheme(panelsStyle[state.layoutIndex]);

  const pagePathKeys =
    !pagePath || pagePath === "/dev-404-page/" || pagePath === "/404.html"
      ? ["404"]
      : pagePath.split("/").slice(1, -1);
  let helmetString = pagePathKeys.reduce(
    (string, key) => string[key],
    pageString
  );
  helmetString =
    pagePathKeys[0] === "404"
      ? helmetString
      : (isIndex ? helmetString.index : helmetString)?.helmet;

  return (
    <ThemeProvider
      theme={{
        ...theme,
        toggleTheme: toggleTheme,
        isDark: state.isDark,
        panelLayout: panelLayout,
      }}
    >
      <Head
        title={helmetString?.title || "TkfmToolbox"}
        description={helmetString?.description || ""}
        path={pagePath}
      />
      <Navbar withSidebar={state.withSidebar} toggleSidebar={toggleSidebar} />
      <div id="back-to-top-anchor" />
      {state.withSidebar && (
        <Sidebar open={state.isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <LayoutContext.Provider
        value={{
          layout: layout,
          setLayout: setLayout,
        }}
      >
        <Main>
          {withTabs ? (
            <WithTabs pagePath={pagePath}>{children}</WithTabs>
          ) : (
            children
          )}
        </Main>
      </LayoutContext.Provider>
      <BackToTop />
    </ThemeProvider>
  );
};

const Main = styled.main`
  padding: 1rem;
  height: 100%;
  min-height: calc(100vh - 56px);
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.onSurface};
`;

export default Layout;
