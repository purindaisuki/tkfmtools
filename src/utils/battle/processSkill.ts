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
import {
  BattleCtx,
  BattleCharacter as Character,
  IGameState,
  ILog,
  PlayerID,
} from "types/battle";
import { calcAttack, calcDamage, calcHeal, calcShield } from "./calculators";
import { getEnemies, sameEffect } from "./helpers";

const correctionTerm = 0.0001;

export const takeEffect = (
  G: IGameState,
  ctx: BattleCtx,
  from: { character: Character },
  to: { characters: Character[]; player: PlayerID },
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

  let ATKBuffValues: [number, number] | undefined;
  if (
    skill.type === SkillEffectType.ATTACK_POWER &&
    skill.basis === SkillEffectBasis.SELF_ATK &&
    skill.value
  ) {
    const value = Math.floor(from.character.ATK * skill.value + correctionTerm);
    const valueAfterSelf = Math.floor(
      (from.character.ATK + value) * skill.value + correctionTerm
    );

    ATKBuffValues = [value, valueAfterSelf];
  }

  to.characters.forEach((target): boolean | void => {
    if (target.isDead) {
      return true;
    }

    if (
      (skill as ISkill).possibility !== undefined &&
      skill.type !== SkillActionType.PARALYSIS &&
      skill.type !== SkillActionType.SLEEP &&
      skill.type !== SkillActionType.SILENCE
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
          // if is behind character then multiple its value again
          if (ATKBuffValues) {
            effect.value =
              ATKBuffValues[
                from.character.teamPosition >= target.teamPosition ? 0 : 1
              ];
          }

          target.effects.push({ ...effect });
          target.ATK = calcAttack(target);
        }
        break;
      case SkillActionType.CANCEL_GUARD:
        target.isGuard = false;
        break;
      case SkillActionType.CHANGE_CD:
        if (skill.value !== undefined) {
          target.CD += skill.value;
          target.currentCD = target.currentCD === 0 ? 0 : target.CD;
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
                fromPlayer: ctx.currentPlayer,
              } as typeof e)
          );
        }
        break;
      case SkillActionType.COUNTER_STRIKE:
      case SkillActionType.NORMAL_ATTACK:
      case SkillActionType.ULTIMATE:
      case SkillActionType.FOLLOW_UP_ATTACK:
      case SkillActionType.REAL_ATTACK:
        const damage = calcDamage(
          from.character,
          target,
          skill,
          G.lineups[effect.fromPlayer],
          G.lineups[to.player]
        );
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
            player: to.player,
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

        if (!target.isDead) {
          // wake character only when HP decreases
          if (damageLog.to.originalHP !== damageLog.to.HP) {
            target.isSleep = false;
          }
          // dot won't trigger attacked skills
          if (skill.on === SkillOn.TURN_END) {
            break;
          }

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
          const tempCtx = { ...ctx, currentPlayer: enemyID as PlayerID };

          if (!target.isSilence && !target.isParalysis && !target.isSleep) {
            target.skillSet.passive
              .filter(
                (s) =>
                  s.condition === SkillCondition.ATTACKED &&
                  !(
                    s.type === SkillActionType.COUNTER_STRIKE &&
                    (skill.type === SkillActionType.COUNTER_STRIKE ||
                      skill.type === SkillActionType.FOLLOW_UP_ATTACK)
                  )
              )
              .forEach((targetSkill) => {
                trigger(tempG, tempCtx, targetSkill, logArr);
              });
          }
        } else {
          target.isTaunt = false;
          G.taunt[to.player] = G.taunt[to.player].filter(
            (i) => i !== target.teamPosition
          );
          target.isGuard = false;
          target.isSilence = false;
          target.isSleep = false;
          target.isParalysis = false;
          target.isBroken = false;
          target.effects = [];
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
            player: to.player,
            position: target.teamPosition,
            originalHP: target.HP,
            originalShield: target.shield,
            HP: target.HP,
            shield: target.shield,
          },
        });
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
            player: to.player,
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

        if (!target.isSilence && !target.isParalysis && !target.isSleep) {
          const tempG = {
            ...G,
            selected: {
              ...G.selected,
              [ctx.currentPlayer]: target.teamPosition,
            },
            target: {
              ...G.target,
              [ctx.currentPlayer]: from.character.teamPosition,
            },
          };
          const tempCtx = {
            ...ctx,
            currentPlayer: to.player,
          };
          target.skillSet.passive
            .filter((s) => s.condition === SkillCondition.HEALED)
            .forEach((s) => {
              trigger(tempG, tempCtx, s, logArr);
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
            player: to.player,
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

        if (rPara && rPara <= (skill as ISkill).possibility! * (1 + paraBuff)) {
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
          rSleep <= (skill as ISkill).possibility! * (1 + sleepBuff)
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
          rSilence <= (skill as ISkill).possibility! * (1 + silenceBuff)
        ) {
          target.isSilence = true;
          target.effects.push(effect);
        }
        break;
      case SkillActionType.TAUNT:
        target.isTaunt = true;
        target.effects.push(effect);
        G.taunt[to.player].push(target.teamPosition);
        break;
      default:
        if (skill.type in SkillActionType) {
          throw new Error(`action not allow in effects, type: ${skill.type}`);
        }
        target.effects.push(effect);
        break;
    }
  });
};

export const getSkillTargets = (
  G: IGameState,
  ctx: BattleCtx,
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
      const leastHP = selfTeam.reduce((arr, c) => {
        if (!c.isDead) {
          if (!arr[0] || c.HP / c.maxHP < arr[0].HP / arr[0].maxHP) {
            arr = [c];
          } else if (c.HP / c.maxHP === arr[0].HP / arr[0].maxHP) {
            arr.push(c);
          }
        }
        return arr;
      }, [] as Character[]);

      const ind =
        leastHP.length === 1 || !ctx.random?.Die
          ? 0
          : ctx.random.Die(leastHP.length) - 1;

      targets = leastHP.length === 0 ? [] : [leastHP[ind]];
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
      if (typeof skill.target === "object") {
        if (typeof skill.target[0] === "number") {
          // unimplemented: position specific skill may change in actual game if someone is dead
          targets = selfTeam.filter(
            (c, ind) => !c.isDead && (skill.target as number[]).includes(ind)
          );
          break;
        } else if (typeof skill.target[0] === "string") {
          targets = selfTeam.filter(
            (c) => !c.isDead && (skill.target as string[]).includes(c.id)
          );
          break;
        }
      }

      throw new Error(`invalid skill target type: ${typeof skill.target}`);
  }

  return { targets, isEnemy };
};

export const trigger = (
  G: IGameState,
  ctx: BattleCtx,
  skill: ISkill | ExtraSkill | SkillEffect,
  logArr?: ILog[]
) => {
  const { targets, isEnemy } = getSkillTargets(G, ctx, skill);

  if (targets.length === 0) {
    return;
  }

  const selfTeam = G.lineups[ctx.currentPlayer];
  const selected = G.selected[ctx.currentPlayer];
  const { CD, skillDuration, repeat, ...rest } = skill as UltimateSkill &
    ExtraSkill &
    FollowUpAttackSkill;
  let repeatTimes = repeat !== undefined ? repeat : 1;

  for (let i = 0; i < repeatTimes; i++) {
    if (skill.on === SkillOn.TURN_END) {
      if (
        !(
          skill.type === SkillActionType.NORMAL_ATTACK ||
          skill.type === SkillActionType.ULTIMATE ||
          skill.type === SkillActionType.HEAL
        )
      ) {
        throw new Error(
          `invalid type for end turn effect, type: ${skill.type}`
        );
      }

      targets.forEach((c) => {
        const endTurnEffect = {
          ...rest,
          from: selfTeam[selected].teamPosition,
          fromPlayer: ctx.currentPlayer,
        };

        if (skill.value) {
          switch (skill.basis) {
            case SkillEffectBasis.SELF_ATK:
              endTurnEffect.value = Math.floor(
                selfTeam[selected].ATK * skill.value + correctionTerm
              );
              break;
            case SkillEffectBasis.TARGET_ATK:
              endTurnEffect.value = skill.value * c.ATK;
              break;
            case SkillEffectBasis.TARGET_MAX_HP:
              endTurnEffect.value = skill.value * c.maxHP;
              break;
            case SkillEffectBasis.TARGET_CURRENT_HP:
              endTurnEffect.value = skill.value * c.HP;
              break;
          }
        }

        c.effects.push(endTurnEffect);
      });
    } else {
      takeEffect(
        G,
        ctx,
        { character: selfTeam[selected] },
        {
          characters: targets,
          player: isEnemy
            ? ctx.currentPlayer === "0"
              ? "1"
              : "0"
            : ctx.currentPlayer,
        },
        rest,
        logArr
      );
    }
  }
};
