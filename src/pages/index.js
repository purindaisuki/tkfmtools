import React from 'react';
import styled from 'styled-components';
import Layout from "../components/Layout";
import MyAccordion from '../components/MyAccordion';
import {
    SiteDescription,
    SiteUpdateLog,
    SiteLicense
} from '../components/SiteAccordionBody';
import { LanguageContext } from '../components/LanguageProvider';
import { ExpandMoreIcon } from '../components/icon';

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    &&& > div {
        margin-bottom: 2rem;
    }
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
const DescriptionAccordion = styled(MyAccordion)`
    && {
        width: 60%;
        @media screen and (max-width: 992px) {
            width: 80%;
        }
        @media screen and (max-width: 624px) {
            width: 90%;
        }
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: .25rem;
        & {
            box-shadow: 0 0 .15em lightgray;
        }
        > .MuiAccordionSummary-root {
            font-size: large;
            padding: .75rem 1.25rem;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom: 0px solid ${props => props.theme.colors.border};
        }
        > .MuiAccordionSummary-root.Mui-expanded {
            border-bottom: 1px solid ${props => props.theme.colors.border};
        }
        .MuiAccordionDetails-root {
            margin: 1rem;
            padding: 0;
        }
    }
`
export default function home() {
    const { pageString } = React.useContext(LanguageContext)

    const [expanded, setExpanded] = React.useState(0)

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    React.useEffect(() => {
        document.title = pageString.home.documentTitle
    })

    return (
        <Layout>
            <HomeContainer>
                <Header>
                    {`${pageString.home.documentTitle} ${pageString.home.updateLog.content[0].version}`}
                </Header>
                {[
                    {
                        header: pageString.home.about.header,
                        body: <SiteDescription />,
                    },
                    {
                        header: pageString.home.updateLog.header,
                        body: <SiteUpdateLog />,
                    },
                    {
                        header: pageString.home.license.header,
                        body: <SiteLicense />,
                    },
                ].map((item, idx) => (
                    <DescriptionAccordion
                        expanded={expanded === idx}
                        onChange={handleExpand(idx)}
                        square={false}
                        expandIcon={ExpandMoreIcon}
                        title={item.header}
                        content={item.body}
                        key={idx}
                    />
                ))}
            </HomeContainer>
        </Layout>
    )
}
