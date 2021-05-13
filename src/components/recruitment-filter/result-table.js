import React, { useMemo } from "react";
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
        end={<ToggleButton onClick={onToggleFilter}>{pageString.enlist.filter.toggleMode}</ToggleButton>}
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
  img {
    width: 1.8rem;
    height: 1.8rem;
  }
  td {
    padding-left: 0.75rem;
  }
`;

export const ToggleButton = styled.div`
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: ${p => p.theme.colors.onSurface};
    color: ${p => p.theme.colors.surface};
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    :hover {
        background-color: ${p => p.theme.colors.secondary};
    }
`
