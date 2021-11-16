import React from "react";
import styled, { useTheme } from "styled-components";
import { MenuItem, TextField } from "@mui/material";

export const Select = ({ className, values, renderValues, ...rest }) => {
  const { colors } = useTheme();

  return (
    <StyledSelect
      className={className}
      select
      SelectProps={{
        MenuProps: {
          PaperProps: {
            style: {
              backgroundColor: colors.surface,
            },
          },
          MenuListProps: {
            style: {
              backgroundColor: colors.surface,
              color: colors.onSurface,
            },
            dense: true,
            sx: {
              "& .Mui-selected": {
                backgroundColor: `${colors.secondary}33`,
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: `${colors.secondary}66`,
              },
            },
          },
        },
      }}
      variant="outlined"
      size="small"
      {...rest}
    >
      {values.map((value, i) => (
        <MenuItem key={value} value={value}>
          {renderValues ? renderValues[i] : value}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

const Input = styled(TextField)`
  .MuiInputBase-root,
  && label {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
  }
  .MuiInputBase-root {
    border: 1px solid ${({ theme }) => theme.colors.dropdownHover};
  }
  .MuiSelect-select {
    padding: 0.6rem 2rem 0.6rem 1rem;
  }
  && fieldset {
    border-color: rgba(0, 0, 0, 0);
  }
  &&:hover {
    .MuiInputBase-root {
      border: 1px solid ${({ theme }) => theme.colors.shadow};
    }
    fieldset {
      border-color: rgba(0, 0, 0, 0);
    }
  }
  && .Mui-focused {
    fieldset {
      border: 2px solid ${({ theme }) => theme.colors.secondary};
    }
    &.MuiInputBase-root,
    + .MuiInputBase-root {
      border-color: rgba(0, 0, 0, 0);
    }
  }
`;
const StyledSelect = styled(Input)`
  .MuiInputBase-root {
    width: 100%;
    svg {
      right: 0;
      fill: ${({ theme, disabled }) =>
        disabled ? theme.colors.dropdownHover : theme.colors.onSurface};
    }
  }
`;

export default Input;
