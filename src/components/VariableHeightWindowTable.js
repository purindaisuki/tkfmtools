import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { TableBody } from "@material-ui/core";
import useSort from "hooks/useSort";
import useWindowList from "hooks/useWindowList";
import Scrollable from "containers/Scrollable";
import Table from "components/Table";

const TableRows = ({
  data,
  itemsPosition,
  headHeight,
  renderIndices,
  renderRow,
}) =>
  renderIndices.slice(-1)[0] >= data.length || data.length === 0 ? null : (
    <>
      {renderIndices[0] > 0 ? (
        <VirtualRow
          $height={itemsPosition[renderIndices[0] - 1] - headHeight}
          key={data[0].id}
        />
      ) : null}
      {renderIndices.map((i) => (
        <React.Fragment key={data[i].id}>{renderRow(data[i])}</React.Fragment>
      ))}
    </>
  );

const findSortedIndex = (arr, value) => {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = (low + high) >>> 1;

    if (arr[mid] < value) low = mid + 1;
    else high = mid;
  }

  return low;
};

const getGeometry = (data, headHeight) => {
  let itemsPosition = Array(data.length);

  for (let i = 0; i < data.length; i++) {
    itemsPosition[i] = (itemsPosition[i - 1] ?? headHeight) + data[i].height;
  }

  let sizerHeight = itemsPosition.slice(-1)[0];

  return { sizerHeight, itemsPosition };
};

const VariableHeightWindowTable = ({
  className,
  head,
  headHeight,
  renderRow,
  data,
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

  const { sizerHeight, itemsPosition } = useMemo(
    () => getGeometry(sortedData, headHeight),
    [sortedData, headHeight]
  );

  const findItemIndex = useCallback(
    (position) => findSortedIndex(itemsPosition, position),
    [itemsPosition]
  );

  const { renderIndices, wrapperRef, handleScroll } = useWindowList({
    data: sortedData,
    findItemIndex,
    overseen,
  });

  return (
    <Scrollable className={className} onScroll={handleScroll} ref={wrapperRef}>
      <Sizer $height={sizerHeight}>
        <Table stickyHeader $striped={striped} $border={border} size="small">
          {React.cloneElement(head, {
            requestSort,
            getSortDirection,
          })}
          <TableBody>
            <TableRows
              data={sortedData}
              itemsPosition={itemsPosition}
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

export default VariableHeightWindowTable;
