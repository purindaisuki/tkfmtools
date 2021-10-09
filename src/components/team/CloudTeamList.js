import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, MenuItem } from "@material-ui/core";
import { useTeamData } from "containers/TeamDataProvider";
import { useLanguage } from "containers/LanguageProvider";
import LocalizedLink from "components/LocalizedLink";
import StyledListItem from "components/team/StyledListItem";
import CharsBox from "components/team/CharBox";
import InfiniteLoader from "components/InfiniteLoader";
import StageSelect from "components/StageSelect";
import languageConfig from "languageConfig.json";

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

const StyledCloudTeamItem = styled(StyledListItem)`
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

  const [teamsRef, setTeamsRef] = useState();
  const [filter, setFilter] = useState({ chapter: "all", stage: "all" });
  const [query, setQuery] = useState();
  const [lastFetchedItem, setLastFetchedItem] = useState();
  const [shouldReset, setShouldReset] = useState(false);

  // not import browser-targeted Firebase bundle when SSR
  useEffect(() => {
    import("../../utils/firebase").then((module) => {
      setTeamsRef(module.teamsRef);
    });
  }, []);

  useEffect(() => {
    if (!teamsRef) {
      return;
    }

    let newQuery = teamsRef.orderBy("time", "desc");

    if (filter.chapter !== "all") {
      newQuery = newQuery
        .where("chapter", "==", filter.chapter)
        .where("stage", "==", filter.stage);
    }

    setQuery(newQuery);
  }, [filter, teamsRef]);

  const fetchItem = async () => {
    if (!query) {
      return;
    }

    const pagenatedQuery = lastFetchedItem
      ? query.startAfter(lastFetchedItem).limit(10)
      : query.limit(10);

    try {
      const snapshot = await pagenatedQuery.get();
      const docs = lastFetchedItem ? snapshot.docs : snapshot.docs.slice(1);
      const last = docs[docs.length - 1];

      if (last) {
        setLastFetchedItem(last);
      } else {
        return [];
      }

      return docs.map((t) => ({ id: t.id, ...t.data() }));
    } catch (error) {
      console.log(error);

      return [];
    }
  };

  const listenToUpdate = useCallback(
    (onUpdate) => {
      if (!query) {
        return;
      }

      const first = query.limit(1);
      const cleanup = first.onSnapshot(
        (snapshot) => {
          const newItems = snapshot
            .docChanges()
            .filter((change) => change.type === "added")
            .map((change) => ({ id: change.doc.id, ...change.doc.data() }));

          onUpdate(newItems);
        },
        (error) => {
          console.log(error);
        }
      );

      return cleanup;
    },
    [query]
  );

  const handleChange = (event) => {
    if (!event.target.value) {
      return;
    }

    const arr = event.target.value.split("/");

    setFilter({ chapter: arr[0], stage: arr[1] });
    setLastFetchedItem(undefined);
    setShouldReset(true);
  };

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
        value={filter.chapter + "/" + filter.stage}
        handleChange={handleChange}
      >
        <MenuItem value="all/all">{pageString.team.index.allStage}</MenuItem>
      </StyledStageSelect>
      <InfiniteLoader
        listenToUpdate={listenToUpdate}
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
        shouldReset={shouldReset}
        onReset={() => setShouldReset(false)}
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

export default CloudTeamList;
