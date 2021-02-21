import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Badge } from "react-bootstrap"
import SwitchableShowcase from './SwitchableShowcase';
import MyMasonry from './MyMasonry';
import MyAccordion from './MyAccordion';
import CardTable from './CardTable';
import { SortableTable, SortableTh, TableWrapper } from './FilterComponents';
import itemDropData from '../gamedata/itemDrop.json';
import stageDropData from '../gamedata/stageDrop.json';
import { LanguageContext } from './LanguageProvider';

const StyledCardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const ItemImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: .4rem;
  user-select: none;
`
const StyledHeader = styled.div`
  white-space: nowrap;
  font-size: medium;
  font-weight: normal;
`
const ItemCardHeader = ({
    className,
    id
}) => {
    const { itemString } = React.useContext(LanguageContext)

    return (
        <StyledCardHeader
            className={className}
        >
            <ItemImg
                src={`${process.env.PUBLIC_URL}/img/item_${id}.png`}
                alt=''
            />
            <StyledHeader>
                {itemString.name[id]}
            </StyledHeader>
        </StyledCardHeader>
    )
}

const EnergyIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`
const CardBodyContnet = (props) => {
    const { pageString, itemString } = React.useContext(LanguageContext)

    if (props.drop.length === 0) {
        return (
            <tbody><tr><td>
                {pageString.potential.overview.notAvailableMsg}
            </td></tr></tbody>
        )
    }

    return (
        <tbody>
            {props.drop.map((drop, idx) => (
                <tr key={idx}>
                    <td>
                        {`${drop.chapter}-${drop.stage}`}
                    </td>
                    <td>{itemString.rarity[drop.rarity]}</td>
                    <td>
                        <EnergyIcon
                            src={`${process.env.PUBLIC_URL}/img/energy.png`}
                            alt={pageString.potential.filter.tableHead[2]}
                        />
                        {drop.energy}
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

const ItemAccordion = styled(MyAccordion)`
    && {
        && {
            margin-bottom: 1rem;
        }
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: .25rem;
        box-shadow: 0 0 .15em lightgray;
        > .MuiAccordionSummary-root {
            padding: .75rem 1.25rem;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom: 0px solid ${props => props.theme.colors.border};
        }
        > .MuiAccordionSummary-root.Mui-expanded {
            border-bottom: 1px solid ${props => props.theme.colors.border};
        }
        .MuiAccordionSummary-content {
            display: flex;
            justify-content: center;
            margin: 0;
        }
        .MuiAccordionDetails-root {
            margin: 0;
            padding: 0;
        }
    }
`
const ItemCard = (props) => {
    const [isExpanded, setExpanded] = React.useState(false)

    return (
        <ItemAccordion
            expanded={isExpanded}
            onChange={() => setExpanded(!isExpanded)}
            square={false}
            title={props.header}
            content={props.body}
        />
    )
}

const LayoutBtnContainer = styled.div`
    margin-bottom : 1rem;
    > span:last-child button {
        margin: 0;
    }
`
const BtnWrapper = styled.span`
    > button {
        padding: .4rem .6rem;
        margin-right: .6rem;
        background-color: ${props => (
            props.$active
                ? props.theme.colors.secondary
                : 'lightgray'
        )};
        color: ${props => props.theme.colors.onSecondary};
    }
    > button:hover {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.onSecondary};
    }
`
const LayoutSwitcher = (props) => {
    const { pageString } = React.useContext(LanguageContext)
    return (
        <LayoutBtnContainer>
            <BtnWrapper
                $active={props.layout === 'Masonry'}
            >
                <Button
                    onClick={props.handleLayoutChange('Masonry')}
                >
                    {pageString.potential.overview.layout.byItem}
                </Button>
            </BtnWrapper>
            <BtnWrapper
                $active={props.layout === 'Table'}
            >
                <Button
                    onClick={props.handleLayoutChange('Table')}
                >
                    {pageString.potential.overview.layout.byStage}
                </Button>
            </BtnWrapper>
        </LayoutBtnContainer>
    )
}

const ItemMasonry = () => {
    const breakpointColumnsConfig = {
        default: 6,
        1360: 5,
        1200: 4,
        992: 3,
        768: 2
    };

    return (
        <MyMasonry
            breakpointCols={breakpointColumnsConfig}
        >
            {itemDropData.map((item, idx) => (
                <ItemCard
                    key={idx}
                    header={
                        <ItemCardHeader
                            id={item.id}
                        />
                    }
                    body={
                        <CardTable striped={true}>
                            <CardBodyContnet
                                drop={item.drop}
                            />
                        </CardTable>
                    }
                />
            ))}
        </MyMasonry>
    )
}

const StyledTh = styled(SortableTh)`
    background-color:  ${props => props.theme.colors.secondary};
    color:  ${props => props.theme.colors.onSecondary};
    white-space: nowrap;
    ${props => props.$sortable ? true : 'cursor: default;'}
`
const ItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    margin-right: .8rem;
    div {
        font-size: 1rem;
    }
    img {
        width: 2rem;
        height: 2rem;
    }
`
const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    > div:last-child {
        margin: 0;
    }
`
const StyledBadge = styled(Badge)`
    background-color: lightgray;
    color: black;
    margin-left: .4rem;
`
const TableContent = (props) => {
    const { pageString, itemString } = React.useContext(LanguageContext)

    const TableHeader = () => (
        <thead>
            <tr>
                {Object.entries(pageString.potential.overview.tableHead)
                    .map((entry, idx) => {
                        const sortable = entry[0] === 'stage' || entry[0] === 'energy'
                        let requestSort
                        let getSortDirection
                        if (sortable) {
                            requestSort = () => props.requestSort(entry[0])
                            getSortDirection = props.getSortDirection(entry[0])
                        }

                        return (
                            <StyledTh
                                onClick={requestSort}
                                direction={getSortDirection}
                                key={idx}
                                $sortable={sortable}
                            >
                                {entry[1]}
                            </StyledTh>
                        )
                    })}
            </tr>
        </thead>
    )

    const TableBody = () => (
        <tbody>
            {props.sortedResult.map((stage, idx) => {
                const itemTd = (items) => (
                    <td>
                        <ItemsContainer>
                            {items.length === 0
                                ? undefined
                                : items.map((item, i) => (
                                    <ItemWrapper key={i}>
                                        <ItemCardHeader id={item.id} />
                                        <StyledBadge pill>
                                            {itemString.rarity[item.rarity]}
                                        </StyledBadge>
                                    </ItemWrapper>
                                ))}
                        </ItemsContainer>
                    </td>
                )

                return (
                    <tr key={idx}>
                        <td>
                            {`${stage.chapter}-${stage.stage}`}
                        </td>
                        {itemTd(stage.materials)}
                        {itemTd(stage.trainItems)}
                        {itemTd(stage.expPotions)}
                        <td>{stage.energy}</td>
                    </tr>
                )
            })}
        </tbody>
    )

    return (
        <>
            <TableHeader />
            <TableBody />
        </>
    )
}

const ItemTableWrapper = styled(TableWrapper)`
    overflow-x: auto;
    height: calc(100vh - 14.5rem);
`
const ItemTable = () => {
    const sortFunc = (sortableItems, sortConfig) => {
        const toStageKey = key => {
            return (
                parseInt(key.chapter) * 1000 +
                parseInt(key.stage.split(' ')[0]) * 10 +
                (key.stage.includes('free') ? 1 : 0) +
                (key.stage.includes('-') ? parseInt(key.stage.split('-')[1]) : 0)
            )
        }

        sortableItems.sort((a, b) => {
            let aKey
            let bKey
            if (sortConfig.key === 'stage') {
                aKey = toStageKey(a)
                bKey = toStageKey(b)
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
        <ItemTableWrapper>
            <SortableTable
                sortFunc={sortFunc}
                defaultSortKey={'stage'}
                result={stageDropData}
                striped={false}
                border={true}
            >
                <TableContent />
            </SortableTable>
        </ItemTableWrapper>
    )
}

export default function ItemShowcase() {
    return (
        <SwitchableShowcase
            localLayoutConfig='potential-item-layout'
            layoutSwitcher={<LayoutSwitcher />}
            items={[
                { layout: 'Masonry', content: <ItemMasonry /> },
                { layout: 'Table', content: <ItemTable /> },
            ]}
        />
    )
}
