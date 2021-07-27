import { Ctx } from "boardgame.io";
import { BattleCharacter, IGameState, ILog } from "types/battle";
import {
  ExtraSkill,
  ISkill,
  SkillActionType,
  SkillCondition,
  SkillEffect,
  SkillEffectBasis,
  SkillEffectType,
  SkillOn,
  SkillTarget,
} from "types/skills";
import { CharacterAttribute, CharacterPosition } from "types/characters";
import { initCharacter } from ".";
import { getSkillTargets, takeEffect, trigger } from "./processSkill";
import { calcDamage, calcHeal, calcShield } from "./calculators";
import { generateMaxedCharacterSetupData } from "./helpers";

let G: IGameState;
let ctx: Ctx;

const setup = () => {
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
};

describe("tests should reset in each test", () => {
  beforeEach(() => {
    setup();
  });

  describe("process skills", () => {
    test("should not process skill if target is dead", () => {
      const selected = G.lineups["0"][0];
      const target = G.lineups["1"][0];
      const skill = {
        condition: SkillCondition.NORMAL_ATTACK,
        target: SkillTarget.SINGLE_ENEMY,
        type: SkillActionType.NORMAL_ATTACK,
        value: 1,
        on: SkillOn.ON_ACTION,
      };
      target.isDead = true;
      const initialG = JSON.parse(JSON.stringify(G));

      takeEffect(
        G,
        ctx,
        { character: selected },
        { characters: [target], player: "1" },
        skill
      );

      expect(G).toStrictEqual(initialG);
    });

    describe("stackable skills", () => {
      test("stack of effect should be 1 if stackable skill triggered at first time", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.ATTACK,
          target: SkillTarget.TEAM,
          type: SkillEffectType.ULTIMATE_DAMAGE,
          value: 0.05,
          on: SkillOn.AFTER_ACTION,
          maxStack: 6,
        };

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.effects.length).toBe(1);
        expect(selected.effects[0].stack).toBe(1);
      });

      test("should stack skill if it is stackable and has already existed", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.ATTACK,
          target: SkillTarget.TEAM,
          type: SkillEffectType.ULTIMATE_DAMAGE,
          value: 0.05,
          on: SkillOn.AFTER_ACTION,
          maxStack: 6,
        };
        selected.effects.push({ ...skill, fromPlayer: "0", from: 0, stack: 1 });

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.effects.length).toBe(1);
        expect(selected.effects[0].stack).toBe(2);
      });

      test("should not stack stackable skill if it reachs max stack", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.ATTACK,
          target: SkillTarget.TEAM,
          type: SkillEffectType.ULTIMATE_DAMAGE,
          value: 0.05,
          on: SkillOn.AFTER_ACTION,
          maxStack: 6,
        };
        selected.effects.push({ ...skill, fromPlayer: "0", from: 0, stack: 6 });

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.effects.length).toBe(1);
        expect(selected.effects[0].stack).toBe(6);
      });
    });

    describe("skills triggering effect", () => {
      test("should push effects to character", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillEffectType.CD_FREEZED,
          on: SkillOn.TURN_BEGIN,
          duration: 2,
        };

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.effects.length).toBe(1);
        expect(selected.effects).toEqual(
          expect.arrayContaining([{ ...skill, fromPlayer: "0", from: 0 }])
        );
      });

      test("should push effects to character", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillEffectType.CD_FREEZED,
          on: SkillOn.TURN_BEGIN,
          duration: 2,
          possibility: 1,
        };

        takeEffect(
          G,
          { ...ctx, random: { Number: () => 1 } } as Ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.effects.length).toBe(1);
        expect(selected.effects).toEqual(
          expect.arrayContaining([{ ...skill, fromPlayer: "0", from: 0 }])
        );
      });

      test("should not push effects to character", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillEffectType.CD_FREEZED,
          on: SkillOn.TURN_BEGIN,
          duration: 2,
          possibility: 0.5,
        };

        takeEffect(
          G,
          { ...ctx, random: { Number: () => 1 } } as Ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.effects.length).toBe(0);
      });
    });

    describe("skills triggering action", () => {
      test("should push extra skills", () => {
        const selected = G.lineups["0"][0];
        const extraSkill = {
          type: SkillActionType.NORMAL_ATTACK,
          condition: SkillCondition.NORMAL_ATTACK,
          value: 1,
          target: SkillTarget.SINGLE_ENEMY,
          on: SkillOn.AFTER_ACTION,
        } as ExtraSkill;
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillActionType.ADDSKILL,
          on: SkillOn.TURN_BEGIN,
          skill: extraSkill,
        };

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.extraSkill.length).toBe(1);
        expect(selected.effects.length).toBe(0);
        expect(selected.extraSkill).toEqual(
          expect.arrayContaining([extraSkill])
        );
      });

      test("should cancel target guard", () => {
        const selected = G.lineups["0"][0];
        const target = G.lineups["1"][0];
        const skill = {
          condition: SkillCondition.ATTACK,
          target: SkillTarget.SINGLE_ENEMY,
          type: SkillActionType.CANCEL_GUARD,
          on: SkillOn.AFTER_ACTION,
        };
        target.isGuard = true;

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [target], player: "1" },
          skill
        );

        expect(target.isGuard).toBe(false);
        expect(target.effects.length).toBe(0);
      });

      test("should change max CD", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillActionType.CHANGE_CD,
          value: -2,
          on: SkillOn.TURN_BEGIN,
        };
        const initialCD = selected.CD;

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.CD).toBe(initialCD + skill.value);
        expect(selected.currentCD).toBe(initialCD + skill.value);
        expect(selected.effects.length).toBe(0);
      });

      test("should change current CD", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillActionType.CHANGE_CURRENT_CD,
          value: -2,
          on: SkillOn.TURN_BEGIN,
        };
        const initialCD = selected.CD;

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.CD).toBe(initialCD);
        expect(selected.currentCD).toBe(initialCD + skill.value);
        expect(selected.effects.length).toBe(0);
      });

      test("current CD should be non-negative", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillActionType.CHANGE_CURRENT_CD,
          value: -100,
          on: SkillOn.TURN_BEGIN,
        };
        const initialCD = selected.CD;

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.CD).toBe(initialCD);
        expect(selected.currentCD).toBe(0);
        expect(selected.effects.length).toBe(0);
      });

      test("should change max HP", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillActionType.CHANGE_MAX_HP,
          value: 0.5,
          on: SkillOn.TURN_BEGIN,
        };
        const expectedMaxHP = Math.floor(selected.maxHP * (1 + skill.value));

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.maxHP).toBe(expectedMaxHP);
        expect(selected.HP).toBe(expectedMaxHP);
        expect(selected.effects.length).toBe(0);
      });

      test("should clear abnormal states", () => {
        const selected = G.lineups["0"][0];
        const target = G.lineups["0"][1];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillActionType.CLEAR_ABNORMAL,
          on: SkillOn.TURN_BEGIN,
        };
        target.isParalysis = true;
        target.isSleep = true;
        target.isSilence = true;

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [target], player: "0" },
          skill
        );

        expect(target.isParalysis).toBe(false);
        expect(target.isSleep).toBe(false);
        expect(target.isSilence).toBe(false);
      });

      test("should clear attack debuffs", () => {
        const selected = G.lineups["0"][0];
        const target = G.lineups["0"][1];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillActionType.CLEAR_ATTACK_DEBUFF,
          on: SkillOn.TURN_BEGIN,
        };
        const buffs = [
          {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.TEAM,
            duration: 1,
            type: SkillEffectType.ATTACK_POWER,
            basis: SkillEffectBasis.SELF_ATK,
            value: 0.3,
            on: SkillOn.AFTER_ACTION,
            fromPlayer: "0",
            from: 0,
          },
          {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.TEAM,
            duration: 1,
            type: SkillEffectType.ATTACK_POWER,
            basis: SkillEffectBasis.SELF_ATK,
            value: -0.3,
            on: SkillOn.AFTER_ACTION,
            fromPlayer: "1",
            from: 0,
          },
          {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.TEAM,
            duration: 1,
            type: SkillEffectType.NORMAL_ATTACK_DAMAGE,
            value: -0.3,
            on: SkillOn.AFTER_ACTION,
            fromPlayer: "1",
            from: 0,
          },
          {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.TEAM,
            duration: 1,
            type: SkillEffectType.ULTIMATE_DAMAGE,
            value: -0.3,
            on: SkillOn.AFTER_ACTION,
            fromPlayer: "1",
            from: 0,
          },
        ];
        target.effects.push(...buffs);

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [target], player: "0" },
          skill
        );

        expect(target.effects.length).toBe(1);
        expect(target.effects).toEqual(
          expect.arrayContaining(buffs.slice(0, 1))
        );
      });

      test("should clear sustain debuffs", () => {
        const selected = G.lineups["0"][0];
        const target = G.lineups["0"][1];
        const skill = {
          condition: SkillCondition.BATTLE_BEGIN,
          target: SkillTarget.SELF,
          type: SkillActionType.CLEAR_SUSTAIN_DEBUFF,
          on: SkillOn.TURN_BEGIN,
        };
        const buffs = [
          {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.TEAM,
            duration: 1,
            type: SkillEffectType.DAMAGED,
            value: 0.3,
            on: SkillOn.AFTER_ACTION,
            fromPlayer: "0",
            from: 0,
          },
          {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.TEAM,
            duration: 1,
            type: SkillEffectType.DAMAGED,
            value: -0.3,
            on: SkillOn.AFTER_ACTION,
            fromPlayer: "1",
            from: 0,
          },
          {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.TEAM,
            duration: 1,
            type: SkillEffectType.GUARD_EFFECT,
            value: -0.3,
            on: SkillOn.AFTER_ACTION,
            fromPlayer: "1",
            from: 0,
          },
          {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.TEAM,
            duration: 1,
            type: SkillEffectType.HEALED,
            value: -0.3,
            on: SkillOn.AFTER_ACTION,
            fromPlayer: "1",
            from: 0,
          },
        ];
        target.effects.push(...buffs);

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [target], player: "0" },
          skill
        );

        expect(target.effects.length).toBe(1);
        expect(target.effects).toEqual(
          expect.arrayContaining(buffs.slice(1, 2))
        );
      });

      test("should clear specified effects from self", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.ULTIMATE,
          target: SkillTarget.SELF,
          type: SkillActionType.CLEAR_EFFECT_FROM_SELF,
          on: SkillOn.AFTER_ACTION,
          CD: 7,
          skill: {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.SELF,
            type: SkillEffectType.ULTIMATE_DAMAGE,
            value: 0.05,
            on: SkillOn.AFTER_ACTION,
            maxStack: 6,
          },
        } as ISkill;
        const buffs = [
          { ...skill.skill, fromPlayer: "0", from: 0, stack: 4 },
          { ...skill.skill, fromPlayer: "0", from: 1, stack: 4 },
          { ...skill.skill, fromPlayer: "1", from: 0, stack: 4 },
        ];
        selected.effects.push(...(buffs as SkillEffect[]));

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.effects.length).toBe(2);
        expect(selected.effects).toEqual(
          expect.arrayContaining(buffs.slice(1))
        );
      });

      describe("skills dealing damage", () => {
        const normalAttack = {
          condition: SkillCondition.NORMAL_ATTACK,
          target: SkillTarget.SINGLE_ENEMY,
          type: SkillActionType.NORMAL_ATTACK,
          value: 1,
          on: SkillOn.ON_ACTION,
        };

        const counterstrike = {
          condition: SkillCondition.ATTACKED,
          target: SkillTarget.SINGLE_ENEMY,
          type: SkillActionType.COUNTER_STRIKE,
          value: 1,
          on: SkillOn.AFTER_ACTION,
        };

        test("should do normal attack and push log", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const skill = normalAttack;
          const damage = calcDamage(selected, target, skill);
          const log = [] as ILog[];
          const expectedLog = [
            {
              player: "0",
              type: skill.type,
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
            },
          ];

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill,
            log
          );

          expect(target.HP).toBe(expectedLog[0].to.HP);
          expect(log.length).toBe(expectedLog.length);
          expect(log).toEqual(expect.arrayContaining(expectedLog));
        });

        test("should trigger ultimate skill and push log", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const skill = {
            condition: SkillCondition.ULTIMATE,
            target: SkillTarget.SINGLE_ENEMY,
            type: SkillActionType.ULTIMATE,
            value: 1,
            CD: 4,
            on: SkillOn.ON_ACTION,
          };
          const damage = calcDamage(selected, target, skill);
          const log = [] as ILog[];
          const expectedLog = [
            {
              player: "0",
              type: skill.type,
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
            },
          ];

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill,
            log
          );

          expect(target.HP).toBe(expectedLog[0].to.HP);
          expect(log.length).toBe(expectedLog.length);
          expect(log).toEqual(expect.arrayContaining(expectedLog));
        });

        test("should do followup attack and push log", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const skill = {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.SINGLE_ENEMY,
            type: SkillActionType.FOLLOW_UP_ATTACK,
            value: 0.1,
            on: SkillOn.ON_ACTION,
            repeat: 2,
          };
          const damage = calcDamage(selected, target, skill);
          const log = [] as ILog[];
          const expectedLog = [
            {
              player: "0",
              type: skill.type,
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
            },
          ];

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill,
            log
          );

          expect(target.HP).toBe(expectedLog[0].to.HP);
          expect(log.length).toBe(expectedLog.length);
          expect(log).toEqual(expect.arrayContaining(expectedLog));
        });

        test("should trigger attacked passive skills", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const skill = normalAttack;
          const triggeredPassiveSkills = {
            condition: SkillCondition.ATTACKED,
            target: SkillTarget.SELF,
            type: SkillEffectType.ATTACK_POWER,
            basis: SkillEffectBasis.TARGET_ATK,
            value: 0.02,
            on: SkillOn.AFTER_ACTION,
            maxStack: 25,
          };

          target.skillSet.passive.push(triggeredPassiveSkills);

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(target.effects).toEqual(
            expect.arrayContaining([
              {
                ...triggeredPassiveSkills,
                fromPlayer: "1",
                from: 0,
                stack: 1,
              },
            ])
          );
        });

        test("should not trigger attacked passive skills", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const skill = normalAttack;
          const triggeredPassiveSkills = {
            condition: SkillCondition.ATTACKED,
            target: SkillTarget.SELF,
            type: SkillEffectType.ATTACK_POWER,
            basis: SkillEffectBasis.TARGET_ATK,
            value: 0.02,
            on: SkillOn.AFTER_ACTION,
            maxStack: 25,
          };

          target.skillSet.passive.push(triggeredPassiveSkills);
          target.isSilence = true;

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(target.effects).not.toEqual(
            expect.arrayContaining([
              {
                ...triggeredPassiveSkills,
                fromPlayer: "1",
                from: 0,
                stack: 1,
              },
            ])
          );
        });

        test("should trigger counterstrike", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][1];
          const skill = normalAttack;
          const damage = calcDamage(selected, target, skill);
          const counterstrikeDamage = calcDamage(
            target,
            selected,
            counterstrike
          );
          const log = [] as ILog[];
          const expectedLog = [
            {
              player: "0",
              type: skill.type,
              value: damage,
              from: { player: "0", position: 0 },
              to: {
                player: "1",
                position: 1,
                originalHP: target.HP,
                HP: target.HP - damage,
                originalShield: 0,
                shield: 0,
              },
            },
            {
              player: "1",
              type: counterstrike.type,
              value: counterstrikeDamage,
              from: { player: "1", position: 1 },
              to: {
                player: "0",
                position: 0,
                originalHP: selected.HP,
                HP: selected.HP - counterstrikeDamage,
                originalShield: 0,
                shield: 0,
              },
            },
          ];

          target.skillSet.passive.push(counterstrike);
          G.target["0"] = 1;

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill,
            log
          );

          expect(selected.HP).toBe(expectedLog[1].to.HP);
          expect(log).toEqual(expect.arrayContaining(expectedLog));
        });

        test("counterstrike should not trigger counterstrike", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][1];
          const skill = {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.SINGLE_ENEMY,
            type: SkillActionType.COUNTER_STRIKE,
            value: 1,
            on: SkillOn.ON_ACTION,
          };

          target.skillSet.passive.push(counterstrike);
          G.target["0"] = 1;

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(selected.HP).toBe(selected.maxHP);
        });

        test("followup attack should not trigger counterstrike", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][1];
          const skill = {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.SINGLE_ENEMY,
            type: SkillActionType.FOLLOW_UP_ATTACK,
            value: 1,
            on: SkillOn.ON_ACTION,
          };

          target.skillSet.passive.push(counterstrike);
          G.target["0"] = 1;

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(selected.HP).toBe(selected.maxHP);
        });

        test("dot should not trigger counterstrike", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][1];
          const skill = {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.SINGLE_ENEMY,
            type: SkillActionType.NORMAL_ATTACK,
            basis: SkillEffectBasis.SELF_ATK,
            value: 0.5,
            on: SkillOn.TURN_END,
            duration: 4,
          };

          target.skillSet.passive.push(counterstrike);
          G.target["0"] = 1;

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(selected.HP).toBe(selected.maxHP);
        });

        test("should decrease shield", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const shieldEffect = {
            condition: SkillCondition.ATTACK,
            target: SkillTarget.SELF,
            type: SkillActionType.SHIELD,
            basis: SkillEffectBasis.SELF_ATK,
            value: 10000000,
            on: SkillOn.AFTER_ACTION,
            duration: 4,
            fromPlayer: "1",
            from: 0,
          };
          target.shield = shieldEffect.value;
          target.effects.push(shieldEffect);

          const skill = normalAttack;
          const damage = calcDamage(selected, target, skill);
          const log = [] as ILog[];
          const expectedLog = [
            {
              player: "0",
              type: skill.type,
              value: damage,
              from: { player: "0", position: 0 },
              to: {
                player: "1",
                position: 0,
                originalHP: target.HP,
                HP: target.HP,
                originalShield: target.shield,
                shield: target.shield - damage,
              },
            },
          ];

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill,
            log
          );

          expect(target.HP).toBe(expectedLog[0].to.HP);
          expect(target.shield).toBe(expectedLog[0].to.shield);
          expect(log).toEqual(expect.arrayContaining(expectedLog));
          expect(target.effects[0].value).toBe(expectedLog[0].to.shield);
        });

        test("should neutralize shield and deal damage", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const shieldEffect = {
            condition: SkillCondition.ATTACK,
            target: SkillTarget.SELF,
            type: SkillActionType.SHIELD,
            basis: SkillEffectBasis.SELF_ATK,
            value: 100000,
            on: SkillOn.AFTER_ACTION,
            duration: 4,
            fromPlayer: "1",
            from: 0,
          };
          target.shield = shieldEffect.value;
          target.effects.push(shieldEffect);

          const skill = normalAttack;
          const damage = calcDamage(selected, target, skill);
          const log = [] as ILog[];
          const expectedLog = [
            {
              player: "0",
              type: skill.type,
              value: damage,
              from: { player: "0", position: 0 },
              to: {
                player: "1",
                position: 0,
                originalHP: target.HP,
                HP: target.HP + target.shield - damage,
                originalShield: target.shield,
                shield: 0,
              },
            },
          ];

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill,
            log
          );

          expect(target.HP).toBe(expectedLog[0].to.HP);
          expect(target.shield).toBe(expectedLog[0].to.shield);
          expect(log).toEqual(expect.arrayContaining(expectedLog));
          expect(target.effects).not.toEqual(
            expect.arrayContaining([{ ...shieldEffect, value: 0 }])
          );
        });

        test("real attack should ignore shield", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const shieldEffect = {
            condition: SkillCondition.ATTACK,
            target: SkillTarget.SELF,
            type: SkillActionType.SHIELD,
            basis: SkillEffectBasis.SELF_ATK,
            value: 10000000,
            on: SkillOn.AFTER_ACTION,
            duration: 4,
            fromPlayer: "1",
            from: 0,
          };
          target.shield = shieldEffect.value;
          target.effects.push(shieldEffect);

          const skill = {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.SINGLE_ENEMY,
            type: SkillActionType.REAL_ATTACK,
            basis: SkillEffectBasis.TARGET_CURRENT_HP,
            value: 0.1,
            on: SkillOn.ON_ACTION,
          };
          const damage = calcDamage(selected, target, skill);
          const log = [] as ILog[];
          const expectedLog = [
            {
              player: "0",
              type: skill.type,
              value: damage,
              from: { player: "0", position: 0 },
              to: {
                player: "1",
                position: 0,
                originalHP: target.HP,
                HP: target.HP - damage,
                originalShield: target.shield,
                shield: target.shield,
              },
            },
          ];

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill,
            log
          );

          expect(target.HP).toBe(expectedLog[0].to.HP);
          expect(target.shield).toBe(expectedLog[0].to.shield);
          expect(log).toEqual(expect.arrayContaining(expectedLog));
          expect(target.effects[0].value).toBe(expectedLog[0].to.shield);
        });

        test("should wake target", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const skill = normalAttack;
          target.isSleep = true;

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(target.isSleep).toBe(false);
        });

        test("dot should not wake target", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const skill = {
            condition: SkillCondition.NORMAL_ATTACK,
            target: SkillTarget.SINGLE_ENEMY,
            type: SkillActionType.NORMAL_ATTACK,
            basis: SkillEffectBasis.SELF_ATK,
            value: 0.5,
            on: SkillOn.TURN_END,
            duration: 4,
          };
          target.isSleep = true;

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(target.isSleep).toBe(true);
        });

        test("should kill target", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];
          const skill = normalAttack;
          target.HP = 1;
          target.isTaunt = true;
          G.taunt["1"].push(0);

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(target.HP).toBe(0);
          expect(target.isDead).toBe(true);
          expect(target.isTaunt).toBe(false);
          expect(G.taunt["1"]).not.toEqual(expect.arrayContaining([0]));
        });
      });

      test("should guard and push log", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.ULTIMATE,
          target: SkillTarget.SELF,
          type: SkillActionType.GUARD,
          CD: 3,
          on: SkillOn.AFTER_ACTION,
        };
        const log = [] as ILog[];
        const expectedLog = [
          {
            player: "0",
            type: skill.type,
            from: { player: "0", position: 0 },
            to: {
              player: "0",
              position: 0,
              originalHP: selected.HP,
              HP: selected.HP,
              originalShield: 0,
              shield: 0,
            },
          },
        ];

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill,
          log
        );

        expect(selected.isGuard).toBe(true);
        expect(log.length).toBe(expectedLog.length);
        expect(log).toEqual(expect.arrayContaining(expectedLog));
      });

      describe("healing skills", () => {
        const healSkill = {
          condition: SkillCondition.NORMAL_ATTACK,
          type: SkillActionType.HEAL,
          basis: SkillEffectBasis.SELF_ATK,
          value: 0.3,
          target: SkillTarget.SELF,
          on: SkillOn.AFTER_ACTION,
          skillDuration: 1,
        };
        test("should heal and push log", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["0"][1];
          target.HP = 1;

          const heal = calcHeal(selected, target, healSkill);
          const expectedHp = 1 + heal > target.maxHP ? target.maxHP : 1 + heal;
          const log = [] as ILog[];
          const expectedLog = [
            {
              player: "0",
              type: healSkill.type,
              value: heal,
              from: { player: "0", position: 0 },
              to: {
                player: "0",
                position: 1,
                originalHP: target.HP,
                HP: expectedHp,
                originalShield: 0,
                shield: 0,
              },
            },
          ];

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "0" },
            healSkill,
            log
          );

          expect(target.HP).toBe(expectedHp);
          expect(log.length).toBe(expectedLog.length);
          expect(log).toEqual(expect.arrayContaining(expectedLog));
        });

        test("should trigger healed passive skills", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["0"][1];
          const skill = {
            condition: SkillCondition.HEALED,
            target: SkillTarget.SELF,
            type: SkillEffectType.ATTACK_POWER,
            basis: SkillEffectBasis.TARGET_ATK,
            value: 0.15,
            duration: 1,
            on: SkillOn.AFTER_ACTION,
          };

          target.skillSet.passive.push(skill);

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "0" },
            healSkill
          );

          expect(target.effects.length).toBe(1);
          expect(target.effects).toEqual(
            expect.arrayContaining([
              {
                ...skill,
                fromPlayer: "0",
                from: 1,
              },
            ])
          );
        });

        test("should not trigger healed passive skills", () => {
          const selected = G.lineups["0"][0];
          const target = G.lineups["0"][1];
          const skill = {
            condition: SkillCondition.HEALED,
            target: SkillTarget.SELF,
            type: SkillEffectType.ATTACK_POWER,
            basis: SkillEffectBasis.TARGET_ATK,
            value: 0.15,
            duration: 1,
            on: SkillOn.AFTER_ACTION,
          };

          target.isSilence = true;
          target.skillSet.passive.push(skill);

          takeEffect(
            G,
            ctx,
            { character: selected },
            { characters: [target], player: "0" },
            healSkill
          );

          expect(target.effects.length).toBe(0);
        });
      });

      test("should put shield and push log", () => {
        const selected = G.lineups["0"][0];
        const target = G.lineups["0"][1];
        const skill = {
          condition: SkillCondition.ATTACK,
          target: SkillTarget.SELF,
          type: SkillActionType.SHIELD,
          basis: SkillEffectBasis.SELF_ATK,
          value: 0.5,
          on: SkillOn.AFTER_ACTION,
          duration: 4,
        };
        const shield = calcShield(selected, target, skill);
        const log = [] as ILog[];
        const expectedLog = [
          {
            player: "0",
            type: skill.type,
            value: shield,
            from: { player: "0", position: 0 },
            to: {
              player: "0",
              position: 1,
              originalHP: target.HP,
              HP: target.HP,
              originalShield: 0,
              shield: shield,
            },
          },
        ];

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [target], player: "0" },
          skill,
          log
        );

        expect(target.shield).toBe(shield);
        expect(target.effects.length).toBe(1);
        expect(target.effects).toEqual(
          expect.arrayContaining([
            {
              ...skill,
              value: shield,
              fromPlayer: "0",
              from: 0,
            },
          ])
        );
        expect(log.length).toBe(expectedLog.length);
        expect(log).toEqual(expect.arrayContaining(expectedLog));
      });

      describe("skills putting abnormal debuff", () => {
        const abnormalDebuffTypes = [
          {
            name: "paralyze",
            type: SkillActionType.PARALYSIS,
            immuneType: SkillEffectType.IMMUNE_PARALYSIS,
            effectType: SkillEffectType.PARALYZED,
            property: "isParalysis" as keyof BattleCharacter,
          },
          {
            name: "silence",
            type: SkillActionType.SILENCE,
            immuneType: SkillEffectType.IMMUNE_SILENCE,
            effectType: SkillEffectType.SILENCED,
            property: "isSilence" as keyof BattleCharacter,
          },
          {
            name: "sleep",
            type: SkillActionType.SLEEP,
            immuneType: SkillEffectType.IMMUNE_SLEEP,
            effectType: SkillEffectType.SLEPT,
            property: "isSleep" as keyof BattleCharacter,
          },
        ];

        const generateSkill = (type: SkillActionType) => ({
          condition: SkillCondition.ULTIMATE,
          target: SkillTarget.SINGLE_ENEMY,
          type: type,
          CD: 4,
          on: SkillOn.AFTER_ACTION,
          duration: 1,
          possibility: 1,
        });

        test.each(abnormalDebuffTypes)("should $name target", (data) => {
          const skill = generateSkill(data.type);
          const selected = G.lineups["0"][0];
          const target = G.lineups["1"][0];

          takeEffect(
            G,
            { ...ctx, random: { Number: () => 1 } } as Ctx,
            { character: selected },
            { characters: [target], player: "1" },
            skill
          );

          expect(target[data.property]).toBe(true);
        });

        test.each(abnormalDebuffTypes)(
          "should not $name target: target immunes debuffs",
          (data) => {
            const skill = generateSkill(data.type);
            const selected = G.lineups["0"][0];
            const target = G.lineups["1"][0];
            const immune = {
              type: data.immuneType,
              condition: SkillCondition.BATTLE_BEGIN,
              target: SkillTarget.SELF,
              on: SkillOn.TURN_BEGIN,
            };
            target.skillSet.passive.push(immune);

            takeEffect(
              G,
              { ...ctx, random: { Number: () => 1 } } as Ctx,
              { character: selected },
              { characters: [target], player: "1" },
              skill
            );

            expect(target[data.property]).toBe(false);
          }
        );

        test.each(abnormalDebuffTypes)(
          "should not $name target: possibility not pass",
          (data) => {
            const skill = generateSkill(data.type);
            const selected = G.lineups["0"][0];
            const target = G.lineups["1"][0];
            const decreasePossibilityEffect = {
              condition: SkillCondition.ULTIMATE,
              target: SkillTarget.SINGLE_ENEMY,
              value: -1,
              on: SkillOn.AFTER_ACTION,
              type: data.effectType,
              fromPlayer: "1",
              from: 0,
            };

            target.effects.push(decreasePossibilityEffect);

            takeEffect(
              G,
              { ...ctx, random: { Number: () => 1 } } as Ctx,
              { character: selected },
              { characters: [target], player: "1" },
              skill
            );

            expect(target[data.property]).toBe(false);
          }
        );
      });

      test("should taunt", () => {
        const selected = G.lineups["0"][0];
        const skill = {
          condition: SkillCondition.ULTIMATE,
          target: SkillTarget.SELF,
          duration: 1,
          type: SkillActionType.TAUNT,
          CD: 3,
          on: SkillOn.AFTER_ACTION,
        };

        takeEffect(
          G,
          ctx,
          { character: selected },
          { characters: [selected], player: "0" },
          skill
        );

        expect(selected.isTaunt).toBe(true);
        expect(G.taunt["0"]).toEqual(expect.arrayContaining([0]));
      });
    });
  });

  describe("validate targets", () => {
    test("should target self", () => {
      const skill = { target: SkillTarget.SELF } as ISkill;
      const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

      expect(isEnemy).toBe(false);
      expect(targets.length).toBe(1);
      expect(targets).toEqual(
        expect.arrayContaining(G.lineups["0"].slice(0, 1))
      );
    });

    test("should target team", () => {
      const skill = { target: SkillTarget.TEAM } as ISkill;
      const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

      expect(isEnemy).toBe(false);
      expect(targets.length).toBe(G.lineups["0"].length);
      expect(targets).toEqual(expect.arrayContaining(G.lineups["0"]));
    });

    test("should target team except self", () => {
      const skill = { target: SkillTarget.TEAM_EXCEPT_SELF } as ISkill;
      const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

      expect(isEnemy).toBe(false);
      expect(targets.length).toBe(G.lineups["0"].length - 1);
      expect(targets).toEqual(expect.arrayContaining(G.lineups["0"].slice(1)));
    });

    test("should target character having least HP percent on team", () => {
      const skill = { target: SkillTarget.TEAM_LEAST_HP } as ISkill;
      const expectedTarget = G.lineups["0"][1];
      expectedTarget.HP = 1;

      const { targets, isEnemy } = getSkillTargets(
        G,
        { ...ctx, random: { Die: (num: number) => num } } as Ctx,
        skill
      );

      expect(isEnemy).toBe(false);
      expect(targets.length).toBe(1);
      expect(targets).toEqual(expect.arrayContaining([expectedTarget]));
    });

    test("should target the leftmost character on team", () => {
      const skill = { target: SkillTarget.LEFTMOST } as ISkill;
      const expectedTarget = G.lineups["0"][1];
      G.lineups["0"][0].isDead = true;

      const { targets, isEnemy } = getSkillTargets(
        G,
        { ...ctx, random: { Die: (num: number) => num } } as Ctx,
        skill
      );

      expect(isEnemy).toBe(false);
      expect(targets.length).toBe(1);
      expect(targets).toEqual(expect.arrayContaining([expectedTarget]));
    });

    test("should target all enemies", () => {
      const skill = { target: SkillTarget.ALL_ENEMIES } as ISkill;
      const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

      expect(isEnemy).toBe(true);
      expect(targets.length).toBe(G.lineups["1"].length);
      expect(targets).toEqual(expect.arrayContaining(G.lineups["1"]));
    });

    test("should target single enemy", () => {
      const skill = { target: SkillTarget.SINGLE_ENEMY } as ISkill;
      const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

      expect(isEnemy).toBe(true);
      expect(targets.length).toBe(1);
      expect(targets).toEqual(
        expect.arrayContaining([G.lineups["1"][G.target["0"]]])
      );
    });

    test("should target specified indices", () => {
      const skill = { target: [1, 4] } as ISkill;
      const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

      expect(isEnemy).toBe(false);
      expect(targets.length).toBe((skill.target as number[]).length);
      expect(targets).toEqual(
        expect.arrayContaining(
          G.lineups["0"].filter((_, i) =>
            (skill.target as number[]).includes(i)
          )
        )
      );
    });
  });

  describe("trigger skills", () => {
    test("should do nothing", () => {
      const skill = { target: SkillTarget.FIRE } as ISkill;

      G.lineups["0"] = G.lineups["0"].filter(
        (c) => c.attribute !== CharacterAttribute.FIRE
      );
      const initialG = JSON.parse(JSON.stringify(G));

      trigger(G, ctx, skill);

      expect(G).toStrictEqual(initialG);
    });

    test("should trigger skill specified times", () => {
      const selected = G.lineups["0"][0];
      const target = G.lineups["1"][0];
      const skill = {
        condition: SkillCondition.ATTACK,
        target: SkillTarget.SINGLE_ENEMY,
        type: SkillActionType.FOLLOW_UP_ATTACK,
        value: 0.1,
        on: SkillOn.AFTER_ACTION,
        repeat: 3,
      };
      const damage = calcDamage(selected, target, skill);
      const log = [] as ILog[];
      const expectedLog = [...Array(skill.repeat).keys()].map((i) => ({
        player: "0",
        type: skill.type,
        value: damage,
        from: { player: "0", position: 0 },
        to: {
          player: "1",
          position: 0,
          originalHP: target.HP - damage * i,
          HP: target.HP - damage * (i + 1),
          originalShield: 0,
          shield: 0,
        },
      }));

      trigger(G, ctx, skill, log);

      expect(target.HP).toBe(expectedLog.slice(-1)[0].to.HP);
      expect(log.length).toBe(expectedLog.length);
      expect(log).toEqual(expect.arrayContaining(expectedLog));
    });

    describe("endturn effects", () => {
      test("value should be based on self attack power", () => {
        const selected = G.lineups["0"][0];
        const target = G.lineups["1"][0];
        const skill = {
          condition: SkillCondition.NORMAL_ATTACK,
          target: SkillTarget.SINGLE_ENEMY,
          type: SkillActionType.NORMAL_ATTACK,
          basis: SkillEffectBasis.SELF_ATK,
          value: 0.5,
          on: SkillOn.TURN_END,
          duration: 4,
        };
        const log = [] as ILog[];

        trigger(G, ctx, skill, log);

        expect(target.effects.length).toBe(1);
        expect(target.effects).toEqual(
          expect.arrayContaining([
            {
              ...skill,
              value: selected.ATK * skill.value,
              fromPlayer: "0",
              from: 0,
            },
          ])
        );
        expect(log.length).toBe(0);
      });

      test("value should be based on target attack power", () => {
        const target = G.lineups["1"][0];
        const skill = {
          condition: SkillCondition.NORMAL_ATTACK,
          target: SkillTarget.SINGLE_ENEMY,
          type: SkillActionType.NORMAL_ATTACK,
          basis: SkillEffectBasis.TARGET_ATK,
          value: 0.5,
          on: SkillOn.TURN_END,
          duration: 4,
        };
        const log = [] as ILog[];

        trigger(G, ctx, skill, log);

        expect(target.effects.length).toBe(1);
        expect(target.effects).toEqual(
          expect.arrayContaining([
            {
              ...skill,
              value: target.ATK * skill.value,
              fromPlayer: "0",
              from: 0,
            },
          ])
        );
        expect(log.length).toBe(0);
      });

      test("value should be based on target max HP", () => {
        const target = G.lineups["1"][0];
        const skill = {
          condition: SkillCondition.NORMAL_ATTACK,
          target: SkillTarget.SINGLE_ENEMY,
          type: SkillActionType.NORMAL_ATTACK,
          basis: SkillEffectBasis.TARGET_MAX_HP,
          value: 0.5,
          on: SkillOn.TURN_END,
          duration: 4,
        };
        const log = [] as ILog[];

        trigger(G, ctx, skill, log);

        expect(target.effects.length).toBe(1);
        expect(target.effects).toEqual(
          expect.arrayContaining([
            {
              ...skill,
              value: target.maxHP * skill.value,
              fromPlayer: "0",
              from: 0,
            },
          ])
        );
        expect(log.length).toBe(0);
      });

      test("value should be based on target current HP", () => {
        const target = G.lineups["1"][0];
        const skill = {
          condition: SkillCondition.NORMAL_ATTACK,
          target: SkillTarget.SINGLE_ENEMY,
          type: SkillActionType.NORMAL_ATTACK,
          basis: SkillEffectBasis.TARGET_CURRENT_HP,
          value: 0.5,
          on: SkillOn.TURN_END,
          duration: 4,
        };
        const log = [] as ILog[];

        target.HP = 123;

        trigger(G, ctx, skill, log);

        expect(target.effects.length).toBe(1);
        expect(target.effects).toEqual(
          expect.arrayContaining([
            {
              ...skill,
              value: target.HP * skill.value,
              fromPlayer: "0",
              from: 0,
            },
          ])
        );
        expect(log.length).toBe(0);
      });
    });

    test("should throw error", () => {
      const skill = {
        condition: SkillCondition.NORMAL_ATTACK,
        target: SkillTarget.SINGLE_ENEMY,
        type: SkillActionType.SHIELD,
        basis: SkillEffectBasis.SELF_ATK,
        value: 0.5,
        on: SkillOn.TURN_END,
        duration: 4,
      };

      expect(() => {
        trigger(G, ctx, skill);
      }).toThrow(`invalid type for end turn effect, type: ${skill.type}`);
    });
  });
});

describe("tests not reset in each test", () => {
  describe("attack power buff based on self attack", () => {
    setup();
    const selected = G.lineups["0"][0];
    const target = G.lineups["0"];
    const skill = {
      condition: SkillCondition.ATTACK,
      target: SkillTarget.TEAM,
      duration: 1,
      type: SkillEffectType.ATTACK_POWER,
      basis: SkillEffectBasis.SELF_ATK,
      value: 0.2,
      on: SkillOn.AFTER_ACTION,
    };
    const attackBuff = target.map((_, ind) =>
      Math.floor(
        selected.ATK *
          (skill.value * (ind > selected.teamPosition ? 1 + skill.value : 1))
      )
    );

    takeEffect(
      G,
      ctx,
      { character: selected },
      { characters: target, player: "1" },
      skill
    );

    test.each(
      target.map((c, ind) => [c, attackBuff[ind]] as [BattleCharacter, number])
    )(
      "value of effects and character attack should meet: $#",
      (character, expectedEffectValue) => {
        expect(character.effects.length).toBe(1);
        expect(character.effects[0].value).toBe(expectedEffectValue);
        expect(character.ATK).toBe(character.baseATK + expectedEffectValue);
      }
    );
  });

  describe("attack power buff based on target attack", () => {
    setup();
    const selected = G.lineups["0"][0];
    const target = G.lineups["0"];
    const skill = {
      condition: SkillCondition.ATTACK,
      target: SkillTarget.TEAM,
      duration: 1,
      type: SkillEffectType.ATTACK_POWER,
      basis: SkillEffectBasis.TARGET_ATK,
      value: 0.2,
      on: SkillOn.AFTER_ACTION,
    };

    takeEffect(
      G,
      ctx,
      { character: selected },
      { characters: target, player: "1" },
      skill
    );

    test.each(target)(
      "value of effects and character attack should meet: $#",
      (character) => {
        expect(character.effects.length).toBe(1);
        expect(character.effects[0].value).toBe(skill.value);
        expect(character.ATK).toBe(
          Math.floor(character.baseATK * (1 + skill.value))
        );
      }
    );
  });

  describe("should target specified positions", () => {
    setup();
    const positions = [
      {
        name: "attaker",
        target: SkillTarget.ATTACKER,
        position: CharacterPosition.ATTACKER,
      },
      {
        name: "protecter",
        target: SkillTarget.PROTECTOR,
        position: CharacterPosition.PROTECTOR,
      },
      {
        name: "healer",
        target: SkillTarget.HEALER,
        position: CharacterPosition.HEALER,
      },
      {
        name: "obstructer",
        target: SkillTarget.OBSTRUCTER,
        position: CharacterPosition.OBSTRUCTER,
      },
      {
        name: "support",
        target: SkillTarget.SUPPORT,
        position: CharacterPosition.SUPPORT,
      },
    ];

    test.each(positions)("should target $name", (data) => {
      const skill = { target: data.target } as ISkill;
      const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

      expect(isEnemy).toBe(false);
      expect(targets.length).toBe(1);
      expect(targets).toEqual(
        expect.arrayContaining(
          G.lineups["0"].filter((c) => c.position === data.position)
        )
      );
    });
  });

  describe("should target specified attributes", () => {
    setup();
    const attributes = [
      {
        name: "fire",
        target: SkillTarget.FIRE,
        attribute: CharacterAttribute.FIRE,
      },
      {
        name: "water",
        target: SkillTarget.WATER,
        attribute: CharacterAttribute.WATER,
      },
      {
        name: "wind",
        target: SkillTarget.WIND,
        attribute: CharacterAttribute.WIND,
      },
      {
        name: "dark",
        target: SkillTarget.DARK,
        attribute: CharacterAttribute.DARK,
      },
      {
        name: "light",
        target: SkillTarget.LIGHT,
        attribute: CharacterAttribute.LIGHT,
      },
    ];

    test.each(attributes)("should target $name attribute teammates", (data) => {
      const skill = { target: data.target } as ISkill;
      const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

      expect(isEnemy).toBe(false);
      expect(targets.length).toBe(1);
      expect(targets).toEqual(
        expect.arrayContaining(
          G.lineups["0"].filter((c) => c.attribute === data.attribute)
        )
      );
    });
  });
});
