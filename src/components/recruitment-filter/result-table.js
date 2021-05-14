import React from "react";
import styled from "styled-components";

import Scrollable from "containers/Scrollable";
import { useLanguage } from "containers/LanguageProvider";

import Table from "components/Table";

import Header from 'components/Header';
import { TableHead } from "./table-head";
import { TableBody } from "./table-body";

export const ResultTablePanel = (props) => {
  const { pageString } = useLanguage();
  const { filteredData, handleModalOpen, maxHeight, striped, onToggleFilter } = props;

  return (
    <>
      <Header
        title={pageString.items.drop.filter.resultTitle}
        withHelp
        onClickHelp={handleModalOpen}
        border
      />
      <TableWrapper $maxHeight={maxHeight}>
        <StyledTable stickyHeader $striped={striped} size="small">
          <TableHead />
          <TableBody sortedData={filteredData} />
        </StyledTable>
      </TableWrapper>
    </>
  );
};

const TableWrapper = styled(Scrollable)`
  max-height: ${(props) => props.$maxHeight};
  overflow-x: hidden;
  overflow-y: auto;
`;

const StyledTable = styled(Table)`
  td {
    padding-left: 0.75rem;
  }
`;
