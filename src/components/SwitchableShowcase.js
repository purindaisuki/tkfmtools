import React, { useEffect, useState } from 'react';

export default function SwitchableShowcase({
    layoutSwitcher,
    localLayoutConfig,
    items
}) {
    const [state, setState] = useState({
        layout: items[0].layout,
        hasMounted: items.map(i => false)
    })

    // set previous layout and not render at SSR time
    useEffect(() => {
        const localConfig = localStorage.getItem(localLayoutConfig)
        let hasMounted
        if (localConfig) {
            hasMounted = state.hasMounted.map((h,i) => items[i].layout === localConfig)
        } else {
            hasMounted = [true].concat(state.hasMounted.slice(1))
        }
        setState({
            layout: localConfig ? localConfig : items[0].layout,
            hasMounted: hasMounted
        })
    }, [])

    // mount on first enter
    const handleLayoutChange = (toLayout) => () => {
        setState((state) => ({
            ...state,
            layout: toLayout,
            hasMounted: state.hasMounted.map((h,i) => h || items[i].layout === toLayout)
        }))
        localStorage.setItem(localLayoutConfig, toLayout)
    }

    return (
        <>
            {React.cloneElement(layoutSwitcher, {
                layout: state.layout,
                handleLayoutChange: handleLayoutChange,
            })}
            {items.map((item, idx) => (
                <div
                    hidden={state.layout !== item.layout}
                    key={idx}
                >
                    {state.hasMounted[idx] && item.content}
                </div>
            ))}
        </>
    )
}
