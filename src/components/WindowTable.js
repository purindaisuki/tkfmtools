import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Scrollable from "containers/Scrollable";
import SortableTable from "components/SortableTable";

const overseen = 2;

const WindowTable = ({
  className,
  head,
  body,
  data,
  sortFunc,
  defaultSortKey,
  border,
}) => {
  const wrapperRef = useRef();
  const thRef = useRef();
  const trRef = useRef();

  const [geometry, setGeometry] = useState({
    wrapperHeight: 0,
    sizerHeight: 0,
    tableHeadHeight: 0,
    tableRowHeight: 0,
  });
  const [renderList, setRenderList] = useState([0]);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const wrapperHeight =
      wrapperRef?.current?.getBoundingClientRect().height ?? 0;
    const tableHeadHeight = thRef?.current?.getBoundingClientRect().height ?? 0;
    const tableRowHeight = trRef?.current?.getBoundingClientRect().height ?? 0;
    const sizerHeight = tableHeadHeight + data.length * tableRowHeight;

    setGeometry({
      wrapperHeight,
      sizerHeight,
      tableHeadHeight,
      tableRowHeight,
    });
  }, [data.length, wrapperRef, trRef, thRef]);

  useEffect(() => {
    const scrollBottom = scrollTop + geometry.wrapperHeight;

    // render items in (startIndex, stopIndex)
    const startIndex = Math.max(
      Math.floor(scrollTop / geometry.tableRowHeight) - overseen,
      0
    );
    const stopIndex = Math.min(
      Math.floor(scrollBottom / geometry.tableRowHeight) + overseen,
      data.length - 1
    );
    const windowList = Array.from(
      { length: stopIndex - startIndex + 1 },
      (_, i) => i + startIndex
    );

    const newRenderList = [...new Set(renderList.concat(windowList))];

    setRenderList(newRenderList);
  }, [data.length, geometry, scrollTop]);

  const handleScroll = ({ target }) => {
    setScrollTop(target.scrollTop);
  };

  const renderRow = (sortedData, TableRow, tableRowProps) =>
    sortedData.map((item, ind) => {
      if (!renderList.includes(ind)) {
        return ind < renderList.slice(-1)[0] ? (
          <VirtualRow
            $height={trRef.current.getBoundingClientRect().height}
            key={ind}
          />
        ) : null;
      }

      return (
        <TableRow
          item={item}
          ind={ind}
          key={item.id ?? ind}
          ref={trRef}
          {...tableRowProps}
        />
      );
    });

  return (
    <Scrollable className={className} onScroll={handleScroll} ref={wrapperRef}>
      <Sizer $height={geometry.sizerHeight}>
        <SortableTable
          data={data}
          head={React.cloneElement(head, { ref: thRef })}
          body={React.cloneElement(body, { renderRow })}
          sortFunc={sortFunc}
          defaultSortKey={defaultSortKey}
          border={border}
        />
      </Sizer>
    </Scrollable>
  );
};

const Sizer = styled.div`
  height: ${(props) => props.$height}px;
  th,
  td {
    white-space: nowrap;
  }
`;

const VirtualRow = styled.tr`
  height: ${({ $height }) => $height}px;
`;

export default WindowTable;
