import React from 'react';
import styled from 'styled-components';
import { LanguageContext } from './LanguageProvider';
import MyAccordion from './MyAccordion';
import MyMasonry from './MyMasonry'
import { ItemCardBody } from './ItemShowcase'
import {
    TypeIcon,
    CategoryIcon,
    RaceIcon,
    BodysizeIcon,
    OppaiIcon,
    RankIcon,
    ElseIcon,
} from './Icon';
import charTagData from '../characters.json'
import { IconButton } from '@material-ui/core';
import { MasonryViewIcon, TableViewIcon } from './Icon'
import { Table } from 'react-bootstrap';

const TextWrapper = styled.div`
    display: flex;
    align-items: ${props => props.$lang === 'en'
        ? 'flex-end'
        : 'flex-start'
    };
    @media screen and (max-width: 490px) {
        align-items: flex-end;
    }
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-width: 10rem;
    height: 3.6rem;
    background-image: url(${props => props.$img});
    background-repeat: no-repeat;
    background-size: 6rem 6rem;
    background-position: 0 -1.6rem;
    > div {
        ${props => props.$lang === 'en'
            ? 'margin-right: 1rem'
            : 'margin-left: 6rem'
        };
        transition: all 355ms ease;
        text-shadow: 0 0 1px ${props => props.theme.colors.surface},
        -2px 0 1px  ${props => props.theme.colors.surface},
        2px 0 1px  ${props => props.theme.colors.surface},
        0 -2px 1px ${props => props.theme.colors.surface},
        0 2px 1px  ${props => props.theme.colors.surface},
        2px 2px 1px ${props => props.theme.colors.surface},
        2px -2px 1px ${props => props.theme.colors.surface},
        -2px 2px 1px ${props => props.theme.colors.surface},
        -2px -2px 1px ${props => props.theme.colors.surface};
        @media screen and (max-width: 490px) {
            margin-left: 0;
            margin-right: 1rem;
        }
    }
`

const CardHeader = (props) => {
    const { userLanguage } = React.useContext(LanguageContext)

    return (
        <>
            <TextWrapper
                $img={`${process.env.PUBLIC_URL}/img/char_small_${props.id}.png`}
                $lang={userLanguage}
            >
                <div>{props.name.split(' ').slice(0, -1).join(' ')}</div>
                <div>{props.name.split(' ').slice(-1)[0]}</div>
            </TextWrapper>
        </>
    )
}

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
const TagWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const CardBody = (props) => {
    const { stringData } = React.useContext(LanguageContext)

    const attrIcons = {
        type: TypeIcon,
        category: CategoryIcon,
        race: RaceIcon,
        body: BodysizeIcon,
        oppai: OppaiIcon,
        rank: RankIcon,
        else: ElseIcon
    }

    if (props.id >= 6 && props.id <= 8) {
        return (
            <ItemCardBody>
                <tbody><tr><td>
                    {stringData.characters.tagWarnMsg}
                </td></tr></tbody>
            </ItemCardBody>
        )
    }

    return (
        <ItemCardBody>
            <tbody>
                {Object.entries(charTagData[props.id]).map((entry, idx) => {
                    if (idx < 2)
                        return true

                    if (idx < 8) {
                        if (entry[1].length !== 0) {
                            return (
                                <tr key={idx}>
                                    <td>
                                        <TagWrapper>
                                            <IconWrapper>
                                                {attrIcons[entry[0]]}
                                            </IconWrapper>
                                            {stringData.characters.tags[entry[1]]}
                                        </TagWrapper>
                                    </td>
                                </tr>
                            )
                        } else {
                            return true
                        }
                    }

                    return (
                        entry[1].map((tag, i) => (
                            <tr key={idx + i + 1}>
                                <td>
                                    <TagWrapper>
                                        <IconWrapper>
                                            {attrIcons[entry[0]]}
                                        </IconWrapper>
                                        {stringData.characters.tags[tag]}
                                    </TagWrapper>
                                </td>
                            </tr>
                        ))
                    )
                })}
            </tbody>
        </ItemCardBody>
    )
}

const AccordionWrapper = styled.div`
    margin-bottom: 1rem;
    > .MuiAccordion-root {
        background-color: ${props => props.theme.colors.surface};
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: .25rem;
        box-shadow: 0 0 .15em lightgray;
        > .MuiAccordionSummary-root,
        > .MuiAccordionSummary-root.Mui-expanded {
            padding: 0;
            border-radius: .25rem;
            > .MuiAccordionSummary-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                overflow: hidden;
                border-radius: .25rem;
                padding: 0;
                margin: 0;
            }
        }
        > .MuiAccordionSummary-root {
            border-bottom: 0px solid ${props => props.theme.colors.border};
        }
        > .MuiAccordionSummary-root.Mui-expanded {
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom: 1px solid ${props => props.theme.colors.border};
        }
        > .MuiCollapse-container {
            border-radius: .2rem;
            > div > div > div > .MuiAccordionDetails-root {
                margin: 0;
                padding: 0;
            }
        }
    }
`

const CharCard = (props) => {
    const [isExpanded, setExpanded] = React.useState(false)

    return (
        <AccordionWrapper>
            <MyAccordion
                expanded={isExpanded}
                onChange={() => setExpanded(!isExpanded)}
                square={false}
                title={props.header}
                content={props.body}
            />
        </AccordionWrapper>
    )
}

const TableWrapper = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    height: calc(100vh - 12rem);
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 1rem;
        height: 1rem;
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-thumb {
        background: lightgray;
        border-radius: .25rem;
    }
    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-corner {
        background: ${props => props.theme.colors.surface};
    }
`
const StyledTable = styled(Table)`
    color: ${props => props.theme.colors.onSurface};
    thead th {
        position: sticky;
        top: 0;
        padding: .75rem .25rem;
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
    }
    thead th:first-child {
        padding-left: .75rem;
    }
    tbody {
        tr {
            border-bottom: 1px solid ${props => props.theme.colors.secondary};
        }
        td {
            vertical-align: middle;
        }
    }
    @media screen and (min-width: ${props => (
        props.$lang === 'en'
            ? '1300'
            : '900'
    )}px) {
        td:first-child > div {
            flex-direction: row;
            align-items: center;
            justify-content: ${props => (
                props.$lang === 'en'
                    ? 'flex-end'
                    : 'flex-start'
            )};
            > div:last-child {
                margin-left: ${props => (
                    props.$lang === 'en'
                        ? '-.8rem'
                        : '.5rem'
                )};
            }
        }
    }
`

const CharTable = () => {
    const { userLanguage, stringData } = React.useContext(LanguageContext)

    return (
        <TableWrapper>
            <StyledTable
                borderless
                size='sm'
                $lang={userLanguage}
            >
                <thead>
                    <tr>
                        {stringData.characters
                            .tagAttributes.map((attr, idx) => (
                                <th key={idx} nowrap='nowrap'>
                                    {attr}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {charTagData.map((char, i) => {
                        if (i >= 6 && i <= 8) {
                            return (
                                <tr key={i}>
                                    <td>
                                        <CardHeader
                                            id={i + 1}
                                            name={stringData.characters.name[i]}
                                        />
                                    </td>
                                    <td colSpan='8'>
                                        {stringData.characters.tagWarnMsg}
                                    </td>
                                </tr>
                            )
                        }

                        return (
                            <tr key={i}>
                                {Object.values(char).map((attr, j) => {
                                    if (j === 0) {
                                        return (
                                            <td key={j}>
                                                <CardHeader
                                                    id={i + 1}
                                                    name={stringData.characters.name[i]}
                                                />
                                            </td>
                                        )
                                    }
                                    if (j === 1) {
                                        let rarity
                                        switch (attr) {
                                            case 3:
                                                rarity = 'SSR'
                                                break
                                            case 2:
                                                rarity = 'SR'
                                                break
                                            case 1:
                                                rarity = 'R'
                                                break
                                            default:
                                                rarity = 'N'
                                                break
                                        }
                                        return <td key={j}>{rarity}</td>
                                    }
                                    if (j < 8) {
                                        let tag
                                        if (attr.length === 0) {
                                            tag = '-'
                                        } else {
                                            tag = stringData.characters.tags[attr]
                                        }
                                        return <td key={j} nowrap='nowrap'>{tag}</td>
                                    }

                                    return (
                                        <td key={j} nowrap='nowrap'>
                                            {attr.map(tag => (
                                                stringData.characters.tags[tag]
                                            )).join(', ')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </StyledTable>
        </TableWrapper>
    )
}

const LayoutBtnContainer = styled.div`
    position: absolute;
    right: 0;
    top: -4rem;
    @media screen and (max-width: 410px) {
        font-size: 0;
    }
`
const StyledBtn = styled(IconButton)`
    padding: .75rem .5rem;
    svg {
        fill: ${props => (
        props.$active
            ? props.theme.colors.secondary
            : props.theme.colors.onSurface
    )};
        width: 1.6rem;
        height: 1.6rem;
    }
    &:hover {
        svg {
            fill: ${props => props.theme.colors.secondary};
            width: 1.6rem;
            height: 1.6rem;
        }
    }
`
const ShowcaseContainer = styled.div`
    display: ${props => props.$hidden ? 'none' : 'block'}
`

export default function CharShowcase() {
    const { stringData } = React.useContext(LanguageContext)
    const characters = stringData.characters.name

    const getDefaultLayout = () => {
        const localSetting = localStorage.getItem('enlist-character-layout')
        return localSetting ? localSetting : 'Masonry'
    }
    const [layout, setLayout] = React.useState(getDefaultLayout)

    const handleLayoutChange = (toLayout) => () => {
        setLayout(toLayout)
        localStorage.setItem('enlist-character-layout', toLayout)
    }

    const breakpointColumnsConfig = {
        default: 6,
        1360: 5,
        1200: 4,
        992: 3,
        768: 2
    };

    return (
        <>
            <LayoutBtnContainer>
                {stringData.enlist.layout}
                <StyledBtn
                    $active={layout === 'Masonry'}
                    onClick={handleLayoutChange('Masonry')}
                >
                    {MasonryViewIcon}
                </StyledBtn>
                <StyledBtn
                    $active={layout === 'Table'}
                    onClick={handleLayoutChange('Table')}
                >
                    {TableViewIcon}
                </StyledBtn>
            </LayoutBtnContainer>
            <ShowcaseContainer $hidden={layout !== 'Masonry'}>
                <MyMasonry
                    breakpointCols={breakpointColumnsConfig}
                >
                    {characters.slice(0, characters.length - 1).map((char, idx) => (
                        <CharCard
                            header={<CardHeader id={idx + 1} name={char} />}
                            body={<CardBody id={idx} />}
                            key={idx}
                        />
                    ))}
                </MyMasonry>
            </ShowcaseContainer>
            <ShowcaseContainer $hidden={layout !== 'Table'}>
                <CharTable>

                </CharTable>
            </ShowcaseContainer>
        </>
    )
}