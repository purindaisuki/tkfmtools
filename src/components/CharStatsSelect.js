import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import useCharacterSelect from 'hooks/useCharacterSelect';

import ImageSupplier from 'components/ImageSupplier';
import Input, { Select } from 'components/Input';
import PotentialInput from 'components/PotentialInput';

const StyledSelect = styled(Select)`
    position: absolute;
    left: 1.6rem;
    background-color: ${props => props.theme.colors.surface};
`
const ImgSelect = ({
    type,
    values, value,
    onChange,
    disabled
}) => (
    <StyledSelect
        id={`select-${type}`}
        values={values}
        value={value}
        onChange={onChange}
        variant='outlined'
        size='small'
        inputProps={{ 'aria-label': type }}
        disabled={disabled}
    />
)

const StyledCharStatsSelect = styled(Grid)`
    position: absolute;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    top: .6rem;
    left: calc(14rem + 5%);
    && {
        width: 32rem;
    }
    > div {
        display: flex;
    }
    @media screen and (max-width: 1000px) {
        && {
            width: 28rem;
        }
    }
    @media screen and (max-width: 768px) {
        left: calc(7rem + 5%);
        && {
            width: 26rem;
        }
    }
    @media screen and (max-width: 599px) {
        top: .4rem;
        && {
            width: 14rem;
        }
    }
`
const StyledLabel = styled.label`
    margin: .1rem .4rem 0 .2rem;
`
const LevelInput = styled(Input)`
    width: 100%;
    height: 1.6rem;
    > div {
        width: 2rem;
        > input {
            padding: .2rem;
            text-align: center;
        }
    }
`
const UiImg = styled(ImageSupplier)`
    position: relative;
    width: 4.2rem;
    background-repeat: no-repeat;
    background-size: 1.6rem 1.6rem;
    background-position: 0 .3rem;
`
const StyledPotentialInput = styled(PotentialInput)`
    position: absolute;
    left: 1.8rem;
    && > div > div {
        width: 100%;
        > div {
            padding: .2rem;
            padding-left: .4rem;
            padding-right: 1rem;
        }
    }
    span {
        top: -.5rem;
    }
`
const CharStatsSelect = ({ className, char, levelInputId, onSelect }) => {
    const {
        charState, selectItems,
        setSelect, setCharState
    } = useCharacterSelect(char, onSelect)

    useEffect(() => {
        setCharState(char)
    }, [char])

    const handleSelectChange = (key) => (event) => setSelect(key, parseInt(event.target.value))

    const handleSubChange = (index) => () => setSelect('potentialSub', index)

    return (
        <StyledCharStatsSelect container spacing={1} className={className}>
            <Grid item xs={4} sm={2}>
                <StyledLabel htmlFor={levelInputId}>Lv</StyledLabel>
                <LevelInput
                    id={levelInputId}
                    value={charState.level}
                    onChange={handleSelectChange('level')}
                    variant='outlined'
                    size='small'
                    inputProps={{ 'aria-label': 'level' }}
                />
            </Grid>
            {Object.entries(selectItems).map((entry, idx) => (
                entry[0] === 'potential'
                    ? <Grid
                        item
                        xs={6}
                        sm={3}
                        component={UiImg}
                        name={entry[1].imgNames}
                        isBackground
                        alt={entry[0]}
                        key={idx}
                    >
                        <StyledPotentialInput
                            values={entry[1].values}
                            mainValue={charState.potential}
                            subValue={charState.potentialSub}
                            onMainChange={handleSelectChange('potential')}
                            onSubChange={handleSubChange}
                        />
                    </Grid>
                    : entry[0] !== 'potentialSub' &&
                    <Grid
                        item
                        xs={4}
                        sm={2}
                        component={UiImg}
                        name={entry[1].imgNames}
                        isBackground
                        alt={entry[0]}
                        key={idx}
                    >
                        <ImgSelect
                            type={entry[0]}
                            value={charState[entry[0]]}
                            values={entry[1].values}
                            disabled={entry[1].disabled}
                            onChange={handleSelectChange(entry[0])}
                        />
                    </Grid>
            ))}
        </StyledCharStatsSelect>
    )
}

export default CharStatsSelect