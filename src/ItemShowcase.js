import React from 'react';
import { Card, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import data from './item.json'

class ItemShowcase extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFolded: false,
        }
    }

    renderCard(item) {
        return (
            <Card key={item.id}>
                <Card.Header>
                    <Card.Img
                        src={'./img/item_' + item.id + '.png'}
                        alt=''
                    />
                    <Card.Title>
                        {item.name}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table
                        striped
                        borderless
                        size="sm"
                        className='card-table'
                    >
                        <tbody>
                            {item.drop.map((drop, idx) => {
                                return (
                                    <tr key={'stage' + idx.toString()}>
                                        <th>
                                            {drop.chapter + '-' + drop.stage}
                                        </th>
                                        <th>{drop.rarity}</th>
                                        <th>
                                            <img
                                                src='./img/energy.png'
                                                className='card-table-img'
                                                alt='體力消耗'
                                            />
                                            {drop.energy}
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }

    render() {
        return (
            <div className='card-container'>
                <div className='container-sizer' />
                <div className='gutter-sizer' />
                {data.map((item) => {
                    return this.renderCard(item)
                })}
            </div>
        )
    }
}

export default ItemShowcase;