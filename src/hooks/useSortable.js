import { useMemo, useState } from 'react';

const useSortable = (data, sortFunction, config) => {
    const [sortConfig, setSortConfig] = useState(config)

    const sortedData = useMemo(() => {
        const sortableData = Array.from(data)

        if (sortConfig.key) {
            sortFunction(sortableData, sortConfig)
        }

        return sortableData
    }, [data, sortConfig])

    const requestSort = (key) => {
        const direction = (
            sortConfig.key === key &&
            sortConfig.direction === 'desc'
        ) ? 'asc' : 'desc'

        setSortConfig({ key, direction })
    }

    const getSortDirection = (key) => (
        data?.length !== 0 && sortConfig.key === key
            ? sortConfig.direction
            : undefined
    )

    return {
        sortedData: sortedData,
        sortConfig: sortConfig,
        requestSort: requestSort,
        getSortDirection: getSortDirection
    }
}

export default useSortable