import React from 'react';
import styled from 'styled-components';
import { Col, Form } from 'react-bootstrap';

import { useLanguage } from 'containers/LanguageProvider';

import { FilterPanel } from 'components/FilterComponents';
import MyHeader from 'components/MyHeader';
import ImageSupplier from 'components/ImageSupplier';
import { Select, StyledForm } from 'components/MyForm';
import { RaceIcon } from 'components/icon';

import charData from 'data/character.json';

const CharForm = styled(StyledForm)`
    form {
        width: 13.5rem;
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
const CharSelectPanel = ({
    children,
    className,
    character,
    handleSelect,
    lumpNRChars,
}) => {
    const { pageString, charString } = useLanguage()

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
                <CharForm onSubmit={(event) => event.preventDefault()}>
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
                                {lumpNRChars &&
                                    <option value={'nr'} key={'nr'}>
                                        {charString.name.nr}
                                    </option>}
                            </Select>
                        </Form.Group>
                    </Form.Row>
                    {children}
                </CharForm>
            </CharContainer>
        </FilterPanel >
    )
}

export default CharSelectPanel