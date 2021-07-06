export enum SkillTarget {
  SELF,
  TEAM,
  TEAM_EXCEPT_SELF,
  TEAM_LEAST_HP,
  SINGLE_ENEMY,
  ALL_ENEMIES,
  FIRE,
  WATER,
  WIND,
  LIGHT,
  DARK,
  ATTACKER,
  PROTECTOR,
  HEALER,
  OBSTRUCTER,
  SUPPORT,
}

export enum SkillActionType {
  CANCEL_GUARD,
  CHANGE_CD,
  CHANGE_CURRENT_CD,
  CHANGE_MAX_HP,
  COUNTER_STRIKE,
  EXTRA_ATTACK,
  FOLLOW_UP_ATTACK,
  FREEZE_CD,
  GUARD,
  HEAL,
  NORMAL_ATTACK,
  PARALYSIS,
  SHIELD,
  SLEEP,
  SILENCE,
  TAUNT,
  ULTIMATE,
  CLEAR_ABNORMAL,
  CLEAR_DEBUFF,
  ADDSKILL,
}

export enum SkillEffectType {
  ATTACK_POWER = 20,
  NORMAL_ATTACK_DAMAGE,
  ULTIMATE_DAMAGE,
  DEALT_DAMAGE,
  ATTRIBUTE_DAMAGED,
  ATTRIBUTE_EFFECT,
  DAMAGED,
  NORMAL_ATTACK_DAMAGED,
  ULTIMATE_DAMAGED,
  GUARD_EFFECT,
  SHIELD_EFFECT,
  SHIELDED,
  HEAL_EFFECT,
  HEALED,
  IMMUNE_SILENCE,
  IMMUNE_PARALYSIS,
  IMMUNE_SLEEP,
}

export enum SkillEffectBasis {
  SELF_ATK,
  TARGET_ATK,
  TARGET_MAX_HP,
  DAMAGE,
}

export enum SkillCondition {
  ATTACK,
  NORMAL_ATTACK,
  ULTIMATE,
  GUARD,
  ATTACKED,
  HEALED,
  TURN_BASED,
  BATTLE_BEGIN,
  HP_GREATER_THAN,
  HP_LESS_THAN,
}

export enum SkillOn {
  BATTLE_BEGIN,
  TURN_BEGIN,
  BEFORE_ACTION,
  ON_ACTION,
  AFTER_ACTION,
  TURN_END,
}

export interface Skill {
  type: SkillActionType | SkillEffectType;
  condition: SkillCondition;
  conditionValue?: number;
  otherCondition?: SkillCondition.HP_GREATER_THAN | SkillCondition.HP_LESS_THAN;
  otherConditionValue?: number;
  value?: number;
  basis?: SkillEffectBasis;
  target: SkillTarget | number[];
  on: SkillOn;
  duration?: number /* undefined -> always */;
  CD?: number;
  maxStack?: number /* undefined -> no limit */;
  byAttribute?: number /* get extra damaged by A attribute */;
  repeat?: number;
  skill?: {
    condition:
      | SkillCondition.NORMAL_ATTACK
      | SkillCondition.ULTIMATE
      | SkillCondition.ATTACK;
    type:
      | SkillActionType.NORMAL_ATTACK
      | SkillActionType.ULTIMATE
      | SkillActionType.FOLLOW_UP_ATTACK
      | SkillEffectType.ATTACK_POWER;
    basis?: SkillEffectBasis.TARGET_ATK;
    value: number;
    target: SkillTarget.SINGLE_ENEMY | SkillTarget.TEAM;
    on: SkillOn;
    duration?: number;
  };
}

export type ConditionalPassiveSkill = Omit<Skill, "CD" | "maxStack"> & {
  condition: SkillCondition.BATTLE_BEGIN;
  otherCondition: SkillCondition.HP_GREATER_THAN | SkillCondition.HP_LESS_THAN;
  otherConditionValue: number;
  value: number;
};

export type StackableSkill = Omit<Skill, "duartion"> & {
  value: number;
  maxStack: number;
};

export type UltimateSkill = Skill & {
  condition: SkillCondition.ULTIMATE;
  conditionValue?: number;
  CD: number;
};

export type TurnBasedSkill = Skill & {
  condition: SkillCondition.TURN_BASED;
  conditionValue: number /* trigger at (n + 1)th turn */;
  value: number;
};

export type FollowUpAttackSkill = Skill & {
  type: SkillActionType.FOLLOW_UP_ATTACK;
  value: number;
  repeat: number;
};

export type SkillAction = Omit<Skill, "type"> & {
  type: SkillActionType;
};

export type SkillEffect = Omit<Skill, "CD"> & {
  from: string;
  stack?: number;
};

export interface SkillSet {
  leader: Skill[];
  normalAttack: Exclude<Skill, TurnBasedSkill>[];
  ultimate: UltimateSkill[];
  passive: Skill[];
}

export const potentialPassive = (
  potential: number,
  type:
    | SkillEffectType.ATTACK_POWER
    | SkillEffectType.DAMAGED
    | SkillEffectType.GUARD_EFFECT
    | SkillEffectType.HEAL_EFFECT
    | SkillEffectType.NORMAL_ATTACK_DAMAGE
    | SkillEffectType.ULTIMATE_DAMAGE
    | SkillEffectType.IMMUNE_SILENCE
    | SkillEffectType.IMMUNE_PARALYSIS
    | SkillEffectType.IMMUNE_SLEEP
) => {
  const passive: Skill & { potential: number } = {
    potential: potential,
    type: type,
    condition: SkillCondition.BATTLE_BEGIN,
    target: SkillTarget.SELF,
    on: SkillOn.TURN_BEGIN,
  };

  switch (type) {
    case SkillEffectType.ATTACK_POWER:
      passive.value = 0.1;
      passive.basis = SkillEffectBasis.TARGET_ATK;
      break;
    case SkillEffectType.DAMAGED:
      passive.value = -0.05;
      break;
    case SkillEffectType.GUARD_EFFECT:
      passive.value = 0.1;
      break;
    case SkillEffectType.HEAL_EFFECT:
      passive.value = 0.15;
      break;
    case SkillEffectType.NORMAL_ATTACK_DAMAGE:
      passive.value = 0.1;
      break;
    case SkillEffectType.ULTIMATE_DAMAGE:
      passive.value = 0.1;
      break;
  }

  return passive;
};
