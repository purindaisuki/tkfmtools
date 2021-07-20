import type { Ctx } from "boardgame.io";
import {
  ISkill,
  SkillActionType,
  SkillCondition,
  SkillEffect,
  SkillEffectBasis,
  SkillOn,
  SkillTarget,
  SkillEffectType,
  FollowUpAttackSkill,
  UltimateSkill,
  ExtraSkill,
} from "types/skills";
import { CharacterStats, ICharacterData } from "types/characters";
import {
  BattleCharacter as Character,
  BattleSetupData,
  IGameState,
  ILog,
  ScarecrowStats,
} from "types/battle";
import {
  attack,
  guard,
  ultimate,
  switchMember,
  switchTarget,
  canSelect,
} from ".";
import { calcAttack, calcDamage, calcHeal, calcShield } from "./calculators";
import { getEnemies, merge, sameEffect } from "./helpers";
import calcCharStats from "utils/calcCharStats";
import { data as skillData } from "data/characterSkill";
import charMap from "data/charMap";
import { canTarget } from "./moves";

const processSkill = (
  G: IGameState,
  ctx: Ctx,
  from: { character: Character; isEnemy: boolean },
  to: { characters: Character[]; isEnemy: boolean },
  skill: ISkill | ExtraSkill | SkillEffect,
  logArr?: ILog[]
) => {
  let effect = {
    ...skill,
    fromPlayer: (skill as SkillEffect).fromPlayer
      ? (skill as SkillEffect).fromPlayer
      : ctx.currentPlayer,
    from: from.character.teamPosition,
  } as SkillEffect;

  if (
    skill.type === SkillEffectType.ATTACK_POWER &&
    skill.basis === SkillEffectBasis.SELF_ATK &&
    skill.value
  ) {
    effect = {
      ...effect,
      value: from.character.ATK * skill.value,
    };
  }

  to.characters.forEach((target): boolean | void => {
    if (target.isDead) {
      return true;
    }

    if (
      (skill as ISkill).possibility &&
      skill.type !== SkillEffectType.PARALYZED &&
      skill.type !== SkillEffectType.SLEPT &&
      skill.type !== SkillEffectType.SILENCED
    ) {
      const r = ctx.random?.Number();
      if (!r || r > (skill as ISkill).possibility!) {
        return true;
      }
    }

    // check stackable
    const existEffect = target.effects.find((e) => sameEffect(e, effect));
    if (existEffect && existEffect.on !== SkillOn.TURN_END) {
      if (!existEffect.maxStack && !existEffect.duration) {
        return true;
      } else if (existEffect.maxStack && existEffect.stack) {
        if (existEffect.stack < existEffect.maxStack) {
          existEffect.stack++;
        }
        return true;
      }
    } else if (effect.maxStack) {
      effect.stack = 1;
    }

    switch (skill.type) {
      case SkillActionType.ADDSKILL:
        if (skill.skill) {
          target.extraSkill.push({ ...skill.skill });
        }
        break;
      case SkillEffectType.ATTACK_POWER:
        if (effect.value) {
          let correctedValue = effect.value;
          // if is behind character then multiple its value again
          if (skill.basis === SkillEffectBasis.SELF_ATK && skill.value) {
            correctedValue = Math.floor(
              correctedValue *
                (from.character.teamPosition < target.teamPosition
                  ? 1 + skill.value
                  : 1)
            );
          }

          target.effects.push({
            ...effect,
            value: correctedValue,
          });
          target.ATK = calcAttack(target);
        }
        break;
      case SkillActionType.CANCEL_GUARD:
        target.isGuard = false;
        break;
      case SkillActionType.CHANGE_CD:
        if (skill.value !== undefined) {
          target.CD += skill.value;
          target.currentCD = target.CD;
        }
        break;
      case SkillActionType.CHANGE_CURRENT_CD:
        if (
          skill.value !== undefined &&
          !target.skillSet.passive.some(
            (e) => e.type === SkillEffectType.IMMUNE_CHANGE_CD
          ) &&
          !target.effects.some(
            (e) => e.type === SkillEffectType.IMMUNE_CHANGE_CD
          )
        ) {
          target.currentCD += skill.value;
          target.currentCD = target.currentCD < 0 ? 0 : target.currentCD;
        }
        break;
      case SkillActionType.CHANGE_MAX_HP:
        if (skill.value !== undefined) {
          target.maxHP *= 1 + skill.value;
          target.HP = target.maxHP;
        }
        break;
      case SkillActionType.CLEAR_ABNORMAL:
        target.isParalysis = false;
        target.isSleep = false;
        target.isSilence = false;
        break;
      case SkillActionType.CLEAR_ATTACK_DEBUFF:
        target.effects = target.effects.filter(
          (e) =>
            !(
              e.value &&
              e.value < 0 &&
              (e.type === SkillEffectType.ATTACK_POWER ||
                e.type == SkillEffectType.NORMAL_ATTACK_DAMAGE ||
                e.type === SkillEffectType.ULTIMATE_DAMAGE)
            )
        );
        break;
      case SkillActionType.CLEAR_SUSTAIN_DEBUFF:
        target.effects = target.effects.filter(
          (e) =>
            !(
              e.value &&
              ((e.value > 0 && e.type === SkillEffectType.DAMAGED) ||
                (e.value < 0 && e.type == SkillEffectType.GUARD_EFFECT) ||
                (e.value < 0 && e.type === SkillEffectType.HEALED))
            )
        );
        break;
      case SkillActionType.CLEAR_EFFECT_FROM_SELF:
        if (skill.skill) {
          target.effects = target.effects.filter(
            (e) =>
              !sameEffect(e, {
                ...skill.skill,
                from: from.character.teamPosition,
              } as typeof e)
          );
        }
        break;
      case SkillActionType.COUNTER_STRIKE:
      case SkillActionType.NORMAL_ATTACK:
      case SkillActionType.ULTIMATE:
      case SkillActionType.FOLLOW_UP_ATTACK:
      case SkillActionType.REAL_ATTACK:
        const damage = calcDamage(from.character, target, skill);
        let restDamage = damage;

        const damageLog = {
          player: ctx.currentPlayer,
          type: skill.type,
          value: damage,
          from: {
            player: effect.fromPlayer,
            position: from.character.teamPosition,
          },
          to: {
            player: to.isEnemy
              ? ctx.currentPlayer === "0"
                ? "1"
                : "0"
              : ctx.currentPlayer,
            position: target.teamPosition,
            originalHP: target.HP,
            originalShield: target.shield,
          },
        } as ILog;

        if (skill.type !== SkillActionType.REAL_ATTACK) {
          target.effects = target.effects.filter((e) => {
            if (e.type === SkillActionType.SHIELD) {
              if (!e.duration || !e.value) {
                return false;
              }

              if (restDamage >= e.value) {
                restDamage -= e.value;
                target.shield -= e.value;
                return false;
              } else {
                e.value -= restDamage;
                target.shield -= restDamage;
                restDamage = 0;
              }
            }
            return true;
          });
        }
        target.HP -= restDamage;
        target.HP = target.HP < 0 ? 0 : target.HP;
        target.isDead = target.HP === 0;

        damageLog.to.HP = target.HP;
        damageLog.to.shield = target.shield;
        logArr?.push(damageLog);

        // dot won't trigger attacked skills
        if (!target.isDead && skill.on !== SkillOn.TURN_END) {
          target.isSleep = false;

          // trigger target's passive
          const enemyID = ctx.currentPlayer === "0" ? "1" : "0";
          const tempG = {
            ...G,
            selected: {
              ...G.selected,
              [enemyID]: G.target[ctx.currentPlayer],
            },
            target: {
              ...G.target,
              [enemyID]: G.selected[ctx.currentPlayer],
            },
          };
          const tempCtx = { ...ctx, currentPlayer: enemyID };

          if (target.teamPosition === 0) {
            target.skillSet.leader
              .filter((s) => s.condition === SkillCondition.ATTACKED)
              .forEach((targetSkill) => {
                // followup attack and counterstrike won't trigger counterstrike
                if (
                  !(
                    targetSkill.type === SkillActionType.COUNTER_STRIKE &&
                    (skill.type === SkillActionType.COUNTER_STRIKE ||
                      skill.type === SkillActionType.FOLLOW_UP_ATTACK)
                  )
                ) {
                  trigger(tempG, tempCtx, targetSkill, logArr);
                }
              });
          }

          if (!target.isSilence) {
            target.skillSet.passive
              .filter((s) => s.condition === SkillCondition.ATTACKED)
              .forEach((targetSkill) => {
                if (
                  skill.type !== SkillActionType.COUNTER_STRIKE ||
                  targetSkill.type !== SkillActionType.COUNTER_STRIKE
                ) {
                  trigger(tempG, tempCtx, targetSkill, logArr);
                }
              });
          }
        } else if (target.isDead) {
          target.isTaunt = false;
          target.isGuard = false;
          target.isSilence = false;
          target.isSleep = false;
          target.isParalysis = false;
          target.isBroken = false;
          target.effects = [];
        }
        break;
      case SkillActionType.FREEZE_CD:
        if (skill.duration) {
          target.currentCD += skill.duration;
        }
        break;
      case SkillActionType.GUARD:
        target.isGuard = true;
        logArr?.push({
          player: ctx.currentPlayer,
          type: skill.type,
          from: {
            player: effect.fromPlayer,
            position: from.character.teamPosition,
          },
          to: {
            player: to.isEnemy
              ? ctx.currentPlayer === "0"
                ? "1"
                : "0"
              : ctx.currentPlayer,
            position: target.teamPosition,
            originalHP: target.HP,
            originalShield: target.shield,
            HP: target.HP,
            shield: target.shield,
          },
        });

        if (!target.isSilence) {
          target.skillSet.passive.forEach((targetSkill) => {
            if (targetSkill.condition === SkillCondition.GUARD) {
              trigger(G, ctx, targetSkill, logArr);
            }
          });
        }
        break;
      case SkillActionType.HEAL:
        let healBasis: number | undefined;
        if (skill.basis === SkillEffectBasis.DAMAGE && logArr) {
          // search basis
          for (let i = logArr.length - 1; i >= 0; i++) {
            if (
              logArr[i].from.position === from.character.teamPosition &&
              (logArr[i].type === SkillActionType.NORMAL_ATTACK ||
                logArr[i].type === SkillActionType.ULTIMATE)
            ) {
              healBasis = logArr[i].value;
              break;
            }
          }
        }
        const heal = calcHeal(from.character, target, skill, healBasis);

        const healLog = {
          player: ctx.currentPlayer,
          type: skill.type,
          value: heal,
          from: {
            player: effect.fromPlayer,
            position: from.character.teamPosition,
          },
          to: {
            player: to.isEnemy
              ? ctx.currentPlayer === "0"
                ? "1"
                : "0"
              : ctx.currentPlayer,
            position: target.teamPosition,
            originalHP: target.HP,
            originalShield: target.shield,
          },
        } as ILog;

        target.HP += heal;
        target.HP = target.HP > target.maxHP ? target.maxHP : target.HP;

        healLog.to.HP = target.HP;
        healLog.to.shield = target.shield;
        logArr?.push(healLog);

        if (!target.isSilence) {
          target.skillSet.passive
            .filter((s) => s.condition === SkillCondition.HEALED)
            .forEach((s) => {
              trigger(G, ctx, s);
            });
        }
        break;
      case SkillActionType.SHIELD:
        const shield = calcShield(from.character, target, skill);

        const shieldLog = {
          player: ctx.currentPlayer,
          type: skill.type,
          value: shield,
          from: {
            player: effect.fromPlayer,
            position: from.character.teamPosition,
          },
          to: {
            player: to.isEnemy
              ? ctx.currentPlayer === "0"
                ? "1"
                : "0"
              : ctx.currentPlayer,
            position: target.teamPosition,
            originalHP: target.HP,
            HP: target.HP,
            originalShield: target.shield,
          },
        } as ILog;

        target.shield += shield;
        target.effects.push({ ...effect, value: shield });

        shieldLog.to.shield = target.shield;
        logArr?.push(shieldLog);
        break;
      case SkillActionType.PARALYSIS:
        if (
          !(skill as ISkill).possibility ||
          target.skillSet.passive.some(
            (s) => s.type === SkillEffectType.IMMUNE_PARALYSIS
          )
        ) {
          break;
        }

        const para = target.effects.find(
          (e) => e.type === SkillEffectType.PARALYZED
        );
        const paraBuff = para?.value ? para.value : 0;
        const rPara = ctx.random?.Number();

        if (rPara && rPara < (skill as ISkill).possibility! * (1 + paraBuff)) {
          target.isParalysis = true;
          target.effects.push(effect);
        }
        break;
      case SkillActionType.SLEEP:
        if (
          !(skill as ISkill).possibility ||
          target.skillSet.passive.some(
            (s) => s.type === SkillEffectType.IMMUNE_SLEEP
          )
        ) {
          break;
        }

        const sleep = target.effects.find(
          (e) => e.type === SkillEffectType.SLEPT
        );
        const sleepBuff = sleep?.value ? sleep.value : 0;
        const rSleep = ctx.random?.Number();

        if (
          rSleep &&
          rSleep < (skill as ISkill).possibility! * (1 + sleepBuff)
        ) {
          target.isSleep = true;
          target.effects.push(effect);
        }
        break;
      case SkillActionType.SILENCE:
        if (
          !(skill as ISkill).possibility ||
          target.skillSet.passive.some(
            (s) => s.type === SkillEffectType.IMMUNE_SILENCE
          )
        ) {
          break;
        }
        const silence = target.effects.find(
          (s) => s.type === SkillEffectType.SILENCED
        );
        const silenceBuff = silence?.value ? silence.value : 0;
        const rSilence = ctx.random?.Number();

        if (
          rSilence &&
          rSilence < (skill as ISkill).possibility! * (1 + silenceBuff)
        ) {
          target.isSilence = true;
          target.effects.push(effect);
        }
        break;
      case SkillActionType.TAUNT:
        target.isTaunt = true;
        target.effects.push(effect);
        break;
      default:
        if (skill.type in SkillActionType) {
          throw `action not allow in effects, type: ${skill.type}`;
        }
        target.effects.push(effect);
        break;
    }
  });
};

const getSkillTargets = (
  G: IGameState,
  ctx: Ctx,
  skill: ISkill | SkillEffect
) => {
  const enemies = getEnemies(G, ctx);
  const selfTeam = G.lineups[ctx.currentPlayer];
  const selected = G.selected[ctx.currentPlayer];
  let targets: Character[];
  let isEnemy = false;

  switch (skill.target) {
    case SkillTarget.SELF:
      targets = [selfTeam[selected]];
      break;
    case SkillTarget.TEAM:
      targets = selfTeam.filter((c) => !c.isDead);
      break;
    case SkillTarget.TEAM_EXCEPT_SELF:
      targets = selfTeam.filter((c, ind) => !c.isDead && ind !== selected);
      break;
    case SkillTarget.TEAM_LEAST_HP:
      const leastHP = Math.min(
        ...selfTeam.filter((c) => !c.isDead).map((c) => c.HP)
      );
      targets = selfTeam.filter((c) => c.HP === leastHP).slice(0, 1);
      break;
    case SkillTarget.ALL_ENEMIES:
      targets = enemies.filter((c) => !c.isDead);
      isEnemy = true;
      break;
    case SkillTarget.SINGLE_ENEMY:
      targets = [enemies[G.target[ctx.currentPlayer]]];
      isEnemy = true;
      break;
    case SkillTarget.FIRE:
      targets = selfTeam.filter((c) => !c.isDead && c.attribute === 0);
      break;
    case SkillTarget.WATER:
      targets = selfTeam.filter((c) => !c.isDead && c.attribute === 1);
      break;
    case SkillTarget.WIND:
      targets = selfTeam.filter((c) => !c.isDead && c.attribute === 2);
      break;
    case SkillTarget.LIGHT:
      targets = selfTeam.filter((c) => !c.isDead && c.attribute === 3);
      break;
    case SkillTarget.DARK:
      targets = selfTeam.filter((c) => !c.isDead && c.attribute === 4);
      break;
    case SkillTarget.ATTACKER:
      targets = selfTeam.filter((c) => !c.isDead && c.position === 5);
      break;
    case SkillTarget.PROTECTOR:
      targets = selfTeam.filter((c) => !c.isDead && c.position === 6);
      break;
    case SkillTarget.HEALER:
      targets = selfTeam.filter((c) => !c.isDead && c.position === 7);
      break;
    case SkillTarget.OBSTRUCTER:
      targets = selfTeam.filter((c) => !c.isDead && c.position === 8);
      break;
    case SkillTarget.SUPPORT:
      targets = selfTeam.filter((c) => !c.isDead && c.position === 9);
      break;
    case SkillTarget.LEFTMOST:
      const leftmost = selfTeam.find((c) => !c.isDead);
      targets = leftmost ? [leftmost] : [];
      break;
    default:
      // unimplemented: position specific skill may change in actual game if someone is dead
      const target = skill.target;
      targets = selfTeam.filter((c, ind) => !c.isDead && target.includes(ind));
  }

  return { targets, isEnemy };
};

export const trigger = (
  G: IGameState,
  ctx: Ctx,
  skill: ISkill | ExtraSkill | SkillEffect,
  logArr?: ILog[]
) => {
  const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

  if (targets.length === 0) {
    return;
  }

  const enemies = getEnemies(G, ctx);
  const selfTeam = G.lineups[ctx.currentPlayer];
  const selected = G.selected[ctx.currentPlayer];
  const { CD, skillDuration, ...rest } = skill as UltimateSkill & ExtraSkill;
  const repeat = (
    (skill as FollowUpAttackSkill).repeat !== undefined
      ? (skill as FollowUpAttackSkill).repeat
      : 1
  ) as number;

  for (let i = 0; i < repeat; i++) {
    if (skill.on === SkillOn.TURN_END) {
      targets.forEach((c) => {
        const endTurnEffect = {
          ...rest,
          from: selfTeam[selected].teamPosition,
          fromPlayer: ctx.currentPlayer,
        };

        if (skill.value) {
          switch (skill.basis) {
            case SkillEffectBasis.SELF_ATK:
              endTurnEffect.value = selfTeam[selected].ATK * skill.value;
              break;
            case SkillEffectBasis.TARGET_ATK:
              endTurnEffect.value =
                skill.value *
                (isEnemy
                  ? enemies[c.teamPosition].ATK
                  : selfTeam[c.teamPosition].ATK);
              break;
            case SkillEffectBasis.TARGET_MAX_HP:
              endTurnEffect.value =
                skill.value *
                (isEnemy
                  ? enemies[c.teamPosition].maxHP
                  : selfTeam[c.teamPosition].maxHP);
              break;
            case SkillEffectBasis.TARGET_CURRENT_HP:
              endTurnEffect.value =
                skill.value *
                (isEnemy
                  ? enemies[c.teamPosition].HP
                  : selfTeam[c.teamPosition].HP);
              break;
          }
        }

        c.effects.push(endTurnEffect);
      });
    } else {
      processSkill(
        G,
        ctx,
        { character: selfTeam[selected], isEnemy: false },
        { characters: targets, isEnemy: isEnemy },
        rest,
        logArr
      );
    }
  }
};

const initCharacter = (
  characterStats: CharacterStats | ScarecrowStats,
  teamPosition: number
): Character => {
  if (characterStats.id === "scarecrow") {
    const { attribute, ATK, HP } = characterStats as ScarecrowStats;
    return {
      id: "scarecrow",
      attribute: attribute,
      position: 5,
      baseATK: ATK,
      baseHP: HP,
      maxHP: HP,
      skillSet: {
        leader: [],
        normalAttack: [],
        ultimate: [],
        passive: [],
      },
      extraSkill: [],
      ATK: ATK,
      HP: HP,
      shield: 0,
      CD: 0,
      currentCD: 51,
      teamPosition,
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
  }

  const { id, level, potential, potentialSub, discipline, star, bond } =
    characterStats as CharacterStats;

  const res = calcCharStats({
    id,
    level,
    potential,
    potentialSub,
    discipline,
    star,
  });

  if (!res) {
    throw "invalid argumnet";
  }

  const { ATK: baseATK, HP: baseHP } = res;

  const { ultimate, starPassive, potentialPassive, ...rest } = skillData[id];

  // get skills according to character stats
  let currUltimate = ultimate.common.map((s, ind) =>
    merge(s, ultimate.bond[bond - 1][ind] ? ultimate.bond[bond - 1][ind] : {})
  );
  let currStarPassive = starPassive
    .filter((s) => s.star <= star)
    .map((s) => {
      const { star, ...rest } = s;
      return rest;
    });
  let currPotentialPassive = potentialPassive
    .filter(
      (s) =>
        s.potential < potential ||
        (s.potential === potential && potentialSub[0])
    )
    .map((s) => {
      const { potential, ...rest } = s;
      return rest;
    });

  return {
    id,
    attribute: ((charMap as any)[id] as ICharacterData).tags.attribute,
    position: ((charMap as any)[id] as ICharacterData).tags.position,
    baseATK,
    baseHP,
    maxHP: baseHP,
    skillSet: {
      ...rest,
      ultimate: currUltimate,
      passive: currStarPassive.concat(currPotentialPassive),
    },
    extraSkill: [],
    ATK: baseATK,
    HP: baseHP,
    shield: 0,
    CD: currUltimate[0].CD,
    currentCD: currUltimate[0].CD,
    teamPosition,
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
};

const nextTarget = (G: IGameState, ctx: Ctx) => {
  const enemies = getEnemies(G, ctx);
  if (enemies[G.target[ctx.currentPlayer]].isDead) {
    return enemies.findIndex((_, ind) => canTarget(G, ctx, ind));
  } else {
    return G.target[ctx.currentPlayer];
  }
};

export const endMove = (G: IGameState, ctx: Ctx) => {
  const lineup = G.lineups[ctx.currentPlayer];
  lineup[G.selected[ctx.currentPlayer]].isMoved = true;

  const next = lineup.findIndex((_, ind) => canSelect(G, ctx, ind));
  if (next !== -1) {
    G.selected[ctx.currentPlayer] = next;
  }

  G.target[ctx.currentPlayer] = nextTarget(G, ctx);
};

export const Battle = (setupData: BattleSetupData) => ({
  name: "tkfm-battle-simulator",
  setup: (ctx: Ctx) => {
    const lineups = setupData.lineups.map((lineup) =>
      lineup.map((c, ind) => initCharacter(c, ind))
    );
    const G = {
      lineups: { "0": lineups[0], "1": lineups[1] },
      selected: { "0": 0, "1": 0 },
      target: { "0": 0, "1": 0 },
      skillQueue: [],
      log: [],
    };

    Object.entries(G.lineups).forEach(([playerID, lineup]) => {
      lineup.forEach((c, ind) => {
        const tempG = {
          ...G,
          selected: { ...G.selected, [playerID]: ind },
        };
        const tempCtx = { ...ctx, currentPlayer: playerID };

        if (ind === 0) {
          // leader skill
          c.skillSet.leader.forEach((s) => {
            if (s.condition === SkillCondition.BATTLE_BEGIN) {
              trigger(tempG, tempCtx, s);
            }
          });
        }
        // 1st turn passives
        c.skillSet.passive.forEach((s) => {
          if (s.condition === SkillCondition.BATTLE_BEGIN) {
            trigger(tempG, tempCtx, s);
          }
        });
      });
    });

    return G;
  },
  moves: {
    attack,
    ultimate,
    guard,
    switchMember,
    switchTarget,
    doNothing: (G: IGameState, ctx: Ctx) => {
      if (G.selected[ctx.currentPlayer] !== -1) {
        G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]].isMoved =
          true;
        endMove(G, ctx);
      } else {
        G.lineups[ctx.currentPlayer].forEach((c) => (c.isMoved = true));
      }
    },
  },
  turn: {
    onBegin: (G: IGameState, ctx: Ctx) => {
      const selfTeam = G.lineups[ctx.currentPlayer];

      // update target
      G.target[ctx.currentPlayer] = nextTarget(G, ctx);
      G.log.push([]);

      selfTeam.forEach((c, ind): boolean | void => {
        if (c.isDead) {
          return true;
        }

        c.isBroken = false;
        c.isGuard = false;
        c.isMoved = false;
        // aside from battle begin
        if (ctx.turn > 2) {
          c.currentCD = c.currentCD === 0 ? 0 : c.currentCD - 1;
          // clear expired effects
          c.effects = c.effects.filter((s) => {
            if (s.duration !== undefined) {
              s.duration--;
            }
            if (s.duration === 0) {
              switch (s.type) {
                case SkillActionType.SHIELD:
                  if (s.value) {
                    c.shield -= s.value;
                  }
                  break;
                case SkillActionType.TAUNT:
                  c.isTaunt = false;
                  break;
                case SkillActionType.PARALYSIS:
                  c.isParalysis = false;
                  break;
                case SkillActionType.SLEEP:
                  c.isSleep = false;
                  break;
                case SkillActionType.SILENCE:
                  c.isSilence = false;
                  break;
              }
              return false;
            }

            return true;
          });
          c.extraSkill = c.extraSkill.filter((s) => {
            const extraSkill = s as ExtraSkill;
            if (extraSkill.skillDuration !== undefined) {
              extraSkill.skillDuration--;
            } else {
              return true;
            }
            return extraSkill.skillDuration !== 0;
          });
        }

        // turn-based skills
        let skills = [];
        if (c.teamPosition === 0) {
          skills.push(...c.skillSet.leader);
        }
        if (!c.isSilence) {
          skills.push(...c.skillSet.passive);
        }

        skills.forEach((s) => {
          if (
            s.condition === SkillCondition.TURN_BASED &&
            s.on === SkillOn.TURN_BEGIN &&
            Math.floor((ctx.turn + 1) / 2) !== 1 &&
            s.conditionValue !== undefined &&
            (Math.floor((ctx.turn + 1) / 2) - 1) % s.conditionValue === 0
          ) {
            trigger(
              {
                ...G,
                selected: { ...G.selected, [ctx.currentPlayer]: ind },
              },
              ctx,
              s
            );
          }
        });

        c.ATK = c.baseATK;
        c.ATK = calcAttack(c);
      });

      // update selected
      G.selected[ctx.currentPlayer] = selfTeam.findIndex((_, ind) =>
        canSelect(G, ctx, ind)
      );
    },
    onEnd: (G: IGameState, ctx: Ctx) => {
      const selfTeam = G.lineups[ctx.currentPlayer];
      const log: ILog[] = [];
      selfTeam.forEach((c, ind) => {
        c.effects.forEach((s) => {
          if (s.on === SkillOn.TURN_END) {
            const fromCharacter =
              s.fromPlayer === ctx.currentPlayer
                ? selfTeam[s.from]
                : getEnemies(G, ctx).find((c) => c.teamPosition === s.from);

            if (fromCharacter) {
              processSkill(
                {
                  ...G,
                  selected: { ...G.selected, [ctx.currentPlayer]: ind },
                },
                ctx,
                {
                  character: fromCharacter,
                  isEnemy: s.fromPlayer !== ctx.currentPlayer,
                },
                { characters: [c], isEnemy: false },
                {
                  ...s,
                  target: SkillTarget.SELF,
                },
                log
              );
            }
          }
        });
      });

      G.log.slice(-1)[0].push(...log);
    },
    endIf: (G: IGameState, ctx: Ctx) =>
      !G.lineups[ctx.currentPlayer].some((_, ind) => canSelect(G, ctx, ind)),
  },
  minPlayers: 2,
  maxPlayers: 2,
  endIf: (G: IGameState, ctx: Ctx): any => {
    const isAllDead = Object.values(G.lineups).map((lineup) =>
      lineup.every((c) => c.isDead)
    );

    if (ctx.turn > 100 || isAllDead[0] || isAllDead[1]) {
      return { winner: isAllDead[1] ? "0" : "1" };
    }
  },
  disableUndo: false,
  ai: {
    enumerate: () => [],
    iterations: setupData.iterations,
    playoutDepth: setupData.playoutDepth,
  },
});
