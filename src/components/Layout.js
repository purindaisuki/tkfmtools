import React, { useState } from 'react';
import styled from 'styled-components';
import { MainNavbar, Sidebar } from './Navbars';
import ToTopBtn from './ToTopBtn';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const Body = styled.div`
    min-height: 100vh;
    transition: background-color 0.3s ease;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.onSurface};
`
const Main = styled.main`
    padding: 1rem;
`
export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = (toOpen) => (event) => {
        if (
            (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) ||
            event.target.closest('.MuiAccordion-root') !== null
        ) {
            return;
        }
        setSidebarOpen(toOpen)
    }

    return (
        <Body>
            <MainNavbar
                toggleSidebar={toggleSidebar}
            />
            <Sidebar
                open={sidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <Main>
                {children}
            </Main>
            <ToTopBtn />
        </Body>
    )
}
