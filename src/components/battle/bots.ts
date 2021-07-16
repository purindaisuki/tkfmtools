import type { Ctx } from "boardgame.io";
import { MCTSBot } from "boardgame.io/ai";
import { IGameState } from "types/battle";
import {
  getEnemies,
  movable,
  validateSelected,
  validateTarget,
} from "components/battle";

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
        const canSelected = movable(lineup, (ind) =>
          validateSelected(G, ctx, ind)
        );
        const canTarget = movable(enemies, (ind) =>
          validateTarget(G, ctx, ind)
        );

        for (let s of canSelected) {
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
        //for simulate pvp
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
        const canSelected = movable(lineup, (ind) =>
          validateSelected(G, ctx, ind)
        )[0];
        const canTarget = movable(enemies, (ind) =>
          validateTarget(G, ctx, ind)
        );
        const r = ctx.random?.Die(canTarget.length);

        return [
          {
            move:
              lineup[canSelected].currentCD === 0 &&
              !lineup[canSelected].isSilence
                ? "ultimate"
                : "attack",
            args: [canSelected, r !== undefined ? canTarget[r] : canTarget[0]],
          },
        ];
      },
      objectives: () => ({}),
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
      objectives: () => ({}),
      iterations: 1,
      playoutDepth: 1,
    });
  }
}
