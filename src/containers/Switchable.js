import React from 'react';

import useSwitch from 'hooks/useSwitch';

export default function Switchable({
    className,
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
        {layoutSwitcher && React.cloneElement(layoutSwitcher, {
            layout: layout,
            setLayout: setLayout,
        })}
        {items.map((item, ind) => (
            <div
                className={className}
                hidden={layout !== item.layout}
                key={item.layout}
            >
                {canRender[ind] && item.content}
            </div>
        ))}
    </>)
}
