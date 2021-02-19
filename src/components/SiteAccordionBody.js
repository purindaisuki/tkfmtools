import React from 'react';
import styled from 'styled-components';
import { ChangeBadge, FixBadge, NewBadge } from './Icon';
import MyAccordion from './MyAccordion';
import { LanguageContext } from './LanguageProvider';

const BodyContainer = styled.div`
    width: 100%;
    font-size: .9rem;
    a {
        color: ${props => props.theme.colors.link};
        &:hover {
            color: ${props => props.theme.colors.linkHover};
        }
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    > div {
        margin-top: 1rem;
    }
    > div:first-child {
        margin-top: 0;
    }
`
const DescriptionContainer = styled.li`
    margin: 1rem 0;
    &:first-child {
        margin-top : 0;
    }
    &:last-child {
        margin-bottom : 0;
    }
`
const DescriptionHeader = styled.div`
    font-size: large;
    margin-bottom: .5rem;
`
const DescriptionBody = styled.div`
    margin: 0;
    p {
        margin: .3rem .5rem;
    }
`

export const SiteDescription = () => {
    const { stringData } = React.useContext(LanguageContext)

    return (
        <BodyContainer>
            <ul>
                {stringData.home.about.content.map((item, idx) => {
                    let Body
                    if (item.name === 'feedback') {
                        Body = () => (
                            <p>
                                {item.content[0]}
                                <a
                                    href='https://peing.net/ja/b5295760aebf4c'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {item.content[1]}
                                </a>
                                {item.content[2]}
                            </p>
                        )
                    } else if (item.name === 'reference') {
                        Body = () => (
                            item.content.map((refItem, idx) => {
                                if (idx === 3) {
                                    return <p key={idx}>{refItem}</p>
                                }
                                return (
                                    <p key={idx}>
                                        <a
                                            href={refItem.link}
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            {refItem.title}
                                        </a>
                                    </p>
                                )
                            })
                        )
                    } else {
                        Body = () => item.content
                            .map((text, idx) => <p key={idx}>{text}</p>)
                    }

                    return (
                        <DescriptionContainer key={idx}>
                            <DescriptionHeader>{item.header}</DescriptionHeader>
                            <DescriptionBody>
                                <Body />
                            </DescriptionBody>
                        </DescriptionContainer>
                    )
                })}
            </ul>
        </BodyContainer>
    )
}

const AccordionWrapper = styled.div`
    > .MuiAccordion-root {
        box-shadow: none;
        border-bottom: 1px solid lightgray;
        > .MuiAccordionSummary-root {
            padding: 0 .5rem;
            border-bottom: lightgray;
            > .MuiAccordionSummary-content {
                display: inline;
                margin: .5rem 0;
                > span {
                    padding: .25rem .4rem;
                }
            }
        }
        > .Mui-expanded {
            border-bottom: 1px solid lightgray;
        }
        .MuiAccordionDetails-root {
            font-size: small;
            padding: .4rem .5rem;
        }
    }
`

function LogMsg(props) {
    const [isExpanded, setExpanded] = React.useState(false)
    const { type, title, description } = props.msg
    const Badge = type === 'New' ? NewBadge
        : type === 'Fix' ? FixBadge
            : ChangeBadge

    return (
        <AccordionWrapper>
            <MyAccordion
                expanded={isExpanded}
                onChange={() => setExpanded(!isExpanded)}
                square={true}
                title={
                    <>
                        <Badge />
                        {` ${title}`}
                    </>
                }
                content={description}
            />
        </AccordionWrapper>
    )
}

const MsgBox = styled.div`
    > div:first-child {
        border-bottom: 1px solid lightgray;
    }
    > div > div {
        border-top: none;
    }
`

export function SiteUpdateLog() {
    const { stringData } = React.useContext(LanguageContext)

    return (
        <BodyContainer>
            {stringData.home.updateLog.content.map((version, idx) => (
                <MsgBox key={idx}>
                    <div>{version.version}</div>
                    {version.content.map((msg, idx) => (
                        <LogMsg key={idx} msg={msg} />
                    ))}
                </MsgBox>
            ))}
        </BodyContainer>
    )
}

const LicenseList = styled.ul`
    margin-bottom: -.5rem;
`
const LicenseItemTitle = styled.div`
    font-weight: bold;
`
const LicenseItemContent = styled.div`
    padding-left: .5rem;
    padding-bottom: .5rem;
`

export const SiteLicense = () => {
    const { stringData } = React.useContext(LanguageContext)

    return (
        <BodyContainer>
            <LicenseList>
                <li key={'text'}>
                    <LicenseItemTitle>
                        <span>{stringData.home.license.content.title}</span>
                    </LicenseItemTitle>
                    <LicenseItemContent>
                        <span>{stringData.home.license.content.content}</span>
                    </LicenseItemContent>
                </li>
                {[
                    {
                        titleLink: 'https://github.com/google/material-design-icons',
                        title: 'Material icons - Google Design',
                        licenseLink: 'https://github.com/google/material-design-icons/blob/master/LICENSE',
                        license: 'Apache License 2.0',
                    },
                    {
                        titleLink: 'https://github.com/facebook/react',
                        title: 'react',
                        licenseLink: 'https://github.com/facebook/react/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/react-bootstrap/react-bootstrap',
                        title: 'react-bootstrap',
                        licenseLink: 'https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/paulcollett/react-masonry-css',
                        title: 'react-masonry-css',
                        licenseLink: 'https://github.com/paulcollett/react-masonry-css/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/dirtyredz/react-scroll-up-button',
                        title: 'react-scroll-up-button',
                        licenseLink: 'https://github.com/dirtyredz/react-scroll-up-button/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/mui-org/material-ui',
                        title: 'material-ui',
                        licenseLink: 'https://github.com/mui-org/material-ui/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/styled-components/styled-components',
                        title: 'styled-components',
                        licenseLink: 'https://github.com/styled-components/styled-components/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                ].map((item, idx) => (
                    <li key={idx}>
                        <LicenseItemTitle>
                            <a
                                href={item.titleLink}
                                target='_blank'
                                rel='noreferrer'
                            >
                                {item.title}
                            </a>
                        </LicenseItemTitle>
                        <LicenseItemContent>
                            <a
                                href={item.licenseLink}
                                target='_blank'
                                rel='noreferrer'
                            >
                                {item.license}
                            </a>
                        </LicenseItemContent>
                    </li>
                ))}
            </LicenseList>
        </BodyContainer>
    )
}