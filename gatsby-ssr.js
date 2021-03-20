import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { fontFamily } from 'components/theme';
import LanguageProvider from 'components/LanguageProvider';
import LineupDataProvider from 'components/LineupDataProvider'
import TeamDataProvider from 'components/TeamDataProvider';
import Layout from 'components/Layout';
import PageWithTabs from 'components/PageWithTabs';

const theme = createMuiTheme({
    typography: { fontFamily: fontFamily }
})

const PageWithLayout = ({ children, withTabLayout, pagePath }) => (
    <Layout>
        {withTabLayout
            ? <PageWithTabs pagePath={pagePath} >{children}</PageWithTabs>
            : children}
    </Layout>
)

const PageWithData = ({ children, withLineupData, withTeamData }) => (
    withLineupData
        ? <LineupDataProvider>
            {withTeamData ? <TeamDataProvider>{children}</TeamDataProvider> : children}
        </LineupDataProvider>
        : withTeamData ? <TeamDataProvider>{children}</TeamDataProvider> : children
)

export const wrapPageElement = ({ element, props }) => (
    <LanguageProvider pageContext={props.pageContext}>
        <ThemeProvider theme={theme}>
            <PageWithLayout
                withTabLayout={props.pageContext.withTabLayout}
                pagePath={props.pageContext.pagePath}
            >
                <PageWithData
                    withLineupData={props.pageContext.withLineupData}
                    withTeamData={props.pageContext.withTeamData}
                >
                    {element}
                </PageWithData>

            </PageWithLayout>
        </ThemeProvider>
    </LanguageProvider>
)
