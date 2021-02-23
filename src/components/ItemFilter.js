import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ContainerHeader, FilterPanel, ResultTable, SortableTh } from './FilterComponents';
import MyToggleButtonGroup, {MyToggleButton} from './MyToggleButtonGroup';
import ImageSupplier from './ImageSupplier';
import itemDropData from '../gamedata/itemDrop.json';
import { LanguageContext } from './LanguageProvider';
import { ClearIcon } from './icon';

const ClearIconWrapper = styled.div`
    cursor: pointer;
    svg {
        width: 1.2rem;
        height: 1.2rem;
    }
`
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
const ItemFilterPanel = (props) => {
    const { userLanguage, pageString, itemString } = useContext(LanguageContext)

    const widthConfig = {
        default: '60%',
        1360: '62%',
        992: '100%',
    }

    const btnLayoutConfig = userLanguage === 'en'
        ? {
            1360: 4,
            992: 3,
            768: 4,
            624: 3,
            0: 2
        }
        : {
            1360: 5,
            992: 4,
            768: 5,
            624: 4,
            410: 3,
            0: 2,
        }

    return (
        <FilterPanel widthConfig={widthConfig}>
            <ContainerHeader
                title={pageString.potential.filter.itemPanelTitle}
                end={
                    <ClearIconWrapper
                        onClick={() => props.filterBy([])}
                    >
                        {ClearIcon}
                    </ClearIconWrapper>
                }
            />
            <MyToggleButtonGroup
                type='checkbox'
                value={props.filterBtnValue}
                onChange={props.filterBy}
                layoutConfig={btnLayoutConfig}
            >
                {itemDropData.map((item, idx) => {
                    if (item.drop.length === 0) return true

                    return (
                        <StyledToggleButton
                            value={idx}
                            key={idx}
                        >
                            <ItemImg
                                name={`item_${item.id}.png`}
                                isBackground={false}
                                alt=''
                            />
                            {itemString.name[item.id]}
                        </StyledToggleButton>
                    )
                })}
            </MyToggleButtonGroup>
        </FilterPanel>
    )
}

const TableImg = styled(ImageSupplier)`
    width: 1.8rem;
    height: 1.8rem;
`
const TableContent = (props) => {
    const { pageString, itemString } = useContext(LanguageContext)

    const ItemTh = (props) => {
        if (props.sortedResult.length === 0) {
            return <SortableTh>{pageString.potential.filter.tableHead[1]}</SortableTh>
        }

        return (
            props.sortedResult[0].drop.map((item, idx) => {
                return (
                    <SortableTh
                        key={idx}
                        onClick={() => props.requestSort(idx)}
                        direction={props.getSortDirection(idx)}
                    >
                        <TableImg
                            name={`item_${item.id}.png`}
                            isBackground={false}
                            alt={itemString.name[item.id]}
                        />
                    </SortableTh>
                )
            })
        )
    }

    return (
        <>
            <thead>
                <tr>
                    <SortableTh
                        onClick={() => props.requestSort('stage')}
                        direction={props.getSortDirection('stage')}
                    >
                        {pageString.potential.filter.tableHead[0]}
                    </SortableTh>
                    <ItemTh {...props} />
                    <SortableTh
                        onClick={() => props.requestSort('energy')}
                        direction={props.getSortDirection('energy')}
                    >
                        <TableImg
                            name='energy.png'
                            isBackground={false}
                            alt={pageString.potential.filter.tableHead[2]}
                        />
                    </SortableTh>
                </tr>
            </thead>
            <tbody>
                {props.sortedResult.map((stage, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{`${stage.chapter}-${stage.stage}`}</td>
                            {stage.drop.map(item => {
                                return (
                                    <td key={item.id}>
                                        {itemString.rarity[item.rarity]}
                                    </td>
                                )
                            })}
                            <td>{stage.energy}</td>
                        </tr>
                    )
                })}
            </tbody>
        </>
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
        stages: [],
    })

    const filterBy = (val) => {
        if (val.length === 0) {
            setState({
                filterBtnValue: val,
                stages: [],
            })
            return;
        }
        const curVal = val.sort()
        // deep copy
        let filteredStages = JSON.parse(JSON.stringify(itemDropData[curVal[0]].drop))
        filteredStages.forEach(stage => {
            stage.drop = [{
                id: itemDropData[curVal[0]].id,
                rarity: stage.rarity
            }]
            delete stage.rarity
        })
        curVal.forEach((itemIdx, idx) => {
            if (idx === 0) return true
            filteredStages = filteredStages.filter(thisStage => {
                let flag = false
                itemDropData[itemIdx].drop.forEach(that => {
                    if (
                        that.chapter === thisStage.chapter
                        && that.stage === thisStage.stage
                    ) {
                        let newDrop = {
                            id: itemDropData[itemIdx].id,
                            rarity: that.rarity
                        }
                        thisStage.drop.push(newDrop)
                        flag = true
                        return false
                    }
                })
                return flag
            })
        })
        setState({
            filterBtnValue: val,
            stages: filteredStages,
        })
    }

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
            } else if (sortConfig.key === 'energy') {
                aKey = a[sortConfig.key]
                bKey = b[sortConfig.key]
            } else {
                aKey = a.drop[sortConfig.key].rarity
                bKey = b.drop[sortConfig.key].rarity
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

    const [modalOpen, setModalOpen] = useState(false)

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
            />
            <ResultTable
                result={state.stages}
                sortFunc={sortFunc}
                defaultSortKey={0}
                modalOpen={modalOpen}
                handleModalOpen={() => setModalOpen(true)}
                handleModalClose={() => setModalOpen(false)}
                modalContent={pageString.potential.filter.modal}
                widthConfig={tableWidthConfig}
                striped={true}
            >
                <TableContent />
            </ResultTable>
        </FilterContainer>
    )
}
