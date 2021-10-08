import React, { useCallback, useEffect, useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { List, ListItemSecondaryAction } from "@material-ui/core";
import { useTeamData } from "containers/TeamDataProvider";
import { useLanguage } from "containers/LanguageProvider";
import LocalizedLink from "components/LocalizedLink";
import IconButton from "components/IconButton";
import StyledListItem from "components/team/StyledListItem";
import CharsBox from "components/team/CharBox";
import Snackbar from "components/Snackbar";
import { NewIcon, CopyIcon, DeleteIcon } from "components/icon";

const LocalTeamList = ({ isFromPlayer, isFromEnemies, lineups }) => {
  const { pageString, isDefault, userLanguage } = useLanguage();

  const { localTeams, actions } = useTeamData();
  const { newTeam, getTeam, selectTeam, pushTeam, deleteTeam } = actions;

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    pageString.team.index.errorSelectSnackbar
  );

  const handleSnackbar = (boolean) => () => setSnackbarOpen(boolean);

  const handleTeamClick = (team, ind) => async (event) => {
    if (isFromPlayer || isFromEnemies) {
      event.preventDefault();

      // validate team
      let skillData = await import("data/characterSkill").then(
        (module) => module.data
      );

      if (
        team.some((c) => c.id && (c.level.length === 0 || !skillData[c.id]))
      ) {
        setSnackbarOpen(true);
        setSnackbarMessage(pageString.team.index.errorUnsupportedCharacter);
        return;
      }
      if (team.every((c) => !c.id)) {
        setSnackbarOpen(true);
        setSnackbarMessage(pageString.team.index.errorSelectSnackbar);
        return;
      }

      const selectedTeam = team
        .filter((c) => c.id)
        .map((c) => {
          const { key, ...rest } = c;
          return rest;
        });
      const selectedLineups = isFromPlayer
        ? [selectedTeam, lineups[1]]
        : [lineups[0], selectedTeam];

      navigate((isDefault ? "" : "/" + userLanguage) + "/battle/", {
        state: {
          lineups: selectedLineups,
          isFromPlayer,
          isFromEnemies,
        },
        replace: true,
      });
    } else {
      selectTeam(ind);
    }
  };

  return (
    <>
      <List>
        <StyledListItem
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
        </StyledListItem>
        {localTeams?.map((t, ind) => (
          <StyledListItem
            component={LocalizedLink}
            to={isFromPlayer || isFromEnemies ? "/battle/" : "/team/build/"}
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
          </StyledListItem>
        ))}
      </List>
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbar(false)}
        message={snackbarMessage}
        type="error"
      />
    </>
  );
};

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

export default LocalTeamList;
