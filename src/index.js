import React from 'react';
import ReactDOM from 'react-dom';
import {
    Navbar, Nav, Tabs, Tab
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Masonry from 'masonry-layout';
import ItemShowcase from './ItemShowcase';
import ItemFilter from './ItemFilter';
import './index.css';

function ItemInfoContainer() {
    return (
        <Tabs defaultActiveKey='filter' className='container'>
            <Tab eventKey='view' title='總覽'>
                <ItemShowcase />
            </Tab>
            <Tab eventKey='filter' title='篩選'>
                <ItemFilter />
            </Tab>
        </Tabs>
    )
}

// ========================================

ReactDOM.render(
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
            <label className="color-mode-switch">
                <input type="checkbox" className="color-mode-checkbox" />
                <span className="slider"></span>
            </label>
        </Nav>
    </Navbar>,
    document.querySelector('#nav-bar')
)

ReactDOM.render(
    <ItemInfoContainer />,
    document.querySelector('#main-container')
);

var grid = document.querySelector('.card-container');
var msnry = new Masonry(grid, {
    columnWidth: '.container-sizer',
    gutter: '.gutter-sizer',
    itemSelector: '.card'
});