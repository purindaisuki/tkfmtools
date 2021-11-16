import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import styled from "styled-components";
import { Tab, Tabs } from "@mui/material";
import { useLanguage } from "containers/LanguageProvider";
import LocalizedLink from "components/LocalizedLink";
import {
  FilterIcon,
  OverviewIcon,
  ListIcon,
  PiechartIcon,
} from "components/icon";

const withTabs = ({ children, pagePath }) => {
  const { userLanguage, pageString } = useLanguage();

  const tabsConfig = {
    enlist: {
      enlist: {
        label: pageString.enlist.tabLabel[0],
        icon: OverviewIcon,
        to: "/enlist/",
      },
      filter: {
        label: pageString.enlist.tabLabel[1],
        icon: FilterIcon,
        to: "/enlist/filter/",
      },
    },
    drop: {
      drop: {
        label: pageString.items.drop.tabLabel[0],
        icon: OverviewIcon,
        to: "/items/drop/",
      },
      filter: {
        label: pageString.items.drop.tabLabel[1],
        icon: FilterIcon,
        to: "/items/drop/filter/",
      },
    },
    analysis: {
      analysis: {
        label: pageString.analysis.tabLabel[0],
        icon: ListIcon,
        to: "/analysis/",
      },
      result: {
        label: pageString.analysis.tabLabel[1],
        icon: PiechartIcon,
        to: "/analysis/result/",
      },
    },
  };

  const configKey = Object.keys(tabsConfig).find((key) =>
    pagePath.includes(key)
  );
  const tabIndex = Object.values(tabsConfig[configKey]).findIndex(
    (value) => value.to === pagePath
  );

  const [state, setState] = useState({ tab: tabIndex });

  let location = useLocation();

  // handle tab change on location change
  useEffect(() => {
    setState((state) => ({ ...state, tab: tabIndex }));
  }, [location]);

  return (
    <>
      <StyledTabs value={state.tab} $lang={userLanguage}>
        {Object.values(tabsConfig[configKey]).map((item, ind) => (
          <Tab
            value={ind}
            label={item.label}
            icon={item.icon}
            component={LocalizedLink}
            to={item.to}
            key={item.label}
          />
        ))}
      </StyledTabs>
      <TabPanel>{children}</TabPanel>
    </>
  );
};

const StyledTabs = styled(Tabs)`
  margin: -1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => `${theme.colors.shadow}1A`};
  .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  .MuiTab-root {
    z-index: 1;
    display: ${({ $lang }) => ($lang === "en" ? "flex" : "inline")};
    min-width: 0;
    min-height: 0;
    padding: 0.6rem 1.2rem;
    color: ${({ theme }) => theme.colors.onSurface};
    font-size: ${({ $lang }) => ($lang === "en" ? "1rem" : "medium")};
  }
  svg {
    width: 1.4rem;
    height: 1.4rem;
    margin: 0rem 0.2rem;
    margin-left: 0;
    fill: ${({ theme }) => theme.colors.onSurface};
  }
  .Mui-selected {
    color: ${({ theme }) => theme.colors.secondary};
    svg {
      fill: ${({ theme }) => theme.colors.secondary};
    }
  }
`;
const TabPanel = styled.div`
  position: relative;
`;

export default withTabs;
