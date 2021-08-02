import React from "react";
import { useTheme } from "styled-components";
import { Popover } from "@material-ui/core";
import { BattleCharacter as Character, IGameState } from "types/battle";
import {
  SkillActionType,
  SkillEffect,
  SkillEffectBasis,
  SkillEffectType,
  SkillOn,
} from "types/skills";
import { useLanguage } from "containers/LanguageProvider";

const effectString = (effect: SkillEffect, skillString: any) => {
  let string =
    effect.on === SkillOn.TURN_END
      ? skillString.endTurnEffect[
          effect.type === SkillActionType.HEAL ? "heal" : "damage"
        ]
      : skillString.type[effect.type];

  if (effect.value) {
    const stack = effect.stack ? effect.stack : 1;
    const value =
      (effect.type === SkillEffectType.ATTACK_POWER &&
        effect.basis === SkillEffectBasis.SELF_ATK) ||
      effect.type in SkillActionType
        ? Math.abs(Math.floor(effect.value)).toString()
        : Math.abs(Math.round(effect.value * stack * 1000) / 10).toString() +
          "%";
    if (typeof string === "string") {
      string = string.replace("{value}", value);
    } else {
      string = string[effect.value > 0 ? 0 : 1].replace("{value}", value);
    }
  }

  if (effect.duration) {
    string += ` ${effect.duration}T`;
  }
  return string;
};

type Props = {
  G: IGameState;
  id?: string;
  character: Character;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
};

const CharacterDetailsPopover = ({
  G,
  id,
  character,
  open,
  anchorEl,
  onClose,
}: Props): JSX.Element => {
  const { colors }: any = useTheme();
  const { charString, pageString, skillString }: any = useLanguage();

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      PaperProps={{
        style: {
          padding: "1rem",
          backgroundColor: colors.surface,
          color: colors.onSurface,
          fontSize: "small",
        },
      }}
    >
      <div>{`${pageString.battle.index.HP}: ${character.HP}/${character.maxHP}`}</div>
      <div>{`${pageString.battle.index.ATK}: ${character.ATK}`}</div>
      <div>{`${pageString.battle.index.shield}: ${character.shield}`}</div>
      <div>{`CD: ${character.currentCD}/${character.CD}`}</div>
      <div>
        {`${pageString.battle.index.effect}:`}
        {character.effects.map((e, ind) => (
          <div key={ind}>
            {effectString(e, skillString) +
              ` (${charString.name[G.lineups[e.fromPlayer][e.from].id]} (${
                e.from + 1
              }))`}
          </div>
        ))}
      </div>
    </Popover>
  );
};

export default CharacterDetailsPopover;
