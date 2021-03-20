import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Divider, MenuItem, TextField } from '@material-ui/core';
import Head from 'components/Head';
import { useLineupData } from 'components/LineupDataProvider';
import { useTeamData } from 'components/TeamDataProvider';
import useExport from 'components/useExport';
import MyIconButton, { ExportButton } from 'components/MyIconButton';
import LocalizedLink from 'components/LocalizedLink';
import MyHeader from 'components/MyHeader';
import ImageSupplier from 'components/ImageSupplier';
import { ScrollableModal } from 'components/MyModal';
import CharCard from 'components/CharCard';
import { useLanguage } from 'components/LanguageProvider';
import { HpIcon, AttackIcon, ChangeIcon, DeleteIcon, BackIcon } from 'components/icon';
import charMap from 'gamedata/charMap';
import calcCharStats from 'gamedata/calcCharStats';
import charData from 'gamedata/character.json';

const StyledButton = styled(MyIconButton)`
    && {
        width: 1.2rem;
        height: 1.2rem;
        padding: 0;
        margin: 0 .4rem;
    }
`
const SlotOperationButtons = ({ children, onClick, tooltipText }) => (
    <StyledButton onClick={onClick} tooltipText={tooltipText}>
        {children}
    </StyledButton>
)

const BtnsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 1rem;
    height: calc(100% - 1.6rem);
    @media screen and (max-width: 768px) {
        flex-direction: row;
        z-index: 2;
        top: auto;
        bottom: -1.4rem;
        right: .4rem;
        height: auto;
    }
`
const SlotOptionTip = ({ handleChange, handleDelete }) => {
    const { pageString } = useLanguage()

    return (
        <BtnsWrapper>
            <SlotOperationButtons
                onClick={handleChange}
                tooltipText={pageString.team.build.changeTooltip}
            >
                {ChangeIcon}
            </SlotOperationButtons>
            <SlotOperationButtons
                onClick={handleDelete}
                tooltipText={pageString.team.build.deleteTooltip}
            >
                {DeleteIcon}
            </SlotOperationButtons>
        </BtnsWrapper>
    )
}

const StyledTextField = styled(TextField)`
    .MuiInputBase-root, && label {
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
    }
    .MuiInputBase-root {
        border: 1px solid ${props => props.theme.colors.dropdownHover};
    }
    && fieldset {
        border-color: rgba(0,0,0,0);
    }
    &&:hover {
        .MuiInputBase-root {
            border: 1px solid ${props => props.theme.colors.shadow};
        }
        fieldset {
            border-color: rgba(0,0,0,0);
        }
    }
    && .Mui-focused +.MuiInputBase-root {
        border-color: rgba(0,0,0,0);
        fieldset {
            border: 2px solid ${props => props.theme.colors.secondary};
        }
    }
`
const ImgInput = styled(StyledTextField)`
    position: absolute;
    left: 1.8rem;
    && > div {
        width: 100%;
        > div {
            padding: .2rem;
            padding-left: .4rem;
            padding-right: 1rem;
            color: ${props => props.disabled ? props.theme.colors.dropdownHover
        : 'inherit'};
        }
        svg {
            right: 0;
            fill: ${props => props.disabled ? props.theme.colors.dropdownHover
        : props.theme.colors.onSurface};
        }
    }
`
const ImgSelect = ({ type, value, values, onChange, disabled }) => (
    <ImgInput
        id={`select-${type}`}
        select
        value={value}
        onChange={onChange}
        variant='outlined'
        size='small'
        inputProps={{ 'aria-label': type }}
        disabled={disabled}
    >
        {values.map((v, idx) => (
            <MenuItem key={idx} value={v}>
                {v}
            </MenuItem>
        ))}
    </ImgInput>
)

const EmptySlot = styled(Button)`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    && .MuiButton-label {
        position: absolute;
        top: 50%;
        left: calc(5rem + 4%);
        width: auto;
        height: 0;
        font-size: x-large;
        color: ${props => props.theme.colors.shadow};
        @media screen and (max-width: 768px) {
            left: calc(3.2rem + 3%);
            font-size: large;
        }
    }
    &:before {
        position: absolute;
        z-index: 1;
        top: 50%;
        left: calc(.2rem + 2%);
        content: "+";
        color: ${props => props.theme.colors.shadow};
        font-size: 4rem;
        line-height: 0;
        text-align: center;
        text-shadow: none;
    }
    &:after {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        content: "";
        width: 8rem;
        height: 100%;
        background: linear-gradient(90deg,rgba(255,255,255,.25) 25%,transparent)
    }
`

const charByRarityData = charData.reduce((newData, c, i) => {
    newData[3 - c.rarity].push({ id: c.id })
    return newData
}, [...Array(4)].map(i => []))

const rarity = ['ssr', 'sr', 'r', 'n']

const StyledModal = styled(ScrollableModal)`
    > div:nth-child(3) {
        top: 5%;
        width: 90%;
    }
`
const RarityHeader = styled(MyHeader)`
    margin-bottom: .4rem;
    span {
        display: flex;
        align-items: center;
    }
`
const RarityImgWrapper = styled(ImageSupplier)`
    width: 3rem;
`
const RarityChars = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -.4rem 0 -1rem;
`
const CharButton = styled(Button)`
    && {
        padding: 0;
        .MuiButton-label {
            color: ${props => props.theme.colors.onSurface};
        }
    }
`
const ModalCharCard = styled(CharCard)`
    min-width: 0;
    width: 8.8rem;
    margin: .2rem;
`
const CharSelectModal = ({ open, onClose, handleSelect }) => {
    const { pageString } = useLanguage()

    return (
        <StyledModal
            title={pageString.team.build.selectModalTitle}
            open={open}
            onClose={onClose}
            ariaLabelledby='character-select-modal'
        >
            {charByRarityData.map((group, idx) => (
                <React.Fragment key={idx}>
                    <RarityHeader
                        titleIcon={
                            <RarityImgWrapper
                                name={`ui_rarity_${rarity[idx]}`}
                                alt={rarity[idx]}
                            />
                        }
                    />
                    <RarityChars>
                        {group.map(c => (
                            <CharButton onClick={handleSelect(c.id)} key={c.id}>
                                <ModalCharCard id={c.id} />
                            </CharButton>
                        ))}
                    </RarityChars>
                </React.Fragment>
            ))}
        </StyledModal>
    )
}

const charSelectValues = (char, potential, key) => {
    if (!char) {
        return []
    }

    switch (key) {
        case 'star':
            return [...Array(6).keys()].slice(4 - char[0])
        case 'bond':
            return [...Array(6).keys()].slice(1)
        case 'discipline':
            return char[0] === '4' ? ['-'] : [...Array(4).keys()]
        case 'potential':
            return [...Array(parseInt(char[0]) > 3 ? 7 : 13).keys()].slice(1)
        case 'potentialSub':
            return [...Array(7).keys()].slice(potential === 1 ? 0 : 1)
        default:
            return []
    }
}

const StyledSlot = styled.div`
    position: relative;
    z-index: 1;
    left: .6rem;
    right: 0;
    width: calc(100% - .5rem);
    height: 5rem;
    margin: 1rem 0 .6rem;
    span {
        white-space: pre;
        text-shadow: 0 0 2px ${props => props.theme.colors.surface},
        -2px 0 2px  ${props => props.theme.colors.surface},
        2px 0 2px  ${props => props.theme.colors.surface},
        0 -2px 2px ${props => props.theme.colors.surface},
        0 2px 2px  ${props => props.theme.colors.surface},
        2px 2px 2px ${props => props.theme.colors.surface},
        2px -2px 2px ${props => props.theme.colors.surface},
        -2px 2px 2px ${props => props.theme.colors.surface},
        -2px -2px 2px ${props => props.theme.colors.surface};
    }
    &:before {
        content: "";
        position: absolute;
        left: -.6rem;
        height: 100%;
        width: 0;
        border: .25rem solid transparent;
        border-right: .4rem solid ${props => props.$colorNumber !== undefined
        ? props.theme.chart.colors[props.$colorNumber] : props.theme.colors.dropdownHover};
        border-left: 0;
    }
    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 1px solid ${props => props.theme.colors.shadow + '80'};
        border-left: none;
        border-right: none;
        background: linear-gradient(
            180deg,
            ${props => props.$isDragging ? props.theme.colors.surface
        : props.theme.colors.shadow + '0D'},
            ${props => props.$isDragging ? props.theme.colors.shadow
        : props.theme.colors.shadow + '66'}
        );
        background-size: 100% 200%;
        clip-path: ${props => props.$isEmpty ? 'none'
        : `polygon(
            0 0,
            100% 0,
            100% calc(100% - 1.6rem),
            calc(14rem + 5%) calc(100% - 1.6rem),
            calc(12.6rem + 5%) 100%,0 100%
        )
        `};
    }
    &:hover:after {
        background-size: 100% 100%;
    }
    @media screen and (max-width: 768px) {
        margin: 0 0 2.2rem;
        &:after {
            clip-path: none;
        }
        &:hover > div:last-child:after {
            background: ${props => props.theme.colors.shadow + '4D'};
        }
    }

`
const SlotCharAvatar = styled(ImageSupplier)`
    position: relative;
    z-index: 1;
    left: 0;
    width: calc(4.4rem + 4%);
    height: 5rem;
    background-repeat: no-repeat;
    background-size: 8rem 8rem;
    background-position: calc(50% - 1rem) -2rem;
    background-color: rgba(0,0,0,0);
`
const CharName = styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    top: .4rem;
    left: calc(5rem + 4%);
    font-size: x-large;
    transition: all 0.3s ease;
    > span:first-child {
        font-size: medium;
    }
    @media screen and (max-width: 768px) {
        align-items: flex-end;
        left: auto;
        right: calc(96% - 6.5rem);
        font-size: large;
        > span:first-child {
            font-size: small;
        }
    }
`
const CharPositionText = styled.span`
    position: absolute;
    z-index: 1;
    bottom: .1rem;
    left: calc(9.2rem + 4%);
    font-size: small;
    @media screen and (max-width: 768px) {
        left: auto;
        right: calc(96% - 6.5rem);
    }
`
const CharStatsSelect = styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    top: .6rem;
    left: calc(14rem + 5%);
    width: calc(95% - 16.6rem);
    > div {
        display: flex;
        margin-right: calc(2% - .2rem);
    }
    @media screen and (max-width: 768px) {
        left: calc(7rem + 5%);
        width: calc(95% - 7rem);
    }
`
const LevelInput = styled(StyledTextField)`
    width: 100%;
    height: 1.6rem;
    > div {
        width: 2rem;
        margin-left: .2rem;
        > input {
            padding: .2rem;
            text-align: center;
        }
    }
`
const UiImg = styled(ImageSupplier)`
    position: relative;
    width: 4.2rem;
    height: 1.6rem;
    background-repeat: no-repeat;
    background-size: 1.6rem 1.6rem;
    background-position: 0 0;
`
const PotentialInput = styled.div`
    > div:first-child .MuiSelect-root {
        padding-right: 1.2rem;
    }
    > div:last-child {
        left: 0;
    }
`
const CharStats = styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    bottom: 0;
    left: calc(14rem + 5%);
    width: calc(95% - 14rem);
    height: 1.6rem;
    svg {
        width: 1.2rem;
        height: 1.2rem;
        fill: ${props => props.theme.colors.onSurface};
    }
    span {
        position: relative;
        z-index: 1;
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        margin: .2rem;
    }
    div {
        margin-right: .6rem;
    }
    div:last-child {
        margin-right: 0;
    }
    @media screen and (max-width: 768px) {
        bottom: -1.6rem;
        left: calc(5rem + 5%);
        width: calc(95% - 6rem);
        padding-left: 1rem;
        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: skew(30deg);
            transform-origin: 0 0;
            mask: linear-gradient(270deg,transparent 1rem,#000 75%);
            border: 1px solid ${props => props.theme.colors.shadow};
            border-top: none;
            border-right: none;
            background: linear-gradient(270deg,transparent 1rem,
                ${props => props.theme.colors.shadow + '33'} 75%);
        }
    }
`
const SlotCharCard = React.forwardRef(({
    char,
    provided,
    isDragging,
    index,
    handleSelectModal,
    handleCharDelete
}, ref) => {
    const { charString, pageString } = useLanguage()

    const { currentTeam, actions } = useTeamData()
    const { setCurrentTeam } = actions

    const selectItems = {
        star: {
            imgNames: !char.id ? undefined
                : 'ui_star_' + (char.id[0] === '1' ? 'ssr'
                    : char.id[0] === '2' ? 'sr'
                        : char.id[0] === '3' ? 'r' : 'n'),
            disabled: false,
        },
        bond: {
            imgNames: 'ui_bond_' + char.bond,
            disabled: false,
        },
        discipline: {
            imgNames: 'ui_discipline',
            disabled: !char.id || char.id[0] === '4',
        },
        potential: {
            imgNames: 'ui_potentialPassive',
            disabled: false,
        },
        potentialSub: {
            imgNames: undefined,
            disabled: false,
        }
    }

    const statsValue = calcCharStats(
        char.id,
        char.level === '' ? '-' : char.level,
        char.potential,
        char.potentialSub,
        char.discipline === '-' ? 0 : char.discipline,
        char.star,
        charMap[char.id]?.stats.initATK,
        charMap[char.id]?.stats.initHP
    )

    const handleSelectChange = (key) => (event) => {
        const newTeam = JSON.parse(JSON.stringify(currentTeam))
        const newChar = newTeam.characters[index]

        let value = key === 'char' ? event.target.value : parseInt(event.target.value)
        if (key === 'level') {
            value = isNaN(value) ? ''
                : value < 1 ? 1
                    : value > 60 ? 60 : value
        }
        newChar[key] = value

        Object.entries(selectItems).forEach(entry => {
            const values = charSelectValues(char, newChar.potential, entry[0])
            if (!values.includes(newChar[entry[0]])) {
                newChar[entry[0]] = values[0]
            }
        })

        setCurrentTeam(newTeam)
    }

    return (
        <StyledSlot
            $colorNumber={charMap[char.id]?.tags.attribute}
            $isDragging={isDragging}
            $isEmpty={char.id === undefined}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={ref}
        >
            {char.id ? <>
                <SlotCharAvatar
                    name={`char_small_${char.id}`}
                    isBackground
                    alt=''
                />
                <CharName>
                    <span>{charString.name[char.id].split(' ').slice(0, -1).join(' ')}</span>
                    <span>{charString.name[char.id].split(' ').slice(-1)[0]}</span>
                </CharName>
                <CharPositionText>{charString.tags[charMap[char.id].tags.position]}</CharPositionText>
                <CharStatsSelect>
                    <div>
                        <label htmlFor={`level-input-${index}`}>Lv</label>
                        <LevelInput
                            id={`level-input-${index}`}
                            value={char.level}
                            onChange={handleSelectChange('level')}
                            variant='outlined'
                            size='small'
                            inputProps={{ 'aria-label': 'level' }}
                        />
                    </div>
                    {Object.entries(selectItems).map((entry, idx) => (
                        entry[0] === 'potential'
                            ? <PotentialInput key={idx}>
                                <UiImg
                                    name={entry[1].imgNames}
                                    isBackground
                                    alt={entry[0]}
                                >
                                    <ImgSelect
                                        type={entry[0]}
                                        value={char[entry[0]]}
                                        values={charSelectValues(char.id, char.potential, entry[0])}
                                        onChange={handleSelectChange(entry[0])}
                                        disabled={entry[1].disabled}
                                    />
                                </UiImg>
                                <span>{' - '}</span>
                                <ImgSelect
                                    type='potentialSub'
                                    value={char.potentialSub}
                                    values={charSelectValues(char.id, char.potential, 'potentialSub')}
                                    onChange={handleSelectChange('potentialSub')}
                                    disabled={selectItems.potentialSub.disabled}
                                />
                            </PotentialInput>
                            : entry[0] !== 'potentialSub' &&
                            <UiImg
                                name={entry[1].imgNames}
                                isBackground
                                alt={entry[0]}
                                key={idx}
                            >
                                <ImgSelect
                                    type={entry[0]}
                                    value={char[entry[0]]}
                                    values={charSelectValues(char.id, char.potential, entry[0])}
                                    onChange={handleSelectChange(entry[0])}
                                    disabled={entry[1].disabled}
                                />
                            </UiImg>
                    ))}
                </CharStatsSelect>
                <SlotOptionTip
                    handleChange={handleSelectModal(true)}
                    handleDelete={handleCharDelete}
                />
                <CharStats>
                    <div>
                        {AttackIcon}
                        <span>{isNaN(statsValue.ATK) ? '-' : statsValue.ATK}</span>
                    </div>
                    <div>
                        {HpIcon}
                        <span>{isNaN(statsValue.HP) ? '-' : statsValue.HP}</span>
                    </div>
                </CharStats>
            </> : <EmptySlot onClick={handleSelectModal(true)}>
                {pageString.team.build.emptySlotText}
            </EmptySlot>
            }
        </StyledSlot>
    )
})

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result
}

const DraggableCharsList = () => {
    const { currentTeam, importLineupData, actions } = useTeamData()
    const { setCurrentTeam } = actions

    const { getLatestLineup } = useLineupData().actions

    const [state, setState] = useState({
        isSelectModalOpen: false,
        selectedIndex: undefined,
    })

    const getCharInitState = (char) => {
        const lineup = getLatestLineup()

        if (importLineupData) {
            const localChar = lineup.find(c => c.id === char)

            if (localChar !== undefined && localChar.owned) {
                const { attribute, position, ATK, HP, owned, ...rest } = localChar
                return ({ ...rest, bond: 1 })
            }
        }

        return ({
            id: char,
            level: '',
            star: char === undefined ? '' : 4 - parseInt(char[0]),
            bond: 1,
            discipline: char === undefined ? '' : (char[0] === '4' ? '-' : 0),
            potential: 1,
            potentialSub: 0,
        })
    }

    const onDragEnd = (result) => {
        const { destination, source } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        setCurrentTeam({
            ...currentTeam,
            characters: reorder(currentTeam.characters, source.index, destination.index)
        })
    }

    const handleSelectModal = (selectedIndex) => (boolean) => () => setState(state => ({
        ...state,
        isSelectModalOpen: boolean,
        selectedIndex: selectedIndex
    }))

    const handleSelectModalClose = () => setState(state => ({
        ...state,
        isSelectModalOpen: false,
        selectedIndex: undefined
    }))

    const handleCharSelect = (charId, selectedIndex) => () => {
        const newCharacters = Array.from(currentTeam.characters)
        const index = selectedIndex !== undefined ? selectedIndex : state.selectedIndex
        newCharacters[index] = {
            ...newCharacters[index],
            ...getCharInitState(charId)
        }

        setCurrentTeam({
            ...currentTeam,
            characters: newCharacters
        })

        setState(state => ({
            ...state,
            isSelectModalOpen: false,
            selectedIndex: undefined
        }))
    }

    return (<>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='character-list'>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {currentTeam.characters.map((c, index) => (
                            <Draggable
                                draggableId={`character-${c.index}`}
                                index={index}
                                key={`character-${c.index}`}
                            >
                                {(provided, snapshot) => (
                                    <SlotCharCard
                                        char={c}
                                        index={index}
                                        ref={provided.innerRef}
                                        provided={provided}
                                        isDragging={snapshot.isDragging}
                                        handleSelectModal={handleSelectModal(index)}
                                        handleCharDelete={handleCharSelect(undefined, index)}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <CharSelectModal
            open={state.isSelectModalOpen}
            onClose={handleSelectModalClose}
            handleSelect={handleCharSelect}
        />
    </>)
}

const TeamHeader = styled(MyHeader)`
    position: relative;
    left: -1rem;
    width: calc(100% + 2rem);
    height: auto;
    margin: 0;
    padding: 0 0 .5rem 1rem;
    border: none;
    label {
        margin-right: .6rem;
        font-size: large;
        text-transform: none;
    }
`
const HeaderButton = styled(MyIconButton)`
`
const Header = ({ isExporting, handleExport }) => {
    const { pageString } = useLanguage()

    const { currentTeam, actions } = useTeamData()
    const { setCurrentTeam } = actions

    const handleNameChange = (event) => {
        const newTeam = JSON.parse(JSON.stringify(currentTeam))
        newTeam.name = event.target.value
        setCurrentTeam(newTeam)
    }

    return (
        <TeamHeader
            title={
                <div>
                    <StyledTextField
                        id='team-name-input'
                        value={currentTeam.name}
                        onChange={handleNameChange}
                        label={<span data-html2canvas-ignore='true'>
                            {pageString.team.build.nameInputLabel}
                        </span>}
                        placeholder={pageString.team.build.nameInputPlaceholder}
                        variant='outlined'
                        size='small'
                        inputProps={{ 'aria-label': 'team-name' }}
                    />
                </div>
            }
            end={<>
                <LocalizedLink to='/team/' >
                    <HeaderButton
                        tooltipText={pageString.team.build.backTooltip}
                        dataHtml2canvasIgnore
                    >
                        {BackIcon}
                    </HeaderButton>
                </LocalizedLink>
                <ExportButton
                    onClick={handleExport}
                    isLoading={isExporting}
                />
            </>}
        />
    )
}

const ExportWrapper = styled.div`
    max-width: 1000px;
    margin: -1.5rem auto;
    padding: 1rem;
    padding-top: 1.5rem;
`
const StyledDivider = styled(Divider)`
    && {
        background-color: ${props => props.theme.colors.dropdownHover};
    }
`
const TeamBuild = () => {
    const { pageString } = useLanguage()

    const { currentTeam } = useTeamData()

    const componentRef = useRef()

    const { isExporting, exportImage } = useExport()

    const handleExport = () => exportImage({
        componentRef: componentRef,
        fileName: currentTeam.name ? currentTeam.name : 'team-composition',
    })

    return (<>
        <Head
            title={pageString.team.build.helmet.title}
            description={pageString.team.build.helmet.description}
            path='/team/build/'
        />
        <ExportWrapper ref={componentRef}>
            <Header isExporting={isExporting} handleExport={handleExport} />
            <StyledDivider />
            <DraggableCharsList />
        </ExportWrapper>
    </>)
}

export default TeamBuild