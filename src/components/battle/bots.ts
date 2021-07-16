import type { Ctx } from "boardgame.io";
import { MCTSBot } from "boardgame.io/ai";
import { IGameState } from "types/battle";
import {
  getEnemies,
  validateSelected,
  validateTarget,
} from "components/battle";
import { BattleCharacter as Character } from "types/battle";

const findAllIndices = (
  lineup: Character[],
  condition: (ind: number) => boolean
) =>
  lineup.reduce((res, _, i) => {
    if (condition(i)) {
      res.push(i);
    }
    return res;
  }, [] as number[]);

export class CustomMCTSBot extends MCTSBot {
  constructor(opts: any) {
    // allow to set ai objectives and settings
    super({
      ...opts,
      ...opts.game.ai,
      enumerate: (G: IGameState, ctx: Ctx) => {
        let moves = [];
        const lineup = G.lineups[ctx.currentPlayer];
        const enemies = getEnemies(G, ctx);
        const selected = findAllIndices(lineup, (ind) =>
          validateSelected(G, ctx, ind)
        );
        const canTarget = findAllIndices(enemies, (ind) =>
          validateTarget(G, ctx, ind)
        );

        for (let s of selected) {
          let canUltimate = lineup[s].currentCD === 0 && !lineup[s].isSilence;

          for (let t of canTarget) {
            moves.push({
              move: "attack",
              args: [s, t],
            });
            moves.push({
              move: "guard",
              args: [s],
            });
            if (canUltimate) {
              moves.push({
                move: "ultimate",
                args: [s, t],
              });
            }
          }
        }

        return moves;
      },
      objectives: () => ({
        kill: {
          checker: (G: IGameState, ctx: Ctx) => {
            const moves = G.log[ctx.turn - 1];
            if (moves.length === 0) {
              return false;
            }
            return moves.some(
              (move) =>
                move.to.isEnemy && move.to.originalHP > 0 && move.to.HP === 0
            );
          },
          weight: 1,
        },
        dontDie: {
          checker: (G: IGameState, ctx: Ctx) =>
            G.lineups[ctx.currentPlayer].some((c) => c.isDead),
          weight: -1,
        },
      }),
    });
  }
}

export class AutoBot extends MCTSBot {
  constructor(opts: any) {
    super({
      ...opts,
      enumerate: (G: IGameState, ctx: Ctx) => {
        const lineup = G.lineups[ctx.currentPlayer];
        const enemies = getEnemies(G, ctx);

        const selected = lineup.findIndex((_, ind) =>
          validateSelected(G, ctx, ind)
        );
        if (selected === -1) {
          return [{ move: "doNothing", args: [] }];
        }

        const canTarget = enemies
          .filter((_, ind) => validateTarget(G, ctx, ind))
          .reduce((max, c) => {
            if (!max[0] || c.HP / c.maxHP > max[0].HP / max[0].maxHP) {
              return [c];
            }
            if (c.HP / c.maxHP === max[0].HP / max[0].maxHP) {
              max.push(c);
            }
            return max;
          }, [] as Character[]);

        if (canTarget.length === 0) {
          return [{ move: "doNothing", args: [] }];
        }
        let targeted: number;
        if (canTarget.length === 1) {
          targeted = canTarget[0].teamPosition;
        } else {
          const r = ctx.random?.Die(canTarget.length);
          targeted = canTarget[r !== undefined ? r : 0].teamPosition;
        }

        return [
          {
            move:
              lineup[selected].currentCD === 0 && !lineup[selected].isSilence
                ? "ultimate"
                : "attack",
            args: [selected, targeted],
          },
        ];
      },
      iterations: 1,
      playoutDepth: 1,
    });
  }
}

export class DoNothingBot extends MCTSBot {
  constructor(opts: any) {
    super({
      ...opts,
      enumerate: () => [{ move: "doNothing", args: [] }],
      iterations: 1,
      playoutDepth: 1,
    });
  }
}
