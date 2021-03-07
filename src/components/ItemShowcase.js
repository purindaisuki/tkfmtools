import React, { useContext, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { Badge } from "react-bootstrap"
import WindowTable from './WindowTable';
import { SortableTh } from './FilterComponents';
import { ImgCard } from './MyCard';
import { LanguageContext } from './LanguageProvider';
import stageDropData from '../gamedata/stageDrop.json';

const ItemImg = styled(ImgCard)`
    > div:first-child {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: .4rem;
        user-select: none;
    }
`
const TextWrapper = styled.div`
    white-space: nowrap;
    font-size: medium;
    font-weight: normal;
`
export const ItemCard = ({
    className,
    id
}) => {
    const { itemString } = useContext(LanguageContext)

    return (
        <ItemImg
            className={className}
            imgType='item'
            imgId={id}
            alt=''
        >
            <TextWrapper>
                {itemString.name[id]}
            </TextWrapper>
        </ItemImg>
    )
}

const StyledTh = styled(SortableTh)`
    background-color:  ${props => props.theme.colors.secondary};
    color:  ${props => props.theme.colors.onSecondary};
    white-space: nowrap;
    ${props => props.$sortable ? true : 'cursor: default;'}
`
const TableHead = React.forwardRef((props, ref) => {
    const { pageString } = useContext(LanguageContext)

    return (
        <thead ref={ref}>
            <tr>
                {Object.entries(pageString.items.drop.index.tableHead)
                    .map((entry, idx) => {
                        const sortable = entry[0] === 'stage' || entry[0] === 'energy'
                        let requestSort
                        let getSortDirection
                        if (sortable) {
                            requestSort = () => props.requestSort(entry[0])
                            getSortDirection = props.getSortDirection(entry[0])
                        }

                        return (
                            <StyledTh
                                onClick={requestSort}
                                direction={getSortDirection}
                                key={idx}
                                $sortable={sortable}
                            >
                                {entry[1]}
                            </StyledTh>
                        )
                    })}
            </tr>
        </thead>
    )
})

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    margin-right: .8rem;
    div {
        flex-wrap: nowrap;
        font-size: 1rem;
    }
    img {
        width: 2rem;
        height: 2rem;
    }
`
const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    > div:last-child {
        margin: 0;
    }
`
const StyledBadge = styled(Badge)`
    background-color: ${props => props.$rarity === 0 ? 'lightgray'
        : props.$rarity === 1 ? '#90CAF9'
            : props.$rarity === 2 ? '#A5D6A7' : '#FFAB91'};
    color: black;
    margin-left: .4rem;
`
const TableBody = React.forwardRef((props, ref) => {
    const { itemString } = useContext(LanguageContext)
    const trRef = useRef()

    useImperativeHandle(ref, () => ({
        getY: () => trRef.current.getBoundingClientRect().y,
        getBottom: () => trRef.current.getBoundingClientRect().bottom,
        current: trRef.current
    }))

    return (
        <tbody>
            {props.sortedResult.map((stage, idx) => {
                if (idx > props.renderTo) {
                    return null
                }

                const itemTd = (items) => (
                    <td>
                        <ItemsContainer>
                            {items.length === 0
                                ? undefined
                                : items.map((item, i) => (
                                    <ItemWrapper key={i}>
                                        <ItemCard id={item.id} />
                                        <StyledBadge pill $rarity={item.rarity}>
                                            {itemString.rarity[item.rarity]}
                                        </StyledBadge>
                                    </ItemWrapper>
                                ))}
                        </ItemsContainer>
                    </td>
                )

                return (
                    <tr key={idx} ref={idx === props.renderTo ? trRef : undefined}>
                        <td>
                            {`${stage.chapter}-${stage.stage}`}
                        </td>
                        {itemTd(stage.materials)}
                        {itemTd(stage.trainItems)}
                        {itemTd(stage.expPotions)}
                        <td>{stage.energy}</td>
                    </tr>
                )
            })}
        </tbody>
    )
})

const ItemTable = styled(WindowTable)`
    overflow-x: auto;
    height: calc(100vh - 10.4rem);
    padding-right: 0;
    margin-right: 0;
`
const ItemShowcase = () => {
    const sortFunc = (sortableItems, sortConfig) => {
        const toStageKey = key => {
            return (
                parseInt(key.chapter) * 1000 +
                parseInt(key.stage.split(' ')[0]) * 10 +
                (key.stage.includes('free') ? 1 : 0) +
                (key.stage.includes('-') ? parseInt(key.stage.split('-')[1]) : 0)
            )
        }

        sortableItems.sort((a, b) => {
            let aKey
            let bKey
            if (sortConfig.key === 'stage') {
                aKey = toStageKey(a)
                bKey = toStageKey(b)
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
        <ItemTable
            data={stageDropData}
            head={<TableHead />}
            body={<TableBody />}
            variableSize
            sortFunc={sortFunc}
            defaultSortKey={'stage'}
            border
        />
    )
}

export default ItemShowcase