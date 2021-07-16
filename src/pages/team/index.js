import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
} from "@material-ui/core";
import { useTeamData } from "containers/TeamDataProvider";
import { useLanguage } from "containers/LanguageProvider";
import Switchable from "containers/Switchable";
import Head from "components/Head";
import Header from "components/Header";
import LocalizedLink from "components/LocalizedLink";
import InfiniteLoader from "components/InfiniteLoader";
import ImageSupplier from "components/ImageSupplier";
import DropDown from "components/DropDown";
import IconButton from "components/IconButton";
import StageSelect from "components/StageSelect";
import Snackbar from "components/Snackbar";
import { NewIcon, CopyIcon, DeleteIcon, SettingIcon } from "components/icon";
import languageConfig from "languageConfig.json";

const SettingDropDown = () => {
  const { pageString } = useLanguage();

  const { isImportingLineup, actions } = useTeamData();
  const { toggleImportLineupData } = actions;

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleToggle = () => {
    if (!toggleImportLineupData()) {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbar = (boolean) => () => setSnackbarOpen(boolean);

  return (
    <>
      <DropDown
        button={
          <IconButton tooltipText={pageString.team.index.settingTooltip}>
            {SettingIcon}
          </IconButton>
        }
        items={[{ id: "setting-description" }]}
        renderItem={(item) => (
          <>
            <Checkbox
              edge="start"
              checked={isImportingLineup}
              disableRipple
              inputProps={{ "aria-labelledby": item.id }}
            />
            <span id={item.id}>{pageString.team.index.settingDescription}</span>
          </>
        )}
        itemOnClick={handleToggle}
        ariaId="setting-menu"
      />
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbar(false)}
        message={pageString.team.index.errorSnackbar}
        type="error"
      />
    </>
  );
};

const tabs = ["local", "cloud"];

const Tabs = ({ layout, setLayout }) => {
  const { pageString } = useLanguage();

  return (
    <TabsWrapper>
      {tabs.map((tab) => (
        <StyledTab
          $active={layout === tab}
          onClick={() => setLayout(tab)}
          key={tab}
        >
          {pageString.team.index.tabs[tab]}
        </StyledTab>
      ))}
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
`;
const StyledTab = styled(Button)`
  && {
    color: ${(props) =>
      props.theme.colors.onSurface + (props.$active ? "" : "80")};
    font-size: large;
  }
`;

const CharsBox = ({ chars }) => {
  const { charString } = useLanguage();

  if (chars.every((c) => c === undefined || c.id === undefined)) {
    return (
      <CharContainer>
        <EmptySlot />
      </CharContainer>
    );
  }

  return (
    <CharContainer>
      {chars.map(
        (c, ind) =>
          c?.id && (
            <CharImg
              key={ind}
              name={`char_small_${c.id}`}
              alt={charString.name[c.id]}
            />
          )
      )}
    </CharContainer>
  );
};

const CharContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
`;
const CharImg = styled(ImageSupplier)`
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
`;
const EmptySlot = styled.div`
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
`;

const LocalTeamList = ({ isFromPlayer, isFromEnemies, lineups }) => {
  const { pageString } = useLanguage();

  const { localTeams, actions } = useTeamData();
  const { newTeam, getTeam, selectTeam, pushTeam, deleteTeam } = actions;

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbar = (boolean) => () => setSnackbarOpen(boolean);

  const handleTeamClick = (team, ind) => (event) => {
    if (isFromPlayer || isFromEnemies) {
      // validate team
      if (
        team.some((c) => c.id && c.level.length === 0) ||
        team.every((c) => !c.id)
      ) {
        event.preventDefault();
        setSnackbarOpen(true);
      }
    } else {
      selectTeam(ind);
    }
  };

  return (
    <>
      <List>
        <DataItem
          component={LocalizedLink}
          to="/team/build/"
          button
          key="new"
          onClick={() => newTeam()}
        >
          <NewButton>
            {NewIcon}
            <span>{pageString.team.index.newComposition}</span>
          </NewButton>
        </DataItem>
        {localTeams?.map((t, ind) => {
          let newLineups;
          if (isFromPlayer || isFromEnemies) {
            const team = t.characters
              .filter((c) => c.id)
              .map((c) => {
                const { key, ...rest } = c;
                return rest;
              });
            newLineups = isFromPlayer ? [team, lineups[1]] : [lineups[0], team];
          }
          return (
            <DataItem
              component={LocalizedLink}
              to={isFromPlayer || isFromEnemies ? "/battle/" : "/team/build/"}
              state={
                isFromPlayer || isFromEnemies
                  ? {
                      lineups: newLineups,
                      isFromPlayer,
                      isFromEnemies,
                    }
                  : undefined
              }
              replace={isFromPlayer || isFromEnemies}
              button
              key={ind}
              onClick={handleTeamClick(t.characters, ind)}
            >
              <TitleText>{t.name}</TitleText>
              <CharsBox chars={t.characters} />
              <ListItemSecondaryAction>
                <OperationButton
                  onClick={() => pushTeam(getTeam(ind))}
                  tooltipText={pageString.team.index.copyTooltip}
                  edge="end"
                  aria-label="copy-team"
                >
                  {CopyIcon}
                </OperationButton>
                <OperationButton
                  onClick={() => deleteTeam(ind)}
                  tooltipText={pageString.team.index.deleteTooltip}
                  edge="end"
                  aria-label="delete-team"
                >
                  {DeleteIcon}
                </OperationButton>
              </ListItemSecondaryAction>
            </DataItem>
          );
        })}
      </List>
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbar(false)}
        message={pageString.team.index.errorSelectSnackbar}
        type="error"
      />
    </>
  );
};

const DataItem = styled(ListItem)`
  && {
    margin-bottom: 0.6rem;
    padding-right: 6.8rem;
    color: ${(props) => props.theme.colors.onSurface};
  }
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.shadow + "2A"},
    ${(props) => props.theme.colors.shadow + "0D"}
  );
`;
const NewButton = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => props.theme.colors.onSurface};
  }
  span {
    margin-left: 1rem;
    font-size: large;
    line-height: normal;
  }
`;
const TitleText = styled.span`
  width: 8rem;
  color: ${(props) => props.theme.colors.onSurface};
  font-size: small;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const OperationButton = styled(IconButton)`
  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const CloudTeamItem = ({ team, handleSelectTeam }) => {
  const { pageString, stageString, userLanguage } = useLanguage();

  const chapter = stageString.find((s) => s.chapter === team.chapter);
  const stageText =
    team.chapter === "S"
      ? chapter.stagePrefix + team.stage.slice(2) + chapter.stageSuffix
      : chapter.stages.find((s) => s.id === team.stage).name;

  return (
    <StyledCloudTeamItem
      component={LocalizedLink}
      to="/team/build/"
      button
      onClick={handleSelectTeam(team)}
    >
      <Grid container spacing={1}>
        <GridItem item xs={6}>
          {team.stage + " : " + stageText}
        </GridItem>
        <GridItem item xs={6}>
          <FootText>{`${pageString.team.index.author} : ${team.author}`}</FootText>
          <FootText>
            {team.time
              .toDate()
              .toLocaleString(languageConfig[userLanguage].locale, {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })}
          </FootText>
        </GridItem>
        <GridItem item xs={12}>
          <CharsBox chars={team.characters} />
        </GridItem>
        {team.description.length !== 0 && (
          <GridItem item xs={12}>
            {team.description}
          </GridItem>
        )}
      </Grid>
    </StyledCloudTeamItem>
  );
};

const StyledCloudTeamItem = styled(DataItem)`
  && {
    padding-right: 1rem;
    user-select: text;
  }
  > div {
    > div:nth-child(2) {
      justify-content: flex-end;
      > span:first-child {
        margin: 0;
      }
    }
    > div:nth-child(4) {
      margin-top: 0.4rem;
      padding: 0.4rem;
      font-size: small;
      background: linear-gradient(
        90deg,
        ${(props) => props.theme.colors.shadow + "2A"},
        ${(props) => props.theme.colors.shadow + "0D"}
      );
    }
  }
`;
const GridItem = styled(Grid)`
  display: flex;
  align-items: center;
`;
const FootText = styled.span`
  margin-left: 1rem;
  font-size: 0.75rem;
`;

const CloudTeamList = () => {
  const { pageString } = useLanguage();
  const { actions } = useTeamData();
  const { newTeam } = actions;

  const [state, setState] = useState({
    chapter: "all",
    stage: "all",
    hasFirestoreLoaded: false,
    hasVisited: true,
    orderKey: "time",
    orderDirection: "desc",
    query: null,
    lastItem: null,
  });

  const cloudTeamsRef = useRef();

  useEffect(() => {
    import("../../utils/firebase").then((module) => {
      cloudTeamsRef.current = module.teamsRef;
      setState((state) => ({
        ...state,
        hasFirestoreLoaded: true,
      }));
    });
  }, []);

  useEffect(() => {
    if (!cloudTeamsRef.current) {
      return;
    }

    let query = cloudTeamsRef.current.orderBy(
      state.orderKey,
      state.orderDirection
    );
    if (state.chapter !== "all") {
      query = query
        .where("chapter", "==", state.chapter)
        .where("stage", "==", state.stage);
    }

    setState((state) => ({
      ...state,
      query: query,
      hasVisited: false,
    }));
  }, [
    state.chapter,
    state.stage,
    state.orderKey,
    state.orderDirection,
    state.hasFirestoreLoaded,
  ]);

  const listenLatestUpdate = useCallback(
    (dispatch) => {
      if (!state.query) {
        return;
      }

      const first = state.query.limit(1);

      const cleanup = first.onSnapshot(
        (snapshot) => {
          const newItems = snapshot
            .docChanges()
            .filter((change) => change.type === "added")
            .map((change) => ({ id: change.doc.id, ...change.doc.data() }));

          dispatch({ type: "UNSHIFT", items: newItems });
        },
        (err) => {
          console.log(err);
        }
      );

      return cleanup;
    },
    [state.query]
  );

  const fetchItem = useCallback(async () => {
    if (!state.query) {
      return;
    }

    const pagenatedQuery = state.lastItem
      ? state.query.startAfter(state.lastItem).limit(10)
      : state.query.limit(10);

    const snapshot = await pagenatedQuery.get();
    const docs = state.lastItem ? snapshot.docs : snapshot.docs.slice(1);
    const last = docs[docs.length - 1];

    if (last) {
      setState((state) => ({ ...state, lastItem: last }));
    } else {
      return [];
    }

    return docs.map((t) => ({ id: t.id, ...t.data() }));
  }, [state.query, state.lastItem]);

  const handleChange = (event) => {
    if (!event.target.value) {
      return;
    }

    const arr = event.target.value.split("/");

    setState((state) => ({
      ...state,
      chapter: arr[0],
      stage: arr[1],
      hasVisited: false,
      lastItem: null,
    }));
  };

  const handleResetVisited = () =>
    setState({
      ...state,
      hasVisited: true,
    });

  const handleSelectTeam = (data) => () => {
    const { name, characters } = data;

    newTeam({
      name: name,
      characters: characters,
    });
  };

  return (
    <>
      <StyledStageSelect
        value={state.chapter + "/" + state.stage}
        handleChange={handleChange}
      >
        <MenuItem value="all/all">{pageString.team.index.allStage}</MenuItem>
      </StyledStageSelect>
      <InfiniteLoader
        listenLatestUpdate={listenLatestUpdate}
        fetchItem={fetchItem}
        renderItem={(team) =>
          team && (
            <CloudTeamItem
              team={team}
              handleSelectTeam={handleSelectTeam}
              key={team.id}
            />
          )
        }
        hasVisited={state.hasVisited}
        onResetVisited={handleResetVisited}
      />
    </>
  );
};

const StyledStageSelect = styled(StageSelect)`
  && {
    position: absolute;
    top: -3.2rem;
    right: 3rem;
    width: 30%;
    height: 2rem;
    .MuiSelect-select {
      padding: 0.5rem 2rem 0.5rem 1rem;
      font-size: small;
    }
  }
`;

const Team = ({ location }) => {
  const { pageString } = useLanguage();
  const { isFromPlayer, isFromEnemies } = location.state;

  return (
    <PageWrapper>
      <Head
        title={pageString.team.index.helmet.title}
        description={pageString.team.index.helmet.description}
        path="/team/"
      />
      <StyledHeader
        title={
          isFromPlayer || isFromEnemies ? pageString.team.index.selectTeam : undefined
        }
        end={<SettingDropDown />}
      />
      <StyledDivider />
      <TabPanel
        localStorageKey="team-list-tab"
        layoutSwitcher={!(isFromPlayer || isFromEnemies) && <Tabs />}
        items={[
          {
            layout: "local",
            content: <LocalTeamList {...location.state} />,
          },
          {
            layout: "cloud",
            content: !(isFromPlayer || isFromEnemies) && <CloudTeamList />,
          },
        ]}
        initLayoutIndex={0}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  max-width: 1000px;
  margin: auto;
`;
const StyledHeader = styled(Header)`
  position: relative;
  left: -1rem;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0 0 0.5rem 1rem;
  border: none;
  label {
    margin-right: 0.6rem;
    font-size: large;
  }
  > div:last-child {
    position: relative;
    bottom: -0.4rem;
    right: -1rem;
  }
`;
const StyledDivider = styled(Divider)`
  && {
    background-color: ${(props) => props.theme.colors.dropdownHover};
  }
`;
const TabPanel = styled(Switchable)`
  position: relative;
`;

export default Team;
