import React, { useEffect, useReducer } from "react";
import { PageProps } from "gatsby";
import { Client as BgioClient } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { BattleCtx, BattleSetupData, IGameState } from "types/battle";
import useLocalStorage from "hooks/useLocalStorage";
import { useLanguage } from "containers/LanguageProvider";
import { BattleBoard, BattleBoardProps } from "./BattleBoard";
import { Battle, AutoBot, CustomMCTSBot, DoNothingBot } from "utils/battle";

const scarecrow = {
  id: "scarecrow",
  attribute: 5,
  ATK: 0,
  HP: 5000000000,
};

// use wrapper to get generic function's type
const wrapper = () =>
  BgioClient<IGameState, BattleBoardProps, BattleCtx>({
    game: Battle({ lineups: [[], []] }),
    board: BattleBoard,
  });

const bots = [AutoBot, DoNothingBot, CustomMCTSBot];
export const defaultLineups = [[], [scarecrow]] as BattleSetupData["lineups"];

type BattleAppState = {
  Client: ReturnType<typeof wrapper> | null;
  lineups: BattleSetupData["lineups"];
  iterations: number;
  playoutDepth: number;
  resetFlag: boolean;
};

export type BattleAppAction =
  | ({ type: "SET_CLIENT" } & Pick<BattleAppState, "Client">)
  | ({ type: "SET_LINEUPS" } & Pick<BattleAppState, "lineups">)
  | { type: "SET_EMENY_AS_SCARECROW"; number: number }
  | ({ type: "SET_ITERATIONS" } & Pick<BattleAppState, "iterations">)
  | ({ type: "SET_PLAYOUT_DEPTH" } & Pick<BattleAppState, "playoutDepth">)
  | { type: "RESET" };

const battleReducer = (state: BattleAppState, action: BattleAppAction) => {
  switch (action.type) {
    case "SET_CLIENT":
      return { ...state, Client: action.Client };
    case "SET_LINEUPS":
      return { ...state, lineups: action.lineups };
    case "SET_EMENY_AS_SCARECROW":
      if (action.number < 1 || action.number > 5) {
        throw new Error(`Invalid number: ${action.number}`);
      }

      const newLineups = [
        state.lineups[0],
        Array(action.number).fill(scarecrow),
      ] as BattleSetupData["lineups"];

      window.history.replaceState({ lineups: newLineups }, "");

      return { ...state, lineups: newLineups };
    case "SET_ITERATIONS":
      if (!action.iterations || action.iterations < 1) {
        throw new Error(`Invaild iterations: ${action.iterations}`);
      }
      return { ...state, iterations: action.iterations };
    case "SET_PLAYOUT_DEPTH":
      if (!action.playoutDepth || action.playoutDepth < 1) {
        throw new Error(`Invaild playoutDepth: ${action.playoutDepth}`);
      }
      return { ...state, playoutDepth: action.playoutDepth };
    case "RESET":
      return { ...state, resetFlag: !state.resetFlag };
  }
};

export const BattleApp = ({
  location,
  board,
}: Pick<PageProps, "location"> & {
  board: React.ComponentType<BattleBoardProps>;
}): JSX.Element => {
  const { pageString }: any = useLanguage();

  const lineupsFromTeam = (location.state as any)?.lineups;

  const [botIndex, setBotIndex] = useLocalStorage("bot-type", 0);
  const [state, dispatch] = useReducer(battleReducer, {
    Client: null,
    lineups: lineupsFromTeam ? lineupsFromTeam : defaultLineups,
    iterations: 100,
    playoutDepth: 30,
    // reset by useEffect rather than use the built-in function of library due to its issue
    resetFlag: false,
  });

  const initBattle = (setupData: BattleSetupData, botIndex: number) => {
    dispatch({
      type: "SET_CLIENT",
      Client: BgioClient({
        game: Battle(setupData),
        board: board,
        numPlayers: 2,
        debug: false,
        multiplayer: Local({ bots: { 1: bots[botIndex] } }),
      }),
    });
  };

  const settingProps = {
    lineups: state.lineups,
    botIndex,
    iterations: state.iterations,
    playoutDepth: state.playoutDepth,
    handleBotChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setBotIndex(
        pageString.battle.index.setting.labels.indexOf(event.target.value)
      );
    },
    dispatch,
  };

  useEffect(() => {
    initBattle(
      {
        lineups: state.lineups,
        iterations: state.iterations,
        playoutDepth: state.playoutDepth,
      },
      botIndex
    );
  }, [
    state.lineups,
    state.iterations,
    state.playoutDepth,
    state.resetFlag,
    botIndex,
  ]);

  return state.Client ? (
    <state.Client
      playerID="0"
      settingProps={settingProps}
      handleReset={() => dispatch({ type: "RESET" })}
    />
  ) : (
    <div />
  );
};
