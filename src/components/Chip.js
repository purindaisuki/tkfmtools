import React from "react";
import styled from "styled-components";
import { Chip } from "@mui/material";
import { useLanguage } from "containers/LanguageProvider";

export const NewChip = () => {
  const { userLanguage, pageString } = useLanguage();

  return (
    <StyledNewChip
      label={pageString.index.updateLog.new}
      $lang={userLanguage}
    />
  );
};

export const StyledChip = styled(Chip)`
  height: auto;
  width: ${({ $lang }) => ($lang === "en" ? "3.8rem" : "auto")};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: small;
  > span {
    padding: 0 0.4rem;
  }
  margin-right: 0.4rem;
`;
const StyledNewChip = styled(StyledChip)`
  background-color: ${({ theme }) => theme.colors.success};
`;

export const FixChip = () => {
  const { userLanguage, pageString } = useLanguage();

  return (
    <StyledFixChip
      label={pageString.index.updateLog.fix}
      $lang={userLanguage}
    />
  );
};
const StyledFixChip = styled(StyledChip)`
  background-color: ${({ theme }) => theme.colors.error};
`;

export const ChangeChip = () => {
  const { userLanguage, pageString } = useLanguage();

  return (
    <StyledChangeChip
      label={pageString.index.updateLog.change}
      $lang={userLanguage}
    />
  );
};

const StyledChangeChip = styled(StyledChip)`
  background-color: ${({ theme }) => theme.colors.blue};
`;
