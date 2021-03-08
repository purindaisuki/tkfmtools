import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FilterPanel, ResultTable, SortableTh } from './FilterComponents';
import MyHeader from './MyHeader';
import { HeaderIconButton } from './MyIconButton';
import MyToggleButtonGroup, { MyToggleButton } from './MyToggleButtonGroup';
import ImageSupplier from './ImageSupplier';
import { TextModal } from './MyModal';
import { LanguageContext } from './LanguageProvider';
import { DeleteIcon } from './icon';
import itemDropData from 'gamedata/byStageToItem';
import stageDropData from 'gamedata/stageDrop.json';

const StyledToggleButton = styled(MyToggleButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .85rem;
`
const ItemImg = styled(ImageSupplier)`
    width: 2.26rem; 
    height: 2.26rem;
`
const ItemFilterPanel = ({
    filterBtnValue,
    filterBy,
    clearBtnValue
}) => {
    const { userLanguage, pageString, itemString } = useContext(LanguageContext)

    const widthConfig = {
        default: '60%',
        1360: '62%',
        992: '100%',
    }

    const btnLayoutConfig = {
        'en': {
            1360: 4,
            992: 3,
            768: 4,
            624: 3,
            0: 2
        },
        'zh-TW': {
            1360: 5,
            992: 4,
            768: 5,
            624: 4,
            410: 3,
            0: 2,
        }
    }

    return (
        <FilterPanel widthConfig={widthConfig}>
            <MyHeader
                title={pageString.items.drop.filter.itemPanelTitle}
                end={
                    <HeaderIconButton
                        onClick={clearBtnValue}
                    >
                        {DeleteIcon}
                    </HeaderIconButton>
                }
            />
            <MyToggleButtonGroup
                type='checkbox'
                value={filterBtnValue}
                onChange={filterBy}
                layoutConfig={btnLayoutConfig[userLanguage]}
            >
                {Object.entries(itemDropData).map((entry, idx) => {
                    if (entry[1].drop.length === 0) return true

                    return (
                        <StyledToggleButton
                            value={entry[0]}
                            key={idx}
                        >
                            <ItemImg
                                name={`item_${entry[0]}`}
                                alt=''
                            />
                            {itemString.name[entry[0]]}
                        </StyledToggleButton>
                    )
                })}
            </MyToggleButtonGroup>
        </FilterPanel>
    )
}

const ImgTh = styled(SortableTh)`
    &:after {
        position: absolute;
        top: calc(50% - .75rem);
        margin-left: 2rem;
    }
`
const TableImg = styled(ImageSupplier)`
    width: 1.8rem;
    height: 1.8rem;
`
const ItemTh = ({
    requestSort,
    getSortDirection,
    sortedResult
}) => {
    const { pageString, itemString } = useContext(LanguageContext)

    if (sortedResult.length === 0) {
        return (
            <SortableTh>
                {pageString.items.drop.filter.tableHead[1]}
            </SortableTh>
        )
    }

    return (
        Object.entries(sortedResult[0]).map((entry, idx) => {
            if (entry[0] === 'stage' || entry[0] === 'energy') {
                return
            }

            return (
                <ImgTh
                    key={idx}
                    onClick={() => requestSort(entry[0])}
                    direction={getSortDirection(entry[0])}
                >
                    <TableImg
                        name={`item_${entry[0]}`}
                        alt={itemString.name[entry[0]]}
                    />
                </ImgTh>
            )
        })
    )
}

const TableHead = ({
    requestSort,
    getSortDirection,
    sortedResult
}) => {
    const { pageString } = useContext(LanguageContext)

    return (
        <thead>
            <tr>
                <SortableTh
                    onClick={() => requestSort('stage')}
                    direction={getSortDirection('stage')}
                >
                    {pageString.items.drop.filter.tableHead[0]}
                </SortableTh>
                <ItemTh
                    requestSort={requestSort}
                    getSortDirection={getSortDirection}
                    sortedResult={sortedResult}
                />
                <ImgTh
                    onClick={() => requestSort('energy')}
                    direction={getSortDirection('energy')}
                >
                    <TableImg
                        name='energy'
                        alt={pageString.items.drop.filter.tableHead[2]}
                    />
                </ImgTh>
            </tr>
        </thead>
    )
}

const TableBody = ({ sortedResult }) => {
    const { itemString } = useContext(LanguageContext)

    return (
        <tbody>
            {sortedResult.map((stage, idx) => {
                return (
                    <tr key={idx}>
                        <td>{stage.stage}</td>
                        {Object.entries(stage).map((entry, idx) => {
                            if (
                                entry[0] === 'stage' ||
                                entry[0] === 'energy'
                            ) {
                                return
                            }

                            return (
                                <td key={idx}>
                                    {itemString.rarity[entry[1]]}
                                </td>
                            )
                        })}
                        <td>{stage.energy}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

const FilterContainer = styled.div`
    display: flex;
    @media screen and (max-width: 992px) {
        display: block;
    }
    > div:last-child > div:first-child {
        justify-content: start;
    }
`
export default function ItemFilter() {
    const { pageString } = useContext(LanguageContext)

    const [state, setState] = useState({
        filterBtnValue: [],
        data: [],
        isHelpModalOpen: false,
    })

    const filterBy = (val) => {
        if (val.length === 0) {
            setState((state) => ({
                ...state,
                filterBtnValue: val,
                data: [],
            }))
            return;
        }

        const stageDrop = stageDropData.map(stage => {
            const { materials, trainItems, expPotions, ...rest } = stage
            return { ...rest, drops: materials.concat(trainItems, expPotions) }
        })

        let filteredStages = stageDrop.filter(stage => (
            val.every(queryItem => {
                let flag = false
                stage.drops.forEach(drop => {
                    if (drop.id === queryItem) {
                        flag = true
                        return false
                    }
                })
                return flag
            })
        ))

        filteredStages = filteredStages.map(stage => {
            const parsedStage = stage.chapter + '-' + stage.stage
            const newStage = { stage: parsedStage, energy: stage.energy }
            stage.drops.forEach(item => {
                if (val.includes(item.id)) {
                    newStage[item.id] = item.rarity
                }
            })
            return newStage
        })

        setState((state) => ({
            ...state,
            filterBtnValue: val,
            data: filteredStages,
        }))
    }

    const sortFunc = (sortableItems, sortConfig) => {
        const toStageKey = (stage) => {
            const splits = stage.split('-')

            return (
                parseInt(splits[0]) * 1000 +
                parseInt(splits[1].split(' ')[0]) * 10 +
                (splits[1].includes('free') ? 1 : 0) +
                (splits.length > 2 ? parseInt(splits[2]) : 0)
            )
        }

        sortableItems.sort((a, b) => {
            let aKey
            let bKey
            if (sortConfig.key === 'stage') {
                aKey = toStageKey(a.stage)
                bKey = toStageKey(b.stage)
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

    const handelHelpModal = (boolean) => () => {
        setState((state) => ({
            ...state,
            isHelpModalOpen: boolean,
        }))
    }

    const tableWidthConfig = {
        default: 'calc(40% - 1rem)',
        1360: 'calc(38% - 1rem)',
        992: '100%',
    }

    return (
        <FilterContainer>
            <ItemFilterPanel
                filterBtnValue={state.filterBtnValue}
                filterBy={filterBy}
                clearBtnValue={() => filterBy([])}
            />
            <ResultTable
                data={state.data}
                head={<TableHead />}
                body={<TableBody />}
                sortFunc={sortFunc}
                defaultSortKey={state.filterBtnValue[0]}
                handleModalOpen={handelHelpModal(true)}
                widthConfig={tableWidthConfig}
                striped
            />
            <TextModal
                title={pageString.items.drop.filter.helpModal.title}
                open={state.isHelpModalOpen}
                onClose={handelHelpModal(false)}
                content={pageString.items.drop.filter.helpModal.content}
                ariaLabelledby="help-modal-title"
                ariaDescribedby="help-modal-description"
            />
        </FilterContainer>
    )
}
