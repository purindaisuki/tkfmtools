import React from "react";
import styled from "styled-components";
import {
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from "@material-ui/core";
import { useLanguage } from "containers/LanguageProvider";
import { ResponsiveCharCard } from "components/CharCard";
import WindowTable from "components/WindowTable";
import { SortableTh } from "components/SortableTable";
import charData from "data/character.json";

const TableHead = React.forwardRef((props, ref) => {
  const { charString } = useLanguage();

  return (
    <MuiTableHead ref={ref}>
      <MuiTableRow hover>
        {Object.entries(charString.tagAttributes).map(([attr, string], ind) => (
          <StyledTh
            onClick={() => props.requestSort(attr)}
            direction={props.getSortDirection(attr)}
            key={attr}
          >
            {string}
          </StyledTh>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
});

const StyledTh = styled(SortableTh)`
  && {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.onSecondary};
    text-align: start;
    white-space: nowrap;
  }
`;

const cardTextWrapConfig = {
  "zh-TW": 900,
  en: 1300,
  ja: 1300,
  ko: 1300,
};

const parseRarity = (rarity) =>
  rarity === 0 ? "N" : rarity === 1 ? "R" : rarity === 2 ? "SR" : "SSR";

const TableBody = React.forwardRef(({ sortedData, renderTo }, ref) => {
  const { userLanguage, charString } = useLanguage();

  return (
    <MuiTableBody>
      {sortedData.map((char, ind) => {
        if (ind > renderTo) {
          return null;
        }

        if (!char.available) {
          return (
            <MuiTableRow hover key={char.id}>
              <MuiTableCell>
                <ResponsiveCharCard
                  id={char.id}
                  $textWrapConfig={cardTextWrapConfig[userLanguage]}
                />
              </MuiTableCell>
              <MuiTableCell>{parseRarity(char.rarity)}</MuiTableCell>
              <MuiTableCell>{charString.tags[char.attribute]}</MuiTableCell>
              <MuiTableCell>{charString.tags[char.position]}</MuiTableCell>
              <MuiTableCell colSpan="5">{charString.tagWarnMsg}</MuiTableCell>
            </MuiTableRow>
          );
        }

        return (
          <MuiTableRow hover key={char.id} ref={ind === 0 ? ref : undefined}>
            {Object.entries(char).map(([key, value]) => {
              if (key === "available") {
                return null;
              }
              if (key === "id") {
                return (
                  <MuiTableCell key={key}>
                    <ResponsiveCharCard
                      id={char.id}
                      $textWrapConfig={cardTextWrapConfig[userLanguage]}
                    />
                  </MuiTableCell>
                );
              }
              if (key === "rarity") {
                return (
                  <MuiTableCell key={key}>{parseRarity(value)}</MuiTableCell>
                );
              }
              if (key === "else") {
                return (
                  <MuiTableCell key={key}>
                    {value.map((tag) => charString.tags[tag]).join(", ")}
                  </MuiTableCell>
                );
              }

              return (
                <MuiTableCell key={key}>
                  {value < 0 ? "-" : charString.tags[value]}
                </MuiTableCell>
              );
            })}
          </MuiTableRow>
        );
      })}
    </MuiTableBody>
  );
});

const CharTagTable = () => {
  const { charString } = useLanguage();

  const charTagData = charData.map((char) => {
    const { id, rarity, tags } = char;
    return { id, rarity, ...tags };
  });

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
      body={<TableBody />}
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
