import React from 'react';
import styled, { useTheme } from 'styled-components';
import { MenuItem, TextField } from '@material-ui/core';

const Input = styled(TextField)`
    .MuiInputBase-root, && label {
        background-color: ${props => props.theme.colors.surface};
        color: ${props => props.theme.colors.onSurface};
    }
    .MuiInputBase-root {
        border: 1px solid ${props => props.theme.colors.dropdownHover};
    }
    && fieldset {
        border-color: rgba(0,0,0,0);
    }
    &&:hover {
        .MuiInputBase-root {
            border: 1px solid ${props => props.theme.colors.shadow};
        }
        fieldset {
            border-color: rgba(0,0,0,0);
        }
    }
    && .Mui-focused {
        fieldset {
            border: 2px solid ${props => props.theme.colors.secondary};
        }
        &.MuiInputBase-root, +.MuiInputBase-root {
            border-color: rgba(0,0,0,0);
        }
    }
`

const StyledSelect = styled(Input)`
    && > div {
        width: 100%;
        > div {
            padding: .2rem;
            padding-left: .4rem;
            padding-right: 1rem;
            color: ${props => props.disabled ? props.theme.colors.dropdownHover
        : 'inherit'};
        }
        svg {
            right: 0;
            fill: ${props => props.disabled ? props.theme.colors.dropdownHover
        : props.theme.colors.onSurface};
        }
    }
`
export const Select = ({ className, children, values, renderValues, ...rest }) => {
    const { colors } = useTheme()

    return (
        <StyledSelect
            className={className}
            select
            SelectProps={{
                MenuProps: {
                    MenuListProps: {
                        style: {
                            backgroundColor: colors.surface,
                            color: colors.onSurface,
                        },
                        dense: true,
                    }
                }
            }}
            variant='outlined'
            size='small'
            {...rest}
        >
            {values.map((value, i) => (
                <MenuItem key={value} value={value}>{renderValues ? renderValues[i] : value}</MenuItem>
            ))}
        </StyledSelect>
    )
}

export default Input