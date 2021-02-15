import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { MainNavbar, Sidebar } from './components/Navbars';
import { lightTheme, darkTheme } from './components/Theme';
import LanguageProvider from './components/LanguageProvider';
import Home from './pages/Home';
import Enlist from './pages/Enlist';
import Potential from './pages/Potential';
import ToTopBtn from './components/ToTopBtn';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const Body = styled.div`
    min-height: 100vh;
    transition: background-color 355ms ease;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.onSurface};
`
const Main = styled.main`
    padding: 1rem;
`

export default function App() {
    const getDefaultTheme = () => {
        const localSetting = localStorage.getItem('color-theme')
        if (localSetting) {
            return localSetting
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    }

    const [pageConfig, setPageConfig] = useState({
        theme: getDefaultTheme(),
        sidebarOpen: false
    })

    const toggleTheme = (event) => {
        // ignore tab and shift key
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        const toTheme = pageConfig.theme === 'light' ? 'dark' : 'light'
        setPageConfig((state) => ({
            ...state,
            theme: toTheme
        }))
        localStorage.setItem('color-theme', toTheme)
    }

    const toggleSidebar = (toOpen) => (event) => {
        if (
            (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) ||
            event.target.closest('.MuiAccordion-root') !== null
        ) {
            return;
        }
        setPageConfig((state) => ({
            ...state,
            sidebarOpen: toOpen
        }))
    };

    return (
        <LanguageProvider>
            <ThemeProvider
                theme={pageConfig.theme === 'light' ? lightTheme : darkTheme}
            >
                <Body>
                    <MainNavbar
                        checked={pageConfig.theme === 'dark'}
                        toggleTheme={toggleTheme}
                        toggleSidebar={toggleSidebar}
                    />
                    <Sidebar
                        open={pageConfig.sidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                    <Main>
                        <Route
                            path='/'
                            exact
                            render={() => <Home />}
                        />
                        <Route
                            path='/potential'
                            render={() => <Potential />}
                        />
                        <Route
                            path='/enlist'
                            render={() => <Enlist />}
                        />
                    </Main>
                    <ToTopBtn />
                </Body>
            </ThemeProvider>
        </LanguageProvider>
    )
}