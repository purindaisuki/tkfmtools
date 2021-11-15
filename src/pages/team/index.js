import React from "react";
import styled from "styled-components";
import { Button, Divider } from "@material-ui/core";
import { useTeamData } from "containers/TeamDataProvider";
import { useLanguage } from "containers/LanguageProvider";
import Switchable from "containers/Switchable";
import Header from "components/Header";
import LocalTeamList from "components/team/LocalTeamList";
import CloudTeamList from "components/team/CloudTeamList";
import languageConfig from "languageConfig.json";

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

const Team = ({ location }) => {
  const { pageString } = useLanguage();

  return (
    <PageWrapper>
      <StyledHeader
        title={
          location.state?.isFromPlayer || location.state?.isFromEnemies
            ? pageString.team.index.selectTeam
            : null
        }
      />
      <StyledDivider />
      <TabPanel
        localStorageKey="team-list-tab"
        layoutSwitcher={
          !(location.state?.isFromPlayer || location.state?.isFromEnemies) && (
            <Tabs />
          )
        }
        items={[
          {
            layout: "local",
            content: <LocalTeamList {...location.state} />,
          },
          {
            layout: "cloud",
            content:
              location.state?.isFromPlayer || location.state?.isFromEnemies ? (
                <LocalTeamList {...location.state} />
              ) : (
                <CloudTeamList />
              ),
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
  height: 3.6rem;
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
