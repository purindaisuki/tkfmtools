import React from "react";
import { useTheme } from "styled-components";
import { Popover } from "@material-ui/core";
import { BattleCharacter as Character, IGameState } from "types/battle";
import {
  SkillActionType,
  SkillCondition,
  SkillEffect,
  SkillEffectBasis,
  SkillEffectType,
  SkillOn,
} from "types/skills";
import { useLanguage } from "containers/LanguageProvider";

const validateEffect = (
  character: Character,
  lineup: Character[],
  effect: SkillEffect
) => {
  if (effect.otherConditionValue) {
    switch (effect.otherCondition) {
      case SkillCondition.HP_GREATER_THAN:
        if (character.HP / character.maxHP < effect.otherConditionValue) {
          return false;
        }
        break;
      case SkillCondition.HP_LESS_THAN:
        if (character.HP / character.maxHP >= effect.otherConditionValue) {
          return false;
        }
        break;
      case SkillCondition.EXIST_CHARACTER:
        if (
          !lineup.some(
            (c) => !c.isDead && c.id === (effect.otherConditionValue as string)
          )
        ) {
          return false;
        }
        break;
    }
  }

  return true;
};

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

    if (effect.byAttribute !== undefined) {
      string = string.replace(
        "{attribute}",
        skillString.attribute[effect.byAttribute]
      );
    }
  }

  if (effect.duration) {
    string += ` ${effect.duration}T`;
  }
  return string;
};

type Props = {
  G: IGameState;
  character: Character;
  player: string;
  id?: string;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
};

const CharacterDetailsPopover = ({
  G,
  character,
  player,
  id,
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
        {character.effects.map((e, ind) =>
          validateEffect(character, G.lineups[player], e) ? (
            <div key={ind}>
              {effectString(e, skillString) +
                ` (${charString.name[G.lineups[e.fromPlayer][e.from].id]} (${
                  e.from + 1
                }))`}
            </div>
          ) : null
        )}
      </div>
    </Popover>
  );
};

export default CharacterDetailsPopover;
