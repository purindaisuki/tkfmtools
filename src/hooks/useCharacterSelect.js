import { useCallback, useState } from 'react';

const getCharSelects = (charState) => ({
    star: {
        imgNames: 'ui_star_' + (charState.id[0] === '1' ? 'ssr'
            : charState.id[0] === '2' ? 'sr'
                : charState.id[0] === '3' ? 'r' : 'n'),
        values: [...Array(6).keys()].slice(4 - charState.id[0]),
        disabled: false,
    },
    bond: {
        imgNames: 'ui_bond_' + charState.bond,
        values: [...Array(6).keys()].slice(1),
        disabled: false,
    },
    discipline: {
        imgNames: 'ui_discipline',
        values: charState.id[0] === '4' ? ['-'] : [...Array(4).keys()],
        disabled: charState.id[0] === '4',
    },
    potential: {
        imgNames: 'ui_potentialPassive',
        values: [...Array(parseInt(charState.id[0]) > 3 ? 7 : 13).keys()].slice(1),
        disabled: false,
    },
    potentialSub: {
        imgNames: undefined,
        values: Array(6).fill(false),
        disabled: false,
    }
})

const convertLegacyData = (charState) => {
    if (typeof charState.potentialSub !== 'object') {
        const newPotentialSub = [...Array(6).keys()].map(i => i < charState.potentialSub)
        charState.potentialSub = newPotentialSub
    }

    return charState
}

const useCharacterSelect = (initCharState, onSelect) => {
    const [state, setState] = useState({
        charState: convertLegacyData(initCharState),
        selectItems: getCharSelects(initCharState),
    })

    const setSelect = useCallback((key, value) => {
        const newCharState = { ...state.charState }

        let validatedValue = value
        // validate state values
        if (key === 'level') {
            validatedValue = isNaN(value) ? ''
                : value < 1 ? 1
                    : value > 60 ? 60 : value
        } else if (key === 'potentialSub') {
            validatedValue = Array.from(newCharState.potentialSub)
            // value as index
            validatedValue[value] = !validatedValue[value]
        }

        newCharState[key] = validatedValue

        const newCharSelects = getCharSelects(newCharState)

        Object.entries(newCharSelects).forEach(entry => {
            if (entry[0] === 'potentialSub') {
                return true
            }

            const values = entry[1].values
            if (!values.includes(newCharState[entry[0]])) {
                newCharState[entry[0]] = values[0]
            }
        })

        setState({
            charState: newCharState,
            selectItems: newCharSelects,
        })

        onSelect(newCharState)
    }, [state, onSelect])

    const setCharState = useCallback((charState) => setState({
        charState: convertLegacyData(charState),
        selectItems: getCharSelects(charState),
    }), [])

    return { ...state, setSelect, setCharState }
}

export default useCharacterSelect