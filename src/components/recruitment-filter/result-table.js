import React, { useState } from "react";
import styled from "styled-components";
import Scrollable from "containers/Scrollable";
import { useLanguage } from "containers/LanguageProvider";
import Table from "components/Table";
import Header from "components/Header";
import { TableHead } from "./table-head";
import { TableBody } from "./table-body";

export const ResultTablePanel = ({
  filteredData,
  maxHeight,
  striped,
  helpModal,
}) => {
  const { pageString } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header
        title={pageString.items.drop.filter.resultTitle}
        withHelp
        onClickHelp={() => setOpen(true)}
        border
      />
      <TableWrapper $maxHeight={maxHeight}>
        <StyledTable stickyHeader $striped={striped} size="small">
          <TableHead />
          <TableBody sortedData={filteredData} />
        </StyledTable>
      </TableWrapper>
      {helpModal &&
        React.cloneElement(helpModal, { open, onClose: () => setOpen(false) })}
    </>
  );
};

const TableWrapper = styled(Scrollable)`
  max-height: ${(props) => props.$maxHeight};
  overflow-x: hidden;
  overflow-y: auto;
  @media screen and (max-width: 1000px) {
    overflow-y: hidden;
  }
`;
const StyledTable = styled(Table)`
  td {
    padding-left: 0.75rem;
  }
`;
