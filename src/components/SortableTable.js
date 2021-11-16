import React, { useEffect } from "react";
import styled from "styled-components";
import { TableCell } from "@mui/material";
import useSort from "hooks/useSort";
import Table from "components/Table";

export const SortableTable = ({
  className,
  data,
  head,
  body,
  sortFunc,
  defaultSortKey,
  striped,
  border,
}) => {
  const { sortedData, requestSort, getSortDirection } = useSort(
    data,
    sortFunc,
    { key: defaultSortKey, direction: "desc" }
  );

  return (
    <Table
      className={className}
      stickyHeader
      $striped={striped}
      $border={border}
      size="small"
    >
      {React.cloneElement(head, { sortedData, requestSort, getSortDirection })}
      {React.cloneElement(body, { sortedData })}
    </Table>
  );
};

export const SortableTh = styled(TableCell)`
  && {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
    cursor: pointer;
    user-select: none;
    &:after {
      content: "${({ direction }) =>
        direction === "asc"
          ? " \\25B2"
          : direction === "desc"
          ? " \\25BC"
          : ""}";
    }
  }
`;

export default SortableTable;
