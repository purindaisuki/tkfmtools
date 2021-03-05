import React, { lazy, useContext, useState } from 'react';
import styled from 'styled-components';
import SwitchableShowcase from './SwitchableShowcase';
import MyIconButton from './MyIconButton';
import MyMasonry from './MyMasonry';
import MyAccordion from './MyAccordion';
import CharCard, { CharCardBody, ResponsiveCharCard } from './CharCard';
import ScrollableContainer from './ScrollableContainer';
import { SortableTable, SortableTh } from './FilterComponents';
import { LanguageContext } from './LanguageProvider';
import {
    MasonryViewIcon,
    TableViewIcon
} from './icon';
import charData from '../gamedata/character.json';

const LayoutBtnContainer = styled.div`
    position: absolute;
    right: 0;
    top: -4rem;
    @media screen and (max-width: 410px) {
        font-size: 0;
    }
`
const LayoutSwitcher = (props) => {
    const { pageString } = useContext(LanguageContext)

    return (
        <LayoutBtnContainer>
            {pageString.enlist.index.layout}
            <MyIconButton
                $active={props.layout === 'Masonry'}
                onClick={props.handleLayoutChange('Masonry')}
            >
                {MasonryViewIcon}
            </MyIconButton>
            <MyIconButton
                $active={props.layout === 'Table'}
                onClick={props.handleLayoutChange('Table')}
            >
                {TableViewIcon}
            </MyIconButton>
        </LayoutBtnContainer>
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
const CharAccordion = ({
    title,
    content
}) => {
    const [isExpanded, setExpanded] = useState(false)

    return (
        <StyledAccordion
            expanded={isExpanded}
            onChange={() => setExpanded(!isExpanded)}
            title={title}
            content={content}
        />
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
            {Object.keys(charString.name).map((key, idx) => (
                key !== 'nr'
                    ? <CharAccordion
                        title={<CharCard id={key} />}
                        content={<CharCardBody id={key} />}
                        key={idx}
                    />
                    : null
            ))}
        </MyMasonry>
    )
}

const StyledTh = styled(SortableTh)`
    background-color:  ${props => props.theme.colors.secondary};
    color:  ${props => props.theme.colors.onSecondary};
    white-space: nowrap;
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
                                <ResponsiveCharCard
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
                                        <ResponsiveCharCard
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

const CharTableWrapper = styled(ScrollableContainer)`
    overflow-x: auto;
    height: calc(100vh - 12rem);
    padding-right: 0;
    margin-right: 0;
`
const CharTable = () => {
    const { charString } = useContext(LanguageContext)

    const charTagData = charData.map((char => {
        const { id, rarity, tags } = char
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
