import { calcAttack, calcDamage, calcHeal, calcShield } from "./calculators";
import { CharacterAttribute, CharacterPosition } from "types/characters";
import {
  SkillActionType,
  SkillCondition,
  SkillEffectBasis,
  SkillEffectType,
  SkillOn,
  SkillTarget,
} from "types/skills";
import { BattleCharacter } from "types/battle";

const from = {
  from: 0,
  fromPlayer: "0",
};

const ATKBuffByValue = {
  condition: SkillCondition.ATTACK,
  target: SkillTarget.TEAM,
  duration: 1,
  type: SkillEffectType.ATTACK_POWER,
  basis: SkillEffectBasis.SELF_ATK,
  on: SkillOn.AFTER_ACTION,
  value: 1234567,
};

const ATKBuffByPercentage = {
  condition: SkillCondition.ULTIMATE,
  target: SkillTarget.TEAM,
  duration: 12,
  type: SkillEffectType.ATTACK_POWER,
  basis: SkillEffectBasis.TARGET_ATK,
  on: SkillOn.AFTER_ACTION,
  value: 0.11,
};

const stackableATKBuffByPercentage = {
  condition: SkillCondition.ATTACKED,
  target: SkillTarget.SELF,
  type: SkillEffectType.ATTACK_POWER,
  basis: SkillEffectBasis.TARGET_ATK,
  on: SkillOn.AFTER_ACTION,
  maxStack: 2,
  value: 0.12,
  stack: 2,
};

const conditionalATKBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  otherCondition: SkillCondition.HP_GREATER_THAN,
  otherConditionValue: 0.75,
  target: SkillTarget.SELF,
  type: SkillEffectType.ATTACK_POWER,
  basis: SkillEffectBasis.TARGET_ATK,
  on: SkillOn.BEFORE_ACTION,
  value: 0.15,
};

const normalAttackDamageBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.SELF,
  type: SkillEffectType.NORMAL_ATTACK_DAMAGE,
  on: SkillOn.TURN_BEGIN,
  value: 0.13,
};

const normalAttackDamagedBuff = {
  condition: SkillCondition.ATTACK,
  target: SkillTarget.SINGLE_ENEMY,
  type: SkillEffectType.NORMAL_ATTACK_DAMAGED,
  on: SkillOn.AFTER_ACTION,
  maxStack: 10,
  value: 0.14,
  stack: 4,
};

const ultimateDamageBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.TEAM,
  type: SkillEffectType.ULTIMATE_DAMAGE,
  on: SkillOn.TURN_BEGIN,
  value: 0.15,
};

const ultimateDamagedBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.SINGLE_ENEMY,
  type: SkillEffectType.ULTIMATE_DAMAGED,
  on: SkillOn.TURN_BEGIN,
  value: 0.16,
};

const attributeDamagedBuff = {
  condition: SkillCondition.ULTIMATE,
  target: SkillTarget.SINGLE_ENEMY,
  type: SkillEffectType.ATTRIBUTE_DAMAGED,
  on: SkillOn.BEFORE_ACTION,
  maxStack: 2,
  value: 0.17,
  stack: 1,
  byAttribute: CharacterAttribute.FIRE,
};

const attributeEffectBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.TEAM,
  type: SkillEffectType.ATTRIBUTE_EFFECT,
  on: SkillOn.TURN_BEGIN,
  value: 0.18,
};

const dealtDamageBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.TEAM_EXCEPT_SELF,
  type: SkillEffectType.DEALT_DAMAGE,
  on: SkillOn.TURN_BEGIN,
  value: 0.19,
  stack: 2,
};

const damagedBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.SELF,
  type: SkillEffectType.DAMAGED,
  on: SkillOn.TURN_BEGIN,
  value: 0.2,
};

const guardEffectBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.SELF,
  type: SkillEffectType.GUARD_EFFECT,
  on: SkillOn.TURN_BEGIN,
  value: 0.21,
};

const healBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.SELF,
  type: SkillEffectType.HEAL_EFFECT,
  on: SkillOn.TURN_BEGIN,
  value: 0.22,
};

const healedBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.SELF,
  type: SkillEffectType.HEALED,
  on: SkillOn.TURN_BEGIN,
  value: 0.23,
};

const shieldBuff = {
  condition: SkillCondition.BATTLE_BEGIN,
  target: SkillTarget.SELF,
  type: SkillEffectType.SHIELD_EFFECT,
  on: SkillOn.TURN_BEGIN,
  value: 0.24,
};

const shieldedBuff = {
  condition: SkillCondition.ATTACK,
  target: SkillTarget.TEAM,
  duration: 2,
  type: SkillEffectType.SHIELDED,
  on: SkillOn.AFTER_ACTION,
  value: 0.25,
};

const character = {
  id: "101",
  attribute: CharacterAttribute.FIRE,
  position: CharacterPosition.ATTACKER,
  baseATK: 777777,
  baseHP: 888888,
  maxHP: 500000,
  skillSet: {
    leader: [],
    ultimate: [],
    normalAttack: [],
    passive: [],
  },
  extraSkill: [],
  ATK: 1000000,
  HP: 400000,
  shield: 0,
  CD: 0,
  currentCD: 0,
  teamPosition: 0,
  effects: [
    ATKBuffByValue,
    ATKBuffByPercentage,
    stackableATKBuffByPercentage,
    conditionalATKBuff,
    normalAttackDamageBuff,
    normalAttackDamagedBuff,
    ultimateDamageBuff,
    ultimateDamagedBuff,
    damagedBuff,
    dealtDamageBuff,
    attributeDamagedBuff,
    attributeEffectBuff,
    guardEffectBuff,
    healBuff,
    healedBuff,
    shieldBuff,
    shieldedBuff,
  ].map((e) => ({ ...e, ...from })),
  isMoved: false,
  isGuard: false,
  isBroken: false,
  isTaunt: false,
  isParalysis: false,
  isSleep: false,
  isSilence: false,
  isDead: false,
} as BattleCharacter;

describe("attack power calculation", () => {
  test("conditional buffs take its effect", () => {
    expect(calcAttack(character)).toBe(2401232);
  });

  test("conditional buffs not take its effect", () => {
    expect(calcAttack({ ...character, HP: 1 })).toBe(2284565);
  });
});

describe("damage calculation", () => {
  const normalAttack = {
    condition: SkillCondition.NORMAL_ATTACK,
    target: SkillTarget.SINGLE_ENEMY,
    type: SkillActionType.NORMAL_ATTACK,
    value: 1,
    on: SkillOn.ON_ACTION,
  };

  const ultimate = {
    condition: SkillCondition.ULTIMATE,
    target: SkillTarget.SINGLE_ENEMY,
    type: SkillActionType.ULTIMATE,
    value: 3.3,
    CD: 4,
    on: SkillOn.ON_ACTION,
  };

  test("normal attack damage", () => {
    expect(calcDamage(character, character, normalAttack)).toBe(3274408);
  });

  test("damage with attribute effect", () => {
    expect(
      calcDamage(
        character,
        { ...character, attribute: CharacterAttribute.WIND },
        normalAttack
      )
    ).toBe(5554052);
  });

  test("ultimate damage", () => {
    expect(calcDamage(character, character, ultimate)).toBe(8375898);
  });

  test("damage when opponent guards", () => {
    expect(
      calcDamage(character, { ...character, isGuard: true }, ultimate)
    ).toBe(2429010);
  });

  test("real attack", () => {
    const realAttack = {
      condition: SkillCondition.BATTLE_BEGIN,
      conditionValue: 1,
      target: SkillTarget.SELF,
      type: SkillActionType.REAL_ATTACK,
      basis: SkillEffectBasis.TARGET_CURRENT_HP,
      value: 0.3,
      on: SkillOn.TURN_BEGIN,
    };

    expect(
      calcDamage(character, { ...character, HP: 123456 }, realAttack)
    ).toBe(37036);
  });

  test("dot", () => {
    const dot = {
      condition: SkillCondition.NORMAL_ATTACK,
      target: SkillTarget.SINGLE_ENEMY,
      type: SkillActionType.NORMAL_ATTACK,
      basis: SkillEffectBasis.SELF_ATK,
      value: 123456,
      on: SkillOn.TURN_END,
      duration: 4,
    };

    expect(calcDamage(character, character, dot)).toBe(148147);
  });

  test("follow up attack", () => {
    const followupAttack = {
      condition: SkillCondition.ATTACK,
      target: SkillTarget.ALL_ENEMIES,
      type: SkillActionType.FOLLOW_UP_ATTACK,
      value: 1,
      on: SkillOn.AFTER_ACTION,
      repeat: 1,
    };
    expect(calcDamage(character, character, followupAttack)).toBe(2538151);
  });
});

describe("heal calculation", () => {
  test("heal by self attack (normal attack)", () => {
    const heal = {
      condition: SkillCondition.NORMAL_ATTACK,
      target: SkillTarget.TEAM,
      type: SkillActionType.HEAL,
      basis: SkillEffectBasis.SELF_ATK,
      value: 1,
      on: SkillOn.ON_ACTION,
    };

    expect(calcHeal(character, { ...character, ATK: 0 }, heal, 123456)).toBe(
      1695678
    );
  });

  test("heal by self attack (ultimate)", () => {
    const heal = {
      condition: SkillCondition.ULTIMATE,
      target: SkillTarget.TEAM,
      type: SkillActionType.HEAL,
      basis: SkillEffectBasis.SELF_ATK,
      value: 1,
      CD: 5,
      on: SkillOn.ON_ACTION,
    };

    expect(calcHeal(character, { ...character, ATK: 0 }, heal, 123456)).toBe(
      1725690
    );
  });

  test("heal by target attack(end turn heal)", () => {
    const heal = {
      condition: SkillCondition.BATTLE_BEGIN,
      target: SkillTarget.TEAM,
      type: SkillActionType.HEAL,
      basis: SkillEffectBasis.TARGET_ATK,
      value: 456456,
      on: SkillOn.TURN_END,
    };

    expect(calcHeal({ ...character, ATK: 0 }, character, heal, 123456)).toBe(
      561440
    );
  });

  test("heal by damage", () => {
    const heal = {
      star: 3,
      condition: SkillCondition.ATTACK,
      target: SkillTarget.SELF,
      type: SkillActionType.HEAL,
      basis: SkillEffectBasis.DAMAGE,
      value: 0.1,
      on: SkillOn.ON_ACTION,
    };

    expect(calcHeal(character, character, heal, 123456)).toBe(15185);
  });

  test("heal by maxHP", () => {
    const heal = {
      condition: SkillCondition.NORMAL_ATTACK,
      target: SkillTarget.SELF,
      type: SkillActionType.HEAL,
      basis: SkillEffectBasis.TARGET_MAX_HP,
      on: SkillOn.AFTER_ACTION,
      value: 1,
      possibility: 0.5,
    };

    expect(
      calcHeal({ ...character, HP: 321321, maxHP: 1 }, character, heal, 123456)
    ).toBe(615000);
  });
});

describe("shield calculation", () => {
  test("shield (normal attack)", () => {
    const shield = {
      condition: SkillCondition.NORMAL_ATTACK,
      target: SkillTarget.TEAM,
      duration: 1,
      type: SkillActionType.SHIELD,
      basis: SkillEffectBasis.SELF_ATK,
      value: 1,
      on: SkillOn.ON_ACTION,
    };

    expect(calcShield(character, { ...character, ATK: 0 }, shield)).toBe(
      1751500
    );
  });

  test("shield (ultimate)", () => {
    const shield = {
      condition: SkillCondition.ULTIMATE,
      target: SkillTarget.TEAM,
      duration: 2,
      type: SkillActionType.SHIELD,
      basis: SkillEffectBasis.SELF_ATK,
      value: 1,
      on: SkillOn.ON_ACTION,
    };

    expect(calcShield(character, { ...character, ATK: 0 }, shield)).toBe(
      1782500
    );
  });

  test("shield by maxHP", () => {
    const shield = {
      condition: SkillCondition.NORMAL_ATTACK,
      target: SkillTarget.SELF,
      type: SkillActionType.SHIELD,
      basis: SkillEffectBasis.TARGET_MAX_HP,
      value: 1,
      on: SkillOn.ON_ACTION,
      duration: 2,
    };

    expect(
      calcShield({ ...character, HP: 321321, maxHP: 1 }, character, shield)
    ).toBe(625000);
  });
});
