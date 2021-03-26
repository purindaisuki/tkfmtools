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

export const Select = ({ children, values, ...rest }) => {
    const { colors } = useTheme()

    return (
        <Input
            select
            SelectProps={{
                MenuProps: {
                    MenuListProps: {
                        style: {
                            backgroundColor: colors.surface,
                            color: colors.onSurface
                        }
                    }
                }
            }}
            {...rest}
        >
            {values.map(value => (
                <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
        </Input>
    )
}

export default Input