import React from 'react';
import { useTheme } from 'styled-components';
import { ResponsiveTreeMap } from '@nivo/treemap'

const TreeMap = ({ data }) => {
    const theme = useTheme()

    return (
        <ResponsiveTreeMap
            theme={theme.chart}
            colors={theme.chart.colors}
            data={data}
            identity='name'
            value='cp'
            valueFormat=' >-.2s'
            leavesOnly
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            labelSkipSize={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
            parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
        />
    )
}

export default TreeMap