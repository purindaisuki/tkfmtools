import {
  ISkill,
  SkillActionType,
  SkillEffect,
  SkillOn,
  ISkillSet,
} from "types/skills";
import {
  CharacterAttribute,
  CharacterPosition,
  CharacterStats,
} from "types/characters";

export interface TestCharacterStats {
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
  extraSkill: ISkill[];
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

export interface IGameState {
  lineups: { [playerName: string]: BattleCharacter[] };
  selected: number;
  target: number;
  log: Log[][];
}

export interface Log {
  player: string;
  turn: number;
  type: SkillActionType;
  value?: number;
  from: string;
  to: string;
}

export type BattleSetupData = {
  lineups: [CharacterStats[], CharacterStats[] | TestCharacterStats[]];
};

export type SkillQueue = { cb: () => void; order: SkillOn }[];
