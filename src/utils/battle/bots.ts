import type { Ctx } from "boardgame.io";
import { MCTSBot } from "boardgame.io/ai";
import { IGameState } from "types/battle";
import {
  canAttack,
  canSelect,
  canTarget,
  canUltimate,
} from "utils/battle";
import { getEnemies } from "./helpers";
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
          canSelect(G, ctx, ind)
        );
        const targets = findAllIndices(enemies, (ind) =>
          canTarget(G, ctx, ind)
        );

        for (let s of selected) {
          for (let t of targets) {
            if (canAttack(G, ctx, s, t)) {
              moves.push({
                move: "attack",
                args: [s, t],
              });
            }
            if (canSelect(G, ctx, s)) {
              moves.push({
                move: "guard",
                args: [s],
              });
            }
            if (canUltimate(G, ctx, s, t)) {
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
                move.to.player !== ctx.currentPlayer &&
                move.to.originalHP > 0 &&
                move.to.HP === 0
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

        const selected = lineup.findIndex((_, ind) => canSelect(G, ctx, ind));
        if (selected === -1) {
          return [{ move: "doNothing", args: [] }];
        }

        const targets = enemies
          .filter((_, ind) => canTarget(G, ctx, ind))
          .reduce((max, c) => {
            if (!max[0] || c.HP / c.maxHP > max[0].HP / max[0].maxHP) {
              return [c];
            }
            if (c.HP / c.maxHP === max[0].HP / max[0].maxHP) {
              max.push(c);
            }
            return max;
          }, [] as Character[]);

        if (targets.length === 0) {
          return [{ move: "doNothing", args: [] }];
        }
        let target: number;
        if (targets.length === 1) {
          target = targets[0].teamPosition;
        } else {
          const r = ctx.random?.Die(targets.length);
          target = targets[r !== undefined ? r : 0].teamPosition;
        }

        return [
          {
            move: canUltimate(G, ctx, selected, target) ? "ultimate" : "attack",
            args: [selected, target],
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
