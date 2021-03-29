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
        {items.map((item, ind) => (
            <div
                hidden={layout !== item.layout}
                key={item.layout}
            >
                {canRender[ind] && item.content}
            </div>
        ))}
    </>)
}
