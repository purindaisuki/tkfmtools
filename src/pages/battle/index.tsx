import React, { useState, useReducer } from "react";
import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";
import type { Ctx } from "boardgame.io";
import { BoardProps, Client } from "boardgame.io/react";

import { useLanguage } from "containers/LanguageProvider";

import {
  Battle,
  CharacterButton,
  getCharacterButtonState,
} from "components/battle";
import { BattleCharacter as Character, IGameState } from "types/battle";

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

const BoardContainer = styled.div`
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
    <>
      <div>{`Turn: ${Math.floor((ctx.turn + 1) / 2)}`}</div>
      <BoardContainer>
        <div>
          {G.lineups[0].map((c, ind) => (
            <CharacterButton
              key={c.id}
              character={c}
              state={getCharacterButtonState(G, ctx, c, ctx.playOrder[0])}
              onClick={handleCharacterClick(ind, ctx.playOrder[0])}
            />
          ))}
        </div>
        <div>
          {G.lineups[1].map((c, ind) => (
            <CharacterButton
              key={c.id}
              character={c}
              state={getCharacterButtonState(G, ctx, c, ctx.playOrder[1])}
              onClick={handleCharacterClick(ind, ctx.playOrder[1])}
            />
          ))}
        </div>
      </BoardContainer>
      <Button onClick={handleAttackClick}>Attack</Button>
      <Button onClick={handleUltimateClick}>Ultimate</Button>
      <Button onClick={handleGuardClick}>Guard</Button>
      <Button onClick={() => undo()}>Undo</Button>
      <Button onClick={() => redo()}>Redo</Button>
      <Button onClick={() => reset()}>Reset</Button>
      <div>Log</div>
    </>
  );
};

const battle = Client({
  game: Battle({
    lineups: [lineup, enemies],
  }),
  board: Board,
  numPlayers: 2,
});

export default battle;
