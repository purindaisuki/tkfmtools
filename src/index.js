import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
    Navbar, Nav, ToggleButtonGroup, ToggleButton, Dropdown, DropdownButton
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Masonry from 'masonry-layout';
import ItemShowcase from './ItemShowcase';
import './index.css';
import stageData from './stages.json'

const itemRankData = ['一般初級', '一般中級', '一般高級', '高等高級']
const rarityData = ['罕見', '少見', '常見', '必定']

function FilterButton(props) {
    const [checked, setChecked] = useState(true)

    return (
        <ToggleButton
            type='checkbox'
            key={props.itemId}
            variant='secondary'
            checked={checked}
            id={props.itemId}
        >
            {props.itemText}
        </ToggleButton>
    )
}

class FilterPanel extends React.Component {
    renderItem(itemId, itemText) {
        return (
            <FilterButton itemText={itemText} itemId={itemId} />
        )
    }

    renderDropDown(itemId, itemTitle, itemList) {
        return (
            <DropdownButton
                as={ToggleButtonGroup}
                type='checkbox'
                key={itemId}
                id={`dropdown-variants-${itemId}`}
                variant='secondary'
                title={itemTitle}
            >
                {itemList.map((itemText, idx) => {
                    return (
                        <Dropdown.Item key={itemText} eventKey={idx}>
                            {itemText}
                        </Dropdown.Item>
                    )
                })}
            </DropdownButton>
        )
    }

    render() {
        return (
            <ToggleButtonGroup type='checkbox' className='filter-bar'>
                {this.renderItem('filter-all', '全部')}
                {this.renderItem('filter-material', '潛力材料')}
                {this.renderItem('filter-train', '調教道具')}
                {this.renderItem('filter-exp', '經驗藥水')}
                {this.renderDropDown('filter-rank', '素材等級', itemRankData)}
                {this.renderDropDown('filter-rarity', '稀有度', rarityData)}
                {this.renderItem('filter-stage', '章節關卡')}
            </ToggleButtonGroup>
        )
    }
}

class FilterableItemShowcase extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMaterialOn: true,
            isTrainOn: true,
            isExpOn: true,
            activeItemRank: itemRankData,
            activeRarity: rarityData,
            activeStages: stageData,
        }
    }

    handleBarClick() {

    }
    handleItemClick() {

    }

    render() {
        return (
            <div className='container'>
                <FilterPanel
                    onClick={() => this.handleBarClick()}
                />
                <ItemShowcase/>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <Navbar>
        <Navbar.Brand href="#">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
                viewBox="0 0 24 24"
            >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
        </Navbar.Brand>
        <Nav className='ml-auto'>
            <label className="color-mode-switch">
                <input type="checkbox" className="color-mode-checkbox" />
                <span className="slider"></span>
            </label>
        </Nav>
    </Navbar>,
    document.querySelector('#nav-bar')
)

ReactDOM.render(
    <FilterableItemShowcase/>,
    document.querySelector('#main-container')
);

var grid = document.querySelector('.card-container');
var msnry = new Masonry( grid, {
    columnWidth: '.container-sizer',
    gutter: '.gutter-sizer',
    itemSelector: '.card'
});
