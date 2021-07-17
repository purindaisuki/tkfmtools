import React from "react";
import styled from "styled-components";
import { Chip } from "@material-ui/core";
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
  && {
    height: auto;
    width: ${(props) => (props.$lang === "en" ? "3.8rem" : "auto")};
    color: ${(props) => props.theme.colors.onPrimary};
    font-size: small;
    > span {
      padding: 0 0.4rem;
    }
    margin-right: 0.4rem;
  }
`;
const StyledNewChip = styled(StyledChip)`
  && {
    background-color: ${(props) => props.theme.colors.success};
  }
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
  && {
    background-color: ${(props) => props.theme.colors.error};
  }
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
  && {
    background-color: ${(props) => props.theme.colors.blue};
  }
`;
