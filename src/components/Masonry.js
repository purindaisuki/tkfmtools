import React from 'react';
import styled from 'styled-components';
import CssMasonry from 'react-masonry-css';

const StyledMasonry = styled(CssMasonry)`
    display: flex;
    width: auto;
    margin-left: -1rem;
    > div {
        padding-left: 1rem;
    }
`
export default function Masonry({ children, breakpointCols }) {
    return (
        <StyledMasonry
            breakpointCols={breakpointCols}
            columnClassName=''
        >
            {children}
        </StyledMasonry>
    )
}
