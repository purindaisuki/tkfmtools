import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Button,
    Checkbox,
    Divider,
    List, ListItem, ListItemSecondaryAction,
    Menu, MenuItem
} from '@material-ui/core';

import { useTeamData } from 'containers/TeamDataProvider';
import { useLanguage } from 'containers/LanguageProvider';

import Head from 'components/Head';
import Header from 'components/Header';
import LocalizedLink from 'components/LocalizedLink';
import ImageSupplier from 'components/ImageSupplier';
import IconButton from 'components/IconButton';
import Snackbar from 'components/Snackbar';
import { NewIcon, CopyIcon, DeleteIcon, SettingIcon } from 'components/icon';

const StyledMenu = styled(Menu)`
    .MuiPaper-root {
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
    }
`
const StyledMenuItem = styled(MenuItem)`
    && {
        svg {
            fill: ${props => props.theme.colors.secondary};
        }
    }
`
const SettingDropDown = () => {
    const { pageString } = useLanguage()

    const { isImportingLineup, actions } = useTeamData()
    const { toggleImportLineupData } = actions
    const [state, setState] = useState({
        anchorElement: false,
        isSnackbarOpen: false
    })

    const handleSettingButtonClick = (event) => setState(state => ({
        ...state,
        anchorElement: event.currentTarget
    }))

    const handleMenuClose = () => setState(state => ({
        ...state,
        anchorElement: null
    }))

    const handleToggle = () => {
        if (!toggleImportLineupData()) {
            setState(state => ({
                ...state,
                isSnackbarOpen: true
            }))
        }
    }

    const handleSnackbar = (boolean) => () => setState(state => ({
        ...state,
        isSnackbarOpen: boolean
    }))

    return (<>
        <IconButton
            aria-controls='setting-menu'
            aria-haspopup='true'
            onClick={handleSettingButtonClick}
            tooltipText={pageString.team.index.settingTooltip}
        >
            {SettingIcon}
        </IconButton>
        <List
            component={StyledMenu}
            id='setting-menu'
            anchorEl={state.anchorElement}
            open={Boolean(state.anchorElement)}
            onClose={handleMenuClose}
        >
            <ListItem
                component={StyledMenuItem}
                dense
                button
                onClick={handleToggle}
            >
                <Checkbox
                    edge='start'
                    checked={isImportingLineup}
                    disableRipple
                    inputProps={{ 'aria-labelledby': 'setting-description' }}
                />
                <span id='setting-description'>
                    {pageString.team.index.settingDescription}
                </span>
            </ListItem>
        </List>
        <Snackbar
            open={state.isSnackbarOpen}
            onClose={handleSnackbar(false)}
            message={pageString.team.index.errorSnackbar}
            type='error'
        />
    </>)
}

const StyledHeader = styled(Header)`
    position: relative;
    left: -1rem;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0 0 .5rem 1rem;
    border: none;
    label {
        margin-right: .6rem;
        font-size: large;
    }
    > div:last-child {
        position: relative;
        bottom: -.4rem;
        right: -1rem;
    }
`
const StyledButton = styled(Button)`
    && {
        padding: .6rem;
        color: ${props => props.theme.colors.onSurface};
        border: 1px solid ${props => props.theme.colors.shadow};
        font-size: medium;
        svg {
            margin: 0;
        }
        span {
            line-height: normal;
        }
    }
`
const TeamHeader = () => {
    const { pageString } = useLanguage()

    const { actions } = useTeamData()
    const { newTeam } = actions

    return (<>
        <StyledHeader
            title={
                <LocalizedLink to='/team/build/'>
                    <StyledButton startIcon={NewIcon} onClick={() => newTeam()}>
                        <span>{pageString.team.index.newComposition}</span>
                    </StyledButton>
                </LocalizedLink>
            }
            end={<SettingDropDown />}
        />

    </>)
}

const CharContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: hidden;
`
const CharImg = styled(ImageSupplier)`
    flex: 0 0 auto;
    width: 3rem;
    height: 3rem;
    overflow: hidden;
`
const EmptySlot = styled.div`
    flex: 0 0 auto;
    width: 3rem;
    height: 3rem;
    overflow: hidden;
`
const CharsBox = ({ chars }) => {
    const { charString } = useLanguage()

    if (chars.every(c => c?.id === undefined)) {
        return <CharContainer><EmptySlot /></CharContainer>
    }

    return (
        <CharContainer>
            {chars.map((c, idx) => (
                c?.id && <CharImg
                    key={idx}
                    name={`char_small_${c.id}`}
                    alt={charString.name[c.id]}
                />
            ))}
        </CharContainer>
    )
}

const DataItem = styled(ListItem)`
    && {
        margin-bottom: .6rem;
        padding-right: 6.8rem;
    }
    background: linear-gradient(
        90deg,
        ${props => props.$isDragging ? props.theme.colors.shadow
        : props.theme.colors.shadow + '2A'},
        ${props => props.$isDragging ? props.theme.colors.surface
        : props.theme.colors.shadow + '0D'}
    );
`
const TitleText = styled.span`
    width: 8rem;
    color: ${props => props.theme.colors.onSurface};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const OperationButton = styled(IconButton)`
    svg {
        width: 1.4rem;
        height: 1.4rem;
    }
`
const DataList = () => {
    const { pageString } = useLanguage()

    const { localTeams, actions } = useTeamData()
    const { getTeam, selectTeam, pushTeam, deleteTeam } = actions

    return (
        <List>
            {localTeams?.map((t, idx) => (
                <DataItem
                    component={LocalizedLink}
                    to='/team/build/'
                    button
                    key={idx}
                    onClick={() => selectTeam(idx)}
                >
                    <TitleText>{t.name}</TitleText>
                    <CharsBox chars={t.characters} />
                    <ListItemSecondaryAction>
                        <OperationButton
                            onClick={() => pushTeam(getTeam(idx))}
                            tooltipText={pageString.team.index.copyTooltip}
                            edge='end'
                            aria-label='copy-team'
                        >
                            {CopyIcon}
                        </OperationButton>
                        <OperationButton
                            onClick={() => deleteTeam(idx)}
                            tooltipText={pageString.team.index.deleteTooltip}
                            edge='end'
                            aria-label='delete-team'
                        >
                            {DeleteIcon}
                        </OperationButton>
                    </ListItemSecondaryAction>
                </DataItem>
            ))}
        </List>
    )
}

const PageWrapper = styled.div`
    max-width: 1000px;
    margin: auto;
`
const StyledDivider = styled(Divider)`
    && {
        background-color: ${props => props.theme.colors.dropdownHover};
    }
`
const Team = () => {
    const { pageString } = useLanguage()

    return (
        <PageWrapper>
            <Head
                title={pageString.team.index.helmet.title}
                description={pageString.team.index.helmet.description}
                path='/team/'
            />
            <TeamHeader />
            <StyledDivider />
            <DataList />
        </PageWrapper>
    )
}

export default Team