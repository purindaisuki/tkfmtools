import { calcAttack, calcDamage, calcHeal, calcShield } from "./calculators";
import { data as skillData } from "data/characterSkill";
import { CharacterAttribute, CharacterPosition } from "types/characters";

const from = {
  from: 0,
  fromPlayer: "0",
};

const ATKBuffByValue = {
  ...skillData["106"].starPassive[1],
  value: 1234567,
  ...from,
};

const ATKBuffByPercentage = {
  ...skillData["126"].starPassive[2],
  value: 0.11,
  ...from,
};

const stackableATKBuffByPercentage = {
  ...skillData["101"].starPassive[1],
  value: 0.12,
  stack: 2,
  ...from,
};

const conditionalATKBuff = {
  ...skillData["103"].starPassive[0],
  otherConditionValue: 0.75,
  value: 0.15,
  ...from,
};

const normalAttackDamageBuff = {
  ...skillData["101"].starPassive[0],
  value: 0.13,
  ...from,
};

const normalAttackDamagedBuff = {
  ...skillData["137"].starPassive[2],
  value: 0.14,
  stack: 4,
  ...from,
};

const ultimateDamageBuff = {
  ...skillData["106"].leader[0],
  value: 0.15,
  ...from,
};

const ultimateDamagedBuff = {
  ...skillData["131"].leader[0],
  value: 0.16,
  ...from,
};

const attributeDamagedBuff = {
  ...skillData["128"].ultimate.common[0],
  value: 0.17,
  stack: 1,
  byAttribute: CharacterAttribute.FIRE,
  ...from,
};

const attributeEffectBuff = {
  ...skillData["215"].leader[0],
  value: 0.18,
  ...from,
};

const dealtDamageBuff = {
  ...skillData["101"].leader[1],
  value: 0.19,
  stack: 2,
  ...from,
};

const damagedBuff = {
  ...skillData["102"].starPassive[0],
  value: 0.2,
  ...from,
};

const guardEffectBuff = {
  ...skillData["102"].leader[1],
  value: 0.21,
  ...from,
};

const healBuff = {
  ...skillData["306"].starPassive[1],
  value: 0.22,
  ...from,
};

const healedBuff = {
  ...skillData["125"].starPassive[1],
  value: 0.23,
  ...from,
};

const shieldBuff = {
  ...skillData["211"].starPassive[2],
  value: 0.24,
  ...from,
};

const shieldedBuff = {
  ...skillData["126"].starPassive[1],
  value: 0.25,
  ...from,
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
  ],
  isMoved: false,
  isGuard: false,
  isBroken: false,
  isTaunt: false,
  isParalysis: false,
  isSleep: false,
  isSilence: false,
  isDead: false,
};

describe("attack power calculation", () => {
  test("conditional buffs take its effect", () => {
    expect(calcAttack(character)).toBe(2401232);
  });

  test("conditional buffs not take its effect", () => {
    expect(calcAttack({ ...character, HP: 1 })).toBe(2284565);
  });
});

describe("damage calculation", () => {
  test("normal attack damage", () => {
    expect(
      calcDamage(character, character, skillData["101"].normalAttack[0])
    ).toBe(3274408);
  });

  test("damage with attribute effect", () => {
    expect(
      calcDamage(
        character,
        { ...character, attribute: CharacterAttribute.WIND },
        skillData["101"].normalAttack[0]
      )
    ).toBe(5554052);
  });

  test("ultimate damage", () => {
    expect(
      calcDamage(character, character, skillData["101"].ultimate.common[1])
    ).toBe(8375898);
  });

  test("damage when opponent guards", () => {
    expect(
      calcDamage(
        character,
        { ...character, isGuard: true },
        skillData["101"].ultimate.common[1]
      )
    ).toBe(2429010);
  });

  test("real damage", () => {
    expect(
      calcDamage(
        character,
        { ...character, HP: 123456 },
        { ...skillData["117"].starPassive[3], value: 0.3 }
      )
    ).toBe(37036);
  });

  test("dot", () => {
    expect(
      calcDamage(character, character, {
        ...skillData["125"].normalAttack[0],
        value: 123456,
      })
    ).toBe(148147);
  });

  test("follow up attack", () => {
    expect(
      calcDamage(character, character, {
        ...skillData["103"].leader[0],
        value: 1,
      })
    ).toBe(2538151);
  });
});

describe("heal calculation", () => {
  test("heal by self attack (normal attack)", () => {
    expect(
      calcHeal(
        character,
        { ...character, ATK: 0 },
        { ...skillData["106"].normalAttack[0], value: 1 },
        123456
      )
    ).toBe(1695678);
  });

  test("heal by self attack (ultimate)", () => {
    expect(
      calcHeal(
        character,
        { ...character, ATK: 0 },
        { ...skillData["106"].ultimate.common[0], value: 1 },
        123456
      )
    ).toBe(1725690);
  });

  test("heal by target attack(end turn heal)", () => {
    expect(
      calcHeal(
        { ...character, ATK: 0 },
        character,
        { ...skillData["126"].leader[1], value: 456456 },
        123456
      )
    ).toBe(561440);
  });

  test("heal by damage", () => {
    expect(
      calcHeal(
        character,
        character,
        { ...skillData["103"].starPassive[2], value: 0.1 },
        123456
      )
    ).toBe(12345);
  });

  test("heal by maxHP", () => {
    expect(
      calcHeal(
        { ...character, HP: 321321, maxHP: 1 },
        character,
        { ...skillData["403"].starPassive[0], value: 1 },
        123456
      )
    ).toBe(615000);
  });
});

describe("shield calculation", () => {
  test("shield (normal attack)", () => {
    expect(
      calcShield(
        character,
        { ...character, ATK: 0 },
        { ...skillData["157"].normalAttack[0], value: 1 }
      )
    ).toBe(1751500);
  });

  test("shield (ultimate)", () => {
    expect(
      calcShield(
        character,
        { ...character, ATK: 0 },
        { ...skillData["157"].ultimate.common[0], value: 1 }
      )
    ).toBe(1782500);
  });

  test("shield by maxHP", () => {
    expect(
      calcShield({ ...character, HP: 321321, maxHP: 1 }, character, {
        ...skillData["210"].normalAttack[0],
        value: 1,
      })
    ).toBe(625000);
  });
});
