import React, { useState } from "react";
import styled from "styled-components";
import { Button, ButtonProps, Slider } from "@material-ui/core";
import Header from "components/Header";
import LocalizedLink from "components/LocalizedLink";
import RadioGroup, { Radio } from "components/RadioGroup";
import { OpenIcon } from "components/icon";
import { useLanguage } from "containers/LanguageProvider";
import { BattleSetupData } from "types/battle";

export interface IGameSetupProps {
  lineups: BattleSetupData["lineups"];
  botIndex: number;
  iterations: number;
  playoutDepth: number;
  handleSelectScarecrow: () => void;
  handleSelectScarecrows: () => void;
  handleBotChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleIterationsChange: (newValue: number) => () => void;
  handlePlayoutDepthChange: (newValue: number) => () => void;
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

export const BattleSettings = ({
  lineups,
  botIndex,
  iterations,
  playoutDepth,
  handleSelectScarecrow,
  handleSelectScarecrows,
  handleBotChange,
  handleIterationsChange,
  handlePlayoutDepthChange,
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
      <StyledButton onClick={handleSelectScarecrow}>
        {pageString.battle.index.setting.scarecrow}
      </StyledButton>
      <StyledButton onClick={handleSelectScarecrows}>
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
            onChange={(e, value: number | number[]) =>
              setIterationsValue(value as number)
            }
            onChangeCommitted={handleIterationsChange(iterationsValue)}
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
            onChange={(e, value: number | number[]) =>
              setPlayoutDepthValue(value as number)
            }
            onChangeCommitted={handlePlayoutDepthChange(playoutDepthValue)}
            aria-labelledby="playoutDepth-slider"
          />
        </div>
      )}
    </div>
  );
};

const SettingHeader = styled(Header)`
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
  font-size: 1rem;
`;
const StyledButton = styled(Button)`
  && {
    margin-right: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.secondaryBorder};
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.onSurface};
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.secondary};
      box-shadow: inset 0 0 0.5rem ${(props) => props.theme.colors.secondary},
        0 0 0.1rem ${(props) => props.theme.colors.secondary};
    }
  }
` as React.ComponentType<ButtonProps | LinkProps>;
const StyledLink = styled(LocalizedLink)`
  && {
    text-decoration: none;
    svg {
      width: 1.4rem;
      height: 1.4rem;
      margin-left: 0.4rem;
      fill: ${(props) => props.theme.colors.onSurface};
    }
  }
`;
const StyledRadioGroup = styled(RadioGroup)`
  && {
    margin-top: 0.4rem;
  }
  label,
  span {
    font-size: 0.875rem;
  }
`;
const TextWrapper = styled.div`
  font-size: 0.875rem;
`;

const StyledSlider = styled(Slider)`
  && {
    color: ${(props) => props.theme.colors.secondary};
    max-width: 18rem;
    .MuiSlider-valueLabel > span > span {
      color: ${(props) => props.theme.colors.onSecondary};
    }
  }
`;
