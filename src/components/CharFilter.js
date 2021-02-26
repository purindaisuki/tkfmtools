import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Snackbar, Tooltip, Zoom } from '@material-ui/core';
import { Form } from 'react-bootstrap';
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
    } = useContext(LanguageContext)

    const attrIcons = {
        attribute: AttributeIcon,
        position: PositionIcon,
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
                        onClick={() => props.handleBtnGroupChange([])}
                    >
                        {ClearIcon}
                    </ClearIconWrapper>
                }
            />
            <MyToggleButtonGroup
                type='checkbox'
                value={props.filterBtnValue}
                onChange={props.handleBtnGroupChange}
                layoutConfig={btnLayoutConfig}
            >
                {tagData.map((item, idx) => (
                    <StyledToggleButton
                        value={idx}
                        key={idx}
                    >
                        {attrIcons[item]}
                        {charString.tags[idx]}
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
                        onChange={props.handleEnlistHourChange}
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

const CharCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: -.75rem;
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

    const TagTooltip = (props) => {
        const texts = props.char.distinctTagCombs
            .map(comb => comb.map(i => charString.tags[i]).join(', '))
            .join('\n')

        return (
            <StarIconWrapper
                $hidden={props.char.distinctTagCombs.length === 0}
            >
                <Tooltip title={texts} TransitionComponent={Zoom} arrow>
                    {StarIcon}
                </Tooltip>
            </StarIconWrapper>
        )
    }

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
                {props.sortedResult.map((char, idx) => (
                    <tr key={idx}>
                        <td>
                            <CharCardWrapper>
                                <CharCardHeader
                                    id={char.id}
                                    $textWrapConfig={
                                        cardTextWrapConfig[userLanguage]
                                    }
                                />
                                <TagTooltip char={char} />
                            </CharCardWrapper>
                        </td>
                        <td>{parseRarity(char.rarity)}</td>
                        <td>{charString.tags[char.position]}</td>
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
    display: flex;
    @media screen and (max-width: 992px) {
        display: block;
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
                tagData.forEach((tagAttr, idx) => {
                    if (appliedTagsNum === tags.length || survivors.length === 0) {
                        return false
                    }
                    if (tags.includes(idx)) {
                        appliedTagsNum++
                        if (idx < 21) {
                            survivors = survivors.filter(c => c[tagAttr] === idx)
                        } else {
                            survivors = survivors.filter(c => c[tagAttr].includes(idx))
                        }
                    }
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
    }, [state.enlistHour])

    const handleEnlistHourChange = (event) => {
        setState((state) => ({
            ...state,
            enlistHour: event.target.value
        }))
    }
    useEffect(
        () => {
            filterBy(state.filterBtnValue)
        },
        [filterBy, state.filterBtnValue, state.enlistHour]
    )

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

    const handleBtnGroupChange = (val) => {
        if (val.length > 5) {
            setState((state) => ({
                ...state,
                isSnackbarOpen: true
            }))
            return
        }

        setState((state) => ({
            ...state,
            filterBtnValue: val
        }))

        if (dataLayer) {
            dataLayer.push({
                'character_tag_combination': val,
                'selected_tag_num': val.length
            })
        }
    }

    const handleSnackbarClose = () => {
        setState((state) => ({
            ...state,
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
                handleBtnGroupChange={handleBtnGroupChange}
                handleEnlistHourChange={handleEnlistHourChange}
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
                defaultSortKey={'rarity'}
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
