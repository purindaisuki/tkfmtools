import React, { useState } from 'react';
import styled from 'styled-components';
import { List, ListItem, SwipeableDrawer } from '@material-ui/core';

import { useLanguage } from 'containers/LanguageProvider';

import LocalizedLink from 'components/LocalizedLink'
import Accordion from 'components/Accordion';
import navbarContent from 'components/navbarContent';
import { ExpandMoreIcon, ToolIcon } from 'components/icon';

const StyledListItem = styled(ListItem)`
    font-size: large;
    cursor: pointer;
    && {
        padding: 1rem 1.25rem;
        color: ${props => props.theme.colors.onSurface};
    }
    svg {
        fill: ${props => props.theme.colors.secondary};
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 1.25rem;
    }
    &:hover {
        border-left: .5rem solid ${props => props.theme.colors.secondary};
        background-color: rgba(0, 0, 0, 0.04);
        .MuiAccordion-root {
            background-color: rgba(0, 0, 0, 0.005);
            transition: none;
        }
    }
`
const ListItemAccordion = styled(Accordion)`
    && {
        width: 100%;
        cursor: default;
        .MuiAccordionSummary-root {
            margin: -1rem -1.25rem;
            padding : 1rem 1.25rem;
            padding-right: 1.75rem;
        }
        .MuiAccordionSummary-content {
            margin: 0;
        }
        .MuiAccordionDetails-root {
            margin: 0 -1.25rem -1rem -1.25rem;
            padding: 0 3.5rem;
            font-size: medium;
            cursor: default;
        }
        .MuiList-root {
            padding-top: .5rem;
        }
    }
`
const AccordionItem = styled(ListItem)`
    && {
        padding: .5rem;
    }
    color: ${props => props.theme.colors.link};
    &:hover {
        color: ${props => props.theme.colors.linkHover};
    }
`
const SidebarAccordions = ({
    icon,
    title,
    to,
    linkType,
    descriptions,
    expanded,
    onChange
}) => (
    <StyledListItem>
        <ListItemAccordion
            expanded={expanded}
            onChange={onChange}
            square
            expandIcon={ExpandMoreIcon}
            title={<>
                {icon}
                {title}
            </>}
            content={
                <StyledList>
                    {to.map((item, ind) => {
                        if (linkType === 'internal') {
                            return (
                                <AccordionItem
                                    component={LocalizedLink}
                                    to={item}
                                    decoration
                                    key={ind}
                                >
                                    {descriptions[ind]}
                                </AccordionItem>
                            )
                        }

                        return (
                            <AccordionItem
                                component='a'
                                href={item}
                                target='_blank'
                                key={ind}
                            >
                                {descriptions[ind]}
                            </AccordionItem>
                        )
                    })}
                </StyledList>
            }
        />
    </StyledListItem>
)

const SidebarItem = ({
    icon,
    title,
    to,
    expandable,
    linkType,
    descriptions,
    expanded,
    onChange
}) => {
    if (expandable) {
        return (
            <SidebarAccordions
                icon={icon}
                title={title}
                to={to}
                linkType={linkType}
                descriptions={descriptions}
                expanded={expanded}
                onChange={onChange}
            />
        )
    }

    return (
        <StyledListItem
            component={LocalizedLink}
            button
            to={to}
        >
            {icon}
            {title}
        </StyledListItem>
    )
}

const StyledDrawer = styled(SwipeableDrawer)`
    .MuiDrawer-paper {
        background-color: ${props => props.theme.colors.surface};
        width: 20rem;
    }
`
const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    height: 4rem;
    padding: .8rem;
    border-radius: 0;
    font-size: x-large;
    @media screen and (max-width: 490px) {
        font-size: large;
    }
    font-weight: bold;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.onPrimary};
    svg {
        fill: ${props => props.theme.colors.onPrimary};
        margin: .4rem 1.25rem .4rem .6rem;
        width: 1.6rem;
        height 1.6rem;
        vertical-align: bottom;
    }
`
const StyledList = styled(List)`
    && {
        padding: 0;
    }
`
const officialLink = {
    'zh-TW': 'https://www.tenkafuma.com/',
    'en': 'https://www.tenkafuma.com/en/',
    'jp': 'https://www.tenkafuma.com/jp/',
    'kr': 'https://www.tenkafuma.com/en/'
}

const Sidebar = ({ open, toggleSidebar }) => {
    const { isDefault, userLanguage, pageString } = useLanguage()

    const [expanded, setExpanded] = useState()

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

    return (
        <StyledDrawer
            open={open}
            onClose={toggleSidebar(false)}
            onOpen={toggleSidebar(true)}
            onClick={toggleSidebar(false)}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
        >
            <SidebarHeader>
                {ToolIcon}
                {pageString.index.helmet.title}
            </SidebarHeader>
            <StyledList>
                {navbarContent(userLanguage, isDefault).map((item, ind) => (
                    <SidebarItem
                        {...item}
                        title={pageString.navbar.sidebar[ind].title}
                        expandable={item.expandable}
                        descriptions={
                            item.expandable
                                ? pageString.navbar.sidebar[ind].descriptions
                                : undefined
                        }
                        expanded={expanded === ind}
                        onChange={handleExpand(ind)}
                        key={ind}
                    />
                ))}
            </StyledList>
        </StyledDrawer>
    )
}

export default Sidebar