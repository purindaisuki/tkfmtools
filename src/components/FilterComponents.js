import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import ScrollableContainer from 'components/ScrollableContainer';
import MyHeader from 'components/MyHeader';
import { useLanguage } from 'components/LanguageProvider';

const StyledFilterPanel = styled.div`
    height: 100%;
    width: ${props => props.widthConfig.default};
    padding: 1rem;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: 0 0 .15em lightgray;
    @media screen and (max-width: 1360px) {
        width: ${props => props.widthConfig[1360]};
    }
    @media screen and (max-width: 992px) {
        width: ${props => props.widthConfig[992]};
    }
`
export const FilterPanel = ({
    className,
    children,
    widthConfig
}) => (
    <StyledFilterPanel
        className={className}
        widthConfig={widthConfig}
    >
        {children}
    </StyledFilterPanel>
)

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

const ResultTableContainer = styled.div`
    vertical-align: top;
    position: absolute;
    width: ${props => props.widthConfig.default};
    margin-left: calc(100% - ${props => props.widthConfig.default});
    padding: 1rem;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: .25rem;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    box-shadow: 0 0 .15em lightgray;
    @media screen and (max-width: 1360px) {
        width: ${props => props.widthConfig[1360]};
        margin-left: calc(100% - ${props => props.widthConfig[1360]});
    }
    @media screen and (max-width: 992px) {
        width: ${props => props.widthConfig[992]};
        margin-left: calc(100% - ${props => props.widthConfig[992]});
        position: relative;
        margin-top: 1rem;
    }
`
const TableWrapper = styled(ScrollableContainer)`
    height: calc(100% - 1.4rem - 1.5rem);
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
export function ResultTable({
    data,
    head,
    body,
    sortFunc,
    defaultSortKey,
    handleModalOpen,
    widthConfig,
    striped,
}) {
    const { pageString } = useLanguage()

    return (
        <ResultTableContainer widthConfig={widthConfig}>
            <MyHeader
                title={pageString.items.drop.filter.resultTitle}
                withHelp
                onClickHelp={handleModalOpen}
            />
            <TableWrapper>
                <StyledSortableTable
                    data={data}
                    head={head}
                    body={body}
                    sortFunc={sortFunc}
                    defaultSortKey={defaultSortKey}
                    striped={striped}
                >
                </StyledSortableTable>
            </TableWrapper>
        </ResultTableContainer>
    )
}
