import React, { useEffect, useState } from "react";
import { PageProps } from "gatsby";
import styled from "styled-components";
import { CircularProgress, Tab, Tabs } from "@material-ui/core";
import { Ctx } from "boardgame.io";
import { BoardProps, Client as BgioClient } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import Panels from "containers/Panels";
import { useLanguage } from "containers/LanguageProvider";
import Head from "components/Head";
import {
  Battle,
  BattleLog,
  BattleSettings,
  CharacterButton,
  IGameSetupProps,
} from "components/battle";
import { AutoBot, CustomMCTSBot, DoNothingBot } from "components/battle/bots";
import Header from "components/Header";
import IconButton from "components/IconButton";
import {
  AttackIcon,
  GuardIcon,
  UltimateIcon,
  UndoIcon,
  RedoIcon,
  ResetIcon,
  SettingIcon,
  HelpIcon,
  NoteIcon,
} from "components/icon";
import { BattleSetupData, IGameState } from "types/battle";
import { CharacterStats } from "types/characters";
import useLocalStorage from "hooks/useLocalStorage";

const scarecrow = {
  id: "scarecrow",
  attribute: 0,
  ATK: 0,
  HP: 5000000000,
  level: 60,
  potential: 0,
  potentialSub: Array(6).fill(false),
  discipline: 0,
  star: 0,
  bond: 0,
};

const TabPanel = ({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}): JSX.Element => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`info-tabpanel-${index}`}
    aria-labelledby={`info-tab-${index}`}
  >
    {value === index && children}
  </div>
);

const tabIcons = [NoteIcon, SettingIcon, HelpIcon];

const InfoTabs = ({
  G,
  settingProps,
}: {
  G: IGameState;
} & { settingProps: IGameSetupProps }): JSX.Element => {
  const { pageString }: any = useLanguage();

  const [tabIndex, setTabIndex] = useLocalStorage("battle-setting-tab", 0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <StyledTabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="Info tabs"
        variant="fullWidth"
      >
        {pageString.battle.index.tabs.map((tab: string, ind: number) => (
          <StyledTab
            label={tab}
            id={`info-tab-${ind}`}
            aria-controls={`info-tabpanel-${ind}`}
            icon={tabIcons[ind]}
            $selected={tabIndex === ind}
            key={ind}
          />
        ))}
      </StyledTabs>
      <TabPanel value={tabIndex} index={0}>
        <BattleLog G={G} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <BattleSettings {...settingProps} />
      </TabPanel>
    </>
  );
};

const StyledTabs = styled(Tabs)`
  && {
    min-height: 0;
    .MuiTabs-indicator {
      background-color: ${(props) => props.theme.colors.secondary};
    }
  }
`;
const StyledTab = styled(Tab)<{ $selected: boolean }>`
  && {
    padding: 0.3rem 0.5rem;
    min-width: 120px;
    min-height: 0;
    .MuiTab-wrapper {
      flex-direction: row;
      margin-bottom: 0.5rem;
      svg {
        height: 1.6rem;
        width: 1.6rem;
        margin-right: 0.4rem;
        margin-bottom: 0;
        fill: ${(props) =>
          props.theme.colors[props.$selected ? "secondary" : "onSurface"]};
      }
    }
  }
`;

const Board = ({
  G,
  ctx,
  moves,
  undo,
  redo,
  reset,
  settingProps,
}: BoardProps<IGameState> & {
  settingProps: IGameSetupProps;
}): JSX.Element => {
  const { pageString }: any = useLanguage();

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
    <Panels panelsWidth={["37.5%", "62.5%"]}>
      <div>
        <StyledHeader
          title={`${pageString.battle.index.turn}: ${Math.floor(
            (ctx.turn + 1) / 2
          )}`}
          end={
            ctx.currentPlayer === "1" && (
              <SpinnerWrapper>
                <span>{pageString.battle.index.calculating}</span>
                <StyledSpinner size={24} thickness={6} disableShrink />
              </SpinnerWrapper>
            )
          }
        />
        <LineupsContainer>
          {Object.entries(G.lineups).map(([player, lineup]) => (
            <div key={player}>
              {lineup.map((c, ind) => (
                <CharacterButton
                  key={ind}
                  G={G}
                  ctx={ctx}
                  player={player}
                  character={c}
                  onClick={handleCharacterClick(ind, player)}
                />
              ))}
            </div>
          ))}
        </LineupsContainer>
        <ControlPanel>
          <IconButton
            onClick={handleAttackClick}
            tooltipText={pageString.battle.index.controlPanel.attack}
          >
            {AttackIcon}
          </IconButton>
          <IconButton
            onClick={handleUltimateClick}
            tooltipText={pageString.battle.index.controlPanel.ultimate}
          >
            {UltimateIcon}
          </IconButton>
          <IconButton
            onClick={handleGuardClick}
            tooltipText={pageString.battle.index.controlPanel.guard}
          >
            {GuardIcon}
          </IconButton>
          <IconButton
            onClick={() => undo()}
            tooltipText={pageString.battle.index.controlPanel.redo}
          >
            {UndoIcon}
          </IconButton>
          <IconButton
            onClick={() => redo()}
            tooltipText={pageString.battle.index.controlPanel.undo}
          >
            {RedoIcon}
          </IconButton>
          <IconButton
            onClick={() => reset()}
            tooltipText={pageString.battle.index.controlPanel.reset}
          >
            {ResetIcon}
          </IconButton>
        </ControlPanel>
      </div>
      <InfoTabs G={G} settingProps={settingProps} />
    </Panels>
  );
};

const LineupsContainer = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (min-width: 1001px) {
    min-height: calc(80vh - 5.3rem);
  }
  > div:first-child {
    margin-right: 1rem;
  }
`;
const StyledHeader = styled(Header)`
  margin-bottom: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
`;
const ControlPanel = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: -0.5rem;
`;
const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;
const StyledSpinner = styled(CircularProgress)`
  && {
    margin: 0 0.5rem;
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const wrapper = () =>
  BgioClient<IGameState, BoardProps & { settingProps: IGameSetupProps }, Ctx>({
    game: Battle({ lineups: [[], []] }),
    board: Board,
  });

type ClientType = ReturnType<typeof wrapper>;

const bots = [AutoBot, DoNothingBot, CustomMCTSBot];

const BattlePage = ({ location }: PageProps): JSX.Element => {
  const { pageString }: any = useLanguage();

  const lineupsFromTeam = (
    (location.state as any)?.lineups
      ? (location.state as any).lineups
      : [[], [scarecrow]]
  ) as [CharacterStats[], CharacterStats[]];
  const [lineups, setLineups] =
    useState<[CharacterStats[], CharacterStats[]]>(lineupsFromTeam);

  const [botIndex, setBotIndex] = useLocalStorage("bot-type", 0);
  const [iterations, setIterations] = useState(100);
  const [playoutDepth, setPlayoutDepth] = useState(30);

  const [Client, setClient] = useState<ClientType | undefined>();

  const initBattle = (setupData: BattleSetupData, botIndex: number) => {
    setClient(() =>
      BgioClient({
        game: Battle(setupData),
        board: Board,
        numPlayers: 2,
        debug: false,
        multiplayer: Local({
          bots: {
            1: bots[botIndex],
          },
        }),
      })
    );
  };

  const settingProps = {
    lineups,
    botIndex,
    iterations,
    playoutDepth,
    handleSelectScarecrow: () => setLineups([lineups[0], [scarecrow]]),
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
  }, [lineups, iterations, playoutDepth, botIndex]);

  return (
    <>
      <Head
        title={pageString.battle.index.helmet.title}
        description={pageString.battle.index.helmet.description}
        path="/battle/"
      />
      {Client && <Client playerID="0" settingProps={settingProps} />}
    </>
  );
};

export default BattlePage;
