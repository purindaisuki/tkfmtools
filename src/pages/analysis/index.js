import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Col, Form } from 'react-bootstrap';
import Head from 'components/Head';
import ImageSupplier from 'components/ImageSupplier';
import { NumForm, Select, TwoStageForm } from 'components/MyForm';
import MyHeader from 'components/MyHeader';
import MySnackbar from 'components/MySnackbar';
import { ScrollableModal, TextModal } from 'components/MyModal';
import { useLanguage } from 'components/LanguageProvider';
import calcCharStats from 'gamedata/calcCharStats';
import charsData from 'gamedata/character.json';

const charByPositionData = charsData.reduce((newData, c, i) => {
    newData[c.tags.position - 5].push({ id: c.id, idx: i })
    return newData
}, [...Array(5)].map(i => []))

const minifyData = (data) => data.map(c => Object.values(c))

const hydrateData = (data) => {
    const keys = [
        'id',
        'attribute',
        'position',
        'level',
        'potential',
        'potentialSub',
        'discipline',
        'star',
        'ATK',
        'HP',
        'owned'
    ]
    return data.map(c => (
        c.reduce((newData, v, i) => {
            newData[keys[i]] = v
            return newData
        }, {})
    ))
}

const StyledCharContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    margin-right: 2rem;
`
const CharImgWrapper = styled(Button)`
    ${props => props.$owned ? null : 'filter: grayscale(100%);'}
    && {transition: filter 0.1s ease;}
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
                $owned={state.owned}
                disableRipple
                disableFocusRipple
            >
                <CharImg
                    name={`char_small_${character.id}`}
                    alt={charString.name[character.id]}
                />
            </CharImgWrapper>
            <StyledForm
                $owned={state.owned}
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
                                state.owned ? state.level : ''
                            }
                            min='0'
                            max='61'
                            onChange={handleSelect('level')}
                            onFocus={e => e.target.value = ''}
                            onBlur={e => e.target.value = state.level}
                            placeholder='-'
                            disabled={!state.owned}
                        />
                    </Col>
                    <NumForm
                        as={Col}
                        defaultValue={state.star}
                        minNum={4 - character.id[0]}
                        maxNum={5}
                        onChange={handleSelect('star')}
                        disabled={!state.owned}
                    />
                    <NumForm
                        as={Col}
                        defaultValue={state.discipline}
                        minNum={0}
                        maxNum={3}
                        disabled={character.id[0] === '4'}
                        onChange={handleSelect('discipline')}
                        disabled={!state.owned}
                    />
                </Form.Row>
                <TwoStageForm
                    title={pageString.analysis.index.potentialTitle}
                    defaultValues={[state.potential, state.potentialSub]}
                    subMinNum={state.potential === 1 ? 0 : 1}
                    minNum={1}
                    maxNum={character.id[0] === '4' || character.id[0] === '3' ? 6 : 12}
                    selectAttrs={['potential', 'potentialSub']}
                    handleSelect={handleSelect}
                    disabled={!state.owned}
                />
            </StyledForm>
        </StyledCharContainer>
    )
}

const BtnWrapper = styled.span`
    && > button {
        padding: .4rem .6rem;
        margin-right: .6rem;
        background-color: ${props => props.$type === 'save'
        ? props.theme.colors.success
        : props.$type === 'load'
            ? props.theme.colors.blue
            : props.theme.colors.error
    };
        color: ${props => props.$type === 'save'
        ? props.theme.colors.onSuccess
        : props.$type === 'load'
            ? props.theme.colors.onBlue
            : props.theme.colors.onError
    };
    }
    > button:hover {
        box-shadow: inset 0 0 10rem 10rem rgba(255, 255, 255, 0.25);
    }
`
const StyledButton = ({ children, type, onClick }) => (
    <BtnWrapper $type={type}>
        <Button onClick={onClick}>
            {children}
        </Button>
    </BtnWrapper>
)

const DataButtonContainer = styled.div`
    position: absolute;
    right: 0;
    top: -4rem;
    margin-bottom : 0;
    > span:last-child button {
        margin: 0;
    }
`
const DataManageButton = ({ handleData, handleModalOpen }) => {
    const { pageString } = useLanguage()

    return (
        <DataButtonContainer>
            <StyledButton type='save' onClick={handleData('save')} >
                {pageString.analysis.index.saveButton}
            </StyledButton>
            <StyledButton type='load' onClick={handleModalOpen} >
                {pageString.analysis.index.loadButton}
            </StyledButton>
        </DataButtonContainer>
    )
}

const ModalItemContainer = styled(MyHeader)`
    border: none;
`
const DataModal = ({ handleData }) => {
    const { pageString } = useLanguage()

    const localData = localStorage.getItem('analysis-data')
    const data = localData ? JSON.parse(localData) : []

    return (
        data.map((d, idx) => (
            <ModalItemContainer
                title={d.date}
                end={
                    <>
                        <StyledButton type='load' onClick={handleData('load', idx)} >
                            {pageString.analysis.index.loadButton}
                        </StyledButton>
                        <StyledButton type='delete' onClick={handleData('delete', idx)} >
                            {pageString.analysis.index.deleteButton}
                        </StyledButton>
                    </>
                }
                key={idx}
            />
        ))
    )
}

const CharGroupsContainer = styled.div`
    width: 100%;
    > div:nth-child(even) > div span {
        display: flex;
        align-items: center;
        margin-bottom: .4rem;
    }
    > div:nth-child(2) > div {
        width: 100%;
        justify-content: space-between;
    }
`
const UiImgWrapper = styled(ImageSupplier)`
    width: 2rem;
    margin-right: .2rem;
`
const CharsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const Index = ({ pageState, handlePageState }) => {
    const { pageString, charString } = useLanguage()

    const [state, setState] = useState({
        data: charsData.map(c => ({
            id: c.id,
            attribute: c.tags.attribute,
            position: c.tags.position - 5,
            level: 1,
            potential: 1,
            potentialSub: 0,
            discipline: 0,
            star: c.rarity,
            ATK: c.stats.initATK,
            HP: c.stats.initHP,
            owned: true,
        })),
        isDataModalOpen: false,
        isHelpModalOpen: false,
        isSuccessSnackbarOpen: false,
        isErrorSnackbarOpen: false
    })

    // read state when page loaded
    useEffect(() => {
        if (pageState) {
            setState(state => ({ ...state, data: pageState }))
        }
    }, [])

    const handleSelect = (idx) => (attr) => (event) => {
        const selected = parseInt(event.target.value)

        let charState = { ...state.data[idx], [attr]: parseInt(selected) }

        if (isNaN(parseInt(charState.level)) || charState.level < 0 || charState.level > 61) {
            // not valid
            return
        }

        charState.level = charState.level === 0
            ? 60 : charState.level === 61
                ? 1 : charState.level

        if (charState.potential !== 1 && state.data[idx].potentialSub === 0) {
            charState.potentialSub = 1
        }

        const { stats } = charsData[idx]
        const { rarity, attribute, position, ATK, HP, owned, ...rest } = charState

        const result = calcCharStats(...Object.values(rest), ...Object.values(stats))

        let newState = JSON.parse(JSON.stringify(state.data))
        newState[idx] = { ...charState, ...result, owned: rest.level !== 0 }
        setState(state => ({ ...state, data: newState }))
        handlePageState(newState)
    }

    const handleBtnClick = (idx) => () => {
        let newState = JSON.parse(JSON.stringify(state.data))
        newState[idx].owned = !newState[idx].owned
        setState(state => ({ ...state, data: newState }))
        handlePageState(newState)
    }

    const handleData = (action, idx) => () => {
        const localData = localStorage.getItem('analysis-data')

        if (action === 'save' && pageState) {
            const tzoffset = (new Date()).getTimezoneOffset() * 60000
            const localDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            if (localData) {
                let data = JSON.parse(localData)
                data.push({
                    date: localDate,
                    data: minifyData(state.data)
                })
                localStorage.setItem('analysis-data', JSON.stringify(data))
                setState(state => ({ ...state, isSuccessSnackbarOpen: true }))
            } else {
                localStorage.setItem('analysis-data', JSON.stringify([{
                    date: localDate,
                    data: minifyData(state.data)
                }]))
                setState(state => ({ ...state, isSuccessSnackbarOpen: true }))
            }

            // push data to GA
            if (dataLayer) {
                dataLayer.push({
                    'event': 'line_up_analysis',
                    'line_up': minifyData(state.data)
                })
            }
            return
        } else if (action === 'load') {
            if (localData) {
                const data = JSON.parse(localData)
                if (data[idx] && data[idx].data[0][0] === '101') {
                    const hydratedData = hydrateData(data[idx].data)
                    hydratedData.forEach(c => {
                        if (c.level === 0) {
                            c.level = 1
                            c.owned = false
                        }
                    })
                    setState(state => ({
                        ...state,
                        data: hydratedData,
                        isSuccessSnackbarOpen: true,
                        isDataModalOpen: false
                    }))
                    handlePageState(hydratedData)
                    return
                }
            }
        } else if (action === 'delete') {
            if (localData) {
                const data = JSON.parse(localData)

                if (data[idx] && data[idx].data[0][0] === '101') {
                    data.splice(idx, 1)
                    localStorage.setItem('analysis-data', JSON.stringify(data))
                    // re-render modal
                    setState(state => ({
                        ...state,
                        isDataModalOpen: true,
                    }))
                    return
                }
            }
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
            <DataManageButton handleData={handleData} handleModalOpen={handleDataModal(true)} />
            {charByPositionData.map((group, idx) => (
                <React.Fragment key={idx}>
                    <MyHeader
                        title={charString.tags[idx + 5]}
                        titleIcon={
                            <UiImgWrapper
                                name={`ui_${positionImg[idx]}`}
                                alt=''
                            />
                        }
                        withHelp={idx === 0}
                        onClickHelp={handleHelpModal(true)}
                    />
                    <CharsContainer>
                        {group.map((c, i) => (
                            <CharContainer
                                character={c}
                                state={state.data[c.idx]}
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
                ariaLabelledby='load-data-modal-title'
                ariaDescribedby='load-data-modal-description'
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