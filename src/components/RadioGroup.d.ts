import React from "react";
import {
  RadioProps as MuiRadioProps,
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material";

export interface RadioGroupProps {
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const RadioGroup: React.FC<MuiRadioGroupProps & RadioGroupProps>;

export interface RadioProps {
  label: string;
  value: string;
}

declare const Radio: React.FC<MuiRadioProps & RadioProps>;

export default RadioGroup;
export const Radio;
