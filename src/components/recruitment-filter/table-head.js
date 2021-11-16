import React from "react";
import styled from "styled-components";
import {
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  TableCell,
} from "@mui/material";
import { useLanguage } from "containers/LanguageProvider";

export const TableHead = () => {
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
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurface};
  user-select: none;
`;
