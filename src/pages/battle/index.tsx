import React from "react";
import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";
import { BoardProps, Client } from "boardgame.io/react";
import Panels from "containers/Panels";
import {
  Battle,
  BattleLog,
  CharacterButton,
  getCharacterButtonState,
} from "components/battle";
import { IGameState } from "types/battle";

const lineup = [
  {
    id: "212",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "130",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "127",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "209",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "129",
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
    id: "101",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
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
        <div>{`Turn: ${Math.floor((ctx.turn + 1) / 2)}`}</div>
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
        <div>
          <Button onClick={handleAttackClick}>Attack</Button>
          <Button onClick={handleUltimateClick}>Ultimate</Button>
          <Button onClick={handleGuardClick}>Guard</Button>
          <Button onClick={() => undo()}>Undo</Button>
          <Button onClick={() => redo()}>Redo</Button>
          <Button onClick={() => reset()}>Reset</Button>
        </div>
      </div>
      <BattleLog G={G} />
    </Panels>
  );
};

const BoardContainer = styled.div`
  display: flex;
`;
const BattleContainer = styled.div`
  display: flex;
  > div:first-child {
    margin-right: 1rem;
  }
`;
const Button = styled(MuiButton)`
  && {
    color: ${(props) => props.theme.colors.onBackground};
  }
`;

const battle = Client({
  game: Battle({
    lineups: [lineup, enemies],
  }),
  board: Board,
  numPlayers: 2,
  debug: false,
});

export default battle;
