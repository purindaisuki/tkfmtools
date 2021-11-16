import type { BattleAppAction } from "./BattleApp";
import React, { useState } from "react";
import styled from "styled-components";
import { Button, ButtonProps, Slider } from "@mui/material";
import { BattleSetupData } from "types/battle";
import { useLanguage } from "containers/LanguageProvider";
import Header from "components/Header";
import LocalizedLink from "components/LocalizedLink";
import RadioGroup, { Radio } from "components/RadioGroup";
import { OpenIcon } from "components/icon";

export interface IGameSetupProps {
  lineups: BattleSetupData["lineups"];
  botIndex: number;
  iterations: number;
  playoutDepth: number;
  handleBotChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dispatch: React.Dispatch<BattleAppAction>;
}

export const SelectTeamButton = ({
  isFromPlayer,
  lineups,
  text,
  className,
}: {
  isFromPlayer: boolean;
  lineups: BattleSetupData["lineups"];
  text: string;
} & React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <StyledButton
    component={StyledLink}
    to="/team/"
    state={{
      isFromPlayer: isFromPlayer,
      isFromEnemies: !isFromPlayer,
      lineups,
    }}
    replace
    className={className}
  >
    {text}
    {OpenIcon}
  </StyledButton>
);

type LinkProps = {
  component: React.ReactNode;
  to: string;
  state: any;
  replace: boolean;
};

const BattleSettings = ({
  lineups,
  botIndex,
  iterations,
  playoutDepth,
  handleBotChange,
  dispatch,
}: IGameSetupProps): JSX.Element => {
  const { pageString }: any = useLanguage();
  const [iterationsValue, setIterationsValue] = useState(iterations);
  const [playoutDepthValue, setPlayoutDepthValue] = useState(playoutDepth);

  return (
    <div>
      <SettingHeader title={pageString.battle.index.setting.team} />
      <SelectTeamButton
        isFromPlayer={true}
        lineups={lineups}
        text={pageString.battle.index.setting.select}
      />
      <SettingHeader title={pageString.battle.index.setting.enemy} />
      <StyledButton
        onClick={() => dispatch({ type: "SET_EMENY_AS_SCARECROW", number: 1 })}
      >
        {pageString.battle.index.setting.scarecrow}
      </StyledButton>
      <StyledButton
        onClick={() => dispatch({ type: "SET_EMENY_AS_SCARECROW", number: 5 })}
      >
        {`${pageString.battle.index.setting.scarecrow} ×5`}
      </StyledButton>
      <SelectTeamButton
        isFromPlayer={false}
        lineups={lineups}
        text={pageString.battle.index.setting.select}
      />
      <SettingHeader title={pageString.battle.index.setting.bot} />
      <StyledRadioGroup
        label={pageString.battle.index.setting.groupLabel}
        value={pageString.battle.index.setting.labels[botIndex]}
        handleChange={handleBotChange}
      >
        {pageString.battle.index.setting.labels.map((label: string) => (
          <Radio label={label} value={label} key={label} />
        ))}
      </StyledRadioGroup>
      {botIndex === 2 && (
        <div>
          <TextWrapper id="iterations-slider">
            {pageString.battle.index.setting.iterations}
          </TextWrapper>
          <StyledSlider
            value={iterationsValue}
            max={1000}
            min={1}
            valueLabelDisplay="auto"
            onChange={(_, value: number | number[]) =>
              setIterationsValue(value as number)
            }
            onChangeCommitted={() =>
              dispatch({
                type: "SET_ITERATIONS",
                iterations: iterationsValue as number,
              })
            }
            aria-labelledby="iterations-slider"
          />
          <TextWrapper id="playoutDepth-slider">
            {pageString.battle.index.setting.playoutDepth}
          </TextWrapper>
          <StyledSlider
            value={playoutDepthValue}
            max={100}
            min={1}
            valueLabelDisplay="auto"
            onChange={(_, value: number | number[]) =>
              setPlayoutDepthValue(value as number)
            }
            onChangeCommitted={() =>
              dispatch({
                type: "SET_PLAYOUT_DEPTH",
                playoutDepth: playoutDepthValue as number,
              })
            }
            aria-labelledby="playoutDepth-slider"
          />
        </div>
      )}
    </div>
  );
};

const SettingHeader = styled(Header)`
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  font-size: 1rem;
`;
const StyledButton = styled(Button)`
  ${({ theme }) => `
  margin-right: 0.5rem;
  border: 1px solid ${theme.colors.secondaryBorder};
  border-radius: 0.25rem;
  background-color: ${theme.colors.surface};
  color: ${theme.colors.onSurface};
  &:hover {
    border: 1px solid ${theme.colors.secondary};
    box-shadow: inset 0 0 0.5rem ${theme.colors.secondary},
      0 0 0.1rem ${theme.colors.secondary};
  }`}
` as React.ComponentType<ButtonProps | LinkProps>;
const StyledLink = styled(LocalizedLink)`
  svg {
    width: 1.4rem;
    height: 1.4rem;
    margin-left: 0.4rem;
    fill: ${({ theme }) => theme.colors.onSurface};
  }
`;
const StyledRadioGroup = styled(RadioGroup)`
  margin-top: 0.4rem;
  label,
  span {
    font-size: 0.875rem;
  }
`;
const TextWrapper = styled.div`
  font-size: 0.875rem;
`;

const StyledSlider = styled(Slider)`
  ${({ theme }) => `
  color: ${theme.colors.secondary};
  max-width: 18rem;
  .MuiSlider-valueLabel > span > span {
    color: ${theme.colors.onSecondary};
  }`}
`;

export default BattleSettings;
