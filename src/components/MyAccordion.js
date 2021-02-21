import styled from 'styled-components';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

const StyledAccordion = styled(Accordion)`
    && {
        box-shadow: none;
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
        transition: all 0.3s ease;
        &.Mui-expanded {
            margin: 0;
        }
        > .MuiAccordionSummary-root {
            transition: border-bottom 0.3s ease;
            min-height: 0;
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
    }
`
export default function MyAccordion({
    className,
    expanded,
    onChange,
    square,
    expandIcon,
    title,
    content
}) {
    return (
        <StyledAccordion
            className={className}
            expanded={expanded}
            onChange={onChange}
            square={square}
        >
            <AccordionSummary
                expandIcon={expandIcon}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails>
                {content}
            </AccordionDetails>
        </StyledAccordion>
    )
}
