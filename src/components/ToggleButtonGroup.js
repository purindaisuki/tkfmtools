import React from "react";
import styled from "styled-components";
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@material-ui/lab";

export const ToggleButton = ({ className, children, value, ...rest }) => {
  return (
    <StyledToggleButton
      className={className}
      value={value}
      disableFocusRipple
      {...rest}
    >
      {children}
    </StyledToggleButton>
  );
};

const StyledToggleButton = styled(MuiToggleButton)`
  &&& {
    padding: 0.3rem 0.15rem;
    border-radius: 0.25rem;
    border: 1px solid ${(props) => props.theme.colors.secondaryBorder};
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.onSurface};
    white-space: break-spaces;
    user-select: none;
    text-transform: none;
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.secondary};
      box-shadow: inset 0 0 0.5rem ${(props) => props.theme.colors.secondary},
        0 0 0.1rem ${(props) => props.theme.colors.secondary};
    }
  }
  svg {
    width: 1.6rem;
    height: 1.4rem;
    margin-right: 0.6rem;
    vertical-align: middle;
    fill: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const ToggleButtonGroup = ({
  children,
  className,
  value,
  onChange,
  $lang,
  $type,
}) => {
  return (
    <StyledToggleButtonGroup
      className={className}
      value={value}
      onChange={onChange}
      $lang={$lang}
      $type={$type}
    >
      {children}
    </StyledToggleButtonGroup>
  );
};

const btnLayoutConfig = {
  ENLIST_FILTER: {
    en: { 1400: 5, 1160: 4, 1000: 3, 768: 4, 580: 3, 0: 2 },
    "zh-TW": { 1260: 6, 1080: 5, 1000: 4, 768: 5, 550: 4, 355: 3, 0: 2 },
    ja: { 1460: 6, 1250: 5, 1030: 4, 1000: 3, 768: 5, 630: 4, 430: 3, 0: 2 },
    ko: { 1260: 6, 768: 5, 550: 4, 365: 3, 0: 2 },
  },
  ITEM_DROPS_FILTER: {
    en: { 1360: 4, 992: 3, 768: 4, 624: 3, 0: 2 },
    "zh-TW": { 1360: 5, 992: 4, 768: 5, 624: 4, 410: 3, 0: 2 },
    ja: { 1360: 5, 992: 4, 768: 5, 624: 4, 410: 3, 0: 2 },
    ko: { 1460: 5, 1200: 4, 1000: 3, 920: 5, 740: 4, 570: 3, 0: 2 },
  },
  ITEM_DROPS_TABLE: {
    en: { 0: 2, 990: 4 },
    "zh-TW": { 0: 4 },
    ja: { 0: 4 },
    ko: { 0: 4 },
  },
};

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup).attrs(
  ({ $lang, $type }) => ({ $layoutConfig: btnLayoutConfig[$type][$lang] })
)`
  &&& {
    display: grid;
    gap: 0.5rem;
    ${(props) =>
      Object.entries(props.$layoutConfig).map(
        ([breakpoint, repeat]) =>
          `@media screen and (min-width: ${breakpoint}px) {
                grid-template-columns: repeat(${repeat}, 1fr);
            }`
      )}
    .Mui-selected {
      background-color: ${(props) => props.theme.colors.secondary};
      color: ${(props) => props.theme.colors.onSecondary};
      svg {
        fill: ${(props) => props.theme.colors.onSecondary};
        color: ${(props) => props.theme.colors.onSecondary};
      }
    }
  }
`;

export default ToggleButtonGroup;
