import React from 'react';
import styled from 'styled-components';

import { useLanguage } from 'containers/LanguageProvider';

import { ResponsiveCharCard } from 'components/CharCard';
import WindowTable from 'components/WindowTable';
import { SortableTh } from 'components/SortableTable';

import charData from 'data/character.json';

const StyledTh = styled(SortableTh)`
    background-color:  ${props => props.theme.colors.secondary};
    color:  ${props => props.theme.colors.onSecondary};
    white-space: nowrap;
`
const TableHead = React.forwardRef((props, ref) => {
    const { charString } = useLanguage()

    return (
        <thead ref={ref}>
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
})

const cardTextWrapConfig = {
    'zh-TW': 900,
    'en': 1300,
}

const parseRarity = (rarity) => (
    rarity === 0 ? 'N'
        : rarity === 1 ? 'R'
            : rarity === 2 ? 'SR'
                : 'SSR'
)

const TableBody = React.forwardRef(({ sortedData, renderTo }, ref) => {
    const { userLanguage, charString } = useLanguage()

    return (
        <tbody>
            {sortedData.map((char, idx) => {
                if (idx > renderTo) {
                    return null
                }

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
                    <tr key={char.id} ref={idx === 0 ? ref : undefined}>
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
                                    <td key={j}>
                                        {entry[1].map(tag => (
                                            charString.tags[tag]
                                        )).join(', ')}
                                    </td>
                                )
                            }

                            let tag
                            if (entry[1] < 0) {
                                tag = '-'
                            } else {
                                tag = charString.tags[entry[1]]
                            }
                            return <td key={j}>{tag}</td>
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
})

const CharTable = styled(WindowTable)`
    overflow-x: auto;
    height: calc(100vh - 12rem);
    padding-right: 0;
    margin-right: 0;
`
const CharTagTable = () => {
    const { charString } = useLanguage()

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
        <CharTable
            data={charTagData}
            head={<TableHead />}
            body={<TableBody />}
            sortFunc={sortFunc}
            defaultSortKey={'rarity'}
            border
        />
    )
}

export default CharTagTable