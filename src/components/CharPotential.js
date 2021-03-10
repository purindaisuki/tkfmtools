import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Col, Form } from 'react-bootstrap';
import { FilterPanel } from './FilterComponents';
import MyHeader from './MyHeader';
import { ItemCard } from './ItemShowcase';
import ImageSupplier from './ImageSupplier';
import { TextModal } from './MyModal';
import { LanguageContext } from './LanguageProvider';
import { BuffIcon, ItemIcon, RaceIcon } from './icon';
import charData from 'gamedata/character.json';
import potentialData from 'gamedata/potential.json';

export const Select = styled(Form.Control)`
    && {
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
        border-radius: .25rem;
        padding: .1rem;
        border: 1px solid ${props => props.theme.colors.secondary};
        width: 100%;
        height: 1.6rem;
        &:focus {
            box-shadow: 0 0 .4rem ${props => props.theme.colors.secondary};
        }
    }
`
export const NumForm = ({
    as,
    minNum,
    maxNum,
    onChange,
    defaultValue,
    disabled
}) => (
    <Form.Group as={as}>
        <Select
            as="select"
            value={defaultValue}
            onChange={onChange}
            disabled={disabled}
        >
            {disabled
                ? <option>-</option>
                : [...Array(maxNum + 1).keys()].slice(minNum)
                    .map(i => <option value={i} key={i}>{i}</option>)}
        </Select>
    </Form.Group>
)

export const TwoStageForm = ({
    title,
    handleSelect,
    subMinNum,
    minNum,
    maxNum,
    selectAttrs,
    defaultValues
}) => (
    <>
        {title}
        <Form.Row>
            <NumForm
                as={Col}
                minNum={minNum}
                maxNum={maxNum}
                onChange={handleSelect(selectAttrs[0])}
                defaultValue={defaultValues ? defaultValues[0] : undefined}
            />
            {'–'}
            <NumForm
                as={Col}
                minNum={subMinNum}
                maxNum={6}
                onChange={handleSelect(selectAttrs[1])}
                defaultValue={defaultValues ? defaultValues[1] : undefined}
            />
        </Form.Row>
    </>
)

const StyledForm = styled(Form)`
    form {
        width: 13.5rem;
        > div:last-child > div {
        margin-bottom: 0;
        }
    }
`
const CharContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
const CharImgWrapper = styled(ImageSupplier)`
    width: 5.1rem;
    margin-right: 1rem;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: .25rem;
`
const Gutter = styled.div`
    margin-top: 4rem;
`
export const CharSelectPanel = ({
    children,
    className,
    character,
    handleSelect,
    lumpNRChars,
}) => {
    const { pageString, charString } = useContext(LanguageContext)

    const widthConfig = {
        default: '25%',
        992: '100%',
    }

    return (
        <FilterPanel
            widthConfig={widthConfig}
            className={className}
        >
            <MyHeader
                title={pageString.characters.potential.characterPanelTitle}
                titleIcon={RaceIcon}
            />
            <CharContainer>
                <CharImgWrapper
                    name={`char_${character}`}
                    alt=''
                />
                <StyledForm onSubmit={(event) => event.preventDefault()}>
                    {pageString.characters.potential.characterSelectTitle}
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Select
                                as="select"
                                onChange={handleSelect('character')}
                            >
                                {charData.map((char, idx) => {
                                    if (char.rarity < 2 && lumpNRChars) {
                                        return false
                                    }

                                    return (
                                        <option value={char.id} key={idx}>
                                            {charString.name[char.id]}
                                        </option>
                                    )
                                })}
                                {lumpNRChars
                                    ? <option value={'nr'} key={'nr'}>
                                        {charString.name.nr}
                                    </option>
                                    : null}
                            </Select>
                        </Form.Group>
                    </Form.Row>
                    {children}
                </StyledForm>
            </CharContainer>
        </FilterPanel >
    )
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
}) => {
    if (!result.items) return null

    return (
        <>
            {Object.entries(result.items).map((item, idx) => (
                <MaterialWrapper
                    key={idx}
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
            <UiImgWrapper
                name='money'
                alt='money'
                layoutConfig={layoutConfig}
            >
                {result.money}
            </UiImgWrapper>
        </>
    )
}

const StyledPanel = styled(FilterPanel)`
    @media screen and (max-width: 992px) {
        width: ${props => props.widthConfig[992]};
        margin-left: calc(100% - ${props => props.widthConfig[992]});
        position: relative;
        margin-top: 1rem;
    }
`
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
    }
}

const ResultPanel = ({
    widthConfig,
    result,
    handleModalOpen
}) => {
    const { userLanguage, pageString } = useContext(LanguageContext)

    return (
        <StyledPanel widthConfig={widthConfig}>
            <div>
                <MyHeader
                    title={pageString.characters.potential.resultDemandTitle}
                    titleIcon={ItemIcon}
                    withHelp
                    onClickHelp={handleModalOpen}
                />
                <MaterialContainer>
                    <MaterialBox
                        result={result}
                        layoutConfig={resultLayoutConfig[userLanguage]}
                    />
                </MaterialContainer>
            </div>
            <div>
                <MyHeader
                    title={pageString.characters.potential.resultBuffTitle}
                    titleIcon={BuffIcon}
                />
                <div>
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
                </div>
            </div>
        </StyledPanel>
    )
}

export const calcPotential = (char, from, to) => {
    const result = {
        items: {},
        money: 0,
        buff: {
            ATK: 0,
            HP: 0,
            PASSIVE: 0
        },
    }
    const type = (char === 'nr' || char[0] === '4' || char[0] === '3')
        ? 3
        : charData.find(c => c.id === char).potentialType

    const stages = potentialData.type[type]
    for (let i = from[0] - 1; i < to[0] - 1 + 1; i++) {
        let stage = stages[i]
        for (
            let j = i === from[0] - 1 ? from[1] - 1 : 0;
            j < (i === to[0] - 1 ? to[1] : 6);
            j++
        ) {
            if (j < 0) continue

            let id = stage.pattern[j] + stage.rank[j]
            if (result.items[id]) {
                result.items[id] += stage.num[j]
            } else {
                result.items[id] = stage.num[j]
            }
            result.money += (i + 1) * 8000
            let buff = potentialData.itemMap[stage.pattern[j]].type
            result.buff[buff] += stage.buff[j]
        }
    }
    // parse result
    let parsedItem = {}
    for (const [key, value] of Object.entries(result.items)) {
        let itemId = potentialData.itemMap[key[0]].id.map(id => (
            key[1] === '9' ? '902'
                : key[1] === '8' ? '901'
                    : (parseInt(key[1]) * 100 + id).toString()
        ))
        for (let i of itemId) {
            if (parsedItem[i]) {
                parsedItem[i] += value
            } else {
                parsedItem[i] = value
            }
        }
    }

    result.items = parsedItem
    return result
}

const CalculatorContainer = styled.div`
    display: table;
    width: 100%;
    > div {
        display: table-cell;
    }
    @media screen and (max-width: 992px) {
        display: block;
        > div {
            display: block; 
        }
    }
`
const TableGutter = styled.div`
    width: 1rem;
    @media screen and (max-width: 992px) {
        display: hidden;
    }
`
const resultPanelWidthConfig = {
    default: 'calc(75% - 1rem)',
    992: '100%',
}
export default function CharPotential() {
    const { pageString } = useContext(LanguageContext)

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

        const result = calcPotential(
            newState.character,
            [newState.currStage, newState.currSub],
            [newState.targetStage, newState.targetSub]
        )

        result.buff.ATK = Math.round(result.buff.ATK * 100) / 100
        result.buff.HP = Math.round(result.buff.HP * 100) / 100

        newState.result = result
        setState(newState)
    }

    const maxStage = state.character === 'nr' ? 6 : 12

    const handelHelpModal = (boolean) => () => {
        setState((state) => ({
            ...state,
            isHelpModalOpen: boolean,
        }))
    }

    return (
        <>
            <CalculatorContainer
                resultPanelWidthConfig={resultPanelWidthConfig}
            >
                <CharSelectPanel
                    handleSelect={handleSelect}
                    character={state.character}
                    lumpNRChars
                >
                    <Gutter />
                    <TwoStageForm
                        title={pageString.characters.potential.currentSelectTitle}
                        subMinNum={1}
                        minNum={1}
                        maxNum={maxStage}
                        selectAttrs={['currStage', 'currSub']}
                        handleSelect={handleSelect}
                    />
                    <TwoStageForm
                        title={pageString.characters.potential.targetSelectTitle}
                        subMinNum={state.currStage === state.targetStage ? state.currSub : 1}
                        minNum={state.currStage}
                        maxNum={maxStage}
                        selectAttrs={['targetStage', 'targetSub']}
                        handleSelect={handleSelect}
                    />
                </CharSelectPanel>
                <TableGutter />
                <ResultPanel
                    widthConfig={resultPanelWidthConfig}
                    result={state.result}
                    handleModalOpen={handelHelpModal(true)}
                />
            </CalculatorContainer>
            <TextModal
                title={pageString.characters.potential.helpModal.title}
                open={state.isHelpModalOpen}
                onClose={handelHelpModal(false)}
                content={pageString.characters.potential.helpModal.content}
                ariaLabelledby="help-modal-title"
                ariaDescribedby="help-modal-description"
            />
        </>
    )
}
