import React from "react";
import styled from "styled-components";
import {
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { useLanguage } from "containers/LanguageProvider";
import { ResponsiveCharCard } from "components/CharCard";
import WindowTable from "components/WindowTable";
import { SortableTh } from "components/SortableTable";
import charData from "data/character.json";

const TableHead = ({ requestSort, getSortDirection }) => {
  const { charString } = useLanguage();

  return (
    <MuiTableHead>
      <MuiTableRow hover>
        {Object.entries(charString.tagAttributes).map(([attr, string], ind) => (
          <StyledTh
            onClick={() => requestSort(attr)}
            direction={getSortDirection(attr)}
            key={attr}
          >
            {string}
          </StyledTh>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
};

const StyledTh = styled(SortableTh)`
  && {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.onSecondary};
    text-align: start;
  }
`;

const parseRarity = (rarity) =>
  rarity === 0 ? "N" : rarity === 1 ? "R" : rarity === 2 ? "SR" : "SSR";

const TableRow = ({ item: char }) => {
  const { userLanguage, charString } = useLanguage();

  if (!char.available) {
    return (
      <MuiTableRow hover>
        <MuiTableCell>
          <ResponsiveCharCard id={char.id} $lang={userLanguage} $type="TABLE" />
        </MuiTableCell>
        <MuiTableCell>{parseRarity(char.rarity)}</MuiTableCell>
        <MuiTableCell>{charString.tags[char.attribute]}</MuiTableCell>
        <MuiTableCell>{charString.tags[char.position]}</MuiTableCell>
        <MuiTableCell colSpan="5">{charString.tagWarnMsg}</MuiTableCell>
      </MuiTableRow>
    );
  }

  return (
    <MuiTableRow hover>
      {Object.entries(char).map(([key, value]) => {
        switch (key) {
          case "available":
            return null;
          case "id":
            return (
              <MuiTableCell key={key}>
                <ResponsiveCharCard
                  id={char.id}
                  $lang={userLanguage}
                  $type="TABLE"
                />
              </MuiTableCell>
            );
          case "rarity":
            return <MuiTableCell key={key}>{parseRarity(value)}</MuiTableCell>;
          case "else":
            return (
              <MuiTableCell key={key}>
                {value.map((tag) => charString.tags[tag]).join(", ")}
              </MuiTableCell>
            );
          default:
            return (
              <MuiTableCell key={key}>
                {value < 0 ? "-" : charString.tags[value]}
              </MuiTableCell>
            );
        }
      })}
    </MuiTableRow>
  );
};

const charTagData = charData.map((char) => {
  const { id, rarity, tags } = char;
  return { id, rarity, ...tags };
});

const CharTagTable = () => {
  const { charString } = useLanguage();

  const [windowWidth, _] = useWindowSize();

  const sortFunc = (sortableItems, sortConfig) => {
    sortableItems.sort((a, b) => {
      let aKey;
      let bKey;
      if (sortConfig.key === "else") {
        aKey = a[sortConfig.key].join("");
        bKey = b[sortConfig.key].join("");
      } else if (sortConfig.key === "name") {
        aKey = charString.name[a.id];
        bKey = charString.name[b.id];
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

  return (
    <CharTable
      data={charTagData}
      head={<TableHead />}
      // 3rem + 1px
      headHeight={3 * 16 * (windowWidth > 490 ? 1 : 0.9) + 1}
      renderRow={(item) => <TableRow item={item} />}
      // 3.6rem + 13px
      itemHeight={3.6 * 16 * (windowWidth > 490 ? 1 : 0.9) + 13}
      sortFunc={sortFunc}
      defaultSortKey={"rarity"}
      border
    />
  );
};

const CharTable = styled(WindowTable)`
  overflow-x: auto;
  height: calc(100vh - 11rem);
  padding-right: 0;
  margin-right: 0;
`;

export default CharTagTable;
