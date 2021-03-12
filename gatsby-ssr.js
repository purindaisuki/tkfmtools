import React from 'react';
import LanguageProvider from './src/components/LanguageProvider';
import Layout from './src/components/Layout';
import PageWithTabs from './src/components/PageWithTabs';

export const wrapPageElement = ({ element, props }) => (
    <LanguageProvider pageContext={props.pageContext}>
        <Layout>
            {props.pageContext.withTabLayout
                ? <PageWithTabs
                    pagePath={props.pageContext.pagePath}
                >
                    {element}
                </PageWithTabs>
                : element}
        </Layout>
    </LanguageProvider>
)
