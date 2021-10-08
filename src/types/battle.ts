import type { Ctx } from "boardgame.io";
import {
  ISkill,
  SkillActionType,
  SkillEffect,
  ISkillSet,
  ExtraSkill,
} from "types/skills";
import {
  CharacterAttribute,
  CharacterPosition,
  CharacterStats,
} from "types/characters";

export interface ScarecrowStats {
  id: "scarecrow";
  attribute: number;
  ATK: number;
  HP: number;
}

export interface BattleCharacter {
  readonly id: string;
  readonly attribute: CharacterAttribute;
  readonly position: CharacterPosition;
  readonly baseATK: number;
  readonly baseHP: number;
  maxHP: number;
  readonly skillSet: ISkillSet;
  extraSkill: ExtraSkill[];
  ATK: number;
  HP: number;
  shield: number;
  CD: number;
  currentCD: number;
  teamPosition: number;
  effects: SkillEffect[];
  isMoved: boolean;
  isGuard: boolean;
  isBroken: boolean;
  isTaunt: boolean;
  isParalysis: boolean;
  isSleep: boolean;
  isSilence: boolean;
  isDead: boolean;
}

export type SkillQueue = {
  selected: number;
  target: number;
  skill: ISkill;
}[];

export type PlayerID = "0" | "1";

export type BattleCtx = Ctx & {
  currentPlayer: PlayerID;
};

export interface IGameState {
  lineups: Record<PlayerID, BattleCharacter[]>;
  selected: Record<PlayerID, number>;
  target: Record<PlayerID, number>;
  taunt: Record<PlayerID, number[]>;
  skillQueue: SkillQueue;
  log: ILog[][];
}

export interface ILog {
  player: PlayerID;
  type: SkillActionType;
  value?: number;
  from: { player: PlayerID; position: number };
  to: {
    player: PlayerID;
    position: number;
    originalHP: number;
    HP: number;
    originalShield: number;
    shield: number;
  };
}

export type BattleSetupData = {
  lineups: [CharacterStats[], CharacterStats[] | ScarecrowStats[]];
  iterations?: number;
  playoutDepth?: number;
};
