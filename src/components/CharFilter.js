import React, { useCallback, useEffect, useState } from 'react';
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { ContainerHeader, FilterPanel, ResultTable } from './FilterComponents'
import tagData from '../tags.json';
import charData from '../characters.json';
import {
    ClearIcon,
    TagIcon,
    ClockIcon,
    TypeIcon,
    CategoryIcon,
    RaceIcon,
    BodysizeIcon,
    OppaiIcon,
    RankIcon,
    ElseIcon,
    StarIcon,
    AlertIcon
} from './Icon';
import './tooltip.css';
import { Snackbar, Tooltip, Zoom } from '@material-ui/core';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .5rem;
    > .active {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
        svg {
            fill: ${props => props.theme.colors.onSecondary};
            color: ${props => props.theme.colors.onSecondary};
        }
    }
    @media screen and (max-width: 1360px) {
        grid-template-columns: repeat(5, 1fr);
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
        svg {
            fill: ${props => props.theme.colors.onSecondary};
            color: ${props => props.theme.colors.onSecondary};
        }
    }
    > input {
        display: none;
    }
    > svg {
        width: 1.6rem;
        height: 1.4rem;
        vertical-align: middle;
        fill: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondary};
    }
`
const Select = styled(Form.Control)`
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    border-radius: .25rem;
    padding: .1rem;
    border: 1px solid ${props => props.theme.colors.secondary};
    &:focus {
        box-shadow: 0 0 .4rem ${props => props.theme.colors.secondary};
    }
`
const IconWrapper = styled.div`
    cursor: pointer;
    svg {
        width: 1.2rem;
        height: 1.2rem;
        margin: 0;
    }
`

const CharFilterPanel = (props) => {
    const attrIcons = {
        type: TypeIcon,
        category: CategoryIcon,
        race: RaceIcon,
        body: BodysizeIcon,
        oppai: OppaiIcon,
        rank: RankIcon,
        else: ElseIcon
    }

    const widthConfig = {
        default: '40%',
        1360: '52%',
        992: '100%',
    }

    return (
        <FilterPanel widthConfig={widthConfig}>
            <ContainerHeader
                title={
                    <div>
                        {TagIcon}
                        {'標籤選擇'}
                    </div>
                }
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
                {tagData.map((item, idx) => (
                    <StyledToggleButton
                        value={idx}
                        key={idx}
                        bsPrefix='btn-escape'
                    >
                        {attrIcons[item['icon']]}
                        {item['name']}
                    </StyledToggleButton>
                ))}
            </StyledToggleButtonGroup>
            <ContainerHeader
                title={
                    <div>
                        {ClockIcon}
                        {'招募時間'}
                    </div>
                }
            />
            <Form inline>
                <Form.Group>
                    <Select
                        as="select"
                        custom
                        size="sm"
                        defaultValue='9'
                        onChange={props.handleEnlistHour}
                    >
                        {[...Array(10).keys()].slice(1)
                            .map(i => <option key={i}>{i}</option>)}
                    </Select>
                    {'：'}
                    <Select
                        as="select"
                        custom
                        size="sm"
                        defaultValue='00'
                    >
                        {['00', '10', '20', '30', '40', '50']
                            .map(i => <option key={i}>{i}</option>)}
                    </Select>
                </Form.Group>
            </Form>
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
const StarIconWrapper = styled.div`
    display: inline;
    vertical-align: text-bottom;
    svg {
        width: 1.3rem;
        height: 1.3rem;
        margin: 0 .4rem;
        fill: ${props => props.theme.colors.onSurface};
    }
`

function TableContent(props) {
    const TagTooltip = (props) => {
        if (props.char.distinctTagCombs.length === 0) return <></>

        let texts = props.char.distinctTagCombs
            .map(comb => comb.join(', ')).join('\n')
        return (
            <Tooltip title={texts} TransitionComponent={Zoom} arrow>
                <StarIconWrapper>{StarIcon}</StarIconWrapper>
            </Tooltip>
        )
    }

    const gradeToRarity = (grade) => (
        grade === 0 ? 'N'
            : grade === 1 ? 'R'
                : grade === 2 ? 'SR'
                    : 'SSR'
    )

    return (
        <>
            <thead>
                <tr>
                    {[
                        { title: '名字', attr: 'name' },
                        { title: '稀有度', attr: 'grade' },
                        { title: '定位', attr: 'type' },
                        { title: '應用標籤', attr: 'appliedTags' },
                    ].map((item, idx) => (
                        <SortTh
                            key={idx}
                            onClick={() => props.requestSort(item.attr)}
                            direction={props.getSortDirection(item.attr)}
                        >
                            {item.title}
                        </SortTh>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.sortedResult.map((item, idx) => (
                    <tr key={idx}>
                        <td>
                            {item.name}
                            <TagTooltip char={item} />
                        </td>
                        <td>{gradeToRarity(item.grade)}</td>
                        <td>{item.type}</td>
                        <td>{item.appliedTags.join(', ')}</td>
                    </tr>
                ))}
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
            <p>此頁為用於遊戲中全境徵才之篩選器</p>
            <p>應用徵才隨機得到的五個標籤，篩選出可能的人選</p>
        </ModalBody>
        <ModalHeader>
            <span>操作說明</span>
        </ModalHeader>
        <ModalBody>
            <p>選擇標籤以篩選角色</p>
            <p>點擊表格標頭可依升/降序排列</p>
            <p>若出現星星圖示，表示有組合可篩出唯一角色</p>
            <p>將游標移至該圖示上會顯示所有最小標籤組合</p>
        </ModalBody>
        <ModalHeader>
            <span>常用情境</span>
        </ModalHeader>
        <ModalBody>
            <p>鎖定高星角:</p>
            <p>填入招募的五個標籤，並選擇至少應用一標籤</p>
            <p>將結果依星數排序，觀察高星角是否有星星圖示</p>
            <p>若所有高星角皆無圖示，則不值得使用此標籤組合招募</p>
            <p>若有出現圖示，則有一試之價值</p>
        </ModalBody>
        <ModalHeader>
            <span>注意事項</span>
        </ModalHeader>
        <ModalBody>
            <p>並未考慮標籤被劃掉之可能性</p>
            <p>即使出現星星圖示也不代表必中，因為標籤可能被劃掉，或有符合條件但仍未知之角色</p>
            <p>搜尋結果高度依賴現有資料庫，願意的話可以點左邊資訊回報中"全境徵才數據回報"</p>
        </ModalBody>
    </>
)

const FilterContainer = styled.div`
    display: flex;
    @media screen and (max-width: 992px) {
        display: block;
    }
    > div:first-child {
        > div:nth-child(3) {
            margin-top: 1rem;
        }
        > div > div > svg {
                width: 1.2rem;
                height: 1.2rem;
                margin-right: .4rem;
                margin-bottom: .2rem;
                fill: ${props => props.theme.colors.onSurface};
                color: ${props => props.theme.colors.onSurface};
            }
        }
    }
    > div:last-child > div > div {
        margin-right: auto;
    }
    > .MuiSnackbar-root > div {
        background-color: #ff9800;
        font-size: medium;
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        > .MuiSnackbarContent-action {
            margin: 0;
            padding: 0;
            svg 
            {
                width: 1.4rem;
                height: 1.4rem;
                fill: #fff;
            }
        }
    }
`

export default function CharFilter() {
    const [state, setState] = useState({
        filterBtnValue: [],
        characters: [],
        enlistHour: '9',
        isSnackbarOpen: false,
    })

    // filter characters by query tags
    const filterBy = useCallback((val) => {
        if (val.length > 5) {
            setState((prevState) => ({
                filterBtnValue: prevState.filterBtnValue,
                characters: prevState.characters,
                enlistHour: prevState.enlistHour,
                isSnackbarOpen: true,
            }))
            return;
        }
        if (val.length === 0) {
            setState((prevState) => ({
                filterBtnValue: val,
                characters: [],
                enlistHour: prevState.enlistHour,
                isSnackbarOpen: false,
            }))
            return;
        }

        function* combinations(elements, num) {
            for (let i = 0; i < elements.length; i++) {
                if (num === 1)
                    yield [elements[i]]
                else {
                    let remaining = combinations(
                        elements.slice(i + 1, elements.length),
                        num - 1
                    )
                    for (let next of remaining)
                        yield [elements[i], ...next]
                }
            }
        }

        let curVal = val.sort()
        const queryTags = curVal.map(element => tagData[element]['name'])
        let newCharacters = []
        for (let i = curVal.length; i > 0; i--) {
            // generate combinations
            const tagCombs = Array.from(combinations(queryTags, i))
            // screen out ineligible characters
            tagCombs.forEach(tags => {
                // filter by rank and time
                let chars = JSON.parse(JSON.stringify(charData))
                if (!tags.includes("領袖")) {
                    chars = chars.filter(char => char.grade < 3)
                    if (state.enlistHour < 4 && !tags.includes("菁英")) {
                        chars = chars.filter(char => char.grade < 2)
                    }
                }
                // filter by tags
                let appliedTagsNum = 0
                tagData.forEach((tag, idx) => {
                    if (appliedTagsNum === tags.length || chars.length === 0) {
                        return false
                    }
                    if (tags.includes(tag['name'])) {
                        if (idx < 21) {
                            chars = chars.filter(c => c[tag['icon']] === tag['name'])
                        } else {
                            chars = chars.filter(c => c[tag['icon']].includes(tag['name']))
                        }
                    }
                })
                // whether any three (or fewer) tags can lead to only one characters
                if (chars.length === 1 && appliedTagsNum <= 3) {
                    let isExist = false
                    newCharacters.forEach(existChar => {
                        if (existChar['name'] === chars[0]['name']) {
                            isExist = true
                            for (
                                let j = existChar['distinctTagCombs'].length - 1;
                                j >= 0;
                                j--
                            ) {
                                if (
                                    tags.every(t => existChar['distinctTagCombs'][j].includes(t))
                                ) {
                                    existChar['distinctTagCombs'].splice(j, 1)
                                }
                            }
                            existChar['distinctTagCombs'].push(tags)
                            return false
                        }
                    })
                    if (!isExist) {
                        newCharacters.push({
                            name: chars[0]['name'],
                            grade: chars[0]['grade'],
                            type: chars[0]['type'],
                            category: chars[0]['category'],
                            appliedTags: tags,
                            distinctTagCombs: [tags]
                        })
                    }
                } else {
                    chars.forEach(char => {
                        let isExist = false
                        newCharacters.forEach(existChar => {
                            if (existChar['name'] === char['name']) {
                                isExist = true
                                return false
                            }
                        })
                        if (!isExist) {
                            newCharacters.push({
                                name: char['name'],
                                grade: char['grade'],
                                type: char['type'],
                                category: char['category'],
                                appliedTags: tags,
                                distinctTagCombs: []
                            })
                        }
                    })
                }
            })
        }
        setState((prevState) => ({
            filterBtnValue: val,
            characters: newCharacters,
            enlistHour: prevState.enlistHour,
            isSnackbarOpen: false,
        }))
    }, [state.enlistHour])

    const handleEnlistHour = (event) => {
        setState((prevState) => ({
            filterBtnValue: prevState.filterBtnValue,
            characters: prevState.characters,
            enlistHour: event.target.value,
        }));
    }
    useEffect(
        () => filterBy(state.filterBtnValue),
        [filterBy, state.filterBtnValue, state.enlistHour]
    )

    const sortFunc = (sortableItems, sortConfig) => {
        // initial key is 0
        if (sortConfig.key === 0) sortConfig.key = 'grade'

        sortableItems.sort((a, b) => {
            let aKey
            let bKey
            if (sortConfig.key === 'appliedTags') {
                aKey = a[sortConfig.key].join('')
                bKey = b[sortConfig.key].join('')
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

    const handleSnackbarClose = () => {
        setState((prevState) => ({
            filterBtnValue: prevState.filterBtnValue,
            characters: prevState.characters,
            enlistHour: prevState.enlistHour,
            isSnackbarOpen: false,
        }))
    }

    const [modalOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => setModalOpen(true)
    const handleModalClose = () => setModalOpen(false)

    const tableWidthConfig = {
        default: 'calc(60% - 1rem)',
        1360: 'calc(48% - 1rem)',
        992: '100%',
    }

    return (
        <FilterContainer>
            <CharFilterPanel
                filterBy={filterBy}
                handleEnlistHour={handleEnlistHour}
                filterBtnValue={state.filterBtnValue}
            />
            <ResultTable
                result={state.characters}
                sortFunc={sortFunc}
                modalContent={<HelpModalContent handleModalClose={handleModalClose} />}
                modalOpen={modalOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                widthConfig={tableWidthConfig}
            >
                <TableContent />
            </ResultTable>
            <Snackbar
                open={state.isSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                message="最多5個標籤"
                action={AlertIcon}
            />
        </FilterContainer>
    )
}
