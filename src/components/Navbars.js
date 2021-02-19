import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
    ChestIcon,
    EnlistIcon,
    ExpandMoreIcon,
    FeedbackIcon,
    HomeIcon,
    LinkIcon,
    MenuIcon,
    ToolIcon,
} from './Icon';
import MyAccordion from './MyAccordion';
import { Dropdown, DropdownButton, ListGroup, Nav, Navbar } from 'react-bootstrap';
import { Drawer } from '@material-ui/core';
import { LanguageIcon } from './Icon';
import { LanguageContext } from './LanguageProvider';

const StyledLanguageSwitcher = styled(DropdownButton)`
    padding: 0 1.25rem;
    button {
        margin: 0;
        padding: 0;
        border: none;
        transition: background-color 355ms ease;
        color: ${props => props.theme.colors.onPrimary};
        background-color: ${props => props.theme.colors.primary};
    }
    svg {
        width: 1.6rem;
        height: 1.6rem;
        fill: ${props => props.theme.colors.onPrimary};
    }
    .dropdown-menu {
        top: 120%;
        right: 0;
        border: none;
        background-color: ${props => props.theme.colors.surface};
        box-shadow: 0 0 .15em ${props => props.theme.colors.shadow};
        a:nth-of-type(1) {
            padding: .5rem .5rem;
        }
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
    const { setUserLanguage } = React.useContext(LanguageContext)

    const handleUserLanguage = (key, event) => setUserLanguage(key)

    return (
        <StyledLanguageSwitcher
            title={LanguageIcon}
            onSelect={handleUserLanguage}
            bsPrefix='escape'
        >
            <Dropdown.Item eventKey='zh-TW'>繁體中文</Dropdown.Item>
            <Dropdown.Item eventKey='en'>English</Dropdown.Item>
        </StyledLanguageSwitcher>
    )
}

const StyledMainNavBar = styled(Navbar)`
    background-color: ${props => props.theme.colors.primary};
    transition: all 355ms ease;
    padding: .8rem 1.25rem;
    align-item: end;
    position: sticky;
    top: 0;
    z-index: 2;
    a:nth-of-type(1) {
        padding: 0;
    }
`
const ThemeSwitcherLabel = styled.label`
    position: relative;
    display: inline-block;
    margin-bottom: 0;
    width: 52px;
    height: 26px;
`
const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: ${props => props.theme.colors.slider};
    background-position: ${props => props.theme.switcher.iconOffest};
    background-repeat: no-repeat;
    background-size: 18px 18px;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 26px;
    background-image: url(${props => props.theme.switcher.iconUrl});
    &:before {
        position: absolute;
        content: "";
        height: 18px; width: 18px;
        left: 4px; bottom: 4px;
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
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
        }
    }
`
const Text = styled(Link)`
    font-size: x-large;
    @media screen and (max-width: 490px) {
        font-size: 0;
    }
    font-weight: bold;
    color: ${props => props.theme.colors.onPrimary};
    &:hover {
        text-decoration: none;
        color: ${props => props.theme.colors.onPrimary};
    }
}
`
const Svg = styled.div`
    svg {
        width: 1.6rem;
        height: 1.6rem;
        fill: ${props => props.theme.colors.onPrimary};
        margin: .4rem;
        margin-top: .2rem;
    }
`

export function MainNavbar(props) {
    const { stringData } = React.useContext(LanguageContext)

    return (
        <StyledMainNavBar>
            <Navbar.Brand href='#' onClick={props.toggleSidebar(true)}>
                <Svg>{MenuIcon}</Svg>
            </Navbar.Brand>
            <Text to='/'>{stringData.home.documentTitle}</Text>
            <Nav className='ml-auto'>
                <LanguageSwitcher
                    handleLanguage={props.handleLanguage}
                />
                <ThemeSwitcherLabel>
                    <ThemeSwitcherSwither
                        type='checkbox'
                        checked={props.checked}
                        onChange={props.toggleTheme}
                        onKeyDown={props.toggleTheme}
                    />
                    <Slider />
                </ThemeSwitcherLabel>
            </Nav>
        </StyledMainNavBar>
    )
}

const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        background-color: ${props => props.theme.colors.surface};
        width: 20rem;
        @media screen and (max-width: 624px) {
            width: 20rem;
        }
    }
`
const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    height: 3.8rem;
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
const SiderbarList = styled(ListGroup)`
    border-radius: 0;
`
const SiderbarItem = styled(ListGroup.Item)`
    font-size: large;
    border: 0;
    padding: 1rem 1.25rem;
    background-color: ${props => props.theme.colors.surface};
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
const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`

export function Sidebar(props) {
    const { stringData } = React.useContext(LanguageContext)
    return (
        <StyledDrawer
            open={props.open}
            onClose={props.toggleSidebar(false)}
            onClick={props.toggleSidebar(false)}
            onKeyDown={props.toggleSidebar(false)}
        >
            <SiderbarList

            >
                <SidebarHeader>
                    {ToolIcon}
                    {stringData.home.documentTitle}
                </SidebarHeader>
                {[
                    {
                        to: '/',
                        icon: HomeIcon,
                        title: stringData.home.name,
                    },
                    {
                        to: '/enlist',
                        icon: EnlistIcon,
                        title: stringData.enlist.name,
                    },
                    {
                        to: '/potential',
                        icon: ChestIcon,
                        title: stringData.potential.name,
                    },
                ].map(item => (
                    <StyledLink key={item['title']} to={item['to']}>
                        <SiderbarItem>
                            {item['icon']}
                            {item['title']}
                        </SiderbarItem>
                    </StyledLink>
                ))}
            </SiderbarList>
            <SiderbarList>
                {[
                    LinkIcon,
                    FeedbackIcon
                ].map((item, idx) => (
                    <SidebarAccordions
                        icon={item}
                        key={idx}
                        title={stringData.navbar[idx].title}
                        links={stringData.navbar[idx].links}
                    />
                ))}
            </SiderbarList>
        </StyledDrawer>
    )
}

const AccordionWrapper = styled.div`
    margin: -1rem -1.25rem;
    cursor: default;
    .MuiAccordion-root {
        box-shadow: none;
    }
    .MuiAccordionSummary-root,
    .MuiAccordionSummary-root.Mui-expanded {
        padding: 1rem 1.25rem;
        padding-right: 1.75rem;
    }
    .MuiAccordionSummary-content,
    .MuiAccordionSummary-content.Mui-expanded {
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
`
const AccordionItem = styled(ListGroup.Item)`
    color: ${props => props.theme.colors.link};
    &:hover {
        color: ${props => props.theme.colors.linkHover};
    }
`

function SidebarAccordions(props) {
    const [isExpanded, setExpanded] = React.useState(false)

    return (
        <SiderbarItem>
            <AccordionWrapper>
                <MyAccordion
                    expanded={isExpanded}
                    onChange={() => setExpanded(!isExpanded)}
                    square={true}
                    expandIcon={ExpandMoreIcon}
                    title={
                        <>
                            {props.icon}
                            {props.title}
                        </>
                    }
                    content={
                        <ListGroup>
                            {props.links.map((item, idx) => (
                                <AccordionItem
                                    as='a'
                                    href={item.link}
                                    target='_blank'
                                    key={idx}
                                >
                                    {item.description}
                                </AccordionItem>
                            ))}
                        </ListGroup>
                    }
                />
            </AccordionWrapper>
        </SiderbarItem>
    );
}