import React from 'react';
import styled from 'styled-components';

import { useLanguage } from 'containers/LanguageProvider';

import { ImgCard, CardTable } from 'components/Card';
import {
    AttributeIcon,
    PositionIcon,
    RaceIcon,
    BodysizeIcon,
    OppaiIcon,
    RankIcon,
    ElseIcon,
} from 'components/icon';

import charData from 'data/character.json';

const StyledCard = styled(ImgCard)`
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;
    min-width: 10rem;
    height: 3.6rem;
    background-repeat: no-repeat;
    background-size: 6rem 6rem;
    background-position: 0 -1.6rem;
`
const TextWrapper = styled.div`
    margin-left: 0;
    margin-right: 1rem;
    transition: all 0.3s ease;
    text-transform: none;
    text-shadow: 0 0 1px ${props => props.theme.colors.surface},
    -2px 0 1px  ${props => props.theme.colors.surface},
    2px 0 1px  ${props => props.theme.colors.surface},
    0 -2px 1px ${props => props.theme.colors.surface},
    0 2px 1px  ${props => props.theme.colors.surface},
    2px 2px 1px ${props => props.theme.colors.surface},
    2px -2px 1px ${props => props.theme.colors.surface},
    -2px 2px 1px ${props => props.theme.colors.surface},
    -2px -2px 1px ${props => props.theme.colors.surface};
`
const TitleText = styled(TextWrapper)`
    font-size: small;
`
const CharCard = ({
    className,
    id
}) => {
    const { charString } = useLanguage()

    return (
        <StyledCard
            className={className}
            imgType='char_small'
            imgId={id}
            alt=''
            isBackground
        >
            <TitleText>
                {charString.name[id].split(' ').slice(0, -1).join(' ')}
            </TitleText>
            <TextWrapper>
                {charString.name[id].split(' ').slice(-1)[0]}
            </TextWrapper>
        </StyledCard>
    )
}

export const ResponsiveCharCard = styled(CharCard)`
    @media screen and (min-width: ${props => (
        props.$textWrapConfig
    )}px) {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        > div {
            margin-left: 7rem
        }
        > div:last-child {
            margin-left: -.6rem;
        }
    }
`

const TagWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const IconWrapper = styled.div`
    margin-bottom: .1rem;
    margin-left: .25rem;
    margin-right: .4rem;
    > svg {
        width: 1.2rem;
        fill: ${props => props.theme.colors.secondary};
        color:  ${props => props.theme.colors.secondary};
    }
`
const CharTr = ({
    type,
    tag
}) => {
    const { charString } = useLanguage()

    const attrIcons = {
        attribute: AttributeIcon,
        position: PositionIcon,
        race: RaceIcon,
        body: BodysizeIcon,
        oppai: OppaiIcon,
        rank: RankIcon,
        else: ElseIcon
    }

    return (
        <tr>
            <td>
                <TagWrapper>
                    <IconWrapper>
                        {attrIcons[type]}
                    </IconWrapper>
                    {charString.tags[tag]}
                </TagWrapper>
            </td>
        </tr>
    )
}

export const CharAccordionDetail = ({ id }) => {
    const { charString } = useLanguage()

    const { tags } = charData.find(char => char.id === id)
    const { available, ...rest } = tags

    if (!available) {
        return (
            <CardTable striped>
                <tbody><tr><td>
                    {charString.tagWarnMsg}
                </td></tr></tbody>
            </CardTable>
        )
    }

    return (
        <CardTable striped>
            <tbody>
                {Object.entries(rest).map((entry, idx) => (
                    entry[0] === 'else'
                        ? entry[1].map((tag, i) => (
                            <CharTr
                                key={idx + i}
                                type='else'
                                tag={tag}
                            />
                        ))
                        : entry[1] >= 0
                            ? <CharTr
                                key={idx}
                                type={entry[0]}
                                tag={entry[1]}
                            />
                            : null
                ))}
            </tbody>
        </CardTable>
    )
}

export default CharCard