import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs } from 'react-bootstrap';
import styled, { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import ItemShowcase from './ItemShowcase';
import ItemFilter from './ItemFilter';
import StyledNavbar from './StyledNavbar';
import { lightTheme, darkTheme } from './Theme';

const StyledTabs = styled(Tabs)`
    display: flex;
    margin: 0 1rem;
    font-size: large;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    + .tab-content {
        margin: 1rem;
    }
    + .tab-content > .tab-pane {
        position: relative;
    }
    > a {
        display: inline;
        padding-left: 1.8rem;
        color: ${props => props.theme.colors.onSurface};
        border-radius: .25rem .25rem 0 0;
        background-repeat: no-repeat;
        background-size: 1.2rem;
        background-position-x: .4rem;
        background-position-y: .85rem;
    }
    > .active {
        border: 1px solid ${props => props.theme.colors.border};
        border-bottom: none;
        box-shadow: 0 1px ${props => props.theme.colors.background}
    }
    a:nth-of-type(1) {
        background-image:url('/img/overview.svg');
    }
    a:nth-of-type(2) {
        background-image:url('/img/filter.svg');
    }
`

function ItemInfoContainer() {
    const getDefaultTab = () => {
        let localSetting = localStorage.getItem('select-tab')
        if (localSetting) {
            return localSetting
        }
        return 'filter'
    }
    const [tab, setTab] = useState(getDefaultTab)

    const handleTabChange = () => {
        let toTab = tab === 'filter' ? 'overview' : 'filter'
        setTab(toTab)
        localStorage.setItem('select-tab', toTab)
    }
    
    return (
        <StyledTabs
            defaultActiveKey={getDefaultTab}
            onSelect={handleTabChange}
            bsPrefix='escape'
            mountOnEnter={true}
        >
            <Tab eventKey='overview' title='總覽'>
                <ItemShowcase />
            </Tab>
            <Tab eventKey='filter' title='篩選'>
                <ItemFilter />
            </Tab>
        </StyledTabs>
    )
}

const Body = styled.div`
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background};
`
const Main = styled.main`
    padding:1rem
`

function App() {
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

    const handleThemeChange = () => {
        let toTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(toTheme)
        localStorage.setItem('color-theme', toTheme)
    }

    return (
        <ThemeProvider
            theme={theme === 'light' ? lightTheme : darkTheme}
            prefixes={{ btn: 'escape' }}
        >
            <Body>
                <StyledNavbar
                    onChange={() => handleThemeChange()}
                    checked={theme === 'dark'}
                />
                <Main>
                    <ItemInfoContainer themeVariant={theme === 'light' ? 'light' : 'dark'} />
                </Main>
            </Body>
        </ThemeProvider>
    )
}

// ========================================

ReactDOM.render(
    <App />,
    document.querySelector('.root')
)
