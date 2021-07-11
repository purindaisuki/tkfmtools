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
    super({ ...opts, ...opts.game.ai });
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
