import React from 'react';
import { Accordion, Card, Table } from 'react-bootstrap';
import Masonry from 'masonry-layout';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import data from './item.json'

const StyleCard = styled(Card)`
  margin-bottom: 15px;
  width: calc((100% - 75px) / 6);
  box-shadow: .1rem .1rem .25em lightgray;
  @media (max-width: 1360px) {
    width: calc((100% - 60px) / 5);
  }
  @media (max-width: 1200px) {
    width: calc((100% - 45px) / 4);
  }
  @media (max-width: 992px) {
    width: calc((100% - 30px) / 3);
  }
  @media (max-width: 768px) {
    width: calc((100% - 15px) / 2);
  }
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
  font-size: 16px;
  font-weight: bold;
`
const StyledCardBody = styled(Card.Body)`
  padding: 0;
  > .show {
    position: relative;
    background-color: white;
    z-index: 1;
  }
  > .collapsing {
    z-index: 2;
    background-color: white;
  }
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

export default function ItemShowcase() {
  return (
    <div
      className='card-container'
      data-masonry='{
                    "columnWidth": ".container-sizer",
                    "gutter": ".gutter-sizer",
                    "itemSelector": ".card"
                  }'
    >
      <div className='container-sizer' />
      <div className='gutter-sizer' />
      {data.map((item) => {
        return (
          <Accordion defaultActiveKey="0" key={item.id}>
            <StyleCard>
              <Accordion.Toggle
                as={StyledCardHeader}
                eventKey="0"
                onClick={() => {
                  setTimeout(() => {
                    Masonry
                      .data(document.querySelector('.card-container'))
                      .layout()
                  }, 320)
                }}
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
    </div>
  )
}
