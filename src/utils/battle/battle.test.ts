import { Ctx } from "boardgame.io";
import { Client } from "boardgame.io/client";
import { BattleSetupData, IGameState, ScarecrowStats } from "types/battle";
import {
  ExtraSkill,
  SkillCondition,
  SkillEffect,
  SkillTarget,
} from "types/skills";
import { CharacterAttribute, CharacterPosition } from "types/characters";
import { Battle, endMove, initCharacter, nextTarget } from ".";
import { trigger } from "./processSkill";
import { calcAttack } from "./calculators";
import { generateMaxedCharacterSetupData, sameEffect } from "./helpers";
import calcCharStats from "utils/calcCharStats";
import { data as skillData } from "data/characterSkill";

describe("character initialization", () => {
  test("should return initialized character including leader skills", () => {
    const characterSetupData = generateMaxedCharacterSetupData("101");
    const { ATK: baseATK, HP: baseHP } = calcCharStats(characterSetupData);
    const skills = skillData["101"];
    const ultimate = skills.ultimate.common;

    Object.entries(skills.ultimate.bond[4]).forEach(([ind, replace]) => {
      Object.entries(replace).forEach(([key, value]) => {
        (ultimate[+ind] as { [key: string]: any })[key] = value;
      });
    });

    const passive = skills.leader
      .concat(
        skills.starPassive.map((s) => {
          const { star, ...rest } = s;
          return rest;
        })
      )
      .concat(
        skills.potentialPassive.map((s) => {
          const { potential, ...rest } = s;
          return rest;
        })
      );
    const expectedCharacter = {
      id: "101",
      attribute: CharacterAttribute.FIRE,
      position: CharacterPosition.ATTACKER,
      baseATK: baseATK,
      baseHP: baseHP,
      maxHP: baseHP,
      skillSet: {
        normalAttack: skills.normalAttack,
        ultimate,
        passive,
      },
      extraSkill: [],
      ATK: baseATK,
      HP: baseHP,
      shield: 0,
      CD: ultimate[0].CD,
      currentCD: ultimate[0].CD,
      teamPosition: 0,
      effects: [],
      isMoved: false,
      isGuard: false,
      isBroken: false,
      isTaunt: false,
      isParalysis: false,
      isSleep: false,
      isSilence: false,
      isDead: false,
    };
    const character = initCharacter(characterSetupData, 0);

    expect(character).toStrictEqual(expectedCharacter);
  });

  test("should return initialized character not including leader skills", () => {
    const characterSetupData = generateMaxedCharacterSetupData("101");
    const { ATK: baseATK, HP: baseHP } = calcCharStats(characterSetupData);
    const skills = skillData["101"];
    const ultimate = skills.ultimate.common;

    Object.entries(skills.ultimate.bond[4]).forEach(([ind, replace]) => {
      Object.entries(replace).forEach(([key, value]) => {
        (ultimate[+ind] as { [key: string]: any })[key] = value;
      });
    });

    const passive = skills.starPassive
      .map((s) => {
        const { star, ...rest } = s;
        return rest;
      })
      .concat(
        skills.potentialPassive.map((s) => {
          const { potential, ...rest } = s;
          return rest;
        })
      );
    const expectedCharacter = {
      id: "101",
      attribute: CharacterAttribute.FIRE,
      position: CharacterPosition.ATTACKER,
      baseATK: baseATK,
      baseHP: baseHP,
      maxHP: baseHP,
      skillSet: {
        normalAttack: skills.normalAttack,
        ultimate,
        passive,
      },
      extraSkill: [],
      ATK: baseATK,
      HP: baseHP,
      shield: 0,
      CD: ultimate[0].CD,
      currentCD: ultimate[0].CD,
      teamPosition: 1,
      effects: [],
      isMoved: false,
      isGuard: false,
      isBroken: false,
      isTaunt: false,
      isParalysis: false,
      isSleep: false,
      isSilence: false,
      isDead: false,
    };
    const character = initCharacter(characterSetupData, 1);

    expect(character).toStrictEqual(expectedCharacter);
  });

  test("should return scarecrow", () => {
    const characterSetupData = {
      id: "scarecrow",
      attribute: CharacterAttribute.WIND,
      ATK: 123,
      HP: 456,
    } as ScarecrowStats;
    const expectedCharacter = {
      id: "scarecrow",
      attribute: characterSetupData.attribute,
      position: 5,
      baseATK: characterSetupData.ATK,
      baseHP: characterSetupData.HP,
      maxHP: characterSetupData.HP,
      skillSet: {
        normalAttack: [],
        ultimate: [],
        passive: [],
      },
      extraSkill: [],
      ATK: characterSetupData.ATK,
      HP: characterSetupData.HP,
      shield: 0,
      CD: 0,
      currentCD: 51,
      teamPosition: 0,
      effects: [],
      isMoved: false,
      isGuard: false,
      isBroken: false,
      isTaunt: false,
      isParalysis: false,
      isSleep: false,
      isSilence: false,
      isDead: false,
    };
    const character = initCharacter(characterSetupData, 0);

    expect(character).toStrictEqual(expectedCharacter);
  });

  test("should throw error", () => {
    const characterSetupData = generateMaxedCharacterSetupData("101");
    characterSetupData.id = "888";

    expect(() => {
      initCharacter(characterSetupData, 0);
    }).toThrow("invalid character id: 888");
  });
});

describe("battle helpers", () => {
  let G: IGameState;
  let ctx: Ctx;

  beforeEach(() => {
    const lineup = ["105", "157", "106", "409", "216"]
      .map((c) => generateMaxedCharacterSetupData(c))
      .map((c, i) => ({
        ...initCharacter(c, i),
        skillSet: {
          leader: [],
          normalAttack: [],
          ultimate: [],
          passive: [],
        },
      }));

    const enemy = ["101", "102", "106", "107"]
      .map((c) => generateMaxedCharacterSetupData(c))
      .map((c, i) => ({
        ...initCharacter(c, i),
        skillSet: {
          leader: [],
          normalAttack: [],
          ultimate: [],
          passive: [],
        },
      }));

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

  test("should return next target", () => {
    const enemies = G.lineups["1"];
    let expectedTaget = enemies[G.target["0"]].isDead
      ? G.taunt["1"].length === 0
        ? enemies.findIndex((c) => !c.isDead)
        : G.taunt["1"][0]
      : G.target["0"];

    expect(nextTarget(G, ctx)).toBe(expectedTaget);
  });

  test("should change selected characters", () => {
    const expectedSelected = G.selected["0"] + 1;
    const expectedTarget = G.target["0"];

    endMove(G, ctx);

    expect(G.selected["0"]).toBe(expectedSelected);
    expect(G.target["0"]).toBe(expectedTarget);
  });

  test("should change selected and target characters", () => {
    const selected = G.selected["0"];
    const target = G.target["0"];

    G.lineups["0"][selected + 1].isMoved = true;
    G.lineups["1"][target].isDead = true;

    const expectedSelected = selected + 2;
    const expectedTarget = target + 1;

    endMove(G, ctx);

    expect(G.selected["0"]).toBe(expectedSelected);
    expect(G.target["0"]).toBe(expectedTarget);
  });

  test("should change selected and target characters", () => {
    const selected = G.selected["0"];
    const target = G.target["0"];

    G.lineups["0"][selected + 1].isParalysis = true;
    G.lineups["1"][target + 2].isTaunt = true;
    G.taunt["1"].push(target + 2);

    const expectedSelected = selected + 2;
    const expectedTarget = target + 2;

    endMove(G, ctx);

    expect(G.selected["0"]).toBe(expectedSelected);
    expect(G.target["0"]).toBe(expectedTarget);
  });
});

describe("battle system", () => {
  const getClient = (setupData: BattleSetupData) =>
    Client({
      game: Battle(setupData),
    });

  test("should set lineups and trigger skills should be triggered on battle begin", () => {
    const setupData = {
      lineups: [
        ["101", "103", "105", "107", "117"].map((c) =>
          generateMaxedCharacterSetupData(c)
        ),
        ["102", "104", "106", "108"].map((c) =>
          generateMaxedCharacterSetupData(c)
        ),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);
    const expectedLineups = setupData.lineups.map((lineup) =>
      lineup.map((c, i) => initCharacter(c, i))
    );
    const G = {
      lineups: { "0": expectedLineups[0], "1": expectedLineups[1] },
      selected: { "0": 0, "1": 0 },
      target: { "0": 0, "1": 0 },
      taunt: { "0": [], "1": [] },
      skillQueue: [],
      log: [[]],
    } as IGameState;
    const ctx = { currentPlayer: "0" } as Ctx;

    expectedLineups.forEach((lineup, player) => {
      lineup.forEach((c, ind) => {
        const tempG = {
          ...G,
          selected: { ...G.selected, [player.toString()]: ind },
        };
        const tempCtx = { ...ctx, currentPlayer: player.toString() };

        c.skillSet.passive.forEach((s) => {
          if (s.condition === SkillCondition.BATTLE_BEGIN) {
            trigger(tempG, tempCtx, s);
          }
        });
        c.ATK = calcAttack(c);
      });
    });

    expect(client.getState()?.G as IGameState).toStrictEqual(G);
    expect(client.getInitialState()?.G as IGameState).toStrictEqual(G);
  });

  test("should change selected to next character", () => {
    const setupData = {
      lineups: [
        ["125", "126", "127", "128", "129"].map((c) =>
          generateMaxedCharacterSetupData(c)
        ),
        ["130", "131", "132", "157"].map((c) =>
          generateMaxedCharacterSetupData(c)
        ),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);
    const { guard } = client.moves;

    guard(0);
    expect((client.getState()?.G as IGameState).selected["0"]).toBe(1);
  });

  test("should change player", () => {
    const setupData = {
      lineups: [
        ["236", "137", "238", "209", "210"].map((c) =>
          generateMaxedCharacterSetupData(c)
        ),
        ["211", "212", "213", "214", "215"].map((c) =>
          generateMaxedCharacterSetupData(c)
        ),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);
    const { guard } = client.moves;
    const G = client.getState()?.G as IGameState;
    G.lineups["0"].forEach((_, i: number) => {
      guard(i);
    });

    expect(client.getState()?.ctx.currentPlayer).toBe("1");
  });

  test("should update selected character", () => {
    const setupData = {
      lineups: [
        ["108"].map((c) => generateMaxedCharacterSetupData(c)),
        ["401", "402"].map((c) => generateMaxedCharacterSetupData(c)),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);

    client.moves.attack(0, 0);

    expect(client.getState()?.G.selected["1"]).toBe(1);
  });

  test("should declare player 0 as the winner", () => {
    const setupData = {
      lineups: [
        ["108", "103", "104", "105", "101"].map((c) =>
          generateMaxedCharacterSetupData(c)
        ),
        ["401"].map((c) => generateMaxedCharacterSetupData(c)),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);

    client.moves.attack(0, 0);

    expect(client.getState()?.ctx.gameover).toStrictEqual({ winner: "0" });
  });

  test("should declare player 1 as the winner", () => {
    const setupData = {
      lineups: [
        ["101"].map((c) => generateMaxedCharacterSetupData(c)),
        ["401"].map((c) => generateMaxedCharacterSetupData(c)),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);

    for (let turn = 1; turn < 51; turn++) {
      client.moves.guard(0);
      client.moves.guard(0);
    }

    expect(client.getState()?.ctx.gameover).toStrictEqual({ winner: "1" });
  });

  describe("should decrease duration of effects and clean expired effects", () => {
    const setupData = {
      lineups: [
        ["126", "101"].map((c) => generateMaxedCharacterSetupData(c)),
        ["401"].map((c) => generateMaxedCharacterSetupData(c)),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);

    client.moves.attack(0, 0);

    const effects = client
      .getState()
      ?.G.lineups["0"][0].effects.reduce((impermanentEffects, e) => {
        if (e.duration && e.duration > 1) {
          impermanentEffects.push({ ...e });
        }
        return impermanentEffects;
      }, [] as SkillEffect[]) as SkillEffect[];

    client.moves.guard(1);
    client.moves.guard(0);

    const effectsOnTurn2 = client
      .getState()
      ?.G.lineups["0"][0].effects.filter((e) =>
        effects.some((e2) => sameEffect(e, e2))
      ) as SkillEffect[];

    const pair = effects.map((e, i) => [
      effectsOnTurn2[i],
      e,
    ]) as SkillEffect[][];

    test.each(pair)("durations should meet", (actual, expected) => {
      const destruct = (effects: SkillEffect) => {
        const { duration, ...rest } = effects;
        return [duration, rest];
      };
      const [actualDuration, actualRest] = destruct(actual);
      const [expectedDuation, expectedRest] = destruct(expected);

      expect(actualRest).toStrictEqual(expectedRest);
      expect(actualDuration).toBe((expectedDuation as number) - 1);
    });

    client.moves.guard(0);
    client.moves.guard(1);
    client.moves.guard(0);

    test("should clean effects", () => {
      expect(client.getState()?.G.lineups["0"][0].effects).not.toEqual(
        expect.arrayContaining(effects)
      );
    });
  });

  describe("duration of effects put on enemy should calc on self turn", () => {
    const setupData = {
      lineups: [
        ["101", "125"].map((c) => generateMaxedCharacterSetupData(c)),
        ["102"].map((c) => generateMaxedCharacterSetupData(c)),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);

    client.moves.attack(1, 0);

    const effects = client
      .getState()
      ?.G.lineups["1"][0].effects.reduce((effectsFromEnemy, e) => {
        if (e.duration && e.fromPlayer === "0") {
          effectsFromEnemy.push({ ...e });
        }
        return effectsFromEnemy;
      }, [] as SkillEffect[]) as SkillEffect[];

    client.moves.guard(0);
    client.moves.guard(0);

    const effectsOnTurn2 = client
      .getState()
      ?.G.lineups["1"][0].effects.filter((e) =>
        effects.some((e2) => sameEffect(e, e2))
      ) as SkillEffect[];

    const pair = effects.map((e, i) => [
      effectsOnTurn2[i],
      e,
    ]) as SkillEffect[][];

    test.each(pair)("durations should meet", (actual, expected) => {
      const destruct = (effects: SkillEffect) => {
        const { duration, ...rest } = effects;
        return [duration, rest];
      };
      const [actualDuration, actualRest] = destruct(actual);
      const [expectedDuation, expectedRest] = destruct(expected);

      expect(actualRest).toStrictEqual(expectedRest);
      expect(actualDuration).toBe((expectedDuation as number) - 1);
    });

    for (let turn = 2; turn < 5; turn++) {
      client.moves.guard(0);
      client.moves.guard(1);
      client.moves.guard(0);
    }

    test("should clean effects", () => {
      expect(client.getState()?.G.lineups["1"][0].effects).not.toEqual(
        expect.arrayContaining(effects)
      );
    });
  });

  describe("should decrease duration of extra skills and clean those expired", () => {
    const setupData = {
      lineups: [
        ["212", "130"].map((c) => generateMaxedCharacterSetupData(c)),
        ["401"].map((c) => generateMaxedCharacterSetupData(c)),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);

    client.moves.ultimate(1, 0);

    const extraSkills = client
      .getState()
      ?.G.lineups["0"][1].extraSkill.reduce((impermanentExtraSkills, s) => {
        if (s.skillDuration && s.skillDuration > 1) {
          impermanentExtraSkills.push({ ...s });
        }
        return impermanentExtraSkills;
      }, [] as ExtraSkill[]) as ExtraSkill[];

    client.moves.guard(0);
    client.moves.guard(0);

    const extraSkillsOnTurn2 = client
      .getState()
      ?.G.lineups["0"][1].extraSkill.filter(
        (s) => s.skillDuration
      ) as ExtraSkill[];

    const pair = extraSkills.map((s, i) => [
      extraSkillsOnTurn2[i],
      s,
    ]) as ExtraSkill[][];

    test.each(pair)("durations should meet", (actual, expected) => {
      const destruct = (extraSkills: ExtraSkill) => {
        const { skillDuration, ...rest } = extraSkills;
        return [skillDuration, rest];
      };
      const [actualDuration, actualRest] = destruct(actual);
      const [expectedDuation, expectedRest] = destruct(expected);

      expect(actualRest).toStrictEqual(expectedRest);
      expect(actualDuration).toBe((expectedDuation as number) - 1);
    });

    client.moves.guard(0);
    client.moves.guard(1);
    client.moves.guard(0);

    test("should clean extra skills", () => {
      expect(client.getState()?.G.lineups["0"][1].extraSkill).not.toEqual(
        expect.arrayContaining(extraSkills)
      );
    });
  });

  test("should trigger turn-based skills from passives", () => {
    const setupData = {
      lineups: [
        ["216"].map((c) => generateMaxedCharacterSetupData(c)),
        ["401"].map((c) => generateMaxedCharacterSetupData(c)),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);
    const expectedEffects = client
      .getState()
      ?.G.lineups["0"][0].skillSet.passive.filter(
        (s) =>
          (s.target === SkillTarget.SELF || s.target === SkillTarget.TEAM) &&
          s.condition === SkillCondition.TURN_BASED &&
          s.conditionValue === 3
      )
      .map((s) => ({ ...s, fromPlayer: "0", from: 0 })) as SkillEffect[];

    for (let turn = 1; turn < 4; turn++) {
      client.moves.guard(0);
      client.moves.guard(0);
    }

    expect(client.getState()?.G.lineups["0"][0].effects).toEqual(
      expect.arrayContaining(expectedEffects)
    );
  });

  test("should not trigger turn-based skills from passives", () => {
    const setupData = {
      lineups: [
        ["216"].map((c) => generateMaxedCharacterSetupData(c)),
        ["212", "137"].map((c) => generateMaxedCharacterSetupData(c)),
      ],
    } as BattleSetupData;
    const client = getClient(setupData);
    const expectedEffects = client
      .getState()
      ?.G.lineups["0"][0].skillSet.passive.filter(
        (s) =>
          (s.target === SkillTarget.SELF || s.target === SkillTarget.TEAM) &&
          s.condition === SkillCondition.TURN_BASED &&
          s.conditionValue === 3
      )
      .map((s) => ({ ...s, fromPlayer: "0", from: 0 })) as SkillEffect[];

    for (let turn = 1; turn < 3; turn++) {
      client.moves.guard(0);
      client.moves.guard(0);
      client.moves.guard(1);
    }

    client.moves.guard(0);
    client.moves.guard(0);
    client.moves.ultimate(1, 0);

    expect(client.getState()?.G.lineups["0"][0].effects).toEqual(
      expect.not.arrayContaining(expectedEffects)
    );
  });
});
