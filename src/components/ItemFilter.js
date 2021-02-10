import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { ContainerHeader, FilterPanel, ResultTable } from './FilterComponents'
import styled from 'styled-components';
import { ClearIcon } from './Icon';
import data from '../item.json'

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
const IconWrapper = styled.div`
    cursor: pointer;
    svg {
        width: 1.2rem;
        height: 1.2rem;
    }
`

const ItemFilterPanel = (props) => {
    const widthConfig = {
        default: '60%',
        1360: '62%',
        992: '100%',
    }

    return (
        <FilterPanel widthConfig={widthConfig}>
            <ContainerHeader
                title={'道具選擇'}
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

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: large;
    border-bottom: 1px solid ${props => props.theme.colors.border};
`
const ModalBody = styled.div`
    margin: 1rem 0;
`

const HelpModalContent = (props) => (
    <>
        <ModalHeader>
            <span>介紹</span>
            <span onClick={props.handleModalClose}>&times;</span>
        </ModalHeader>
        <ModalBody>
            <p>此頁為遊戲中主線掉落物之篩選器</p>
            <p>根據目標掉落物，篩選出可能的地圖</p>
        </ModalBody>
        <ModalHeader>
            <span>操作說明</span>
        </ModalHeader>
        <ModalBody>
            <p>選擇掉落物以篩選地圖</p>
            <p>點擊表格標頭可依升/降序排列</p>
        </ModalBody>
        <ModalHeader>
            <span>注意事項</span>
        </ModalHeader>
        <ModalBody>
            <p>只包含主線之掉落物</p>
            <p>即使稀有度相同，不同等級材料的掉落率也不同，不同地圖掉落率也不同</p>
            <p>目前掉落率尚不明，願意的話可以點左邊資訊回報中"主線掉落數據回報"，或許未來資料足夠可新增刷圖計算功能</p>
        </ModalBody>
    </>
)

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

    const [modalOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false)

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
                modalContent={<HelpModalContent handleModalClose={handleModalClose} />}
                modalOpen={modalOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                widthConfig={tableWidthConfig}
            >
                <TableContent />
            </ResultTable>
        </FilterContainer>
    )
}

