import React, { useState, useReducer } from "react";
import { Client } from "boardgame.io/react";

import { Battle } from "../../components/battle";

const lineup = [
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
    id: "126",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "157",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "106",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "104",
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
    id: "test",
    attribute: 0,
    atk: 0,
    hp: 2147483647,
    level: 60,
    potential: 0,
    potentialSub: Array(6).fill(false),
    discipline: 0,
    star: 0,
    bond: 0,
  },
];

const battle = Client({
  game: Battle({
    lineups: [lineup, enemies],
  }),
  numPlayers: 2,
});

export default battle;
