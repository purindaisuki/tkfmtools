import React, { useState } from "react";
import styled from "styled-components";
import { List, ListItem, Menu, MenuItem } from "@material-ui/core";

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
  .MuiPaper-root {
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.onSurface};
  }
`;
const StyledMenuItem = styled(MenuItem)`
  && {
    &:hover {
      background-color: ${(props) => props.theme.colors.dropdownHover};
    }
    svg {
      fill: ${(props) => props.theme.colors.secondary};
    }
  }
`;

export default DropDown;
