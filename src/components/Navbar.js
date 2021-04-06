import React from 'react';
import { Location } from '@reach/router'
import styled, { useTheme } from 'styled-components';
import { AppBar, Toolbar } from '@material-ui/core';

import { useLanguage } from 'containers/LanguageProvider';

import DropDown from 'components/DropDown';
import IconButton from 'components/IconButton';
import LocalizedLink from 'components/LocalizedLink'
import { MenuIcon, LanguageIcon, } from 'components/icon';

import langConfig from 'languageConfig.json';
import SunIcon from 'images/sun.svg';
import MoonIcon from 'images/moon.svg';

const StyledLink = styled(LocalizedLink)`
    && {
        color: ${props => props.theme.colors.onSurface};
        font-size: medium;
        text-decoration: none;
    }
`
const LanguageButton = styled(IconButton)`
    && svg {
        fill: ${props => props.theme.colors.onPrimary};
    }
`
const langDropdownText = {
    'zh-TW': '繁體中文',
    'en': 'English',
    'jp': '日本語',
    'kr': '한국어'
}

function LanguageSwitcher() {
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
                    <DropDown
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
const MenuButton = styled(IconButton)`
    && svg {
        fill: ${props => props.theme.colors.onPrimary};
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
const Navbar = ({ toggleSidebar }) => {
    const { userLanguage, pageString } = useLanguage()

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

    return (<>
        <StyledNavbar position='sticky'>
            <Toolbar>
                <div>
                    <MenuButton
                        edge="start"
                        onClick={toggleSidebar(true)}
                        tooltipText={pageString.navbar.menuButton}
                        aria-label='menu'
                    >
                        {MenuIcon}
                    </MenuButton>
                    <Text>{title}</Text>
                </div>
                <div>
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
            </Toolbar>
        </StyledNavbar>
    </>)
}

export default Navbar