import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useLayoutConfig } from 'containers/Layout';
import { useLanguage } from 'containers/LanguageProvider';

import Accordion from 'components/Accordion';
import Header from 'components/Header';
import RadioGroup, { Radio } from 'components/RadioGroup';
import IconButton from 'components/IconButton';
import Modal from 'components/Modal';
import { ChangeBadge, FixBadge, NewBadge } from 'components/Badge';
import { DeleteIcon } from 'components/icon';

const SiteDescription = ({ name, content, link }) => {
    if (name === 'feedback' || name === 'policy') {
        return (
            <p>
                {content[0]}
                <a
                    href={link}
                    target='_blank'
                    rel='noreferrer'
                >
                    {content[1]}
                </a>
                {content[2]}
            </p>
        )
    }

    if (name === 'reference') {
        return (
            content.map((refItem, idx) => {
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
    }

    return content.map((text, idx) => <p key={idx}>{text}</p>)
}

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
const DescriptionHeader = styled(Header)`
    margin-bottom: .5rem;
`
const DescriptionBody = styled.div`
    p {
        margin: .3rem .5rem;
    }
`
export const SiteDescriptions = () => {
    const { pageString } = useLanguage()

    return (
        <BodyContainer>
            <ul>
                {pageString.index.about.content.map((item, idx) => (
                    <DescriptionContainer key={idx}>
                        <DescriptionHeader title={item.header} />
                        <DescriptionBody>
                            <SiteDescription {...item} />
                        </DescriptionBody>
                    </DescriptionContainer>
                ))}
            </ul>
        </BodyContainer>
    )
}

const StyledModal = styled(Modal)`
    > div:nth-child(3) {
        position: relative;
        top: 20%;
        width: 40%;
        height: 30%;
        @media screen and (max-width: 1000px) {
            width: 60%;
        }
        @media screen and (max-width: 600px) {
            width: 80%;
        }
    }
`
const ClearHeader = styled(Header)`
    margin-bottom: 0;
    font-size: medium;
`
const StyledButton = styled(IconButton)`
    &&{
        padding: .5rem;
    }
`
const ButtonsWrapper = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 0rem;
`
const TextButton = styled(Button)`
    &&& {
        margin: 0 1rem;
        background-color: ${props => props.$clear ? props.theme.colors.error : 'gray'};
        span {
            color: ${props => props.theme.colors.onError};
        }
    }
`
export const SiteSetting = () => {
    const { layout, setLayout } = useLayoutConfig()

    const { pageString } = useLanguage()
    const layouts = pageString.index.setting.labels

    const [isModalOpen, setModal] = useState(false)

    const handleModal = (boolean) => () => setModal(boolean)

    const clearLocalStorage = () => {
        if (typeof window !== 'undefined') {
            localStorage.clear()
        }
    }

    return (
        <BodyContainer>
            <RadioGroup
                label={pageString.index.setting.groupLabel}
                value={layouts[layout]}
                handleChange={(event) => setLayout(layouts.indexOf(event.target.value))}
            >
                {pageString.index.setting.labels.map(label => (
                    <Radio label={label} value={label} key={label} />
                ))}
            </RadioGroup>
            <ClearHeader title={pageString.index.setting.clearTitle} />
            <StyledButton onClick={handleModal(true)} tooltipText={pageString.index.setting.clearButton}>
                {DeleteIcon}
            </StyledButton>
            <StyledModal
                title={pageString.index.setting.clearModalTitle}
                open={isModalOpen}
                onClose={handleModal(false)}
                ariaLabelledby='clear-modal'
                aria-describedby='clear-modal-description'
            >
                <p id='clear-modal-description'>{pageString.index.setting.clearModalContent}</p>
                <ButtonsWrapper>
                    <TextButton $clear onClick={clearLocalStorage}>
                        {pageString.index.setting.clear}
                    </TextButton>
                    <TextButton onClick={handleModal(false)}>
                        {pageString.index.setting.cancel}
                    </TextButton>
                </ButtonsWrapper>
            </StyledModal>
        </BodyContainer>
    )
}

const MsgAccordion = styled(Accordion)`
    && {
        border-bottom: 1px solid lightgray;
        > .MuiAccordionSummary-root {
            padding: 0 .5rem;
            border-bottom: 0px solid lightgray;
        }
        > .MuiAccordionSummary-root.Mui-expanded {
            border-bottom: 1px solid lightgray;
        }
        .MuiAccordionSummary-content {
            display: flex;
            align-items: center;
            margin: .5rem 0;
            > span {
                padding: .25rem .4rem;
                margin-right: .4rem;
            }
        }
        && .MuiAccordionDetails-root {
            font-size: small;
            padding: .4rem .5rem;
            margin: 0;
        }
    }
`
export function LogMsg({ msg, alwaysOpen }) {
    const [isExpanded, setExpanded] = useState(alwaysOpen ? true : false)
    const { type, title, description } = msg
    const Badge = type === 'New' ? NewBadge
        : type === 'Fix' ? FixBadge
            : ChangeBadge

    const handleChange = () => {
        if (!alwaysOpen) {
            setExpanded(!isExpanded)
        }
    }

    return (
        <MsgAccordion
            expanded={isExpanded}
            onChange={handleChange}
            square
            title={<>
                <Badge />
                {title}
            </>}
            content={description}
        />
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
    const { pageString } = useLanguage()

    return (
        <BodyContainer>
            {pageString.index.updateLog.content.map(version => (
                <MsgBox key={version.version}>
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
const LicenseItemHeader = styled(DescriptionHeader)`
    margin-bottom: 0;
    font-size: medium;
`
const LicenseItemContent = styled.div`
    padding-left: .5rem;
    padding-bottom: .5rem;
`
export const SiteLicense = () => {
    const { pageString } = useLanguage()

    return (
        <BodyContainer>
            <LicenseList>
                <li key='text'>
                    <LicenseItemHeader
                        title={pageString.index.license.content.title}
                    />
                    <LicenseItemContent>
                        <span>{pageString.index.license.content.content}</span>
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
                        titleLink: 'https://github.com/gatsbyjs/gatsby',
                        title: 'gatsby',
                        licenseLink: 'https://github.com/gatsbyjs/gatsby/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/styled-components/styled-components',
                        title: 'styled-components',
                        licenseLink: 'https://github.com/styled-components/styled-components/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/mui-org/material-ui',
                        title: 'material-ui',
                        licenseLink: 'https://github.com/mui-org/material-ui/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/react-bootstrap/react-bootstrap',
                        title: 'react-bootstrap',
                        licenseLink: 'https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/plouc/nivo',
                        title: 'nivo',
                        licenseLink: 'https://github.com/plouc/nivo/blob/master/LICENSE.md',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/atlassian/react-beautiful-dnd',
                        title: 'react-beautiful-dnd',
                        licenseLink: 'https://github.com/atlassian/react-beautiful-dnd/blob/master/LICENSE',
                        license: 'Apache License 2.0',
                    },
                    {
                        titleLink: 'https://github.com/niklasvh/html2canvas',
                        title: 'html2canvas',
                        licenseLink: 'https://github.com/niklasvh/html2canvas/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/dirtyredz/react-scroll-up-button',
                        title: 'react-scroll-up-button',
                        licenseLink: 'https://github.com/dirtyredz/react-scroll-up-button/blob/master/LICENSE',
                        license: 'MIT License',
                    },
                    {
                        titleLink: 'https://github.com/paulcollett/react-masonry-css',
                        title: 'react-masonry-css',
                        licenseLink: 'https://github.com/paulcollett/react-masonry-css/blob/master/LICENSE',
                        license: 'MIT License',
                    }
                ].map((item, idx) => (
                    <li key={idx}>
                        <LicenseItemHeader
                            title={
                                <a
                                    href={item.titleLink}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {item.title}
                                </a>
                            }
                        />
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
