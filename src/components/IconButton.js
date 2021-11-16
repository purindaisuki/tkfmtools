import React from "react";
import styled from "styled-components";
import {
  CircularProgress,
  IconButton as MuiIconButton,
  Tooltip,
} from "@mui/material";
import { useLanguage } from "containers/LanguageProvider";
import { ExportIcon } from "components/icon";

const IconButton = ({
  children,
  className,
  tooltipText,
  onClick,
  dataHtml2canvasIgnore,
  ariaDescribedby,
}) => (
  <Tooltip title={<TextWrapper>{tooltipText}</TextWrapper>}>
    <StyledIconButton
      className={className}
      onClick={onClick}
      aria-label={tooltipText}
      aria-describedby={ariaDescribedby}
      data-html2canvas-ignore={dataHtml2canvasIgnore ? "true" : "false"}
      size="large"
    >
      {children}
    </StyledIconButton>
  </Tooltip>
);

const TextWrapper = styled.span`
  font-size: small;
`;
const StyledIconButton = styled(MuiIconButton)`
  padding: 0.75rem;
  svg {
    width: 1.6rem;
    height: 1.6rem;
    fill: ${({ theme, $active }) =>
      $active ? theme.colors.secondary : theme.colors.onSurface};
  }
  &:hover {
    box-shadow: inset 0 0 10rem 10rem
      ${({ theme }) => `${theme.colors.shadow}33`};
    svg {
      fill: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const HeaderIconButton = ({
  children,
  className,
  tooltipText,
  onClick,
}) => (
  <StyledHeaderIconButton
    tooltipText={tooltipText}
    onClick={onClick}
    className={className}
  >
    {children}
  </StyledHeaderIconButton>
);

export const StyledHeaderIconButton = styled(IconButton)`
  padding: 0.4rem;
  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

export const ExportButton = ({ className, onClick, isLoading }) => {
  const { pageString } = useLanguage();

  return (
    <StyledExportButton
      className={className}
      onClick={onClick}
      disableFocusRipple
      tooltipText={pageString.analysis.result.exportButtonTooltip}
      $isLoading={isLoading}
      dataHtml2canvasIgnore
    >
      {ExportIcon}
      {isLoading && <StyledSpinner size={24} thickness={6} />}
    </StyledExportButton>
  );
};

const StyledExportButton = styled(IconButton)`
  ${({ theme, $isLoading }) =>
    $isLoading
      ? `background-color: ${theme.colors.dropdownHover};
        svg {
          fill: ${theme.colors.shadow};
        }`
      : ""}
`;
const StyledSpinner = styled(CircularProgress)`
  position: absolute;
  margin: auto;
  color: ${({ theme }) => theme.colors.blue};
`;

export default IconButton;
