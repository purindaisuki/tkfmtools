import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

import Scrollable from 'containers/Scrollable';
import { useLanguage } from 'containers/LanguageProvider';

import MyHeader from 'components/MyHeader';

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
    const useSortableData = (
        items, config = {
            key: defaultSortKey,
            direction: 'desc'
        }
    ) => {
        const [sortConfig, setSortConfig] = useState(config)

        const sortedItems = useMemo(() => {
            let sortableItems = [...items]
            if (sortConfig.key) {
                sortFunc(sortableItems, sortConfig)
            }

            return sortableItems
        }, [items, sortConfig])

        const requestSort = (key) => {
            let direction = (
                sortConfig.key === key &&
                sortConfig.direction === 'desc'
            ) ? 'asc' : 'desc'
            setSortConfig({ key, direction })
        }

        return { sortedResult: sortedItems, requestSort, sortConfig }
    }

    const { sortedResult, requestSort, sortConfig } = useSortableData(data)

    // apply default key if value assigned after first render
    useEffect(() => {
        if (sortConfig.key !== defaultSortKey) {
            requestSort(defaultSortKey)
        }
    }, [defaultSortKey])

    const getSortDirection = (key) => (
        !data || data.length === 0 || sortConfig.key !== key
            ? undefined
            : sortConfig.direction
    )

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
                requestSort: requestSort,
                getSortDirection: getSortDirection,
                sortedResult: sortedResult,
            })}
            {React.cloneElement(body, {
                sortedResult: sortedResult,
            })}
        </StyledTable>
    )
}

const TableWrapper = styled(Scrollable)`
    height: ${props => props.$height};
    overflow-x: hidden;
    overflow-y: auto;
`
const StyledSortableTable = styled(SortableTable)`
    img {
        width: 1.8rem; height: 1.8rem;
    }
    td {
        padding-left: .75rem;
    }
`
export function ResultPanel({
    data,
    head,
    body,
    sortFunc,
    defaultSortKey,
    handleModalOpen,
    height,
    striped,
}) {
    const { pageString } = useLanguage()

    return (<>
        <MyHeader
            title={pageString.items.drop.filter.resultTitle}
            withHelp
            onClickHelp={handleModalOpen}
            border
        />
        <TableWrapper $height={height}>
            <StyledSortableTable
                data={data}
                head={head}
                body={body}
                sortFunc={sortFunc}
                defaultSortKey={defaultSortKey}
                striped={striped}
            />
        </TableWrapper>
    </>)
}
