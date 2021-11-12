import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import useLocalStorage from "hooks/useLocalStorage";
import { useLanguage } from "containers/LanguageProvider";
import IconButton from "components/IconButton";
import Accordion from "components/Accordion";
import {
  LogMsg,
  SiteDescriptions,
  SiteSetting,
  SiteUpdateLog,
  SiteLicense,
} from "components/SiteAccordionBody";
import Modal from "components/Modal";
import { ExpandMoreIcon, NoteIcon } from "components/icon";

const UpdateModal = ({ open, onClose }) => {
  const { pageString } = useLanguage();
  const latestMsg = pageString.index.updateLog.content[0];

  return (
    <MsgModal
      title={`${pageString.index.helmet.title} ${latestMsg.version}`}
      open={open}
      onClose={onClose}
      ariaLabelledby="update-modal-title"
    >
      <ModalBody>
        {latestMsg.content.map((msg, ind) => (
          <LogMsg msg={msg} alwaysOpen={true} key={ind} />
        ))}
      </ModalBody>
    </MsgModal>
  );
};

const MsgModal = styled(Modal)`
  > div:nth-child(3) {
    width: 40%;
    @media screen and (max-width: 992px) {
      width: 80%;
    }
    @media screen and (max-width: 768px) {
      width: 90%;
    }
    top: 20%;
  }
`;
const ModalBody = styled.div`
  margin: 0;
  &&& .MuiAccordion-root,
  &&& .MuiAccordionSummary-root {
    border: none;
    cursor: text;
  }
`;

const UpdateNote = ({ setVersion, latestVersion, $unread }) => {
  const { pageString } = useLanguage();

  const [open, setOpen] = useState(false);

  const handleModal = (boolean) => () => {
    setOpen(boolean);

    if (boolean && $unread) {
      setVersion(latestVersion);
    }
  };

  return (
    <>
      <NoteButton
        onClick={handleModal(true)}
        tooltipText={pageString.index.noteButtonTooltip}
        $unread={$unread}
      >
        {NoteIcon}
      </NoteButton>
      <UpdateModal open={open} onClose={handleModal(false)} />
    </>
  );
};

const unreadAnimation = keyframes`
    0%, 67%, 80%, 96%, 100% {
        transform: scale(1,1) translate(0,0);
    }
    72% {
        transform: scale(1.1,.9) translate(0,5%);
    }
    76%, 92% {
        transform: scale(1.2,.8) translate(0,15%);
    }
    84% {
        transform: scale(.9,1.2) translate(0,-100%);
    }
    88% {
        transform: scale(.9,1.2) translate(0,-20%);
    }
`;
const NoteButton = styled(IconButton)`
  position: relative;
  && {
    padding: 0;
  }
  svg {
    width: 1.2rem;
    height: 1.2rem;
    fill: ${(props) => props.theme.colors.onSurface};
  }
  &:after {
    position: absolute;
    content: "";
    right: -0.3rem;
    top: -0.3rem;
    background-color: red;
    border-radius: 100%;
    animation: ${unreadAnimation} 1.5s ease-in-out infinite;
    ${(props) => (props.$unread ? "width: .6rem; height: .6rem;" : "")}
  }
`;

const Home = () => {
  const { pageString } = useLanguage();
  const latestMsg = pageString.index.updateLog.content[0];

  const [expanded, setExpanded] = useState(0);
  const [localVersion, setVersion] = useLocalStorage("last-read-version");

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleExpand = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const clearDeferredPrompt = () => setDeferredPrompt(null);

  useEffect(() => {
    const promptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", promptHandler);

    return () =>
      window.removeEventListener("beforeinstallprompt", promptHandler);
  }, []);

  return (
    <HomeContainer>
      <Header>
        <span>{pageString.index.helmet.title}</span>
        <span>{latestMsg.version}</span>
        <UpdateNote
          setVersion={setVersion}
          latestVersion={latestMsg.version}
          $unread={localVersion !== latestMsg.version}
        />
      </Header>
      {[
        {
          header: pageString.index.about.header,
          body: <SiteDescriptions />,
        },
        {
          header: pageString.index.setting.header,
          body: (
            <SiteSetting
              deferredPrompt={deferredPrompt}
              clearDeferredPrompt={clearDeferredPrompt}
            />
          ),
        },
        {
          header: pageString.index.updateLog.header,
          body: <SiteUpdateLog />,
        },
        {
          header: pageString.index.license.header,
          body: <SiteLicense />,
        },
      ].map((item, ind) => (
        <DescriptionAccordion
          expanded={expanded === ind}
          onChange={handleExpand(ind)}
          expandIcon={ExpandMoreIcon}
          title={item.header}
          content={item.body}
          key={ind}
        />
      ))}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &&& > div {
    margin-bottom: 2rem;
  }
`;
const Header = styled.div`
  width: 90%;
  max-width: 1000px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: x-large;
  font-weight: bold;
  color: ${(props) => props.theme.colors.onSurface};
  > span:nth-child(2) {
    margin: 0.4rem;
    font-size: large;
  }
`;
const DescriptionAccordion = styled(Accordion)`
  && {
    width: 90%;
    max-width: 1000px;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 0.25rem;
    & {
      box-shadow: 0 0 0.15em lightgray;
    }
    > .MuiAccordionSummary-root {
      font-size: large;
      padding: 0.75rem 1.25rem;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom: 0px solid ${(props) => props.theme.colors.border};
    }
    > .MuiAccordionSummary-root.Mui-expanded {
      border-bottom: 1px solid ${(props) => props.theme.colors.border};
    }
    .MuiAccordionDetails-root {
      margin: 1rem;
      padding: 0;
    }
  }
`;

export default Home;
