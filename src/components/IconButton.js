import React from "react";
import styled from "styled-components";
import {
  CircularProgress,
  IconButton as MuiIconButton,
  Tooltip,
} from "@material-ui/core";
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
    >
      {children}
    </StyledIconButton>
  </Tooltip>
);

const TextWrapper = styled.span`
  font-size: small;
`;
const StyledIconButton = styled(MuiIconButton)`
  padding: 0.5rem 0.5rem;
  svg {
    width: 1.6rem;
    height: 1.6rem;
    fill: ${(props) =>
      props.$active
        ? props.theme.colors.secondary
        : props.theme.colors.onSurface};
  }
  &:hover {
    box-shadow: inset 0 0 10rem 10rem
      ${(props) => props.theme.colors.shadow + "33"};
    svg {
      fill: ${(props) => props.theme.colors.secondary};
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
  && {
    padding: 0.4rem;
    svg {
      width: 1.4rem;
      height: 1.4rem;
    }
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
  &&& {
    ${(props) =>
      props.$isLoading
        ? `background-color: ${props.theme.colors.dropdownHover};`
        : ""}
    svg {
      ${(props) =>
        props.$isLoading ? `fill: ${props.theme.colors.shadow};` : ""}
    }
  }
`;
const StyledSpinner = styled(CircularProgress)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  color: ${(props) => props.theme.colors.blue};
`;

export default IconButton;
