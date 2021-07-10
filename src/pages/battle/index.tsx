import React from "react";
import styled from "styled-components";
import { BoardProps, Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { MCTSBot } from "boardgame.io/ai";
import Panels from "containers/Panels";
import {
  Battle,
  BattleLog,
  CharacterButton,
  getCharacterButtonState,
} from "components/battle";
import { IGameState } from "types/battle";
import Header from "components/Header";
import IconButton from "components/IconButton";
import {
  AttackIcon,
  GuardIcon,
  UltimateIcon,
  UndoIcon,
  RedoIcon,
  ResetIcon,
} from "components/icon";

const scarerow = {
  id: "scarecrow",
  attribute: 0,
  ATK: 0,
  HP: 1000000000,
  level: 60,
  potential: 0,
  potentialSub: Array(6).fill(false),
  discipline: 0,
  star: 0,
  bond: 0,
};

const lineup = [
  {
    id: "126",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "125",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
];

const enemies = [
  {
    id: "132",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
];

const Board = ({
  G,
  ctx,
  moves,
  undo,
  redo,
  reset,
}: BoardProps<IGameState>): JSX.Element => {
  const handleCharacterClick = (ind: number, player: string) => () => {
    if (ctx.currentPlayer === player) {
      moves.switchMember(ind);
    } else {
      moves.switchTarget(ind);
    }
  };

  const handleAttackClick = () => {
    moves.attack(G.selected, G.target);
  };

  const handleUltimateClick = () => {
    moves.ultimate(G.selected, G.target);
  };

  const handleGuardClick = () => {
    moves.guard(G.selected);
  };

  return (
    <Panels panelsWidth={["30%", "70%"]}>
      <div>
        <StyledHeader title={`Turn: ${Math.floor((ctx.turn + 1) / 2)}`} />
        <BattleContainer>
          {Object.entries(G.lineups).map(([player, lineup]) => (
            <div key={player}>
              {lineup.map((c, ind) => (
                <CharacterButton
                  key={ind}
                  character={c}
                  state={getCharacterButtonState(G, ctx, c, player)}
                  onClick={handleCharacterClick(ind, player)}
                />
              ))}
            </div>
          ))}
        </BattleContainer>
        <ControlPanel>
          <IconButton onClick={handleAttackClick} tooltipText={"攻擊"}>
            {AttackIcon}
          </IconButton>
          <IconButton onClick={handleUltimateClick} tooltipText={"必殺"}>
            {UltimateIcon}
          </IconButton>
          <IconButton onClick={handleGuardClick} tooltipText={"防禦"}>
            {GuardIcon}
          </IconButton>
          <IconButton onClick={() => undo()} tooltipText={"上一步"}>
            {UndoIcon}
          </IconButton>
          <IconButton onClick={() => redo()} tooltipText={"下一步"}>
            {RedoIcon}
          </IconButton>
          <IconButton onClick={() => reset()} tooltipText={"重置"}>
            {ResetIcon}
          </IconButton>
        </ControlPanel>
      </div>
      <BattleLog G={G} />
    </Panels>
  );
};

const BattleContainer = styled.div`
  display: flex;
  justify-content: center;
  > div:first-child {
    margin-right: 1rem;
  }
`;
const StyledHeader = styled(Header)`
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
`;
const ControlPanel = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: -0.5rem;
`;

class CustomMCTSBot extends MCTSBot {
  constructor(opts: any) {
    // allow to set ai objectives and settings
    super({ ...opts, ...opts.game.ai });
  }
}

class DoNothingBot extends MCTSBot {
  constructor(opts: any) {
    super({
      ...opts,
      objectives: () => ({}),
      iterations: 1,
      playoutDepth: 1,
    });
  }
}

const App = Client({
  game: Battle({
    lineups: [lineup, enemies],
  }),
  board: Board,
  numPlayers: 2,
  debug: false,
  multiplayer: Local({
    bots: {
      1: CustomMCTSBot,
    },
  }),
});

const BattlePage = () => <App playerID="0" />;

export default BattlePage;
