import React, { useMemo, useState } from 'react';
import { Table, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import data from './item.json'

const StyledFilterPanel = styled.div`
    width: 52%; height: 100%;
    padding: 1rem;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.surfaceShadow};
    box-shadow: 0 0 .15em ${props => props.theme.colors.surfaceShadow};
    @media (max-width: 1360px) {
        width: 62%;
    }
    @media (max-width: 992px) {
        width: 100%;
    }
`
const ContainerHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: large;
    font-weight: bold;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: .4rem;
    border-bottom: solid 1px ${props => props.theme.colors.surfaceShadow};
    color: ${props => props.theme.colors.onSurface};
`
const ImgWrapper = styled.div`
    cursor: pointer;
`
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .5rem;
    > .active {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
    }
    @media (max-width: 1360px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 992px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 624px) {
        grid-template-columns: repeat(3, 1fr);
    }
`
const StyledToggleButton = styled(ToggleButton)`
    font-size: small;
    text-align: center;
    padding: .15rem .15rem;
    margin-bottom: 0;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
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

function FilterPanel(props) {
    return (
        <StyledFilterPanel>
            <ContainerHeader>
                道具選擇
                <ImgWrapper
                    onClick={props.onClick}
                >
                    <svg
                        viewBox="0 0 20 20"
                        width="18px"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                    >
                        <g stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="butt" fill="none" strokeLinejoin="round">
                            <polyline points="15 4 15 18 5 18 5 4" />
                            <polyline points="18 4 2 4" />
                            <polyline points="8.2 15 8.2 7" />
                            <polyline points="11.8 15 11.8 7" />
                            <polyline points="8 1 12 1" />
                        </g>
                    </svg>
                </ImgWrapper>
            </ContainerHeader>
            <StyledToggleButtonGroup
                type="checkbox"
                value={props.value}
                onChange={props.onChange}
            >
                {data.map((item, idx) => {
                    return (
                        <StyledToggleButton
                            value={idx}
                            key={item.name}
                            bsPrefix='btn-escape'
                        >
                            <img
                                src={`./img/item_${item.id}.png`}
                                alt=''
                            />
                            {item.name}
                        </StyledToggleButton>
                    )
                })}
            </StyledToggleButtonGroup>
        </StyledFilterPanel>
    )
}

const useSortableData = (items, config = { key: 0, direction: 'desc' }) => {
    // when key is number meaning sorted by the number of item
    const [sortConfig, setSortConfig] = useState(config)

    const toStageKey = key => {
        return (
            parseInt(key['chapter']) * 1000 +
            parseInt(key['stage'].split(' ')[0]) *10 +
            (key['stage'].includes('free') ? 1 : 0) +
            (key['stage'].includes('-') ? parseInt(key['stage'].split('-')[1]) : 0)
        )
    }

    const toRarityKey = (key, idx) => {
        switch(key['drop'][idx]['rarity']) {
            case '罕見': return 0
            case '少見': return 1
            case '常見': return 2
            default: return 3
        }
    }

    const sortedItems = useMemo(() => {
        let sortableItems = [...items]

        sortableItems.sort((a, b) => {
            let aKey
            let bKey
            if (sortConfig.key === 'stage') {
                aKey = toStageKey(a)
                bKey = toStageKey(b)
                console.log(a, aKey)
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

        return sortableItems
    }, [items, sortConfig])

    const requestSort = key => {
        let direction = 'desc';
        if (
            sortConfig.key === key &&
            sortConfig.direction === 'desc'
        ) {
            direction = 'asc';
        }
        setSortConfig({ key, direction })
    }

    return { items: sortedItems, requestSort, sortConfig }
}

const ResultTableContainer = styled.div`
    vertical-align: top;
    width: 30%;
    position: absolute;
    margin-left: calc(52% + 1rem);
    padding: 1rem;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.surfaceShadow};
    box-shadow: 0 0 .15em ${props => props.theme.colors.surfaceShadow};
    @media (max-width: 1360px) {
        width: calc(38% - 1rem);
        margin-left: calc(62% + 1rem);
    }
    @media (max-width: 992px) {
        width: 100%;
        position: relative;
        margin-left: 0;
        margin-top: 1rem;
    }
`
const ResultTableWrapper = styled.div`
    height: calc(100% - 1.4rem - 1.5rem);
    maring-top: -.5rem;
    overflow-x: hidden; overflow-y: auto;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: .4rem;
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.surfaceShadow};
        border-radius: .25rem;
    }
    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.surface};
    }
`
const StyledResultTable = styled(Table)`
    width: 100%;
    table-layout: fixed;
    color: ${props => props.theme.colors.onSurface};
    img {
        width: 1.8rem; height: 1.8rem;
    }
`
const SortTh = styled.th`
    position: sticky;
    top: 0;
    cursor: pointer;
    user-select: none;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    &:after {
        content: '${props => {
            if (!props.direction) return
            return props.direction === 'asc' ? ' \\25B2' : ' \\25BC'
        }}';
    }
`


function ResultTable(props) {
    const { items, requestSort, sortConfig } = useSortableData(props.stages)
    const getSortDirection = (name) => {
        if (items.length === 0) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    const TableHeader = () => {
        if (items.length === 0) {
            return <SortTh>稀有度</SortTh>
        }

        return (
            items[0].drop.map((item, idx) => {
                return (
                    <SortTh
                        key={idx}
                        onClick={() => requestSort(idx)}
                        direction={getSortDirection(idx)}
                    >
                        <img
                            src={`./img/item_${item.id}.png`}
                            alt={item.name}
                        />
                    </SortTh>
                )
            })
        )
    }

    return (
        <ResultTableContainer>
            <ContainerHeader>篩選結果</ContainerHeader>
            <ResultTableWrapper>
                <StyledResultTable
                    striped
                    borderless
                    size="sm"
                >
                    <thead>
                        <tr>
                            <SortTh
                                onClick={() => requestSort('stage')}
                                direction={getSortDirection('stage')}
                            >
                                關卡
                            </SortTh>
                            <TableHeader />
                            <SortTh
                                onClick={() => requestSort('energy')}
                                direction={getSortDirection('energy')}
                            >
                                <img
                                    src='./img/energy.png'
                                    className='card-table-img'
                                    alt='體力消耗'
                                />
                            </SortTh>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((stage, idx) => {
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
                </StyledResultTable>
            </ResultTableWrapper>
        </ResultTableContainer>
    )
}

const FilterContainer = styled.div`
    display: flex;
    @media (max-width: 992px) {
        display: block;
    }
`

function ItemFilter(props) {
    const [value, setValue] = useState([])
    const [stages, setStages] = useState([])

    const handleChange = (val) => {
        setValue(val)
        if (val.length === 0) {
            setStages([])
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
        setStages(filteredStages)
    }

    return (
        <FilterContainer>
            <FilterPanel
                value={value}
                themeVariant={props.themeVariant}
                onChange={handleChange}
                onClick={() => handleChange([])}
            />
            <ResultTable
                theme={props.theme}
                stages={stages}
            />
        </FilterContainer>
    )

}

export default ItemFilter;