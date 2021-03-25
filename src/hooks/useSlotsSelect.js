import { useCallback } from 'react';

import { useLineupData } from 'containers/LineupDataProvider';
import { useTeamData } from 'containers/TeamDataProvider';

const useSlotsSelect = () => {
    const { currentTeam, isImportingLineup, actions } = useTeamData()
    const { setCurrentTeam } = actions

    const { getLatestLineup } = useLineupData().actions

    const lineup = getLatestLineup()

    const getCharInitState = useCallback((charId) => {
        if (isImportingLineup && lineup) {
            const localChar = lineup.find(c => c.id === charId)

            if (localChar?.owned) {
                const { attribute, position, ATK, HP, owned, ...rest } = localChar
                return ({ ...rest, bond: 1 })
            }
        }

        return {
            id: charId,
            level: '',
            star: charId === undefined ? '' : 4 - parseInt(charId[0]),
            bond: 1,
            discipline: charId === undefined ? '' : (charId[0] === '4' ? '-' : 0),
            potential: 1,
            potentialSub: 0,
        }
    }, [isImportingLineup, lineup])

    const setSlots = (charId, index) => {
        const newCharacters = Array.from(currentTeam.characters)

        newCharacters[index] = {
            ...newCharacters[index],
            ...getCharInitState(charId)
        }

        setCurrentTeam({
            ...currentTeam,
            characters: newCharacters
        })
    }

    return [currentTeam, setSlots]
}

export default useSlotsSelect