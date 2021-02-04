import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import ItemShowcase from '../components/ItemShowcase';
import ItemFilter from '../components/ItemFilter';

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

export default function Potential(props) {
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
