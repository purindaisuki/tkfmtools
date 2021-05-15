import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import {
    TableHead as MuiTableHead,
    TableBody as MuiTableBody,
    TableRow as MuiTableRow,
    TableCell as MuiTableCell,
    Tooltip, Zoom
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import useSwitch from 'hooks/useSwitch';

import Panels from 'containers/Panels';
import { useLanguage } from 'containers/LanguageProvider';

import { ResultTablePanel } from 'components/recruitment-filter';
import ResultTablePanelByCharacter from 'components/ResultTablePanel'
import Head from 'components/Head';
import { SortableTh } from 'components/SortableTable';
import Header from 'components/Header';
import { HeaderIconButton } from 'components/IconButton';
import { StyledChip } from 'components/Chip';
import ToggleButtonGroup, { ToggleButton } from 'components/ToggleButtonGroup';
import { Select } from 'components/Input';
import { ResponsiveCharCard } from 'components/CharCard';
import { ScrollableModal, TextModal } from 'components/Modal';
import RadioGroup, { Radio } from 'components/RadioGroup';
import Snackbar from 'components/Snackbar';
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
        <ToggleButtonGroup
            value={value}
            onChange={onChange}
            layoutConfig={layoutConfig}
        >
            {tagData.slice(groupRange[0], groupRange[1]).map(t =>
                [...Array(t.range[1]).keys()].slice(t.range[0]).map(id => (
                    <ToggleButton
                        value={id}
                        key={id}
                    >
                        {attrIcons[t.type]}
                        {charString.tags[id]}
                    </ToggleButton>
                ))
            )}
        </ToggleButtonGroup>
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
const AttributeChip = styled(StyledChip)`
    && {
        position: absolute;
        z-index: 1;
        top: -.6rem;
        width: ${props => props.$lang === 'en' ? '4.5rem' : 'auto'};
        background-color: brown;
        color: white;
    }
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
    },
    'ja': {
        1460: 6,
        1250: 5,
        1030: 4,
        1000: 3,
        768: 5,
        630: 4,
        430: 3,
        0: 2
    },
    'ko': {
        1260: 6,
        768: 5,
        550: 4,
        365: 3,
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
                ? tagData.map((t, ind) => (
                    <BtnGroupWrapper key={ind}>
                        <AttributeChip label={charString.tagAttributes[t.type]} $lang={userLanguage} />
                        <TagButtonGroup
                            value={filterBtnValue.filter(v => v >= t.range[0] && v < t.range[1])}
                            onChange={handleBtnGroupChange(ind)}
                            layoutConfig={btnLayoutConfig[userLanguage]}
                            groupRange={[ind, ind + 1]}
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

const StyledHeader = styled(Header)`
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
const StyledSelect = styled(Select)`
    && > div > div {
        padding-right: 1.4rem;
    }
`
const CharFilterPanel = ({
    clearBtnValue,
    filterBtnValue,
    enlistHour,
    handleBtnGroupChange,
    handleEnlistHourChange,
    handleModalOpen,
    groupBtnByClass
}) => {
    const { pageString } = useLanguage()

    const [minute, setMinute] = useState('00')

    return (<>
        <Header
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
        <StyledSelect
            values={[...Array(10).keys()].slice(1)}
            value={enlistHour}
            variant='outlined'
            size='small'
            inputProps={{ 'aria-label': 'recruitment-hour' }}
            onChange={handleEnlistHourChange}
        />
        {'：'}
        <StyledSelect
            values={['00', '10', '20', '30', '40', '50']}
            value={minute}
            variant='outlined'
            size='small'
            inputProps={{ 'aria-label': 'recruitment-minute' }}
            onChange={e => setMinute(e.target.value)}
        />
    </>)
}

const TableHead = ({ requestSort, getSortDirection }) => {
    const { pageString } = useLanguage()

    return (
        <MuiTableHead>
            <MuiTableRow>
                {pageString.enlist.filter.tableHeadByCharacter
                    .map((item, ind) => (
                        <SortableTh
                            key={ind}
                            onClick={() => requestSort(item.attr)}
                            direction={getSortDirection(item.attr)}
                        >
                            {item.title}
                        </SortableTh>
                    ))}
            </MuiTableRow>
        </MuiTableHead>
    )
}

const DistinctCharacterTooltip = withStyles({
    tooltip: {
        right: '0',
        fontSize: '1rem',
        whiteSpace: 'pre'
    }
})(Tooltip)

const TagTooltip = ({ children, char }) => {
    const { charString, pageString } = useLanguage()

    const distinctTexts = char.distinctTagCombs
        .map(comb => comb.map(i => charString.tags[i]).join(', '))
        .join('\n')

    const guaranteeSRTexts = char.guaranteeSRTagCombs
        .map(comb => comb.map(i => charString.tags[i]).join(', '))
        .join('\n')

    const texts = guaranteeSRTexts.length === 0 ? distinctTexts
        : distinctTexts.length === 0 ? pageString.enlist.filter.guaranteeSR + ':\n' + guaranteeSRTexts
            : distinctTexts + '\n' + pageString.enlist.filter.guaranteeSR + ':\n' + guaranteeSRTexts

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
const MarksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const MarkIconWrapper = styled(IconWrapper)`
    display: flex;
    align-items: center;
    svg {
        width: 1rem;
        height: 1rem;
        margin: .1rem 0 .1rem -.6rem;
    }
`
const parseRarity = (rarity) => (
    rarity === 0 ? 'N'
        : rarity === 1 ? 'R'
            : rarity === 2 ? 'SR'
                : 'SSR'
)

const cardTextWrapConfig = {
    'zh-TW': 1360,
    'en': 1360,
    'ja': 1460,
    'ko': 1360,
}

function TableBody({ sortedData }) {
    const { userLanguage, charString } = useLanguage()

    return (
        <MuiTableBody>
            {sortedData.map(char => (
                <MuiTableRow key={char.id}>
                    <MuiTableCell>
                        <TagTooltip char={char}>
                            <CharCardWrapper>
                                <ResponsiveCharCard
                                    id={char.id}
                                    $textWrapConfig={
                                        cardTextWrapConfig[userLanguage]
                                    }
                                />
                                <MarksContainer>
                                    {char.distinctTagCombs.length !== 0
                                        ? <MarkIconWrapper>{StarIcon}</MarkIconWrapper>
                                        : null
                                    }
                                    {char.guaranteeSRTagCombs.length !== 0
                                        ? <MarkIconWrapper>{TagIcon}</MarkIconWrapper>
                                        : null
                                    }
                                </MarksContainer>
                            </CharCardWrapper>
                        </TagTooltip>
                    </MuiTableCell>
                    <MuiTableCell>{parseRarity(char.rarity)}</MuiTableCell>
                    <MuiTableCell>
                        {char.appliedTags
                            .map(i => charString.tags[i]).join(', ')}
                    </MuiTableCell>
                </MuiTableRow>
            ))}
        </MuiTableBody>
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
    filterLayout,
    resultLayout,
    handleLayoutChange
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
            <RadioGroup
                label={pageString.enlist.filter.settingModal.groupLabel}
                value={pageString.enlist.filter.settingModal.labels[filterLayout]}
                handleChange={handleLayoutChange('filter')}
            >
                {pageString.enlist.filter.settingModal
                    .labels.map(label => (
                        <Radio label={label} value={label} key={label} />
                    ))}
            </RadioGroup>
            <RadioGroup
                label={pageString.enlist.filter.settingModal.resultDisplay}
                value={pageString.enlist.filter.settingModal.resultLabels[resultLayout]}
                handleChange={handleLayoutChange('result')}
            >
                {pageString.enlist.filter.settingModal
                    .resultLabels.map(label => (
                        <Radio label={label} value={label} key={label} />
                    ))}
            </RadioGroup>
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

// check if every input tags are in target tags
const checkTags = (inputTags, targetTags) =>
    targetTags.every((v) => inputTags.includes(v));

// calculate priority score
const calculateScore = (characters) => {
    // 3 - SSR, 2 - SR, 1 - R, 0 - N
    const existedRarity = Array(4).fill(false);

    characters.forEach((c) => {
        existedRarity[c.rarity] = true;
    });

    return existedRarity.reduce(
        (s, exist, ind) => s += exist ? (ind - 1.4) * (ind + 1) : 0,
        0
    )
};

const calcMinCombs = (inputTags, currCombs) => {
    let combs = Array.from(currCombs)
    for (let j = combs.length - 1; j >= 0; j--) {
        if (inputTags.every(t => combs[j].includes(t))) {
            combs.splice(j, 1)
        }
    }
    combs.push(inputTags)
    return combs
}

const Filter = () => {
    const [state, setState] = useState({
        filterBtnValue: [],
        enlistHour: '9',
        isHelpModalOpen: false,
        isSettingModalOpen: false,
        isSnackbarOpen: false,
    })

    const { layout: btnLayout, setLayout: setBtnLayout } = useSwitch(
        'group-btns-by-class',
        [0, 1],
        (typeof window === 'undefined' || window.innerWidth <= 1000) ? 1 : 0
    )

    const { layout: resultLayout, setLayout: setReslutLayout } = useSwitch(
        'show-filter-result-by',
        [0, 1],
        0
    )

    const { pageString, charString } = useLanguage()

    // get data from json only once (empty dependency), they are character available for recruiting
    const availableCharacters = useMemo(() => charData
        .filter((char) => char.tags.available)
        .map((char) => {
            const { id, rarity, tags } = char;
            const { else: elseTags, ...otherTags } = tags;
            return {
                id,
                rarity,
                tags: [...Object.values(otherTags), ...elseTags],
            };
        }), [])

    const getCharsByTags = useCallback((tags) => {
        // shallow copy is enough as we didn't change anything in object
        let survivors = Array.from(availableCharacters);

        // rarity filtering
        // 20 -> Leader Tag
        if (!tags.includes(20)) {
            // 19 -> Elite Tag
            const rarityCheck = state.enlistHour < 4 && !tags.includes(19) ? 2 : 3;
            survivors = survivors.filter((char) => char.rarity < rarityCheck);
        }

        // tags filtering
        return survivors.filter((d) => checkTags(d.tags, tags));
    }, [state.enlistHour])

    const sortFunc = useCallback((sortableItems, sortConfig) => {
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
    }, [charString])

    const filteredData = useMemo(() => {
        if (state.filterBtnValue.length === 0)
            return []

        const sortedTags = [...state.filterBtnValue].sort()

        if (dataLayer && sortedTags.length === 5) {
            dataLayer.push({
                'event': 'five_tags_selected',
                'character_tag_combination': sortedTags,
            })
        }

        // 0 -> Filter and display by character, 1 -> Filter and group by tags
        if (resultLayout === 1) {
            // type = Array<string, { tags: Array<number>, characters: { id: string, rarity: number, tags: Array<number> }, score: number }>
            const result = [];

            // max length of combination is 3
            const combinationLength = Math.min(sortedTags.length, 3);

            for (let i = combinationLength; i > 0; i--) {
                const tagCombination = Array.from(combinations(sortedTags, i));

                tagCombination.forEach((tags) => {
                    const survivors = getCharsByTags(tags);

                    // put data into result
                    if (survivors.length > 0) {
                        result.push({
                            tags,
                            characters: survivors,
                            score: calculateScore(survivors),
                        });
                    }
                });
            }

            // return the sorted data by score
            return result.sort((a, b) => b.score - a.score);
        } else {
            const result = []
            for (let i = sortedTags.length; i > 0; i--) {
                // generate combinations
                const tagCombs = Array.from(combinations(sortedTags, i))
                // screen out ineligible characters
                tagCombs.forEach(tags => {
                    const survivors = getCharsByTags(tags);

                    if (survivors.length === 1 && tags.length <= 3) {
                        const existChar = result.find(c => c.id === survivors[0].id)
                        if (existChar) {
                            existChar.distinctTagCombs = calcMinCombs(
                                tags,
                                existChar.distinctTagCombs
                            )
                        } else {
                            result.push({
                                id: survivors[0].id,
                                rarity: survivors[0].rarity,
                                appliedTags: tags,
                                distinctTagCombs: [tags],
                                guaranteeSRTagCombs: []
                            })
                        }
                    } else {
                        const isGuaranteeSR = tags.length <= 3 &&
                            survivors.every(char => char.rarity === 2)

                        survivors.forEach(char => {
                            const existChar = result.find(c => c.id === char.id)
                            if (!existChar) {
                                result.push({
                                    id: char.id,
                                    rarity: char.rarity,
                                    appliedTags: tags,
                                    distinctTagCombs: [],
                                    guaranteeSRTagCombs: isGuaranteeSR ? [tags] : []
                                })
                            } else if (isGuaranteeSR) {
                                existChar.guaranteeSRTagCombs = calcMinCombs(
                                    tags,
                                    existChar.guaranteeSRTagCombs
                                )
                            }
                        })
                    }
                })
            }
            return result
        }
    }, [state.filterBtnValue, state.enlistHour, resultLayout])

    const handleEnlistHourChange = (event) => {
        setState((state) => ({
            ...state,
            enlistHour: event.target.value
        }))
    }

    const handleBtnGroupChange = (groupIdx) => (event, val) => {
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

    const handleLayoutChange = (key) => (event) => {
        setState((state) => ({
            ...state,
            isSettingModalOpen: false,
        }))

        if (key === 'filter') {
            setBtnLayout(
                pageString.enlist.filter.settingModal.labels
                    .indexOf(event.target.value)
            )
        } else if (key === 'result') {
            setReslutLayout(
                pageString.enlist.filter.settingModal.resultLabels
                    .indexOf(event.target.value)
            )
        }
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
                enlistHour={state.enlistHour}
                handleEnlistHourChange={handleEnlistHourChange}
                filterBtnValue={state.filterBtnValue}
                handleModalOpen={handleSettingModal(true)}
                groupBtnByClass={btnLayout === 0}
            />
            {resultLayout === 1 ? <ResultTablePanel
                filteredData={filteredData}
                handleModalOpen={handelHelpModal(true)}
                maxHeight={btnLayout === 0 ? 'calc(100vh - 5rem)' : 'calc(100vh - 16rem)'}
                striped
            /> : <ResultTablePanelByCharacter
                data={filteredData}
                head={<TableHead />}
                body={<TableBody />}
                sortFunc={sortFunc}
                defaultSortKey='rarity'
                handleModalOpen={handelHelpModal(true)}
                maxHeight={btnLayout === 0 ? 'calc(100vh - 5rem)' : 'calc(100vh - 16rem)'}
                striped
            />}

        </Panels>
        <SettingModal
            open={state.isSettingModalOpen}
            onClose={handleSettingModal(false)}
            filterLayout={btnLayout}
            resultLayout={resultLayout}
            handleLayoutChange={handleLayoutChange}
        />
        <TextModal
            title={pageString.enlist.filter.helpModal.title}
            open={state.isHelpModalOpen}
            onClose={handelHelpModal(false)}
            content={pageString.enlist.filter.helpModal.content}
            ariaLabelledby='help-modal-title'
            ariaDescribedby='help-modal-description'
        />
        <Snackbar
            open={state.isSnackbarOpen}
            onClose={handleSnackbarClose}
            message={pageString.enlist.filter.snackbarMsg}
            type='warn'
        />
    </>)
}

export default Filter