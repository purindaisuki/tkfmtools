import React, { createContext, useContext, useState } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';

import charsData from 'data/character.json';

const dehydrate = (lineup) => lineup.map(c => Object.values(c))

const hydrate = (lineup) => {
    const keys = [
        'id',
        'attribute',
        'position',
        'level',
        'potential',
        'potentialSub',
        'discipline',
        'star',
        'ATK',
        'HP',
        'owned'
    ]

    return lineup.map(c => c.reduce((newLineups, v, i) => {
        newLineups[keys[i]] = v
        return newLineups
    }, {}))
}

const initLineup = charsData.map(c => ({
    id: c.id,
    attribute: c.tags.attribute,
    position: c.tags.position - 5,
    level: 1,
    potential: 1,
    potentialSub: 0,
    discipline: 0,
    star: c.rarity,
    ATK: c.stats.initATK,
    HP: c.stats.initHP,
    owned: true,
}))

const LineupsContext = createContext()

export const useLineupData = () => useContext(LineupsContext)

const LineupDataProvider = ({ children }) => {
    const [localLineups, setLocalLineups] = useLocalStorage('analysis-data')

    const [state, setState] = useState({
        localLineups: localLineups,
        currentLineup: (localLineups && localLineups.slice(-1)[0])
            ? hydrate(localLineups.slice(-1)[0].data) : initLineup
    })

    const pushLineup = (lineup, setting) => {
        let newLineups
        const tzoffset = (new Date()).getTimezoneOffset() * 60000
        const localDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10)
        const dehydratedLineup = dehydrate(lineup)

        if (state.localLineups) {
            newLineups = Array.from(state.localLineups)
            newLineups.push({ date: localDate, data: dehydratedLineup })
        } else {
            newLineups = [{ date: localDate, data: dehydratedLineup }]
        }

        if (!setLocalLineups(newLineups)) {
            return 0
        }

        setState(state => ({
            ...state,
            localLineups: newLineups
        }))

        // send data to GTM
        if (setting?.gtag && typeof window !== 'undefined' && window.gtag) {
            // minimize data 
            const minLineup = dehydratedLineup.reduce((newLineup, c) => {
                c[3] = ('00' + c[3]).slice(-2)
                c[4] = ('00' + c[4]).slice(-2)
                c[10] = c[10] ? 1 : 0
                c.splice(8, 2)
                c.splice(1, 2)
                return newLineup + c.reduce((a, b) => a + b, '')
            }, '')
            const gtagData = {}
            // separate data due to 100 characters limit of GA4
            for (let i = 0; i < Math.ceil(minLineup.length / 99); i++) {
                // add prefix 'a' to prevent it from being parsed as number
                gtagData['line_up_' + i] = 'a' + minLineup.slice(i * 99, (i + 1) * 99)
            }
            window.gtag('event', 'line_up_save', { ...gtagData })
        }

        return newLineups.length
    }

    const getLineup = (index) => {
        if (!state.localLineups || !state.localLineups[index]) {
            return
        }

        const hydratedLineup = hydrate(state.localLineups[index].data)
        // deal with legacy data
        hydratedLineup.forEach(c => {
            if (c.level === 0) {
                c.level = 1
                c.owned = false
            }
        })

        return hydratedLineup
    }

    const getLatestLineup = () => (
        state.localLineups ? getLineup(state.localLineups.length - 1) : undefined
    )

    const deleteLineup = (index) => {
        if (!state.localLineups || !state.localLineups[index]) {
            return 0
        }

        const newLineups = Array.from(state.localLineups)
        newLineups.splice(index, 1)

        if (!setLocalLineups(newLineups)) {
            return 0
        }

        setState(state => ({
            ...state,
            localLineups: newLineups
        }))

        return 1
    }

    const setCurrentLineup = (lineup) => setState(state => ({
        ...state,
        currentLineup: lineup
    }))

    const provider = {
        localLineups: state.localLineups,
        currentLineup: state.currentLineup,
        actions: {
            pushLineup: pushLineup,
            getLineup: getLineup,
            getLatestLineup: getLatestLineup,
            deleteLineup: deleteLineup,
            setCurrentLineup: setCurrentLineup
        }
    }

    return (
        <LineupsContext.Provider value={provider}>{children}</LineupsContext.Provider>
    )
}

export default LineupDataProvider