import { ISkill, SkillActionType, SkillEffect, ISkillSet, ExtraSkill } from "types/skills";
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

export interface IGameState {
  lineups: Record<string, BattleCharacter[]>;
  selected: Record<string, number>;
  target: Record<string, number>;
  skillQueue: SkillQueue;
  log: ILog[][];
}

export interface ILog {
  player: string;
  type: SkillActionType;
  value?: number;
  from: { player: string; position: number };
  to: {
    player: string;
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
