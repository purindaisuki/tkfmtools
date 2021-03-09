import React from 'react';
import { useTheme } from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ title, xAxisText, yAxisText, data }) => {
    const theme = useTheme()
    const { exp, ...rest } = data[0]

    return (
        <ResponsiveBar
            theme={theme.chart}
            data={data}
            indexBy='exp'
            keys={Object.keys(rest)}
            margin={{ top: 10, right: 40, bottom: 100, left: 80 }}
            padding={0.3}
            layout='horizontal'
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={theme.chart.colors}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: xAxisText,
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yAxisText,
                legendPosition: 'middle',
                legendOffset: -60
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 80,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: .8
                            }
                        }
                    ]
                }
            ]}
            animate
            motionStiffness={90}
            motionDamping={15}
        />
    )
}

export default BarChart