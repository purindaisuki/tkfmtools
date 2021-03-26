import { useCallback, useState } from 'react';

import calcCharStats from 'utils/calcCharStats';
import charMap from 'data/charMap';

const getCharStatsValue = (charState) => calcCharStats({
    ...charState,
    level: charState.level === '' ? '-' : charState.level,
    discipline: charState.discipline === '-' ? 0 : charState.discipline,
    ...charMap[charState.id].stats
})

const useCharacterStats = (initCharState) => {
    const [stats, setStats] = useState(getCharStatsValue(initCharState))

    const setCharacterStats = useCallback((charState) => setStats(getCharStatsValue(charState)), [])

    return [stats, setCharacterStats]
}

export default useCharacterStats