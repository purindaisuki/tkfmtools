import React from 'react';
import styled from 'styled-components';

const ScrollableContainer = styled.div`
    overflow: auto;
    height: 100%;
    scrollbar-width: thin;
    padding-right: .5rem;
    margin-right: -.5rem;
    &::-webkit-scrollbar {
        width: .4rem;
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.border};
        border-radius: .25rem;
    }
    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-corner {
        background: ${props => props.theme.colors.surface};
    }
`

export default ScrollableContainer