import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Snackbar } from '@material-ui/core';
import { Col, Form } from 'react-bootstrap';
import { ContainerHeader, FilterPanel, HelpModal } from '../components/FilterComponents';
import ImageSupplier from './ImageSupplier';
import charData from '../gamedata/character.json';
import potentialData from '../gamedata/potential.json';
import { LanguageContext } from './LanguageProvider';
import { AlertIcon, BuffIcon, ItemIcon, RaceIcon, HelpIcon } from './icon';

const IconWrapper = styled.div`
    svg {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .4rem;
        fill: ${props => props.theme.colors.onSurface};
    }
`
const ContainerBody = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
const CharImgWrapper = styled(ImageSupplier)`
    width: 5rem;
    height: 15rem;
    margin-right: 1rem;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: .25rem;
`
const Select = styled(Form.Control)`
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    border-radius: .25rem;
    padding: .1rem;
    border: 1px solid ${props => props.theme.colors.secondary};
    width: 100%;
    &:focus {
        box-shadow: 0 0 .4rem ${props => props.theme.colors.secondary};
    }
`
const Gutter = styled.div`
    margin-top: 3rem;
`
const SelectPanel = (props) => {
    const { pageString, charString } = useContext(LanguageContext)

    const widthConfig = {
        default: '25%',
        992: '100%',
    }

    return (
        <FilterPanel widthConfig={widthConfig}>
            <ContainerHeader
                title={
                    <IconWrapper>
                        {RaceIcon}
                        {pageString.characters.potential.characterPanelTitle}
                    </IconWrapper>
                }
            />
            <ContainerBody>
                <CharImgWrapper
                    name={`char_${props.character}.png`}
                    alt=''
                />
                <div>
                    <Form>
                        {pageString.characters.potential.characterSelectTitle}
                        <br />
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Select
                                    as="select"
                                    custom
                                    size="sm"
                                    onChange={props.handleSelect('character')}
                                >
                                    {
                                        charData.map((char, idx) => {
                                            if (char.rarity < 2) return false

                                            return (
                                                <option value={char.id} key={idx}>
                                                    {charString.name[char.id]}
                                                </option>
                                            )
                                        })
                                    }
                                    <option value={'nr'} key={'nr'}>
                                        {charString.name['nr']}
                                    </option>
                                </Select>
                            </Form.Group>
                        </Form.Row>
                        <Gutter />
                        {pageString.characters.potential.currentSelectTitle}
                        <br />
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Select
                                    as="select"
                                    custom
                                    size="sm"
                                    onChange={props.handleSelect('currStage')}
                                >
                                    {props.stages}
                                </Select>
                            </Form.Group>
                            –
                            <Form.Group as={Col}>
                                <Select
                                    as="select"
                                    custom
                                    size="sm"
                                    onChange={props.handleSelect('currSub')}
                                >
                                    {[...Array(7).keys()].slice(1)
                                        .map(i => <option value={i} key={i}>{i}</option>)}
                                </Select>
                            </Form.Group>
                        </Form.Row>
                        {pageString.characters.potential.targetSelectTitle}
                        <br />
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Select
                                    as="select"
                                    custom
                                    size="sm"
                                    onChange={props.handleSelect('targetStage')}
                                >
                                    {props.stages}
                                </Select>
                            </Form.Group>
                            –
                            <Form.Group as={Col}>
                                <Select
                                    as="select"
                                    custom
                                    size="sm"
                                    onChange={props.handleSelect('targetSub')}
                                >
                                    {[...Array(7).keys()].slice(1)
                                        .map(i => <option value={i} key={i}>{i}</option>)}
                                </Select>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>
            </ContainerBody>
        </FilterPanel>
    )
}

const MaterialContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    min-height: 6rem;
`
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
const MaterialImg = styled(ImageSupplier)`
    width: 2rem;
    height: 2rem;
    margin-right: .4rem;
`
const HelpIconWrapper = styled.div`
    margin-right: auto;
    svg {
        fill: ${props => props.theme.colors.secondary};
        width: 1.4rem;
        height: 1.4rem;
        margin-left: .4rem;
        cursor: pointer;
        vertical-align: top;
    }
`
const OtherImg = styled(ImageSupplier)`
    width: 1.6rem;
    height: 1.6rem;
    margin-right: .4rem;
`
const ResultPanel = ({
    widthConfig,
    result
}) => {
    const { userLanguage, pageString, itemString } = useContext(LanguageContext)

    const [modalOpen, setModalOpen] = useState(false)

    const resultLayoutConfig = userLanguage === 'en'
        ? {
            1360: 5,
            1200: 4,
            768: 3,
            0: 2
        }
        : {
            1360: 6,
            1200: 5,
            768: 4,
            624: 3,
            0: 2
        }

    const MaterialBox = () => {
        if (!result.items) return <></>

        return (
            <>
                {Object.entries(result.items).map((item, idx) => (
                    <MaterialWrapper
                        key={idx}
                        $layoutConfig={resultLayoutConfig}
                    >
                        <div>
                            <MaterialImg
                                name={`item_${item[0]}.png`}
                                alt=''
                            />
                            {`${itemString.name[item[0]]}`}
                        </div>
                        {item[1]}
                    </MaterialWrapper>
                ))}
                <MaterialWrapper
                    $layoutConfig={resultLayoutConfig}
                >
                    <MaterialImg
                        name='money.png'
                        alt='money'
                    />
                    {result.money}
                </MaterialWrapper>
            </>
        )
    }

    const PictureSquare = ({
        children,
        name,
        alt
    }) => (
        <MaterialWrapper
            $layoutConfig={resultLayoutConfig}
        >
            <div>
                <OtherImg
                    name={name}
                    alt={alt}
                />
                {children}
            </div>
        </MaterialWrapper>
    )

    return (
        <FilterPanel widthConfig={widthConfig}>
            <div>
                <ContainerHeader
                    title={
                        <IconWrapper>
                            {ItemIcon}
                            {pageString.characters.potential.resultDemandTitle}
                            <HelpIconWrapper
                                onClick={() => setModalOpen(true)}
                            >
                                {HelpIcon}
                            </HelpIconWrapper>
                        </IconWrapper>
                    }
                />
                <MaterialContainer>
                    <MaterialBox />
                </MaterialContainer>
            </div>
            <div>
                <ContainerHeader
                    title={
                        <IconWrapper>
                            {BuffIcon}
                            {pageString.characters.potential.resultBuffTitle}
                        </IconWrapper>
                    }
                />
                <div>
                    <PictureSquare
                        name='ui_small_atk.png'
                        alt='ATK'
                    >
                        {`${result.buff.ATK} %`}
                    </PictureSquare>
                    <PictureSquare
                        name='ui_small_hp.png'
                        alt='HP'
                    >
                        {`${result.buff.HP} %`}
                    </PictureSquare>
                    <PictureSquare
                        name='ui_small_potentialPassive.png'
                        alt='Passive'
                    >
                        {`${result.buff.PASSIVE === 0 ? '-'
                            : result.buff.PASSIVE === 1 ? '1'
                                : result.buff.PASSIVE === 2 ? '2'
                                    : '1 & 2'
                            }`}
                    </PictureSquare>
                </div>
            </div>
            <HelpModal
                modalOpen={modalOpen}
                handleModalClose={() => setModalOpen(false)}
                content={pageString.characters.potential.modal}
            />
        </FilterPanel>
    )
}

const FilterContainer = styled.div`
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
    > div:last-child {
        @media screen and (max-width: 992px) {
            width: ${props => props.resultPanelWidthConfig[992]};
            margin-left: calc(100% - ${props => props.resultPanelWidthConfig[992]});
            position: relative;
            margin-top: 1rem;
        }
    }
    > .MuiSnackbar-root {
        > div {
            background-color: #ff9800;
            font-size: medium;
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
            > .MuiSnackbarContent-action {
                margin: 0;
                padding: 0;
                svg 
                {
                    width: 1.4rem;
                    height: 1.4rem;
                    fill: #fff;
                }
            }
        }
    }
`
const TableGutter = styled.div`
    width: 0;
    padding: .5rem;
    @media screen and (max-width: 992px) {
        padding: 0;
    }
`
const resultPanelWidthConfig = {
    default: 'calc(75% - 1rem)',
    992: '100%',
}

export default function CharPotential() {
    const { pageString, charString } = useContext(LanguageContext)

    const [state, setState] = useState({
        character: '101',
        currStage: '1',
        currSub: '1',
        targetStage: '1',
        targetSub: '1',
        isValid: true,
        isSnackbarOpen: false,
        result: {
            items: undefined,
            money: 0,
            buff: {
                ATK: 0,
                HP: 0,
                PASSIVE: 0
            },
        },
    })

    const handleSelect = (attr) => (event) => {
        //update state
        let newState = { ...state }

        const selected = event.target.value

        newState[attr] = selected
        if (selected === 'nr') {
            newState.currStage = parseInt(state.currStage) > 6 ? 1 : state.currStage
            newState.targetStage = parseInt(state.targetStage) > 6 ? 1 : state.targetStage
        }
        newState.isValid =
            parseInt(newState.targetStage) > parseInt(newState.currStage) ||
            (parseInt(newState.targetStage) === parseInt(newState.currStage) &&
                parseInt(newState.targetSub) >= parseInt(newState.currSub))
        newState.isSnackbarOpen = !newState.isValid
        if (!newState.isValid) {
            newState.result = {
                items: undefined,
                money: 0,
                buff: {
                    ATK: 0,
                    HP: 0,
                    PASSIVE: 0
                },
            }
            setState(newState)
            return
        }
        let result = {
            items: {},
            money: 0,
            buff: {
                ATK: 0,
                HP: 0,
                PASSIVE: 0
            },
        }
        // calculate demand
        let type
        if (newState.character === 'nr') {
            type = 3
        } else {
            charData.forEach(char => {
                if (char.id === newState.character) {
                    type = char.potentialType
                    return false
                }
            })
        }

        const stages = potentialData.type[type]
        const start = newState.currStage - 1
        const end = newState.targetStage - 1
        for (let i = start; i < end + 1; i++) {
            let stage = stages[i]
            for (
                let j = i === start ? newState.currSub - 1 : 0;
                j < (i === end ? newState.targetSub : 6);
                j++
            ) {
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
        result.buff.ATK = Math.round(result.buff.ATK * 100) / 100
        result.buff.HP = Math.round(result.buff.HP * 100) / 100
        newState.result = result
        setState(newState)
    }

    const stages = [...Array(state.character === 'nr' ? 7 : 13).keys()]
        .slice(1).map(i => <option value={i} key={i}>{i}</option>)

    const handleSnackbarClose = () => setState((state) => ({
        ...state,
        isSnackbarOpen: false
    }))

    return (
        <FilterContainer
            resultPanelWidthConfig={resultPanelWidthConfig}
        >
            <Snackbar
                open={state.isSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                message={pageString.characters.potential.snackbarMsg}
                action={AlertIcon}
            />
            <SelectPanel
                handleSelect={handleSelect}
                stages={stages}
                character={state.character}
            />
            <TableGutter />
            <ResultPanel
                widthConfig={resultPanelWidthConfig}
                result={state.result}
            />
        </FilterContainer>
    )
}
