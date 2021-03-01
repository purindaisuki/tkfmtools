import React from 'react';
import LanguageProvider from './src/components/LanguageProvider';
import Layout from './src/components/Layout';
import PageWithTabs from './src/components/PageWithTabs';
import MyThemeProvider from './src/components/MyThemeProvider';

export const wrapRootElement = ({ element }) => {
    return (
        <MyThemeProvider>
            {element}
        </MyThemeProvider>
    )
}

export const wrapPageElement = ({ element, props }) => {
    if (props.pageContext.withTabLayout) {
        return (
            <LanguageProvider pageContext={props.pageContext}>
                <Layout>
                    <PageWithTabs
                        pagePath={props.pageContext.pagePath}
                    >
                        {element}
                    </PageWithTabs>
                </Layout>
            </LanguageProvider>
        )
    } else {
        return (
            <LanguageProvider pageContext={props.pageContext}>
                <Layout>
                    {element}
                </Layout>
            </LanguageProvider>
        )
    }
}