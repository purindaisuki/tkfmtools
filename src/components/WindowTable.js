import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ScrollableContainer from 'components/ScrollableContainer';
import { SortableTable } from 'components/FilterComponents';

const Sizer = styled.div`
    height: ${props => props.$height}px;
    th, td {
        white-space: nowrap;
    }
`
export default function WindowTable({
    className,
    head,
    body,
    data,
    sortFunc,
    defaultSortKey,
    border,
}) {
    const wrapperRef = useRef()
    const thRef = useRef()
    const trRef = useRef()

    const [state, setState] = useState({
        scrollTop: 0,
        renderTo: 0,
        sizerHeight: 0,
    })

    useEffect(() => {
        const height = wrapperRef && wrapperRef.current
            ? wrapperRef.current.getBoundingClientRect().height : 0
        const headHeight = thRef && thRef.current
            ? thRef.current.getBoundingClientRect().height : 0
        const scrollBottom = state.scrollTop + height
        const rowHeight = trRef && trRef.current
            ? trRef.current.getBoundingClientRect().height : 0
        const renderTo = Math.min(Math.floor(scrollBottom / rowHeight), data.length - 1)
        const sizerHeight = headHeight + data.length * rowHeight

        setState((state) => ({
            ...state,
            renderTo: Math.max(state.renderTo, renderTo),
            sizerHeight: sizerHeight,
        }))
    }, [wrapperRef, trRef, thRef, state.scrollTop])

    const handleScroll = (event) => {
        setState((state) => ({
            ...state,
            scrollTop: event.target.scrollTop,
        }))
    }

    return (
        <ScrollableContainer
            className={className}
            onScroll={handleScroll}
            ref={wrapperRef}
        >
            <Sizer $height={state.sizerHeight}>
                <SortableTable
                    data={data}
                    head={React.cloneElement(head, { ref: thRef })}
                    body={React.cloneElement(body, {
                        renderTo: state.renderTo,
                        ref: trRef,
                    })}
                    sortFunc={sortFunc}
                    defaultSortKey={defaultSortKey}
                    border={border}
                />
            </Sizer>
        </ScrollableContainer>
    )
}
