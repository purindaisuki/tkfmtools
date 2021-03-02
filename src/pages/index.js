import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Head from '../components/Head';
import { ModalContainer } from '../components/FilterComponents';
import { LogMsg } from '../components/SiteAccordionBody';
import MyAccordion from '../components/MyAccordion';
import {
    SiteDescription,
    SiteUpdateLog,
    SiteLicense
} from '../components/SiteAccordionBody';
import { LanguageContext } from '../components/LanguageProvider';
import { ExpandMoreIcon, NoteIcon } from '../components/icon';

const StyledModalContainer = styled(ModalContainer)`
    > div:nth-child(3) {
        width: 40%;
        min-width: max-content;
        left: 0;
        right: 0;
        top: 25%;
        margin: auto;
    }
`
const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: large;
    border-bottom: 1px solid ${props => props.theme.colors.border};
`
const ModalBody = styled.div`
    margin: 0;
    margin-top: .5rem;
    &&& .MuiAccordion-root,
    &&& .MuiAccordionSummary-root {
        border: none;
        cursor: text;
    }
`
const UpdateModal = ({
    modalOpen,
    onClose
}) => {
    const { pageString } = useContext(LanguageContext)
    const latestMsg = pageString.index.updateLog.content[0]

    return (
        <StyledModalContainer
            open={modalOpen}
            onClose={onClose}
            aria-labelledby="update-modal-title"
            aria-describedby="update-modal-description"
        >
            <ModalHeader>
                <span>
                    {`${pageString.index.helmet.title} ${latestMsg.version}`}
                </span>
                <span onClick={onClose}>&times;</span>
            </ModalHeader>
            <ModalBody>
                {latestMsg.content.map((msg, idx) => (
                    <LogMsg
                        msg={msg}
                        alwaysOpen={true}
                        key={idx}
                    />
                ))}
            </ModalBody>
        </StyledModalContainer>
    )
}

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
    > span:nth-child(2) {
        margin: .4rem;
        font-size: large;
    }
`
const unreadAnimation = keyframes`
    0%, 67%, 80%, 96%, 100% {
        transform: scale(1,1) translate(0,0);
    }
    72% {
        transform: scale(1.1,.9) translate(0,5%);
    }
    76%, 92% {
        transform: scale(1.2,.8) translate(0,15%);
    }
    84% {
        transform: scale(.9,1.2) translate(0,-100%);
    }
    88% {
        transform: scale(.9,1.2) translate(0,-20%);
    }
`
const NoteIconWrapper = styled.span`
    position: relative;
    cursor: pointer;
    svg {
        width: 1.2rem;
        height: 1.2rem;
        fill: ${props => props.theme.colors.onSurface};
    }
    &:after {
        position: absolute;
        content: '';
        right: -.3rem;
        top: .1rem;
        background-color: red;
        border-radius: 100%;
        animation: ${unreadAnimation} 1.5s ease-in-out infinite;
        ${props => props.$unread
        ? 'width: .6rem; height: .6rem;'
        : null}
    }
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
export default () => {
    const { isDefault, pageString } = useContext(LanguageContext)
    const latestMsg = pageString.index.updateLog.content[0]

    const [state, setState] = useState({
        expanded: 0,
        modalOpen: false,
        unread: true
    })

    // get whether read latest update
    useEffect(() => {
        const localSetting = localStorage.getItem('last-read-version')
        if (localSetting) {
            setState((state) => ({
                ...state,
                unread: localSetting !== latestMsg.version
            }))
        }
    }, [])

    const handleExpand = (panel) => (event, isExpanded) => {
        setState((state) => ({
            ...state,
            expanded: isExpanded ? panel : false
        }))
    }

    const handleModalOpen = () => {
        setState((state) => ({
            ...state,
            modalOpen: true,
            unread: false,
        }))
        localStorage.setItem('last-read-version', latestMsg.version)
    }

    const handleModalClose = () => {
        setState((state) => ({
            ...state,
            modalOpen: false,
        }))
    }

    return (
        <>
            <Head
                title={pageString.index.helmet.title}
                description={pageString.index.helmet.description}
                path={isDefault ? '/' : ''}
            />
            <HomeContainer>
                <Header>
                    <span>{pageString.index.helmet.title}</span>
                    <span>{latestMsg.version}</span>
                    <NoteIconWrapper
                        onClick={handleModalOpen}
                        $unread={state.unread}
                    >
                        {NoteIcon}
                    </NoteIconWrapper>
                </Header>
                {[
                    {
                        header: pageString.index.about.header,
                        body: <SiteDescription />,
                    },
                    {
                        header: pageString.index.updateLog.header,
                        body: <SiteUpdateLog />,
                    },
                    {
                        header: pageString.index.license.header,
                        body: <SiteLicense />,
                    },
                ].map((item, idx) => (
                    <DescriptionAccordion
                        expanded={state.expanded === idx}
                        onChange={handleExpand(idx)}
                        square={false}
                        expandIcon={ExpandMoreIcon}
                        title={item.header}
                        content={item.body}
                        key={idx}
                    />
                ))}
            </HomeContainer>
            <UpdateModal
                modalOpen={state.modalOpen}
                onClose={handleModalClose}
            />
        </>
    )
}