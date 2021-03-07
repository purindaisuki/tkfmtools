import React from 'react';
import styled from 'styled-components';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';

const RadioGroupWrapper = styled.div`
    && label {
        color: ${props => props.theme.colors.onSurface};
    }
    > div > div {
        display: flex;
        padding: 0 .5rem;
        label:first-child {
            margin-left: -.5rem;
        }
        label {
            margin-left: .8rem;
            margin-right: 0;
            padding-right: .8rem;
            span:first-child.Mui-checked span {
                color: ${props => props.theme.colors.secondary};
            }
            span:first-child {
                color: ${props => props.theme.colors.shadow};
            }
        }
    }
`
const MyRadioGroup = ({
    children,
    className,
    label,
    value,
    handleChange
}) => (
    <RadioGroupWrapper>
        <FormControl className={className}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                value={value}
                onChange={handleChange}
                aria-label={label}
                row
            >
                {children}
            </RadioGroup>
        </FormControl>
    </RadioGroupWrapper>
)

export const MyRadio = ({
    label,
    value,
}) => (
    <FormControlLabel value={value} control={<Radio />} label={label} />
)

export default MyRadioGroup