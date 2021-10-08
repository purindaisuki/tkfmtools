import React, { useState } from "react";
import styled from "styled-components";
import {
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from "@material-ui/core";
import Scrollable from "containers/Scrollable";
import { useLanguage } from "containers/LanguageProvider";
import IconButton from "components/IconButton";
import SortableTable, { SortableTh } from "components/SortableTable";
import { ItemCard } from "components/Card";
import { StyledChip as Chip } from "components/Chip";
import { ScrollableModal } from "components/Modal";
import Header from "components/Header";
import ToggleButtonGroup, { ToggleButton } from "components/ToggleButtonGroup";
import { SettingIcon } from "components/icon";
import stageDropData from "data/stageDrop.json";
import itemData from "data/item.json";

const TableHead = ({
  column,
  columnHasMounted,
  requestSort,
  getSortDirection,
}) => {
  const { pageString } = useLanguage();

  return (
    <MuiTableHead>
      <StyledTableHeadRow>
        {Object.entries(pageString.items.drop.index.tableHead).map(
          ([key, string], ind) => {
            const sortable = key === "stage" || key === "energy";

            return (
              (ind === 0 || columnHasMounted[ind - 1]) && (
                <StyledTh
                  onClick={sortable ? () => requestSort(key) : undefined}
                  direction={sortable ? getSortDirection(key) : undefined}
                  key={string}
                  $sortable={sortable}
                  $hidden={ind !== 0 && !column.includes(ind - 1)}
                >
                  {string}
                </StyledTh>
              )
            );
          }
        )}
      </StyledTableHeadRow>
    </MuiTableHead>
  );
};

const StyledTh = styled(SortableTh)`
  && {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.onSecondary};
    ${(props) => (props.$hidden ? "display: none;" : "")}
  }
  white-space: nowrap;
  ${(props) => (props.$sortable ? "" : "cursor: default;")}
`;
const StyledTableRow = styled(MuiTableRow)`
  && {
    ${(props) => (props.$hidden ? "display: none;" : "")}
  }
`;
const StyledTableHeadRow = styled(StyledTableRow)`
  && {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.onSecondary};
  }
`;

const ItemTd = ({ items, rarity, rank, hidden }) => {
  const { itemString } = useLanguage();

  return (
    <StyledTableCell $hidden={hidden}>
      <ItemsContainer>
        {items.length !== 0 &&
          items.map((item) => (
            <ItemWrapper
              key={item.id}
              $hidden={
                !rarity.includes(item.rarity) ||
                (itemData[item.id].category === 0 &&
                  !rank.includes(itemData[item.id].rank))
              }
            >
              <ItemCard id={item.id} />
              <StyledChip
                $rarity={item.rarity}
                label={itemString.rarity[item.rarity]}
              />
            </ItemWrapper>
          ))}
      </ItemsContainer>
    </StyledTableCell>
  );
};

const StyledTableCell = styled(MuiTableCell)`
  && {
    ${(props) => (props.$hidden ? "display: none;" : "")}
  }
`;
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  > div:last-child {
    margin: 0;
  }
`;
const ItemWrapper = styled.div`
  display: ${(props) => (props.$hidden ? "none" : "flex")};
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  margin-right: 0.8rem;
  div {
    flex-wrap: nowrap;
    font-size: 1rem;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
`;
const StyledChip = styled(Chip)`
  && {
    background-color: ${(props) =>
      props.$rarity === 0
        ? "lightgray"
        : props.$rarity === 1
        ? "#90CAF9"
        : props.$rarity === 2
        ? "#A5D6A7"
        : "#FFAB91"};
    color: black;
  }
  margin-left: 0.4rem;
`;

const TableBody = ({ column, rarity, rank, columnHasMounted, sortedData }) => (
  <MuiTableBody>
    {sortedData.map((s) => {
      const { chapter, stage, energy, ...rest } = s;

      return (
        <StyledTableRow
          key={`${chapter}-${stage}`}
          $hidden={Object.values(rest)
            .filter((v, i) => column.includes(i))
            .every(
              (v) =>
                !v.some(
                  (i) =>
                    rarity.includes(i.rarity) &&
                    (itemData[i.id].category !== 0 ||
                      rank.includes(itemData[i.id].rank))
                )
            )}
        >
          <MuiTableCell>{`${chapter}-${stage}`}</MuiTableCell>
          {Object.values(rest).map(
            (v, ind) =>
              columnHasMounted[ind] && (
                <ItemTd
                  items={v}
                  rarity={rarity}
                  rank={rank}
                  hidden={!column.includes(ind)}
                  key={ind}
                />
              )
          )}
          <StyledTableCell $hidden={!column.includes(3)}>
            {columnHasMounted[3] && energy}
          </StyledTableCell>
        </StyledTableRow>
      );
    })}
  </MuiTableBody>
);

const btnLayoutConfig = {
  en: { 0: 2, 990: 4 },
  "zh-TW": { 0: 4 },
  ja: { 0: 4 },
  ko: { 0: 4 },
};

const ButtonGroupContainer = ({
  filterBtnValue,
  filterBy,
  groupValues,
  strings,
}) => {
  const { userLanguage } = useLanguage();

  return (
    <StyledContainer>
      <StyledHeader title={strings.title} border />
      <ToggleButtonGroup
        value={filterBtnValue}
        onChange={filterBy}
        layoutConfig={btnLayoutConfig[userLanguage]}
      >
        {groupValues.map((v, ind) => (
          <StyledToggleButton value={v} key={ind}>
            {strings.button[ind]}
          </StyledToggleButton>
        ))}
      </ToggleButtonGroup>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 0.2rem;
`;
const StyledHeader = styled(Header)`
  margin-top: 1rem;
`;
const StyledToggleButton = styled(ToggleButton)`
  &&& {
    padding: 0.25rem 0.15rem;
  }
`;

const SettingModal = ({ isModalOpen, onClose, filterBy, ...props }) => {
  const { pageString } = useLanguage();

  return (
    <StyledModal
      title={pageString.items.drop.index.settingModal.title}
      open={isModalOpen}
      onClose={onClose}
      ariaLabelledby="setting-modal-title"
    >
      {Object.entries(BtnGroupsValues).map(([key, values], ind) => (
        <ButtonGroupContainer
          groupValues={values}
          filterBtnValue={props[key]}
          filterBy={filterBy(key)}
          strings={pageString.items.drop.index.settingModal.content[ind]}
          key={ind}
        />
      ))}
    </StyledModal>
  );
};

const StyledModal = styled(ScrollableModal)`
  > div:nth-child(3) {
    top: 20%;
    width: 30%;
    @media screen and (max-width: 1300px) {
      width: 40%;
    }
    @media screen and (max-width: 992px) {
      width: 60%;
    }
    @media screen and (max-width: 768px) {
      width: 90%;
    }
    > div:last-child > div:first-child > div {
      margin-top: 0;
    }
  }
`;

const toStageKey = (key) => {
  return (
    parseInt(key.chapter) * 1000 +
    parseInt(key.stage.split(" ")[0]) * 10 +
    (key.stage.includes("free") ? 1 : 0) +
    (key.stage.includes("-") ? parseInt(key.stage.split("-")[1]) : 0)
  );
};

const sortFunc = (sortableItems, sortConfig) => {
  sortableItems.sort((a, b) => {
    let aKey;
    let bKey;
    if (sortConfig.key === "stage") {
      aKey = toStageKey(a);
      bKey = toStageKey(b);
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

const BtnGroupsValues = {
  column: [0, 1, 2, 3],
  rank: [1, 2, 3, 4],
  rarity: [0, 1, 2, 3],
};

const stageDrop = [].concat(
  ...stageDropData.map((chapter) =>
    chapter.stages.map((stage) => ({
      chapter: chapter.chapter,
      ...stage,
    }))
  )
);

const Index = () => {
  const { pageString } = useLanguage();

  const [state, setState] = useState({
    ...BtnGroupsValues,
    column:
      typeof window !== "undefined" && window.innerWidth < 600
        ? [0]
        : BtnGroupsValues.column,
    isModalOpen: false,
    columnHasMounted:
      typeof window !== "undefined" && window.innerWidth < 600
        ? [...Array(4).keys()].map((b, i) => i === 0)
        : Array(4).fill(true),
  });

  const filterBy = (key) => (event, val) => {
    setState((state) => ({
      ...state,
      [key]: val,
      columnHasMounted:
        key === "column"
          ? state.columnHasMounted.map((b, i) => b || val.includes(i))
          : state.columnHasMounted,
    }));
  };

  const handleModal = (boolean) => () =>
    setState((state) => ({
      ...state,
      isModalOpen: boolean,
    }));

  return (
    <>
      <SettingButtonWrapper>
        <IconButton
          onClick={handleModal(true)}
          tooltipText={pageString.items.drop.index.settingTooltip}
        >
          {SettingIcon}
        </IconButton>
      </SettingButtonWrapper>
      <TableWrapper>
        <SortableTable
          data={stageDrop}
          head={
            <TableHead
              column={state.column}
              columnHasMounted={state.columnHasMounted}
            />
          }
          body={
            <TableBody
              column={state.column}
              rarity={state.rarity}
              rank={state.rank}
              columnHasMounted={state.columnHasMounted}
            />
          }
          sortFunc={sortFunc}
          defaultSortKey={"stage"}
          border
        />
      </TableWrapper>
      <SettingModal
        {...state}
        isModalOpen={state.isModalOpen}
        onClose={handleModal(false)}
        filterBy={filterBy}
      />
    </>
  );
};

const TableWrapper = styled(Scrollable)`
  overflow-x: auto;
  height: calc(100vh - 11rem);
  padding-right: 0;
  margin-right: 0;
  table {
    text-align: center;
  }
`;
const SettingButtonWrapper = styled.div`
    position absolute;
    right: 0;
    top: -4rem;
`;

export default Index;
