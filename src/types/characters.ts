export interface ICharacterData {
  id: string;
  rarity: number;
  tags: {
    attribute: number;
    position: number;
    race: number;
    body: number;
    oppai: number;
    rank: number;
    else: Array<number>;
    available: boolean;
  };
  stats: {
    initATK: number;
    initHP: number;
  };
  potentialType: number;
}

export enum CharacterAttribute {
  FIRE,
  WATER,
  WIND,
  LIGHT,
  DARK,
}

export enum CharacterPosition {
  ATTACKER = 5,
  PROTECTOR,
  HEALER,
  OBSTRUCTER,
  SUPPORT,
}

export enum CharacterTag {
  FIRE_ATTRIBUTE,
  WATER_ATTRIBUTE,
  WIND_ATTRIBUTE,
  LIGHT_ATTRIBUTE,
  DARK_ATTRIBUTE,
  ATTACKER,
  PROTECTER,
  HEALER,
  OBSTRUCTER,
  SUPPORTER,
  HUMAN,
  DEMON,
  DEMIHUMAN,
  SMALL_SIZED,
  MEDIUM_SIZED,
  FLAT_TITS,
  HOT_TITS,
  GIANT_TITS,
  SOLDIER,
  ELITE,
  LEADER,
  DAMAGE_OUTPUT,
  PROTECTION,
  DEFENSE,
  RECOVERY,
  INTERFERENCE,
  SUPPORT,
  WEAKEN,
  EXPLOSIVENESS,
  SURVIVABILITY,
  MORE_POWER,
  AOE,
  COUNTERSTRIKE,
}

export interface CharacterStats {
  id: string;
  level: number;
  potential: number;
  potentialSub: boolean[];
  discipline: number;
  star: number;
  bond: number;
}
