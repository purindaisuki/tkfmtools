import { useEffect, useState } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';

const useLayoutSwitch = (localStorageKey, layouts, initLayoutIndex, unmountOnLeave) => {
    const [state, setState] = useState({
        layout: layouts[initLayoutIndex | 0],
        canRender: Array(layouts.length).fill(false)
    })
    
    const [localConfig, setLocalConfig] = useLocalStorage(localStorageKey, layouts[0])

    // set previous layout and not render at SSR time
    useEffect(() => {
        const canRender = localConfig
            ? state.canRender.map((h, i) => layouts[i] === localConfig)
            : [true].concat(state.canRender.slice(1))

        setState({
            layout: localConfig,
            canRender: canRender
        })
    }, [])

    const setLayout = (toLayout) => {
        setState((state) => ({
            ...state,
            layout: toLayout,
            canRender: state.canRender.map((h, i) => (
                (h && !unmountOnLeave) || layouts[i] === toLayout)
            )
        }))
        setLocalConfig(toLayout)
    }

    return { ...state, setLayout: setLayout }
}

export default useLayoutSwitch