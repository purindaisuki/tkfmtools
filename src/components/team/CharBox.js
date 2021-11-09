import React from "react";
import styled from "styled-components";
import { useLanguage } from "containers/LanguageProvider";
import ImageSupplier from "components/ImageSupplier";

const CharsBox = ({ chars }) => {
  const { charString } = useLanguage();
  const isEmpty = !chars.some((c) => c?.id);

  return (
    <CharContainer>
      {isEmpty ? (
        <EmptySlot />
      ) : (
        chars.map(
          (c, ind) =>
            c?.id && (
              <CharImg
                key={ind}
                name={`char_small_${c.id}`}
                alt={charString.name[c.id]}
              />
            )
        )
      )}
    </CharContainer>
  );
};

const CharContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
`;
const CharImg = styled(ImageSupplier)`
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
`;
const EmptySlot = styled.div`
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
`;

export default CharsBox;
