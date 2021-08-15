import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { IGameState, ILog } from "types/battle";
import {
  SkillActionType,
  SkillCondition,
  SkillOn,
  SkillTarget,
} from "types/skills";
import { initCharacter } from ".";
import {
  attack,
  canSelect,
  canTarget,
  canAttack,
  canUltimate,
  doNothing,
  switchMember,
  switchTarget,
} from "./moves";
import { calcDamage, calcHeal, calcShield } from "./calculators";
import { generateMaxedCharacterSetupData } from "./helpers";

let G: IGameState;
let ctx: Ctx;

beforeEach(() => {
  const lineup = ["105", "157", "106"]
    .map((c) => generateMaxedCharacterSetupData(c))
    .map((c, i) => initCharacter(c, i));

  const enemy = ["101", "105", "106", "107"]
    .map((c) => generateMaxedCharacterSetupData(c))
    .map((c, i) => initCharacter(c, i));

  G = {
    lineups: { "0": lineup, "1": enemy },
    selected: { "0": 0, "1": 0 },
    target: { "0": 0, "1": 0 },
    taunt: { "0": [], "1": [] },
    skillQueue: [],
    log: [[]],
  };

  ctx = { currentPlayer: "0" } as Ctx;
});

describe("select validation", () => {
  test("should return true", () => {
    expect(canSelect(G, ctx, 0)).toBe(true);
  });

  test("should return true", () => {
    G.lineups["0"][0].isTaunt = true;
    G.lineups["0"][0].isSilence = true;

    expect(canSelect(G, ctx, 0)).toBe(true);
  });

  test("should return false: out of index", () => {
    expect(canSelect(G, ctx, 3)).toBe(false);
  });

  test("should return false: character moved", () => {
    G.lineups["0"][1].isMoved = true;

    expect(canSelect(G, ctx, 1)).toBe(false);
  });

  test("should return false: character dead", () => {
    G.lineups["0"][1].isDead = true;

    expect(canSelect(G, ctx, 1)).toBe(false);
  });

  test("should return false: character paralyzed", () => {
    G.lineups["0"][1].isParalysis = true;

    expect(canSelect(G, ctx, 1)).toBe(false);
  });

  test("should return false: character slept", () => {
    G.lineups["0"][1].isSleep = true;

    expect(canSelect(G, ctx, 1)).toBe(false);
  });

  test("should return false: character broken", () => {
    G.lineups["0"][1].isBroken = true;
    expect(canSelect(G, ctx, 1)).toBe(false);
  });
});

describe("target validation", () => {
  test("should return true", () => {
    G.lineups["1"][0].isParalysis = true;
    G.lineups["1"][0].isSleep = true;
    G.lineups["1"][0].isSilence = true;
    G.lineups["1"][0].isBroken = true;
    G.lineups["1"][0].isGuard = true;
    G.lineups["1"][0].isTaunt = true;

    expect(canTarget(G, ctx, 0)).toBe(true);
  });

  test("should return false: out of index", () => {
    expect(canTarget(G, ctx, 5)).toBe(false);
  });

  test("should return false: enemy is taunting", () => {
    G.lineups["1"][0].isTaunt = true;
    G.taunt["1"].push(0);

    expect(canTarget(G, ctx, 2)).toBe(false);
  });

  test("should return false: enemy is dead", () => {
    G.lineups["1"][0].isDead = true;

    expect(canTarget(G, ctx, 0)).toBe(false);
  });
});

describe("attack validation", () => {
  test("should return true", () => {
    expect(canAttack(G, ctx, 0, 0)).toBe(true);
  });

  test("should return false", () => {
    G.lineups["0"][0].isParalysis = true;

    expect(canAttack(G, ctx, 0, 2)).toBe(false);
  });

  test("can trigger attack", () => {
    const selected = G.lineups["0"][0];
    const target = G.lineups["1"][0];
    const damage = selected.skillSet.normalAttack
      .concat(selected.extraSkill)
      .concat(selected.skillSet.passive)
      .reduce((damage, skill) => {
        if (
          skill.type === SkillActionType.NORMAL_ATTACK &&
          skill.condition === SkillCondition.NORMAL_ATTACK &&
          (skill.target === SkillTarget.SINGLE_ENEMY || SkillTarget.ALL_ENEMIES)
        ) {
          damage += calcDamage(selected, target, skill);
        }
        return damage;
      }, 0);

    attack(G, ctx, 0, 0);

    expect(selected.isMoved).toBe(true);

    expect(target.HP).toBe(target.maxHP - damage);
  });

  test("can trigger heal", () => {
    const selected = G.lineups["0"][2];
    selected.HP = 1;
    const heal = selected.skillSet.normalAttack
      .concat(selected.extraSkill)
      .concat(selected.skillSet.passive)
      .reduce((heal, skill) => {
        if (
          skill.type === SkillActionType.HEAL &&
          skill.condition === SkillCondition.NORMAL_ATTACK &&
          (skill.target === SkillTarget.SELF ||
            skill.target === SkillTarget.TEAM ||
            skill.target === SkillTarget.TEAM_LEAST_HP)
        ) {
          heal += calcHeal(selected, selected, skill);
        }
        return heal;
      }, 0);

    const expectedHp = 1 + heal > selected.maxHP ? selected.maxHP : 1 + heal;

    attack(G, ctx, 2, 0);

    expect(selected.isMoved).toBe(true);

    expect(selected.HP).toBe(expectedHp);
  });

  test("can trigger shield", () => {
    const selected = G.lineups["0"][1];
    const shield = selected.skillSet.normalAttack
      .concat(selected.extraSkill)
      .concat(selected.skillSet.passive)
      .reduce((shield, skill) => {
        if (
          skill.type === SkillActionType.SHIELD &&
          skill.condition === SkillCondition.NORMAL_ATTACK &&
          (skill.target === SkillTarget.SELF ||
            skill.target === SkillTarget.TEAM)
        ) {
          shield += calcShield(selected, selected, skill);
        }
        return shield;
      }, 0);

    attack(G, ctx, 1, 0);

    expect(selected.isMoved).toBe(true);

    expect(selected.shield).toBe(shield);
  });

  test("can trigger skill effects", () => {
    const selected = G.lineups["0"][0];
    const target = G.lineups["1"][0];
    const expectedSkillsOnSelf = selected.skillSet.passive
      .concat(selected.skillSet.normalAttack)
      .concat(selected.extraSkill)
      .filter(
        (s) =>
          s.target === SkillTarget.SELF &&
          (s.condition === SkillCondition.ATTACK ||
            s.condition === SkillCondition.NORMAL_ATTACK) &&
          !(s.type in SkillActionType && s.on !== SkillOn.TURN_END)
      )
      .map((s) => ({
        ...s,
        from: 0,
        fromPlayer: "0",
        stack: s.maxStack ? 1 : undefined,
      }));
    const expectedSkillsOnTarget = target.skillSet.passive
      .concat(selected.extraSkill)
      .filter(
        (s) =>
          s.target === SkillTarget.SELF &&
          s.condition === SkillCondition.ATTACKED &&
          !(s.type in SkillActionType && s.on !== SkillOn.TURN_END)
      )
      .map((s) => ({
        ...s,
        from: 0,
        fromPlayer: "1",
        stack: s.maxStack ? 1 : undefined,
      }));

    attack(G, ctx, 0, 0);

    expect(selected.isMoved).toBe(true);

    expect(selected.effects).toHaveLength(expectedSkillsOnSelf.length);
    expect(selected.effects).toEqual(
      expect.arrayContaining(expectedSkillsOnSelf)
    );

    expect(target.effects).toHaveLength(expectedSkillsOnTarget.length);
    expect(target.effects).toEqual(
      expect.arrayContaining(expectedSkillsOnTarget)
    );
  });

  test("should not trigger passive skill effects", () => {
    const selected = G.lineups["0"][0];
    const target = G.lineups["1"][0];
    const expectedSkillsOnSelf = selected.skillSet.passive
      .concat(selected.skillSet.normalAttack)
      .concat(selected.extraSkill)
      .filter(
        (s) =>
          s.target === SkillTarget.SELF &&
          (s.condition === SkillCondition.ATTACK ||
            s.condition === SkillCondition.NORMAL_ATTACK) &&
          !(s.type in SkillActionType && s.on !== SkillOn.TURN_END)
      )
      .map((s) => ({
        ...s,
        from: 0,
        fromPlayer: "0",
        stack: s.maxStack ? 1 : undefined,
      }));
    const expectedSkillsOnTarget = target.skillSet.passive
      .concat(target.extraSkill)
      .filter(
        (s) =>
          s.target === SkillTarget.SELF &&
          s.condition === SkillCondition.ATTACKED &&
          !(s.type in SkillActionType && s.on !== SkillOn.TURN_END)
      )
      .map((s) => ({
        ...s,
        from: 0,
        fromPlayer: "1",
        stack: s.maxStack ? 1 : undefined,
      }));

    selected.isSilence = true;
    target.isSilence = true;
    attack(G, ctx, 0, 0);

    expect(selected.isMoved).toBe(true);

    expect(selected.effects).toHaveLength(0);
    expect(selected.effects).toEqual(
      expect.not.arrayContaining(expectedSkillsOnSelf)
    );

    expect(target.effects).toHaveLength(0);
    expect(target.effects).toEqual(
      expect.not.arrayContaining(expectedSkillsOnTarget)
    );
  });

  test("can push log", () => {
    const selected = G.lineups["0"][0];
    const target = G.lineups["1"][0];
    const expectedLog = selected.skillSet.normalAttack
      .concat(selected.extraSkill)
      .concat(selected.skillSet.passive)
      .reduce((arr, skill) => {
        if (
          skill.type === SkillActionType.NORMAL_ATTACK &&
          skill.condition === SkillCondition.NORMAL_ATTACK &&
          (skill.target === SkillTarget.SINGLE_ENEMY || SkillTarget.ALL_ENEMIES)
        ) {
          const damage = calcDamage(selected, target, skill);
          arr.push({
            player: "0",
            type: SkillActionType.NORMAL_ATTACK,
            value: damage,
            from: { player: "0", position: 0 },
            to: {
              player: "1",
              position: 0,
              originalHP: target.HP,
              HP: target.HP - damage,
              originalShield: 0,
              shield: 0,
            },
          });
        }
        return arr;
      }, [] as ILog[]);

    attack(G, ctx, 0, 0);

    expect(G.log.slice(-1)[0]).toEqual(expect.arrayContaining(expectedLog));
  });
});

describe("ultimate move validation", () => {
  test("should return true", () => {
    G.lineups["0"][0].currentCD = 0;

    expect(canUltimate(G, ctx, 0, 1)).toBe(true);
  });

  test("should return false: CD is not ready", () => {
    expect(canUltimate(G, ctx, 0, 2)).toBe(false);
  });

  test("should return false: character silenced", () => {
    G.lineups["0"][0].currentCD = 0;
    G.lineups["0"][0].isSilence = true;

    expect(canUltimate(G, ctx, 0, 2)).toBe(false);
  });
});

describe("switch selected validation", () => {
  test("should switch selected character", () => {
    switchMember(G, ctx, 1);

    expect(G.selected["0"]).toBe(1);
  });

  test("should return INVALID MOVE: out of index", () => {
    expect(switchMember(G, ctx, 3)).toBe(INVALID_MOVE);

    expect(G.selected["0"]).toBe(0);
  });

  test("should return INVALID MOVE: character moved", () => {
    G.lineups["0"][1].isMoved = true;

    expect(switchMember(G, ctx, 1)).toBe(INVALID_MOVE);

    expect(G.selected["0"]).toBe(0);
  });
});

describe("switch target validation", () => {
  test("should switch target", () => {
    switchTarget(G, ctx, 1);

    expect(G.target["0"]).toBe(1);
  });

  test("should return INVALID MOVE: out of index", () => {
    expect(switchMember(G, ctx, 5)).toBe(INVALID_MOVE);

    expect(G.target["0"]).toBe(0);
  });

  test("should return INVALID MOVE: enemy is taunting", () => {
    G.lineups["1"][0].isTaunt = true;
    G.taunt["1"].push(0);

    expect(switchTarget(G, ctx, 2)).toBe(INVALID_MOVE);

    expect(G.target["0"]).toBe(0);
  });

  test("should return INVALID MOVE: character dead", () => {
    G.lineups["1"][1].isDead = true;

    expect(switchTarget(G, ctx, 1)).toBe(INVALID_MOVE);

    expect(G.target["0"]).toBe(0);
  });
});

describe("doNothing", () => {
  test("should mark selected character moved", () => {
    doNothing(G, ctx);

    expect(G.lineups["0"][0].isMoved).toBe(true);
  });

  test("should mark everyone moved", () => {
    G.selected["0"] = -1;

    doNothing(G, ctx);

    expect(G.lineups["0"].every((c) => c.isMoved)).toBe(true);
  });
});
