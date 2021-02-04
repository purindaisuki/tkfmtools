import styled from 'styled-components';
import { Accordion } from '@material-ui/core';

export const StyledAccordion = styled(Accordion)`
.MuiAccordion-root {
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
}
.MuiAccordionSummary-root,
.MuiAccordionSummary-root.Mui-expanded {
    min-height: 0;
    transition: all 204ms ease;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
}
.MuiAccordionSummary-content,
.MuiAccordionSummary-content.Mui-expanded {
    transition: all 204ms ease;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
}
.MuiAccordionSummary-expandIcon svg {
    fill: ${props => props.theme.colors.secondary};
}
.MuiCollapse-container {
    transition: all 204ms ease;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
}
`