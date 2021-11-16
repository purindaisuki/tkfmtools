import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import useCharacterSelect from "hooks/useCharacterSelect";
import ImageSupplier from "components/ImageSupplier";
import Input, { Select } from "components/Input";
import PotentialInput from "components/PotentialInput";

const ImgSelect = ({ type, values, value, onChange, disabled }) => (
  <StyledSelect
    id={`select-${type}`}
    values={values}
    value={value}
    onChange={onChange}
    variant="outlined"
    size="small"
    inputProps={{ "aria-label": type }}
    disabled={disabled}
  />
);

const StyledSelect = styled(Select)`
  position: absolute;
  left: 1.6rem;
  background-color: ${({ theme }) => theme.colors.surface};
  && .MuiSelect-select {
    padding: 0.1rem 1.5rem 0.1rem 0.4rem;
  }
`;

const CharStatsSelect = ({ className, char, levelInputId, onSelect }) => {
  const { charState, selectItems, setSelect, setCharState } =
    useCharacterSelect(char, onSelect);

  useEffect(() => {
    setCharState(char);
  }, [char]);

  const handleSelectChange = (key) => (event) =>
    setSelect(key, parseInt(event.target.value));

  const handleSubChange = (index) => () => setSelect("potentialSub", index);

  return (
    <StyledCharStatsSelect container spacing={1} className={className}>
      <Grid item xs={4} sm={2}>
        <StyledLabel htmlFor={levelInputId}>Lv</StyledLabel>
        <LevelInput
          id={levelInputId}
          value={charState.level}
          onChange={handleSelectChange("level")}
          variant="outlined"
          size="small"
          inputProps={{ "aria-label": "level" }}
        />
      </Grid>
      {Object.entries(selectItems).map(([type, selectItem]) =>
        type === "potential" ? (
          <Grid
            item
            xs={6}
            sm={3}
            component={UiImg}
            name={selectItem.imgNames}
            isBackground
            alt={type}
            key={type}
          >
            <StyledPotentialInput
              charId={char.id}
              values={selectItem.values}
              mainValue={charState.potential}
              subValue={charState.potentialSub}
              onMainChange={handleSelectChange("potential")}
              onSubChange={handleSubChange}
            />
          </Grid>
        ) : (
          type !== "potentialSub" && (
            <Grid
              item
              xs={4}
              sm={2}
              component={UiImg}
              name={selectItem.imgNames}
              isBackground
              alt={type}
              key={type}
            >
              <ImgSelect
                type={type}
                value={charState[type]}
                values={selectItem.values}
                disabled={selectItem.disabled}
                onChange={handleSelectChange(type)}
              />
            </Grid>
          )
        )
      )}
    </StyledCharStatsSelect>
  );
};

const StyledCharStatsSelect = styled(Grid)`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  top: 0.6rem;
  left: calc(14rem + 5%);
  width: 32rem;
  > div {
    display: flex;
  }
  @media screen and (max-width: 1000px) {
    width: 28rem;
  }
  @media screen and (max-width: 768px) {
    left: calc(7rem + 5%);
    width: 26rem;
  }
  @media screen and (max-width: 599px) {
    top: 0.2rem;
    width: 14rem;
  }
`;
const StyledLabel = styled.label`
  margin: 0.4rem 0.4rem 0 0.2rem;
`;
const LevelInput = styled(Input)`
  width: 100%;
  height: 1.6rem;
  > div {
    width: 2rem;
    > input {
      padding: 0.1rem;
      text-align: center;
    }
  }
`;
const UiImg = styled(ImageSupplier)`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  background-repeat: no-repeat;
  background-size: 1.6rem 1.6rem;
  background-position: 0 0.6rem;
`;
const StyledPotentialInput = styled(PotentialInput)`
  position: absolute;
  left: 1.8rem;
  span {
    top: -0.5rem;
  }
  && .MuiSelect-select {
    padding: 0.1rem 1rem 0.1rem 0.4rem;
  }
`;

export default CharStatsSelect;
