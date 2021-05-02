import React, { useEffect, useReducer, useRef } from 'react'
import styled from 'styled-components';
import { CircularProgress, List } from '@material-ui/core';

const initState = {
    items: [],
    isFetching: false,
    loadMore: true,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'PUSH':
            return { ...state, items: state.items.concat(action.items) }
        case 'UNSHIFT':
            return { ...state, items: action.items.concat(state.items) }
        case 'RESET':
            return initState
        case 'FETCH':
            return { ...state, isFetching: action.isFetching }
        case 'LOAD_MORE':
            return { ...state, loadMore: action.loadMore }
        default:
            throw new Error()
    }
}

const StyledSpinner = styled(CircularProgress)`
    && {
        display: block;
        margin: auto;
        color: ${props => props.theme.colors.secondary};
    }
`
const InfiniteLoader = ({
    listenLatestUpdate,
    fetchItem,
    renderItem,
    hasVisited,
    onResetVisited
}) => {
    const [state, dispatch] = useReducer(reducer, initState)

    const bottomBoundaryRef = useRef()

    useEffect(() => {
        if (!bottomBoundaryRef.current) {
            return
        }

        const scrollObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    dispatch({ type: 'LOAD_MORE', loadMore: true })
                }
            })
        }).observe(bottomBoundaryRef.current)

        if (scrollObserver) {
            return () => scrollObserver.unobeserve(bottomBoundaryRef.current)
        }
    }, [bottomBoundaryRef])

    useEffect(() => {
        const cleanup = listenLatestUpdate(dispatch)

        if (cleanup) {
            return () => cleanup()
        }
    }, [listenLatestUpdate])

    useEffect(() => {
        if (!state.loadMore || state.isFetching) {
            return
        }

        dispatch({ type: 'FETCH', isFetching: true })
        fetchItem()
            .then(items => {
                if (items?.length !== 0) {
                    dispatch({ type: 'PUSH', items: items })
                }
                dispatch({ type: 'FETCH', isFetching: false })
                dispatch({ type: 'LOAD_MORE', loadMore: false })
            })
            .catch(err => {
                dispatch({ type: 'FETCH', isFetching: false })
                dispatch({ type: 'LOAD_MORE', loadMore: false })
                console.log(err)
            })
    }, [fetchItem, state.loadMore])

    useEffect(() => {
        if (hasVisited) {
            return
        }

        dispatch({ type: 'RESET' })
        onResetVisited()
    }, [hasVisited, onResetVisited])

    return (<>
        <List>
            {state.items.map(i => renderItem(i))}
            <div ref={bottomBoundaryRef} />
        </List>
        {state.isFetching && <StyledSpinner size={32} thickness={6} />}
    </>)
}

export default InfiniteLoader