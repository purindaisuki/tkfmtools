import type { Ctx } from "boardgame.io";
import { SkillEffect } from "types/skills";
import { IGameState } from "types/battle";
import charMap from "data/charMap";

interface CharMap {
  [id: string]: {
    rarity: number;
    tags: {
      attribute: number;
      position: number;
      race: number;
      body: number;
      oppai: number;
      rank: number;
      else: number[];
      available: boolean;
    };
    stats: {
      initATK: number;
      initHP: number;
    };
    potentialType: number;
  };
}

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

export const generateMaxedCharacterSetupData = (id: string) => {
  const { rarity } = (charMap as CharMap)[id];
  return {
    id: id,
    level: 60,
    potential: rarity < 2 ? 6 : 12,
    potentialSub: Array(6).fill(true),
    discipline: rarity === 0 ? 0 : 3,
    star: 5,
    bond: 5,
  };
};
