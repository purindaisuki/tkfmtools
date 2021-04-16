import React, { useState } from 'react';
import styled from 'styled-components';
import {
    TableHead as MuiTableHead,
    TableBody as MuiTableBody,
    TableRow as MuiTableRow,
    TableCell as MuiTableCell
} from '@material-ui/core';

import Panels from 'containers/Panels';
import { useLanguage } from 'containers/LanguageProvider';

import Head from "components/Head";
import ResultTablePanel from 'components/ResultTablePanel';
import { SortableTh } from 'components/SortableTable';
import Header from 'components/Header';
import { HeaderIconButton } from 'components/IconButton';
import ToggleButtonGroup, { ToggleButton } from 'components/ToggleButtonGroup';
import ImageSupplier from 'components/ImageSupplier';
import { TextModal } from 'components/Modal';
import { DeleteIcon } from 'components/icon';

import itemDropData from 'data/byStageToItem';
import stageDropData from 'data/stageDrop.json';

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
    },
    'jp': {
        1360: 5,
        992: 4,
        768: 5,
        624: 4,
        410: 3,
        0: 2,
    },
    'kr': {
        1360: 5,
        992: 4,
        768: 5,
        624: 4,
        410: 3,
        0: 2,
    }
}

const StyledToggleButton = styled(ToggleButton)`
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

    return (<>
        <Header
            title={pageString.items.drop.filter.itemPanelTitle}
            end={
                <HeaderIconButton
                    onClick={clearBtnValue}
                    tooltipText={pageString.items.drop.filter.deleteTooltip}
                >
                    {DeleteIcon}
                </HeaderIconButton>
            }
            border
        />
        <ToggleButtonGroup
            value={filterBtnValue}
            onChange={filterBy}
            layoutConfig={btnLayoutConfig[userLanguage]}
        >
            {Object.entries(itemDropData).map((entry, ind) => {
                if (entry[1].drop.length === 0) return true

                return (
                    <StyledToggleButton
                        value={entry[0]}
                        key={ind}
                    >
                        <ItemImg
                            name={`item_${entry[0]}`}
                            alt=''
                        />
                        {itemString.name[entry[0]]}
                    </StyledToggleButton>
                )
            })}
        </ToggleButtonGroup>
    </>)
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
    data
}) => {
    const { pageString, itemString } = useLanguage()

    if (data.length === 0) {
        return (
            <SortableTh>
                {pageString.items.drop.filter.tableHead[1]}
            </SortableTh>
        )
    }

    return (
        Object.entries(data[0]).map((entry, ind) => {
            if (entry[0] === 'stage' || entry[0] === 'energy') {
                return
            }

            return (
                <ImgTh
                    key={entry[0]}
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
    sortedData
}) => {
    const { pageString } = useLanguage()

    return (
        <MuiTableHead>
            <MuiTableRow>
                <SortableTh
                    onClick={() => requestSort('stage')}
                    direction={getSortDirection('stage')}
                >
                    {pageString.items.drop.filter.tableHead[0]}
                </SortableTh>
                <ItemTh
                    requestSort={requestSort}
                    getSortDirection={getSortDirection}
                    data={sortedData}
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
            </MuiTableRow>
        </MuiTableHead>
    )
}

const TableBody = ({ sortedData }) => {
    const { itemString } = useLanguage()

    return (
        <MuiTableBody>
            {sortedData.map((stage, ind) => {
                return (
                    <MuiTableRow hover key={stage.stage}>
                        <MuiTableCell>{stage.stage}</MuiTableCell>
                        {Object.entries(stage).map((entry, ind) => {
                            if (
                                entry[0] === 'stage' ||
                                entry[0] === 'energy'
                            ) {
                                return
                            }

                            return (
                                <MuiTableCell key={ind}>
                                    {itemString.rarity[entry[1]]}
                                </MuiTableCell>
                            )
                        })}
                        <MuiTableCell>{stage.energy}</MuiTableCell>
                    </MuiTableRow>
                )
            })}
        </MuiTableBody>
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

const Filter = () => {
    const { pageString } = useLanguage()

    const [state, setState] = useState({
        filterBtnValue: [],
        data: [],
        isHelpModalOpen: false,
    })

    const filterBy = (event, val) => {
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

    return (<>
        <Head
            title={pageString.items.drop.filter.helmet.title}
            description={pageString.items.drop.filter.helmet.description}
            path='/items/drop/filter/'
        />
        <Panels panelsWidth={['62%', '38%']}>
            <ItemFilterPanel
                filterBtnValue={state.filterBtnValue}
                filterBy={filterBy}
                clearBtnValue={(e) => filterBy(e, [])}
            />
            <ResultTablePanel
                data={state.data}
                head={<TableHead />}
                body={<TableBody />}
                sortFunc={sortFunc}
                defaultSortKey={state.filterBtnValue[0]}
                handleModalOpen={handelHelpModal(true)}
                maxHeight='calc(100vh - 16rem)'
                striped
            />
        </Panels>
        <TextModal
            title={pageString.items.drop.filter.helpModal.title}
            open={state.isHelpModalOpen}
            onClose={handelHelpModal(false)}
            content={pageString.items.drop.filter.helpModal.content}
            ariaLabelledby="help-modal-title"
            ariaDescribedby="help-modal-description"
        />
    </>)
}

export default Filter