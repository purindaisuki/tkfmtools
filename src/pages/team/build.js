import React, { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Button, Divider, MenuItem, TextField } from '@material-ui/core';

import useTeamSlots from 'hooks/useTeamSlots';
import useCharacterSelect from 'hooks/useCharacterSelect';
import useExport from 'hooks/useExport';

import { useTeamData } from 'containers/TeamDataProvider';
import { useLanguage } from 'containers/LanguageProvider';
import Swappable from 'containers/Swappable';

import Head from 'components/Head';
import IconButton, { ExportButton } from 'components/IconButton';
import LocalizedLink from 'components/LocalizedLink';
import Header from 'components/Header';
import ImageSupplier from 'components/ImageSupplier';
import { ScrollableModal } from 'components/Modal';
import CharCard from 'components/CharCard';
import { HpIcon, AttackIcon, ChangeIcon, DeleteIcon, BackIcon } from 'components/icon';

import calcCharStats from 'utils/calcCharStats';
import charMap from 'data/charMap';
import charData from 'data/character.json';

const StyledButton = styled(IconButton)`
    && {
        width: 1.2rem;
        height: 1.2rem;
        padding: 0;
        margin: 0 .4rem;
    }
`
const SlotOperationButton = ({ children, onClick, tooltipText }) => (
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
const SlotOperationButtons = ({ handleChange, handleDelete }) => {
    const { pageString } = useLanguage()

    return (
        <BtnsWrapper>
            <SlotOperationButton
                onClick={handleChange}
                tooltipText={pageString.team.build.changeTooltip}
            >
                {ChangeIcon}
            </SlotOperationButton>
            <SlotOperationButton
                onClick={handleDelete}
                tooltipText={pageString.team.build.deleteTooltip}
            >
                {DeleteIcon}
            </SlotOperationButton>
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
    && .Mui-focused {
        fieldset {
            border: 2px solid ${props => props.theme.colors.secondary};
        }
        &.MuiInputBase-root, +.MuiInputBase-root {
            border-color: rgba(0,0,0,0);
        }
    }
`
const ImgInput = styled(StyledTextField)`
    position: absolute;
    left: 1.8rem;
    background-color: ${props => props.theme.colors.surface};
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
const ImgSelect = ({
    type,
    values, value,
    onChange,
    disabled
}) => {
    const { colors } = useTheme()

    return (
        <ImgInput
            id={`select-${type}`}
            select
            value={value}
            onChange={onChange}
            variant='outlined'
            size='small'
            inputProps={{ 'aria-label': type }}
            SelectProps={{
                MenuProps: {
                    MenuListProps: {
                        style: {
                            backgroundColor: colors.surface,
                            color: colors.onSurface
                        }
                    }
                }
            }}
            disabled={disabled}
        >
            {values.map((v, idx) => (
                <MenuItem key={idx} value={v}>
                    {v}
                </MenuItem>
            ))}
        </ImgInput>
    )
}

const EmptySlotContent = styled(Button)`
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
const RarityHeader = styled(Header)`
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
            keepMounted
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
                        border
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
    width: calc(95% - 16rem);
    > div {
        display: flex;
        margin-right: calc(2% - .2rem);
    }
    @media screen and (max-width: 768px) {
        left: calc(7rem + 5%);
        width: calc(95% - 7rem);
    }
`
const StyledLabel = styled.label`
    margin-top: .05rem;
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
    position: relative;
    && {
        margin-right: 0;
    }
    > span {
        margin-left: .3rem;
        margin-right: .1rem;
    }
    > div:first-child .MuiSelect-root {
        padding-right: 1.2rem;
    }
    > div:last-child {
        position: relative;
        left: auto;
        height: 1.6rem
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
const CharSlotContent = ({
    char,
    index,
    handleSelectModalOpen,
    handleCharDelete
}) => {
    const { charString } = useLanguage()

    const { currentTeam, actions } = useTeamData()
    const { setCurrentTeam } = actions

    const {
        selectItems, charStatsValue,
        setSelect, setCharState
    } = useCharacterSelect(char, (newCharState) => {
        const newTeam = JSON.parse(JSON.stringify(currentTeam))
        newTeam.characters[index] = newCharState

        setCurrentTeam(newTeam)
    })

    useEffect(() => {
        setCharState(char)
    }, [char])

    const handleSelectChange = (key) => (event) => setSelect(key, parseInt(event.target.value))

    return (<>
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
                <StyledLabel htmlFor={`level-input-${index}`}>Lv</StyledLabel>
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
                                values={entry[1].values}
                                disabled={entry[1].disabled}
                                onChange={handleSelectChange(entry[0])}
                            />
                        </UiImg>
                        <span>{' - '}</span>
                        <ImgSelect
                            type='potentialSub'
                            value={char.potentialSub}
                            values={selectItems.potentialSub.values}
                            disabled={selectItems.potentialSub.disabled}
                            onChange={handleSelectChange('potentialSub')}
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
                            values={entry[1].values}
                            disabled={entry[1].disabled}
                            onChange={handleSelectChange(entry[0])}
                        />
                    </UiImg>
            ))}
        </CharStatsSelect>
        <SlotOperationButtons
            handleChange={handleSelectModalOpen}
            handleDelete={handleCharDelete}
        />
        <CharStats>
            <div>
                {AttackIcon}
                <span>{isNaN(charStatsValue.ATK) ? '-' : charStatsValue.ATK}</span>
            </div>
            <div>
                {HpIcon}
                <span>{isNaN(charStatsValue.HP) ? '-' : charStatsValue.HP}</span>
            </div>
        </CharStats>
    </>)
}

const StyledSlot = styled.div`
    position: relative;
    z-index: 1;
    left: .6rem;
    right: 0;
    width: calc(100% - .5rem);
    height: 5rem;
    margin: 0 0 .6rem;
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
        margin: 0 0 ${props => props.$isEmpty ? '.6' : '2.2'}rem;
        &:after {
            clip-path: none;
        }
        &:hover > div:last-child:after {
            background: ${props => props.theme.colors.shadow + '4D'};
        }
    }

`
const CharSlot = React.forwardRef(({
    char,
    provided,
    isDragging,
    index,
    handleSelectModalOpen,
    handleCharDelete
}, ref) => {
    const { pageString } = useLanguage()

    return (
        <StyledSlot
            $colorNumber={charMap[char?.id]?.tags.attribute}
            $isDragging={isDragging}
            $isEmpty={char?.id === undefined}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={ref}
        >
            {char?.id
                ? <CharSlotContent
                    char={char}
                    index={index}
                    handleSelectModalOpen={handleSelectModalOpen}
                    handleCharDelete={handleCharDelete}
                />
                : <EmptySlotContent onClick={handleSelectModalOpen}>
                    {pageString.team.build.emptySlotText}
                </EmptySlotContent>
            }
        </StyledSlot>
    )
})

const DraggableCharsList = () => {
    const { actions } = useTeamData()
    const { setCurrentTeam } = actions

    const [currentTeam, setTeamSlots] = useTeamSlots()

    const [state, setState] = useState({
        didModalMounted: false,
        isSelectModalOpen: false,
        slotIndex: undefined,
        canRender: false
    })

    useEffect(() => {
        setState(state => ({
            ...state,
            canRender: true,
        }))
    }, [])

    const handleSelectModalOpen = (slotIndex) => () => setState(state => ({
        ...state,
        didModalMounted: true,
        isSelectModalOpen: true,
        slotIndex: slotIndex
    }))

    const handleSelectModalClose = () => setState(state => ({
        ...state,
        isSelectModalOpen: false,
        slotIndex: undefined
    }))

    const handleCharSelect = (charId, index) => () => {
        setTeamSlots(charId, index === undefined ? state.slotIndex : index)

        setState(state => ({
            ...state,
            isSelectModalOpen: false,
            slotIndex: undefined
        }))
    }

    return (<>
        {state.canRender && <Swappable
            items={currentTeam.characters}
            renderItem={(character, index, provided, isDragging) => (
                <CharSlot
                    char={character}
                    index={index}
                    provided={provided}
                    isDragging={isDragging}
                    ref={provided.innerRef}
                    handleSelectModalOpen={handleSelectModalOpen(index)}
                    handleCharDelete={handleCharSelect(undefined, index)}
                />
            )}
            onUpdate={(newCharacters) => setCurrentTeam({
                ...currentTeam,
                characters: newCharacters
            })}
            droppableId='character-list'
        />}
        {state.didModalMounted && <CharSelectModal
            open={state.isSelectModalOpen}
            onClose={handleSelectModalClose}
            handleSelect={handleCharSelect}
        />}
    </>)
}

const StyledHeader = styled(Header)`
    position: relative;
    left: -1rem;
    width: calc(100% + 2rem);
    height: auto;
    margin: 0;
    padding: 0 0 0 1rem;
    border: none;
    label {
        margin-right: .6rem;
        font-size: large;
        text-transform: none;
    }
    > div {
        margin-right: 1rem;
    }
`
const TeamHeader = ({ isExporting, handleExport }) => {
    const { pageString } = useLanguage()

    const { currentTeam, actions } = useTeamData()
    const { setCurrentTeam } = actions

    const handleNameChange = (event) => {
        const newTeam = JSON.parse(JSON.stringify(currentTeam))
        newTeam.name = event.target.value
        setCurrentTeam(newTeam)
    }

    return (
        <StyledHeader
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
                    <IconButton
                        tooltipText={pageString.team.build.backTooltip}
                        dataHtml2canvasIgnore
                    >
                        {BackIcon}
                    </IconButton>
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
    max-width: calc(1000px + 2rem);
    width: calc(100% + 2rem);
    margin: -1.5rem auto;
    padding: 1rem;
    padding-top: 1.5rem;
`
const StyledDivider = styled(Divider)`
    && {
        margin: .5rem 0;
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
            <TeamHeader isExporting={isExporting} handleExport={handleExport} />
            <StyledDivider />
            <DraggableCharsList />
        </ExportWrapper>
    </>)
}

export default TeamBuild