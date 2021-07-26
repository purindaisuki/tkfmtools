import type { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import {
  ISkill,
  SkillActionType,
  SkillCondition,
  SkillOn,
  SkillTarget,
} from "types/skills";
import { IGameState, ILog } from "types/battle";
import { endMove } from ".";
import { trigger } from "./processSkill";
import { getEnemies } from "./helpers";

export const canSelect = (
  G: IGameState,
  ctx: Ctx,
  selected: number
): boolean => {
  const selectedCharacter = G.lineups[ctx.currentPlayer][selected];

  return !selectedCharacter
    ? false
    : !selectedCharacter.isMoved &&
        !selectedCharacter.isDead &&
        !selectedCharacter.isParalysis &&
        !selectedCharacter.isSleep &&
        !selectedCharacter.isBroken;
};

export const canTarget = (G: IGameState, ctx: Ctx, target: number) => {
  const enemies = getEnemies(G, ctx);
  if (!enemies[target]) {
    return false;
  }
  const tauntIndices = G.taunt[ctx.currentPlayer === "0" ? "1" : "0"];

  return tauntIndices.length === 0
    ? !enemies[target].isDead
    : target === tauntIndices[0];
};

export const canAttack = (
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): boolean => canSelect(G, ctx, selected) && canTarget(G, ctx, target);

export const attack = (
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): IGameState | typeof INVALID_MOVE | void => {
  if (canAttack(G, ctx, selected, target)) {
    G.selected[ctx.currentPlayer] = selected;
    G.target[ctx.currentPlayer] = target;
  } else {
    return INVALID_MOVE;
  }

  const self = G.lineups[ctx.currentPlayer][selected];
  const log: ILog[] = [];
  let skills = self.extraSkill.map((s) => {
    const { skillDuration, ...rest } = s;
    return rest;
  }) as ISkill[];

  skills.push(...self.skillSet.normalAttack);
  if (self.teamPosition === 0) {
    skills.push(...self.skillSet.leader);
  }
  if (!self.isSilence) {
    skills.push(...self.skillSet.passive);
  }

  skills = skills.filter(
    (s) =>
      s.condition === SkillCondition.ATTACK ||
      s.condition === SkillCondition.NORMAL_ATTACK
  );
  skills.sort((a, b) => a.on - b.on);
  skills.forEach((s) => {
    trigger(G, ctx, s, log);
  });

  G.log.slice(-1)[0].push(...log);
  endMove(G, ctx);
};

export const canUltimate = (
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): boolean => {
  if (!(canSelect(G, ctx, selected) && canTarget(G, ctx, target))) {
    return false;
  }

  const self = G.lineups[ctx.currentPlayer][selected];
  return self.currentCD === 0 && !self.isSilence;
};

export const ultimate = (
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): IGameState | typeof INVALID_MOVE | void => {
  if (canUltimate(G, ctx, selected, target)) {
    G.selected[ctx.currentPlayer] = selected;
    G.target[ctx.currentPlayer] = target;
  } else {
    return INVALID_MOVE;
  }

  const self = G.lineups[ctx.currentPlayer][selected];
  self.currentCD = self.CD;

  const log: ILog[] = [];
  let skills = self.extraSkill.map((s) => {
    const { skillDuration, ...rest } = s;
    return rest;
  }) as ISkill[];

  skills.push(...self.skillSet.ultimate);
  if (self.teamPosition === 0) {
    skills.push(...self.skillSet.leader);
  }
  if (!self.isSilence) {
    skills.push(...self.skillSet.passive);
  }

  skills = skills.filter(
    (s) =>
      s.condition === SkillCondition.ATTACK ||
      s.condition === SkillCondition.ULTIMATE
  );
  skills.sort((a, b) => a.on - b.on);
  skills.forEach((s) => {
    trigger(G, ctx, s, log);
  });

  G.log.slice(-1)[0].push(...log);
  endMove(G, ctx);
};

export const guard = (
  G: IGameState,
  ctx: Ctx,
  selected: number
): IGameState | typeof INVALID_MOVE | void => {
  if (canSelect(G, ctx, selected)) {
    G.selected[ctx.currentPlayer] = selected;
  } else {
    return INVALID_MOVE;
  }
  const selectedCharacter = G.lineups[ctx.currentPlayer][selected];

  const log: ILog[] = [];
  trigger(
    G,
    ctx,
    {
      type: SkillActionType.GUARD,
      condition: SkillCondition.GUARD,
      target: SkillTarget.SELF,
      on: SkillOn.ON_ACTION,
    },
    log
  );

  // trigger guard passive
  if (!selectedCharacter.isSilence) {
    selectedCharacter.skillSet.passive.forEach((targetSkill) => {
      if (targetSkill.condition === SkillCondition.GUARD) {
        trigger(G, ctx, targetSkill, log);
      }
    });
  }

  G.log.slice(-1)[0].push(...log);
  endMove(G, ctx);
};

export const switchMember = (
  G: IGameState,
  ctx: Ctx,
  ind: number
): IGameState | typeof INVALID_MOVE | void => {
  if (canSelect(G, ctx, ind)) {
    G.selected[ctx.currentPlayer] = ind;
  } else {
    return INVALID_MOVE;
  }
};

export const switchTarget = (
  G: IGameState,
  ctx: Ctx,
  ind: number
): IGameState | typeof INVALID_MOVE | void => {
  if (canTarget(G, ctx, ind)) {
    G.target[ctx.currentPlayer] = ind;
  } else {
    return INVALID_MOVE;
  }
};

export const doNothing = (G: IGameState, ctx: Ctx) => {
  if (G.selected[ctx.currentPlayer] !== -1) {
    G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]].isMoved = true;
    endMove(G, ctx);
  } else {
    G.lineups[ctx.currentPlayer].forEach((c) => {
      c.isMoved = true;
    });
  }
};
