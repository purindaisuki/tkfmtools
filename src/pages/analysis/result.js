import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Button } from '@material-ui/core';
import TreeMap from 'components/TreeMap';
import RadarChart from 'components/RadarChart';
import BarChart from 'components/BarChart';
import Head from 'components/Head';
import FixedImageSupplier from 'components/FixedImageSupplier';
import MyHeader from 'components/MyHeader';
import { TextModal } from 'components/MyModal';
import { LanguageContext } from 'components/LanguageProvider';
import expData from 'gamedata/exp.json'
import charData from 'gamedata/character.json'

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

const parseState = (state, string, chart) => {
    const validChars = state ? state.filter(c => c.owned && c.level !== 0) : []
    validChars.sort((a, b) => a.level - b.level)
    validChars.forEach(c => c.exp = lvToExp(c.level))

    // initialize data
    const radarDataByPosition = [...Array(5)].map(i => [])
    const radarDataByAttribute = [...Array(5)].map(i => [])
    const barDataByPosition = [...Array(12)].map((a, i) => {
        const data = { exp: i * 50 + 'k~' }
        string.tags.slice(5, 10).forEach(t => data[t] = 0)
        return data
    })
    const barDataByAttribute = [...Array(12)].map((a, i) => {
        const data = { exp: i * 50 + 'k~' }
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
            cp: c.ATK * c.HP
        })
    })

    return ({
        radarDataByPosition: radarDataByPosition
            .map((group, idx) => calcLvStats([string.tags[idx + 5], ...chart[2].legend], group)),
        radarDataByAttribute: radarDataByAttribute
            .map((group, idx) => calcLvStats([string.tags[idx], ...chart[3].legend], group)),
        barDataByPosition: barDataByPosition,
        barDataByAttribute: barDataByAttribute,
        treeMapDataByAttribute: treeMapDataByAttribute
    })
}

const BtnWrapper = styled.span`
    position: absolute;
    right: 0;
    top: -4rem;
    && > button {
        padding: .4rem .6rem;
        background-color: ${props => props.theme.colors.blue};
        color: ${props => props.theme.colors.onBlue};
    }
    > button:hover {
        box-shadow: inset 0 0 10rem 10rem rgba(255, 255, 255, 0.25);
    }
`
const StyledButton = ({ children, onClick }) => (
    <BtnWrapper>
        <Button onClick={onClick}>
            {children}
        </Button>
    </BtnWrapper>
)

const CharContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const CharImgWrapper = styled(FixedImageSupplier)`
    width: 4rem;
    margin-right: .4rem;
    margin-bottom: .4rem;
    border-radius: 100%;
    border: 2px solid ${props => props.$owned
        ? props.theme.colors.secondary
        : props.theme.colors.dropdownHover};
`
const CharCollectionBox = ({ state }) => {
    const { charString } = useContext(LanguageContext)
    const owned = state && state[idx].owned && state[idx].level !== 0

    return (
        <CharContainer>
            {charData.map((c, idx) => (
                <CharImgWrapper
                    key={idx}
                    name={`char_xsmall_${c.id}${owned ? '' : '_gs'}`}
                    alt={charString.name[c.id]}
                    $owned={owned}
                />
            ))}
        </CharContainer>
    )
}

const ChartsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1rem;
    > div:nth-child(5), 
    > div:last-child {
        margin-bottom: 2rem;
    }
    @media screen and (max-width: 992px) {
        > div:nth-child(5) {
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
    border: none;
`
const Analysis = ({ pageState }) => {
    const { pageString, charString } = useContext(LanguageContext)

    const [isModalOpen, setModalOpen] = useState(false)

    const theme = useTheme()

    const componentRef = useRef()
    const exporterRef = useRef()

    useEffect(() => {
        React.lazy(import('components/ImageExporter')
            .then(module => exporterRef.current = module.exportAsJPG))
    }, [])

    const handleModal = (boolean) => () => setModalOpen(boolean)

    const handleExport = () => {
        if (exporterRef.current) {
            exporterRef.current(
                componentRef,
                'tenkafuma-line-up-analysis-result',
                theme.colors.background
            )
        }
    }

    const data = parseState(
        pageState,
        charString,
        pageString.analysis.result.chart
    )

    const isSm = typeof (window) !== 'undefined'
        ? window.innerWidth < 600 : false

    return (
        <>
            <Head
                title={pageString.analysis.result.helmet.title}
                description={pageString.analysis.result.helmet.description}
                path='/analysis/result/'
            />
            <StyledButton onClick={handleExport}>
                {pageString.analysis.result.exportButton}
            </StyledButton>
            <ChartsContainer ref={componentRef}>
                <CollectionWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[0].title}</ChartHeader>
                    <ChartHeader>
                        {`${pageState
                            ? pageState.filter(c => c.owned && c.level !== 0).length
                            : 0}/${charData.length}`}
                    </ChartHeader>
                    <CharCollectionBox state={pageState} />
                </CollectionWrapper>
                <ChartWrapper>
                    <TreeMapHeader
                        title={pageString.analysis.result.chart[1].title}
                        withHelp
                        onClickHelp={handleModal(true)}
                    />
                    <TreeMap
                        data={data.treeMapDataByAttribute}
                    />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[2].title}</ChartHeader>
                    <RadarChart data={data.radarDataByPosition} sm={isSm} />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[3].title}</ChartHeader>
                    <RadarChart data={data.radarDataByAttribute} sm={isSm} />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[4].title}</ChartHeader>
                    <BarChart
                        yAxisText={pageString.analysis.result.chart[4].legend[0]}
                        xAxisText={pageString.analysis.result.chart[4].legend[1]}
                        data={data.barDataByPosition}
                        sm={isSm}
                    />
                </ChartWrapper>
                <ChartWrapper>
                    <ChartHeader>{pageString.analysis.result.chart[5].title}</ChartHeader>
                    <BarChart
                        yAxisText={pageString.analysis.result.chart[5].legend[0]}
                        xAxisText={pageString.analysis.result.chart[5].legend[1]}
                        data={data.barDataByAttribute}
                        sm={isSm}
                    />
                </ChartWrapper>
            </ChartsContainer>
            <TextModal
                title={pageString.analysis.result.helpModal.title}
                content={pageString.analysis.result.helpModal.content}
                open={isModalOpen}
                onClose={handleModal(false)}
                ariaLabelledby='treemap-modal-title'
                ariaDescribedby='treemap-modal-description'
            />
        </>
    )
}

export default Analysis