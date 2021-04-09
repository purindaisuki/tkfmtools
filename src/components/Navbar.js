import React from 'react';
import { Location } from '@reach/router'
import styled, { useTheme } from 'styled-components';
import { AppBar, Button, Toolbar } from '@material-ui/core';

import { useLanguage } from 'containers/LanguageProvider';

import DropDown from 'components/DropDown';
import IconButton from 'components/IconButton';
import LocalizedLink from 'components/LocalizedLink';
import navbarContent from 'components/navbarContent';
import { MenuIcon, LanguageIcon, ToolIcon } from 'components/icon';

import langConfig from 'languageConfig.json';
import SunIcon from 'images/sun.svg';
import MoonIcon from 'images/moon.svg';

const NavButton = styled(IconButton)`
    && svg {
        fill: ${props => props.theme.colors.onPrimary};
    }
`
const StyledDropDown = styled(DropDown)`
    && .MuiListItem-root {
        padding: 0;
    }
`
const StyledLink = styled(LocalizedLink)`
    width: 100%;
    padding: .4rem 1rem;
    color: ${props => props.theme.colors.onSurface};
    font-size: medium;
    text-decoration: none;
`
const NavbarLink = styled(StyledLink)`
    width: auto;
    padding: .6rem;
    color: ${props => props.theme.colors.onPrimary + (props.$active ? '' : 'BF')};
    ${props => props.$active ?
        'text-shadow: 0 0 10px #fff,0 0 10px #fff8;' : ''}
    &:hover {
        color: ${props => props.theme.colors.onPrimary};
        text-shadow: 0 0 10px #fff,0 0 10px #fff8;
    }
    @media screen and (min-width: 1200px) {
        padding: .8rem;
        font-size: 1.2rem;
    }
`
const StyledA = styled.a`
    width: 100%;
    padding: .4rem 1rem;
    color: ${props => props.theme.colors.onSurface};
    font-size: medium;
    text-decoration: none;
`
const TextButton = styled(Button)`
    && {
        padding: .6rem;
        color: ${props => props.theme.colors.onPrimary + (props.$active ? '' : 'BF')};
        ${props => props.$active ?
        'text-shadow: 0 0 10px #fff,0 0 10px #fff8;' : ''}
        &:hover {
            color: ${props => props.theme.colors.onPrimary};
            text-shadow: 0 0 10px #fff,0 0 10px #fff8;
        }
        font-size: medium;
        .MuiButton-label {
            line-height: normal;
            text-transform: none;
        }
        @media screen and (min-width: 1200px) {
            padding: .8rem;
            font-size: 1.2rem;
        }
    }
`
const DesktopNavbar = () => {
    const { isDefault, userLanguage, pageString } = useLanguage()

    return (
        <div>
            <LocalizedLink to='/'>
                <NavButton
                    edge="start"
                    tooltipText={pageString.index.name}
                    aria-label={pageString.index.name}
                >
                    {ToolIcon}
                </NavButton>
            </LocalizedLink>
            {navbarContent(userLanguage, isDefault).map((item, ind) => (
                ind === 0 ? null
                    : item.expandable
                        ? <StyledDropDown
                            button={
                                <TextButton
                                    disableFocusRipple
                                >
                                    {pageString.navbar.sidebar[ind].title}
                                </TextButton>
                            }
                            buttonActive={window?.location.pathname.includes(item.to[0])}
                            items={item.to.map((link, linkInd) => ({
                                id: pageString.navbar.sidebar[ind].descriptions[linkInd],
                                to: link,
                                description: pageString.navbar.sidebar[ind].descriptions[linkInd]
                            }))}
                            renderItem={(dropdownItem) => (
                                item.linkType === 'internal'
                                    ? <StyledLink
                                        to={dropdownItem.to}
                                    >
                                        {dropdownItem.description}
                                    </StyledLink>
                                    : <StyledA
                                        href={dropdownItem.to}
                                        target='_blank'
                                        key={ind}
                                    >
                                        {dropdownItem.description}
                                    </StyledA>
                            )}
                            closeOnclick
                            ariaId={pageString.navbar.sidebar[ind].title}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            key={ind}
                        />
                        : <NavbarLink
                            to={item.to}
                            $active={window?.location.pathname.includes(item.to)}
                            key={ind}
                        >
                            {pageString.navbar.sidebar[ind].title}
                        </NavbarLink>
            ))}
        </div>
    )
}

const LanguageButton = styled(IconButton)`
    && svg {
        fill: ${props => props.theme.colors.onPrimary};
    }
`
const langDropdownText = {
    'zh-TW': '繁體中文',
    'en': 'English'
}

const LanguageSwitcher = () => {
    const { userLanguage, isDefault, pageString } = useLanguage()

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

                return (
                    <StyledDropDown
                        button={
                            <LanguageButton
                                tooltipText={pageString.navbar.languageSwitchTooltip}
                            >
                                {LanguageIcon}
                            </LanguageButton>
                        }
                        items={Object.values(langConfig)
                            .map(lang => ({
                                id: lang.locale,
                                path: lang.default ? path : '/' + lang.locale + path,
                                text: langDropdownText[lang.locale]
                            }))}
                        renderItem={(item) => (
                            <StyledLink
                                to={item.path}
                                disableLocale
                            >
                                {item.text}
                            </StyledLink>
                        )}
                        closeOnclick
                        ariaId='language-switch'
                    />
                )
            }}
        </Location>
    )
}

const ThemeSwitcherLabel = styled.label`
    display: inline-block;
    position: relative;
    margin-bottom: 0;
    width: 3.2rem;
    height: 1.6rem;
`
const Slider = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 2rem;
    background-image: url(${props => props.$icon});
    background-position: ${props => props.$offset};
    background-repeat: no-repeat;
    background-size: 1rem 1rem;
    background-color: ${props => props.theme.colors.slider};
    cursor: pointer;
    transition: .3s;
    &:before {
        position: absolute;
        content: "";
        height: 1.2rem;
        width: 1.2rem;
        left: .2rem;
        bottom: .2rem;
        border-radius: 50%;
        background-color: #D7CCC8;
        -webkit-transition: .3s;
        transition: .3s;
    }
`
const ThemeSwitcherInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + ${Slider}:before {
        -webkit-transform: translateX(1.6rem);
        -ms-transform: translateX(1.6rem);
        transform: translateX(1.6rem);
    }
`
const ThemeSwitcher = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <ThemeSwitcherLabel>
            <ThemeSwitcherInput
                type='checkbox'
                checked={isDark}
                onChange={toggleTheme}
                onKeyDown={toggleTheme}
            />
            <Slider
                $icon={isDark ? MoonIcon : SunIcon}
                $offset={isDark ? '.4rem' : '1.8rem'}
            />
        </ThemeSwitcherLabel>
    )
}

const StyledNavbar = styled(AppBar)`
    && > div {
        display: flex;
        justify-content: space-between;
        z-index: 3;
        min-height: 56px;
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.onPrimary};
        > div {
            display: flex;
            align-items: center;
        }
    }
`
const Text = styled.div`
    font-size: x-large;
    font-weight: bold;
    line-height: normal;
    @media screen and (max-width: 490px) {
        font-size: 1.2rem;
    }
`
const Navbar = ({ withSidebar, toggleSidebar }) => {
    const { userLanguage, pageString } = useLanguage()

    let title = ''
    if (withSidebar) {
        // update mainbar title
        title = pageString.index.helmet.title
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
    }

    return (
        <StyledNavbar position='sticky'>
            <Toolbar>
                {withSidebar
                    ? <div>
                        <NavButton
                            edge="start"
                            onClick={toggleSidebar(true)}
                            tooltipText={pageString.navbar.menuButton}
                            aria-label='menu'
                        >
                            {MenuIcon}
                        </NavButton>
                        <Text>{title}</Text>
                    </div>
                    : <DesktopNavbar />}
                <div>
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
            </Toolbar>
        </StyledNavbar>
    )
}

export default Navbar