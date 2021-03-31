import React, { createContext, useContext, useCallback, useEffect } from 'react';

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

const validatedLineup = (lineup) => {
    const validatedLineup = lineup ? lineup : []

    charsData.forEach((c, ind) => {
        if (validatedLineup.findIndex(i => i.id === c.id) !== -1) {
            return true
        }

        validatedLineup.splice(ind, 0, {
            id: c.id,
            attribute: c.tags.attribute,
            position: c.tags.position - 5,
            level: 1,
            potential: 1,
            potentialSub: Array(6).fill(false),
            discipline: 0,
            star: c.rarity,
            ATK: c.stats.initATK,
            HP: c.stats.initHP,
            owned: false,
        })
    })

    return validatedLineup
}

const LineupsContext = createContext()

export const useLineupData = () => useContext(LineupsContext)

const LineupDataProvider = ({ children }) => {
    const [localLineups, setLocalLineups] = useLocalStorage('analysis-data')
    const [tempLineup, setTempLineup] = useLocalStorage('temp-analysis-data')
    const [isImportingLineup, setIsImportingLineup] = useLocalStorage('import-line-up-data')

    // if no local lineup data, cancel export to team data provider
    useEffect(() => {
        if (isImportingLineup === undefined || localLineups === undefined) {
            return
        }

        setIsImportingLineup(
            (isImportingLineup || false) &&
            (localLineups || false) &&
            localLineups.length !== 0
        )
    }, [isImportingLineup, localLineups])

    const pushLineup = useCallback((lineup, setting) => {
        let newLineups
        const tzoffset = (new Date()).getTimezoneOffset() * 60000
        const localDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10)
        const dehydratedLineup = dehydrate(lineup)

        if (localLineups) {
            newLineups = Array.from(localLineups)
            newLineups.push({ date: localDate, data: dehydratedLineup })
        } else {
            newLineups = [{ date: localDate, data: dehydratedLineup }]
        }

        if (!setLocalLineups(newLineups)) {
            return 0
        }

        // send data to GTM
        if (setting?.gtag && typeof window !== 'undefined' && window.gtag) {
            // minimize data 
            const minLineup = JSON.parse(JSON.stringify(dehydratedLineup)).reduce((newLineup, c) => {
                c[3] = ('00' + c[3]).slice(-2)
                c[4] = ('00' + c[4]).slice(-2)
                c[5] = c[5].reduce((a, b) => a + (b ? 1 : 0), '')
                c[10] = c[10] ? 1 : 0
                c.splice(8, 2)
                c.splice(1, 2)
                return newLineup + c.reduce((a, b) => a + b, '')
            }, '')
            const gtagData = {}
            // separate data due to 100 characters limit of GA4
            for (let i = 0; i < Math.ceil(minLineup.length / 99); i++) {
                // add prefix 'a' to prevent it from being parsed as number
                gtagData['line_up_' + i] = 'b' + minLineup.slice(i * 99, (i + 1) * 99)
            }
            window.gtag('event', 'line_up_save', { ...gtagData })
        }

        return newLineups.length
    }, [localLineups, setLocalLineups])

    const getLineup = useCallback((index) => {
        if (!localLineups || !localLineups[index]) {
            return
        }

        const hydratedLineup = hydrate(JSON.parse(JSON.stringify(localLineups[index].data)))
        // deal with legacy data
        hydratedLineup.forEach(c => {
            if (c.level === 0) {
                c.level = 1
                c.owned = false
            }
        })

        return validatedLineup(hydratedLineup)
    }, [localLineups])

    const getLatestLineup = useCallback(() => (
        localLineups ? getLineup(localLineups.length - 1) : undefined
    ), [localLineups])

    const deleteLineup = useCallback((index) => {
        if (!localLineups || !localLineups[index]) {
            return 0
        }

        const newLineups = Array.from(localLineups)
        newLineups.splice(index, 1)

        if (!setLocalLineups(newLineups)) {
            return 0
        }

        return 1
    }, [localLineups, setLocalLineups])

    const setCurrentLineup = useCallback((lineup) => setTempLineup(lineup), [setTempLineup])

    const provider = {
        localLineups: localLineups,
        currentLineup: validatedLineup(tempLineup),
        actions: {
            pushLineup,
            getLineup,
            getLatestLineup,
            deleteLineup,
            setCurrentLineup
        }
    }

    return (
        <LineupsContext.Provider value={provider}>{children}</LineupsContext.Provider>
    )
}

export default LineupDataProvider