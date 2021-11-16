import React, { useCallback } from "react";
import styled from "styled-components";
import { TableBody } from "@mui/material";
import useSort from "hooks/useSort";
import useWindowList from "hooks/useWindowList";
import Scrollable from "containers/Scrollable";
import Table from "components/Table";

const TableRows = ({
  data,
  itemHeight,
  headHeight,
  renderIndices,
  renderRow,
}) =>
  renderIndices.slice(-1)[0] >= data.length || data.length === 0 ? null : (
    <>
      {renderIndices[0] > 0 ? (
        <VirtualRow $height={renderIndices[0] * itemHeight} key={data[0].id} />
      ) : null}
      {renderIndices.map((i) => (
        <React.Fragment key={data[i].id}>{renderRow(data[i])}</React.Fragment>
      ))}
    </>
  );

const WindowTable = ({
  className,
  head,
  headHeight,
  renderRow,
  data,
  itemHeight,
  overseen = 5,
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

  const findItemIndex = useCallback(
    (position) => Math.floor(position / itemHeight),
    []
  );

  const { renderIndices, wrapperRef, handleScroll } = useWindowList({
    data: sortedData,
    findItemIndex,
    overseen,
  });

  return (
    <Scrollable className={className} onScroll={handleScroll} ref={wrapperRef}>
      <Sizer $height={headHeight + data.length * itemHeight}>
        <Table stickyHeader $striped={striped} $border={border} size="small">
          {React.cloneElement(head, {
            requestSort,
            getSortDirection,
          })}
          <TableBody>
            <TableRows
              data={sortedData}
              itemHeight={itemHeight}
              headHeight={headHeight}
              renderIndices={renderIndices}
              renderRow={renderRow}
            />
          </TableBody>
        </Table>
      </Sizer>
    </Scrollable>
  );
};

const Sizer = styled.div`
  height: ${({ $height }) => $height}px;
  th,
  td {
    white-space: nowrap;
  }
`;

const VirtualRow = styled.tr`
  height: ${({ $height }) => $height}px;
`;

export default WindowTable;
