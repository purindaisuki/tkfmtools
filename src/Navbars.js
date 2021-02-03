import React from 'react';
import { ListGroup, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { ChestIcon, EnlistIcon, FeedbackIcon, HomeIcon, MenuIcon, ToolIcon, } from './icon';

const StyledMainNavBar = styled(Navbar)`
    background-color: ${props => props.theme.colors.primary};
    padding: .8rem 1.25rem;
    align-item: end;
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
        vertical-align: middle;
    }
`

export const MainNavbar = (props) => (
    <StyledMainNavBar>
        <Navbar.Brand href="#" onClick={props.toggleSidebar(true)}>
            <Svg>{MenuIcon}</Svg>
        </Navbar.Brand>
        <Text to='/'>天下布魔</Text>
        <Nav className='ml-auto'>
            <ThemeSwitcherLabel>
                <ThemeSwitcherSwither
                    type="checkbox"
                    checked={props.checked}
                    onChange={props.toggleTheme}
                    onKeyDown={props.toggleTheme}
                />
                <Slider />
            </ThemeSwitcherLabel>
        </Nav>
    </StyledMainNavBar>
)
const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        background-color: ${props => props.theme.colors.surface};
        width: 20rem;
        @media screen and (max-width: 624px) {
            width: 16rem;
        }
    }
`
const SidebarHeader = styled.div`
    height: 3.9rem;
    padding: .8rem;
    border-radius: 0;
    font-size: x-large;
    font-weight: bold;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.onPrimary};
    svg {
        fill: ${props => props.theme.colors.onPrimary};
        margin: .4rem;
        margin-right: 1.25rem;
        width: 1.6rem;
        height 1.6rem;
        vertical-align: bottom;
    }
`
const SiderbarItem = styled(ListGroup.Item)`
    font-size: large;
    border: 0;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    cursor: pointer;
    svg {
        fill: ${props => props.theme.colors.secondary};
        margin-right: 1.25rem;
        width: 1.6rem;
        height: 1.6rem;
        vertical-align: text-bottom;
    }
    &:hover {
        border-left: .5rem solid ${props => props.theme.colors.secondary};
        box-shadow: inset 0 0 .25rem ${props => props.theme.colors.secondary};
    }
`
const StyledLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`

export const Sidebar = (props) => (
    <div>
        <React.Fragment>
            <StyledDrawer
                open={props.open}
                onClose={props.toggleSidebar(false)}
            >
                <ListGroup
                    onClick={props.toggleSidebar(false)}
                    onKeyDown={props.toggleSidebar(false)}
                >
                    <SidebarHeader>
                        {ToolIcon}
                        天下布魔工具箱
                    </SidebarHeader>
                    <StyledLink to='/'>
                        <SiderbarItem>
                            {HomeIcon}
                            首頁
                        </SiderbarItem>
                    </StyledLink>
                    <StyledLink  to='/enlist'>
                        <SiderbarItem>
                            {EnlistIcon}
                            全境徵才
                        </SiderbarItem>
                    </StyledLink>
                    <StyledLink to='potential'>
                        <SiderbarItem>
                            {ChestIcon}
                            潛力材料
                        </SiderbarItem>
                    </StyledLink>
                    <SiderbarItem>
                        {FeedbackIcon}
                        意見回饋
                    </SiderbarItem>
                </ListGroup>
            </StyledDrawer>
        </React.Fragment>
    </div>
)