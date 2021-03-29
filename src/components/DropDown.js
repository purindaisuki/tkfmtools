import React, { useState } from 'react';
import styled from 'styled-components';
import { List, ListItem, Menu, MenuItem } from '@material-ui/core';

const StyledMenu = styled(Menu)`
    .MuiPaper-root {
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
    }
`
const StyledMenuItem = styled(MenuItem)`
    && {
        &:hover {
            background-color: ${props => props.theme.colors.dropdownHover};
        }
        svg {
            fill: ${props => props.theme.colors.secondary};
        }
    }
`
const DropDown = ({ button, items, renderItem, itemOnClick, closeOnclick, ariaId }) => {
    const [anchorEl, setAnchorEl] = useState(false)

    const handleButtonClick = (event) => setAnchorEl(event.currentTarget)

    const handleMenuClose = () => setAnchorEl(null)

    const handleItemClick = () => {
        if (closeOnclick) {
            setAnchorEl(null)
        }

        if (itemOnClick) {
            itemOnClick()
        }
    }

    return (<>
        {React.cloneElement(button, {
            'aria-controls': ariaId,
            'aria-haspopup': 'true',
            onClick: handleButtonClick
        })}
        <List
            component={StyledMenu}
            id={ariaId}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            {items.map(item => (
                <ListItem
                    component={StyledMenuItem}
                    dense
                    button
                    onClick={handleItemClick}
                    key={item.id}
                >
                    {renderItem(item)}
                </ListItem>
            ))}
        </List>
    </>)
}

export default DropDown