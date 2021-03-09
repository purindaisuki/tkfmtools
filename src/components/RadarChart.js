import React from 'react';
import { useTheme } from 'styled-components';
import { ResponsiveRadar } from '@nivo/radar';

const RadarChart = ({ data }) => {
    const theme = useTheme()
    const { name, ...rest } = data[0]

    return (
        <ResponsiveRadar
            theme={theme.chart}
            data={data}
            indexBy='name'
            keys={Object.keys(rest)}
            maxValue={60}
            margin={{ top: 10, right: 80, bottom: 100, left: 80 }}
            borderWidth={2}
            borderColor={{ from: 'color' }}
            gridLevels={3}
            gridShape='linear'
            gridLabelOffset={36}
            enableDots
            dotSize={8}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color' }}
            dotLabel='value'
            dotLabelYOffset={-12}
            colors={theme.chart.colors}
            fillOpacity={0.25}
            blendMode='multiply'
            animate
            motionConfig='wobbly'
            isInteractive
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateX: -60,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    symbolSize: 12,
                    symbolShape: 'circle',
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
        />
    )
}

export default RadarChart