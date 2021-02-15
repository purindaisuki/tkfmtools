import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { ContainerHeader, FilterPanel, ResultTable } from './FilterComponents'
import styled from 'styled-components';
import { ClearIcon } from './Icon';
import data from '../item.json'
import { LanguageContext } from './LanguageProvider';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
    display: grid;
    grid-template-columns: repeat(${props => props.layoutConfig.default}, 1fr);
    gap: .5rem;
    ${props => Object.entries(props.layoutConfig).map(entries => (
    `@media screen and (min-width: ${entries[0]}px) {
            grid-template-columns: repeat(${entries[1]}, 1fr);
        }
        `
    ))}
    > .active {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
    }
`
const StyledToggleButton = styled(ToggleButton)`
    font-size: .85rem;
    font-weight: normal;
    text-align: center;
    padding: .15rem .15rem;
    margin-bottom: 0;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.secondaryBorder};
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    &:hover {
        border: 1px solid ${props => props.theme.colors.secondary};
        box-shadow: inset 0 0 .5rem ${props => props.theme.colors.secondary}
            , 0 0 .1rem ${props => props.theme.colors.secondary};
    }
    &:active {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
    }
    > input {
        display: none;
    }
    > img {
        width: 2.26rem; height: 2.26rem;
    }
`
const IconWrapper = styled.div`
    cursor: pointer;
    svg {
        width: 1.2rem;
        height: 1.2rem;
    }
`

const ItemFilterPanel = (props) => {
    const { userLanguage, stringData } = React.useContext(LanguageContext)

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
            410: 2
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
                title={stringData.potential.filter.itemPanelTitle}
                end={
                    <IconWrapper
                        onClick={() => props.filterBy([])}
                    >
                        {ClearIcon}
                    </IconWrapper>
                }
            />
            <StyledToggleButtonGroup
                type="checkbox"
                value={props.filterBtnValue}
                onChange={props.filterBy}
                layoutConfig={btnLayoutConfig}
            >
                {data.map((item, idx) => {
                    if (item.drop.length === 0) return true

                    return (
                        <StyledToggleButton
                            value={idx}
                            key={idx}
                            bsPrefix='btn-escape'
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/img/item_${item.id}.png`}
                                alt=''
                            />
                            {stringData.items.name[item.name]}
                        </StyledToggleButton>
                    )
                })}
            </StyledToggleButtonGroup>
        </FilterPanel>
    )
}

const SortTh = styled.th`
    position: sticky;
    top: 0;
    cursor: pointer;
    user-select: none;
    font-size: 1.1rem;
    font-weight: normal;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    &:after {
        content: '${props => {
        if (!props.direction) return
        return props.direction === 'asc' ? ' \\25B2' : ' \\25BC'
    }}';
    }
`

const TableContent = (props) => {
    const { stringData } = React.useContext(LanguageContext)

    const TableHeader = (props) => {
        if (props.sortedResult.length === 0) {
            return <SortTh>{stringData.potential.filter.tableHead[1]}</SortTh>
        }

        return (
            props.sortedResult[0].drop.map((item, idx) => {
                return (
                    <SortTh
                        key={idx}
                        onClick={() => props.requestSort(idx)}
                        direction={props.getSortDirection(idx)}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/item_${item.id}.png`}
                            alt={stringData.items.name[item.name]}
                        />
                    </SortTh>
                )
            })
        )
    }
    return (
        <>
            <thead>
                <tr>
                    <SortTh
                        onClick={() => props.requestSort('stage')}
                        direction={props.getSortDirection('stage')}
                    >
                        {stringData.potential.filter.tableHead[0]}
                    </SortTh>
                    <TableHeader {...props} />
                    <SortTh
                        onClick={() => props.requestSort('energy')}
                        direction={props.getSortDirection('energy')}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/energy.png`}
                            className='card-table-img'
                            alt={stringData.potential.filter.tableHead[2]}
                        />
                    </SortTh>
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
                                        {stringData.items.rarity[item.rarity]}
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
    const { stringData } = React.useContext(LanguageContext)

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
        let filteredStages = JSON.parse(JSON.stringify(data[curVal[0]].drop))
        filteredStages.forEach(stage => {
            stage.drop = [{
                id: data[curVal[0]].id,
                name: data[curVal[0]].name,
                rarity: stage.rarity
            }]
            delete stage.rarity
        })
        curVal.forEach((itemIdx, idx) => {
            if (idx === 0) return true
            filteredStages = filteredStages.filter(thisStage => {
                let flag = false
                data[itemIdx].drop.forEach(that => {
                    if (
                        that.chapter === thisStage.chapter
                        && that.stage === thisStage.stage
                    ) {
                        let newDrop = {
                            id: data[itemIdx].id,
                            name: data[itemIdx].name,
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
                modalOpen={modalOpen}
                handleModalOpen={() => setModalOpen(true)}
                handleModalClose={() => setModalOpen(false)}
                modalContent={stringData.potential.filter.modal}
                widthConfig={tableWidthConfig}
            >
                <TableContent />
            </ResultTable>
        </FilterContainer>
    )
}

