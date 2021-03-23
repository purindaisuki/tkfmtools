import React from 'react';

import useSwitch from 'hooks/useSwitch';

export default function Switchable({
    layoutSwitcher,
    localStorageKey,
    items,
    initLayoutIndex,
    unmountOnLeave
}) {
    const { layout, canRender, setLayout } = useSwitch(
        localStorageKey,
        items.map(i => i.layout),
        initLayoutIndex,
        unmountOnLeave
    )

    return (<>
        {React.cloneElement(layoutSwitcher, {
            layout: layout,
            setLayout: setLayout,
        })}
        {items.map((item, idx) => (
            <div
                hidden={layout !== item.layout}
                key={item.layout}
            >
                {canRender[idx] && item.content}
            </div>
        ))}
    </>)
}
