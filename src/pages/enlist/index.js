import React from "react";
import styled from "styled-components";
import Switchable from "containers/Switchable";
import { useLanguage } from "containers/LanguageProvider";
import IconButton from "components/IconButton";
import CharTagMasonry from "components/CharTagMasonry";
import CharTagTable from "components/CharTagTable";
import { MasonryViewIcon, TableViewIcon } from "components/icon";

const LayoutSwitcher = ({ layout, setLayout }) => {
  const { pageString } = useLanguage();

  return (
    <LayoutBtnContainer>
      {pageString.enlist.index.layout}
      <IconButton
        $active={layout === "Masonry"}
        onClick={() => setLayout("Masonry")}
        tooltipText={pageString.enlist.index.masonryTooltip}
      >
        {MasonryViewIcon}
      </IconButton>
      <IconButton
        $active={layout === "Table"}
        onClick={() => setLayout("Table")}
        tooltipText={pageString.enlist.index.tableTooltip}
      >
        {TableViewIcon}
      </IconButton>
    </LayoutBtnContainer>
  );
};

const LayoutBtnContainer = styled.div`
  position: absolute;
  right: 0;
  top: -4rem;
  @media screen and (max-width: 410px) {
    font-size: 0;
  }
`;

const Index = () => {
  const { pageString } = useLanguage();

  return (
    <Switchable
      localStorageKey="enlist-character-layout"
      layoutSwitcher={<LayoutSwitcher />}
      items={[
        { layout: "Masonry", content: <CharTagMasonry /> },
        { layout: "Table", content: <CharTagTable /> },
      ]}
      initLayoutIndex={0}
    />
  );
};

export default Index;
