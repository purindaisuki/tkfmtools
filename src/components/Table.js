import styled from 'styled-components';
import { Table as MuiTable } from '@material-ui/core';

const Table = styled(MuiTable)`
    && {
        width: 100%;
        .MuiTableCell-head {
            padding: .75rem .25rem;
            font-weight: bold;
        }
        .MuiTableCell-head:first-child {
            padding-left: .75rem;
        }
        .MuiTableCell-root {
            border-bottom: ${props => (props.$border
        ? '1px solid ' + props.theme.colors.secondary
        : 'none'
    )};
            font-size: medium;
        }
        .MuiTableCell-body {
            color: ${props => props.theme.colors.onSurface};
        }
        && .MuiTableRow-root:hover {
            background-color: rgba(0, 0, 0, 0.075);
        }
        ${props => props.$striped ? `.MuiTableRow-root:nth-of-type(2n+1) {
            background-color: rgba(0, 0, 0, 0.05);
        }`: ''}
    }
`

export default Table