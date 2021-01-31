import React from 'react';
import { ToggleButton, ToggleButtonGroup, Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import data from './item.json'

class FilterPanel extends React.Component {
    render() {
        return (
            <div className='filter-panel'>
                <div className='filter-header'>
                    道具選擇
                    <svg id="delete-icon" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <g stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="butt" fill="none" strokeLinejoin="round">
                            <polyline points="15 4 15 18 5 18 5 4" />
                            <polyline points="18 4 2 4" />
                            <polyline points="8.2 15 8.2 7" />
                            <polyline points="11.8 15 11.8 7" />
                            <polyline points="8 1 12 1" />
                        </g>
                    </svg>
                </div>
                <ToggleButtonGroup
                    type="checkbox"
                    defaultValue={[]}
                    className="filter-button-group">
                    {data.map((item, idx) => {
                        return (
                            <ToggleButton
                                value={idx}
                                key={item.name}
                                variant='secondary'
                                style={{ borderRadius: '.25rem' }}>
                                <img
                                    src={'./img/item_' + item.id + '.png'}
                                    alt=''
                                />
                                {item.name}
                            </ToggleButton>
                        )
                    })}
                </ToggleButtonGroup>
            </div>
        )
    }
}
class ResultTable extends React.Component {
    render() {
        return (
            <Table
                striped
                borderless
                size="sm"
                className='result-table'
            >
                <thead>
                    <tr>
                        <th>關卡</th>
                        <th>稀有度</th>
                        <th>
                            <img
                                src='./img/energy.png'
                                className='card-table-img'
                                alt='體力消耗'
                            />
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </Table>
        )
    }
}

class ItemFilter extends React.Component {
    render() {
        return (
            <div className='filter-container'>
                <FilterPanel />
                <ResultTable />
            </div>
        )
    }
}

export default ItemFilter;