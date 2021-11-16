import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import Scrollable from "containers/Scrollable";
import { useLanguage } from "containers/LanguageProvider";
import IconButton from "components/IconButton";
import { SortableTh } from "components/SortableTable";
import WindowTable from "components/VariableHeightWindowTable";
import { ItemCard } from "components/Card";
import { StyledChip as Chip } from "components/Chip";
import { ScrollableModal } from "components/Modal";
import Header from "components/Header";
import ToggleButtonGroup, { ToggleButton } from "components/ToggleButtonGroup";
import { SettingIcon } from "components/icon";
import stageDropData from "data/stageDrop.json";
import itemData from "data/item.json";

const TableHead = ({ column, requestSort, getSortDirection }) => {
  const { pageString } = useLanguage();

  return (
    <MuiTableHead>
      <MuiTableRow>
        {Object.entries(pageString.items.drop.index.tableHead).map(
          ([key, string], ind) => {
            const sortable = key === "stage" || key === "energy";

            return ind === 0 || column.includes(ind - 1) ? (
              <StyledTh
                onClick={sortable ? () => requestSort(key) : null}
                direction={sortable ? getSortDirection(key) : null}
                key={string}
                $sortable={sortable}
              >
                {string}
              </StyledTh>
            ) : null;
          }
        )}
      </MuiTableRow>
    </MuiTableHead>
  );
};

const StyledTh = styled(SortableTh)`
  && {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.onSecondary};
    ${({ $sortable }) => ($sortable ? "" : "cursor: default;")}
  }
`;

const ItemTd = ({ items, rarity, rank }) => {
  const { itemString } = useLanguage();

  return (
    <MuiTableCell>
      <ItemsContainer>
        {items &&
          items.length !== 0 &&
          items.map((item) => (
            <ItemWrapper key={item.id}>
              <ItemCard id={item.id} />
              <StyledChip
                $rarity={item.rarity}
                label={itemString.rarity[item.rarity]}
              />
            </ItemWrapper>
          ))}
      </ItemsContainer>
    </MuiTableCell>
  );
};

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div:last-child {
    margin: 0;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-right: 0.8rem;
  div {
    flex-wrap: nowrap;
    font-size: 1rem;
  }
`;
const StyledChip = styled(Chip)`
  && {
    margin-left: 0.4rem;
    background-color: ${({ $rarity }) =>
      $rarity === 0
        ? "lightgray"
        : $rarity === 1
        ? "#90CAF9"
        : $rarity === 2
        ? "#A5D6A7"
        : "#FFAB91"};
    color: black;
    font-size: 0.875rem;
  }
`;

const TableRow = ({ item, column, rarity, rank }) => {
  const { chapter, stage, energy, materials, trainItems, expPotions } = item;

  return (
    <MuiTableRow>
      <MuiTableCell>{`${chapter}-${stage}`}</MuiTableCell>
      {Object.values([materials, trainItems, expPotions]).map(
        (v, ind) =>
          v &&
          column.includes(ind) && (
            <ItemTd items={v} rarity={rarity} rank={rank} key={ind} />
          )
      )}
      {column.includes(3) && <MuiTableCell>{energy}</MuiTableCell>}
    </MuiTableRow>
  );
};

const TableBody = ({ renderRows, ...props }) => (
  <MuiTableBody>{renderRows(TableRow, props)}</MuiTableBody>
);

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
        $lang={userLanguage}
        $type="ITEM_DROPS_TABLE"
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

const Setting = (props) => {
  const { pageString } = useLanguage();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModal = (boolean) => () => setModalOpen(boolean);

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
      <SettingModal
        {...props}
        isModalOpen={isModalOpen}
        onClose={handleModal(false)}
      />
    </>
  );
};

const SettingButtonWrapper = styled.div`
    position absolute;
    right: 0;
    top: -4rem;
`;

const BtnGroupsValues = {
  column: [0, 1, 2, 3],
  rank: [1, 2, 3, 4],
  rarity: [0, 1, 2, 3],
};

const toStageKey = (key) =>
  parseInt(key.chapter) * 1000 +
  parseInt(key.stage.split(" ")[0]) * 10 +
  (key.stage.includes("free") ? 1 : 0) +
  (key.stage.includes("-") ? parseInt(key.stage.split("-")[1]) : 0);

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

const stageDrop = [].concat(
  ...stageDropData.map((chapter) =>
    chapter.stages.map((stage) => ({
      chapter: chapter.chapter,
      ...stage,
    }))
  )
);

const getFilteredDropData = ({ column, rank, rarity }, windowWidth) => {
  let filteredDropData = [];
  const rarityAndRankFilter = (item) =>
    rarity.includes(item.rarity) && rank.includes(itemData[item.id].rank);

  for (let i = 0; i < stageDrop.length; i++) {
    const { materials, trainItems, expPotions, ...rest } = stageDrop[i];

    const filteredMaterials = column.includes(0)
      ? materials.filter(rarityAndRankFilter)
      : [];
    const filteredTrainItems = column.includes(1)
      ? trainItems.filter(rarityAndRankFilter)
      : [];
    const filteredExpPotions = column.includes(2)
      ? expPotions.filter(rarityAndRankFilter)
      : [];

    if (
      filteredMaterials.length > 0 ||
      filteredTrainItems.length > 0 ||
      filteredExpPotions.length > 0
    ) {
      const itemNumber = Math.max(
        filteredMaterials.length,
        filteredTrainItems.length,
        filteredExpPotions.length
      );

      filteredDropData.push({
        ...rest,
        id: `${rest.chapter}-${rest.stage}`,
        materials: filteredMaterials,
        trainItems: filteredTrainItems,
        expPotions: filteredExpPotions,
        // 2.5rem * itemNumber + 13px
        height: 2.5 * 16 * (windowWidth > 490 ? 1 : 0.9) * itemNumber + 13,
      });
    }
  }

  return filteredDropData;
};

const Index = () => {
  const initColumn =
    typeof window !== "undefined" && window.innerWidth < 600
      ? [0]
      : BtnGroupsValues.column;
  const [windowWidth, _] = useWindowSize();

  const [state, setState] = useState(() => ({
    ...BtnGroupsValues,
    column: initColumn,
    dropData: getFilteredDropData(
      {
        column: initColumn,
        rank: BtnGroupsValues.rank,
        rarity: BtnGroupsValues.rarity,
      },
      windowWidth
    ),
  }));

  const filterBy = (key) => (event, val) => {
    const { column, rank, rarity } = state;
    const newFilter = { column, rank, rarity };

    newFilter[key] = val;

    const dropData = getFilteredDropData(newFilter, windowWidth);

    setState((state) => ({ ...newFilter, dropData }));
  };

  useEffect(() => {
    if (windowWidth === 0) return;

    const { dropData, ...filter } = state;
    const newDropData = getFilteredDropData(filter, windowWidth);

    setState({ ...filter, dropData: newDropData });
  }, [windowWidth]);

  return (
    <>
      <Setting
        column={state.column}
        rank={state.rank}
        rarity={state.rarity}
        filterBy={filterBy}
      />
      <ItemTable
        data={state.dropData}
        head={<TableHead column={state.column} />}
        // 3rem + 1px
        headHeight={3 * 16 * (windowWidth > 490 ? 1 : 0.9) + 1}
        renderRow={(item) => (
          <TableRow
            item={item}
            column={state.column}
            rarity={state.rarity}
            rank={state.rank}
          />
        )}
        overseen={10}
        sortFunc={sortFunc}
        defaultSortKey={"stage"}
        border
      />
    </>
  );
};

const ItemTable = styled(WindowTable)`
  overflow-x: auto;
  height: calc(100vh - 11rem);
  padding-right: 0;
  margin-right: 0;
  table {
    text-align: center;
  }
`;

export default Index;
