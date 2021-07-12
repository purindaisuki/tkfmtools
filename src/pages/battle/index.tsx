import React from "react";
import styled from "styled-components";
import { BoardProps, Client } from "boardgame.io/react";
import { Tab, Tabs } from "@material-ui/core";
import { Local } from "boardgame.io/multiplayer";
import Panels from "containers/Panels";
import { useLanguage } from "containers/LanguageProvider";
import { Battle, BattleLog, CharacterButton } from "components/battle";
import { IGameState } from "types/battle";
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
import Head from "components/Head";
import { useState } from "react";

const scarerow = {
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
    id: "130",
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
    id: "126",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
  {
    id: "103",
    level: 60,
    potential: 12,
    potentialSub: Array(6).fill(true),
    discipline: 3,
    star: 5,
    bond: 5,
  },
];

const enemies = [scarerow];

const Setings = (): JSX.Element => {
  return (
    <div>
      <div>Team</div>
      <div>Enemies</div>
      <div>Bot</div>
    </div>
  );
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

const InfoTabs = ({ G }: { G: IGameState }): JSX.Element => {
  const { pageString }: any = useLanguage();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <StyledTabs
        value={value}
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
            $selected={value === ind}
          />
        ))}
      </StyledTabs>
      <TabPanel value={value} index={0}>
        <BattleLog G={G} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Setings />
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
}: BoardProps<IGameState>): JSX.Element => {
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
    <>
      <Head
        title={pageString.battle.index.helmet.title}
        description={pageString.battle.index.helmet.description}
        path="/battle/"
      />
      <Panels panelsWidth={["30%", "70%"]}>
        <div>
          <StyledHeader
            title={`${pageString.battle.index.turn}: ${Math.floor(
              (ctx.turn + 1) / 2
            )}`}
          />
          <BattleContainer>
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
          </BattleContainer>
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
        <InfoTabs G={G} />
      </Panels>
    </>
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
  border-bottom: 2px solid ${(props) => props.theme.colors.secondary};
`;
const ControlPanel = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: -0.5rem;
`;

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
