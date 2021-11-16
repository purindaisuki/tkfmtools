import React, { useState } from "react";
import styled from "styled-components";
import { List, ListItem, Menu, MenuItem } from "@mui/material";

const DropDown = ({
  button,
  buttonOnClick,
  buttonActive,
  items,
  renderItem,
  itemOnClick,
  itemProps,
  disableItemButton,
  closeOnclick,
  ariaId,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(false);

  const handleButtonClick = (event) => {
    if (buttonOnClick) {
      buttonOnClick();
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleItemClick = () => {
    if (closeOnclick) {
      setAnchorEl(null);
    }

    if (itemOnClick) {
      itemOnClick();
    }
  };

  return (
    <>
      {React.cloneElement(button, {
        "aria-controls": ariaId,
        "aria-haspopup": "true",
        onClick: handleButtonClick,
        $active: buttonActive || Boolean(anchorEl),
      })}
      <List
        component={StyledMenu}
        id={ariaId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        {...props}
      >
        {items.map((item) => (
          <ListItem
            component={disableItemButton ? "li" : StyledMenuItem}
            dense
            button={!disableItemButton}
            onClick={handleItemClick}
            {...itemProps}
            key={item.id}
          >
            {renderItem(item)}
          </ListItem>
        ))}
      </List>
    </>
  );
};

const StyledMenu = styled(Menu)`
  position: absolute;
  .MuiPaper-root {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
  }
`;
const StyledMenuItem = styled(MenuItem)`
  svg {
    fill: ${({ theme }) => theme.colors.secondary};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.dropdownHover};
  }
`;

export default DropDown;
