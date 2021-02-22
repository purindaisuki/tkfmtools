import React from 'react';
import LanguageProvider from './src/components/LanguageProvider';
import MyThemeProvider from './src/components/MyThemeProvider';

export const wrapRootElement = ({ element }) => (
    <MyThemeProvider><LanguageProvider>{element}</LanguageProvider></MyThemeProvider>
)
