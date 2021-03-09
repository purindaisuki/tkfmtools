import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Form } from 'react-bootstrap';
import Head from 'components/Head';
import ImageSupplier from 'components/ImageSupplier';
import { NumForm, Select, TwoStageForm } from 'components/CharPotential';
import { calcStats } from 'components/CharStats'
import MyHeader from 'components/MyHeader'
import { LanguageContext } from 'components/LanguageProvider';
import charsData from 'gamedata/character.json';

const charByPositionData = [...Array(5)].map(i => [])
charsData.forEach((c, idx) => {
    charByPositionData[c.tags.position - 5].push({ id: c.id, idx: idx })
})

const StyledForm = styled(Form)`
    width: 12rem;
    div {
        margin-bottom: .2rem;
    }
    > div:last-child > div {
    margin-bottom: 0;
    }
`
const StyledCharContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    margin-right: 2rem;
`
const CharImgWrapper = styled(ImageSupplier)`
    width: 7rem;
    margin-right: .6rem;
`
const CharContainer = ({ character, state, handleSelect }) => {
    const { pageString, charString } = useContext(LanguageContext)

    return (
        <StyledCharContainer>
            <CharImgWrapper
                name={`char_small_${character.id}`}
                alt={charString.name[character.id]}
            />
            <StyledForm onSubmit={(event) => event.preventDefault()}>
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
                            value={state.level}
                            min='0'
                            max='60'
                            onChange={handleSelect('level')}
                            placeholder='-'
                        />
                    </Col>
                    <NumForm
                        as={Col}
                        defaultValue={state.star}
                        minNum={4 - character.id[0]}
                        maxNum={5}
                        onChange={handleSelect('star')}
                    />
                    <NumForm
                        as={Col}
                        defaultValue={state.discipline}
                        minNum={0}
                        maxNum={3}
                        disabled={character.id[0] === '4'}
                        onChange={handleSelect('discipline')}
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
                />
            </StyledForm>
        </StyledCharContainer>
    )
}

const CharGroupsContainer = styled.div`
    width: 100%;
    > div:nth-child(odd) > div > span {
        display: flex;
        align-items: center;
        margin-bottom: .4rem;
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
    const { pageString, charString } = useContext(LanguageContext)

    const [state, setState] = useState(charsData.map(c => ({
        id: c.id,
        rarity: c.rarity,
        attribute: c.tags.attribute,
        position: c.tags.position - 5,
        level: 0,
        potential: 1,
        potentialSub: 0,
        discipline: 0,
        star: c.rarity,
        ATK: c.stats.initATK,
        HP: c.stats.initHP,
        exist: false,
    })))

    // read state when page loaded
    useEffect(() => {
        if (pageState) {
            setState(pageState)
        } else {
            
        }
    }, [])

    const handleSelect = (idx) => (attr) => (event) => {
        const selected = parseInt(event.target.value)

        let charState = { ...state[idx], [attr]: parseInt(selected) }

        if (isNaN(parseInt(charState.level)) || charState.level < 0 || charState.level > 60) {
            // not valid
            return
        }

        if (charState.potential !== 1 && state[idx].potentialSub === 0) {
            charState.potentialSub = 1
        }

        const { stats } = charsData[idx]
        const { rarity, attribute, position, ATK, HP, exist, ...rest } = charState
        const result = calcStats(...Object.values(rest), ...Object.values(stats))

        let newState = state.slice()
        newState[idx] = { ...charState, ...result, exist: true }
        setState(newState)
        handlePageState(newState)
    }

    const positionImg = [
        'attacker',
        'defender',
        'healer',
        'obsructer',
        'supporter'
    ]

    return (
        <>
            <Head
                title={pageString.analysis.index.helmet.title}
                description={pageString.analysis.index.helmet.description}
                path='/analysis/'
            />
            <CharGroupsContainer>
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
                        />
                        <CharsContainer>
                            {group.map((c, i) => (
                                <CharContainer
                                    character={c}
                                    state={state[c.idx]}
                                    handleSelect={handleSelect(c.idx)}
                                    key={i}
                                />
                            ))}
                        </CharsContainer>
                    </React.Fragment>
                ))}
            </CharGroupsContainer>
        </>
    )
}

export default Index