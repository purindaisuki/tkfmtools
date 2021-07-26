import type { Ctx } from "boardgame.io";
import {
  SkillActionType,
  SkillCondition,
  SkillOn,
  SkillTarget,
  SkillEffectType,
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
import { canTarget } from "./moves";
import { trigger, takeEffect } from "./processSkill";
import { calcAttack } from "./calculators";
import { getEnemies, merge } from "./helpers";
import calcCharStats from "utils/calcCharStats";
import { data as skillData } from "data/characterSkill";
import charMap from "data/charMap";

export const initCharacter = (
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
    throw new Error("invalid argumnet");
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
          if (!c.effects.some((e) => e.type === SkillEffectType.CD_FREEZED)) {
            c.currentCD = c.currentCD === 0 ? 0 : c.currentCD - 1;
          }
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
              { ...G, selected: { ...G.selected, [ctx.currentPlayer]: ind } },
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
              takeEffect(
                { ...G, selected: { ...G.selected, [ctx.currentPlayer]: ind } },
                ctx,
                { character: fromCharacter },
                { characters: [c], player: ctx.currentPlayer },
                { ...s, target: SkillTarget.SELF },
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
