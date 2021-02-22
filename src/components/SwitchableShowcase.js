import React from 'react';
import styled from 'styled-components';

const ShowcaseContainer = styled.div`
    display: ${props => props.$hidden ? 'none' : 'block'}
`
export default function SwitchableShowcase({
    layoutSwitcher,
    localLayoutConfig,
    items
}) {
    const getDefaultLayout = () => {
        let localConfig
        if (typeof localStorage !== `undefined`) {
            localConfig = localStorage.getItem(localLayoutConfig)
        }

        return (
            localConfig
                ? localConfig
                : items[0].layout
        )
    }

    const [layout, setLayout] = React.useState(getDefaultLayout)

    const handleLayoutChange = (toLayout) => () => {
        setLayout(toLayout)
        if (typeof localStorage !== `undefined`) {
            localStorage.setItem(localLayoutConfig, toLayout)
        }
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
