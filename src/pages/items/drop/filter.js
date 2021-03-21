import React, { useState } from 'react';
import styled from 'styled-components';

import { useLanguage } from 'containers/LanguageProvider';

import Head from "components/Head";
import { FilterPanel, ResultTable, SortableTh } from 'components/FilterComponents';
import MyHeader from 'components/MyHeader';
import { HeaderIconButton } from 'components/MyIconButton';
import MyToggleButtonGroup, { MyToggleButton } from 'components/MyToggleButtonGroup';
import ImageSupplier from 'components/ImageSupplier';
import { TextModal } from 'components/MyModal';
import { DeleteIcon } from 'components/icon';

import itemDropData from 'data/byStageToItem';
import stageDropData from 'data/stageDrop.json';

const FilterWidthConfig = {
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
    const { userLanguage, pageString, itemString } = useLanguage()

    return (
        <FilterPanel widthConfig={FilterWidthConfig}>
            <MyHeader
                title={pageString.items.drop.filter.itemPanelTitle}
                end={
                    <HeaderIconButton
                        onClick={clearBtnValue}
                        tooltipText={pageString.items.drop.filter.deleteTooltip}
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
    const { pageString, itemString } = useLanguage()

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
    const { pageString } = useLanguage()

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
    const { itemString } = useLanguage()

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

const FilterContainer = styled.div`
    display: flex;
    @media screen and (max-width: 992px) {
        display: block;
    }
    > div:last-child > div:first-child {
        justify-content: start;
    }
`
const tableWidthConfig = {
    default: 'calc(40% - 1rem)',
    1360: 'calc(38% - 1rem)',
    992: '100%',
}

const ItemFilter = () => {
    const { pageString } = useLanguage()

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

        const stageDrop = [].concat(...stageDropData.map(chapter => (
            chapter.stages.map(stage => {
                const { materials, trainItems, expPotions, ...rest } = stage
                return {
                    ...rest,
                    drops: materials.concat(trainItems, expPotions),
                    chapter: chapter.chapter
                }
            })
        )))

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

    const handelHelpModal = (boolean) => () => {
        setState((state) => ({
            ...state,
            isHelpModalOpen: boolean,
        }))
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

const Filter = () => {
    const { pageString } = useLanguage()

    return (
        <>
            <Head
                title={pageString.items.drop.filter.helmet.title}
                description={pageString.items.drop.filter.helmet.description}
                path='/items/drop/filter/'
            />
            <ItemFilter />
        </>
    )
}

export default Filter