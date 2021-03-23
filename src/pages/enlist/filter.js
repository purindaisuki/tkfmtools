import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tooltip, Zoom } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Form } from 'react-bootstrap';

import useSwitch from 'hooks/useSwitch';

import Panels from 'containers/Panels';
import { useLanguage } from 'containers/LanguageProvider';

import Head from 'components/Head';
import { ResultPanel, SortableTh } from 'components/FilterComponents';
import MyHeader from 'components/MyHeader';
import { HeaderIconButton } from 'components/MyIconButton';
import MyToggleButtonGroup, { MyToggleButton } from 'components/MyToggleButtonGroup';
import { ResponsiveCharCard } from 'components/CharCard';
import { ScrollableModal, TextModal } from 'components/MyModal';
import MyRadioGroup, { MyRadio } from 'components/MyRadioGroup';
import MySnackbar from 'components/MySnackbar';
import {
    DeleteIcon,
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
    SettingIcon
} from 'components/icon';

import tagData from 'data/tag.json';
import charData from 'data/character.json';

const StyledToggleButton = styled(MyToggleButton)`
    &&&&& {
        border: none;
        padding: .5rem 0;
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
const TagButtonGroup = ({
    value,
    onChange,
    layoutConfig,
    groupRange
}) => {
    const { charString } = useLanguage()

    const attrIcons = {
        attribute: AttributeIcon,
        position: PositionIcon,
        race: RaceIcon,
        body: BodysizeIcon,
        oppai: OppaiIcon,
        rank: RankIcon,
        else: ElseIcon
    }

    return (
        <MyToggleButtonGroup
            type='checkbox'
            value={value}
            onChange={onChange}
            layoutConfig={layoutConfig}
        >
            {tagData.slice(groupRange[0], groupRange[1]).map(t =>
                [...Array(t.range[1]).keys()].slice(t.range[0]).map(id => (
                    <StyledToggleButton
                        value={id}
                        key={id}
                    >
                        {attrIcons[t.type]}
                        {charString.tags[id]}
                    </StyledToggleButton>
                ))
            )}
        </MyToggleButtonGroup>
    )
}

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
const btnLayoutConfig = {
    'en': {
        1400: 5,
        1160: 4,
        1000: 3,
        768: 4,
        580: 3,
        0: 2
    },
    'zh-TW': {
        1260: 6,
        1080: 5,
        1000: 4,
        768: 5,
        550: 4,
        355: 3,
        0: 2
    }
}

const TagPanel = ({
    filterBtnValue,
    handleBtnGroupChange,
    groupBtnByClass
}) => {
    const { userLanguage, charString } = useLanguage()

    return (
        <div>
            {groupBtnByClass
                ? tagData.map((t, idx) => (
                    <BtnGroupWrapper key={idx}>
                        <StyledBadge pill variant='danger'>
                            {charString.tagAttributes[t.type]}
                        </StyledBadge>
                        <TagButtonGroup
                            value={filterBtnValue.filter(v => v >= t.range[0] && v < t.range[1])}
                            onChange={handleBtnGroupChange(idx)}
                            layoutConfig={btnLayoutConfig[userLanguage]}
                            groupRange={[idx, idx + 1]}
                        />
                    </BtnGroupWrapper>
                ))
                : <BtnGroupWrapper>
                    <TagButtonGroup
                        value={filterBtnValue}
                        onChange={handleBtnGroupChange()}
                        layoutConfig={btnLayoutConfig[userLanguage]}
                        groupRange={[0, 7]}
                    />
                </BtnGroupWrapper>}
        </div>
    )
}

const StyledHeader = styled(MyHeader)`
    padding-bottom: .4rem;
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
    handleModalOpen,
    groupBtnByClass
}) => {
    const { pageString } = useLanguage()

    return (<>
        <MyHeader
            title={pageString.enlist.filter.tagSelectTitle}
            titleIcon={TagIcon}
            end={
                <>
                    <HeaderIconButton
                        onClick={clearBtnValue}
                        tooltipText={pageString.enlist.filter.deleteTooltip}
                    >
                        {DeleteIcon}
                    </HeaderIconButton>
                    <HeaderIconButton
                        onClick={handleModalOpen}
                        tooltipText={pageString.enlist.filter.settingTooltip}
                    >
                        {SettingIcon}
                    </HeaderIconButton>
                </>
            }
            border
        />
        <TagPanel
            filterBtnValue={filterBtnValue}
            handleBtnGroupChange={handleBtnGroupChange}
            groupBtnByClass={groupBtnByClass}
        />
        <StyledHeader
            title={pageString.enlist.filter.timeSelectTitle}
            titleIcon={ClockIcon}
            border
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
    </>)
}

const TableHead = ({ requestSort, getSortDirection }) => {
    const { pageString } = useLanguage()

    return (
        <thead>
            <tr>
                {pageString.enlist.filter.tableHead
                    .map((item, idx) => (
                        <SortableTh
                            key={idx}
                            onClick={() => requestSort(item.attr)}
                            direction={getSortDirection(item.attr)}
                        >
                            {item.title}
                        </SortableTh>
                    ))}
            </tr>
        </thead>
    )
}

const DistinctCharacterTooltip = withStyles({
    tooltip: {
        right: "0",
        fontSize: "1rem",
        whiteSpace: "pre"
    }
})(Tooltip)

const TagTooltip = ({ children, char }) => {
    const { charString } = useLanguage()

    const texts = char.distinctTagCombs
        .map(comb => comb.map(i => charString.tags[i]).join(', '))
        .join('\n')

    return (
        <DistinctCharacterTooltip
            title={texts}
            TransitionComponent={Zoom}
            placement='bottom'
            arrow
        >
            {children}
        </DistinctCharacterTooltip >
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
function TableBody({ sortedResult }) {
    const { userLanguage, charString } = useLanguage()

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
        <tbody>
            {sortedResult.map((char, idx) => (
                <tr key={idx}>
                    <td>
                        <TagTooltip char={char}>
                            <CharCardWrapper>
                                <ResponsiveCharCard
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
                        {char.appliedTags
                            .map(i => charString.tags[i]).join(', ')}
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

const StyledModal = styled(ScrollableModal)`
    > div:nth-child(3) {
        top: 25%;
        width: 30%;
        min-width: max-content;
    }
`
const SettingModal = ({
    open,
    onClose,
    radioValue,
    handleRadioChange
}) => {
    const { pageString } = useLanguage()

    return (
        <StyledModal
            title={pageString.enlist.filter.settingModal.title}
            open={open}
            onClose={onClose}
            ariaLabelledby='setting-modal-title'
            ariaDescribedby='setting-modal-description'
        >
            <MyRadioGroup
                label={pageString.enlist.filter.settingModal.groupLabel}
                value={radioValue}
                handleChange={handleRadioChange}
            >
                {pageString.enlist.filter.settingModal
                    .labels.map(label => (
                        <MyRadio label={label} value={label} key={label} />
                    ))}
            </MyRadioGroup>
        </StyledModal>
    )
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

const Filter = () => {
    const [state, setState] = useState({
        filterBtnValue: [],
        characters: [],
        enlistHour: '9',
        isHelpModalOpen: false,
        isSettingModalOpen: false,
        isSnackbarOpen: false,
    })

    const { pageString, charString } = useLanguage()

    const btnsSettingLabels = pageString.enlist.filter.settingModal.labels

    const { layout, setLayout } = useSwitch(
        'group-btns-by-class',
        btnsSettingLabels,
        (typeof window === 'undefined' || window.innerWidth <= 1000) ? 1 : 0
    )

    const groupBtnByClass = layout === btnsSettingLabels[0]

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

    useEffect(() => {
        const val = state.filterBtnValue.slice()
        if (val.length === 0) {
            setState((state) => ({
                ...state,
                characters: []
            }))
        }

        val.sort()
        // filter characters by query tags
        let charTagData = charData.filter(char => char.tags.available)
        charTagData = charTagData.map((char => {
            const { id, rarity, tags } = char
            return ({ id, rarity, ...tags })
        }))

        let filteredChars = []
        for (let i = val.length; i > 0; i--) {
            // generate combinations
            const tagCombs = Array.from(combinations(val, i))
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
                tagData.forEach(t => {
                    if (appliedTagsNum === tags.length || survivors.length === 0) {
                        return false
                    }

                    [...Array(t.range[1]).keys()].slice(t.range[0]).forEach(id => {
                        if (tags.includes(id)) {
                            appliedTagsNum++
                            survivors = id < 21
                                ? survivors.filter(c => c[t.type] === id)
                                : survivors.filter(c => c[t.type].includes(id))
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
                'character_tag_combination': val,
            })
        }
    }, [state.filterBtnValue, state.enlistHour])

    const handleEnlistHourChange = (event) => {
        setState((state) => ({
            ...state,
            enlistHour: event.target.value
        }))
    }

    const handleBtnGroupChange = (groupIdx) => (val) => {
        let newValue
        if (typeof (groupIdx) !== 'undefined') {
            const groupValues = tagData.map(t =>
                state.filterBtnValue.filter(v => v >= t.range[0] && v < t.range[1])
            )
            groupValues[groupIdx] = val
            newValue = [].concat(...groupValues)
        } else {
            newValue = val
        }

        if (newValue.length > 5) {
            setState((state) => ({
                ...state,
                isSnackbarOpen: true
            }))
            return
        }

        setState((state) => ({
            ...state,
            filterBtnValue: newValue
        }))
    }

    const clearBtnValue = () => {
        setState((state) => ({
            ...state,
            filterBtnValue: []
        }))
    }

    const handelHelpModal = (boolean) => () => {
        setState((state) => ({
            ...state,
            isHelpModalOpen: boolean,
        }))
    }

    const handleSettingModal = (boolean) => () => {
        setState((state) => ({
            ...state,
            isSettingModalOpen: boolean,
        }))
    }

    const handleRadioChange = (event) => {
        setState((state) => ({
            ...state,
            isSettingModalOpen: false,
        }))

        setLayout(event.target.value)
    }

    const handleSnackbarClose = () => {
        setState((state) => ({
            ...state,
            isSnackbarOpen: false,
        }))
    }

    return (<>
        <Head
            title={pageString.enlist.filter.helmet.title}
            description={pageString.enlist.filter.helmet.description}
            path='/enlist/filter/'
        />
        <Panels panelsWidth={['60%', '40%']}>
            <CharFilterPanel
                handleBtnGroupChange={handleBtnGroupChange}
                clearBtnValue={clearBtnValue}
                handleEnlistHourChange={handleEnlistHourChange}
                filterBtnValue={state.filterBtnValue}
                handleModalOpen={handleSettingModal(true)}
                groupBtnByClass={groupBtnByClass}
            />
            <ResultPanel
                data={state.characters}
                head={<TableHead />}
                body={<TableBody />}
                sortFunc={sortFunc}
                defaultSortKey={'rarity'}
                handleModalOpen={handelHelpModal(true)}
                height={groupBtnByClass ? 'calc(100vh - 5rem)' : 'calc(100vh - 16rem)'}
                striped
            />
        </Panels>
        <SettingModal
            open={state.isSettingModalOpen}
            onClose={handleSettingModal(false)}
            radioValue={layout}
            handleRadioChange={handleRadioChange}
        />
        <TextModal
            title={pageString.enlist.filter.helpModal.title}
            open={state.isHelpModalOpen}
            onClose={handelHelpModal(false)}
            content={pageString.enlist.filter.helpModal.content}
            ariaLabelledby="help-modal-title"
            ariaDescribedby="help-modal-description"
        />
        <MySnackbar
            open={state.isSnackbarOpen}
            onClose={handleSnackbarClose}
            message={pageString.enlist.filter.snackbarMsg}
            type='warn'
        />
    </>)
}

export default Filter