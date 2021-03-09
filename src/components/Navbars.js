import React, { useContext, useState } from 'react';
import { Location } from "@reach/router"
import styled from 'styled-components';
import { Drawer } from '@material-ui/core';
import { Dropdown, DropdownButton, ListGroup, Nav, Navbar } from 'react-bootstrap';
import LocalizedLink from './LocalizedLink'
import MyAccordion from './MyAccordion';
import { LanguageContext } from './LanguageProvider';
import { ThemeContext } from './MyThemeProvider';
import {
    RaceIcon,
    ChestIcon,
    EnlistIcon,
    ExpandMoreIcon,
    FeedbackIcon,
    HomeIcon,
    LinkIcon,
    MenuIcon,
    ToolIcon,
    LanguageIcon,
    AnalysisIcon,
} from './icon';
import SunIcon from 'images/sun.svg';
import MoonIcon from 'images/moon.svg';

const StyledLanguageSwitcher = styled(DropdownButton)`
    padding: 0;
    margin-right: 1.25rem;
    &&&& button {
        margin: 0;
        padding: 0;
        border: none;
        color: inherit;
        background-color: inherit;
        &:focus,
        &:active {
            background-color: inherit;
            box-shadow: none;
        }
    }
    svg {
        width: 1.4rem;
        height: 1.4rem;
        fill: ${props => props.theme.colors.onPrimary};
    }
    &&&& .dropdown-menu {
        top: 120%;
        border: none;
        background-color: ${props => props.theme.colors.surface};
        box-shadow: 0 0 .15em ${props => props.theme.colors.shadow};
        a {
            padding: .5rem .5rem;
            color: ${props => props.theme.colors.onSurface};
            :hover, :focus {
                background-color: ${props => props.theme.colors.dropdownHover};
            }
        }
        a.active {
            color: ${props => props.theme.colors.onSecondary};
            background-color: ${props => props.theme.colors.secondary};
        }
    }
`
function LanguageSwitcher() {
    const { userLanguage, isDefault, setUserLanguage } = useContext(LanguageContext)

    const handleUserLanguage = (key, event) => setUserLanguage(key)

    return (
        <Location>
            {({ location }) => {
                let path
                if (location.pathname !== '/') {
                    let pathArray = location.pathname.split('/')
                    // remove locale prefix
                    if (!isDefault) {
                        pathArray.splice(pathArray.indexOf(userLanguage), 1)
                    }
                    // remove prefix path
                    if (__PATH_PREFIX__) {
                        pathArray.splice(pathArray.indexOf(__PATH_PREFIX__.slice(1)), 1)
                    }
                    path = pathArray.length === 1 ? '/' : pathArray.join('/')
                } else {
                    path = '/'
                }
                const enPath = '/en' + path

                return (
                    <StyledLanguageSwitcher
                        title={LanguageIcon}
                        onSelect={handleUserLanguage}
                        menuAlign='right'
                    >
                        <Dropdown.Item
                            as={LocalizedLink}
                            to={path}
                            disableLocale={true}
                            eventKey='zh-TW'
                        >
                            {'繁體中文'}
                        </Dropdown.Item>
                        <Dropdown.Item
                            as={LocalizedLink}
                            to={enPath}
                            disableLocale={true}
                            eventKey='en'
                        >
                            {'English'}
                        </Dropdown.Item>
                    </StyledLanguageSwitcher>
                )
            }}
        </Location>
    )
}

const StyledMainNavBar = styled(Navbar)`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.onPrimary};
    transition: all 355ms ease;
    padding: .6rem 1.25rem;
    position: sticky;
    top: 0;
    z-index: 2;
    a:nth-of-type(1) {
        padding: 0;
    }
`
const MenuBtn = styled(Navbar.Brand)`
    cursor: pointer;
    svg {
        width: 1.6rem;
        height: 1.6rem;
        fill: ${props => props.theme.colors.onPrimary};
        margin: .4rem;
        margin-top: .2rem;
    }
`
const Text = styled.div`
    font-size: x-large;
    @media screen and (max-width: 490px) {
        font-size: 1.2rem;
    }
    font-weight: bold;
    color: inherit;
`
const ThemeSwitcherLabel = styled.label`
    position: relative;
    display: inline-block;
    margin-bottom: 0;
    width: 3.2rem;
    height: 1.6rem;
`
const Slider = styled.div`
    position: absolute;
    cursor: pointer;
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: ${props => props.theme.colors.slider};
    background-position: ${props => props.theme.switcher.iconOffest};
    background-repeat: no-repeat;
    background-size: 1rem 1rem;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 2rem;
    background-image: url(${props => props.$icon});
    &:before {
        position: absolute;
        content: "";
        height: 1.2rem;
        width: 1.2rem;
        left: .2rem;
        bottom: .2rem;
        border-radius: 50%;
        background-color: #D7CCC8;
        -webkit-transition: .4s;
        transition: .4s;
    }
`
const ThemeSwitcherSwither = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + ${Slider} {
        &:before {
            -webkit-transform: translateX(1.6rem);
            -ms-transform: translateX(1.6rem);
            transform: translateX(1.6rem);
        }
    }
`
export function MainNavbar({
    toggleSidebar,
    handleLanguage,
}) {
    const { userLanguage, pageString } = useContext(LanguageContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    // update mainbar title
    let title = pageString.index.helmet.title
    if (typeof window !== `undefined`) {
        const pathArray = window.location.pathname.split('/')
        let titleString = pageString
        let flag = false
        for (let i = 0; i < pathArray.length; i++) {
            if (
                (__PATH_PREFIX__ && pathArray[i] === __PATH_PREFIX__.slice(1)) ||
                pathArray[i] === userLanguage ||
                pathArray[i].length === 0
            ) {
                continue
            }

            titleString = titleString[pathArray[i]]
            if (!titleString) {
                flag = false
                break
            }

            flag = true
        }

        if (flag) {
            if (titleString.name) {
                title = titleString.name
            } else if (titleString.index) {
                title = titleString.index.name
            }
        }
    }

    return (
        <StyledMainNavBar>
            <MenuBtn href='' onClick={toggleSidebar(true)}>
                <div>{MenuIcon}</div>
            </MenuBtn>
            <Text>{title}</Text>
            <Nav className='ml-auto'>
                <LanguageSwitcher
                    handleLanguage={handleLanguage}
                />
                <ThemeSwitcherLabel>
                    <ThemeSwitcherSwither
                        type='checkbox'
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        onKeyDown={toggleTheme}
                    />
                    <Slider
                        $icon={theme === 'dark' ? MoonIcon : SunIcon}
                    />
                </ThemeSwitcherLabel>
            </Nav>
        </StyledMainNavBar>
    )
}

const StyledListItem = styled(ListGroup.Item)`
    font-size: large;
    border: 0;
    padding: 1rem 1.25rem;
    background-color: inherit;
    color: ${props => props.theme.colors.onSurface};
    cursor: pointer;
    svg {
        fill: ${props => props.theme.colors.secondary};
        margin-right: 1.25rem;
        width: 1.6rem;
        height: 1.6rem;
    }
    &:hover {
        border-left: .5rem solid ${props => props.theme.colors.secondary};
    }
`
const ListItemAccordion = styled(MyAccordion)`
    && {
        cursor: default;
        && {
            margin: -1rem -1.25rem;
        }
        .MuiAccordionSummary-root {
            padding: 1rem 1.25rem;
            padding-right: 1.75rem;
        }
        .MuiAccordionSummary-content {
            margin: 0;
        }
        .MuiAccordionDetails-root {
            font-size: medium;
            padding: 0 4rem;
            cursor: default;
            a {
                padding-bottom: .5rem;
            }
        }
    }
`
const AccordionItem = styled(ListGroup.Item)`
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
            square={true}
            expandIcon={ExpandMoreIcon}
            title={
                <>
                    {icon}
                    {title}
                </>
            }
            content={
                <ListGroup>
                    {to.map((item, idx) => {
                        if (linkType === 'internal') {
                            return (
                                <AccordionItem
                                    as={LocalizedLink}
                                    to={item}
                                    decoration={true}
                                    key={idx}
                                >
                                    {descriptions[idx]}
                                </AccordionItem>
                            )
                        } else {
                            return (
                                <AccordionItem
                                    as='a'
                                    href={item}
                                    target='_blank'
                                    key={idx}
                                >
                                    {descriptions[idx]}
                                </AccordionItem>
                            )
                        }
                    })}
                </ListGroup>
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
        <LocalizedLink to={to}>
            <StyledListItem>
                {icon}
                {title}
            </StyledListItem>
        </LocalizedLink>
    )
}

const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        background-color: ${props => props.theme.colors.surface};
        width: 20rem;
    }
`
const SiderbaList = styled(ListGroup)`
    border-radius: 0;
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
        margin: .4rem;
        margin-right: 1.25rem;
        margin-bottom: .6rem;
        width: 1.6rem;
        height 1.6rem;
        vertical-align: bottom;
    }
`
export function Sidebar(props) {
    const { pageString } = useContext(LanguageContext)

    const [expanded, setExpanded] = useState(undefined)

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <StyledDrawer
            open={props.open}
            onClose={props.toggleSidebar(false)}
            onClick={props.toggleSidebar(false)}
            onKeyDown={props.toggleSidebar(false)}
        >
            <SiderbaList>
                <SidebarHeader>
                    {ToolIcon}
                    {pageString.index.helmet.title}
                </SidebarHeader>
                {[
                    {
                        to: '/',
                        icon: HomeIcon,
                        expandable: false,
                    },
                    {
                        icon: RaceIcon,
                        linkType: 'internal',
                        to: ["/characters/potential/", "/characters/stats/"],
                        expandable: true,
                    },
                    {
                        icon: EnlistIcon,
                        linkType: 'internal',
                        to: [
                            "/enlist/",
                            "/enlist/filter/"
                        ],
                        expandable: true,
                    },
                    {
                        icon: ChestIcon,
                        linkType: 'internal',
                        to: [
                            "/items/drop/",
                            "/items/drop/filter/"
                        ],
                        expandable: true,
                    },
                    {
                        to: '/analysis/',
                        icon: AnalysisIcon,
                        expandable: false,
                    },
                    {
                        icon: LinkIcon,
                        linkType: 'external',
                        to: [
                            "https://www.tenkafuma.com/",
                            "https://reurl.cc/5o5A7z/",
                            "https://reurl.cc/1gZ5nV/"
                        ],
                        expandable: true,
                    },
                    {
                        icon: FeedbackIcon,
                        linkType: 'external',
                        to: [
                            "https://forms.gle/VYMGibGfs36F9tdQ6",
                            "https://reurl.cc/E22vDa",
                            "https://reurl.cc/jqGAVL",
                            "https://peing.net/ja/b5295760aebf4c"
                        ],
                        expandable: true,
                    }
                ].map((item, idx) => (
                    <SidebarItem
                        {...item}
                        title={pageString.navbar[idx].title}
                        expandable={item.expandable}
                        descriptions={
                            item.expandable
                                ? pageString.navbar[idx].descriptions
                                : undefined
                        }
                        expanded={expanded === idx}
                        onChange={handleExpand(idx)}
                        key={idx}
                    />
                ))}
            </SiderbaList>
        </StyledDrawer>
    )
}
