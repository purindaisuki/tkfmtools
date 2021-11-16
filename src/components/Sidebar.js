import React, { useState } from "react";
import styled from "styled-components";
import { List, ListItem, SwipeableDrawer } from "@mui/material";
import { useLanguage } from "containers/LanguageProvider";
import LocalizedLink from "components/LocalizedLink";
import Accordion from "components/Accordion";
import navbarContent from "components/navbarContent";
import { ExpandMoreIcon, ToolIcon } from "components/icon";

const SidebarAccordions = ({
  icon,
  title,
  to,
  linkType,
  descriptions,
  expanded,
  onChange,
}) => (
  <StyledListItem>
    <ListItemAccordion
      expanded={expanded}
      onChange={onChange}
      square
      expandIcon={ExpandMoreIcon}
      title={
        <>
          {icon}
          {title}
        </>
      }
      content={
        <StyledList>
          {to.map((item, ind) => {
            if (linkType === "internal") {
              return (
                <AccordionItem
                  component={LocalizedLink}
                  to={item}
                  decoration
                  key={ind}
                >
                  {descriptions[ind]}
                </AccordionItem>
              );
            }

            return (
              <AccordionItem
                component="a"
                href={item}
                target="_blank"
                key={ind}
              >
                {descriptions[ind]}
              </AccordionItem>
            );
          })}
        </StyledList>
      }
    />
  </StyledListItem>
);

const StyledListItem = styled(ListItem)`
  position: relative;
  font-size: large;
  cursor: pointer;
  padding: 1rem 1.25rem;
  color: ${({ theme }) => theme.colors.onSurface};
  svg {
    fill: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 1.25rem;
  }
  &:hover {
    border-left: 0.5rem solid ${({ theme }) => theme.colors.secondary};
    background-color: rgba(0, 0, 0, 0.04);
    .MuiAccordion-root {
      background-color: rgba(0, 0, 0, 0.005);
      transition: none;
    }
  }
`;
const ListItemAccordion = styled(Accordion)`
  width: 100%;
  cursor: default;
  .MuiAccordionSummary-root {
    margin: -1rem -1.25rem;
    padding: 1rem 1.25rem;
  }
  .MuiAccordionSummary-content {
    margin: 0;
  }
  .MuiAccordionDetails-root {
    margin: 0 -1.25rem -1rem -1.25rem;
    padding: 0 3.5rem;
    font-size: medium;
    cursor: default;
  }
  .MuiList-root {
    padding-top: 0.5rem;
  }
  .MuiAccordionSummary-expandIconWrapper svg {
    margin: 0;
  }
`;
const AccordionItem = styled(ListItem)`
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.link};
  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }
`;

const SidebarItem = ({
  icon,
  title,
  to,
  expandable,
  linkType,
  descriptions,
  expanded,
  onChange,
  isBeta,
}) => {
  if (expandable) {
    return (
      <SidebarAccordions
        icon={icon}
        title={title}
        to={to}
        linkType={linkType}
        descriptions={descriptions}
        expanded={expanded}
        onChange={onChange}
      />
    );
  }

  return (
    <StyledListItem component={LocalizedLink} button to={to}>
      {icon}
      <BetaTitleWrapper $isBeta={isBeta}>{title}</BetaTitleWrapper>
    </StyledListItem>
  );
};

export const BetaTitleWrapper = styled.span`
  position: relative;
  ${({ theme, $isBeta }) =>
    $isBeta
      ? `&:after {
        position: absolute;
        top: 50%;
        right: -0.4rem;
        content: "BETA";
        padding: 0 3px;
        border-radius: 2px;
        background: ${theme.colors.dropdownHover};
        transform: translate(100%, -50%);
        line-height: 0.75rem;
        font-size: 9px;
      }`
      : ""}
`;

const Sidebar = ({ open, toggleSidebar }) => {
  const { isDefault, userLanguage, pageString } = useLanguage();

  const [expanded, setExpanded] = useState();

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <StyledDrawer
      open={open}
      onClose={toggleSidebar(false)}
      onOpen={toggleSidebar(true)}
      onClick={toggleSidebar(false)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <SidebarHeader>
        {ToolIcon}
        {pageString.index.helmet.title}
      </SidebarHeader>
      <StyledList>
        {navbarContent(userLanguage, isDefault).map((item, ind) => (
          <SidebarItem
            {...item}
            title={pageString.navbar.sidebar[ind].title}
            expandable={item.expandable}
            descriptions={
              item.expandable
                ? pageString.navbar.sidebar[ind].descriptions
                : undefined
            }
            expanded={expanded === ind}
            onChange={handleExpand(ind)}
            key={ind}
            isBeta={ind === 6}
          />
        ))}
      </StyledList>
    </StyledDrawer>
  );
};

const StyledDrawer = styled(SwipeableDrawer)`
  .MuiDrawer-paper {
    background-color: ${({ theme }) => theme.colors.surface};
    width: 20rem;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
  padding: .8rem;
  border-radius: 0;
  font-size: x-large;
  @media screen and (max-width: 490px) {
    font-size: large;
  }
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  svg {
    fill: ${({ theme }) => theme.colors.onPrimary};
    margin: .4rem 1.25rem .4rem .6rem;
    width: 1.6rem;
    height 1.6rem;
    vertical-align: bottom;
  }
`;
const StyledList = styled(List)`
  && {
    padding: 0;
  }
`;

export default Sidebar;
