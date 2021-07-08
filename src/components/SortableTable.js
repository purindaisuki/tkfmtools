import React, { useEffect } from "react";
import styled from "styled-components";
import { TableCell } from "@material-ui/core";
import useSortable from "hooks/useSortable";
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
  const { sortedData, sortConfig, requestSort, getSortDirection } = useSortable(
    data,
    sortFunc,
    { key: defaultSortKey, direction: "desc" }
  );

  // apply default key if value assigned after first render
  useEffect(() => {
    if (sortConfig.key !== defaultSortKey) {
      requestSort(defaultSortKey);
    }
  }, [defaultSortKey]);

  return (
    <Table
      className={className}
      stickyHeader
      $striped={striped}
      $border={border}
      size="small"
    >
      {React.cloneElement(head, {
        sortedData: sortedData,
        requestSort: requestSort,
        getSortDirection: getSortDirection,
      })}
      {React.cloneElement(body, {
        sortedData: sortedData,
      })}
    </Table>
  );
};

export const SortableTh = styled(TableCell)`
  && {
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.onSurface};
    cursor: pointer;
    user-select: none;
    &:after {
      content: "${(props) =>
        props.direction
          ? props.direction === "asc"
            ? " \\25B2"
            : " \\25BC"
          : undefined}";
    }
  }
`;

export default SortableTable;
