import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const StyledFilterPanel = styled.div`
    padding: 1rem;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: 0 0 .15em lightgray;
`

export const FilterPanel = (props) => (
    <StyledFilterPanel>
        {props.children}
    </StyledFilterPanel>
)

const ContainerHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: large;
    font-weight: normal;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: .4rem;
    border-bottom: solid 1px ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.onSurface};
`
const ResultTableWrapper = styled.div`
    height: calc(100% - 1.4rem - 1.5rem);
    maring-top: -.5rem;
    overflow-x: hidden; overflow-y: auto;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: .4rem;
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.border};
        border-radius: .25rem;
    }
    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.surface};
    }
`
const StyledResultTable = styled(Table)`
    width: 100%;
    font-size: normal;
    color: ${props => props.theme.colors.onSurface};
    img {
        width: 1.8rem; height: 1.8rem;
    }
    td {
        padding-left: .75rem;
    }
`

export function ResultTable(props) {
    const useSortableData = (items, config = { key: 0, direction: 'desc' }) => {
        // when key is number meaning sorted by the number of item
        const [sortConfig, setSortConfig] = useState(config)

        const sortedItems = React.useMemo(() => {
            let sortableItems = [...items]
            props.sortFunc(sortableItems, sortConfig)
            return sortableItems
        }, [items, sortConfig])

        const requestSort = (key) => {
            let direction = 'desc';
            if (
                sortConfig.key === key &&
                sortConfig.direction === 'desc'
            ) {
                direction = 'asc';
            }
            setSortConfig({ key, direction })
        }

        return { sortedResult: sortedItems, requestSort, sortConfig }
    }
    const { sortedResult, requestSort, sortConfig } = useSortableData(props.result)
    const getSortDirection = (name) => {
        if (sortedResult.length === 0) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    return (
        <>
            <ContainerHeader>篩選結果</ContainerHeader>
            <ResultTableWrapper>
                <StyledResultTable
                    striped
                    borderless
                    size="sm"
                >
                    {React.cloneElement(props.children, {
                        requestSort: requestSort,
                        getSortDirection: getSortDirection,
                        sortedResult: sortedResult,
                    })}
                </StyledResultTable>
            </ResultTableWrapper>
        </>
    )
}