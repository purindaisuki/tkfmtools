import React from "react";

export interface RadioGroupProps {
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const RadioGroup: React.FC<RadioGroupProps>;

export interface RadioProps {
  label: string;
  value: string;
}

declare const Radio: React.FC<RadioProps>;

export default RadioGroup;
export const Radio;
