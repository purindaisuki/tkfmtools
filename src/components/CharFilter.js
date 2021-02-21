import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Snackbar, Tooltip, Zoom } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { ContainerHeader, FilterPanel, ResultTable, SortableTh } from './FilterComponents';
import MyToggleButtonGroup, { MyToggleButton } from './MyToggleButtonGroup';
import './tooltip.css';
import tagData from '../gamedata/tags.json';
import charTagData from '../gamedata/characterTags.json';
import { LanguageContext } from './LanguageProvider';
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
} from './icon';

const StyledFilterPanel = styled(FilterPanel)`
    > div:nth-child(3) {
        margin-top: 1rem;
    }
`
const IconWrapper = styled.div`
    svg {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .4rem;
        margin-bottom: .2rem;
        fill: ${props => props.theme.colors.onSurface};
        color: ${props => props.theme.colors.onSurface};
    }
`
const ClearIconWrapper = styled(IconWrapper)`
    cursor: pointer;
    svg {
        margin: 0;
    }
`
const StyledToggleButton = styled(MyToggleButton)`
    svg {
        width: 1.6rem;
        height: 1.4rem;
        vertical-align: middle;
        fill: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondary};
    }
    &.active > svg {
        fill: ${props => props.theme.colors.onSecondary};
        color: ${props => props.theme.colors.onSecondary};
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
const CharFilterPanel = (props) => {
    const {
        userLanguage,
        pageString,
        charString
    } = React.useContext(LanguageContext)

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

    const btnLayoutConfig = userLanguage === 'en'
        ? {
            990: 3,
            768: 4,
            624: 3,
            410: 2,
            0: 2
        }
        : {
            768: 5,
            624: 4,
            410: 3,
            0: 2
        }

    return (
        <StyledFilterPanel widthConfig={widthConfig}>
            <ContainerHeader
                title={
                    <div>
                        <IconWrapper>
                            {TagIcon}
                        </IconWrapper>
                        {pageString.enlist.tagSelectTitle}
                    </div>
                }
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
                {tagData.map((item, idx) => (
                    <StyledToggleButton
                        value={idx}
                        key={idx}
                    >
                        {attrIcons[item.icon]}
                        {charString.tags[item.id]}
                    </StyledToggleButton>
                ))}
            </MyToggleButtonGroup>
            <ContainerHeader
                title={
                    <div>
                        <IconWrapper>
                            {ClockIcon}
                        </IconWrapper>
                        {pageString.enlist.timeSelectTitle}
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
        </StyledFilterPanel>
    )
}

const StarIconWrapper = styled(IconWrapper)`
    display: inline;
    svg {
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 .4rem;
    }
`
function TableContent(props) {
    const { pageString, charString } = React.useContext(LanguageContext)

    const TagTooltip = (props) => {
        if (props.char.distinctTagCombs.length === 0) return <></>

        const texts = props.char.distinctTagCombs
            .map(comb => comb.map(i => charString.tags[i]).join(', '))
            .join('\n')

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
                    {pageString.enlist.tableHead
                        .map((item, idx) => (
                            <SortableTh
                                key={idx}
                                onClick={() => props.requestSort(item.attr)}
                                direction={props.getSortDirection(item.attr)}
                            >
                                {item.title}
                            </SortableTh>
                        ))}
                </tr>
            </thead>
            <tbody>
                {props.sortedResult.map((item, idx) => (
                    <tr key={idx}>
                        <td>
                            {charString.name[item.name]}
                            <TagTooltip char={item} />
                        </td>
                        <td>{gradeToRarity(item.grade)}</td>
                        <td>{charString.tags[item.type]}</td>
                        <td>
                            {
                                item.appliedTags
                                    .map(i => charString.tags[i]).join(', ')
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    )
}

const StyledSnackbar = styled(Snackbar)`
    > div {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        background-color: #ff9800;
        font-size: medium;
    }
    .MuiSnackbarContent-action {
        margin: 0;
        padding: 0;
    }
    svg {
        width: 1.4rem;
        height: 1.4rem;
        margin-right: .4rem;
        fill: #fff;
    }
`
const MySnackbar = ({
    open,
    onClose,
    message
}) => (
    <StyledSnackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        message={message}
        action={AlertIcon}
    />
)

const FilterContainer = styled.div`
    display: flex;
    @media screen and (max-width: 992px) {
        display: block;
    }
`
export default function CharFilter() {
    const { pageString } = React.useContext(LanguageContext)

    const [state, setState] = useState({
        filterBtnValue: [],
        characters: [],
        enlistHour: '9',
        isSnackbarOpen: false,
    })

    // filter characters by query tags
    const filterBy = useCallback((val) => {
        if (val.length > 5) {
            setState((state) => ({
                ...state,
                isSnackbarOpen: true
            }))
            return;
        }
        if (val.length === 0) {
            setState((state) => ({
                ...state,
                filterBtnValue: val,
                characters: []
            }))
            return;
        }

        function* combinations(elements, num) {
            for (let i = 0; i < elements.length; i++) {
                if (num === 1)
                    yield [elements[i]]
                else {
                    const remaining = combinations(
                        elements.slice(i + 1, elements.length),
                        num - 1
                    )
                    for (let next of remaining)
                        yield [elements[i], ...next]
                }
            }
        }

        const curVal = val.sort()
        const filterableChars = charTagData.filter(char => char.available)
        let filteredChars = []
        for (let i = curVal.length; i > 0; i--) {
            // generate combinations
            const tagCombs = Array.from(combinations(curVal, i))
            // screen out ineligible characters
            tagCombs.forEach(tags => {
                // filter by rank and time
                let survivors = JSON.parse(JSON.stringify(filterableChars))
                if (!tags.includes(20)) {
                    survivors = survivors.filter(char => char.grade < 3)
                    if (state.enlistHour < 4 && !tags.includes(19)) {
                        survivors = survivors.filter(char => char.grade < 2)
                    }
                }
                // filter by tags
                let appliedTagsNum = 0
                tagData.forEach((tag) => {
                    if (appliedTagsNum === tags.length || survivors.length === 0) {
                        return false
                    }
                    if (tags.includes(tag.id)) {
                        appliedTagsNum++
                        if (tag.id < 21) {
                            survivors = survivors.filter(c => c[tag.icon] === tag.id)
                        } else {
                            survivors = survivors.filter(c => c[tag.icon].includes(tag.id))
                        }
                    }
                })
                // whether any three (or fewer) tags can lead to only one characters
                if (survivors.length === 1 && appliedTagsNum <= 3) {
                    let isExist = false
                    filteredChars.forEach(existChar => {
                        if (existChar.name === survivors[0].name) {
                            isExist = true
                            for (
                                let j = existChar.distinctTagCombs.length - 1;
                                j >= 0;
                                j--
                            ) {
                                if (
                                    tags.every(t => existChar.distinctTagCombs[j].includes(t))
                                ) {
                                    existChar.distinctTagCombs.splice(j, 1)
                                }
                            }
                            existChar.distinctTagCombs.push(tags)
                            return false
                        }
                    })
                    if (!isExist) {
                        filteredChars.push({
                            name: survivors[0].name,
                            grade: survivors[0].grade,
                            type: survivors[0].type,
                            category: survivors[0].category,
                            appliedTags: tags,
                            distinctTagCombs: [tags]
                        })
                    }
                } else {
                    survivors.forEach(char => {
                        let isExist = false
                        filteredChars.forEach(existChar => {
                            if (existChar.name === char.name) {
                                isExist = true
                                return false
                            }
                        })
                        if (!isExist) {
                            filteredChars.push({
                                name: char.name,
                                grade: char.grade,
                                type: char.type,
                                category: char.category,
                                appliedTags: tags,
                                distinctTagCombs: []
                            })
                        }
                    })
                }
            })
        }
        setState((state) => ({
            ...state,
            filterBtnValue: val,
            characters: filteredChars
        }))
    }, [state.enlistHour])

    const handleEnlistHour = (event) => {
        setState((state) => ({
            ...state,
            enlistHour: event.target.value
        }));
    }
    useEffect(
        () => filterBy(state.filterBtnValue),
        [filterBy, state.filterBtnValue, state.enlistHour]
    )

    const sortFunc = (sortableItems, sortConfig) => {
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
            <MySnackbar
                open={state.isSnackbarOpen}
                onClose={handleSnackbarClose}
                message={pageString.enlist.snackbarMsg}
            />
            <ResultTable
                result={state.characters}
                sortFunc={sortFunc}
                defaultSortKey={'grade'}
                modalOpen={modalOpen}
                handleModalOpen={() => setModalOpen(true)}
                handleModalClose={() => setModalOpen(false)}
                modalContent={pageString.enlist.modal}
                widthConfig={tableWidthConfig}
                striped={true}
            >
                <TableContent />
            </ResultTable>
        </FilterContainer>
    )
}
