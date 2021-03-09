import React, { useContext } from 'react';
import styled from 'styled-components';
import Head from 'components/Head';
import RadarChart from 'components/RadarChart';
import { LanguageContext } from 'components/LanguageProvider';

const calcStats = (names, array) => {
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

const parseState = (state, tags, chart) => {
    const validChars = state ? state.filter(c => c.exist && c.level !== 0) : []
    validChars.sort((a, b) => a.level - b.level)

    const levelDataByPosition = [...Array(5)].map(i => [])
    const levelDataByAttribute = [...Array(5)].map(i => [])
    validChars.forEach(c => {
        levelDataByPosition[c.position].push(c.level)
        levelDataByAttribute[c.attribute].push(c.level)
    })

    return ({
        byPosistion: levelDataByPosition
            .map((group, idx) => calcStats([tags[idx + 5], ...chart[0].legend], group)),
        byAttribute: levelDataByAttribute
            .map((group, idx) => calcStats([tags[idx], ...chart[1].legend], group)),
    })
}

const ChartsContainer = styled.div`
    display: flex;
`
const ChartWrapper = styled.div`
    height: 400px;
    width: 50%;
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
                {pageString.analysis.result.chart.map((chart, idx) => (
                    <ChartWrapper>
                        <ChartHeader>{chart.title}</ChartHeader>
                        <RadarChart data={Object.values(data)[idx]} />
                    </ChartWrapper>
                ))}
            </ChartsContainer>
        </>
    )
}

export default Analysis