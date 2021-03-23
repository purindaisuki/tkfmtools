import React, { createContext, useContext } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';

import { useLineupData } from 'containers/LineupDataProvider';

const initTeam = () => ({
    name: '',
    characters: [...Array(5).keys()].map(i => ({ key: 'key' + i }))
})

const TeamsContext = createContext()

export const useTeamData = () => useContext(TeamsContext)

const TeamDataProvider = ({ children }) => {
    const [localTeams, setLocalTeams] = useLocalStorage('team-data')
    const [lastIndex, setLastIndex] = useLocalStorage('last-team-index')
    const [importLineupData, setImportLineupData] = useLocalStorage('import-line-up-data')

    const { localLineups } = useLineupData()

    // add key to legacy local data
    if (localTeams) {
        localTeams.forEach(i => {
            i.characters.forEach((c, idx) => {
                if (!c) {
                    i.characters[idx] = { key: 'key' + idx }
                } else if (!c.key) {
                    c.key = 'key' + idx
                }
            })
        })
    }

    const pushTeam = (team) => {
        let newTeams
        if (localTeams) {
            newTeams = Array.from(localTeams)
            newTeams.push(team)
        } else {
            newTeams = [team]
        }

        if (!setLocalTeams(newTeams)) {
            return 0
        }

        return newTeams.length
    }

    const getTeam = (index) => {
        if (!localTeams || !localTeams[index]) {
            return
        }

        return localTeams[index]
    }

    const deleteTeam = (index) => {
        if (!localTeams || !localTeams[index]) {
            return 0
        }

        const newTeams = Array.from(localTeams)
        newTeams.splice(index, 1)

        if (!setLocalTeams(newTeams) || !setLastIndex(-1)) {
            return 0
        }

        return 1
    }

    const setCurrentTeam = (team) => {
        let newTeams
        if (!localTeams || lastIndex === undefined || lastIndex < 0) {
            newTeams = [team]
        } else {
            newTeams = Array.from(localTeams)
            newTeams.splice(lastIndex, 1, team)
        }

        if (!setLocalTeams(newTeams)) {
            return 0
        }

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
    }

    const newTeam = () => {
        const newTeam = initTeam()
        const newIndex = localTeams ? localTeams.length : 0
        if (!setLastIndex(newIndex)) {
            return 0
        }

        return pushTeam(newTeam)
    }

    const toggleImportLineupData = () => {
        if (!importLineupData && (!localLineups || localLineups.length === 0)) {
            return 0
        }

        if (!setImportLineupData(!importLineupData)) {
            return 0
        }

        return 1
    }

    const provider = {
        localTeams: localTeams,
        currentTeam: localTeams ? localTeams[lastIndex] : initTeam(),
        importLineupData: importLineupData ? importLineupData : false,
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