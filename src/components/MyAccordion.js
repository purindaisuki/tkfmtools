import styled from 'styled-components';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

const StyledAccordion = styled(Accordion)`
    .MuiAccordion-root {
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
    }
    .MuiAccordionSummary-root,
    .MuiAccordionSummary-root.Mui-expanded {
        min-height: 0;
        transition: all 355ms ease;
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
    }
    .MuiAccordionSummary-content,
    .MuiAccordionSummary-content.Mui-expanded {
        transition: all 355ms ease;
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
    }
    .MuiAccordionSummary-expandIcon {
        padding: 0;
        svg {
            fill: ${props => props.theme.colors.secondary};
            margin: 0;
            width: 1.6rem;
            height: 1.6rem;
        }
    }
    .MuiCollapse-container {
        transition: all 355ms ease;
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
    }
`
export default function MyAccordion(props) {
    return (
        <StyledAccordion
            expanded={props.expanded}
            onChange={props.onChange}
            square={props.square}
        >
            <AccordionSummary
                expandIcon={props.expandIcon}
            >
                {props.title}
            </AccordionSummary>
            <AccordionDetails>
                {props.content}
            </AccordionDetails>
        </StyledAccordion>
    )
}
