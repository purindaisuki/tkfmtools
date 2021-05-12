import React from "react";
import { useLanguage } from "containers/LanguageProvider";
import {
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  TableCell,
} from "@material-ui/core";
import styled from "styled-components";

export const TableHead = (props) => {
  const { pageString } = useLanguage();

  return (
    <MuiTableHead>
      <MuiTableRow>
        {pageString.enlist.filter.tableHead.map((item, ind) => (
          <CellWrapper key={ind}>{item.title}</CellWrapper>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
};

const CellWrapper = styled(TableCell)`
  && {
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.onSurface};
    user-select: none;
  }
`;
