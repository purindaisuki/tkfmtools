import React from "react";
import styled from "styled-components";
import { useLanguage } from "containers/LanguageProvider";
import ImageSupplier from "components/ImageSupplier";
import LocalizedLink from "components/LocalizedLink";

const NotFound = () => {
  const { pageString } = useLanguage();

  return (
    <Wrapper>
      <NotFoundImg name="pageNotFound" isBackground={true} alt="">
        <Message>
          <StyledH1>{pageString[404].h1}</StyledH1>
          <StyledP>{pageString[404].p}</StyledP>
          <StyledLink to="/">{pageString[404].link}</StyledLink>
        </Message>
      </NotFoundImg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onSurface};
`;
const NotFoundImg = styled(ImageSupplier)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20rem 40rem;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 6rem);
`;
const Message = styled.div`
  position: absolute;
  top: 25%;
  left: max(calc(35% - 20rem), 1rem);
  width: max-content;
  background: ${({ theme }) => theme.colors.background + "BF"};
  box-shadow: 0 0 1rem ${({ theme }) => theme.colors.background};
  @media screen and (max-width: 992px) {
    top: 30%;
    left: calc(50% - 9.5rem);
    ${({ theme }) => `
    text-shadow: 0 0 1px ${theme.colors.surface},
      -2px 0 1px ${theme.colors.surface},
      2px 0 1px ${theme.colors.surface},
      0 -2px 1px ${theme.colors.surface},
      0 2px 1px ${theme.colors.surface},
      2px 2px 1px ${theme.colors.surface},
      2px -2px 1px ${theme.colors.surface},
      -2px 2px 1px ${theme.colors.surface},
      -2px -2px 1px ${theme.colors.surface};`}
  }
`;
const StyledH1 = styled.h1`
  margin-top: 0;
  margin-bottom: 2rem;
  max-width: 20rem;
  font-weight: bold;
`;
const StyledP = styled.p`
  font-size: x-large;
  max-width: 20rem;
  margin-bottom: 2rem;
`;
const StyledLink = styled(LocalizedLink)`
  font-size: x-large;
  color: ${({ theme }) => theme.colors.link};
  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }
`;

export default NotFound;
