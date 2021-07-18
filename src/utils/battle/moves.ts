import type { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import {
  SkillActionType,
  SkillCondition,
  SkillOn,
  SkillTarget,
} from "types/skills";
import { IGameState, ILog } from "types/battle";
import { endMove, trigger } from ".";
import { getEnemies } from "./helpers";

export const canSelect = (
  G: IGameState,
  ctx: Ctx,
  selected: number
): boolean => {
  const selectedCharacter = G.lineups[ctx.currentPlayer][selected];

  return !(
    !selectedCharacter ||
    selectedCharacter.isMoved ||
    selectedCharacter.isDead ||
    selectedCharacter.isParalysis ||
    selectedCharacter.isSleep ||
    selectedCharacter.isBroken
  );
};

export const canTarget = (G: IGameState, ctx: Ctx, target: number) => {
  const enemies = getEnemies(G, ctx);
  const tauntIndex = enemies.findIndex((c) => c.isTaunt && !c.isDead);

  return tauntIndex === -1 ? !enemies[target].isDead : tauntIndex === target;
};

export const canAttack = (
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): boolean => {
  if (!canSelect(G, ctx, selected)) {
    return false;
  }

  if (!canTarget(G, ctx, target)) {
    return false;
  }

  const self = G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]];
  return !(
    self.isMoved ||
    self.isDead ||
    self.isParalysis ||
    self.isSleep ||
    self.isBroken
  );
};

export const attack = (
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): IGameState | typeof INVALID_MOVE | void => {
  // mutate G directly is ok since it's handled by the library under the hood
  if (canAttack(G, ctx, selected, target)) {
    G.selected[ctx.currentPlayer] = selected;
    G.target[ctx.currentPlayer] = target;
  } else {
    return INVALID_MOVE;
  }

  const self = G.lineups[ctx.currentPlayer][selected];
  const log: ILog[] = [];
  let skills = [...self.skillSet.normalAttack, ...self.extraSkill];
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
  if (!canSelect(G, ctx, selected)) {
    return false;
  }

  if (!canTarget(G, ctx, target)) {
    return false;
  }

  const self = G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]];
  return !(
    self.isMoved ||
    self.currentCD > 0 ||
    self.isDead ||
    self.isParalysis ||
    self.isSleep ||
    self.isSilence ||
    self.isBroken
  );
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
  let skills = [...self.skillSet.ultimate, ...self.extraSkill];
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

  self.effects = self.effects.filter(
    (e) => e.invalidWhen !== SkillCondition.ULTIMATE
  );
  G.log.slice(-1)[0].push(...log);
  endMove(G, ctx);
};

export const canGuard = (
  G: IGameState,
  ctx: Ctx,
  selected: number
): boolean => {
  if (!canSelect(G, ctx, selected)) {
    return false;
  }

  const self = G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]];
  return !(
    self.isMoved ||
    self.isDead ||
    self.isParalysis ||
    self.isSleep ||
    self.isBroken
  );
};

export const guard = (
  G: IGameState,
  ctx: Ctx,
  selected: number
): IGameState | typeof INVALID_MOVE | void => {
  if (canGuard(G, ctx, selected)) {
    G.selected[ctx.currentPlayer] = selected;
  } else {
    return INVALID_MOVE;
  }

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
