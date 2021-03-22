import { useEffect, useState } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';

const useLayoutSwitch = (localStorageKey, layouts, initLayoutIndex, unmountOnLeave) => {
    const [localConfig, setLocalConfig] = useLocalStorage(
        localStorageKey,
        layouts[initLayoutIndex | 0]
    )

    const [state, setState] = useState({
        layout: localConfig,
        canRender: layouts.map(i => i === localConfig)
    })

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