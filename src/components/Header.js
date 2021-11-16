import React from "react";
import styled from "styled-components";
import { HeaderIconButton } from "components/IconButton";
import { HelpIcon } from "components/icon";

const Header = ({
  className,
  title,
  titleIcon,
  withHelp,
  onClickHelp,
  end,
  id,
  border,
}) => (
  <StyledHeader className={className} $border={border}>
    <TitleWrapper>
      {titleIcon && <TitleIcon id={id}>{titleIcon}</TitleIcon>}
      {title}
      {withHelp && onClickHelp && (
        <HeaderIconButton onClick={onClickHelp} tooltipText="Help">
          {HelpIcon}
        </HeaderIconButton>
      )}
    </TitleWrapper>
    {end && <div>{end}</div>}
  </StyledHeader>
);

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  height: 2.2rem;
  ${({ theme, $border }) =>
    $border ? `border-bottom: solid 1px ${theme.colors.border};` : ""}
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: large;
  font-weight: normal;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TitleIcon = styled.span`
  margin-right: 0.4rem;
  svg {
    width: 1.2rem;
    height: 1.2rem;
    fill: ${({ theme }) => theme.colors.onSurface};
  }
`;

export default Header;
