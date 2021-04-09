import React, { createContext, useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from 'styled-components';

import useSwitch from 'hooks/useSwitch';
import useWindowSize from 'hooks/useWindowSize';

import WithTabs from 'containers/withTabs';
import { panelsStyle } from 'containers/Panels';
import { useLanguage } from 'containers/LanguageProvider';

import { lightTheme, darkTheme } from 'components/theme';
import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import BackToTop from 'components/BackToTop';

import langConfig from 'languageConfig.json';
import 'components/global.css';

const transformTheme = (theme) => {
  const newTheme = {}
  Object.keys(theme).forEach((key) => {
    const value = theme[key]
    if (typeof value === 'object' && !!value) {
      newTheme[key] = transformTheme(value)
    } else {
      newTheme[key] = `var(--${key})`
    }
  })

  return newTheme
}

const LayoutContext = createContext()

export const useLayoutConfig = () => useContext(LayoutContext)

const Main = styled.main`
  padding: 1rem;
  height: 100%;
  min-height: calc(100vh - 56px);
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.onSurface};
`
export default function Layout({ children, withTabs, pagePath }) {
  const { userLanguage, isDefault, pageString } = useLanguage()

  const { layout, setLayout } = useSwitch('global-layout', [0, 1])

  const [width,] = useWindowSize()

  const [state, setState] = useState({
    isDark: false,
    layoutIndex: 1,
    didLoad: false,
    withSidebar: true,
    isSidebarOpen: false,
  })

  // get user theme
  useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = root.style.getPropertyValue('--initial-color-mode')
    const initLayout = root.style.getPropertyValue('--initial-layout')

    root.removeAttribute('style')

    setState(state => ({
      ...state,
      isDark: initialTheme === 'dark',
      layoutIndex: parseInt(initLayout),
      withSidebar: width <= 1000,
      didLoad: true
    }))
  }, [])

  useEffect(() => {
    setState(state => ({
      ...state,
      withSidebar: width <= 1000,
    }))
  }, [width])

  const toggleTheme = (event) => {
    // ignore tab and shift key
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState(state => ({
      ...state,
      isDark: !state.isDark
    }))

    localStorage.setItem('color-theme', !state.isDark ? 'dark' : 'light')
  }

  const toggleSidebar = (boolean) => (event) => {
    if (!state.withSidebar) {
      return
    }

    if (
      event.target.closest('.MuiListItem-root') !== null &&
      event.target.closest('a') === null
    ) {
      return
    }

    setState(state => ({
      ...state,
      isSidebarOpen: boolean
    }))
  }

  const currentTheme = state.isDark ? darkTheme : lightTheme
  const theme = state.didLoad ? currentTheme : transformTheme(currentTheme)

  const panelLayout = !state.didLoad ? transformTheme(panelsStyle[state.layoutIndex])
    : panelsStyle[layout !== undefined ? layout : 0]

  return (
    <ThemeProvider
      theme={{ ...theme, toggleTheme: toggleTheme, isDark: state.isDark, panelLayout: panelLayout }}
    >
      <Helmet
        htmlAttributes={{
          lang: userLanguage,
        }}
      >
        <meta charSet="utf-8" />
        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/tkfmtools/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/tkfmtools/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/tkfmtools/mstile-150x150.png" />
        <meta name="msapplication-square310x310logo" content="/tkfmtools/mstile-310x310.png" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <meta name="title" content={pageString.index.helmet.title} />
        <meta name="description" content={pageString.index.helmet.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={langConfig[userLanguage].ogLocale} />
        <meta property="og:title" content={pageString.index.helmet.title} />
        <meta property="og:description" content={pageString.index.helmet.description} />
        <meta
          property="og:url"
          content={`https://purindaisuki.github.io/tkfmtools/${isDefault
            ? '' : userLanguage}`}
        />
        <meta
          property="og:image"
          content={`https://purindaisuki.github.io/tkfmtools/website_preview_recruitment${isDefault
            ? '' : '_' + userLanguage}.png`}
        />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="756" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageString.index.helmet.title} />
        <meta property="twitter:description" content={pageString.index.helmet.description} />
        <meta
          property="twitter:url"
          content={`https://purindaisuki.github.io/tkfmtools/${isDefault
            ? '' : userLanguage}`}
        />
        <meta
          property="twitter:image"
          content={`https://purindaisuki.github.io/tkfmtools/website_preview_recruitment${isDefault
            ? '' : '_' + userLanguage}.png`}
        />
        <meta name="google-site-verification" content="F_IfmH-gHHQSs2j53dl-2l-zMqnWtwWOnfqdQiwLUow" />
        <title lang={userLanguage}>{pageString.index.helmet.title}</title>
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/tkfmtools/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/tkfmtools/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/tkfmtools/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/tkfmtools/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/tkfmtools/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/tkfmtools/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/tkfmtools/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/tkfmtools/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="/tkfmtools/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/tkfmtools/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/tkfmtools/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/tkfmtools/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/tkfmtools/favicon-128.png" sizes="128x128" />
        <link rel="manifest" href="/tkfmtools/manifest.json" />
      </Helmet>
      <Navbar
        withSidebar={state.withSidebar}
        toggleSidebar={toggleSidebar}
      />
      <div id='back-to-top-anchor' />
      {state.withSidebar && <Sidebar
        open={state.isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />}
      <LayoutContext.Provider value={{
        layout: layout,
        setLayout: setLayout
      }}>
        <Main>
          {withTabs
            ? <WithTabs pagePath={pagePath} >{children}</WithTabs>
            : children}
        </Main>
      </LayoutContext.Provider>
      <BackToTop />
    </ThemeProvider>
  )
}
