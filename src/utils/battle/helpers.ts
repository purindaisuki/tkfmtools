import type { Ctx } from "boardgame.io";
import { SkillEffect } from "types/skills";
import { IGameState } from "types/battle";

export const sameEffect = <T extends SkillEffect>(e1: T, e2: T) => {
  for (let p in e1) {
    if (p !== "duration" && p !== "stack" && e1[p] !== e2[p]) {
      return false;
    }
  }
  return true;
};

// always two players
export const getEnemies = (G: IGameState, ctx: Ctx) =>
  G.lineups[ctx.currentPlayer === "0" ? "1" : "0"];

export const merge = <T extends { [key: string]: any }[]>(...objects: T) =>
  objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      if (typeof result[key] === "object" && typeof current[key] === "object") {
        result[key] = merge(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    });

    return result;
  }, {}) as any;

export const generateMaxedCharacterSetupData = (id: string) => ({
  id: id,
  level: 60,
  potential: +id[0] < 3 ? 12 : 6,
  potentialSub: Array(6).fill(true),
  discipline: +id[0] < 4 ? 3 : 0,
  star: 5,
  bond: 5,
});
