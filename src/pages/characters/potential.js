import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import Panels from 'containers/Panels';
import { useLanguage } from 'containers/LanguageProvider';

import Head from 'components/Head';
import Header from 'components/Header';
import { ItemCard } from 'components/Card';
import ImageSupplier from 'components/ImageSupplier';
import { Select } from 'components/Input';
import { TextModal } from 'components/Modal';
import { BuffIcon, ItemIcon, RaceIcon } from 'components/icon';

import { calcCharPotential } from 'utils/calcCharStats';

const getSelectValues = (selected) => ({
    character: '',
    currStage: [...Array(selected.character === 'nr' ? 7 : 13).keys()].slice(1),
    currSub: [...Array(7).keys()].slice(1),
    targetStage: [...Array(selected.character === 'nr' ? 7 : 13).keys()].slice(selected.currStage),
    targetSub: [...Array(7).keys()]
        .slice(selected.currStage === selected.targetStage ? selected.currSub : 1)
})

const StyledSelect = styled(Select)`
    && > div > div {
        padding: .6rem;
    }
`
const CharImgWrapper = styled(ImageSupplier)`
    && {
        max-width: 5.2rem;
    }
    margin-right: 1rem;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: .25rem;
`
const CharSelectPanel = ({
    selected,
    handleSelect,
}) => {
    const { pageString, charString } = useLanguage()

    const characterList = Object.keys(charString.name)
        .filter(key => isNaN(parseInt(key[0])) || parseInt(key[0]) < 3)

    const selectValues = getSelectValues(selected)

    const labels = {
        character: pageString.characters.potential.characterSelectTitle,
        currStage: pageString.characters.potential.currentSelectTitle,
        currSub: '',
        targetStage: pageString.characters.potential.targetSelectTitle,
        targetSub: ''
    }

    return (<>
        <Header
            title={pageString.characters.potential.characterPanelTitle}
            titleIcon={RaceIcon}
            border
        />
        <Grid container spacing={1} justify='space-around'>
            <Grid
                item
                xs={4}
                component={CharImgWrapper}
                name={`char_${selected.character}`}
                alt=''
            />
            <Grid
                item
                xs={8}
                container
                spacing={1}
                alignContent='space-around'
            >
                {Object.entries(selectValues).map(entry => (
                    <Grid
                        item
                        xs={entry[0] === 'character' ? 12 : 6}
                        component={StyledSelect}
                        label={labels[entry[0]]}
                        values={entry[0] === 'character' ? characterList : entry[1]}
                        renderValues={entry[0] === 'character'
                            ? characterList.map(key => charString.name[key]) : entry[1]}
                        value={selected[entry[0]]}
                        onChange={handleSelect(entry[0])}
                        key={entry[0]}
                    />
                ))}
            </Grid>
        </Grid>
    </>)
}

const MaterialWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .4rem;
    margin: .2rem 0;
    ${props => Object.entries(props.$layoutConfig).map(entry => (
    `@media screen and (min-width: ${entry[0]}px) {
            width: calc(100% / ${entry[1]});
        }
        `
))}
    > div {
        display: flex;
        align-items: center;
    }
`
const UiImg = styled(ImageSupplier)`
    width: 1.6rem;
    height: 1.6rem;
    margin-right: .4rem;
`
const UiImgWrapper = ({
    children,
    layoutConfig,
    name,
    alt
}) => (
    <MaterialWrapper
        $layoutConfig={layoutConfig}
    >
        <div>
            <UiImg
                name={name}
                alt={alt}
            />
            {children}
        </div>
    </MaterialWrapper>
)

const MaterialCard = styled(ItemCard)`
    > div:first-child {
        width: 2rem;
        height: 2rem;
        margin-right: .4rem;
    }
`
const MaterialBox = ({
    result,
    layoutConfig
}) => (<>
    {result.items &&
        Object.entries(result.items).map(item => (
            <MaterialWrapper
                key={item[0]}
                $layoutConfig={layoutConfig}
            >
                <div>
                    <MaterialCard
                        id={item[0]}
                        alt=''
                    />
                </div>
                {item[1]}
            </MaterialWrapper>
        ))}
    {result.items && result.money &&
        <UiImgWrapper
            name='money'
            alt='money'
            layoutConfig={layoutConfig}
        >
            {result.money}
        </UiImgWrapper>}
</>)

const MaterialContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    min-height: 6rem;
`
const resultLayoutConfig = {
    'en': {
        1360: 5,
        1200: 4,
        768: 3,
        0: 2
    },
    'zh-TW': {
        1360: 6,
        1200: 5,
        768: 4,
        624: 3,
        0: 2
    },
    'kr': {
        1360: 6,
        1200: 5,
        768: 4,
        624: 3,
        0: 2
    }
}

const ResultPanel = ({
    result,
    handleModalOpen
}) => {
    const { userLanguage, pageString } = useLanguage()

    return (<>
        <Header
            title={pageString.characters.potential.resultDemandTitle}
            titleIcon={ItemIcon}
            withHelp
            onClickHelp={handleModalOpen}
            border
        />
        <MaterialContainer>
            <MaterialBox
                result={result}
                layoutConfig={resultLayoutConfig[userLanguage]}
            />
        </MaterialContainer>
        <Header
            title={pageString.characters.potential.resultBuffTitle}
            titleIcon={BuffIcon}
            border
        />
        <UiImgWrapper
            layoutConfig={resultLayoutConfig[userLanguage]}
            name='ui_small_atk'
            alt='ATK'
        >
            {`${result.buff.ATK} %`}
        </UiImgWrapper>
        <UiImgWrapper
            layoutConfig={resultLayoutConfig[userLanguage]}
            name='ui_small_hp'
            alt='HP'
        >
            {`${result.buff.HP} %`}
        </UiImgWrapper>
        <UiImgWrapper
            layoutConfig={resultLayoutConfig[userLanguage]}
            name='ui_small_potentialPassive'
            alt='Passive'
        >
            {`${result.buff.PASSIVE === 0 ? '-'
                : result.buff.PASSIVE === 1 ? '1'
                    : result.buff.PASSIVE === 2 ? '2'
                        : '1 & 2'
                }`}
        </UiImgWrapper>
    </>)
}

const Potential = () => {
    const { pageString } = useLanguage()

    const [state, setState] = useState({
        character: '101',
        currStage: 1,
        currSub: 1,
        targetStage: 1,
        targetSub: 1,
        result: {
            items: undefined,
            money: 0,
            buff: {
                ATK: 0,
                HP: 0,
                PASSIVE: 0
            },
        },
        isHelpModalOpen: false,
    })

    const handleSelect = (attr) => (event) => {
        let newState = { ...state }

        const selected = event.target.value

        newState[attr] = attr === 'character' ? selected : parseInt(selected)

        // validate auto updated values
        if (selected === 'nr') {
            newState.currStage = state.currStage > 6 ? 1 : state.currStage
            newState.targetStage = state.targetStage > 6 ? 1 : state.targetStage
        }

        // make sure target is always not smaller than current
        newState.targetStage = Math.max(newState.targetStage, newState.currStage)
        if (newState.targetStage === newState.currStage) {
            newState.targetSub = Math.max(newState.targetSub, newState.currSub)
        }

        const result = calcCharPotential(
            newState.character,
            [newState.currStage, newState.currSub],
            [newState.targetStage, newState.targetSub]
        )

        result.buff.ATK = Math.round(result.buff.ATK * 100) / 100
        result.buff.HP = Math.round(result.buff.HP * 100) / 100

        newState.result = result
        setState(newState)
    }

    const handelHelpModal = (boolean) => () => {
        setState((state) => ({
            ...state,
            isHelpModalOpen: boolean,
        }))
    }

    return (<>
        <Head
            title={pageString.characters.potential.helmet.title}
            description={pageString.characters.potential.helmet.description}
            path='/characters/potential/'
        />
        <Panels panelsWidth={['30%', '70%']}>
            <CharSelectPanel
                selected={{
                    character: state.character,
                    currStage: state.currStage,
                    currSub: state.currSub,
                    targetStage: state.targetStage,
                    targetSub: state.targetSub
                }}
                handleSelect={handleSelect}
            />
            <ResultPanel
                result={state.result}
                handleModalOpen={handelHelpModal(true)}
            />
        </Panels>
        <TextModal
            title={pageString.characters.potential.helpModal.title}
            open={state.isHelpModalOpen}
            onClose={handelHelpModal(false)}
            content={pageString.characters.potential.helpModal.content}
            ariaLabelledby="help-modal-title"
            ariaDescribedby="help-modal-description"
        />
    </>)
}

export default Potential