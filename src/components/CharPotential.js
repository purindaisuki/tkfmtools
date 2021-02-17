import React from 'react';
import styled from 'styled-components';
import { ContainerHeader, FilterPanel, HelpModal } from '../components/FilterComponents';
import { AlertIcon, BuffIcon, ItemIcon, RaceIcon, HelpIcon } from './Icon';
import { Col, Form } from 'react-bootstrap';
import data from '../../src/characterPotential.json';
import { Snackbar } from '@material-ui/core';
import { LanguageContext } from './LanguageProvider';

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
const IconWrapper = styled.div`
    svg {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .4rem;
        fill: ${props => props.theme.colors.onSurface};
    }
`
const CharImgWrapper = styled.img`
    height: 15rem;
    margin-right: 1rem;
    border: 2px solid ${props => props.theme.colors.secondary};
    border-radius: .25rem;
`
const ContainerBody = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
const Gutter = styled.div`
    margin-top: 3rem;
`

const SelectPanel = (props) => {
    const { stringData } = React.useContext(LanguageContext)

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
                        {stringData.potential.character.characterPanelTitle}
                    </IconWrapper>
                }
            />
            <ContainerBody>
                <CharImgWrapper
                    src={`${process.env.PUBLIC_URL}/img/char_${data.characters[props.character].id}.png`}
                    alt=''
                />
                <div>
                    <Form>
                        {stringData.potential.character.characterSelectTitle}
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
                                        Object.keys(data.characters)
                                            .map((c, idx) => <option key={idx}>
                                                {stringData.characters.name[parseInt(c)]}
                                            </option>)
                                    }
                                </Select>
                            </Form.Group>
                        </Form.Row>
                        <Gutter />
                        {stringData.potential.character.currentSelectTitle}
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
                                        .map(i => <option key={i}>{i}</option>)}
                                </Select>
                            </Form.Group>
                        </Form.Row>
                        {stringData.potential.character.targetSelectTitle}
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
                                        .map(i => <option key={i}>{i}</option>)}
                                </Select>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>
            </ContainerBody>
        </FilterPanel>
    )
}

const ImgMaterialWrapper = styled.img`
    width: 2rem;
    height: 2rem;
    margin-right: .4rem;
`
const ImgOtherWrapper = styled.img`
    width: 1.6rem;
    height: 1.6rem;
    margin-right: .4rem;
`
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
    ${props => Object.entries(props.$layoutConfig).map(entries => (
    `@media screen and (min-width: ${entries[0]}px) {
            width: calc(100% / ${entries[1]});
        }
        `
    ))}
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

const ResultPanel = (props) => {
    const { userLanguage, stringData } = React.useContext(LanguageContext)

    const [modalOpen, setModalOpen] = React.useState(false)

    const itemIdToName = (id) => {
        if (id === '801') return stringData.items.name[35]
        if (id === '901') return stringData.items.name[36]

        const rank = Math.floor(id / 100)
        const item = id % 100
        if (rank <= 3) {
            return stringData.items.name[rank * 5 + item - 1]
        }

        return stringData.items.name[rank * 5 + item + 4]
    }

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
        if (!props.result.items) return <></>

        return (
            <>
                {Object.entries(props.result.items).map((item, idx) => (
                    <MaterialWrapper
                        key={idx}
                        $layoutConfig={resultLayoutConfig}
                    >
                        <div>
                            <ImgMaterialWrapper
                                src={
                                    `${process.env.PUBLIC_URL}/img/item_${('00' + item[0]).slice(-3)}.png`
                                }
                                alt=''
                            />
                            {`${itemIdToName(item[0])}`}
                        </div>
                        {item[1]}
                    </MaterialWrapper>
                ))}
                <MaterialWrapper
                    $layoutConfig={resultLayoutConfig}
                >
                    <ImgMaterialWrapper
                        src={`${process.env.PUBLIC_URL}/img/money.png`}
                        alt='money'
                    />
                    {props.result.money}
                </MaterialWrapper>
            </>
        )
    }

    return (
        <FilterPanel widthConfig={props.widthConfig}>
            <div>
                <ContainerHeader
                    title={
                        <IconWrapper>
                            {ItemIcon}
                            {stringData.potential.character.resultDemandTitle}
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
                            {stringData.potential.character.resultBuffTitle}
                        </IconWrapper>
                    }
                />
                <div>
                    <MaterialWrapper
                        $layoutConfig={resultLayoutConfig}
                    >
                        <div>
                            <ImgOtherWrapper
                                src={`${process.env.PUBLIC_URL}/img/ATK.png`}
                                alt='ATK'
                            />
                            {`${props.result.buff.ATK} %`}
                        </div>
                    </MaterialWrapper>
                    <MaterialWrapper
                        $layoutConfig={resultLayoutConfig}
                    >
                        <div>
                            <ImgOtherWrapper
                                src={`${process.env.PUBLIC_URL}/img/HP.png`}
                                alt='HP'
                            />
                            {`${props.result.buff.HP} %`}
                        </div>
                    </MaterialWrapper>
                </div>
            </div>
            <HelpModal
                modalOpen={modalOpen}
                handleModalClose={() => setModalOpen(false)}
                content={stringData.potential.character.modal}
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
    const { stringData } = React.useContext(LanguageContext)

    const [state, setState] = React.useState({
        character: '0',
        currStage: "1",
        currSub: "1",
        targetStage: "1",
        targetSub: "1",
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

        // parse character name to id
        const selected = attr === 'character'
            ? stringData.characters.name.indexOf(event.target.value).toString()
            : event.target.value

        newState[attr] = selected
        if (selected === '40') {
            newState.currStage = state.currStage > 6 ? 1 : state.currStage
            newState.targetStage = state.targetStage > 6 ? 1 : state.targetStage
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
        const type = data.characters[newState.character].type
        const stages = data.type[type]
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
                let buff = data.itemMap[stage.pattern[j]].type
                result.buff[buff] += stage.buff[j]
            }
        }
        // parse result
        let parsedItem = {}
        for (const [key, value] of Object.entries(result.items)) {
            let itemId = data.itemMap[key[0]].id.map(id => (
                (parseInt(key[1]) * 100 + id).toString()
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

    const stages = [...Array(state.character === '40' ? 7 : 13).keys()]
        .slice(1).map(i => <option key={i}>{i}</option>)

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
                message={stringData.potential.character.snackbarMsg}
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