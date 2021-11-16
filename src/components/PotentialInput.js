import React from "react";
import styled, { useTheme } from "styled-components";
import { Checkbox, Grid } from "@mui/material";
import { useLanguage } from "containers/LanguageProvider";
import Input, { Select } from "components/Input";
import charMap from "data/charMap";
import potentialData from "data/potential.json";

const PotentialInput = ({
  className,
  charId,
  values,
  mainValue,
  subValue,
  onMainChange,
  onSubChange,
  ...rest
}) => {
  const { colors } = useTheme();
  const { pageString } = useLanguage();

  const { potentialType } = charMap[charId];

  const potentialStage = potentialData.type[potentialType][mainValue - 1];
  const buffs = potentialStage
    ? potentialStage.pattern.map((p) => potentialData.itemMap[p].type)
    : Array(6).fill("ATK");

  return (
    <Wrapper className={className}>
      <StyledInput
        select
        SelectProps={{
          multiple: true,
          value: subValue,
          renderValue: () => mainValue,
          MenuProps: {
            PaperProps: {
              style: {
                backgroundColor: colors.surface,
              },
            },
            MenuListProps: {
              style: {
                width: "12rem",
                padding: ".5rem",
                backgroundColor: colors.surface,
                color: colors.onSurface,
              },
              dense: true,
            },
          },
        }}
        {...rest}
        variant="outlined"
      >
        <Grid container>
          <Grid item xs={12}>
            <Title>{pageString.analysis.index.primaryPotentialTitle}</Title>
          </Grid>
          <Grid
            item
            xs={12}
            component={StyledSelect}
            values={values}
            value={mainValue}
            onChange={onMainChange}
          />
          <Grid item xs={12}>
            <Title>{pageString.analysis.index.secondaryPotentialTitle}</Title>
          </Grid>
          {subValue.map((boolean, ind) => (
            <CheckboxGrid
              item
              key={ind}
              xs={2}
              component={StyledCheckbox}
              checked={boolean}
              onChange={onSubChange(ind)}
              disableRipple
              inputProps={{ "aria-label": "potential-substage" + ind }}
              $type={buffs[ind]}
            />
          ))}
        </Grid>
      </StyledInput>
      {subValue.map((boolean, ind) => (
        <Indicator $checked={boolean} key={ind} $type={buffs[ind]} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const StyledInput = styled(Input)`
  width: 100%;
  svg {
    right: 0;
    fill: ${({ theme, disabled }) =>
      disabled ? theme.colors.dropdownHover : theme.colors.onSurface};
  }
`;
const StyledSelect = styled(Select)`
  margin: 0.3rem;
`;
const Title = styled.span`
  margin-left: 0.4rem;
  font-size: 75%;
`;
const CheckboxGrid = styled(Grid)`
  &&.Mui-checked svg {
    fill: ${({ theme, $type }) =>
      theme.chart.colors[$type === "ATK" ? 0 : $type === "HP" ? 2 : 4]};
  }
`;
const StyledCheckbox = styled(Checkbox)`
  padding: 0;
  svg {
    fill: ${({ theme }) => theme.colors.dropdownHover};
  }
`;
const Indicator = styled.span`
  display: inline-block;
  position: relative;
  top: -0.6rem;
  width: calc(100% / 6 - 4px);
  height: 4px;
  margin: 0 2px;
  background-color: ${({ theme, $checked, $type }) =>
    !$checked
      ? theme.colors.dropdownHover
      : theme.chart.colors[$type === "ATK" ? 0 : $type === "HP" ? 2 : 4]};
`;

export default PotentialInput;
