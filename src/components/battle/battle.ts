import type { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
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
} from "types/skills";
import { CharacterStats } from "types/characters";
import {
  BattleCharacter as Character,
  BattleSetupData,
  IGameState,
  ILog,
  TestCharacterStats,
} from "types/battle";
import { data as skillData } from "data/characterSkill";
import { calcAttack, calcDamage, calcHeal, calcShield } from "./utils";
import calcCharStats from "utils/calcCharStats";
import charMap from "data/charMap";
import { ICharacterData } from "types/characters";

// helpers
function sameEffect<T extends SkillEffect>(e1: T, e2: T) {
  for (let p in e1) {
    if (p !== "duartion" && p !== "stack" && e1[p] !== e2[p]) {
      return false;
    }
  }
  return true;
}

// always two players
export const getEnemies = (G: IGameState, ctx: Ctx) =>
  G.lineups[ctx.currentPlayer === "0" ? "1" : "0"];

export const canSelect = (
  G: IGameState,
  ctx: Ctx,
  selected: number
): boolean => {
  const selectedCharacter = G.lineups[ctx.currentPlayer][selected];

  return !(
    !selectedCharacter ||
    selectedCharacter.isMoved ||
    selectedCharacter.isDead ||
    selectedCharacter.isParalysis ||
    selectedCharacter.isSleep ||
    selectedCharacter.isBroken
  );
};

export const canTarget = (G: IGameState, ctx: Ctx, target: number) => {
  const enemies = getEnemies(G, ctx);
  const tauntIndex = enemies.findIndex((c) => c.isTaunt && !c.isDead);

  return tauntIndex === -1 ? !enemies[target].isDead : tauntIndex === target;
};

export const canAttack = (
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): boolean => {
  if (!canSelect(G, ctx, selected)) {
    return false;
  }

  if (!canTarget(G, ctx, target)) {
    return false;
  }

  const self = G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]];
  return !(
    self.isMoved ||
    self.isDead ||
    self.isParalysis ||
    self.isSleep ||
    self.isBroken
  );
};

export const canUltimate = (
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): boolean => {
  if (!canSelect(G, ctx, selected)) {
    return false;
  }

  if (!canTarget(G, ctx, target)) {
    return false;
  }

  const self = G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]];
  return !(
    self.isMoved ||
    self.currentCD > 0 ||
    self.isDead ||
    self.isParalysis ||
    self.isSleep ||
    self.isSilence ||
    self.isBroken
  );
};

export const canGuard = (
  G: IGameState,
  ctx: Ctx,
  selected: number
): boolean => {
  if (!canSelect(G, ctx, selected)) {
    return false;
  }

  const self = G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]];
  return !(
    self.isMoved ||
    self.isDead ||
    self.isParalysis ||
    self.isSleep ||
    self.isBroken
  );
};

function processSkill(
  G: IGameState,
  ctx: Ctx,
  from: { character: Character; isEnemy: boolean },
  to: { characters: Character[]; isEnemy: boolean },
  s: ISkill | SkillEffect,
  logArr?: ILog[]
) {
  let effect = {
    ...s,
    fromPlayer: (s as SkillEffect).fromPlayer
      ? (s as SkillEffect).fromPlayer
      : ctx.currentPlayer,
    from: from.character.teamPosition,
  } as SkillEffect;

  if (
    s.type === SkillEffectType.ATTACK_POWER &&
    s.basis === SkillEffectBasis.SELF_ATK &&
    s.value
  ) {
    effect = {
      ...effect,
      value: from.character.ATK * s.value,
    };
  }

  to.characters.forEach((target): boolean | void => {
    if (target.isDead) {
      return true;
    }

    if (
      s.possibility &&
      s.type !== SkillEffectType.PARALYZED &&
      s.type !== SkillEffectType.SLEPT &&
      s.type !== SkillEffectType.SILENCED
    ) {
      const r = ctx.random?.Number();
      if (!r || r > s.possibility) {
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

    switch (s.type) {
      case SkillActionType.ADDSKILL:
        if (s.skill) {
          if (s.condition === SkillCondition.BATTLE_BEGIN) {
            target.skillSet.passive.push({ ...s.skill });
          } else {
            target.extraSkill.push({ ...s.skill });
          }
        }
        break;
      case SkillEffectType.ATTACK_POWER:
        if (effect.value) {
          let correctedValue = effect.value;
          // if is behind character then multiple its value again
          if (s.basis === SkillEffectBasis.SELF_ATK && s.value) {
            correctedValue = Math.floor(
              correctedValue *
                (from.character.teamPosition < target.teamPosition
                  ? 1 + s.value
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
        if (s.value !== undefined) {
          target.CD += s.value;
          target.currentCD = target.CD;
        }
        break;
      case SkillActionType.CHANGE_CURRENT_CD:
        if (
          s.value !== undefined &&
          !target.skillSet.passive.some(
            (e) => e.type === SkillEffectType.IMMUNE_CHANGE_CD
          ) &&
          !target.effects.some(
            (e) => e.type === SkillEffectType.IMMUNE_CHANGE_CD
          )
        ) {
          target.currentCD += s.value;
          target.currentCD = target.currentCD < 0 ? 0 : target.currentCD;
        }
        break;
      case SkillActionType.CHANGE_MAX_HP:
        if (s.value !== undefined) {
          target.maxHP *= 1 + s.value;
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
              e.value < 0 &&
              (e.type === SkillEffectType.DAMAGED ||
                e.type == SkillEffectType.GUARD_EFFECT ||
                e.type === SkillEffectType.HEALED)
            )
        );
        break;
      case SkillActionType.COUNTER_STRIKE:
      case SkillActionType.NORMAL_ATTACK:
      case SkillActionType.ULTIMATE:
      case SkillActionType.FOLLOW_UP_ATTACK:
      case SkillActionType.REAL_ATTACK:
        const damage = calcDamage(from.character, target, s);
        let restDamage = damage;

        const damageLog = {
          player: ctx.currentPlayer,
          type: s.type,
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

        if (s.type !== SkillActionType.REAL_ATTACK) {
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
        if (!target.isDead && s.on !== SkillOn.TURN_END) {
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
                    (s.type === SkillActionType.COUNTER_STRIKE ||
                      s.type === SkillActionType.FOLLOW_UP_ATTACK)
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
                  s.type !== SkillActionType.COUNTER_STRIKE ||
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
        if (s.duration) {
          target.currentCD += s.duration;
        }
        break;
      case SkillActionType.GUARD:
        target.isGuard = true;
        logArr?.push({
          player: ctx.currentPlayer,
          type: s.type,
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
        if (s.basis === SkillEffectBasis.DAMAGE && logArr) {
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
        const heal = calcHeal(from.character, target, s, healBasis);

        const healLog = {
          player: ctx.currentPlayer,
          type: s.type,
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
        const shield = calcShield(from.character, target, s);

        const shieldLog = {
          player: ctx.currentPlayer,
          type: s.type,
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
          !s.possibility ||
          target.skillSet.passive.some(
            (s) => s.type === SkillEffectType.IMMUNE_PARALYSIS
          )
        ) {
          break;
        }

        const para = target.effects.find(
          (s) => s.type === SkillEffectType.PARALYZED
        );
        const paraBuff = para?.value ? para.value : 0;
        const rPara = ctx.random?.Number();

        if (rPara && rPara < s.possibility * (1 + paraBuff)) {
          target.isParalysis = true;
          target.effects.push(effect);
        }
        break;
      case SkillActionType.SLEEP:
        if (
          !s.possibility ||
          target.skillSet.passive.some(
            (s) => s.type === SkillEffectType.IMMUNE_SLEEP
          )
        ) {
          break;
        }

        const sleep = target.effects.find(
          (s) => s.type === SkillEffectType.SLEPT
        );
        const sleepBuff = sleep?.value ? sleep.value : 0;
        const rSleep = ctx.random?.Number();

        if (rSleep && rSleep < s.possibility * (1 + sleepBuff)) {
          target.isSleep = true;
          target.effects.push(effect);
        }
        break;
      case SkillActionType.SILENCE:
        if (
          !s.possibility ||
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

        if (rSilence && rSilence < s.possibility * (1 + silenceBuff)) {
          target.isSilence = true;
          target.effects.push(effect);
        }
        break;
      case SkillActionType.TAUNT:
        target.isTaunt = true;
        target.effects.push(effect);
        break;
      default:
        if (s.type in SkillActionType) {
          throw `action not allow in effects, type: ${s.type}`;
        }
        target.effects.push(effect);
        break;
    }
  });
}

function trigger(
  G: IGameState,
  ctx: Ctx,
  s: ISkill | SkillEffect,
  logArr?: ILog[]
) {
  const enemies = getEnemies(G, ctx);
  const selfTeam = G.lineups[ctx.currentPlayer];
  const selected = G.selected[ctx.currentPlayer];
  let to: Character[];
  let isEnemy = false;

  switch (s.target) {
    case SkillTarget.SELF:
      to = [selfTeam[selected]];
      break;
    case SkillTarget.TEAM:
      to = selfTeam.filter((c) => !c.isDead);
      break;
    case SkillTarget.TEAM_EXCEPT_SELF:
      to = selfTeam.filter((c, ind) => !c.isDead && ind !== selected);
      break;
    case SkillTarget.TEAM_LEAST_HP:
      const leastHP = Math.min(
        ...selfTeam.filter((c) => !c.isDead).map((c) => c.HP)
      );
      to = selfTeam.filter((c) => c.HP === leastHP).slice(0, 1);
      break;
    case SkillTarget.ALL_ENEMIES:
      to = enemies.filter((c) => !c.isDead);
      isEnemy = true;
      break;
    case SkillTarget.SINGLE_ENEMY:
      to = [enemies[G.target[ctx.currentPlayer]]];
      isEnemy = true;
      break;
    case SkillTarget.FIRE:
      to = selfTeam.filter((c) => !c.isDead && c.attribute === 0);
      break;
    case SkillTarget.WATER:
      to = selfTeam.filter((c) => !c.isDead && c.attribute === 1);
      break;
    case SkillTarget.WIND:
      to = selfTeam.filter((c) => !c.isDead && c.attribute === 2);
      break;
    case SkillTarget.LIGHT:
      to = selfTeam.filter((c) => !c.isDead && c.attribute === 3);
      break;
    case SkillTarget.DARK:
      to = selfTeam.filter((c) => !c.isDead && c.attribute === 4);
      break;
    case SkillTarget.ATTACKER:
      to = selfTeam.filter((c) => !c.isDead && c.position === 5);
      break;
    case SkillTarget.PROTECTOR:
      to = selfTeam.filter((c) => !c.isDead && c.position === 6);
      break;
    case SkillTarget.HEALER:
      to = selfTeam.filter((c) => !c.isDead && c.position === 7);
      break;
    case SkillTarget.OBSTRUCTER:
      to = selfTeam.filter((c) => !c.isDead && c.position === 8);
      break;
    case SkillTarget.SUPPORT:
      to = selfTeam.filter((c) => !c.isDead && c.position === 9);
      break;
    case SkillTarget.LEFTMOST:
      const leftmost = selfTeam.find((c) => !c.isDead);
      to = leftmost ? [leftmost] : [];
      break;
    default:
      // unimplemented: position specific skill may change if someone is dead
      const target = s.target;
      to = selfTeam.filter((c, ind) => !c.isDead && target.includes(ind));
  }

  if (to.length === 0) {
    return;
  }

  const repeat =
    (s as FollowUpAttackSkill).repeat !== undefined
      ? (s as FollowUpAttackSkill).repeat
      : 1;

  for (let i = 0; i < repeat; i++) {
    if (s.on === SkillOn.TURN_END) {
      to.forEach((c) => {
        const endTurnEffect = {
          ...s,
          from: selfTeam[selected].teamPosition,
          fromPlayer: ctx.currentPlayer,
        };

        if (s.value) {
          switch (s.basis) {
            case SkillEffectBasis.SELF_ATK:
              endTurnEffect.value = selfTeam[selected].ATK * s.value;
              break;
            case SkillEffectBasis.TARGET_ATK:
              endTurnEffect.value =
                s.value *
                (isEnemy
                  ? enemies[c.teamPosition].ATK
                  : selfTeam[c.teamPosition].ATK);
              break;
            case SkillEffectBasis.TARGET_MAX_HP:
              endTurnEffect.value =
                s.value *
                (isEnemy
                  ? enemies[c.teamPosition].maxHP
                  : selfTeam[c.teamPosition].maxHP);
              break;
            case SkillEffectBasis.TARGET_CURRENT_HP:
              endTurnEffect.value =
                s.value *
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
        { characters: to, isEnemy: isEnemy },
        s,
        logArr
      );
    }
  }
}

interface IObject {
  [key: string]: any;
}

const merge = <T extends IObject[]>(...objects: T) =>
  objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      if (typeof result[key] === "object" && typeof current[key] === "object") {
        result[key] = merge(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    });

    return result;
  }, {}) as any;

function initCharacter(
  characterStats: CharacterStats | TestCharacterStats,
  teamPosition: number
): Character {
  if (characterStats.id === "scarecrow") {
    const { attribute, ATK, HP } = characterStats as TestCharacterStats;
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
}

const nextTarget = (G: IGameState, ctx: Ctx) => {
  const enemies = getEnemies(G, ctx);
  if (enemies[G.target[ctx.currentPlayer]].isDead) {
    const tauntEnemy = enemies.findIndex((c) => !c.isDead && c.isTaunt);
    return tauntEnemy === -1 ? enemies.findIndex((c) => !c.isDead) : tauntEnemy;
  } else {
    return G.target[ctx.currentPlayer];
  }
};

function endMove(G: IGameState, ctx: Ctx) {
  const lineup = G.lineups[ctx.currentPlayer];
  lineup[G.selected[ctx.currentPlayer]].isMoved = true;

  const next = lineup.findIndex(
    (c) => !(c.isMoved || c.isDead || c.isParalysis || c.isSleep || c.isBroken)
  );
  if (next !== -1) {
    G.selected[ctx.currentPlayer] = next;
  }

  G.target[ctx.currentPlayer] = nextTarget(G, ctx);
}

// moves in battle
function attack(
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): IGameState | typeof INVALID_MOVE | void {
  // mutate G directly is ok since it's handled by the library under the hood
  if (canAttack(G, ctx, selected, target)) {
    G.selected[ctx.currentPlayer] = selected;
    G.target[ctx.currentPlayer] = target;
  } else {
    return INVALID_MOVE;
  }

  const self = G.lineups[ctx.currentPlayer][selected];
  const log: ILog[] = [];
  let skills = [...self.skillSet.normalAttack, ...self.extraSkill];
  if (self.teamPosition === 0) {
    skills.push(...self.skillSet.leader);
  }
  if (!self.isSilence) {
    skills.push(...self.skillSet.passive);
  }

  skills = skills.filter(
    (s) =>
      s.condition === SkillCondition.ATTACK ||
      s.condition === SkillCondition.NORMAL_ATTACK
  );
  skills.sort((a, b) => a.on - b.on);
  skills.forEach((s) => {
    trigger(G, ctx, s, log);
  });

  G.log.slice(-1)[0].push(...log);
  endMove(G, ctx);
}

function ultimate(
  G: IGameState,
  ctx: Ctx,
  selected: number,
  target: number
): IGameState | typeof INVALID_MOVE | void {
  if (canUltimate(G, ctx, selected, target)) {
    G.selected[ctx.currentPlayer] = selected;
    G.target[ctx.currentPlayer] = target;
  } else {
    return INVALID_MOVE;
  }

  const self = G.lineups[ctx.currentPlayer][selected];
  self.currentCD = self.CD;

  const log: ILog[] = [];
  let skills = [...self.skillSet.ultimate, ...self.extraSkill];
  if (self.teamPosition === 0) {
    skills.push(...self.skillSet.leader);
  }
  if (!self.isSilence) {
    skills.push(...self.skillSet.passive);
  }

  skills = skills.filter(
    (s) =>
      s.condition === SkillCondition.ATTACK ||
      s.condition === SkillCondition.ULTIMATE
  );
  skills.sort((a, b) => a.on - b.on);
  skills.forEach((s) => {
    trigger(G, ctx, s, log);
  });

  self.effects = self.effects.filter(
    (e) => e.invalidWhen !== SkillCondition.ULTIMATE
  );
  G.log.slice(-1)[0].push(...log);
  endMove(G, ctx);
}

function guard(
  G: IGameState,
  ctx: Ctx,
  selected: number
): IGameState | typeof INVALID_MOVE | void {
  if (canGuard(G, ctx, selected)) {
    G.selected[ctx.currentPlayer] = selected;
  } else {
    return INVALID_MOVE;
  }

  const log: ILog[] = [];
  trigger(
    G,
    ctx,
    {
      type: SkillActionType.GUARD,
      condition: SkillCondition.GUARD,
      target: SkillTarget.SELF,
      on: SkillOn.ON_ACTION,
    },
    log
  );

  G.log.slice(-1)[0].push(...log);
  endMove(G, ctx);
}

function switchMember(
  G: IGameState,
  ctx: Ctx,
  ind: number
): IGameState | typeof INVALID_MOVE | void {
  if (canSelect(G, ctx, ind)) {
    G.selected[ctx.currentPlayer] = ind;
  } else {
    return INVALID_MOVE;
  }
}

function switchTarget(
  G: IGameState,
  ctx: Ctx,
  ind: number
): IGameState | typeof INVALID_MOVE | void {
  if (canTarget(G, ctx, ind)) {
    G.target[ctx.currentPlayer] = ind;
  } else {
    return INVALID_MOVE;
  }
}

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
      G.lineups[ctx.currentPlayer][G.selected[ctx.currentPlayer]].isMoved =
        true;
      endMove(G, ctx);
    },
  },
  turn: {
    onBegin: (G: IGameState, ctx: Ctx) => {
      const selfTeam = G.lineups[ctx.currentPlayer];

      // update selected and target
      G.selected[ctx.currentPlayer] = selfTeam.findIndex((c) => !c.isDead);
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
                case SkillActionType.TAUNT:
                  c.isTaunt = false;
                case SkillActionType.PARALYSIS:
                  c.isParalysis = false;
                case SkillActionType.SLEEP:
                  c.isSleep = false;
                case SkillActionType.SILENCE:
                  c.isSilence = false;
                default:
                  return false;
              }
            }

            return true;
          });
          c.extraSkill = c.extraSkill.filter((s) => {
            if (s.duration !== undefined) {
              s.duration--;
            } else {
              return true;
            }
            return s.duration !== 0;
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
      G.lineups[ctx.currentPlayer].every(
        (c) => c.isMoved || c.isDead || c.isParalysis || c.isSleep || c.isBroken
      ),
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
