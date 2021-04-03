import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Divider } from '@material-ui/core';

import useTeamSlots from 'hooks/useTeamSlots';
import useExport from 'hooks/useExport';

import { useTeamData } from 'containers/TeamDataProvider';
import { useLanguage } from 'containers/LanguageProvider';
import Swappable from 'containers/Swappable';

import Head from 'components/Head';
import IconButton, { ExportButton } from 'components/IconButton';
import LocalizedLink from 'components/LocalizedLink';
import Header from 'components/Header';
import DropDown from 'components/DropDown';
import Snackbar from 'components/Snackbar';
import Input from 'components/Input';
import CharSlot from 'components/CharSlot';
import { ScrollableModal } from 'components/Modal';
import CharCard from 'components/CharCard';
import ImageSupplier from 'components/ImageSupplier';
import { BackIcon, CopyIcon, ShareIcon } from 'components/icon';

import charData from 'data/character.json';

const charByRarityData = charData.reduce((newData, c) => {
    newData[3 - c.rarity].push({ id: c.id })
    return newData
}, [...Array(4)].map(i => []))

const rarity = ['ssr', 'sr', 'r', 'n']

const StyledModal = styled(ScrollableModal)`
    > div:nth-child(3) {
        top: 5%;
        width: 90%;
    }
`
const RarityHeader = styled(Header)`
    margin-bottom: .4rem;
    span {
        display: flex;
        align-items: center;
    }
`
const RarityImgWrapper = styled(ImageSupplier)`
    width: 3rem;
`
const RarityChars = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -.4rem 0 -1rem;
`
const CharButton = styled(Button)`
    && {
        padding: 0;
        .MuiButton-label {
            color: ${props => props.theme.colors.onSurface};
        }
    }
`
const ModalCharCard = styled(CharCard)`
    min-width: 0;
    width: 8.8rem;
    margin: .2rem;
`
const CharSelectModal = ({ open, onClose, handleSelect }) => {
    const { pageString } = useLanguage()

    return (
        <StyledModal
            title={pageString.team.build.selectModalTitle}
            open={open}
            onClose={onClose}
            keepMounted
            ariaLabelledby='character-select-modal'
        >
            {charByRarityData.map((group, ind) => (
                <React.Fragment key={ind}>
                    <RarityHeader
                        titleIcon={
                            <RarityImgWrapper
                                name={`ui_rarity_${rarity[ind]}`}
                                alt={rarity[ind]}
                            />
                        }
                        border
                    />
                    <RarityChars>
                        {group.map(c => (
                            <CharButton onClick={handleSelect(c.id)} key={c.id}>
                                <ModalCharCard id={c.id} />
                            </CharButton>
                        ))}
                    </RarityChars>
                </React.Fragment>
            ))}
        </StyledModal>
    )
}

const DraggableCharsList = () => {
    const { actions } = useTeamData()
    const { setCurrentTeam } = actions

    const [currentTeam, setTeamSlots] = useTeamSlots()

    const [state, setState] = useState({
        didModalMounted: false,
        isSelectModalOpen: false,
        slotIndex: undefined,
        canRender: false
    })

    useEffect(() => {
        setState(state => ({
            ...state,
            canRender: true,
        }))
    }, [])

    const handleSelectModalOpen = (slotIndex) => () => setState(state => ({
        ...state,
        didModalMounted: true,
        isSelectModalOpen: true,
        slotIndex: slotIndex
    }))

    const handleSelectModalClose = () => setState(state => ({
        ...state,
        isSelectModalOpen: false,
        slotIndex: undefined
    }))

    const handleCharSelect = (charId, index) => () => {
        setTeamSlots(charId, index === undefined ? state.slotIndex : index)

        setState(state => ({
            ...state,
            isSelectModalOpen: false,
            slotIndex: undefined
        }))
    }

    return (<>
        {state.canRender && <Swappable
            items={currentTeam.characters}
            renderItem={(character, index, provided, isDragging) => (
                <CharSlot
                    char={character}
                    index={index}
                    provided={provided}
                    isDragging={isDragging}
                    ref={provided.innerRef}
                    handleSelectModalOpen={handleSelectModalOpen(index)}
                    handleCharDelete={handleCharSelect(undefined, index)}
                />
            )}
            onUpdate={(newCharacters) => setCurrentTeam({
                ...currentTeam,
                characters: newCharacters
            })}
            droppableId='character-list'
        />}
        {state.didModalMounted && <CharSelectModal
            open={state.isSelectModalOpen}
            onClose={handleSelectModalClose}
            handleSelect={handleCharSelect}
        />}
    </>)
}

const StyledHeader = styled(Header)`
    position: relative;
    left: -1rem;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0 0 0 1rem;
    border: none;
    label {
        margin-right: .6rem;
        font-size: large;
        text-transform: none;
    }
    > div:last-child {
        position: relative;
        bottom: -.4rem;
        right: -1rem;
    }
`
const StyledA = styled.a`
    margin-right: .4rem;
    color: ${props => props.theme.colors.link};
    text-decoration: none;
    &:hover {
        color: ${props => props.theme.colors.linkHover};
    }
`
const TeamHeader = ({ isExporting, handleExport }) => {
    const { pageString } = useLanguage()

    const { currentTeam, actions } = useTeamData()
    const { setCurrentTeam } = actions

    const [state, setState] = useState({
        isSnackbarOpen: false,
        shareLink: 'https://tkfmtools.page.link/____'
    })

    const firebaseRef = useRef()

    useEffect(() => {
        React.lazy(import('../../utils/firebase')
            .then(module => firebaseRef.current = module))
    }, [])

    const handleNameChange = (event) => {
        const newTeam = JSON.parse(JSON.stringify(currentTeam))
        newTeam.name = event.target.value
        setCurrentTeam(newTeam)
    }

    const handleShare = async () => {
        if (firebaseRef?.current) {
            const url = new URL(window.location.href)

            url.searchParams.set('team', JSON.stringify(currentTeam))

            const shortLink = await firebaseRef.current.getShortLink(url.href)

            setState(state => ({
                ...state,
                shareLink: shortLink
            }))
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(state.shareLink)
        setState(state => ({
            ...state,
            isSnackbarOpen: true
        }))
    }

    const handleSnackbarClose = () => setState(state => ({
        ...state,
        isSnackbarOpen: false
    }))

    return (
        <StyledHeader
            title={
                <div>
                    <Input
                        id='team-name-input'
                        value={currentTeam.name}
                        onChange={handleNameChange}
                        label={<span data-html2canvas-ignore='true'>
                            {pageString.team.build.nameInputLabel}
                        </span>}
                        placeholder={pageString.team.build.nameInputPlaceholder}
                        variant='outlined'
                        size='small'
                        inputProps={{ 'aria-label': 'team-name' }}
                    />
                </div>
            }
            end={<>
                <LocalizedLink to='/team/' >
                    <IconButton
                        tooltipText={pageString.team.build.backTooltip}
                        dataHtml2canvasIgnore
                    >
                        {BackIcon}
                    </IconButton>
                </LocalizedLink>
                <DropDown
                    button={
                        <IconButton
                            tooltipText={pageString.team.build.shareTooltip}
                            dataHtml2canvasIgnore
                        >
                            {ShareIcon}
                        </IconButton>
                    }
                    buttonOnClick={handleShare}
                    items={[{ id: 'share-button' }]}
                    renderItem={() => (<>
                        <StyledA
                            href={state.shareLink}
                            target='_blank'
                            rel='noreferrer'
                        >
                            {state.shareLink}
                        </StyledA>
                        <IconButton
                            onClick={handleCopy}
                            tooltipText={pageString.team.build.copyTooltip}
                        >
                            {CopyIcon}
                        </IconButton>
                    </>)}
                    disableItemButton
                    ariaId='share-menu'
                />
                <ExportButton
                    onClick={handleExport}
                    isLoading={isExporting}
                />
                <Snackbar
                    open={state.isSnackbarOpen}
                    onClose={handleSnackbarClose}
                    message={pageString.team.build.snackbarMsg}
                    type='success'
                />
            </>}
        />
    )
}

const ExportWrapper = styled.div`
    max-width: 1000px;
    margin: -1.5rem calc(50% - 500px - 1rem);
    padding: 1rem;
    padding-top: 1.5rem;
    @media screen and (max-width: 1064px) {
        margin: -1.5rem -.8rem;
    }
`
const StyledDivider = styled(Divider)`
    && {
        margin: .5rem 0;
        background-color: ${props => props.theme.colors.dropdownHover};
    }
`
const TeamBuild = () => {
    const { pageString } = useLanguage()

    const { currentTeam } = useTeamData()

    const componentRef = useRef()

    const { isExporting, exportImage } = useExport()

    const handleExport = () => exportImage({
        componentRef: componentRef,
        fileName: currentTeam.name ? currentTeam.name : 'team-composition',
    })

    return (<>
        <Head
            title={pageString.team.build.helmet.title}
            description={pageString.team.build.helmet.description}
            path='/team/build/'
        />
        <ExportWrapper ref={componentRef}>
            <TeamHeader isExporting={isExporting} handleExport={handleExport} />
            <StyledDivider />
            <DraggableCharsList />
        </ExportWrapper>
    </>)
}

export default TeamBuild