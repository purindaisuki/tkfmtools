import { Table } from 'react-bootstrap';
import styled from 'styled-components';

const ResultTableContainer = styled.div`
    vertical-align: top;
    width: 30%;
    position: absolute;
    margin-left: calc(52% + 1rem);
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
        width: calc(38% - 1rem);
        margin-left: calc(62% + 1rem);
    }
    @media screen and (max-width: 992px) {
        width: 100%;
        position: relative;
        margin-left: 0;
        margin-top: 1rem;
    }
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
    table-layout: fixed;
    font-size: normal;
    color: ${props => props.theme.colors.onSurface};
    img {
        width: 1.8rem; height: 1.8rem;
    }
    td {
        padding-left: .75rem;
    }
`
const SortTh = styled.th`
    position: sticky;
    top: 0;
    cursor: pointer;
    user-select: none;
    font-size: 1.1rem;
    font-weight: normal;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.onSurface};
    &:after {
        content: '${props => {
        if (!props.direction) return
        return props.direction === 'asc' ? ' \\25B2' : ' \\25BC'
    }}';
    }
`

export function ResultTable(props) {
    const useSortableData = (items, config = { key: 0, direction: 'desc' }) => {
        // when key is number meaning sorted by the number of item
        const [sortConfig, setSortConfig] = useState(config)

        const sortedItems = React.useMemo(
            () => props.sortFunc,
            [items, sortConfig]
        )

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

        return { sortedItems: sortedItems, requestSort, sortConfig }
    }
    const { sortedItems, requestSort, sortConfig } = useSortableData(props.result)
    const getSortDirection = (name) => {
        if (sortedItems.length === 0) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    const childrenWithProps = React.Children.map(props.children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                requestSort: requestSort,
                getSortDirection: getSortDirection,
                sortedItems: sortedItems,
            });
        }
        return child;
    })

    return (
        <ResultTableContainer>
            <ContainerHeader>篩選結果</ContainerHeader>
            <ResultTableWrapper>
                <StyledResultTable
                    striped
                    borderless
                    size="sm"
                >
                    {childrenWithProps}
                </StyledResultTable>
            </ResultTableWrapper>
        </ResultTableContainer>
    )
}