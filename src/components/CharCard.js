import React from "react";
import styled from "styled-components";
import {
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from "@material-ui/core";
import { useLanguage } from "containers/LanguageProvider";
import { ImgCard, CardTable } from "components/Card";
import {
  AttributeIcon,
  PositionIcon,
  RaceIcon,
  BodysizeIcon,
  OppaiIcon,
  RankIcon,
  ElseIcon,
} from "components/icon";
import charData from "data/character.json";

const CharCard = ({ className, id }) => {
  const { charString } = useLanguage();

  return (
    <StyledCard
      className={className}
      imgType="char_small"
      imgId={id}
      alt=""
      isBackground
    >
      <TitleText>
        {charString.name[id].split(" ").slice(0, -1).join(" ")}
      </TitleText>
      <TextWrapper>{charString.name[id].split(" ").slice(-1)[0]}</TextWrapper>
    </StyledCard>
  );
};

const StyledCard = styled(ImgCard)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  min-width: 10rem;
  height: 3.6rem;
  background-repeat: no-repeat;
  background-size: 6rem 6rem;
  background-position: 0 -1.6rem;
`;
const TextWrapper = styled.div`
  margin-left: 0;
  margin-right: 1rem;
  transition: all 0.3s ease;
  text-transform: none;
  text-shadow: 0 0 1px ${(props) => props.theme.colors.surface},
    -2px 0 1px ${(props) => props.theme.colors.surface},
    2px 0 1px ${(props) => props.theme.colors.surface},
    0 -2px 1px ${(props) => props.theme.colors.surface},
    0 2px 1px ${(props) => props.theme.colors.surface},
    2px 2px 1px ${(props) => props.theme.colors.surface},
    2px -2px 1px ${(props) => props.theme.colors.surface},
    -2px 2px 1px ${(props) => props.theme.colors.surface},
    -2px -2px 1px ${(props) => props.theme.colors.surface};
`;
const TitleText = styled(TextWrapper)`
  font-size: small;
`;

const cardTextWrapConfig = {
  TABLE: { "zh-TW": 900, en: 1300, ja: 1300, ko: 1300 },
  FILTER: { "zh-TW": 1360, en: 1360, ja: 1460, ko: 1360 },
};

export const ResponsiveCharCard = styled(CharCard).attrs(
  ({ $lang, $type }) => ({
    $textWrapConfig: cardTextWrapConfig[$type][$lang],
  })
)`
  @media screen and (min-width: ${(props) => props.$textWrapConfig}px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    > div {
      margin-left: 7rem;
    }
    > div:last-child {
      margin-left: -0.6rem;
    }
  }
`;

const CharTr = ({ type, tag }) => {
  const { charString } = useLanguage();

  const attrIcons = {
    attribute: AttributeIcon,
    position: PositionIcon,
    race: RaceIcon,
    body: BodysizeIcon,
    oppai: OppaiIcon,
    rank: RankIcon,
    else: ElseIcon,
  };

  return (
    <MuiTableRow>
      <MuiTableCell>
        <TagWrapper>
          <IconWrapper>{attrIcons[type]}</IconWrapper>
          {charString.tags[tag]}
        </TagWrapper>
      </MuiTableCell>
    </MuiTableRow>
  );
};

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const IconWrapper = styled.div`
  margin-bottom: 0.1rem;
  margin-left: 0.25rem;
  margin-right: 0.4rem;
  > svg {
    width: 1.2rem;
    fill: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const CharAccordionDetail = ({ id }) => {
  const { charString } = useLanguage();

  const { tags } = charData.find((char) => char.id === id);
  const { available, ...rest } = tags;

  if (!available) {
    return (
      <CardTable striped>
        <MuiTableBody>
          <MuiTableRow>
            <MuiTableCell>{charString.tagWarnMsg}</MuiTableCell>
          </MuiTableRow>
        </MuiTableBody>
      </CardTable>
    );
  }

  return (
    <CardTable striped>
      <MuiTableBody>
        {Object.entries(rest).map(([type, tag], ind) =>
          type === "else" ? (
            tag.map((tag) => <CharTr key={tag} type="else" tag={tag} />)
          ) : tag >= 0 ? (
            <CharTr key={tag} type={type} tag={tag} />
          ) : null
        )}
      </MuiTableBody>
    </CardTable>
  );
};

export default CharCard;
