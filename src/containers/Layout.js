import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { useLanguage } from 'containers/LanguageProvider';

import { lightTheme, darkTheme, fontFamily } from 'components/theme';
import { MainNavbar, Sidebar } from 'components/Navbars';
import ToTopBtn from 'components/ToTopBtn';

import langConfig from 'languangeConfig.json';
import 'bootstrap/dist/css/bootstrap.css';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    font-family:${props => props.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @media screen and (max-width: 490px) {
    html {
        font-size: .9em;
    }
  }
`
const Body = styled.div`
  min-height: 100vh;
  transition: background-color 0.3s ease;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.onSurface};
`
const Main = styled.main`
  padding: 1rem;
`
export default function Layout({ children }) {
  const { userLanguage, isDefault, pageString } = useLanguage()

  const [state, setState] = useState({
    theme: 'light',
    isSidebarOpen: false,
  })

  // get user theme
  useEffect(() => {
    const localSetting = localStorage.getItem('color-theme')
    if (localSetting) {
      setState(state => ({
        ...state,
        theme: localSetting
      }))
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setState(state => ({
        ...state,
        theme: 'dark'
      }))
    }
  }, [])

  const toggleTheme = (event) => {
    // ignore tab and shift key
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    const toTheme = state.theme === 'light' ? 'dark' : 'light'
    setState(state => ({
      ...state,
      theme: toTheme
    }))

    localStorage.setItem('color-theme', toTheme)
  }

  const toggleSidebar = (boolean) => (event) => {
    if (
      (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) ||
      event.target.closest('.MuiAccordion-root') !== null &&
      event.target.closest('a') === null
    ) return

    setState(state => ({
      ...state,
      isSidebarOpen: boolean
    }))
  }

  return (
    <ThemeProvider
      theme={state.theme === 'light'
        ? { ...lightTheme, toggleTheme: toggleTheme }
        : { ...darkTheme, toggleTheme: toggleTheme }}
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
      <GlobalStyle fontFamily={fontFamily} />
      <Body>
        <MainNavbar
          toggleSidebar={toggleSidebar}
        />
        <Sidebar
          open={state.isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Main>
          {children}
        </Main>
        <ToTopBtn />
      </Body>
    </ThemeProvider>
  )
}
