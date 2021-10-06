import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useLayoutConfig } from "containers/Layout";
import { useLanguage } from "containers/LanguageProvider";
import Accordion from "components/Accordion";
import Header from "components/Header";
import RadioGroup, { Radio } from "components/RadioGroup";
import IconButton from "components/IconButton";
import Modal from "components/Modal";
import { ChangeChip, FixChip, NewChip } from "components/Chip";
import { DeleteIcon } from "components/icon";

const SiteDescriptionLine = ({ text, link }) =>
  link ? (
    <a href={link} target="_blank" rel="noreferrer">
      {text}
    </a>
  ) : (
    text
  );

const SiteDescription = ({ content }) =>
  content.map((item, ind) =>
    item.inline ? (
      <SiteDescriptionLine key={ind} {...item} />
    ) : (
      <p key={ind}>
        <SiteDescriptionLine {...item} />
      </p>
    )
  );

export const SiteDescriptions = () => {
  const { pageString } = useLanguage();

  return (
    <BodyContainer>
      <ul>
        {pageString.index.about.content.map((item, ind) => (
          <DescriptionContainer key={ind}>
            <DescriptionHeader title={item.header} />
            <DescriptionBody>
              {item.content.every((i) => i.inline) ? (
                <p>
                  <SiteDescription content={item.content} />
                </p>
              ) : (
                <SiteDescription content={item.content} />
              )}
            </DescriptionBody>
          </DescriptionContainer>
        ))}
      </ul>
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  width: 100%;
  font-size: 0.9rem;
  a {
    color: ${(props) => props.theme.colors.link};
    &:hover {
      color: ${(props) => props.theme.colors.linkHover};
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  > div {
    margin-top: 1rem;
  }
  > div:first-child {
    margin-top: 0;
  }
`;
const DescriptionContainer = styled.li`
  margin: 1rem 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const DescriptionHeader = styled(Header)`
  margin-bottom: 0.5rem;
`;
const DescriptionBody = styled.div`
  p {
    margin: 1rem 0.5rem;
  }
  a {
    text-decoration: none;
  }
`;

export const SiteSetting = () => {
  const { layout, setLayout } = useLayoutConfig();

  const { pageString } = useLanguage();
  const layouts = pageString.index.setting.labels;

  const [isModalOpen, setModal] = useState(false);

  const handleModal = (boolean) => () => setModal(boolean);

  const clearLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  };

  return (
    <BodyContainer>
      <RadioGroup
        label={pageString.index.setting.groupLabel}
        value={layouts[layout]}
        handleChange={(event) => setLayout(layouts.indexOf(event.target.value))}
      >
        {pageString.index.setting.labels.map((label) => (
          <Radio label={label} value={label} key={label} />
        ))}
      </RadioGroup>
      <ClearHeader title={pageString.index.setting.clearTitle} />
      <StyledButton
        onClick={handleModal(true)}
        tooltipText={pageString.index.setting.clearButton}
      >
        {DeleteIcon}
      </StyledButton>
      <StyledModal
        title={pageString.index.setting.clearModalTitle}
        open={isModalOpen}
        onClose={handleModal(false)}
        ariaLabelledby="clear-modal"
        aria-describedby="clear-modal-description"
      >
        <p id="clear-modal-description">
          {pageString.index.setting.clearModalContent}
        </p>
        <ButtonsWrapper>
          <TextButton $clear onClick={clearLocalStorage}>
            {pageString.index.setting.clear}
          </TextButton>
          <TextButton onClick={handleModal(false)}>
            {pageString.index.setting.cancel}
          </TextButton>
        </ButtonsWrapper>
      </StyledModal>
    </BodyContainer>
  );
};

const StyledModal = styled(Modal)`
  > div:nth-child(3) {
    position: relative;
    top: 20%;
    width: 40%;
    height: 30%;
    @media screen and (max-width: 1000px) {
      width: 60%;
    }
    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
`;
const ClearHeader = styled(Header)`
  margin-bottom: 0;
  font-size: medium;
`;
const StyledButton = styled(IconButton)`
  && {
    padding: 0.5rem;
  }
`;
const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0rem;
`;
const TextButton = styled(Button)`
  &&& {
    margin: 0 1rem;
    background-color: ${(props) =>
      props.$clear ? props.theme.colors.error : "gray"};
    span {
      color: ${(props) => props.theme.colors.onError};
    }
  }
`;

export const LogMsg = ({ msg, alwaysOpen }) => {
  const [isExpanded, setExpanded] = useState(alwaysOpen ? true : false);
  const { type, title, description } = msg;
  const Chip = type === "New" ? NewChip : type === "Fix" ? FixChip : ChangeChip;

  const handleChange = () => {
    if (!alwaysOpen) {
      setExpanded(!isExpanded);
    }
  };

  return (
    <MsgAccordion
      expanded={isExpanded}
      onChange={handleChange}
      square
      title={
        <>
          <Chip />
          {title}
        </>
      }
      content={description}
    />
  );
};

const MsgAccordion = styled(Accordion)`
  && {
    border-bottom: 1px solid lightgray;
    > .MuiAccordionSummary-root {
      padding: 0 0.5rem;
      border-bottom: 0px solid lightgray;
    }
    > .MuiAccordionSummary-root.Mui-expanded {
      border-bottom: 1px solid lightgray;
    }
    .MuiAccordionSummary-content {
      display: flex;
      align-items: center;
      margin: 0.5rem 0;
      > span {
        padding: 0.25rem 0.4rem;
        margin-right: 0.4rem;
      }
    }
    && .MuiAccordionDetails-root {
      font-size: small;
      padding: 0.4rem 0.5rem;
      margin: 0;
    }
  }
`;

export const SiteUpdateLog = () => {
  const { pageString } = useLanguage();

  return (
    <BodyContainer>
      {pageString.index.updateLog.content.map((version) => (
        <MsgBox key={version.version}>
          <div>{version.version}</div>
          {version.content.map((msg, ind) => (
            <LogMsg key={ind} msg={msg} />
          ))}
        </MsgBox>
      ))}
    </BodyContainer>
  );
};

const MsgBox = styled.div`
  > div:first-child {
    border-bottom: 1px solid lightgray;
  }
  > div > div {
    border-top: none;
  }
`;

export const SiteLicense = () => {
  const { pageString } = useLanguage();

  return (
    <BodyContainer>
      <LicenseList>
        <li key="text">
          <LicenseItemHeader title={pageString.index.license.content.title} />
          <LicenseItemContent>
            <span>{pageString.index.license.content.content}</span>
          </LicenseItemContent>
        </li>
        {[
          {
            titleLink: "https://github.com/google/material-design-icons",
            title: "Material icons - Google Design",
            licenseLink:
              "https://github.com/google/material-design-icons/blob/master/LICENSE",
            license: "Apache License 2.0",
          },
          {
            titleLink: "https://github.com/facebook/react",
            title: "react",
            licenseLink:
              "https://github.com/facebook/react/blob/master/LICENSE",
            license: "MIT License",
          },
          {
            titleLink: "https://github.com/gatsbyjs/gatsby",
            title: "gatsby",
            licenseLink:
              "https://github.com/gatsbyjs/gatsby/blob/master/LICENSE",
            license: "MIT License",
          },
          {
            titleLink: "https://github.com/styled-components/styled-components",
            title: "styled-components",
            licenseLink:
              "https://github.com/styled-components/styled-components/blob/master/LICENSE",
            license: "MIT License",
          },
          {
            titleLink: "https://github.com/mui-org/material-ui",
            title: "material-ui",
            licenseLink:
              "https://github.com/mui-org/material-ui/blob/master/LICENSE",
            license: "MIT License",
          },
          {
            titleLink: "https://github.com/plouc/nivo",
            title: "nivo",
            licenseLink: "https://github.com/plouc/nivo/blob/master/LICENSE.md",
            license: "MIT License",
          },
          {
            titleLink: "https://github.com/atlassian/react-beautiful-dnd",
            title: "react-beautiful-dnd",
            licenseLink:
              "https://github.com/atlassian/react-beautiful-dnd/blob/master/LICENSE",
            license: "Apache License 2.0",
          },
          {
            titleLink: "https://github.com/niklasvh/html2canvas",
            title: "html2canvas",
            licenseLink:
              "https://github.com/niklasvh/html2canvas/blob/master/LICENSE",
            license: "MIT License",
          },
          {
            titleLink: "https://github.com/paulcollett/react-masonry-css",
            title: "react-masonry-css",
            licenseLink:
              "https://github.com/paulcollett/react-masonry-css/blob/master/LICENSE",
            license: "MIT License",
          },
          {
            titleLink: "https://github.com/boardgameio/boardgame.io",
            title: "boardgame.io",
            licenseLink:
              "https://github.com/boardgameio/boardgame.io/blob/main/LICENSE",
            license: "MIT License",
          },
        ].map((item, ind) => (
          <li key={ind}>
            <LicenseItemHeader
              title={
                <a href={item.titleLink} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              }
            />
            <LicenseItemContent>
              <a href={item.licenseLink} target="_blank" rel="noreferrer">
                {item.license}
              </a>
            </LicenseItemContent>
          </li>
        ))}
      </LicenseList>
    </BodyContainer>
  );
};

const LicenseList = styled.ul`
  margin-bottom: -0.5rem;
`;
const LicenseItemHeader = styled(DescriptionHeader)`
  margin-bottom: 0;
  font-size: medium;
  && a {
    text-decoration: none;
  }
`;
const LicenseItemContent = styled.div`
  padding-left: 0.5rem;
  padding-bottom: 0.5rem;
  && a {
    text-decoration: none;
  }
`;
