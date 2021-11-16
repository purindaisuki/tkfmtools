import styled from "styled-components";
import { Table as MuiTable } from "@mui/material";

const Table = styled(MuiTable)`
  width: 100%;
  .MuiTableCell-head {
    padding: 0.75rem 0.25rem;
    font-weight: bold;
  }
  .MuiTableCell-head:first-child {
    padding-left: 0.75rem;
  }
  .MuiTableCell-root {
    border-bottom: ${({ theme, $border }) =>
      $border ? "1px solid " + theme.colors.secondary : "none"};
    font-size: medium;
  }
  .MuiTableCell-body {
    color: ${({ theme }) => theme.colors.onSurface};
  }
  && .MuiTableRow-root:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }
  ${({ $striped }) =>
    $striped
      ? `.MuiTableRow-root:nth-of-type(2n+1) {
            background-color: rgba(0, 0, 0, 0.05);
        }`
      : ""}
`;

export default Table;
