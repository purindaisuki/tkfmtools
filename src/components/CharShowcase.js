import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import SwitchableShowcase from './SwitchableShowcase';
import MyMasonry from './MyMasonry';
import MyAccordion from './MyAccordion';
import CardTable from './CardTable';
import { SortableTable, SortableTh, TableWrapper } from './FilterComponents';
import ImageSupplier from './ImageSupplier';
import charData from '../gamedata/character.json';
import { LanguageContext } from './LanguageProvider';
import {
    AttributeIcon,
    PositionIcon,
    RaceIcon,
    BodysizeIcon,
    OppaiIcon,
    RankIcon,
    ElseIcon,
    MasonryViewIcon,
    TableViewIcon
} from './icon';

const CharImgWrapper = styled(ImageSupplier)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
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
const CardHeader = ({
    className,
    id
}) => {
    const { charString } = useContext(LanguageContext)

    return (
        <CharImgWrapper
            className={className}
            name={`char_small_${id}.png`}
            isBackground
            alt=''
        >
            <TextWrapper>
                {charString.name[id].split(' ').slice(0, -1).join(' ')}
            </TextWrapper>
            <TextWrapper>
                {charString.name[id].split(' ').slice(-1)[0]}
            </TextWrapper>
        </CharImgWrapper>
    )
}

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
const CardBody = (props) => {
    const { charString } = useContext(LanguageContext)

    const attrIcons = {
        attribute: AttributeIcon,
        position: PositionIcon,
        race: RaceIcon,
        body: BodysizeIcon,
        oppai: OppaiIcon,
        rank: RankIcon,
        else: ElseIcon
    }

    const charTagData = charData.map((char => {
        const { id, rarity, tags, ...rest } = char
        return ({ id, rarity, ...tags })
    }))

    if (!charData[props.idx].tags.available) {
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
                {Object.entries(charTagData[props.idx]).map((entry, idx) => {
                    if (
                        entry[0] === 'id' ||
                        entry[0] === 'rarity' ||
                        entry[0] === 'available'
                    ) {
                        return true
                    }
                    if (entry[0] === 'else') {
                        return (
                            entry[1].map((tag, i) => (
                                <tr key={idx + i + 1}>
                                    <td>
                                        <TagWrapper>
                                            <IconWrapper>
                                                {attrIcons[entry[0]]}
                                            </IconWrapper>
                                            {charString.tags[tag]}
                                        </TagWrapper>
                                    </td>
                                </tr>
                            ))
                        )
                    }

                    if (entry[1].length !== 0) {
                        return (
                            <tr key={idx}>
                                <td>
                                    <TagWrapper>
                                        <IconWrapper>
                                            {attrIcons[entry[0]]}
                                        </IconWrapper>
                                        {charString.tags[entry[1]]}
                                    </TagWrapper>
                                </td>
                            </tr>
                        )
                    } else {
                        return true
                    }
                })}
            </tbody>
        </CardTable>
    )
}

const StyledAccordion = styled(MyAccordion)`
    && {
        && {
            margin-bottom: 1rem;
        }
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: .25rem;
        box-shadow: 0 0 .15em lightgray;
        > .MuiAccordionSummary-root {
            padding: 0;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom: 0px solid ${props => props.theme.colors.border};
        }
        > .MuiAccordionSummary-root.Mui-expanded {
            border-bottom: 1px solid ${props => props.theme.colors.border};
        }
        .MuiAccordionSummary-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0;
            margin: 0;
        }
        .MuiAccordionDetails-root {
            margin: 0;
            padding: 0;
        }
    }
`
const CharAccordion = (props) => {
    const [isExpanded, setExpanded] = useState(false)

    return (
        <StyledAccordion
            expanded={isExpanded}
            onChange={() => setExpanded(!isExpanded)}
            title={props.header}
            content={props.body}
        />
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
        width: 1.6rem;
        height: 1.6rem;
        fill: ${props => (
        props.$active
            ? props.theme.colors.secondary
            : props.theme.colors.onSurface
    )};
    }
    &:hover svg {
        fill: ${props => props.theme.colors.secondary};
    }
`
const LayoutSwitcher = (props) => {
    const { pageString } = useContext(LanguageContext)

    return (
        <LayoutBtnContainer>
            {pageString.enlist.index.layout}
            <StyledBtn
                $active={props.layout === 'Masonry'}
                onClick={props.handleLayoutChange('Masonry')}
            >
                {MasonryViewIcon}
            </StyledBtn>
            <StyledBtn
                $active={props.layout === 'Table'}
                onClick={props.handleLayoutChange('Table')}
            >
                {TableViewIcon}
            </StyledBtn>
        </LayoutBtnContainer>
    )
}

const CharMasnory = () => {
    const { charString } = useContext(LanguageContext)

    const breakpointColumnsConfig = {
        default: 6,
        1360: 5,
        1200: 4,
        992: 3,
        600: 2
    }

    return (
        <MyMasonry
            breakpointCols={breakpointColumnsConfig}
        >
            {Object.entries(charString.name).map((entry, idx) => {
                if (entry[0] === 'nr') return true

                return (
                    <CharAccordion
                        header={<CardHeader id={entry[0]} />}
                        body={<CardBody idx={idx} />}
                        key={idx}
                    />
                )
            })}
        </MyMasonry>
    )
}

const StyledTh = styled(SortableTh)`
    background-color:  ${props => props.theme.colors.secondary};
    color:  ${props => props.theme.colors.onSecondary};
    white-space: nowrap;
`
export const CharCardHeader = styled(CardHeader)`
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
const TableContent = (props) => {
    const { userLanguage, charString } = useContext(LanguageContext)

    const parseRarity = (rarity) => (
        rarity === 0 ? 'N'
            : rarity === 1 ? 'R'
                : rarity === 2 ? 'SR'
                    : 'SSR'
    )

    const TableHeader = () => (
        <thead>
            <tr>
                {Object.entries(charString.tagAttributes)
                    .map((entry, idx) => (
                        <StyledTh
                            onClick={() => props.requestSort(entry[0])}
                            direction={props.getSortDirection(entry[0])}
                            key={idx}
                        >
                            {entry[1]}
                        </StyledTh>
                    ))}
            </tr>
        </thead>
    )

    const cardTextWrapConfig = {
        'zh-TW': 900,
        'en': 1300,
    }

    const TableBody = () => (
        <tbody>
            {props.sortedResult.map(char => {
                if (!char.available) {
                    return (
                        <tr key={char.id}>
                            <td>
                                <CharCardHeader
                                    id={char.id}
                                    $textWrapConfig={
                                        cardTextWrapConfig[userLanguage]
                                    }
                                />
                            </td>
                            <td>
                                {parseRarity(char.rarity)}
                            </td>
                            <td>
                                {charString.tags[char.attribute]}
                            </td>
                            <td>
                                {charString.tags[char.position]}
                            </td>
                            <td colSpan='5'>
                                {charString.tagWarnMsg}
                            </td>
                        </tr>
                    )
                }

                return (
                    <tr key={char.id}>
                        {Object.entries(char).map((entry, j) => {
                            if (entry[0] === 'available') {
                                return true
                            }
                            if (entry[0] === 'id') {
                                return (
                                    <td key={j}>
                                        <CharCardHeader
                                            id={char.id}
                                            $textWrapConfig={
                                                cardTextWrapConfig[userLanguage]
                                            }
                                        />
                                    </td>
                                )
                            }
                            if (entry[0] === 'rarity') {
                                return (
                                    <td key={j}>
                                        {parseRarity(entry[1])}
                                    </td>
                                )
                            }
                            if (entry[0] === 'else') {
                                return (
                                    <td key={j} nowrap='nowrap'>
                                        {entry[1].map(tag => (
                                            charString.tags[tag]
                                        )).join(', ')}
                                    </td>
                                )
                            }

                            let tag
                            if (entry[1].length === 0) {
                                tag = '-'
                            } else {
                                tag = charString.tags[entry[1]]
                            }
                            return <td key={j} nowrap='nowrap'>{tag}</td>
                        })}
                    </tr>
                )
            })}
        </tbody>
    )

    return (
        <>
            <TableHeader />
            <TableBody />
        </>
    )
}

const CharTableWrapper = styled(TableWrapper)`
    overflow-x: auto;
    height: calc(100vh - 12rem);
`
const CharTable = () => {
    const { charString } = useContext(LanguageContext)

    const charTagData = charData.map((char => {
        const { id, rarity, tags, ...rest } = char
        return ({ id, rarity, ...tags })
    }))

    const sortFunc = (sortableItems, sortConfig) => {
        sortableItems.sort((a, b) => {
            let aKey
            let bKey
            if (sortConfig.key === 'else') {
                aKey = a[sortConfig.key].join('')
                bKey = b[sortConfig.key].join('')
            } else if (sortConfig.key === 'name') {
                aKey = charString.name[a.id]
                bKey = charString.name[b.id]
            } else {
                aKey = a[sortConfig.key]
                bKey = b[sortConfig.key]
            }
            if (aKey < bKey) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (aKey > bKey) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
            return 0
        })
    }

    return (
        <CharTableWrapper>
            <SortableTable
                sortFunc={sortFunc}
                defaultSortKey={'rarity'}
                result={charTagData}
                border
            >
                <TableContent />
            </SortableTable>
        </CharTableWrapper>
    )
}

export default function CharShowcase() {
    return (
        <SwitchableShowcase
            localLayoutConfig='enlist-character-layout'
            layoutSwitcher={<LayoutSwitcher />}
            items={[
                { layout: 'Masonry', content: <CharMasnory /> },
                { layout: 'Table', content: <CharTable /> },
            ]}
        />
    )
}
