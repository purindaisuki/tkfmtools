import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

import useSortable from 'hooks/useSortable';

export const SortableTh = styled.th`
    cursor: pointer;
    user-select: none;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    &:after {
        content: '${props => (
        props.direction
            ? props.direction === 'asc'
                ? ' \\25B2'
                : ' \\25BC'
            : undefined
    )}';
    }
`
const StyledTable = styled(Table)`
    width: 100%;
    margin-bottom: 0;
    th {
        position: sticky;
        top: 0;
        z-index: 1;
    }
    &, &&& tr {
        color: ${props => props.theme.colors.onSurface};
    }
    th {
        padding: .75rem .25rem;
    }
    th:first-child {
        padding-left: .75rem;
    }
    td {
        vertical-align: middle;
    }
    tr {
        border-bottom: ${props => (
        props.$border
            ? '1px solid ' + props.theme.colors.secondary
            : 'none'
    )};
    }
`
export const SortableTable = ({
    className,
    data,
    head,
    body,
    sortFunc,
    defaultSortKey,
    striped,
    border
}) => {
    const { sortedData, sortConfig, requestSort, getSortDirection } = useSortable(
        data, sortFunc, { key: defaultSortKey, direction: 'desc' }
    )

    // apply default key if value assigned after first render
    useEffect(() => {
        if (sortConfig.key !== defaultSortKey) {
            requestSort(defaultSortKey)
        }
    }, [defaultSortKey])

    return (
        <StyledTable
            className={className}
            striped={striped}
            borderless
            hover
            $border={border}
            size="sm"
        >
            {React.cloneElement(head, {
                sortedData: sortedData,
                requestSort: requestSort,
                getSortDirection: getSortDirection,
            })}
            {React.cloneElement(body, {
                sortedData: sortedData,
            })}
        </StyledTable>
    )
}

export default SortableTable