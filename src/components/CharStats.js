import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Col, Form } from 'react-bootstrap';
import { FilterPanel } from './FilterComponents';
import MyHeader from './MyHeader';
import {
    calcPotential,
    CharSelectPanel,
    NumForm,
    Select,
    TwoStageForm
} from './CharPotential';
import { TextModal } from './MyModal';
import { LanguageContext } from './LanguageProvider';
import { AttackIcon, HpIcon } from './icon';
import charData from 'gamedata/character.json';

const StatsForm = ({
    handleSelect,
    potentialMaxNum,
    potentialSubMinNum,
    disciplineDisabled,
    starMinNum,
}) => {
    const { pageString } = useContext(LanguageContext)

    return (
        <>
            <Form.Row>
                <Col>
                    {pageString.characters.stats.levelTitle}
                </Col>
                <Col>
                    {pageString.characters.stats.starTitle}
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Select
                        type='number'
                        min='1'
                        max='60'
                        onChange={handleSelect('level')}
                        placeholder={1}
                    />
                </Col>
                <NumForm
                    as={Col}
                    minNum={starMinNum}
                    maxNum={5}
                    onChange={handleSelect('star')}
                />
            </Form.Row>
            <TwoStageForm
                title={pageString.characters.stats.potentialTitle}
                subMinNum={potentialSubMinNum}
                minNum={1}
                maxNum={potentialMaxNum}
                selectAttrs={['potential', 'potentialSub']}
                handleSelect={handleSelect}
            />
            {pageString.characters.stats.disciplineTitle}
            <Form.Row>
                <NumForm
                    as={Col}
                    minNum={0}
                    maxNum={3}
                    disabled={disciplineDisabled}
                    onChange={handleSelect('discipline')}
                />
            </Form.Row>
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
const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const StatsWrapper = styled.div`
    margin: 1.5rem .5rem;
    svg {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .2rem;
        fill: ${props => props.theme.colors.onSurface}; 
    }
`
const ResultPanel = ({
    widthConfig,
    result
}) => {
    const { pageString } = useContext(LanguageContext)

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <StyledPanel widthConfig={widthConfig}>
            <MyHeader
                title={pageString.characters.stats.resultTitle}
                withHelp
                onClickHelp={() => setModalOpen(true)}
            />
            <BodyContainer>
                <StatsWrapper>
                    {AttackIcon}{`ATK: ${result.ATK}`}
                </StatsWrapper>
                <StatsWrapper>
                    {HpIcon}{`HP: ${result.HP}`}
                </StatsWrapper>
            </BodyContainer>
            <TextModal
                title={pageString.characters.stats.helpModal.title}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                content={pageString.characters.stats.helpModal.content}
                ariaLabelledby="help-modal-title"
                ariaDescribedby="help-modal-description"
            />
        </StyledPanel>
    )
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
const StyledCharPanel = styled(CharSelectPanel)`
    width: 35%;
    @media screen and (max-width: 992px) {
        width: 100%;
    }
`
const TableGutter = styled.div`
    width: 1rem;
    @media screen and (max-width: 992px) {
        display: hidden;
    }
`
const resultPanelWidthConfig = {
    default: 'calc(65% - 1rem)',
    992: '100%',
}

export const calcStats = (
    character,
    level,
    potential,
    potentialSub,
    discipline,
    star,
    initATK,
    initHP
) => {
    const levelBuff = 1.1 ** (level - 1)
    const { buff } = calcPotential(
        character,
        [1, 0],
        [potential, potentialSub]
    )
    const disciplineBuff = 1 + discipline * .05
    const starBuff = (star + 5) / (9 - character[0])

    return ({
        ATK: Math.floor(initATK * levelBuff * (1 + buff.ATK / 100) * disciplineBuff * starBuff),
        HP: Math.floor(initHP * levelBuff * (1 + buff.HP / 100) * disciplineBuff * starBuff)
    })
}

export default function CharStats() {
    const [state, setState] = useState({
        character: '101',
        level: 1,
        potential: 1,
        potentialSub: 0,
        discipline: 0,
        star: 3,
        result: {
            ATK: 920,
            HP: 3476,
        }
    })

    const handleSelect = (attr) => (event) => {
        const selected = event.target.value

        let newState = { 
            ...state,
            [attr] : attr === 'character' ? selected : parseInt(selected)
         }

        if (isNaN(parseInt(newState.level)) || newState.level < 0 || newState.level > 60) {
            setState((state) => ({
                ...state,
                level: 1,
                result: {
                    ATK: '-',
                    HP: '-',
                }
            }))

            return
        }

        // validate auto updated values
        if (newState.character[0] === '4' || newState.character[0] === '3') {
            if (state.potential > 6) {
                newState.potential = 1
            }

            if (newState.character[0] === '4') {
                newState.discipline = 0
            }
        }
        if (newState.potential !== 1 && state.potentialSub === 0) {
            newState.potentialSub = 1
        }
        if (4 - newState.character[0] > state.star) {
            newState.star = 4 - newState.character[0]
        }

        // calculate status
        const { initATK, initHP } = charData.find(c => c.id === newState.character).stats
        const { result, ...rest } = newState

        newState.result = calcStats(...Object.values(rest), initATK, initHP)

        setState(newState)
    }

    return (
        <CalculatorContainer resultPanelWidthConfig={resultPanelWidthConfig}>
            <StyledCharPanel
                handleSelect={handleSelect}
                character={state.character}
            >
                <StatsForm
                    handleSelect={handleSelect}
                    potentialSubMinNum={state.potential === 1 ? 0 : 1}
                    potentialMaxNum={state.character[0] === '4' || state.character[0] === '3'
                        ? 6 : 12}
                    disciplineDisabled={state.character[0] === '4'}
                    starMinNum={4 - state.character[0]}
                />
            </StyledCharPanel>
            <TableGutter />
            <ResultPanel
                widthConfig={resultPanelWidthConfig}
                result={state.result}
            />
        </CalculatorContainer>
    )
}