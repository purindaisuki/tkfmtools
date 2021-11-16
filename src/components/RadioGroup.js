import React from "react";
import styled from "styled-components";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";

const RadioGroup = ({ children, className, label, value, handleChange }) => (
  <RadioGroupWrapper>
    <FormControl className={className}>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup
        value={value}
        onChange={handleChange}
        aria-label={label}
        row
      >
        {children}
      </MuiRadioGroup>
    </FormControl>
  </RadioGroupWrapper>
);

const RadioGroupWrapper = styled.div`
  && label {
    color: ${({ theme }) => theme.colors.onSurface};
  }
  > div > div {
    display: flex;
    padding: 0 0.5rem;
    label:first-child {
      margin-left: -0.5rem;
    }
    label {
      margin-left: 0.8rem;
      margin-right: 0;
      margin-bottom: 0;
      padding-right: 0.8rem;
      span:first-child.Mui-checked span {
        color: ${({ theme }) => theme.colors.secondary};
      }
      span:first-child {
        color: ${({ theme }) => theme.colors.shadow};
      }
    }
  }
`;

export const Radio = ({ label, value }) => (
  <FormControlLabel value={value} control={<MuiRadio />} label={label} />
);

export default RadioGroup;
