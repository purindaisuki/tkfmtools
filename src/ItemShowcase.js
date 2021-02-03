import React from 'react';
import { Accordion, Card, Table } from 'react-bootstrap';
import Masonry from 'react-masonry-css'
import styled from 'styled-components';
import data from './item.json'

const StyleCardContainer = styled(Accordion)`
  box-shadow: 0 0 .15em lightgray;
  border-radius: .25rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  > .card:first-of-type {
    border-radius: .25rem;
  }
  &:hover {
    box-shadow: 0 0 .25em ${props => props.theme.colors.shadow};
  }
`

const StyleCard = styled(Card)`
  border: none;
  background-color: ${props => props.theme.colors.surface};
`
const StyledCardHeader = styled(Card.Header)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: ${props => props.theme.colors.onSurface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`
const StyledCardImg = styled(Card.Img)`
  width: 2.5rem; height: 2.5rem;
  user-select: none;
`
const StyledCardTitle = styled(Card.Title)`
  white-space: nowrap;
  font-size: medium;
  font-weight: normal;
  margin-bottom: none;
`
const StyledCardBody = styled(Card.Body)`
  padding: 0;
`
const CardTable = styled(Table)`
  font-size: .9rem;
  color: ${props => props.theme.colors.onSurface};
  margin: 0;
  > tbody > tr > td {
    padding-left: .75rem;
  }
`
const CardTableImg = styled.img`
  width: 1.2rem; height: 1.2rem;
`
const StyledMasonry = styled(Masonry)`
  display: flex;
  width: auto;
  margin-left: -1rem;
  > div {
    padding-left: 1rem;
    background-clip: padding-box;
  }
`
const breakpointColumnsConfig = {
  default: 6,
  1360: 5,
  1200: 4,
  992: 3,
  768: 2
};

export default function ItemShowcase() {
  return (
    <StyledMasonry
      breakpointCols={breakpointColumnsConfig}
      columnClassName=''
    >
      {data.map((item) => {
        return (
          <StyleCardContainer defaultActiveKey="0" key={item.id}>
            <StyleCard>
              <Accordion.Toggle
                as={StyledCardHeader}
                eventKey="0"
              >
                <StyledCardImg
                  src={`/img/item_${item.id}.png`}
                  alt=''
                />
                <StyledCardTitle>
                  {item.name}
                </StyledCardTitle>
              </Accordion.Toggle>
              <StyledCardBody>
                <Accordion.Collapse eventKey="0">
                  <CardTable
                    striped
                    borderless
                    size="sm"
                    className='card-table'
                  >
                    <tbody>
                      {item.drop.map((drop, idx) => {
                        return (
                          <tr key={idx}>
                            <td>
                              {`${drop.chapter}-${drop.stage}`}
                            </td>
                            <td>{drop.rarity}</td>
                            <td>
                              <CardTableImg
                                src='/img/energy.png'
                                alt='體力消耗'
                              />
                              {drop.energy}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </CardTable>
                </Accordion.Collapse>
              </StyledCardBody>
            </StyleCard>
          </StyleCardContainer>
        )
      })}
    </StyledMasonry>
  )
}
