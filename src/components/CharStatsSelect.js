import React, { useEffect } from 'react';
import styled from 'styled-components';

import useCharacterSelect from 'hooks/useCharacterSelect';

import ImageSupplier from 'components/ImageSupplier';
import Input, { Select } from 'components/Input';

const StyledSelect = styled(Select)`
    position: absolute;
    left: 1.8rem;
    background-color: ${props => props.theme.colors.surface};
    && > div {
        width: 100%;
        > div {
            padding: .2rem;
            padding-left: .4rem;
            padding-right: 1rem;
            color: ${props => props.disabled ? props.theme.colors.dropdownHover
        : 'inherit'};
        }
        svg {
            right: 0;
            fill: ${props => props.disabled ? props.theme.colors.dropdownHover
        : props.theme.colors.onSurface};
        }
    }
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

const StyledCharStatsSelect = styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    top: .6rem;
    left: calc(14rem + 5%);
    width: calc(95% - 16rem);
    > div {
        display: flex;
        margin-right: calc(2% - .2rem);
    }
    @media screen and (max-width: 768px) {
        left: calc(7rem + 5%);
        width: calc(95% - 7rem);
    }
`
const StyledLabel = styled.label`
    margin-top: .05rem;
`
const LevelInput = styled(Input)`
    width: 100%;
    height: 1.6rem;
    > div {
        width: 2rem;
        margin-left: .2rem;
        > input {
            padding: .2rem;
            text-align: center;
        }
    }
`
const UiImg = styled(ImageSupplier)`
    position: relative;
    width: 4.2rem;
    height: 1.6rem;
    background-repeat: no-repeat;
    background-size: 1.6rem 1.6rem;
    background-position: 0 0;
`
const PotentialInput = styled.div`
    position: relative;
    && {
        margin-right: 0;
    }
    > span {
        margin-left: .3rem;
        margin-right: .1rem;
    }
    > div:first-child .MuiSelect-root {
        padding-right: 1.2rem;
    }
    > div:last-child {
        position: relative;
        left: auto;
        height: 1.6rem
    }
`
const CharStatsSelect = ({ char, levelInputId, onSelect }) => {
    const {
        selectItems,
        setSelect, setCharState
    } = useCharacterSelect(char, onSelect)

    useEffect(() => {
        setCharState(char)
    }, [char])

    const handleSelectChange = (key) => (event) => setSelect(key, parseInt(event.target.value))

    return (
        <StyledCharStatsSelect>
            <div>
                <StyledLabel htmlFor={levelInputId}>Lv</StyledLabel>
                <LevelInput
                    id={levelInputId}
                    value={char.level}
                    onChange={handleSelectChange('level')}
                    variant='outlined'
                    size='small'
                    inputProps={{ 'aria-label': 'level' }}
                />
            </div>
            {Object.entries(selectItems).map((entry, idx) => (
                entry[0] === 'potential'
                    ? <PotentialInput key={idx}>
                        <UiImg
                            name={entry[1].imgNames}
                            isBackground
                            alt={entry[0]}
                        >
                            <ImgSelect
                                type={entry[0]}
                                value={char[entry[0]]}
                                values={entry[1].values}
                                disabled={entry[1].disabled}
                                onChange={handleSelectChange(entry[0])}
                            />
                        </UiImg>
                        <span>{' - '}</span>
                        <ImgSelect
                            type='potentialSub'
                            value={char.potentialSub}
                            values={selectItems.potentialSub.values}
                            disabled={selectItems.potentialSub.disabled}
                            onChange={handleSelectChange('potentialSub')}
                        />
                    </PotentialInput>
                    : entry[0] !== 'potentialSub' &&
                    <UiImg
                        name={entry[1].imgNames}
                        isBackground
                        alt={entry[0]}
                        key={idx}
                    >
                        <ImgSelect
                            type={entry[0]}
                            value={char[entry[0]]}
                            values={entry[1].values}
                            disabled={entry[1].disabled}
                            onChange={handleSelectChange(entry[0])}
                        />
                    </UiImg>
            ))}
        </StyledCharStatsSelect>
    )
}

export default CharStatsSelect