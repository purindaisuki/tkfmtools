import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import useLocalStorage from 'hooks/useLocalStorage';

import { useLanguage } from 'containers/LanguageProvider';

import Head from 'components/Head';
import MyIconButton from 'components/MyIconButton';
import MyAccordion from 'components/MyAccordion';
import {
    LogMsg,
    SiteDescriptions,
    SiteSetting,
    SiteUpdateLog,
    SiteLicense
} from 'components/SiteAccordionBody';
import MyModal from 'components/MyModal';
import { ExpandMoreIcon, NoteIcon } from 'components/icon';

const MsgModal = styled(MyModal)`
    > div:nth-child(3) {
        width: 40%;
        @media screen and (max-width: 992px) {
            width: 80%;
        }
        @media screen and (max-width: 768px) {
            width: 90%;
        }
        top: 20%;
    }
`
const ModalBody = styled.div`
    margin: 0;
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
    const { pageString } = useLanguage()
    const latestMsg = pageString.index.updateLog.content[0]

    return (
        <MsgModal
            title={`${pageString.index.helmet.title} ${latestMsg.version}`}
            open={modalOpen}
            onClose={onClose}
            ariaLabelledby="update-modal-title"
        >
            <ModalBody>
                {latestMsg.content.map((msg, idx) => (
                    <LogMsg
                        msg={msg}
                        alwaysOpen={true}
                        key={idx}
                    />
                ))}
            </ModalBody>
        </MsgModal>
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
    width: 90%;
    max-width: 1000px;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
    margin-top: 1rem;
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
const NoteButton = styled(MyIconButton)`
    position: relative;
    cursor: pointer;
    && {
        padding: 0;
    }
    svg {
        width: 1.2rem;
        height: 1.2rem;
        fill: ${props => props.theme.colors.onSurface};
    }
    &:after {
        position: absolute;
        content: '';
        right: -.3rem;
        top: -.3rem;
        background-color: red;
        border-radius: 100%;
        animation: ${unreadAnimation} 1.5s ease-in-out infinite;
        ${props => props.$unread ? 'width: .6rem; height: .6rem;' : ''}
    }
`
const DescriptionAccordion = styled(MyAccordion)`
    && {
        width: 90%;
        max-width: 1000px;
        @media screen and (max-width: 600px) {
            width: 100%;
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
const Home = () => {
    const [state, setState] = useState({
        expanded: 0,
        modalOpen: false,
    })

    const [localVersion, setVersion] = useLocalStorage('last-read-version')

    const { pageString } = useLanguage()
    const latestMsg = pageString.index.updateLog.content[0]

    const handleExpand = (panel) => (event, isExpanded) => {
        setState((state) => ({
            ...state,
            expanded: isExpanded ? panel : false
        }))
    }

    const handleModal = (boolean) => () => {
        setState((state) => ({
            ...state,
            modalOpen: boolean,
        }))

        if (boolean && localVersion !== latestMsg.version) {
            setVersion(latestMsg.version)
        }
    }

    return (
        <HomeContainer>
            <Head
                title={pageString.index.helmet.title}
                description={pageString.index.helmet.description}
                path='/'
            />
            <Header>
                <span>{pageString.index.helmet.title}</span>
                <span>{latestMsg.version}</span>
                <NoteButton
                    onClick={handleModal(true)}
                    tooltipText={pageString.index.noteButtonTooltip}
                    $unread={localVersion !== latestMsg.version}
                >
                    {NoteIcon}
                </NoteButton>
            </Header>
            {[
                {
                    header: pageString.index.about.header,
                    body: <SiteDescriptions />,
                },
                {
                    header: pageString.index.setting.header,
                    body: <SiteSetting />,
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
                    expandIcon={ExpandMoreIcon}
                    title={item.header}
                    content={item.body}
                    key={idx}
                />
            ))}
            <UpdateModal
                modalOpen={state.modalOpen}
                onClose={handleModal(false)}
            />
        </HomeContainer>
    )
}

export default Home