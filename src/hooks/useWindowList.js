import React, { useEffect, useRef, useState } from "react";

const getIndicesInWindow = ({
  data,
  scrollTop,
  wrapperHeight,
  findItemIndex,
  overseen,
}) => {
  const scrollBottom = scrollTop + wrapperHeight;

  const startIndex = Math.max(findItemIndex(scrollTop) - overseen, 0);
  const stopIndex = Math.min(
    findItemIndex(scrollBottom) + overseen,
    data.length - 1
  );

  // item indices on the window (startIndex, stopIndex)
  const indicesInWindow = Array.from(
    { length: stopIndex - startIndex + 1 },
    (_, i) => i + startIndex
  );

  return indicesInWindow;
};

const useWindowList = ({ data, findItemIndex, overseen }) => {
  const wrapperRef = useRef();
  const wrapperHeight =
    wrapperRef?.current?.getBoundingClientRect().height ?? 0;

  const [scrollTop, setScrollTop] = useState(0);

  const [renderIndices, setRenderIndices] = useState(() =>
    getIndicesInWindow({
      data,
      scrollTop,
      wrapperHeight,
      findItemIndex,
      overseen,
    })
  );

  useEffect(() => {
    setRenderIndices(
      getIndicesInWindow({
        data,
        scrollTop,
        wrapperHeight,
        findItemIndex,
        overseen,
      })
    );
  }, [data, scrollTop, wrapperHeight, findItemIndex, overseen]);

  const handleScroll = ({ target }) => {
    setScrollTop(target.scrollTop);
  };

  return { renderIndices, wrapperRef, handleScroll };
};

export default useWindowList;
