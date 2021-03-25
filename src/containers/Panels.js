import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useLayoutConfig } from 'containers/Layout';

export const panelsStyle = [
    {
        display: "block",
        width: "100%",
        maxWidth: "1000px",
        margin: "auto",
        divDisplay: "block",
        divWidth: "100%",
        divMargin: "1rem 0",
        divDivMaxHeight: "none"
    },
    {
        display: "table",
        width: "calc(100% + 2rem)",
        maxWidth: "none",
        margin: "-1rem",
        divDisplay: "table-cell",
        divWidth: "60%",
        divMargin: "auto",
        divDivMaxHeight: "none",
        marginBottom: "0",
        borderSpacing: "1rem",
    }
]

const Container = styled.div`
    display: ${props => props.theme.panelLayout.display};
    width: ${props => props.theme.panelLayout.width};
    max-width: ${props => props.theme.panelLayout.maxWidth};
    margin: ${props => props.theme.panelLayout.margin};
    margin-bottom: ${props => props.theme.panelLayout.marginBottom};
    border-spacing: ${props => props.theme.panelLayout.borderSpacing};
    > div {
        display: ${props => props.theme.panelLayout.divDisplay};
        margin: ${props => props.theme.panelLayout.divMargin};
        > div {
            ${props => props.theme.panelLayout.divDivMaxHeight === 'var(--divDivMaxHeight)'
        ? `max-height: ${props.theme.panelLayout.divDivMaxHeight};` : ''};
        }
    }
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
                max-height: none;
            }
        }
    }
`
const OutlinedPanel = styled.div`
    display: table-cell;
    width: ${props => props.theme.panelLayout.divWidth === 'var(--divWidth)'
        ? props.theme.panelLayout.divWidth : props.$width};
    padding: 1rem;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.surface};
    box-shadow: 0 0 .15em ${props => props.theme.colors.shadow};
`
const HorizontalPanels = ({ children, panelsWidth, horizontal }) => {
    const { layout } = useLayoutConfig()

    const [isLandscape, setLandscape] = useState(true)

    useEffect(() => {
        setLandscape(layout === 1)
    }, [layout])

    return (
        <Container
            $horizontal={horizontal || isLandscape}
        >
            {children.map((child, i) => (
                <OutlinedPanel key={i} $width={panelsWidth[i]}>{child}</OutlinedPanel>
            ))}
        </Container>
    )
}

export default HorizontalPanels