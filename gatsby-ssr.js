import React from 'react';
import LanguageProvider from './src/components/LanguageProvider';
import MyThemeProvider from './src/components/MyThemeProvider';

export const wrapRootElement = ({ element }) => {
    return (
        <MyThemeProvider>
            {element}
        </MyThemeProvider>
    )
}

export const wrapPageElement = ({ element, props }) => {
    return (
        <LanguageProvider pageContext={props.pageContext}>
            {element}
        </LanguageProvider>
    )
}