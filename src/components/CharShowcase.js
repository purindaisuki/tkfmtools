import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import MyMasonry from './MyMasonry';
import MyAccordion from './MyAccordion';
import { ItemCardBody } from './ItemShowcase'
import { SortableTable } from './FilterComponents';
import charTagData from '../gamedata/characterTags.json';
import { LanguageContext } from './LanguageProvider';
import {
    TypeIcon,
    CategoryIcon,
    RaceIcon,
    BodysizeIcon,
    OppaiIcon,
    RankIcon,
    ElseIcon,
    MasonryViewIcon,
    TableViewIcon
} from './icon';

const TextWrapper = styled.div`
    display: flex;
    align-items: ${props => props.$lang === 'en'
        ? 'flex-end'
        : 'flex-start'
    };
    @media screen and (max-width: 490px) {
        align-items: flex-end;
    }
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-width: 10rem;
    height: 3.6rem;
    background-image: url(${props => props.$img});
    background-repeat: no-repeat;
    background-size: 6rem 6rem;
    background-position: 0 -1.6rem;
    > div {
        ${props => props.$lang === 'en'
            ? 'margin-right: 1rem'
            : 'margin-left: 6rem'
        };
        transition: all 355ms ease;
        text-shadow: 0 0 1px ${props => props.theme.colors.surface},
        -2px 0 1px  ${props => props.theme.colors.surface},
        2px 0 1px  ${props => props.theme.colors.surface},
        0 -2px 1px ${props => props.theme.colors.surface},
        0 2px 1px  ${props => props.theme.colors.surface},
        2px 2px 1px ${props => props.theme.colors.surface},
        2px -2px 1px ${props => props.theme.colors.surface},
        -2px 2px 1px ${props => props.theme.colors.surface},
        -2px -2px 1px ${props => props.theme.colors.surface};
        @media screen and (max-width: 490px) {
            margin-left: 0;
            margin-right: 1rem;
        }
    }
`
const CardHeader = (props) => {
    const { userLanguage } = React.useContext(LanguageContext)

    return (
        <>
            <TextWrapper
                $img={`${process.env.PUBLIC_URL}/img/char_small_${props.id}.png`}
                $lang={userLanguage}
            >
                <div>{props.name.split(' ').slice(0, -1).join(' ')}</div>
                <div>{props.name.split(' ').slice(-1)[0]}</div>
            </TextWrapper>
        </>
    )
}

const TagWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const IconWrapper = styled.div`
    margin-bottom: .1rem;
    margin-left: .25rem;
    margin-right: .4rem;
    > svg {
        width: 1.2rem;
        fill: ${props => props.theme.colors.secondary};
        color:  ${props => props.theme.colors.secondary};
    }
`
const CardBody = (props) => {
    const { charString } = React.useContext(LanguageContext)

    const attrIcons = {
        type: TypeIcon,
        category: CategoryIcon,
        race: RaceIcon,
        body: BodysizeIcon,
        oppai: OppaiIcon,
        rank: RankIcon,
        else: ElseIcon
    }

    if (!charTagData[props.id].available) {
        return (
            <ItemCardBody>
                <tbody><tr><td>
                    {charString.tagWarnMsg}
                </td></tr></tbody>
            </ItemCardBody>
        )
    }

    return (
        <ItemCardBody>
            <tbody>
                {Object.entries(charTagData[props.id]).map((entry, idx) => {
                    if (
                        entry[0] === 'name' ||
                        entry[0] === 'grade' ||
                        entry[0] === 'available'
                    ) {
                        return true
                    }
                    if (entry[0] === 'else') {
                        return (
                            entry[1].map((tag, i) => (
                                <tr key={idx + i + 1}>
                                    <td>
                                        <TagWrapper>
                                            <IconWrapper>
                                                {attrIcons[entry[0]]}
                                            </IconWrapper>
                                            {charString.tags[tag]}
                                        </TagWrapper>
                                    </td>
                                </tr>
                            ))
                        )
                    }

                    if (entry[1].length !== 0) {
                        return (
                            <tr key={idx}>
                                <td>
                                    <TagWrapper>
                                        <IconWrapper>
                                            {attrIcons[entry[0]]}
                                        </IconWrapper>
                                        {charString.tags[entry[1]]}
                                    </TagWrapper>
                                </td>
                            </tr>
                        )
                    } else {
                        return true
                    }
                })}
            </tbody>
        </ItemCardBody>
    )
}

const AccordionWrapper = styled.div`
    margin-bottom: 1rem;
    > .MuiAccordion-root {
        background-color: ${props => props.theme.colors.surface};
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: .25rem;
        box-shadow: 0 0 .15em lightgray;
        > .MuiAccordionSummary-root,
        > .MuiAccordionSummary-root.Mui-expanded {
            padding: 0;
            border-radius: .25rem;
            > .MuiAccordionSummary-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                overflow: hidden;
                border-radius: .25rem;
                padding: 0;
                margin: 0;
            }
        }
        > .MuiAccordionSummary-root {
            border-bottom: 0px solid ${props => props.theme.colors.border};
        }
        > .MuiAccordionSummary-root.Mui-expanded {
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom: 1px solid ${props => props.theme.colors.border};
        }
        > .MuiCollapse-container {
            border-radius: .2rem;
            > div > div > div > .MuiAccordionDetails-root {
                margin: 0;
                padding: 0;
            }
        }
    }
`
const CharCard = (props) => {
    const [isExpanded, setExpanded] = React.useState(false)

    return (
        <AccordionWrapper>
            <MyAccordion
                expanded={isExpanded}
                onChange={() => setExpanded(!isExpanded)}
                square={false}
                title={props.header}
                content={props.body}
            />
        </AccordionWrapper>
    )
}

const SortTh = styled.th`
    position: sticky;
    top: 0;
    cursor: pointer;
    user-select: none;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.onSecondary};
    &:after {
        content: '${props => {
            if (!props.direction) return
            return props.direction === 'asc' ? ' \\25B2' : ' \\25BC'
        }}';
    }
`
const TableContent = (props) => {
    const { charString } = React.useContext(LanguageContext)

    const gradeToRarity = (grade) => (
        grade === 0 ? 'N'
            : grade === 1 ? 'R'
                : grade === 2 ? 'SR'
                    : 'SSR'
    )

    const TableHeader = () => (
        <thead>
            <tr>
                {charString
                    .tagAttributes.map((attr, idx) => {
                        const key = Object.keys(attr)[0]
                        const val = Object.values(attr)[0]
                        return (
                            <SortTh
                                onClick={() => props.requestSort(key)}
                                direction={props.getSortDirection(key)}
                                key={idx}
                                nowrap='nowrap'
                            >
                                {val}
                            </SortTh>
                        )
                    })}
            </tr>
        </thead>
    )

    return (
        <>
            <TableHeader />
            <tbody>
                {props.sortedResult.map(char => {
                    if (!char.available) {
                        return (
                            <tr key={char.name}>
                                <td>
                                    <CardHeader
                                        id={char.name + 1}
                                        name={charString.name[char.name]}
                                    />
                                </td>
                                <td>
                                    {gradeToRarity(char.grade)}
                                </td>
                                <td>
                                    {charString.tags[char.type]}
                                </td>
                                <td>
                                    {charString.tags[char.category]}
                                </td>
                                <td colSpan='5'>
                                    {charString.tagWarnMsg}
                                </td>
                            </tr>
                        )
                    }

                    return (
                        <tr key={char.name}>
                            {Object.entries(char).map((entry, j) => {
                                if (entry[0] === 'available') {
                                    return true
                                }
                                if (entry[0] === 'name') {
                                    return (
                                        <td key={j}>
                                            <CardHeader
                                                id={char.name + 1}
                                                name={
                                                    charString
                                                        .name[char.name]
                                                }
                                            />
                                        </td>
                                    )
                                }
                                if (entry[0] === 'grade') {
                                    return (
                                        <td key={j}>
                                            {gradeToRarity(entry[1])}
                                        </td>
                                    )
                                }
                                if (entry[0] === 'else') {
                                    return (
                                        <td key={j} nowrap='nowrap'>
                                            {entry[1].map(tag => (
                                                charString.tags[tag]
                                            )).join(', ')}
                                        </td>
                                    )
                                }

                                let tag
                                if (entry[1].length === 0) {
                                    tag = '-'
                                } else {
                                    tag = charString.tags[entry[1]]
                                }
                                return <td key={j} nowrap='nowrap'>{tag}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </>
    )
}

const TableWrapper = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    height: calc(100vh - 12rem);
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 1rem;
        height: 1rem;
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-thumb {
        background: lightgray;
        border-radius: .25rem;
    }
    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.surface};
    }
    &::-webkit-scrollbar-corner {
        background: ${props => props.theme.colors.surface};
    }
    > table {
        width: 100%;
        color: ${props => props.theme.colors.onSurface};
        thead {
            width: 100%;
            th {
                padding: .75rem .25rem;
            }
            th:first-child {
                padding-left: .75rem;
            }
        }
        tbody {
            tr {
                border-bottom: 1px solid ${props => props.theme.colors.secondary};
            }
            td {
                vertical-align: middle;
            }
        }
        @media screen and (min-width: ${props => (
        props.$lang === 'en'
            ? '1300'
            : '900'
    )}px) {
            td:first-child > div {
                flex-direction: row;
                align-items: center;
                justify-content: ${props => (
        props.$lang === 'en'
            ? 'flex-end'
            : 'flex-start'
    )};
                > div:last-child {
                    margin-left: ${props => (
        props.$lang === 'en'
            ? '-.8rem'
            : '.5rem'
    )};
                }
            }
        }
    }
`
const CharTable = () => {
    const { userLanguage } = React.useContext(LanguageContext)

    const sortFunc = (sortableItems, sortConfig) => {
        sortableItems.sort((a, b) => {
            let aKey
            let bKey
            if (sortConfig.key === 'else') {
                aKey = a[sortConfig.key].join('')
                bKey = b[sortConfig.key].join('')
            } else {
                aKey = a[sortConfig.key]
                bKey = b[sortConfig.key]
            }
            if (aKey < bKey) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (aKey > bKey) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
            return 0
        })
    }

    return (
        <TableWrapper
            $lang={userLanguage}
        >
            <SortableTable
                sortFunc={sortFunc}
                defaultSortKey={'grade'}
                result={charTagData}
                striped={false}
            >
                <TableContent />
            </SortableTable>
        </TableWrapper>
    )
}

const ShowcaseContainer = styled.div`
    display: ${props => props.$hidden ? 'none' : 'block'}
`
const LayoutBtnContainer = styled.div`
    position: absolute;
    right: 0;
    top: -4rem;
    @media screen and (max-width: 410px) {
        font-size: 0;
    }
`
const StyledBtn = styled(IconButton)`
    padding: .75rem .5rem;
    svg {
        fill: ${props => (
        props.$active
            ? props.theme.colors.secondary
            : props.theme.colors.onSurface
    )};
        width: 1.6rem;
        height: 1.6rem;
    }
    &:hover {
        svg {
            fill: ${props => props.theme.colors.secondary};
            width: 1.6rem;
            height: 1.6rem;
        }
    }
`
export default function CharShowcase() {
    const { pageString, charString } = React.useContext(LanguageContext)
    const characters = charString.name

    const getDefaultLayout = () => {
        const localSetting = localStorage.getItem('enlist-character-layout')
        return localSetting ? localSetting : 'Masonry'
    }
    const [layout, setLayout] = React.useState(getDefaultLayout)

    const handleLayoutChange = (toLayout) => () => {
        setLayout(toLayout)
        localStorage.setItem('enlist-character-layout', toLayout)
    }

    const breakpointColumnsConfig = {
        default: 6,
        1360: 5,
        1200: 4,
        992: 3,
        768: 2
    };

    return (
        <>
            <LayoutBtnContainer>
                {pageString.enlist.layout}
                <StyledBtn
                    $active={layout === 'Masonry'}
                    onClick={handleLayoutChange('Masonry')}
                >
                    {MasonryViewIcon}
                </StyledBtn>
                <StyledBtn
                    $active={layout === 'Table'}
                    onClick={handleLayoutChange('Table')}
                >
                    {TableViewIcon}
                </StyledBtn>
            </LayoutBtnContainer>
            <ShowcaseContainer $hidden={layout !== 'Masonry'}>
                <MyMasonry
                    breakpointCols={breakpointColumnsConfig}
                >
                    {characters.slice(0, characters.length - 1).map((char, idx) => (
                        <CharCard
                            header={<CardHeader id={idx + 1} name={char} />}
                            body={<CardBody id={idx} />}
                            key={idx}
                        />
                    ))}
                </MyMasonry>
            </ShowcaseContainer>
            <ShowcaseContainer $hidden={layout !== 'Table'}>
                <CharTable>

                </CharTable>
            </ShowcaseContainer>
        </>
    )
}
