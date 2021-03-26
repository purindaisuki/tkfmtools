import { useCallback } from 'react';

import { useLineupData } from 'containers/LineupDataProvider';
import { useTeamData } from 'containers/TeamDataProvider';

import getInitCharState from 'utils/getInitCharState';

const useTeamSlots = () => {
    const { currentTeam, isImportingLineup, actions } = useTeamData()
    const { setCurrentTeam } = actions

    const { getLatestLineup } = useLineupData().actions

    const lineup = getLatestLineup()

    const getInitSlotState = useCallback((charId) => {
        if (isImportingLineup && lineup) {
            const localChar = lineup.find(c => c.id === charId)

            if (localChar?.owned) {
                const { attribute, position, ATK, HP, owned, ...rest } = localChar
                return ({ ...rest, bond: 1 })
            }
        }

        return getInitCharState(charId)
    }, [isImportingLineup, lineup])

    const setTeamSlots = (charId, index) => {
        const newCharacters = Array.from(currentTeam.characters)

        newCharacters[index] = {
            ...newCharacters[index],
            ...getInitSlotState(charId)
        }

        setCurrentTeam({
            ...currentTeam,
            characters: newCharacters
        })
    }

    return [currentTeam, setTeamSlots]
}

export default useTeamSlots