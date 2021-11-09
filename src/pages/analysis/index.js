import React, { useCallback, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Button, Grid } from "@material-ui/core";
import useCharacterSelect from "hooks/useCharacterSelect";
import { useLineupData } from "containers/LineupDataProvider";
import { useLanguage } from "containers/LanguageProvider";
import ImageSupplier from "components/ImageSupplier";
import Input, { Select } from "components/Input";
import PotentialInput from "components/PotentialInput";
import Header from "components/Header";
import IconButton from "components/IconButton";
import { SaveIcon, LoadIcon, DeleteIcon } from "components/icon";
import Snackbar from "components/Snackbar";
import { ScrollableModal, TextModal } from "components/Modal";
import calcCharStats from "utils/calcCharStats";
import charByPositionData from "data/charByPosition";

const CharContainer = ({ index }) => {
  const { pageString, charString } = useLanguage();

  const { currentLineup, actions } = useLineupData();
  const { setCurrentLineup } = actions;

  const charState = currentLineup[index];

  const onSelect = useCallback(
    (newCharState) => {
      const newLineup = Array.from(currentLineup);

      newLineup[index] = {
        ...newCharState,
        ...calcCharStats(newCharState),
        owned: newCharState.level !== 0,
      };

      setCurrentLineup(newLineup);
    },
    [currentLineup[index], setCurrentLineup]
  );

  const { selectItems, setSelect, setCharState } = useCharacterSelect(
    charState,
    onSelect
  );

  useEffect(() => {
    setCharState(charState);
  }, [charState]);

  const handleBtnClick = useCallback(() => {
    const newLineup = Array.from(currentLineup);

    newLineup[index].owned = !newLineup[index].owned;

    setCurrentLineup(newLineup);
  }, [currentLineup[index], setCurrentLineup]);

  const handleSelectChange = useCallback(
    (key) => (event) => {
      setSelect(key, parseInt(event.target.value));
    },
    [setSelect]
  );

  const handleSubChange = useCallback(
    (index) => () => {
      setSelect("potentialSub", index);
    },
    [setSelect]
  );

  return (
    <StyledCharContainer item xs={10} sm={6} md={5} lg={4}>
      <CharImgWrapper
        onClick={handleBtnClick}
        $owned={charState.owned}
        disableRipple
        disableFocusRipple
      >
        <CharImg
          name={`char_small_${charState.id}`}
          alt={charString.name[charState.id]}
        />
      </CharImgWrapper>
      <SelectGrid container spacing={1}>
        <SelectWrapper item xs={6}>
          <LevelInput
            label={pageString.analysis.index.levelTitle}
            value={charState.level}
            onChange={handleSelectChange("level")}
            disabled={!charState.owned}
            variant="outlined"
            size="small"
            margin="dense"
          />
        </SelectWrapper>
        <SelectWrapper item xs={6}>
          <StyledSelect
            label={pageString.analysis.index.disciplineTitle}
            values={selectItems.discipline.values}
            value={charState.id[0] === "4" ? "-" : charState.discipline}
            onChange={handleSelectChange("discipline")}
            disabled={!charState.owned || charState.id[0] === "4"}
            margin="dense"
          />
        </SelectWrapper>
        <SelectWrapper item xs={6}>
          <StyledSelect
            label={pageString.analysis.index.starTitle}
            values={selectItems.star.values}
            value={charState.star}
            onChange={handleSelectChange("star")}
            disabled={!charState.owned}
            margin="dense"
          />
        </SelectWrapper>
        <SelectWrapper item xs={6}>
          <PotentialInput
            charId={charState.id}
            label={pageString.analysis.index.potentialTitle}
            values={selectItems.potential.values}
            mainValue={charState.potential}
            subValue={charState.potentialSub}
            onMainChange={handleSelectChange("potential")}
            onSubChange={handleSubChange}
            disabled={!charState.owned}
            margin="dense"
          />
        </SelectWrapper>
      </SelectGrid>
    </StyledCharContainer>
  );
};

const StyledCharContainer = styled(Grid)`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  margin-right: 2rem;
  && {
    max-width: 30rem;
  }
`;
const CharImgWrapper = styled(Button)`
  ${(props) => (props.$owned ? null : "filter: grayscale(100%);")}
  && {
    transition: filter 0.1s ease;
  }
`;
const CharImg = styled(ImageSupplier)`
  width: 7rem;
  height: 7rem;
`;
const LevelInput = styled(Input)`
  && {
    input {
      padding: 0.6rem 1rem;
    }
    color: ${(props) =>
      props.disabled ? props.theme.colors.dropdownHover : "inherit"};
  }
`;
const StyledSelect = styled(Select)`
  && {
    width: 100%;
    > div > div {
      padding: 0.6rem 1rem;
      padding-right: 2rem;
      color: ${(props) =>
        props.disabled ? props.theme.colors.dropdownHover : "inherit"};
    }
    svg {
      fill: ${(props) =>
        props.disabled
          ? props.theme.colors.dropdownHover
          : props.theme.colors.onSurface};
    }
  }
`;
const SelectGrid = styled(Grid)`
  align-content: center;
`;
const SelectWrapper = styled(Grid)`
  height: 40%;
`;

const DataManageButtons = ({ dispatch, handleData }) => {
  const { pageString } = useLanguage();

  return (
    <DataButtonContainer>
      <IconButton
        onClick={() => handleData("SAVE_DATA")}
        tooltipText={pageString.analysis.index.saveButton}
      >
        {SaveIcon}
      </IconButton>
      <IconButton
        onClick={() => dispatch({ type: "HANDLE_DATA_MODAL", open: true })}
        tooltipText={pageString.analysis.index.loadButton}
      >
        {LoadIcon}
      </IconButton>
    </DataButtonContainer>
  );
};

const DataButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: -4rem;
  margin-bottom: 0;
  > span:last-child button {
    margin: 0;
  }
`;

const ModalContent = ({ handleData }) => {
  const { pageString } = useLanguage();

  const { localLineups } = useLineupData();

  return (
    localLineups &&
    localLineups.map((d, ind) => (
      <Header
        title={d.date}
        end={
          <>
            <IconButton
              onClick={() => handleData("LOAD_DATA", ind)}
              tooltipText={pageString.analysis.index.loadButton}
            >
              {LoadIcon}
            </IconButton>
            <IconButton
              onClick={() => handleData("DELETE_DATA", ind)}
              tooltipText={pageString.analysis.index.deleteButton}
            >
              {DeleteIcon}
            </IconButton>
          </>
        }
        key={ind}
      />
    ))
  );
};

const positionImg = [
  "attacker",
  "defender",
  "healer",
  "obsructer",
  "supporter",
];

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_SUCCESS_SNACKBAR":
      return { ...state, isSuccessSnackbarOpen: action.open };
    case "HANDLE_ERROR_SNACKBAR":
      return { ...state, isErrorSnackbarOpen: action.open };
    case "HANDLE_DATA_MODAL":
      return { ...state, isDataModalOpen: action.open };
    case "HANDLE_HELP_MODAL":
      return { ...state, isHelpModalOpen: action.open };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const Index = () => {
  const { pageString, charString } = useLanguage();

  const { currentLineup, actions } = useLineupData();
  const { pushLineup, getLineup, deleteLineup, setCurrentLineup } = actions;

  const [state, dispatch] = useReducer(reducer, {
    isDataModalOpen: false,
    isHelpModalOpen: false,
    isSuccessSnackbarOpen: false,
    isErrorSnackbarOpen: false,
  });

  const handleData = useCallback(
    (type, dataIndex) => {
      switch (type) {
        case "SAVE_DATA":
          if (pushLineup(currentLineup, { firebase: true })) {
            dispatch({ type: "HANDLE_SUCCESS_SNACKBAR", open: true });
            return;
          }
          break;
        case "LOAD_DATA":
          const loadedData = getLineup(dataIndex);

          if (loadedData) {
            setCurrentLineup(loadedData);

            dispatch({ type: "HANDLE_SUCCESS_SNACKBAR", open: true });
            dispatch({ type: "HANDLE_DATA_MODAL", open: false });
            return;
          }
          break;
        case "DELETE_DATA":
          if (deleteLineup(dataIndex)) {
            dispatch({ type: "HANDLE_SUCCESS_SNACKBAR", open: true });
            return;
          }
          return;
        default:
          throw new Error(`Unknown action type: ${type}`);
      }

      dispatch({ type: "HANDLE_ERROR_SNACKBAR", open: true });
    },
    [currentLineup, setCurrentLineup, getLineup, pushLineup, deleteLineup]
  );

  return (
    <CharGroupsContainer>
      <DataManageButtons dispatch={dispatch} handleData={handleData} />
      {charByPositionData.map((group, ind) => (
        <React.Fragment key={ind}>
          <Header
            title={charString.tags[ind + 5]}
            titleIcon={
              <PositionImgWrapper name={`ui_${positionImg[ind]}`} alt="" />
            }
            withHelp={ind === 0}
            onClickHelp={() =>
              dispatch({ type: "HANDLE_HELP_MODAL", open: true })
            }
            border
          />
          <Grid container spacing={2}>
            {group.map((c) => (
              <CharContainer index={c.ind} key={c.id} />
            ))}
          </Grid>
        </React.Fragment>
      ))}
      <Snackbar
        open={state.isSuccessSnackbarOpen}
        onClose={() =>
          dispatch({ type: "HANDLE_SUCCESS_SNACKBAR", open: false })
        }
        message={pageString.analysis.index.successMsg}
        type="success"
      />
      <Snackbar
        open={state.isErrorSnackbarOpen}
        onClose={() => dispatch({ type: "HANDLE_ERROR_SNACKBAR", open: false })}
        message={pageString.analysis.index.errorMsg}
        type="error"
      />
      <ScrollableModal
        title={pageString.analysis.index.modalTitle}
        open={state.isDataModalOpen}
        onClose={() => dispatch({ type: "HANDLE_DATA_MODAL", open: false })}
        ariaLabelledby="data-operation-modal-title"
        ariaDescribedby="data-operation-modal-description"
      >
        <ModalContent handleData={handleData} />
      </ScrollableModal>
      <TextModal
        title={pageString.analysis.index.helpModal.title}
        content={pageString.analysis.index.helpModal.content}
        open={state.isHelpModalOpen}
        onClose={() => dispatch({ type: "HANDLE_HELP_MODAL", open: false })}
        ariaLabelledby="help-modal-title"
        ariaDescribedby="help-modal-description"
      />
    </CharGroupsContainer>
  );
};

const CharGroupsContainer = styled.div`
  width: 100%;
  > div:nth-child(even) > div > span {
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;
  }
  > div:nth-child(2) > div {
    width: 100%;
    justify-content: space-between;
  }
`;
const PositionImgWrapper = styled(ImageSupplier)`
  width: 2rem;
  margin-right: 0.2rem;
`;

export default Index;
