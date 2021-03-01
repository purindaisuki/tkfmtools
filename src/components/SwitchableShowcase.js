import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ShowcaseContainer = styled.div`
    display: ${props => props.$hidden ? 'none' : 'block'}
`
export default function SwitchableShowcase({
    layoutSwitcher,
    localLayoutConfig,
    items
}) {
    const [state, setState] = useState({
        layout: items[0].layout,
        hasMounted: false
    })

    // set previous layout and flag mounted
    useEffect(() => {
        const localConfig = localStorage.getItem(localLayoutConfig)
        setState({
            layout: localConfig ? localConfig : items[0].layout,
            hasMounted: true
        })
    }, [])

    // not render at SSR time
    if (!state.hasMounted) {
        return null
    }

    const handleLayoutChange = (toLayout) => () => {
        setState((state) => ({
            ...state,
            layout: toLayout
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
                <ShowcaseContainer
                    $hidden={state.layout !== item.layout}
                    key={idx}
                >
                    {item.content}
                </ShowcaseContainer>
            ))}
        </>
    )
}
