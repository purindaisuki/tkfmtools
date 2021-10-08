import React, { useState } from "react";
import styled from "styled-components";
import { Button as MuiButton, Tooltip } from "@material-ui/core";
import {
  BattleCtx,
  BattleCharacter as Character,
  IGameState,
  PlayerID,
} from "types/battle";
import { useLanguage } from "containers/LanguageProvider";
import CharacterDetailsPopover from "./CharacterDetailsPopover";
import ImageSupplier from "components/ImageSupplier";
import IconButton from "components/IconButton";
import {
  ClockIcon,
  ElseIcon,
  GuardIcon,
  ParalysisIcon,
  SilenceIcon,
  SleepIcon,
  TauntIcon,
} from "components/icon";

enum CharacterButtonState {
  PLAIN,
  NOT_MOVABLE,
  CAN_ULTIMATE,
  SELECTED,
  TARGETED,
}

export const getCharacterButtonState = (
  G: IGameState,
  ctx: BattleCtx,
  character: Character,
  player: string
) => {
  if (
    ctx.currentPlayer !== player &&
    G.target[ctx.currentPlayer] === character.teamPosition
  ) {
    return CharacterButtonState.TARGETED;
  }
  if (
    (player === "1" && ctx.turn === 1) ||
    character.isDead ||
    character.isMoved ||
    character.isParalysis ||
    character.isSleep ||
    character.isBroken
  ) {
    return CharacterButtonState.NOT_MOVABLE;
  }
  if (ctx.currentPlayer === player) {
    if (G.selected[ctx.currentPlayer] === character.teamPosition) {
      return CharacterButtonState.SELECTED;
    }
    if (character.currentCD === 0 && !character.isSilence) {
      return CharacterButtonState.CAN_ULTIMATE;
    }
  }
  return CharacterButtonState.PLAIN;
};

const CharacterStateTooltip = ({
  tooltipText,
  active,
  children,
}: {
  tooltipText: string;
  active: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Tooltip title={<TooltipTextWrapper>{tooltipText}</TooltipTextWrapper>}>
      <StateIcon $active={active}>{children}</StateIcon>
    </Tooltip>
  );
};

const StateIcon = styled.span<{ $active: boolean }>`
  margin-left: 0.4rem;
  svg {
    width: 1rem;
    height: 1rem;
    margin-bottom: 1px;
    fill: ${(props) =>
      props.theme.colors[props.$active ? "secondary" : "dropdownHover"]};
  }
`;
const TooltipTextWrapper = styled.span`
  font-size: small;
`;

const CharacterStateList = ({
  character,
}: {
  character: Character;
}): JSX.Element => {
  const { pageString }: any = useLanguage();

  return (
    <ListWrapper>
      <CharacterStateTooltip
        tooltipText={"CD"}
        active={character.currentCD === 0}
      >
        {ClockIcon}
      </CharacterStateTooltip>
      <TextWrapper>{` ${character.currentCD}`}</TextWrapper>
      <CharacterStateTooltip
        tooltipText={pageString.battle.index.controlPanel.guard}
        active={character.isGuard}
      >
        {GuardIcon}
      </CharacterStateTooltip>
      <CharacterStateTooltip
        tooltipText={pageString.battle.index.taunt}
        active={character.isTaunt}
      >
        {TauntIcon}
      </CharacterStateTooltip>
      <CharacterStateTooltip
        tooltipText={pageString.battle.index.silence}
        active={character.isSilence}
      >
        {SilenceIcon}
      </CharacterStateTooltip>
      <CharacterStateTooltip
        tooltipText={pageString.battle.index.sleep}
        active={character.isSleep}
      >
        {SleepIcon}
      </CharacterStateTooltip>
      <CharacterStateTooltip
        tooltipText={pageString.battle.index.paralysis}
        active={character.isParalysis}
      >
        {ParalysisIcon}
      </CharacterStateTooltip>
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  margin-left: 0.3rem;
  white-space: nowrap;
  > span:first-child {
    margin-left: 0;
  }
  @media screen and (max-width: 600px) {
    > span:nth-child(n + 4) {
      display: none;
    }
  }
`;
const TextWrapper = styled.span`
  line-height: 1rem;
  vertical-align: middle;
  font-weight: bold;
`;

const CharacterStats = ({
  character,
}: {
  character: Character;
}): JSX.Element => {
  const { HP, maxHP, shield } = character;
  const HPPercent = Math.round((HP / maxHP) * 1000) / 10;
  const shieldPercent = Math.round((shield / maxHP) * 1000) / 10;

  return (
    <CharacterStatsWrapper>
      <span>{`${HP}`}</span>
      <HPBar HPPercent={HPPercent} shieldPercent={shieldPercent} />
      <CharacterStateList character={character} />
    </CharacterStatsWrapper>
  );
};

const CharacterStatsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.4rem;
  > span {
    margin-left: 0.3rem;
    font-size: 0.9rem;
  }
  @media screen and (max-width: 600px) {
    > span:first-child {
      display: none;
    }
  }
`;

type HPBarProps = {
  HPPercent: number;
  shieldPercent: number;
  originalHPPercent?: number;
  originalShieldPercent?: number;
};

export const HPBar = ({
  HPPercent,
  shieldPercent,
  originalHPPercent,
  originalShieldPercent,
  className,
}: HPBarProps & React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <StyledHPBar
    $HP={HPPercent}
    $shield={shieldPercent > 100 ? 100 : shieldPercent}
    $originalHP={originalHPPercent}
    $originalShield={
      originalShieldPercent && originalShieldPercent > 100
        ? 100
        : originalShieldPercent
    }
    className={className}
  >
    <div />
    <div />
    <div />
    <div />
  </StyledHPBar>
);

const StyledHPBar = styled.div<{
  $HP: number;
  $shield: number;
  $originalHP?: number;
  $originalShield?: number;
}>`
  position: relative;
  height: 0.5rem;
  width: 100%;
  max-width: 9.2rem;
  margin-left: 0.2rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.colors.dropdownHover};
  border-radius: 0.25rem;
  div {
    height: 100%;
    border-radius: 0.25rem;
    transition: width 1s;
  }
  > div:nth-child(1) {
    position: absolute;
    width: ${(props) => (props.$originalHP ? props.$originalHP : 0)}%;
    background-color: ${(props) => props.theme.colors.shadow};
  }
  > div:nth-child(2) {
    position: absolute;
    top: 0.7rem;
    width: ${(props) => (props.$originalShield ? props.$originalShield : 0)}%;
    height: 60%;
    background-color: ${(props) => props.theme.colors.shadow};
  }
  > div:nth-child(3) {
    position: absolute;
    width: ${(props) => props.$HP}%;
    background-color: ${(props) => props.theme.colors.secondary};
  }
  > div:nth-child(4) {
    position: absolute;
    top: 0.7rem;
    width: ${(props) => props.$shield}%;
    height: 60%;
    background-color: ${(props) => props.theme.chart.colors[1]};
  }
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

const CharacterButton = ({
  G,
  ctx,
  player,
  character,
  onClick,
}: {
  G: IGameState;
  ctx: BattleCtx;
  player: PlayerID;
  character: Character;
  onClick: () => void;
}): JSX.Element => {
  const { charString, pageString }: any = useLanguage();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ButtonWrapper>
      <DetailsButton
        onClick={handleClick}
        ariaDescribedby={id}
        tooltipText={pageString.battle.index.details}
      >
        {ElseIcon}
      </DetailsButton>
      <CharacterDetailsPopover
        G={G}
        character={character}
        player={player}
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
      <StyledCharacterMuiButton
        $state={getCharacterButtonState(G, ctx, character, player)}
        onClick={onClick}
      >
        <CharacterAvatar
          key={character.id}
          name={`char_small_${character.id}`}
          alt={
            character.id === "scarecrow"
              ? character.id
              : charString.name[character.id]
          }
          $grayscale={character.isDead}
          $attr={character.attribute}
        />
        <CharacterStats character={character} />
      </StyledCharacterMuiButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  position: relative;
`;
const DetailsButton = styled(IconButton)`
  && {
    position: absolute;
    z-index: 1;
    top: 0.2rem;
    right: 0.4rem;
    padding: 0.4rem;
    color: ${(props) => props.theme.colors.onBackground};
  }
`;

export const CharacterAvatar = styled(ImageSupplier)<{
  $grayscale: boolean;
  $attr: number;
}>`
  z-index: 1;
  width: 4rem;
  height: 4rem;
  @media screen and (max-width: 600px) {
    width: 3.5rem;
    height: 3.5rem;
  }
  border: 0.2rem solid
    ${(props) =>
      props.$grayscale
        ? props.theme.colors.dropdownHover
        : props.theme.chart.colors[props.$attr]};
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.background};
  filter: grayscale(${(props) => (props.$grayscale ? 1 : 0)});
`;

const Button = styled(MuiButton)`
  && {
    color: ${(props) => props.theme.colors.onBackground};
  }
`;
const StyledCharacterMuiButton = styled(Button)<{
  $state: CharacterButtonState;
}>`
  && {
    display: flex;
    margin-bottom: 0.5rem;
    border: 2px solid
      ${(props) => {
        switch (props.$state) {
          case CharacterButtonState.SELECTED:
            return props.theme.colors.secondary;
          case CharacterButtonState.TARGETED:
            return props.theme.chart.colors[1];
          default:
            return props.theme.colors.shadow;
        }
      }};
    ${(props) =>
      props.$state === CharacterButtonState.NOT_MOVABLE
        ? "background-color: rgba(0, 0, 0, 0.1);"
        : ""}
    filter: brightness(
      ${(props) =>
      props.$state === CharacterButtonState.NOT_MOVABLE ? 0.7 : 1}
    );
  }
`;

export default CharacterButton;
