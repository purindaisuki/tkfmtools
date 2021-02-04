import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { ExpandMoreIcon } from './icon';
import { AccordionDetails, AccordionSummary } from '@material-ui/core';
import ItemShowcase from './ItemShowcase';
import ItemFilter from './ItemFilter';
import { StyledAccordion } from './StyledAccordion';
import data from './item.json'

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
`
const AccordionWrapper = styled.div`
    width: 60%;
    .MuiPaper-elevation1 {
        background-color: ${props => props.theme.colors.surface};
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: .25rem;
        box-shadow: 0 0 .15em lightgray;
    }
`
const StyledHomeAccordion = styled(StyledAccordion)`
    .MuiAccordionSummary-root,
    .MuiAccordionSummary-root.Mui-expanded {
        padding: .75rem 1.25rem;
        border-radius: .2rem;
    }
    .MuiAccordionSummary-root.Mui-expanded {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: 1px solid ${props => props.theme.colors.border};
    }
    .MuiAccordionSummary-expandIcon svg {
        width: 1.6rem;
        height: 1.6rem;
    }
    .MuiCollapse-container {
        font-size: medium;
        padding: .5rem 2rem;
        border-radius: .2rem;
    }
`

export function Home() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <HomeContainer>
            {/*[{
                    header: '關於本站',
                    content: '本站為',
                },
                {
                    header: '更新日誌',
                    content: '',
                },
                {
                    header: 'License',
                    content: '',
                },
            ]*/}
            <AccordionWrapper>
                <StyledHomeAccordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    <AccordionSummary expandIcon={ExpandMoreIcon}>
                        test
                    </AccordionSummary>
                    <AccordionDetails>
                        text
                    </AccordionDetails>
                </StyledHomeAccordion>
            </AccordionWrapper>
        </HomeContainer>
    )
}

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
        background-position-y: .75rem;
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

export function Potential(props) {
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
        >
            <Tab eventKey='overview' title='總覽'>
                <ItemShowcase
                    cardActiveKeys={props.cardActiveKeys}
                    handleCardClick={props.handleCardClick}
                />
            </Tab>
            <Tab eventKey='filter' title='篩選'>
                <ItemFilter
                    filterBtnValue={props.filterBtnValue}
                    filterBy={props.filterBy}
                    clearFilter={props.clearFilter}
                    dropTableItems={props.dropTableItems}
                    requestSort={props.requestSort}
                    getSortDirection={props.getSortDirection}
                />
            </Tab>
        </StyledTabs>
    )
}
const H3 = styled.h3`
    margin-right: auto;
    margin-top: 16rem;
    margin-left: auto;
    width: max-content;
    color: ${props => props.theme.colors.onSurface};
    a {
        color: ${props => props.theme.colors.link};
    }
    a:hover {
        color: ${props => props.theme.colors.linkHover};
    }
}
`
export const Enlist = () => {
    return (
        <H3>
            🚧施工中，請先移至
            <a href='https://purindaisuki.github.io/TenkafuMaRecruitFilter/'
                target="_blank" rel="noreferrer">現有版本</a>
        </H3>
    )
}