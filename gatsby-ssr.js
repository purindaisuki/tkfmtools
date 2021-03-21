import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import LineupDataProvider from 'containers/LineupDataProvider'
import TeamDataProvider from 'containers/TeamDataProvider';
import Layout from 'containers/Layout';
import WithTabs from 'containers/withTabs';
import LanguageProvider from 'containers/LanguageProvider';

import { fontFamily } from 'components/theme';

const PageWithLayout = ({ children, withTabLayout, pagePath }) => (
    <Layout>
        {withTabLayout
            ? <WithTabs pagePath={pagePath} >{children}</WithTabs>
            : children}
    </Layout>
)

const WithData = ({ children, withLineupData, withTeamData }) => (
    withLineupData
        ? <LineupDataProvider>
            {withTeamData ? <TeamDataProvider>{children}</TeamDataProvider> : children}
        </LineupDataProvider>
        : withTeamData ? <TeamDataProvider>{children}</TeamDataProvider> : children
)

export const wrapPageElement = ({ element, props }) => (
    <LanguageProvider pageContext={props.pageContext}>
        <PageWithLayout
            withTabLayout={props.pageContext.withTabLayout}
            pagePath={props.pageContext.pagePath}
        >
            <WithData
                withLineupData={props.pageContext.withLineupData}
                withTeamData={props.pageContext.withTeamData}
            >
                {element}
            </WithData>
        </PageWithLayout>
    </LanguageProvider>
)

const theme = createMuiTheme({
    typography: { fontFamily: fontFamily }
})

export const wrapRootElement = ({ element }) => (
    <ThemeProvider theme={theme}>
        {element}
    </ThemeProvider>
)
