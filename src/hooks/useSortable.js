import { useEffect, useMemo, useState } from "react";

const useSortable = (data, sortFunc, initConfig) => {
  const [sortConfig, setSortConfig] = useState(initConfig);

  const sortedData = useMemo(() => {
    const sortableData = Array.from(data);

    if (sortConfig.key) {
      sortFunc(sortableData, sortConfig);
    }

    return sortableData;
  }, [data, sortFunc, sortConfig]);

  const requestSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "desc"
        ? "asc"
        : "desc";

    setSortConfig({ key, direction });
  };

  const getSortDirection = (key) =>
    data?.length !== 0 && sortConfig.key === key
      ? sortConfig.direction
      : undefined;

  useEffect(() => {
    if (sortConfig.key !== initConfig.key) {
      requestSort(initConfig.key);
    }
  }, [initConfig.key]);

  return {
    sortedData,
    sortConfig,
    requestSort,
    getSortDirection,
  };
};

export default useSortable;
