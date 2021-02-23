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
    const [layout, setLayout] = useState(items[0].layout)

    // set previous layout
    useEffect(() => {
        const localConfig = localStorage.getItem(localLayoutConfig)
        setLayout(localConfig ? localConfig : items[0].layout)
    })

    const handleLayoutChange = (toLayout) => () => {
        setLayout(toLayout)
        localStorage.setItem(localLayoutConfig, toLayout)
    }

    return (
        <>
            {React.cloneElement(layoutSwitcher, {
                layout: layout,
                handleLayoutChange: handleLayoutChange,
            })}
            {items.map((item, idx) => (
                <ShowcaseContainer
                    $hidden={layout !== item.layout}
                    key={idx}
                >
                    {item.content}
                </ShowcaseContainer>
            ))}
        </>
    )
}
