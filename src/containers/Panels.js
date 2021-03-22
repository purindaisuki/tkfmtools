import React from 'react';
import styled from 'styled-components';

import { useLayoutConfig } from 'containers/Layout';

const Container = styled.div`
    display: table;
    width: calc(100% + 2rem);
    max-width: ${props => props.$maxWidth};
    margin: -1rem;
    margin-bottom: 0;
    border-spacing: 1rem;
    @media screen and (max-width: 1000px)
        ${props => props.$horizontal ? '' : ',(min-width: 0px)'} {
        display: block;
        width: 100%;
        max-width: 1000px;
        margin: auto;
        > div {
            display: block;
            width: 100%;
            margin: 1rem 0;
            > div {
                height: 100%;
            }
        }
    }
`
const OutlinedPanel = styled.div`
    display: table-cell;
    width: ${props => props.$width};
    padding: 1rem;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.surface};
    box-shadow: 0 0 .15em ${props => props.theme.colors.shadow};
`
const HorizontalPanels = ({ children, maxWidth, panelsWidth, horizontal }) => {
    const { isLandscape } = useLayoutConfig()

    return (
        <Container
            $maxWidth={maxWidth}
            $horizontal={horizontal || isLandscape}
        >
            {children.map((child, i) => (
                <OutlinedPanel key={i} $width={panelsWidth[i]}>{child}</OutlinedPanel>
            ))}
        </Container>
    )
}

export default HorizontalPanels