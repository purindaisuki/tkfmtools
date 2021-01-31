import React from 'react';
import { Card, Table, ToggleButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import data from './item.json'

class ItemShowcase extends React.Component {
    render() {
        return (
            <div className='card-container'>
                <div className='container-sizer' />
                <div className='gutter-sizer' />
                {data.map((item) => {
                    const { name, id, drop } = item
                    return (
                        <Card key={id}>
                            <Card.Header>
                                <Card.Img
                                    src={'./img/item_' + id + '.png'}
                                    alt=''
                                />
                                <Card.Title>
                                    {name}
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
                                        {drop.map((drop, idx) => {
                                            const { chapter, stage, energy, rarity } = drop
                                            return (
                                                <tr key={'stage' + idx.toString()}>
                                                    <th>
                                                        {chapter + '-' + stage}
                                                    </th>
                                                    <th>{rarity}</th>
                                                    <th>
                                                        <img
                                                            src='./img/energy.png'
                                                            className='card-table-img'
                                                            alt='體力消耗'
                                                        />
                                                        {energy}
                                                    </th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default ItemShowcase;