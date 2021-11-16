import React from "react";
import styled from "styled-components";
import { useLanguage } from "containers/LanguageProvider";
import ImageSupplier from "components/ImageSupplier";
import Table from "components/Table";

export const ImgCard = ({
  children,
  className,
  imgType,
  imgId,
  alt,
  isBackground,
}) =>
  isBackground ? (
    <StyledImg
      className={className}
      name={`${imgType}_${imgId}`}
      isBackground
      alt={alt}
    >
      {children}
    </StyledImg>
  ) : (
    <ImgWrapper className={className}>
      <StyledImg name={`${imgType}_${imgId}`} alt={alt} />
      {children}
    </ImgWrapper>
  );

const StyledImg = styled(ImageSupplier)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-repeat: no-repeat;
`;
const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemCard = ({ className, id }) => {
  const { itemString } = useLanguage();

  return (
    <ItemImg className={className} imgType="item" imgId={id} alt="">
      <TextWrapper>{itemString.name[id]}</TextWrapper>
    </ItemImg>
  );
};

const ItemImg = styled(ImgCard)`
  > div:first-child {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.4rem;
    user-select: none;
  }
`;
const TextWrapper = styled.div`
  white-space: nowrap;
  font-size: medium;
  font-weight: normal;
`;

export const CardTable = ({ className, children, striped }) => (
  <StyledTable className={className} $striped={striped}>
    {children}
  </StyledTable>
);

const StyledTable = styled(Table)`
  .MuiTableCell-root {
    font-size: 0.9rem;
    padding: 0.3rem;
    padding-left: 0.75rem;
  }
`;
