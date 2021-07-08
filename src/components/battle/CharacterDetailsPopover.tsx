import React from "react";
import { useTheme } from "styled-components";
import { Popover } from "@material-ui/core";
import { BattleCharacter as Character } from "types/battle";
import {
  SkillActionType,
  SkillEffect,
  SkillEffectBasis,
  SkillEffectType,
} from "types/skills";
import skillString from "data/string/skill_zh-TW.json";

const effectString = (effect: SkillEffect) => {
  let string = skillString.type[effect.type];
  if (effect.value) {
    const stack = effect.stack ? effect.stack : 1;
    string += effect.value > 0 ? "增加 " : "減少 ";
    string +=
      (effect.type === SkillEffectType.ATTACK_POWER &&
        effect.basis === SkillEffectBasis.SELF_ATK) ||
      effect.type in SkillActionType
        ? Math.abs(effect.value).toString()
        : Math.abs(Math.round(effect.value * stack * 1000) / 10).toString() +
          "%";
  }

  return string;
};

type Props = {
  id?: string;
  character: Character;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
};

export const CharacterDetailsPopover = ({
  id,
  character,
  open,
  anchorEl,
  onClose,
}: Props): JSX.Element => {
  const { colors } = useTheme() as any;

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
        },
      }}
    >
      <div>{`HP: ${character.HP}/${character.maxHP}`}</div>
      <div>{`ATK: ${character.ATK}`}</div>
      <div>{`Shield: ${character.shield}`}</div>
      <div>{`CD: ${character.currentCD}/${character.CD}`}</div>
      <div>
        {"Effects:"}
        {character.effects.map((e, ind) => (
          <div key={ind}>
            {effectString(e) +
              ` ${e.duration ? e.duration + "T" : ""} from: ${e.from}`}
          </div>
        ))}
      </div>
    </Popover>
  );
};
