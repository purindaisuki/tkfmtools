import React from 'react';
import { Accordion, Card, Table } from 'react-bootstrap';
import Masonry from 'react-masonry-css'
import styled from 'styled-components';
import data from './item.json'

const StyleCard = styled(Card)`
  margin-bottom: 1rem;
  box-shadow: .1rem .1rem .25em lightgray;
`
const StyledCardHeader = styled(Card.Header)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`
const StyledCardImg = styled(Card.Img)`
  width: 40px; height: 40px;
`
const StyledCardTitle = styled(Card.Title)`
  white-space: nowrap;
  font-size: large;
  font-weight: bold;
  margin-bottom: none;
`
const StyledCardBody = styled(Card.Body)`
  padding: 0;
`
const CardTable = styled(Table)`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  > tbody > tr > td {
    padding-left: .75rem;
  }
`
const CardTableImg = styled.img`
  width: 16px;
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
          <Accordion defaultActiveKey="0" key={item.id}>
            <StyleCard>
              <Accordion.Toggle
                as={StyledCardHeader}
                eventKey="0"
              >
                <StyledCardImg
                  src={`./img/item_${item.id}.png`}
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
                                src='./img/energy.png'
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
          </Accordion>
        )
      })}
    </StyledMasonry>
  )
}
