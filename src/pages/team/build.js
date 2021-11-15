import React, { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { Button, CircularProgress, Divider } from "@material-ui/core";
import useTeamSlots from "hooks/useTeamSlots";
import useExport from "hooks/useExport";
import { useTeamData } from "containers/TeamDataProvider";
import { useLanguage } from "containers/LanguageProvider";
import Swappable from "containers/Swappable";
import IconButton, { ExportButton } from "components/IconButton";
import Header from "components/Header";
import { ScrollableModal } from "components/Modal";
import DropDown from "components/DropDown";
import Snackbar from "components/Snackbar";
import Input from "components/Input";
import StageSelect from "components/StageSelect";
import CharSlot from "components/CharSlot";
import CharCard from "components/CharCard";
import ImageSupplier from "components/ImageSupplier";
import { CopyIcon, LoadIcon, ShareIcon } from "components/icon";
import handlePromise from "utils/handlePromise";
import charData from "data/character.json";

const charByRarityData = charData.reduce(
  (newData, c) => {
    newData[3 - c.rarity].push({ id: c.id });
    return newData;
  },
  [...Array(4)].map((i) => [])
);

const rarity = ["ssr", "sr", "r", "n"];

const CharSelectModal = ({ open, onClose, handleSelect }) => {
  const { pageString } = useLanguage();

  return (
    <StyledModal
      title={pageString.team.build.selectModalTitle}
      open={open}
      onClose={onClose}
      keepMounted
      ariaLabelledby="character-select-modal"
    >
      {charByRarityData.map((group, ind) => (
        <React.Fragment key={ind}>
          <RarityHeader
            titleIcon={
              <RarityImgWrapper
                name={`ui_rarity_${rarity[ind]}`}
                alt={rarity[ind]}
              />
            }
            border
          />
          <RarityChars>
            {group.map((c) => (
              <CharButton onClick={handleSelect(c.id)} key={c.id}>
                <ModalCharCard id={c.id} />
              </CharButton>
            ))}
          </RarityChars>
        </React.Fragment>
      ))}
    </StyledModal>
  );
};

const StyledModal = styled(ScrollableModal)`
  > div:nth-child(3) {
    top: 5%;
    width: 90%;
  }
`;
const RarityHeader = styled(Header)`
  margin-bottom: 0.4rem;
  span {
    display: flex;
    align-items: center;
  }
`;
const RarityImgWrapper = styled(ImageSupplier)`
  width: 3rem;
`;
const RarityChars = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.4rem 0 -1rem;
`;
const CharButton = styled(Button)`
  && {
    padding: 0;
    .MuiButton-label {
      color: ${(props) => props.theme.colors.onSurface};
    }
  }
`;
const ModalCharCard = styled(CharCard)`
  min-width: 0;
  width: 8.8rem;
  margin: 0.2rem;
`;

const charsListReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL_AND_SELECT":
      return {
        ...state,
        didModalMounted: true,
        isSelectModalOpen: true,
        slotIndex: action.slotIndex,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isSelectModalOpen: false,
        slotIndex: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const DraggableCharsList = () => {
  const { didLoad, actions } = useTeamData();
  const { setCurrentTeam } = actions;

  const [currentTeam, setTeamSlots] = useTeamSlots();

  const [state, dispatch] = useReducer(charsListReducer, {
    didModalMounted: false,
    isSelectModalOpen: false,
    slotIndex: null,
  });

  const handleCharSelect =
    (charId, index = null) =>
    () => {
      setTeamSlots(charId, index === null ? state.slotIndex : index);
      dispatch({ type: "CLOSE_MODAL" });
    };

  return (
    <>
      {didLoad && (
        <Swappable
          items={currentTeam.characters}
          renderItem={(character, index, provided, isDragging) => (
            <CharSlot
              char={character}
              index={index}
              provided={provided}
              isDragging={isDragging}
              ref={provided.innerRef}
              handleSelectModalOpen={() =>
                dispatch({ type: "OPEN_MODAL_AND_SELECT", slotIndex: index })
              }
              handleCharDelete={handleCharSelect(null, index)}
            />
          )}
          onUpdate={(newCharacters) =>
            setCurrentTeam({
              ...currentTeam,
              characters: newCharacters,
            })
          }
          droppableId="character-list"
        />
      )}
      {state.didModalMounted && (
        <CharSelectModal
          open={state.isSelectModalOpen}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          handleSelect={handleCharSelect}
        />
      )}
    </>
  );
};

const UploadModal = ({ open, onClose, isUploading, handleUpload }) => {
  const { pageString } = useLanguage();

  const [state, setState] = useState({
    chapter: "",
    stage: "",
    author: "",
    description: "",
    isStageValid: false,
    isAuthorValid: false,
    isDescriptionValid: true,
  });

  const handleChange = (key) => (event) => {
    let newState;
    if (key === "stage") {
      const arr = event.target.value.split("/");
      newState = {
        ...state,
        chapter: arr[0],
        stage: arr[1],
      };
    } else {
      newState = {
        ...state,
        [key]: event.target.value,
      };
    }

    setState({
      ...newState,
      isStageValid: newState.stage !== "",
      isAuthorValid: newState.author.length > 0 && newState.author.length < 51,
      isDescriptionValid: newState.description.length <= 400,
    });
  };

  return (
    <StyledModal
      title={pageString.team.build.uploadTooltip}
      open={open}
      onClose={onClose}
      ariaLabelledby="upload-modal-title"
      ariaDescribedby="upload-modal-description"
    >
      <StageSelect
        value={state.chapter === "" ? "" : state.chapter + "/" + state.stage}
        error={!state.isStageValid}
        handleChange={handleChange("stage")}
      />
      <StyledInput
        id="author-input"
        value={state.author}
        onChange={handleChange("author")}
        label={pageString.team.build.authorInputLabel}
        placeholder={pageString.team.build.authorInputPlaceholder}
        variant="outlined"
        size="small"
        inputProps={{ "aria-label": "author-description" }}
        error={!state.isAuthorValid}
        helperText={
          !state.isAuthorValid && pageString.team.build.authorInputHelpText
        }
      />
      <StyledInput
        id="team-description-input"
        value={state.description}
        onChange={handleChange("description")}
        label={pageString.team.build.descriptionInputLabel}
        placeholder={pageString.team.build.descriptionInputPlaceholder}
        variant="outlined"
        size="small"
        multiline
        rows={3}
        inputProps={{ "aria-label": "team-description" }}
        error={!state.isDescriptionValid}
        helperText={
          !state.isDescriptionValid &&
          pageString.team.build.descriptionInputHelpText
        }
      />
      <MessageBox>
        {pageString.team.build.uploadMsg.map((msg, ind) => (
          <li key={ind}>{msg}</li>
        ))}
      </MessageBox>
      <ButtonBox>
        <StyledButton
          $isValid={
            state.isStageValid &&
            state.isAuthorValid &&
            state.isDescriptionValid
          }
          onClick={
            state.isStageValid &&
            state.isAuthorValid &&
            state.isDescriptionValid
              ? handleUpload({
                  chapter: state.chapter,
                  stage: state.stage,
                  author: state.author,
                  description: state.description,
                })
              : null
          }
        >
          {isUploading ? (
            <StyledSpinner size={24} thickness={6} disableShrink />
          ) : (
            pageString.team.build.uploadButton
          )}
        </StyledButton>
        <StyledButton onClick={onClose}>
          {pageString.team.build.cancelButton}
        </StyledButton>
      </ButtonBox>
    </StyledModal>
  );
};

const StyledInput = styled(Input)`
  && {
    margin: 0.4rem 0;
    width: 100%;
    svg {
      fill: ${(props) => props.theme.colors.onSurface};
    }
  }
  textarea {
    font-size: small;
  }
`;
const MessageBox = styled.ul`
  margin: 0;
  padding: 0.5rem 0 0 1rem;
  color: ${(props) => props.theme.colors.onSurface};
  font-size: small;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  && > button:last-child {
    margin-right: 0;
    background-color: ${(props) => props.theme.colors.dropdownHover};
  }
`;
const StyledButton = styled(Button)`
  &&& {
    margin: 0.5rem 0.5rem 0 0.5rem;
    background-color: ${(props) =>
      props.theme.colors.success + (props.$isValid ? "" : "80")};
    color: #fff;
  }
  &:hover {
    box-shadow: inset 0 0 20rem #fff1;
  }
`;
const StyledSpinner = styled(CircularProgress)`
  && {
    display: block;
    margin: auto;
    color: #fff;
  }
`;

const headerReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };
    case "START_UPLOAD":
      return { ...state, isUploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        isModalOpen: false,
        isUploading: false,
        isUploadSnackbarOpen: true,
      };
    case "UPLOAD_FAIL":
      return { ...state, isUploading: false, isUploadSnackbarOpen: true };
    case "COPY_LINK":
      navigator.clipboard.writeText(state.shareLink);
      return { ...state, isCopySnackbarOpen: true };
    case "SET_LINK":
      return { ...state, shareLink: action.link };
    case "HANDLE_MODAL":
      return { ...state, isModalOpen: action.open };
    case "HANDLE_ERROR_SNACKBAR":
      return { ...state, isErrorSnackbarOpen: action.open };
    case "CLOSE_COPY_SNACKBAR":
      return { ...state, isCopySnackbarOpen: false };
    case "CLOSE_UPLOAD_SNACKBAR":
      return { ...state, isUploadSnackbarOpen: false };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

const TeamHeader = ({ isExporting, handleExport }) => {
  const { pageString } = useLanguage();

  const { currentTeam, actions } = useTeamData();
  const { setCurrentTeam } = actions;

  const [state, dispatch] = useReducer(headerReducer, {
    shareLink: "loading...",
    isUploading: false,
    isModalOpen: false,
    isCopySnackbarOpen: false,
    isUploadSnackbarOpen: false,
    isErrorSnackbarOpen: false,
  });

  const firebaseRef = useRef();

  const handleNameChange = ({ target }) => {
    // shallow copy is okay since we don't mute deep properties
    setCurrentTeam({
      ...currentTeam,
      name: target.value,
    });
  };

  const handleShare = async () => {
    if (!firebaseRef?.current) {
      firebaseRef.current = await import("../../utils/firebase");
    }

    const url = new URL(window.location.href);
    url.searchParams.set("team", JSON.stringify(currentTeam));

    const [shortLink, err] = await handlePromise(
      firebaseRef.current.getShortLink(url.href)
    );

    if (shortLink) {
      dispatch({ type: "SET_LINK", link: shortLink });
    } else {
      dispatch({ type: "HANDLE_ERROR_SNACKBAR", open: true });
    }
  };

  const handleUpload = (input) => async () => {
    if (state.isUploading) return;

    dispatch({ type: "START_UPLOAD" });

    if (!firebaseRef?.current) {
      firebaseRef.current = await import("../../utils/firebase");
    }

    let uploadTeam = JSON.parse(JSON.stringify(currentTeam));
    let maxLv = 60;
    // set character level to upper bound if it exceeds
    if (input.chapter === "S") {
      maxLv = parseInt(input.stage.slice(2)) + 19;
    }
    if (input.chapter === "E" && input.stage.slice(0, 2) === "Ex") {
      maxLv = parseInt(input.stage.slice(-1)) * 10 + 20;
    }
    uploadTeam.characters.forEach((c) => {
      if (!isNaN(parseInt(c.level)) && parseInt(c.level) > maxLv) {
        c.level = maxLv;
      }
    });

    const [_, err] = await handlePromise(
      firebaseRef.current.teamCollection.add({
        ...input,
        ...uploadTeam,
        time: firebaseRef.current.Timestamp.now(),
      })
    );

    if (!err) {
      dispatch({ type: "UPLOAD_SUCCESS" });
    } else {
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };

  return (
    <>
      <StyledHeader
        title={
          <div>
            <Input
              id="team-name-input"
              value={currentTeam ? currentTeam.name : ""}
              onChange={handleNameChange}
              label={
                <span data-html2canvas-ignore="true">
                  {pageString.team.build.nameInputLabel}
                </span>
              }
              placeholder={pageString.team.build.nameInputPlaceholder}
              variant="outlined"
              size="small"
              inputProps={{ "aria-label": "team-name" }}
            />
          </div>
        }
        end={
          <>
            <IconButton
              onClick={() => dispatch({ type: "HANDLE_MODAL", open: true })}
              tooltipText={pageString.team.build.uploadTooltip}
              dataHtml2canvasIgnore
            >
              {LoadIcon}
            </IconButton>
            <DropDown
              button={
                <IconButton
                  tooltipText={pageString.team.build.shareTooltip}
                  dataHtml2canvasIgnore
                >
                  {ShareIcon}
                </IconButton>
              }
              buttonOnClick={handleShare}
              items={[{ id: "share-button" }]}
              renderItem={() => (
                <>
                  <StyledA
                    href={state.shareLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {state.shareLink}
                  </StyledA>
                  <IconButton
                    onClick={() => dispatch({ type: "COPY_LINK" })}
                    tooltipText={pageString.team.build.copyTooltip}
                  >
                    {CopyIcon}
                  </IconButton>
                </>
              )}
              disableItemButton
              ariaId="share-menu"
            />
            <ExportButton onClick={handleExport} isLoading={isExporting} />
          </>
        }
      />
      <UploadModal
        open={state.isModalOpen}
        onClose={() => dispatch({ type: "HANDLE_MODAL", open: false })}
        isUploading={state.isUploading}
        handleUpload={handleUpload}
      />
      <Snackbar
        open={state.isCopySnackbarOpen}
        onClose={() => dispatch({ type: "CLOSE_COPY_SNACKBAR" })}
        message={pageString.team.build.copySnackbarMsg}
        type="success"
      />
      <Snackbar
        open={state.isUploadSnackbarOpen}
        onClose={() => dispatch({ type: "CLOSE_UPLOAD_SNACKBAR" })}
        message={pageString.team.build.uploadSnackbarMsg}
        type="success"
      />
      <Snackbar
        open={state.isErrorSnackbarOpen}
        onClose={() => dispatch({ type: "HANDLE_ERROR_SNACKBAR", open: false })}
        message={pageString.team.build.unknownError}
        type="error"
      />
    </>
  );
};

const StyledHeader = styled(Header)`
  position: relative;
  left: -1rem;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0 0 0 1rem;
  border: none;
  label {
    margin-right: 0.6rem;
    font-size: large;
    text-transform: none;
  }
  > div:first-child {
    max-width: 50%;
  }
  > div:last-child {
    position: relative;
    display: flex;
    bottom: -0.2rem;
    right: -1rem;
  }
`;
const StyledA = styled.a`
  margin-right: 0.4rem;
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.linkHover};
  }
`;

const TeamBuild = () => {
  const { pageString } = useLanguage();

  const { currentTeam } = useTeamData();

  const componentRef = useRef();

  const { isExporting, exportImage } = useExport();

  const handleExport = () =>
    exportImage({
      componentRef: componentRef,
      fileName: currentTeam.name ? currentTeam.name : "team-composition",
    });

  return (
    <ExportWrapper ref={componentRef}>
      <TeamHeader isExporting={isExporting} handleExport={handleExport} />
      <StyledDivider />
      <DraggableCharsList />
    </ExportWrapper>
  );
};

const ExportWrapper = styled.div`
  max-width: 1000px;
  margin: -1.5rem calc(50% - 500px - 1rem);
  padding: 1rem;
  padding-top: 1.5rem;
  @media screen and (max-width: 1064px) {
    margin: -1.5rem -0.8rem 0 -0.8rem;
  }
`;
const StyledDivider = styled(Divider)`
  && {
    margin: 0.5rem 0;
    background-color: ${(props) => props.theme.colors.dropdownHover};
  }
`;

export default TeamBuild;
