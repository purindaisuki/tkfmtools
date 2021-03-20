import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from 'components/useLocalStorage';
import { useLineupData } from 'components/LineupDataProvider';

const initTeam = () => ({
    name: '',
    characters: [...Array(5).keys()].map(i => ({ index: i }))
})

const TeamsContext = createContext()

export const useTeamData = () => useContext(TeamsContext)

const TeamDataProvider = ({ children }) => {
    const [localTeams, setLocalTeams] = useLocalStorage('team-data')
    const [lastIndex, setLastIndex] = useLocalStorage('last-team-index')
    const [importLineupData, setImportLineupData] = useLocalStorage('import-line-up-data')

    const { localLineups } = useLineupData()

    // currentIndex is the index of current team in localTeams, -1 means detached
    const [state, setState] = useState({
        localTeams: localTeams,
        currentTeam: (localTeams && localTeams[lastIndex]) ? localTeams[lastIndex] : initTeam(),
        currentIndex: lastIndex ? lastIndex : -1,
        importLineupData: importLineupData
    })

    const pushTeam = (team) => {
        let newTeams
        if (state.localTeams) {
            newTeams = Array.from(state.localTeams)
            newTeams.push(team)
        } else {
            newTeams = [team]
        }

        if (!setLocalTeams(newTeams)) {
            return 0
        }

        setState(state => ({
            ...state,
            localTeams: newTeams
        }))

        return newTeams.length
    }

    const getTeam = (index) => {
        if (!state.localTeams || !state.localTeams[index]) {
            return
        }

        return state.localTeams[index]
    }

    const deleteTeam = (index) => {
        if (!state.localTeams || !state.localTeams[index]) {
            return 0
        }

        const newTeams = Array.from(state.localTeams)
        newTeams.splice(index, 1)

        if (!setLocalTeams(newTeams) || !setLastIndex(-1)) {
            return 0
        }

        setState(state => ({
            ...state,
            localTeams: newTeams,
            currentIndex: -1
        }))

        return 1
    }

    const setCurrentTeam = (team) => {
        if (!state.localTeams || state.currentIndex < 0) {
            return newTeam()
        }

        const newTeams = Array.from(state.localTeams)
        newTeams.splice(state.currentIndex, 1, team)

        if (!setLocalTeams(newTeams)) {
            return 0
        }

        setState(state => ({
            ...state,
            localTeams: newTeams,
            currentTeam: team,
        }))

        return 1
    }

    const selectTeam = (index) => {
        const team = getTeam(index)

        if (!team) {
            return 0
        }

        if (!setLastIndex(index)) {
            return 0
        }

        setState(state => ({
            ...state,
            currentTeam: team,
            currentIndex: index
        }))
    }

    const newTeam = () => {
        const newTeam = initTeam()
        const newIndex = localTeams ? localTeams.length : 0
        if (!setLastIndex(newIndex)) {
            return 0
        }

        setState(state => ({
            ...state,
            currentTeam: newTeam,
            currentIndex: newIndex
        }))

        return pushTeam(newTeam)
    }

    const toggleImportLineupData = () => {
        if (!state.importLineupData && !localLineups) {
            return 0
        }

        if (!setImportLineupData(!state.importLineupData)) {
            return 0
        }

        setState(state => ({
            ...state,
            importLineupData: !state.importLineupData,
        }))

        return 1
    }

    const provider = {
        localTeams: state.localTeams,
        currentTeam: state.currentTeam,
        importLineupData: state.importLineupData,
        actions: {
            newTeam: newTeam,
            getTeam: getTeam,
            selectTeam: selectTeam,
            pushTeam: pushTeam,
            deleteTeam: deleteTeam,
            setCurrentTeam: setCurrentTeam,
            toggleImportLineupData: toggleImportLineupData
        }
    }

    return (
        <TeamsContext.Provider value={provider}>{children}</TeamsContext.Provider>
    )
}

export default TeamDataProvider