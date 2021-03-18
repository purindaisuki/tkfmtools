import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { fontFamily } from 'components/theme';
import LanguageProvider from './src/components/LanguageProvider';
import Layout from './src/components/Layout';
import PageWithTabs from './src/components/PageWithTabs';

const theme = createMuiTheme({
    typography: { fontFamily: fontFamily },
    palette: {
        secondary: {
            main: '#F48FB1',
        },
    },
})

export const wrapPageElement = ({ element, props }) => (
    <LanguageProvider pageContext={props.pageContext}>
        <ThemeProvider theme={theme}>
            <Layout>
                {props.pageContext.withTabLayout
                    ? <PageWithTabs
                        pagePath={props.pageContext.pagePath}
                    >
                        {element}
                    </PageWithTabs>
                    : element}
            </Layout>
        </ThemeProvider>
    </LanguageProvider>
)
