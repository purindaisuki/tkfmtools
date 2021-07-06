import type { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import {
  Skill,
  SkillActionType,
  SkillCondition,
  SkillEffect,
  SkillEffectBasis,
  SkillOn,
  SkillTarget,
  SkillEffectType,
  FollowUpAttackSkill,
} from "../../types/skills";
import { CharacterStats } from "../../types/characters";
import {
  BattleCharacter as Character,
  BattleSetupData,
  G,
  Log,
  SkillQueue,
  TestCharacterStats,
} from "../../types/battle";
import { data as skillData } from "../../data/characterSkill";
import { calcAttack, calcDamage, calcHeal, calcShield } from "./utils";
import calcCharStats from "../../utils/calcCharStats";
import charMap from "../../data/charMap";

/**
 * todo:
 * finish skill
 * finish unimplemented
 */

function sameEffect<T extends SkillEffect>(e1: T, e2: T) {
  for (let p in e1) {
    if (p !== "duartion" && p !== "stack" && e1[p] !== e2[p]) {
      return false;
    }
  }
  return true;
}

function processSkill(
  G: G,
  ctx: Ctx,
  from: Character,
  to: Character[],
  s: Skill | SkillEffect,
  isTurnEnd: boolean,
  logArr?: Log[]
) {
  let effect = { ...s, from: from.id } as SkillEffect;

  if (
    s.type === SkillEffectType.ATTACK_POWER &&
    s.basis === SkillEffectBasis.SELF_ATK &&
    s.value
  ) {
    effect = {
      ...effect,
      value: from.atk * s.value,
    };
  }

  to.forEach((target): boolean | void => {
    // check stackable
    const existEffect = target.effects.find((e) => sameEffect(e, effect));
    if (existEffect) {
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

    // not take endturn effect if not at turn end
    if (s.on === SkillOn.TURN_END && !isTurnEnd) {
      target.effects.push(effect);
      return true;
    }

    switch (s.type) {
      case SkillActionType.ADDSKILL:
        if (s.skill) {
          target.extraSkill.push({ ...s.skill });
        }
        break;
      case SkillEffectType.ATTACK_POWER:
        if (effect.value) {
          let correctedValue = effect.value;
          // if is behind character then multiple its value again
          if (s.basis === SkillEffectBasis.SELF_ATK && s.value) {
            correctedValue = Math.floor(
              correctedValue *
                (from.teamPosition < target.teamPosition ? 1 + s.value : 1)
            );
          }

          target.effects.push({
            ...effect,
            value: correctedValue,
          });
          target.atk = calcAttack(target);
        }
        break;
      case SkillActionType.CANCEL_GUARD:
        target.isGuard = false;
        break;
      case SkillActionType.CHANGE_CD:
        if (s.value !== undefined) {
          target.cd += s.value;
          target.currentCD = target.cd;
        }
        break;
      case SkillActionType.CHANGE_CURRENT_CD:
        if (s.value !== undefined) {
          target.currentCD += s.value;
          target.currentCD = target.currentCD < 0 ? 0 : target.currentCD;
        }
        break;
      case SkillActionType.CHANGE_MAX_HP:
        if (s.value !== undefined) {
          target.maxHp *= 1 + s.value;
          target.hp = target.maxHp;
        }
        break;
      case SkillActionType.CLEAR_ABNORMAL:
        target.isParalysis = false;
        target.isSleep = false;
        target.isSilence = false;
        break;
      case SkillActionType.CLEAR_DEBUFF:
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
      case SkillActionType.COUNTER_STRIKE:
      case SkillActionType.NORMAL_ATTACK:
      case SkillActionType.ULTIMATE:
      case SkillActionType.EXTRA_ATTACK:
      case SkillActionType.FOLLOW_UP_ATTACK:
        const damage = calcDamage(from, target, s);
        let restDamage = damage;

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

        target.hp -= restDamage;
        target.hp = target.hp < 0 ? 0 : target.hp;
        target.isDead = target.hp === 0;

        G.log.push({
          player: ctx.currentPlayer,
          turn: G.turn,
          type: s.type,
          value: damage,
          from: from.id,
          to: target.id,
        });

        // for debug
        logArr?.push({
          player: ctx.currentPlayer,
          turn: G.turn,
          type: s.type,
          value: damage,
          from: from.id,
          to: target.id,
        });

        if (!target.isDead) {
          target.isSleep = false;

          // trigger target's passive
          const tempG = {
            ...G,
            selected: G.target,
            target: G.selected,
          };
          const tempCtx = {
            ...ctx,
            currentPlayer: ctx.playOrder.filter(
              (p) => p !== ctx.currentPlayer
            )[0],
          };

          target.skillSet.leader
            .filter((s) => s.condition === SkillCondition.ATTACKED)
            .forEach((targetSkill) => {
              // counterstrike won't trigger counterstrike
              if (
                s.type !== SkillActionType.COUNTER_STRIKE ||
                targetSkill.type !== SkillActionType.COUNTER_STRIKE
              ) {
                trigger(tempG, tempCtx, targetSkill, isTurnEnd);
              }
            });
          target.skillSet.passive
            .filter((s) => s.condition === SkillCondition.ATTACKED)
            .forEach((targetSkill) => {
              if (
                s.type !== SkillActionType.COUNTER_STRIKE ||
                targetSkill.type !== SkillActionType.COUNTER_STRIKE
              ) {
                trigger(tempG, tempCtx, targetSkill, isTurnEnd);
              }
            });
        } else {
          target.isTaunt = false;
        }
        break;
      case SkillActionType.FREEZE_CD:
        if (s.duration) {
          target.currentCD += s.duration;
        }
        break;
      case SkillActionType.GUARD:
        target.isGuard = true;
        break;
      case SkillActionType.HEAL:
        let healBasis: number | undefined;
        if (s.basis === SkillEffectBasis.DAMAGE) {
          // search basis
          for (let i = G.log.length - 1; i >= 0; i++) {
            if (
              G.log[i].turn === G.turn &&
              G.log[i].player === ctx.currentPlayer &&
              (G.log[i].type === SkillActionType.NORMAL_ATTACK ||
                G.log[i].type === SkillActionType.ULTIMATE)
            ) {
              healBasis = G.log[i].value;
              break;
            }
          }
        }
        const heal = calcHeal(from, target, s, healBasis);
        target.hp += heal;
        target.hp = target.hp > target.maxHp ? target.maxHp : target.hp;

        G.log.push({
          player: ctx.currentPlayer,
          turn: G.turn,
          type: s.type,
          value: heal,
          from: from.id,
          to: target.id,
        });

        // for debug
        logArr?.push({
          player: ctx.currentPlayer,
          turn: G.turn,
          type: s.type,
          value: heal,
          from: from.id,
          to: target.id,
        });

        target.skillSet.passive
          .filter((s) => s.condition === SkillCondition.HEALED)
          .forEach((s) => {
            trigger(G, ctx, s, isTurnEnd);
          });
        break;
      case SkillActionType.SHIELD:
        const shield = calcShield(from, target, s);
        target.shield += shield;

        G.log.push({
          player: ctx.currentPlayer,
          turn: G.turn,
          type: s.type,
          value: shield,
          from: from.id,
          to: target.id,
        });

        target.effects.push({ ...effect, value: shield });
        break;
      case SkillActionType.PARALYSIS:
        target.isParalysis = !target.skillSet.passive.some(
          (s) => s.type === SkillEffectType.IMMUNE_PARALYSIS
        );
        break;
      case SkillActionType.SLEEP:
        target.isSleep = !target.skillSet.passive.some(
          (s) => s.type === SkillEffectType.IMMUNE_SLEEP
        );
        break;
      case SkillActionType.SILENCE:
        target.isSilence = !target.skillSet.passive.some(
          (s) => s.type === SkillEffectType.IMMUNE_SILENCE
        );
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
  G: G,
  ctx: Ctx,
  s: Skill | SkillEffect,
  isTurnEnd: boolean = false,
  logArr?: Log[]
) {
  // mutate G directly is ok since it's handled by the library under the hood
  // always two players
  const enemies =
    G.lineups[ctx.playOrder.filter((p) => p !== ctx.currentPlayer)[0]];
  const selfTeam = G.lineups[ctx.currentPlayer];
  let to: Character[];

  switch (s.target) {
    case SkillTarget.SELF:
      to = [selfTeam[G.selected]];
      break;
    case SkillTarget.TEAM:
      to = selfTeam.filter((c) => !c.isDead);
      break;
    case SkillTarget.TEAM_EXCEPT_SELF:
      to = selfTeam.filter((c, ind) => !c.isDead && ind !== G.selected);
      break;
    case SkillTarget.TEAM_LEAST_HP:
      const leastHp = Math.min(
        ...selfTeam.filter((c) => !c.isDead).map((c) => c.hp)
      );
      to = selfTeam.filter((c) => c.hp === leastHp).slice(0, 1);
      break;
    case SkillTarget.ALL_ENEMIES:
      to = enemies.filter((c) => !c.isDead);
      break;
    case SkillTarget.SINGLE_ENEMY:
      to = [enemies[G.target]];
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
    default:
      // unimplemented: position specific skill may change if someone is dead
      const target = s.target;
      to = selfTeam.filter((c, ind) => !c.isDead && target.includes(ind));
  }

  const repeat =
    (s as FollowUpAttackSkill).repeat !== undefined
      ? (s as FollowUpAttackSkill).repeat
      : 1;

  for (let i = 0; i < repeat; i++) {
    processSkill(G, ctx, selfTeam[G.selected], to, s, isTurnEnd, logArr);
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
  if (characterStats.id === "test") {
    const { attribute, atk, hp } = characterStats as TestCharacterStats;
    return {
      id: "test",
      attribute: attribute,
      position: 5,
      baseAtk: atk,
      baseHp: hp,
      maxHp: hp,
      skillSet: {
        leader: [],
        normalAttack: [],
        ultimate: [],
        passive: [],
      },
      extraSkill: [],
      atk: atk,
      hp: hp,
      shield: 0,
      cd: 0,
      currentCD: 0,
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

  const { ATK: baseAtk, HP: baseHp } = res;

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
    attribute: charMap[id].tags.attribute,
    position: charMap[id].tags.position,
    baseAtk,
    baseHp,
    maxHp: baseHp,
    skillSet: {
      ...rest,
      ultimate: currUltimate,
      passive: currStarPassive.concat(currPotentialPassive),
    },
    extraSkill: [],
    atk: baseAtk,
    hp: baseHp,
    shield: 0,
    cd: currUltimate[0].CD,
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

const pushSkill = (
  G: G,
  ctx: Ctx,
  skills: Skill[],
  condition: (s: Skill) => boolean,
  arr: SkillQueue,
  isTurnEnd?: boolean,
  logArr?: Log[]
) => {
  skills.forEach((s) => {
    if (condition(s)) {
      arr.push({
        cb: () => trigger(G, ctx, s, isTurnEnd, logArr),
        order: s.on,
      });
    }
  });
};

function endMove(G: G, ctx: Ctx) {
  const lineup = G.lineups[ctx.currentPlayer];
  lineup[G.selected].isMoved = true;

  const next = lineup.findIndex((c) => !c.isMoved && !c.isDead && !c.isBroken);
  if (next !== -1) {
    G.selected = next;
  }
}

export const Battle = (setupData: BattleSetupData) => ({
  name: "tkfm-battle-simulator",
  setup: (ctx: Ctx) => {
    const lineups = setupData.lineups.map((lineup) =>
      lineup.map((c, ind) => initCharacter(c, ind))
    );
    const G = {
      lineups,
      selected: 0,
      target: 0,
      turn: 1,
      log: [],
    };

    lineups.forEach((lineup, outerInd) =>
      lineup.forEach((c, ind) => {
        const tempG = {
          ...G,
          lineups: { "0": lineups[0], "1": lineups[1] },
          selected: ind,
        };
        const tempCtx = { ...ctx, currentPlayer: ctx.playOrder[outerInd] };

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
      })
    );
    return G;
  },
  moves: {
    attack: {
      move: (G: G, ctx: Ctx): G | typeof INVALID_MOVE | void => {
        const self = G.lineups[ctx.currentPlayer][G.selected];
        if (
          self.isMoved ||
          self.isDead ||
          self.isParalysis ||
          self.isSleep ||
          self.isBroken
        ) {
          return INVALID_MOVE;
        }
        const { leader, normalAttack, passive } = self.skillSet;
        const skillQueue: SkillQueue = [];
        const log: Log[] = [];

        pushSkill(
          G,
          ctx,
          [...normalAttack, ...leader, ...passive, ...self.extraSkill],
          (s) =>
            s.condition === SkillCondition.ATTACK ||
            s.condition === SkillCondition.NORMAL_ATTACK,
          skillQueue,
          false,
          log
        );

        // consume skills by order
        skillQueue.sort((a, b) => a.order - b.order);
        skillQueue.forEach((s) => s.cb());

        ctx.log?.setMetadata(log);
        endMove(G, ctx);
      },
      undoable: true,
    },
    ultimate: {
      move: (G: G, ctx: Ctx): G | typeof INVALID_MOVE | void => {
        const self = G.lineups[ctx.currentPlayer][G.selected];
        if (
          self.isMoved ||
          self.currentCD > 0 ||
          self.isDead ||
          self.isParalysis ||
          self.isSleep ||
          self.isSilence ||
          self.isBroken
        ) {
          return INVALID_MOVE;
        }
        self.currentCD = self.cd;

        const { leader, ultimate, passive } = self.skillSet;
        const skillQueue: SkillQueue = [];
        const log: Log[] = [];

        pushSkill(
          G,
          ctx,
          [...ultimate, ...leader, ...passive, ...self.extraSkill],
          (s) =>
            s.condition === SkillCondition.ATTACK ||
            s.condition === SkillCondition.ULTIMATE,
          skillQueue,
          false,
          log
        );

        skillQueue.sort((a, b) => a.order - b.order);
        skillQueue.forEach((s) => s.cb());

        ctx.log?.setMetadata(log);
        endMove(G, ctx);
      },
      undoable: true,
    },
    guard: {
      move: (G: G, ctx: Ctx): G | typeof INVALID_MOVE | void => {
        const self = G.lineups[ctx.currentPlayer][G.selected];
        if (
          self.isMoved ||
          self.isDead ||
          self.isParalysis ||
          self.isSleep ||
          self.isBroken
        ) {
          return INVALID_MOVE;
        }
        self.isGuard = true;

        const skillQueue: SkillQueue = [];

        pushSkill(
          G,
          ctx,
          [...self.skillSet.passive, ...self.extraSkill],
          (s) => s.condition === SkillCondition.GUARD,
          skillQueue
        );

        skillQueue.sort((a, b) => a.order - b.order);
        skillQueue.forEach((s) => s.cb());

        endMove(G, ctx);
      },
      undoable: true,
    },
    switchMember: {
      move: (G: G, ctx: Ctx, ind: number): G | typeof INVALID_MOVE | void => {
        const selected = G.lineups[ctx.currentPlayer][ind];
        if (
          !selected ||
          selected.isMoved ||
          selected.isDead ||
          selected.isBroken
        ) {
          return INVALID_MOVE;
        }

        G.selected = ind;
      },
    },
    switchTarget: {
      move: (G: G, ctx: Ctx, ind: number): G | typeof INVALID_MOVE | void => {
        const enemies =
          G.lineups[ctx.playOrder.filter((p) => p !== ctx.currentPlayer)[0]];
        if (enemies.some((c) => c.isTaunt && !c.isDead)) {
          return INVALID_MOVE;
        }

        const target = enemies[ind];
        if (!target || target.isDead) {
          return INVALID_MOVE;
        }

        G.target = ind;
      },
    },
  },
  turn: {
    onBegin: (G: G, ctx: Ctx) => {
      const selfTeam = G.lineups[ctx.currentPlayer];
      const enemies =
        G.lineups[ctx.playOrder.filter((p) => p !== ctx.currentPlayer)[0]];

      // update selected and target
      G.selected = selfTeam.findIndex((c) => !c.isDead);
      const currTarget = enemies.findIndex((c) => !c.isDead && c.isTaunt);
      G.target =
        currTarget === -1 ? enemies.findIndex((c) => !c.isDead) : currTarget;

      // clear expired effects
      selfTeam.forEach((c, ind): boolean | void => {
        if (c.isDead) {
          return true;
        }

        c.isBroken = false;
        c.isGuard = false;
        c.isMoved = false;
        c.effects = c.effects.filter((s) => {
          if (s.duration !== undefined) {
            s.duration--;
          }
          if (s.duration === 0) {
            if (s.type === SkillActionType.SHIELD && s.value) {
              c.shield -= s.value;
            }
            if (s.type === SkillActionType.TAUNT) {
              c.isTaunt = false;
            }
            return false;
          }
          return true;
        });

        // turn-based skills
        const { leader, passive } = c.skillSet;
        const skillQueue: SkillQueue = [];

        pushSkill(
          { ...G, selected: ind },
          ctx,
          [...leader, ...passive],
          (s) =>
            s.condition === SkillCondition.TURN_BASED &&
            s.on === SkillOn.TURN_BEGIN &&
            G.turn !== 1 &&
            s.conditionValue !== undefined &&
            (G.turn - 1) % s.conditionValue === 0,
          skillQueue
        );

        skillQueue.sort((a, b) => a.order - b.order);
        skillQueue.forEach((s) => s.cb());

        c.atk = c.baseAtk;
        c.atk = calcAttack(c);
      });
    },
    onEnd: (G: G, ctx: Ctx) => {
      const log: Log[] = [];
      G.lineups[ctx.currentPlayer].forEach((c, ind) => {
        c.currentCD = c.currentCD === 0 ? 0 : c.currentCD - 1;
        c.effects.forEach((s) => {
          if (s.on === SkillOn.TURN_END) {
            trigger({ ...G, selected: ind }, ctx, s, true, log);
          }
        });
      });
      ctx.log?.setMetadata(log);
      if (ctx.currentPlayer === ctx.playOrder.slice(-1)[0]) {
        G.turn++;
      }
    },
    endIf: (G: G, ctx: Ctx) =>
      G.lineups[ctx.currentPlayer].every((c) => c.isMoved),
  },
  minPlayers: 2,
  maxPlayers: 2,
  endIf: (G: G) =>
    G.turn > 50 ||
    Object.values(G.lineups).some((lineup) => lineup.every((c) => c.isDead)),
  disableUndo: false,
});
