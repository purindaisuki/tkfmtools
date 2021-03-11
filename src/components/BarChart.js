import React from 'react';
import { useTheme } from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ xAxisText, yAxisText, data, sm }) => {
    const theme = useTheme()
    const { exp, ...rest } = data[0]

    return (
        <ResponsiveBar
            theme={theme.chart}
            data={data}
            indexBy='exp'
            keys={Object.keys(rest)}
            margin={{ top: 10, right: 40, bottom: sm ? 60 : 100, left: sm ? 60 : 90 }}
            padding={0.3}
            layout={sm ? 'vertical' : 'horizontal'}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={theme.chart.colors}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: sm ? 45 : 0,
                legend: xAxisText,
                legendPosition: 'middle',
                legendOffset: 44
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yAxisText,
                legendPosition: 'middle',
                legendOffset: sm ? -40 : -80
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: sm ? 'top-right' : 'bottom',
                    direction: sm ? 'column' : 'row',
                    justify: false,
                    translateX: sm ? 40 : 0,
                    translateY: sm ? 0 :80,
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