import React from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import data from '../item.json'
import { LanguageContext } from './LanguageProvider';
import MyMasonry from './MyMasonry'
import MyAccordion from './MyAccordion';

const ImgWrapper = styled.img`
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
    const { stringData } = React.useContext(LanguageContext)

    return (
        <>
            <ImgWrapper
                src={`${process.env.PUBLIC_URL}/img/item_${props.id}.png`}
                alt=''
            />
            <StyledHeader>
                {stringData.items.name[props.name]}
            </StyledHeader>
        </>
    )
}

const EnergyIconWrapper = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`

const CardBodyContnet = (props) => {
    const { stringData } = React.useContext(LanguageContext)

    return (
        <tbody>
            {props.drop.map((drop, idx) => (
                <tr key={idx}>
                    <td>
                        {`${drop.chapter}-${drop.stage}`}
                    </td>
                    <td>{stringData.items.rarity[drop.rarity]}</td>
                    <td>
                        <EnergyIconWrapper
                            src={`${process.env.PUBLIC_URL}/img/energy.png`}
                            alt={stringData.potential.filter.tableHead[2]}
                        />
                        {drop.energy}
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

const StyledTable = styled(Table)`
  font-size: .9rem;
  color: ${props => props.theme.colors.onSurface};
  margin: 0;
  > tbody > tr > td {
    padding-left: .75rem;
  }
`

export const ItemCardBody = (props) => {
    return (
        <StyledTable
            striped
            borderless
            size="sm"
        >
            {props.children}
        </StyledTable>
    )
}

const AccordionWrapper = styled.div`
    margin-bottom: 1rem;
    > .MuiAccordion-root {
        background-color: ${props => props.theme.colors.surface};
        border: 1px solid ${props => props.theme.colors.border};
        border-radius: .25rem;
        box-shadow: 0 0 .15em lightgray;
        > .MuiAccordionSummary-root {
            border-bottom: 1px solid ${props => props.theme.colors.surface};
        }
        > .MuiAccordionSummary-root,
        > .MuiAccordionSummary-root.Mui-expanded {
            padding: .75rem 1.25rem;
            border-radius: .25rem;
            > .MuiAccordionSummary-content {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: .25rem;
                margin: 0;
            }
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

const ItemCard = (props) => {
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

export default function ItemShowcase() {
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
            {data.map((item, idx) => (
                item.drop.length === 0
                    ? true
                    : <ItemCard
                        key={idx}
                        header={
                            <ItemCardHeader
                                id={item.id}
                                name={item.name}
                            />
                        }
                        body={
                            <ItemCardBody>
                                <CardBodyContnet
                                    drop={item.drop}
                                />
                            </ItemCardBody>
                        }
                    />
            ))}
        </MyMasonry>
    )
}
