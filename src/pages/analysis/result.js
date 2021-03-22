import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useExport from 'hooks/useExport';

import { useLineupData } from 'containers/LineupDataProvider';
import { useLanguage } from 'containers/LanguageProvider';

import Head from 'components/Head';
import MyHeader from 'components/MyHeader';
import { ExportButton } from 'components/MyIconButton';
import ImageSupplier from 'components/ImageSupplier';
import TreeMap from 'components/TreeMap';
import RadarChart from 'components/RadarChart';
import BarChart from 'components/BarChart';
import MyModal, { TextModal } from 'components/MyModal';

import expData from 'data/exp.json';
import charData from 'data/character.json';
import userData from 'data/line_up_data.json';

// helper functions
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

const findIndex = (array, value) => {
    let low = 0, high = array.length
    while (low < high) {
        let mid = (low + high) >>> 1
        if (array[mid] <= value) low = mid + 1
        else high = mid
    }
    return low
}

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

const formatNumber = (num) => {
    // if num is 0 return 0
    const tier = Math.log10(Math.abs(num)) / 3 | 0;
    if (tier == 0) return num;

    const scaled = num / Math.pow(10, tier * 3);

    return scaled.toFixed(1) + SI_SYMBOL[tier];
}

const calcPR = (chars) => {
    if (chars.length === 0) return []

    const PRArray = chars.map(c => {
        const array = userData[c.id]
        return ({
            id: c.id,
            PR: Math.floor(
                (1 - (array.length - findIndex(array, c.cp) + .5) / (array.length + 1)) * 1000
            ) / 10,
            cp: c.cp
        })
    })
    PRArray.sort((a, b) => (a.PR - b.PR) !== 0 ? a.PR - b.PR : a.cp / 1000000 - b.cp / 1000000)
    // only need top 5 and bottom 5
    PRArray.splice(5, PRArray.length - 10)
    PRArray.forEach(c => { c.cp = formatNumber(c.cp) })
    // total PR
    const array = userData.total
    const totalCp = chars.reduce((a, c) => a + c.cp, 0)
    PRArray.push({
        id: 'total',
        PR: Math.floor(
            (1 - (array.length - findIndex(array, totalCp) + .5) / (array.length + 1)) * 1000
        ) / 10
    })

    return PRArray
}

const calcLineupStats = (state, string, chart) => {
    const validChars = state
        ? JSON.parse(JSON.stringify(state)).filter(c => c.owned && c.level !== 0)
        : []
    validChars.sort((a, b) => a.level - b.level)
    validChars.forEach(c => {
        c.exp = lvToExp(c.level)
        c.cp = c.ATK * c.HP
    })

    // initialize data
    const radarDataByPosition = [...Array(5)].map(i => [])
    const radarDataByAttribute = [...Array(5)].map(i => [])
    const barDataByPosition = [...Array(12)].map((a, i) => {
        const data = { exp: i * 50 + 'k-' }
        string.tags.slice(5, 10).forEach(t => data[t] = 0)
        return data
    })
    const barDataByAttribute = [...Array(12)].map((a, i) => {
        const data = { exp: i * 50 + 'k-' }
        string.tags.slice(0, 5).forEach(t => data[t] = 0)
        return data
    })
    const treeMapDataByAttribute = { name: 'root', children: [] }
    string.tags.slice(0, 5).forEach(t => treeMapDataByAttribute.children.push({
        name: t,
        children: []
    }))

    validChars.forEach(c => {
        radarDataByPosition[c.position].push(c.level)
        radarDataByAttribute[c.attribute].push(c.level)
        barDataByPosition[Math.floor((c.exp) / 50000)][string.tags[c.position + 5]]++
        barDataByAttribute[Math.floor((c.exp) / 50000)][string.tags[c.attribute]]++
        treeMapDataByAttribute.children[c.attribute].children.push({
            name: string.name[c.id],
            cp: c.cp
        })
    })

    return ({
        radarDataByPosition: radarDataByPosition
            .map((group, idx) => calcLvStats([string.tags[idx + 5], ...chart[2].legend], group)),
        radarDataByAttribute: radarDataByAttribute
            .map((group, idx) => calcLvStats([string.tags[idx], ...chart[3].legend], group)),
        barDataByPosition: barDataByPosition,
        barDataByAttribute: barDataByAttribute,
        treeMapDataByAttribute: treeMapDataByAttribute,
        PRArray: calcPR(validChars)
    })
}

const CharContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const CharImg = styled(ImageSupplier)`
    width: 60px;
    height: 60px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: 60px 60px;
    background-position: 0 0;
    margin-right: .4rem;
    margin-bottom: .4rem;
    border-radius: 100%;
    border: 2px solid ${props => props.$owned
        ? props.theme.colors.secondary
        : props.theme.colors.dropdownHover};
`
const CharCollectionBox = ({ lineup }) => {
    const { charString } = useLanguage()

    return (
        <CharContainer>
            {charData.map((c, idx) => {
                const owned = lineup && lineup[idx].owned && lineup[idx].level !== 0

                return (
                    <CharImg
                        key={idx}
                        name={`char_small_${c.id}`}
                        isBackground
                        grayscale={!owned}
                        alt={charString.name[c.id]}
                        $owned={owned}
                    />
                )
            })}
        </CharContainer>
    )
}

const StyledRankContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const RankCharWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    height: 60px;
    width: 70%;
    @media screen and (max-width: 600px) {
        width: 80%;
    }
    @media screen and (max-width: 400px) {
        width: 90%;
    }
    margin-top: .6rem;
    padding: 0 1rem;
    border-radius: 4rem;
    border: 2px solid ${props => props.theme.colors.rank[props.$rank]};
    > span {
        padding: .6rem;
        white-space: pre;
    }
    &:hover {
        box-shadow: inset 0 0 10rem 10rem 
            ${props => props.theme.colors.rank[props.$rank] + '1A'};
    }
`
const RankCharImg = styled(CharImg)`
    margin: 0;
    border-radius: 0;
    border: none;
`
const RankContainer = ({ rank, chars }) => {
    const { pageString, charString } = useLanguage()

    return (
        <StyledRankContainer>
            {chars.map((c, idx) => (
                <RankCharWrapper $rank={rank} key={idx}>
                    <RankCharImg
                        name={`char_small_${c.id}`}
                        isBackground
                        alt={charString.name[c.id]}
                        $owned
                        $rank={rank}
                    />
                    <span>{`${pageString.analysis.result.rank.cp}  ${c.cp}`}</span>
                    <span>{`${pageString.analysis.result.rank.PR}  ${c.PR}`}</span>
                </RankCharWrapper>
            ))}
        </StyledRankContainer>
    )
}

const StyledExportButton = styled(ExportButton)`
    &&{
        position: absolute;
        top: -4.4rem;
        right: 0;
    }
`
const ChartsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1rem;
    > div:nth-child(8), 
    > div:last-child {
        margin-bottom: 2rem;
    }
    @media screen and (max-width: 992px) {
        > div:nth-child(8) {
            margin-bottom: 4rem;
        }
        width: 100%;
    }
`
const ChartWrapper = styled.div`
    height: 400px;
    width: 50%;
    margin-bottom: 4rem;
    @media screen and (max-width: 992px) {
        width: 100%;
    }
`
const CollectionWrapper = styled(ChartWrapper)`
    height: 100%;
`
const ChartHeader = styled.div`
    display: flex;
    justify-content: center;
    font-size: large;
`
const TreeMapHeader = styled(MyHeader)`
    justify-content: center;
`
const RankHeader = styled(TreeMapHeader)`
    width: 100%;
`
const RankModal = styled(MyModal)`
    > div:nth-child(3) {
        top: 20%;
        width: 40%;
        @media screen and (max-width: 600px) {
            width: 80%;
        }
    }
`
const Analysis = () => {
    const { pageString, charString } = useLanguage()

    const { currentLineup } = useLineupData()

    const { isExporting, exportImage } = useExport()

    const [state, setState] = useState({
        isTreemapModalOpen: false,
        isRankModalOpen: false,
    })

    const componentRef = useRef()

    const handleTreemapModal = (boolean) => () => setState(state => ({
        ...state,
        isTreemapModalOpen: boolean
    }))

    const handleRankModal = (boolean) => () => setState(state => ({
        ...state,
        isRankModalOpen: boolean
    }))

    const handleExport = () => exportImage({
        componentRef: componentRef,
        fileName: 'tenkafuma-line-up-analysis-result'
    })

    const lineupStats = useMemo(() => calcLineupStats(
        currentLineup,
        charString,
        pageString.analysis.result.chart
    ), [currentLineup])

    const isSm = typeof window !== 'undefined'
        ? window.innerWidth < 600 : false

    return (
        <>
            <Head
                title={pageString.analysis.result.helmet.title}
                description={pageString.analysis.result.helmet.description}
                path='/analysis/result/'
            />
            <StyledExportButton onClick={handleExport} isLoading={isExporting} />
            <ChartsContainer ref={componentRef}>
                <CollectionWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[0].title}</ChartHeader>
                    <ChartHeader>
                        {`${currentLineup
                            ? currentLineup.filter(c => c.owned && c.level !== 0).length
                            : 0}/${charData.length}`}
                    </ChartHeader>
                    <CharCollectionBox lineup={currentLineup} />
                </CollectionWrapper>
                <ChartWrapper>
                    <TreeMapHeader
                        title={pageString.analysis.result.chart[1].title}
                        withHelp
                        onClickHelp={handleTreemapModal(true)}
                    />
                    <TreeMap
                        data={lineupStats.treeMapDataByAttribute}
                    />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[2].title}</ChartHeader>
                    <RadarChart data={lineupStats.radarDataByPosition} sm={isSm} />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[3].title}</ChartHeader>
                    <RadarChart data={lineupStats.radarDataByAttribute} sm={isSm} />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[4].title}</ChartHeader>
                    <BarChart
                        yAxisText={pageString.analysis.result.chart[4].legend[0]}
                        xAxisText={pageString.analysis.result.chart[4].legend[1]}
                        data={lineupStats.barDataByPosition}
                        sm={isSm}
                    />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[5].title}</ChartHeader>
                    <BarChart
                        yAxisText={pageString.analysis.result.chart[5].legend[0]}
                        xAxisText={pageString.analysis.result.chart[5].legend[1]}
                        data={lineupStats.barDataByAttribute}
                        sm={isSm}
                    />
                </ChartWrapper>
                <RankHeader
                    title={`${pageString.analysis.result.rank.title} ${lineupStats.PRArray[10]
                        ? lineupStats.PRArray[10].PR : '-'}`}
                    withHelp
                    onClickHelp={handleRankModal(true)}
                />
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.rank.high}</ChartHeader>
                    <RankContainer rank='high' chars={lineupStats.PRArray.slice(5, 10).reverse()} />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.rank.low}</ChartHeader>
                    <RankContainer rank='low' chars={lineupStats.PRArray.slice(0, 5)} />
                </ChartWrapper>
            </ChartsContainer>
            <TextModal
                title={pageString.analysis.result.helpModal.title}
                content={pageString.analysis.result.helpModal.content}
                open={state.isTreemapModalOpen}
                onClose={handleTreemapModal(false)}
                ariaLabelledby='treemap-modal-title'
                ariaDescribedby='treemap-modal-description'
            />
            <RankModal
                title={pageString.analysis.result.rank.PR}
                open={state.isRankModalOpen}
                onClose={handleRankModal(false)}
            >
                {pageString.analysis.result.rankModal.content}
            </RankModal>
        </>
    )
}

export default Analysis