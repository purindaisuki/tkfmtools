import React from 'react';
import styled from 'styled-components';
import { AccordionDetails, AccordionSummary } from '@material-ui/core';
import { ExpandMoreIcon } from '../components/Icon';
import { StyledAccordion } from '../components/StyledAccordion';
import { SiteDescription, SiteUpdateLog, SiteLicense } from '../components/SiteAccordionBody'

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const Header = styled.div`
    width: 60%;
    @media screen and (max-width: 992px) {
        width: 80%;
    }
    @media screen and (max-width: 624px) {
        width: 90%;
    }
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: x-large;
    font-weight: bold;
    color: ${props => props.theme.colors.onSurface};
`
const AccordionWrapper = styled.div`
    width: 60%;
    @media screen and (max-width: 992px) {
        width: 80%;
    }
    @media screen and (max-width: 624px) {
        width: 90%;
    }
    margin-bottom: 2rem;
    > .MuiPaper-elevation1 {
        background-color: ${props => props.theme.colors.surface};
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: .25rem;
        box-shadow: 0 0 .15em lightgray;
    }
`
const StyledHomeAccordion = styled(StyledAccordion)`
    > .MuiAccordionSummary-root,
    > .MuiAccordionSummary-root.Mui-expanded {
        padding: .75rem 1.25rem;
        border-radius: .2rem;
    }
    > .MuiAccordionSummary-root {
        border-bottom: 1px solid ${props => props.theme.colors.surface};
        > .MuiAccordionSummary-expandIcon svg {
            width: 1.6rem;
            height: 1.6rem;
        }
    }
    > .MuiAccordionSummary-root.Mui-expanded {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom: 1px solid ${props => props.theme.colors.border};
    }
    > .MuiCollapse-container {
        border-radius: .2rem;
        > div > div > div > .MuiAccordionDetails-root {
            margin: 1rem;
            padding: 0;
        }
    }
`
const StyledAccordionHeader = styled(AccordionSummary)`
    font-size: large;
`

export default function Home() {
    const [expanded, setExpanded] = React.useState(0);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    React.useEffect(() => {
        document.title = '天下布魔工具箱'
    })

    return (
        <HomeContainer>
            <Header>天下布魔工具箱 v1.0</Header>
            {[
                {
                    header: '關於本站',
                    body: <SiteDescription />,
                },
                {
                    header: '更新日誌',
                    body: <SiteUpdateLog />,
                },
                {
                    header: 'License',
                    body: <SiteLicense />,
                },
            ].map((item, idx) => (
                <AccordionWrapper key={idx}>
                    <StyledHomeAccordion
                        expanded={expanded === idx}
                        onChange={handleExpand(idx)}
                    >
                        <StyledAccordionHeader
                            expandIcon={ExpandMoreIcon}
                        >
                            {item.header}
                        </StyledAccordionHeader>
                        <AccordionDetails>
                            {item.body}
                        </AccordionDetails>
                    </StyledHomeAccordion>
                </AccordionWrapper>
            ))}
        </HomeContainer>
    )
}
