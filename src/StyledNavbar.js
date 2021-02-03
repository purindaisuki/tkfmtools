import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const StyledNavigationbar = styled(Navbar)`
    background-color: ${props => props.theme.colors.pirmary};
`

const ThemeSwitcherLabel = styled.label`
    position: relative;
    display: inline-block;
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
const Svg = styled.svg`
    fill: ${props => props.theme.colors.onPrimary};
`
const Text = styled.span`
    font-size: x-large;
    font-weight: bold;
    color: ${props => props.theme.colors.onPrimary};
`

export default function StyledNavbar(props) {
    return (
        <StyledNavigationbar>
            <Navbar.Brand href="#">
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    width="40"
                    viewBox="0 0 24 24"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </Svg>
            </Navbar.Brand>
            <Text>天下布魔</Text>
            <Nav className='ml-auto'>
                <ThemeSwitcherLabel>
                    <ThemeSwitcherSwither
                        type="checkbox"
                        checked={props.checked}
                        onChange={props.onChange}
                    />
                    <Slider />
                </ThemeSwitcherLabel>
            </Nav>
        </StyledNavigationbar>
    )
}