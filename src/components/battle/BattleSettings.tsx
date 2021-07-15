import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "@material-ui/core";
import Header from "components/Header";
import LocalizedLink from "components/LocalizedLink";
import { OpenIcon } from "components/icon";
import { CharacterStats } from "types/characters";

export interface IGameSetupProps {
  lineups: [CharacterStats[], CharacterStats[]];
  handleSelectScarecrow: () => void;
  handleBotChange: (ind: number) => void;
}

type LinkProps = {
  component: React.ReactNode;
  to: string;
  state: any;
  replace: boolean;
};

export const BattleSettings = ({
  lineups,
  handleSelectScarecrow,
  handleBotChange,
}: IGameSetupProps): JSX.Element => {
  return (
    <div>
      <SettingHeader title={`Team`} />
      <StyledButton
        component={StyledLink}
        to="/team/"
        state={{ isFromPlayer: true, lineups }}
        replace
      >
        {"Select team"}
        {OpenIcon}
      </StyledButton>
      <SettingHeader title={`Enemies`} />
      <StyledButton onClick={handleSelectScarecrow}>{"Scarecrow"}</StyledButton>
      <StyledButton
        component={StyledLink}
        to="/team/"
        state={{ isFromEnemies: true, lineups }}
        replace
      >
        {"Select enemies"}
        {OpenIcon}
      </StyledButton>
      <SettingHeader title={`Bot`} />
      <button onClick={() => handleBotChange(0)}>setlineup</button>
    </div>
  );
};

const SettingHeader = styled(Header)`
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
`;
const StyledButton = styled(Button)`
  && {
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
