import React from 'react';
import styled from 'styled-components';
import { NewBadge } from './Icon';
import { ListGroup } from 'react-bootstrap';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';

const DescriptionWrapper = styled.div``

export const SiteDescription = (
    <>1</>
)


const UpdateMsg = styled(Accordion)`
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
export function SiteUpdateLog() {
    const [isExpanded, setExpanded] = React.useState(false)
    const handleChange = () => setExpanded(!isExpanded)

    return (
        <ListGroup>
            <ListGroup.Item>
                <UpdateMsg
                    expanded={isExpanded}
                    onChange={handleChange}
                    square={true}
                >
                    <AccordionSummary>
                        {NewBadge}
                    </AccordionSummary>
                    <AccordionDetails>
                        v0.1
                    </AccordionDetails>
                </UpdateMsg>
            </ListGroup.Item>
        </ListGroup>
    )
}

export const SiteLicense = (
    <>https://github.com/google/material-design-icons/blob/master/LICENSE</>
)


