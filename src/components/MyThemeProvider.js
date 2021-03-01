import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../components/theme';

export const ThemeContext = createContext({
    theme: 'light',
})

export default function MyThemeProvider({ children }) {
    const [theme, setTheme] = useState('light')

    // get user theme
    useEffect(() => {
        const localSetting = localStorage.getItem('color-theme')
        if (localSetting) {
            setTheme(localSetting)
            return
        }
        
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
        }
    }, [])

    const toggleTheme = (event) => {
        // ignore tab and shift key
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        const toTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(toTheme)

        localStorage.setItem('color-theme', toTheme)
    }

    const provider = {
        theme: theme,
        toggleTheme: toggleTheme
    }

    return (
        <ThemeContext.Provider value={provider}>
            <ThemeProvider
                theme={theme === 'light' ? lightTheme : darkTheme}
            >
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
