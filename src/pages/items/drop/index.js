import React, { useState } from 'react';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

import Scrollable from 'containers/Scrollable';
import { useLanguage } from 'containers/LanguageProvider';

import Head from "components/Head";
import MyIconButton from 'components/MyIconButton';
import { SortableTh, SortableTable } from 'components/FilterComponents';
import { ItemCard } from 'components/MyCard';
import { ScrollableModal } from 'components/MyModal';
import MyHeader from 'components/MyHeader';
import MyToggleButtonGroup, { MyToggleButton } from 'components/MyToggleButtonGroup';
import { SettingIcon } from 'components/icon';

import stageDropData from 'data/stageDrop.json';
import itemData from 'data/item.json';

const StyledTh = styled(SortableTh)`
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.onSecondary};
    white-space: nowrap;
    ${props => props.$sortable ? null : 'cursor: default;'}
`
const TableHead = ({
    column,
    columnHasMounted,
    requestSort,
    getSortDirection
}) => {
    const { pageString } = useLanguage()

    return (
        <thead>
            <tr>
                {Object.entries(pageString.items.drop.index.tableHead)
                    .map((entry, idx) => {
                        const sortable = entry[0] === 'stage' || entry[0] === 'energy'

                        return (
                            (idx === 0 || columnHasMounted[idx - 1]) &&
                            <StyledTh
                                onClick={sortable ? () => requestSort(entry[0]) : undefined}
                                direction={sortable ? getSortDirection(entry[0]) : undefined}
                                key={idx}
                                $sortable={sortable}
                                hidden={idx !== 0 && !column.includes(idx - 1)}
                            >
                                {entry[1]}
                            </StyledTh>
                        )
                    })}
            </tr>
        </thead>
    )
}

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    > div:last-child {
        margin: 0;
    }
`
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
const StyledBadge = styled(Badge)`
    background-color: ${props => props.$rarity === 0 ? 'lightgray'
        : props.$rarity === 1 ? '#90CAF9'
            : props.$rarity === 2 ? '#A5D6A7' : '#FFAB91'};
    color: black;
    margin-left: .4rem;
`
const ItemTd = ({ items, rarity, rank, hidden }) => {
    const { itemString } = useLanguage()

    return (
        <td hidden={hidden}>
            <ItemsContainer>
                {items.length !== 0 &&
                    items.map((item, i) => (
                        <ItemWrapper key={i} hidden={!rarity.includes(item.rarity) ||
                            (itemData[item.id].category === 0 && !rank.includes(itemData[item.id].rank))}>
                            <ItemCard id={item.id} />
                            <StyledBadge pill $rarity={item.rarity}>
                                {itemString.rarity[item.rarity]}
                            </StyledBadge>
                        </ItemWrapper>
                    ))}
            </ItemsContainer>
        </td>
    )
}

const TableBody = ({
    column,
    rarity,
    rank,
    columnHasMounted,
    sortedResult
}) => (
    <tbody>
        {sortedResult.map((s, idx) => {
            const { chapter, stage, energy, ...rest } = s

            return (
                <tr
                    key={idx}
                    hidden={Object.values(rest)
                        .filter((v, i) => column.includes(i))
                        .every(v =>
                            !v.some(i => rarity.includes(i.rarity) &&
                                (itemData[i.id].category !== 0 ||
                                    rank.includes(itemData[i.id].rank)))
                        )}
                >
                    <td>
                        {`${chapter}-${stage}`}
                    </td>
                    {Object.values(rest).map((v, idx) => (
                        columnHasMounted[idx] &&
                        <ItemTd
                            items={v}
                            rarity={rarity}
                            rank={rank}
                            hidden={!column.includes(idx)}
                            key={idx}
                        />
                    ))}
                    <td hidden={!column.includes(3)}>
                        {columnHasMounted[3] && energy}
                    </td>
                </tr>
            )
        })}
    </tbody>
)

const btnLayoutConfig = {
    'en': { 0: 2, 990: 4 },
    'zh-TW': { 0: 4 }
}

const StyledContainer = styled.div`
    padding: .2rem;
`
const StyledHeader = styled(MyHeader)`
    margin-top: 1rem;
`
const StyledToggleButton = styled(MyToggleButton)`
    &&&& {padding: .25rem .15rem;}
`
const ButtonGroupContainer = ({
    filterBtnValue,
    filterBy,
    groupValues,
    strings
}) => {
    const { userLanguage } = useLanguage()

    return (
        <StyledContainer>
            <StyledHeader
                title={strings.title}
            />
            <MyToggleButtonGroup
                type='checkbox'
                value={filterBtnValue}
                onChange={filterBy}
                layoutConfig={btnLayoutConfig[userLanguage]}
            >
                {groupValues.map((v, idx) => (
                    <StyledToggleButton value={v} key={idx}>
                        {strings.button[idx]}
                    </StyledToggleButton>
                ))}
            </MyToggleButtonGroup>
        </StyledContainer>
    )
}

const StyledModal = styled(ScrollableModal)`
    > div:nth-child(3) {
        top: 20%;
        width: 30%;
        @media screen and (max-width: 1300px) {
            width: 40%;
        }
        @media screen and (max-width: 992px) {
            width: 60%;
        }
        @media screen and (max-width: 768px) {
            width: 90%;
        }
        > div:last-child > div:first-child > div {
            margin-top: 0;
        }
    }
`
const SettingModal = ({
    isModalOpen,
    onClose,
    filterBy,
    ...props
}) => {
    const { pageString } = useLanguage()

    return (
        <StyledModal
            title={pageString.items.drop.index.settingModal.title}
            open={isModalOpen}
            onClose={onClose}
            ariaLabelledby='setting-modal-title'
        >
            {Object.entries(BtnGroupsValues).map((entry, idx) => (
                <ButtonGroupContainer
                    groupValues={entry[1]}
                    filterBtnValue={props[entry[0]]}
                    filterBy={filterBy(entry[0])}
                    strings={pageString.items.drop.index.settingModal.content[idx]}
                    key={idx}
                />
            ))}
        </StyledModal>
    )
}

const toStageKey = (key) => {
    return (
        parseInt(key.chapter) * 1000 +
        parseInt(key.stage.split(' ')[0]) * 10 +
        (key.stage.includes('free') ? 1 : 0) +
        (key.stage.includes('-') ? parseInt(key.stage.split('-')[1]) : 0)
    )
}

const sortFunc = (sortableItems, sortConfig) => {
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

const BtnGroupsValues = {
    column: [0, 1, 2, 3],
    rank: [1, 2, 3, 4],
    rarity: [0, 1, 2, 3]
}

const stageDrop = [].concat(...stageDropData.map(chapter => (
    chapter.stages.map(stage => ({
        chapter: chapter.chapter,
        ...stage
    }))
)))

const TableWrapper = styled(Scrollable)`
    overflow-x: auto;
    height: calc(100vh - 10.4rem);
    padding-right: 0;
    margin-right: 0;
    table {
        text-align: center;
    }
`
const SettingButtonWrapper = styled.div`
    position absolute;
    right: 0;
    top: -4rem;
`
const Index = () => {
    const { pageString } = useLanguage()

    const [state, setState] = useState({
        ...BtnGroupsValues,
        column: typeof (window) !== 'undefined' && window.innerWidth < 600 ? [0] : BtnGroupsValues.column,
        isModalOpen: false,
        columnHasMounted: typeof (window) !== 'undefined' && window.innerWidth < 600
            ? [...Array(4).keys()].map((b, i) => i === 0)
            : Array(4).fill(true)
    })

    const filterBy = (key) => (val) => setState(state => ({
        ...state,
        [key]: val,
        columnHasMounted: key === 'column'
            ? state.columnHasMounted.map((b, i) => b || val.includes(i))
            : state.columnHasMounted
    }))

    const handleModal = (boolean) => () => setState(state => ({
        ...state,
        isModalOpen: boolean
    }))

    return (
        <>
            <Head
                title={pageString.items.drop.index.helmet.title}
                description={pageString.items.drop.index.helmet.description}
                path='/items/drop/'
            />
            <SettingButtonWrapper>
                <MyIconButton
                    onClick={handleModal(true)}
                    tooltipText={pageString.items.drop.index.settingTooltip}
                >
                    {SettingIcon}
                </MyIconButton>
            </SettingButtonWrapper>
            <TableWrapper>
                <SortableTable
                    data={stageDrop}
                    head={<TableHead
                        column={state.column}
                        columnHasMounted={state.columnHasMounted}
                    />}
                    body={<TableBody
                        column={state.column}
                        rarity={state.rarity}
                        rank={state.rank}
                        columnHasMounted={state.columnHasMounted}
                    />}
                    sortFunc={sortFunc}
                    defaultSortKey={'stage'}
                    border
                />
            </TableWrapper>
            <SettingModal
                {...state}
                isModalOpen={state.isModalOpen}
                onClose={handleModal(false)}
                filterBy={filterBy}
            />
        </>
    )
}

export default Index