import React, { useContext } from 'react';
import styled from 'styled-components';
import Head from 'components/Head';
import RadarChart from 'components/RadarChart';
import BarChart from 'components/BarChart';
import { LanguageContext } from 'components/LanguageProvider';
import expData from 'gamedata/exp.json'

const calcLvStats = (names, array) => {
    const len = array.length
    const mid = Math.floor(len / 2)
    return ({
        name: names[0],
        [names[1]]: len === 0 ? 0 : array[len - 1],
        [names[2]]: len === 0 ? 0 : Math.round(array.reduce((a, b) => a + b, 0) * 10 / len) / 10,
        [names[3]]: len === 0 ? 0 : len % 2 ? array[mid] : (array[mid - 1] + array[mid]) / 2,
        [names[4]]: len === 0 ? 0 : array[0]
    })
}

const lvToExp = (lv) => expData.slice(0, lv).reduce((a, b) => a + b.exp, 0)

const parseState = (state, tags, chart) => {
    const validChars = state ? state.filter(c => c.exist && c.level !== 0) : []
    validChars.sort((a, b) => a.level - b.level)

    validChars.forEach(c => c.exp = lvToExp(c.level))
    const radarDataByPosition = [...Array(5)].map(i => [])
    const radarDataByAttribute = [...Array(5)].map(i => [])
    const barDataByPosition = [...Array(12)].map((a, i) => {
        const data = { exp: i * 50 + 'k~' }
        tags.slice(5, 10).forEach(t => data[t] = 0)
        return data
    })
    const barDataByAttribute = [...Array(12)].map((a, i) => {
        const data = { exp: i * 50 + 'k~' }
        tags.slice(0, 5).forEach(t => data[t] = 0)
        return data
    })
    validChars.forEach(c => {
        radarDataByPosition[c.position].push(c.level)
        radarDataByAttribute[c.attribute].push(c.level)
        barDataByPosition[Math.floor((c.exp) / 50000)][tags[c.position + 5]]++
        barDataByAttribute[Math.floor((c.exp) / 50000)][tags[c.attribute]]++
    })

    return ({
        radarDataByPosition: radarDataByPosition
            .map((group, idx) => calcLvStats([tags[idx + 5], ...chart[0].legend], group)),
        radarDataByAttribute: radarDataByAttribute
            .map((group, idx) => calcLvStats([tags[idx], ...chart[1].legend], group)),
        barDataByPosition: barDataByPosition,
        barDataByAttribute: barDataByAttribute,
    })
}

const ChartsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const ChartWrapper = styled.div`
    height: 400px;
    width: 50%;
    margin-bottom: 4rem;
    @media screen and (max-width: 992px) {
        width: 100%;
    }
`
const ChartHeader = styled.div`
    display: flex;
    justify-content: center;
`
const Analysis = ({ pageState }) => {
    const { pageString, charString } = useContext(LanguageContext)

    const data = parseState(pageState, charString.tags, pageString.analysis.result.chart)

    return (
        <>
            <Head
                title={pageString.analysis.result.helmet.title}
                description={pageString.analysis.result.helmet.description}
                path='/analysis/result/'
            />
            <ChartsContainer>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[0].title}</ChartHeader>
                    <RadarChart data={data.radarDataByPosition} />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[1].title}</ChartHeader>
                    <RadarChart data={data.radarDataByAttribute} />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[2].title}</ChartHeader>
                    <BarChart
                        yAxisText={pageString.analysis.result.chart[2].legend[0]}
                        xAxisText={pageString.analysis.result.chart[2].legend[1]}
                        data={data.barDataByPosition}
                    />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[3].title}</ChartHeader>
                    <BarChart
                        yAxisText={pageString.analysis.result.chart[3].legend[0]}
                        xAxisText={pageString.analysis.result.chart[3].legend[1]}
                        data={data.barDataByAttribute}
                    />
                </ChartWrapper>
            </ChartsContainer>
        </>
    )
}

export default Analysis