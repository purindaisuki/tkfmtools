import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import SwitchableShowcase from './SwitchableShowcase';
import MyMasonry from './MyMasonry';
import MyAccordion from './MyAccordion';
import CardTable from './CardTable';
import itemDropData from '../gamedata/itemDrop.json';
import { LanguageContext } from './LanguageProvider';

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
const ItemCardHeader = (props) => {
    const { itemString } = React.useContext(LanguageContext)

    return (
        <>
            <ItemImg
                src={`${process.env.PUBLIC_URL}/img/item_${props.id}.png`}
                alt=''
            />
            <StyledHeader>
                {itemString.name[props.name]}
            </StyledHeader>
        </>
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
            align-items: center;
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
    position: absolute;
    right: 0;
    top: -4rem;
`
const BtnWrapper = styled.span`
    > button {
        padding: .4rem .6rem;
        margin-left: .6rem;
        background-color: ${props => (
        props.$active
            ? props.theme.colors.secondary
            : 'lightgray'
    )};
    }
    > button:hover {
        background-color: ${props => props.theme.colors.secondary};
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
                            name={item.name}
                        />
                    }
                    body={
                        <CardTable>
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

export default function ItemShowcase() {
    return (
        <SwitchableShowcase
            localLayoutConfig='potential-item-layout'
            layoutSwitcher={<LayoutSwitcher />}
            items={[
                { layout: 'Masonry', content: <ItemMasonry /> },
                { layout: 'Table', content: <div /> },
            ]}
        />
    )
}
