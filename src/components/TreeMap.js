import React from 'react';
import { useTheme } from 'styled-components';
import { ResponsiveTreeMap } from '@nivo/treemap'

const TreeMap = ({ data }) => {
    const { chart } = useTheme()

    return (
        <ResponsiveTreeMap
            theme={chart}
            colors={chart.colors}
            data={data}
            identity='name'
            value='cp'
            valueFormat=' >-.2s'
            leavesOnly
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            labelSkipSize={12}
            labelTextColor={{ from: 'color', modifiers: [[chart.treeMapText, 1.2]] }}
            borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
            animate
        />
    )
}

export default TreeMap