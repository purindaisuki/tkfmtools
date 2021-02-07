import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FilterPanel, ResultTable } from './FilterComponents'
import styled from 'styled-components';
import { ClearIcon } from './Icon';
import data from '../item.json'

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
    const TableHeader = (props) => {
        if (props.sortedResult.length === 0) {
            return <SortTh>稀有度</SortTh>
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
                            alt={item.name}
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
                        關卡
                            </SortTh>
                    <TableHeader {...props} />
                    <SortTh
                        onClick={() => props.requestSort('energy')}
                        direction={props.getSortDirection('energy')}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/energy.png`}
                            className='card-table-img'
                            alt='體力消耗'
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
                                    <td key={item.id}>{item.rarity}</td>
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
    > div:first-child {
        width: 60%; height: 100%;
        @media screen and (max-width: 1360px) {
            width: 62%;
        }
        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }
    display: flex;
    @media screen and (max-width: 992px) {
        display: block;
    }
`
const ContainerHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: large;
    font-weight: normal;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: .4rem;
    border-bottom: solid 1px ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.onSurface};
`
const ImgWrapper = styled.div`
    cursor: pointer;
    svg {
        width: 1.2rem;
        height: 1.2rem;
    }
`
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .5rem;
    > .active {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
    }
    @media screen and (max-width: 1360px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 992px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 624px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 410px) {
        grid-template-columns: repeat(2, 1fr);
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
const ResultTableContainer = styled.div`
    vertical-align: top;
    width: calc(40% - 1rem);
    position: absolute;
    margin-left: calc(60% + 1rem);
    padding: 1rem;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: 0 0 .15em lightgray;
    @media screen and (max-width: 1360px) {
        width: calc(38% - 1rem);
        margin-left: calc(62% + 1rem);
    }
    @media screen and (max-width: 992px) {
        width: 100%;
        position: relative;
        margin-left: 0;
        margin-top: 1rem;
    }
`

export default function ItemFilter() {
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
        let curVal = val.sort()
        // deep copy
        let filteredStages = JSON.parse(JSON.stringify(data[curVal[0]].drop))
        filteredStages.forEach(stage => {
            stage['drop'] = [{
                id: data[curVal[0]].id,
                name: data[curVal[0]].name,
                rarity: stage.rarity
            }]
            delete stage['rarity']
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
                parseInt(key['chapter']) * 1000 +
                parseInt(key['stage'].split(' ')[0]) * 10 +
                (key['stage'].includes('free') ? 1 : 0) +
                (key['stage'].includes('-') ? parseInt(key['stage'].split('-')[1]) : 0)
            )
        }

        const toRarityKey = (key, idx) => {
            switch (key['drop'][idx]['rarity']) {
                case '罕見': return 0
                case '少見': return 1
                case '常見': return 2
                default: return 3
            }
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
                aKey = toRarityKey(a, sortConfig.key)
                bKey = toRarityKey(b, sortConfig.key)
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
        <FilterContainer>
            <FilterPanel>
                <ContainerHeader>
                    {'道具選擇'}
                    <ImgWrapper
                        onClick={() => filterBy([])}
                    >
                        {ClearIcon}
                    </ImgWrapper>
                </ContainerHeader>
                <StyledToggleButtonGroup
                    type="checkbox"
                    value={state.filterBtnValue}
                    onChange={filterBy}
                >
                    {data.map((item, idx) => (
                        <StyledToggleButton
                            value={idx}
                            key={idx}
                            bsPrefix='btn-escape'
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/img/item_${item.id}.png`}
                                alt=''
                            />
                            {item.name}
                        </StyledToggleButton>
                    ))}
                </StyledToggleButtonGroup>
            </FilterPanel>
            <ResultTableContainer>
                <ResultTable
                    result={state.stages}
                    sortFunc={sortFunc}
                >
                    <TableContent />
                </ResultTable>
            </ResultTableContainer>
        </FilterContainer>
    )
}
