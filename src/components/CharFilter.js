import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Snackbar, Tooltip, Zoom } from '@material-ui/core';
import { Badge, Form } from 'react-bootstrap';
import { ContainerHeader, FilterPanel, ResultTable, SortableTh } from './FilterComponents';
import MyToggleButtonGroup, { MyToggleButton } from './MyToggleButtonGroup';
import { CharCardHeader } from './CharShowcase';
import './tooltip.css';
import tagData from '../gamedata/tag.json';
import charData from '../gamedata/character.json';
import { LanguageContext } from './LanguageProvider';
import {
    ClearIcon,
    TagIcon,
    ClockIcon,
    AttributeIcon,
    PositionIcon,
    RaceIcon,
    BodysizeIcon,
    OppaiIcon,
    RankIcon,
    ElseIcon,
    StarIcon,
    AlertIcon
} from './icon';

const BtnGroupWrapper = styled.div`
    position: relative;
    padding: .5rem;
    padding-top: .8rem;
    margin: 1rem 0;
    border-radius: .25rem;
    border: 1px solid ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.surface};
`
const StyledBadge = styled(Badge)`
    position: absolute;
    top: -.6rem;
    z-index: 1;
    font-size: small;
    background-color: brown;
    color: white;
`
const StyledToggleButton = styled(MyToggleButton)`
    &&&&& {
        border: none;
        padding: .5rem .15rem;
        white-space: nowrap;
    }
    svg {
        width: 1.6rem;
        height: 1.4rem;
        margin-right: 1rem;
        vertical-align: middle;
        fill: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondary};
    }
    &.active > svg {
        fill: ${props => props.theme.colors.onSecondary};
        color: ${props => props.theme.colors.onSecondary};
    }
`
const TagBtnGroup = ({
    filterBtnValue,
    handleBtnGroupChange,
}) => {
    const { userLanguage, charString } = useContext(LanguageContext)

    const attrIcons = {
        attribute: AttributeIcon,
        position: PositionIcon,
        race: RaceIcon,
        body: BodysizeIcon,
        oppai: OppaiIcon,
        rank: RankIcon,
        else: ElseIcon
    }

    const btnLayoutConfig = userLanguage === 'en'
        ? {
            1200: 6,
            990: 5,
            800: 4,
            550: 3,
            0: 2
        }
        : {
            800: 6,
            680: 5,
            550: 4,
            390: 3,
            0: 2
        }

    return (
        <div>
            {Object.entries(tagData).map((entry, idx) => (
                <BtnGroupWrapper key={idx}>
                    <StyledBadge pill variant='danger'>
                        {charString.tagAttributes[entry[0]]}
                    </StyledBadge>
                    <MyToggleButtonGroup
                        type='checkbox'
                        value={filterBtnValue.filter(v => entry[1].includes(v))}
                        onChange={handleBtnGroupChange(idx)}
                        layoutConfig={btnLayoutConfig}
                    >
                        {entry[1].map((tag, idx) => (
                            <StyledToggleButton
                                value={tag}
                                key={idx}
                            >
                                {attrIcons[entry[0]]}
                                {charString.tags[tag]}
                            </StyledToggleButton>
                        ))}
                    </MyToggleButtonGroup>
                </BtnGroupWrapper>
            ))}
        </div>
    )
}

const StyledFilterPanel = styled(FilterPanel)`
    > div:nth-child(2) {
        margin-top: 0;
    }
    > div:nth-child(3) {
        margin-top: .5rem;
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
const CharFilterPanel = ({
    clearBtnValue,
    filterBtnValue,
    handleBtnGroupChange,
    handleEnlistHourChange,
}) => {
    const { pageString } = useContext(LanguageContext)

    const widthConfig = {
        default: '100%',
    }

    return (
        <StyledFilterPanel widthConfig={widthConfig}>
            <ContainerHeader
                title={
                    <div>
                        <IconWrapper>
                            {TagIcon}
                        </IconWrapper>
                        {pageString.enlist.filter.tagSelectTitle}
                    </div>
                }
                end={
                    <ClearIconWrapper
                        onClick={clearBtnValue}
                    >
                        {ClearIcon}
                    </ClearIconWrapper>
                }
            />
            <TagBtnGroup
                filterBtnValue={filterBtnValue}
                handleBtnGroupChange={handleBtnGroupChange}
            />
            <ContainerHeader
                title={
                    <div>
                        <IconWrapper>
                            {ClockIcon}
                        </IconWrapper>
                        {pageString.enlist.filter.timeSelectTitle}
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
                        onChange={handleEnlistHourChange}
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

const StyledTooltip = styled(Tooltip)`
    right: 0;
`
const TagTooltip = ({
    children,
    char
}) => {
    const { charString } = useContext(LanguageContext)

    const texts = char.distinctTagCombs
        .map(comb => comb.map(i => charString.tags[i]).join(', '))
        .join('\n')

    return (
        <StyledTooltip
            title={texts}
            TransitionComponent={Zoom}
            placement='bottom'
            arrow
        >
            {children}
        </StyledTooltip >
    )
}

const CharCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: -.75rem;
    width: max-content;
`
const StarIconWrapper = styled(IconWrapper)`
    display: flex;
    ${props => props.$hidden ? 'visibility: hidden;' : undefined}
    align-items: center;
    svg {
        width: 1.2rem;
        height: 1.2rem;
        margin: 0;
        margin-left: -.6rem;
    }
`
function TableContent(props) {
    const {
        userLanguage,
        pageString,
        charString
    } = useContext(LanguageContext)

    const parseRarity = (rarity) => (
        rarity === 0 ? 'N'
            : rarity === 1 ? 'R'
                : rarity === 2 ? 'SR'
                    : 'SSR'
    )

    const cardTextWrapConfig = {
        'zh-TW': 1360,
        'en': 1360,
    }

    return (
        <>
            <thead>
                <tr>
                    {pageString.enlist.filter.tableHead
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
                {props.sortedResult.map((char, idx) => (
                    <tr key={idx}>
                        <td>
                            <TagTooltip char={char}>
                                <CharCardWrapper>
                                    <CharCardHeader
                                        id={char.id}
                                        $textWrapConfig={
                                            cardTextWrapConfig[userLanguage]
                                        }
                                    />
                                    <StarIconWrapper
                                        $hidden={char.distinctTagCombs.length === 0}
                                    >
                                        {StarIcon}
                                    </StarIconWrapper>
                                </CharCardWrapper>
                            </TagTooltip>
                        </td>
                        <td>{parseRarity(char.rarity)}</td>
                        <td>
                            {
                                char.appliedTags
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
    display: block;
    > div {
        display: block;
        position: relative;
        margin: auto;
        margin-top: 1rem;
    }
`
export default function CharFilter() {
    const { pageString, charString } = useContext(LanguageContext)

    const [state, setState] = useState({
        filterBtnValue: [],
        characters: [],
        enlistHour: '9',
        isSnackbarOpen: false,
    })

    // filter characters by query tags
    const filterBy = useCallback((val) => {
        if (val.length === 0) {
            setState((state) => ({
                ...state,
                characters: []
            }))
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
        let charTagData = charData.filter(char => char.tags.available)
        charTagData = charTagData.map((char => {
            const { id, rarity, tags, ...rest } = char
            return ({ id, rarity, ...tags })
        }))

        let filteredChars = []
        for (let i = curVal.length; i > 0; i--) {
            // generate combinations
            const tagCombs = Array.from(combinations(curVal, i))
            // screen out ineligible characters
            tagCombs.forEach(tags => {
                // filter by rank and time
                let survivors = JSON.parse(JSON.stringify(charTagData))
                if (!tags.includes(20)) {
                    survivors = survivors.filter(char => char.rarity < 3)
                    if (state.enlistHour < 4 && !tags.includes(19)) {
                        survivors = survivors.filter(char => char.rarity < 2)
                    }
                }
                // filter by tags
                let appliedTagsNum = 0
                Object.entries(tagData).forEach(entry => {
                    if (appliedTagsNum === tags.length || survivors.length === 0) {
                        return false
                    }

                    entry[1].forEach(idx => {
                        if (tags.includes(idx)) {
                            appliedTagsNum++
                            if (idx < 21) {
                                survivors = survivors.filter(c => c[entry[0]] === idx)
                            } else {
                                survivors = survivors.filter(c => c[entry[0]].includes(idx))
                            }
                        }
                    })
                })
                // whether any three (or fewer) tags can lead to only one characters
                if (survivors.length === 1 && appliedTagsNum <= 3) {
                    let isExist = false
                    filteredChars.forEach(existChar => {
                        if (existChar.id === survivors[0].id) {
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
                            id: survivors[0].id,
                            rarity: survivors[0].rarity,
                            attribute: survivors[0].attribute,
                            position: survivors[0].position,
                            appliedTags: tags,
                            distinctTagCombs: [tags]
                        })
                    }
                } else {
                    survivors.forEach(char => {
                        let isExist = false
                        filteredChars.forEach(existChar => {
                            if (existChar.id === char.id) {
                                isExist = true
                                return false
                            }
                        })
                        if (!isExist) {
                            filteredChars.push({
                                id: char.id,
                                rarity: char.rarity,
                                attribute: char.attribute,
                                position: char.position,
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
            characters: filteredChars
        }))

        if (dataLayer && val.length === 5) {
            dataLayer.push({
                'event': 'five_tags_selected',
                'character_tag_combination': curVal,
            })
        }
    }, [state.enlistHour])

    const handleEnlistHourChange = (event) => {
        setState((state) => ({
            ...state,
            enlistHour: event.target.value
        }))
    }
    useEffect(() => {
        filterBy(state.filterBtnValue)
    }, [filterBy, state.filterBtnValue, state.enlistHour])

    const sortFunc = (sortableItems, sortConfig) => {
        sortableItems.sort((a, b) => {
            let aKey
            let bKey
            if (sortConfig.key === 'appliedTags') {
                aKey = a[sortConfig.key].join('')
                bKey = b[sortConfig.key].join('')
            } else if (sortConfig.key === 'name') {
                aKey = charString.name[a.id]
                bKey = charString.name[b.id]
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

    const handleBtnGroupChange = (gropuIdx) => (val) => {
        const groupValues = Object.keys(tagData)
            .map(attr => state.filterBtnValue.filter(v => tagData[attr].includes(v)))
        groupValues[gropuIdx] = val
        const destructValues = [].concat(...groupValues)
        if (destructValues.length > 5) {
            setState((state) => ({
                ...state,
                isSnackbarOpen: true
            }))
            return
        }

        setState((state) => ({
            ...state,
            filterBtnValue: destructValues
        }))
    }

    const clearBtnValue = () => {
        setState((state) => ({
            ...state,
            filterBtnValue: []
        }))
    }

    const handleSnackbarClose = () => {
        setState((state) => ({
            ...state,
            isSnackbarOpen: false,
        }))
    }

    const [modalOpen, setModalOpen] = useState(false)

    const tableWidthConfig = {
        default: '100%',
    }

    return (
        <>
            <FilterContainer>
                <CharFilterPanel
                    handleBtnGroupChange={handleBtnGroupChange}
                    clearBtnValue={clearBtnValue}
                    handleEnlistHourChange={handleEnlistHourChange}
                    filterBtnValue={state.filterBtnValue}
                />
                <ResultTable
                    result={state.characters}
                    sortFunc={sortFunc}
                    defaultSortKey={'rarity'}
                    modalOpen={modalOpen}
                    handleModalOpen={() => setModalOpen(true)}
                    handleModalClose={() => setModalOpen(false)}
                    modalContent={pageString.enlist.filter.modal}
                    widthConfig={tableWidthConfig}
                    striped
                >
                    <TableContent />
                </ResultTable>
            </FilterContainer>
            <MySnackbar
                open={state.isSnackbarOpen}
                onClose={handleSnackbarClose}
                message={pageString.enlist.filter.snackbarMsg}
            />
        </>
    )
}
