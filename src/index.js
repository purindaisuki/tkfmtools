import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
    Nav, Navbar, Tab, Tabs
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ItemShowcase from './ItemShowcase';
import ItemFilter from './ItemFilter';
import './index.css';

const StyledTabs = styled(Tabs)`
    margin: 0 15px;
    + .tab-content {
        margin: 0 15px;
    }
    + .tab-content > .tab-pane {
        position: relative;
    }
`

function ItemInfoContainer() {
    return (
        <StyledTabs
            defaultActiveKey='filter'
            onClick={() => {
                //reset masonry
            }}
        >
            <Tab eventKey='view' title='總覽'>
                <ItemShowcase />
            </Tab>
            <Tab eventKey='filter' title='篩選'>
                <ItemFilter />
            </Tab>
        </StyledTabs>
    )
}

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
    background-color: white;
    background-position: 28px;
    background-repeat: no-repeat;
    background-size: 18px 18px;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 26px;
    background-image: url('/img/sun.svg');

    &:before {
        position: absolute;
        content: "";
        height: 18px; width: 18px;
        left: 4px; bottom: 4px;
        border-radius: 50%;
        background-color: #FFF8E1;
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

function MyNavbar() {
    return (
        <Navbar>
            <Navbar.Brand href="#">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    width="40"
                    viewBox="0 0 24 24"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
            </Navbar.Brand>
            <Nav className='ml-auto'>
                <ThemeSwitcherLabel>
                    <ThemeSwitcherSwither type="checkbox" />
                    <Slider />
                </ThemeSwitcherLabel>
            </Nav>
        </Navbar>
    )
}

// ========================================

ReactDOM.render(
    <MyNavbar />,
    document.querySelector('#nav-bar')
)

ReactDOM.render(
    <ItemInfoContainer />,
    document.querySelector('#main-container')
);