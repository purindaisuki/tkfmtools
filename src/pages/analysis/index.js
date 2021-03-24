import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Col, Form } from 'react-bootstrap';

import { useLineupData } from 'containers/LineupDataProvider';
import { useLanguage } from 'containers/LanguageProvider';

import Head from 'components/Head';
import ImageSupplier from 'components/ImageSupplier';
import { NumForm, Select, TwoStageForm } from 'components/MyForm';
import MyHeader from 'components/MyHeader';
import MyIconButton from 'components/MyIconButton';
import { SaveIcon, LoadIcon, DeleteIcon } from 'components/icon';
import MySnackbar from 'components/MySnackbar';
import { ScrollableModal, TextModal } from 'components/MyModal';

import calcCharStats from 'utils/calcCharStats';
import charByPositionData from 'data/charByPosition'
import charsData from 'data/character.json';

const StyledCharContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    margin-right: 2rem;
`
const CharImgWrapper = styled(Button)`
    ${props => props.$owned ? null : 'filter: grayscale(100%);'}
    && {
        transition: filter 0.1s ease;
    }
`
const CharImg = styled(ImageSupplier)`
    width: 7rem;
`
const StyledForm = styled(Form)`
    width: 12rem;
    div {
        margin-bottom: .2rem;
    }
    > div:last-child > div {
        margin-bottom: 0;
    }
    && input, && select {
        transition: all 0.3s ease;
        ${props => props.$owned ? null : `border: 1px solid ${props.theme.colors.dropdownHover};`}
    }
`
const CharContainer = ({ character, state, handleSelect, handleBtnClick }) => {
    const { pageString, charString } = useLanguage()

    return (
        <StyledCharContainer>
            <CharImgWrapper
                onClick={handleBtnClick}
                $owned={state?.owned}
                disableRipple
                disableFocusRipple
            >
                <CharImg
                    name={`char_small_${character.id}`}
                    alt={charString.name[character.id]}
                />
            </CharImgWrapper>
            <StyledForm
                $owned={state?.owned}
                onSubmit={(event) => event.preventDefault()}
            >
                <Form.Row>
                    <Col>
                        {pageString.analysis.index.levelTitle}
                    </Col>
                    <Col>
                        {pageString.analysis.index.starTitle}
                    </Col>
                    <Col>
                        {pageString.analysis.index.disciplineTitle}
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Select
                            type='number'
                            pattern='[0-9]*'
                            inputMode='numeric'
                            value={
                                state?.owned ? state?.level : ''
                            }
                            min='0'
                            max='61'
                            onChange={handleSelect('level')}
                            onFocus={e => e.target.value = ''}
                            onBlur={e => e.target.value = state?.level}
                            placeholder='-'
                            disabled={!state?.owned}
                        />
                    </Col>
                    <NumForm
                        as={Col}
                        defaultValue={state?.star}
                        minNum={4 - character.id[0]}
                        maxNum={5}
                        onChange={handleSelect('star')}
                        disabled={!state?.owned}
                    />
                    <NumForm
                        as={Col}
                        defaultValue={state?.discipline}
                        minNum={0}
                        maxNum={3}
                        disabled={character.id[0] === '4'}
                        onChange={handleSelect('discipline')}
                        disabled={!state?.owned}
                    />
                </Form.Row>
                <TwoStageForm
                    title={pageString.analysis.index.potentialTitle}
                    defaultValues={[state?.potential, state?.potentialSub]}
                    subMinNum={state?.potential === 1 ? 0 : 1}
                    minNum={1}
                    maxNum={character.id[0] === '4' || character.id[0] === '3' ? 6 : 12}
                    selectAttrs={['potential', 'potentialSub']}
                    handleSelect={handleSelect}
                    disabled={!state?.owned}
                />
            </StyledForm>
        </StyledCharContainer>
    )
}

const DataButtonContainer = styled.div`
    position: absolute;
    right: 0;
    top: -4rem;
    margin-bottom : 0;
    > span:last-child button {
        margin: 0;
    }
`
const DataManageButtons = ({ handleData, handleModalOpen }) => {
    const { pageString } = useLanguage()

    return (
        <DataButtonContainer>
            <MyIconButton
                onClick={handleData('save')}
                tooltipText={pageString.analysis.index.saveButton}
            >
                {SaveIcon}
            </MyIconButton>
            <MyIconButton
                onClick={handleModalOpen}
                tooltipText={pageString.analysis.index.loadButton}
            >
                {LoadIcon}
            </MyIconButton>
        </DataButtonContainer>
    )
}

const DataModal = ({ handleData }) => {
    const { pageString } = useLanguage()

    const { localLineups } = useLineupData()

    if (!localLineups) {
        return null
    }

    return (
        localLineups.map((d, idx) => (
            <MyHeader
                title={d.date}
                end={<>
                    <MyIconButton
                        onClick={handleData('load', idx)}
                        tooltipText={pageString.analysis.index.loadButton}
                    >
                        {LoadIcon}
                    </MyIconButton>
                    <MyIconButton
                        onClick={handleData('delete', idx)}
                        tooltipText={pageString.analysis.index.deleteButton}
                    >
                        {DeleteIcon}
                    </MyIconButton>
                </>}
                key={idx}
            />
        ))
    )
}

const CharGroupsContainer = styled.div`
    width: 100%;
    > div:nth-child(even) > div > span {
        display: flex;
        align-items: center;
        margin-bottom: .4rem;
    }
    > div:nth-child(2) > div {
        width: 100%;
        justify-content: space-between;
    }
`
const PositionImgWrapper = styled(ImageSupplier)`
    width: 2rem;
    margin-right: .2rem;
`
const CharsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const Index = () => {
    const { pageString, charString } = useLanguage()

    const { currentLineup, actions } = useLineupData()
    const { pushLineup, getLineup, deleteLineup, setCurrentLineup } = actions

    const [state, setState] = useState({
        isDataModalOpen: false,
        isHelpModalOpen: false,
        isSuccessSnackbarOpen: false,
        isErrorSnackbarOpen: false
    })

    const handleSelect = (idx) => (attr) => (event) => {
        const selected = parseInt(event.target.value)

        const newLineup = JSON.parse(JSON.stringify(currentLineup))
        let charState = { ...newLineup[idx], [attr]: parseInt(selected) }

        if (isNaN(parseInt(charState.level)) || charState.level < 0 || charState.level > 61) {
            // not valid
            return
        }

        charState.level = charState.level === 0
            ? 60 : charState.level === 61
                ? 1 : charState.level

        if (charState.potential !== 1 && newLineup[idx].potentialSub === 0) {
            charState.potentialSub = 1
        }

        const { stats } = charsData[idx]
        const { rarity, attribute, position, ATK, HP, owned, ...rest } = charState

        const result = calcCharStats(...Object.values(rest), ...Object.values(stats))

        newLineup[idx] = { ...charState, ...result, owned: rest.level !== 0 }
        setCurrentLineup(newLineup)
    }

    const handleBtnClick = (idx) => () => {
        const newLineup = JSON.parse(JSON.stringify(currentLineup))
        newLineup[idx].owned = !newLineup[idx].owned
        setCurrentLineup(newLineup)
    }

    const handleData = (action, idx) => () => {
        switch (action) {
            case 'save':
                if (pushLineup(currentLineup, { gtag: true })) {
                    setState(state => ({ ...state, isSuccessSnackbarOpen: true }))

                    return
                }

            case 'load':
                const loadedData = getLineup(idx)
                if (loadedData) {
                    setState(state => ({
                        ...state,
                        isSuccessSnackbarOpen: true,
                        isDataModalOpen: false
                    }))

                    setCurrentLineup(loadedData)

                    return
                }

            case 'delete':
                if (deleteLineup(idx)) {
                    setState(state => ({
                        ...state,
                        isDataModalOpen: true,
                    }))

                    return
                }

            default: break
        }

        setState(state => ({
            ...state,
            isErrorSnackbarOpen: true,
        }))
    }

    const handleSuccessSnackbarClose = () => {
        setState((state) => ({ ...state, isSuccessSnackbarOpen: false }))
    }

    const handleErrorSnackbarClose = () => {
        setState((state) => ({ ...state, isErrorSnackbarOpen: false }))
    }

    const handleDataModal = (boolean) => () => {
        setState(state => ({ ...state, isDataModalOpen: boolean }))
    }

    const handleHelpModal = (boolean) => () => {
        setState(state => ({ ...state, isHelpModalOpen: boolean }))
    }

    const positionImg = [
        'attacker',
        'defender',
        'healer',
        'obsructer',
        'supporter'
    ]

    return (
        <CharGroupsContainer>
            <Head
                title={pageString.analysis.index.helmet.title}
                description={pageString.analysis.index.helmet.description}
                path='/analysis/'
            />
            <DataManageButtons handleData={handleData} handleModalOpen={handleDataModal(true)} />
            {charByPositionData.map((group, idx) => (
                <React.Fragment key={idx}>
                    <MyHeader
                        title={charString.tags[idx + 5]}
                        titleIcon={
                            <PositionImgWrapper
                                name={`ui_${positionImg[idx]}`}
                                alt=''
                            />
                        }
                        withHelp={idx === 0}
                        onClickHelp={handleHelpModal(true)}
                        border
                    />
                    <CharsContainer>
                        {group.map((c, i) => (
                            <CharContainer
                                character={c}
                                state={currentLineup ? currentLineup[c.idx] : undefined}
                                handleSelect={handleSelect(c.idx)}
                                handleBtnClick={handleBtnClick(c.idx)}
                                key={i}
                            />
                        ))}
                    </CharsContainer>
                </React.Fragment>
            ))}
            <MySnackbar
                open={state.isSuccessSnackbarOpen}
                onClose={handleSuccessSnackbarClose}
                message={pageString.analysis.index.successMsg}
                type='success'
            />
            <MySnackbar
                open={state.isErrorSnackbarOpen}
                onClose={handleErrorSnackbarClose}
                message={pageString.analysis.index.errorMsg}
                type='error'
            />
            <ScrollableModal
                title={pageString.analysis.index.modalTitle}
                open={state.isDataModalOpen}
                onClose={handleDataModal(false)}
                ariaLabelledby='data-operation-modal-title'
                ariaDescribedby='data-operation-modal-description'
            >
                <DataModal
                    handleData={handleData}
                />
            </ScrollableModal>
            <TextModal
                title={pageString.analysis.index.helpModal.title}
                content={pageString.analysis.index.helpModal.content}
                open={state.isHelpModalOpen}
                onClose={handleHelpModal(false)}
                ariaLabelledby='help-modal-title'
                ariaDescribedby='help-modal-description'
            />
        </CharGroupsContainer>
    )
}

export default Index