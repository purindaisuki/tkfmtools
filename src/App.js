import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { MainNavbar, Sidebar } from './Navbars';
import { lightTheme, darkTheme } from './Theme';
import { Enlist, Home, Potential } from './pages';

const Body = styled.div`
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background};
`
const Main = styled.main`
    padding: 1rem;
    @media screen and (max-width: 490px) {
        padding: 1rem 0;
    }
`

export default function App() {
    // theme
    const getDefaultTheme = () => {
        let localSetting = localStorage.getItem('color-theme')
        if (localSetting) {
            return localSetting
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    }

    const [theme, setTheme] = useState(getDefaultTheme)

    const toggleTheme = (event) => {
        // ignore tab and shift key
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        let toTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(toTheme)
        localStorage.setItem('color-theme', toTheme)
    }
    // sidebar
    const [open, setOpen] = useState(false)

    const toggleSidebar = (toOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(toOpen);
    };

    return (
        <ThemeProvider
            theme={theme === 'light' ? lightTheme : darkTheme}
        >
            <Body>
                <MainNavbar
                    checked={theme === 'dark'}
                    toggleTheme={toggleTheme}
                    toggleSidebar={toggleSidebar}
                />
                <Sidebar
                    open={open}
                    toggleSidebar={toggleSidebar}
                />
                <Main>
                    <Route path='/' exact component={Home} />
                    <Route
                        path='/potential'
                        component={() => (
                            <Potential />
                        )}
                    />
                    <Route
                        path='/enlist'
                        component={() => (
                            <Enlist />
                        )}
                    />
                </Main>
            </Body>
        </ThemeProvider>
    )
}