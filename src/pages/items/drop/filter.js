import React, { useState } from "react";
import styled from "styled-components";
import {
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from "@material-ui/core";
import Panels from "containers/Panels";
import { useLanguage } from "containers/LanguageProvider";
import ResultTablePanel from "components/ResultTablePanel";
import { SortableTh } from "components/SortableTable";
import Header from "components/Header";
import { HeaderIconButton } from "components/IconButton";
import ToggleButtonGroup, { ToggleButton } from "components/ToggleButtonGroup";
import ImageSupplier from "components/ImageSupplier";
import { TextModal } from "components/Modal";
import { DeleteIcon } from "components/icon";
import itemDropData from "data/byStageToItem";
import stageDropData from "data/stageDrop.json";

const ItemFilterPanel = ({ filterBtnValue, filterBy, clearBtnValue }) => {
  const { userLanguage, pageString, itemString } = useLanguage();

  return (
    <>
      <Header
        title={pageString.items.drop.filter.itemPanelTitle}
        end={
          <HeaderIconButton
            onClick={clearBtnValue}
            tooltipText={pageString.items.drop.filter.deleteTooltip}
          >
            {DeleteIcon}
          </HeaderIconButton>
        }
        border
      />
      <ToggleButtonGroup
        value={filterBtnValue}
        onChange={filterBy}
        $lang={userLanguage}
        $type="ITEM_DROPS_FILTER"
      >
        {Object.entries(itemDropData).map(([id, data], ind) => {
          if (data.drop.length === 0) return null;

          return (
            <StyledToggleButton value={id} key={ind}>
              <ItemImg name={`item_${id}`} alt="" />
              {itemString.name[id]}
            </StyledToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </>
  );
};

const StyledToggleButton = styled(ToggleButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
`;
const ItemImg = styled(ImageSupplier)`
  width: 2.26rem;
  height: 2.26rem;
`;

const ItemTh = ({ requestSort, getSortDirection, data }) => {
  const { pageString, itemString } = useLanguage();

  if (data.length === 0) {
    return <SortableTh>{pageString.items.drop.filter.tableHead[1]}</SortableTh>;
  }

  return Object.keys(data[0]).map((type, ind) => {
    if (type === "stage" || type === "energy") {
      return null;
    }

    return (
      <ImgTh
        key={type}
        onClick={() => requestSort(type)}
        direction={getSortDirection(type)}
      >
        <TableImg name={`item_${type}`} alt={itemString.name[type]} />
      </ImgTh>
    );
  });
};

const ImgTh = styled(SortableTh)`
  &:after {
    position: absolute;
    top: calc(50% - 0.75rem);
    margin-left: 2rem;
  }
`;
const TableImg = styled(ImageSupplier)`
  width: 1.8rem;
  height: 1.8rem;
`;

const TableHead = ({ requestSort, getSortDirection, sortedData }) => {
  const { pageString } = useLanguage();

  return (
    <MuiTableHead>
      <MuiTableRow>
        <SortableTh
          onClick={() => requestSort("stage")}
          direction={getSortDirection("stage")}
        >
          {pageString.items.drop.filter.tableHead[0]}
        </SortableTh>
        <ItemTh
          requestSort={requestSort}
          getSortDirection={getSortDirection}
          data={sortedData}
        />
        <ImgTh
          onClick={() => requestSort("energy")}
          direction={getSortDirection("energy")}
        >
          <TableImg
            name="energy"
            alt={pageString.items.drop.filter.tableHead[2]}
          />
        </ImgTh>
      </MuiTableRow>
    </MuiTableHead>
  );
};

const TableBody = ({ sortedData }) => {
  const { itemString } = useLanguage();

  return (
    <MuiTableBody>
      {sortedData.map((stage, ind) => {
        return (
          <MuiTableRow hover key={stage.stage}>
            <MuiTableCell>{stage.stage}</MuiTableCell>
            {Object.entries(stage).map(([type, value], ind) => {
              if (type === "stage" || type === "energy") {
                return null;
              }

              return (
                <MuiTableCell key={ind}>
                  {itemString.rarity[value]}
                </MuiTableCell>
              );
            })}
            <MuiTableCell>{stage.energy}</MuiTableCell>
          </MuiTableRow>
        );
      })}
    </MuiTableBody>
  );
};

const HelpModal = ({ open, onClose }) => {
  const { pageString } = useLanguage();

  return (
    <TextModal
      title={pageString.items.drop.filter.helpModal.title}
      open={open}
      onClose={onClose}
      content={pageString.items.drop.filter.helpModal.content}
      ariaLabelledby="help-modal-title"
      ariaDescribedby="help-modal-description"
    />
  );
};

const toStageKey = (stage) => {
  const splits = stage.split("-");

  return (
    parseInt(splits[0]) * 1000 +
    parseInt(splits[1].split(" ")[0]) * 10 +
    (splits[1].includes("free") ? 1 : 0) +
    (splits.length > 2 ? parseInt(splits[2]) : 0)
  );
};

const sortFunc = (sortableItems, sortConfig) => {
  sortableItems.sort((a, b) => {
    let aKey;
    let bKey;
    if (sortConfig.key === "stage") {
      aKey = toStageKey(a.stage);
      bKey = toStageKey(b.stage);
    } else {
      aKey = a[sortConfig.key];
      bKey = b[sortConfig.key];
    }
    if (aKey < bKey) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aKey > bKey) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};

const Filter = () => {
  const [state, setState] = useState({
    filterBtnValue: [],
    data: [],
  });

  const filterBy = (event, val) => {
    if (val.length === 0) {
      setState((state) => ({
        ...state,
        filterBtnValue: val,
        data: [],
      }));
      return;
    }

    const stageDrop = [].concat(
      ...stageDropData.map((chapter) =>
        chapter.stages.map((stage) => {
          const { materials, trainItems, expPotions, ...rest } = stage;
          return {
            ...rest,
            drops: materials.concat(trainItems, expPotions),
            chapter: chapter.chapter,
          };
        })
      )
    );

    let filteredStages = stageDrop.filter((stage) =>
      val.every((queryItem) => {
        let flag = false;
        stage.drops.forEach((drop) => {
          if (drop.id === queryItem) {
            flag = true;
            return false;
          }
        });
        return flag;
      })
    );

    filteredStages = filteredStages.map((stage) => {
      const parsedStage = `${stage.chapter}-${stage.stage}`;
      const newStage = { stage: parsedStage, energy: stage.energy };
      stage.drops.forEach((item) => {
        if (val.includes(item.id)) {
          newStage[item.id] = item.rarity;
        }
      });
      return newStage;
    });

    setState((state) => ({
      ...state,
      filterBtnValue: val,
      data: filteredStages,
    }));
  };

  return (
    <>
      <Panels panelsWidth={["62%", "38%"]}>
        <ItemFilterPanel
          filterBtnValue={state.filterBtnValue}
          filterBy={filterBy}
          clearBtnValue={(e) => filterBy(e, [])}
        />
        <ResultTablePanel
          data={state.data}
          head={<TableHead />}
          body={<TableBody />}
          sortFunc={sortFunc}
          defaultSortKey={state.filterBtnValue[0]}
          maxHeight="calc(100vh - 16rem)"
          striped
          helpModal={<HelpModal />}
        />
      </Panels>
    </>
  );
};

export default Filter;
