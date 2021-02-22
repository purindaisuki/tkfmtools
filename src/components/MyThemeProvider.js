import React, { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../components/theme';

export const ThemeContext = createContext({
    theme: 'light',
})

export default function MyThemeProvider({ children }) {
    const getDefaultTheme = () => {
        if (typeof localStorage !== `undefined`) {
            const localSetting = localStorage.getItem('color-theme')
            if (localSetting) {
                return localSetting
            }
        }
        if (typeof window !== `undefined`) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark'
            }
        }
        return 'light'
    }

    const [theme, setTheme] = useState(getDefaultTheme())

    const toggleTheme = (event) => {
        // ignore tab and shift key
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        const toTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(toTheme)

        if (typeof localStorage !== `undefined`) {
            localStorage.setItem('color-theme', toTheme)
        }
    }

    const provider = {
        theme,
        toggleTheme: toggleTheme
    }

    return (
        <ThemeContext.Provider value={provider}>
            <ThemeProvider
                theme={theme === 'light' ? lightTheme : darkTheme}
            >
                {React.cloneElement(children, {
                    toggleTheme: toggleTheme,
                })}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
