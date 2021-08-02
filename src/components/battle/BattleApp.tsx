import React, { useEffect, useState } from "react";
import { PageProps } from "gatsby";
import { Ctx } from "boardgame.io";
import { Client as BgioClient } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { BattleSetupData, IGameState } from "types/battle";
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
  BgioClient<IGameState, BattleBoardProps, Ctx>({
    game: Battle({ lineups: [[], []] }),
    board: BattleBoard,
  });

const bots = [AutoBot, DoNothingBot, CustomMCTSBot];

export const BattleApp = ({
  location,
  board,
}: Pick<PageProps, "location"> & {
  board: React.ComponentType<BattleBoardProps>;
}): JSX.Element => {
  const { pageString }: any = useLanguage();

  const lineupsFromTeam = (location.state as any)?.lineups;
  const [lineups, setLineups] = useState<BattleSetupData["lineups"]>(
    (lineupsFromTeam
      ? lineupsFromTeam
      : [[], [scarecrow]]) as BattleSetupData["lineups"]
  );

  const [botIndex, setBotIndex] = useLocalStorage("bot-type", 0);
  const [iterations, setIterations] = useState(100);
  const [playoutDepth, setPlayoutDepth] = useState(30);
  // reset by useEffect rather than use the built-in function of library due to its issue
  const [resetFlag, setResetFlag] = useState(false);

  const [Client, setClient] = useState<
    ReturnType<typeof wrapper> | undefined
  >();

  const initBattle = (setupData: BattleSetupData, botIndex: number) => {
    setClient(() =>
      BgioClient({
        game: Battle(setupData),
        board: board,
        numPlayers: 2,
        debug: false,
        multiplayer: Local({ bots: { 1: bots[botIndex] } }),
      })
    );
  };

  const settingProps = {
    lineups,
    botIndex,
    iterations,
    playoutDepth,
    handleSelectScarecrow: () => {
      const newLineups = [
        lineups[0],
        [scarecrow],
      ] as BattleSetupData["lineups"];
      setLineups(newLineups);
      window.history.replaceState({ lineups: newLineups }, "");
    },
    handleSelectScarecrows: () => {
      const newLineups = [
        lineups[0],
        Array(5).fill(scarecrow),
      ] as BattleSetupData["lineups"];
      setLineups(newLineups);
      window.history.replaceState({ lineups: newLineups }, "");
    },
    handleBotChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setBotIndex(
        pageString.battle.index.setting.labels.indexOf(event.target.value)
      );
    },
    handleIterationsChange: (newValue: number | number[]) => () =>
      setIterations(newValue as number),
    handlePlayoutDepthChange: (newValue: number | number[]) => () =>
      setPlayoutDepth(newValue as number),
  };

  useEffect(() => {
    initBattle({ lineups, iterations, playoutDepth }, botIndex);
  }, [lineups, iterations, playoutDepth, botIndex, resetFlag]);

  return Client ? (
    <Client
      playerID="0"
      settingProps={settingProps}
      handleReset={() => setResetFlag(!resetFlag)}
    />
  ) : (
    <div />
  );
};
