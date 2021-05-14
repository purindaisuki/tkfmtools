import React from "react";
import { useLanguage } from "containers/LanguageProvider";

import {
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from "@material-ui/core";

import { ImgCard } from "components/Card";

import styled from "styled-components";

export const TableBody = ({ sortedData }) => {
  const { charString } = useLanguage();

  return (
    <MuiTableBody>
      {sortedData.map((d, i) => (
        <MuiTableRow key={i}>
          <MuiTableCell>{i + 1}</MuiTableCell>
          <MuiTableCell>
            {d.tags.map((i) => charString.tags[i]).join(", ")}
          </MuiTableCell>
          <MuiTableCell>
            <CardRow>
              {d.characters.map((character, i) => (
                <Card rarity={character.rarity} key={i}>
                  <CharacterImage
                    imgType="char_small"
                    imgId={character.id}
                    alt=""
                  />
                  {charString.name[character.id].split(" ").slice(-1)[0]}
                </Card>
              ))}
            </CardRow>
          </MuiTableCell>
        </MuiTableRow>
      ))}
    </MuiTableBody>
  );
};

const CardRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  display: flex;
  align-items: center;

  padding: 1px 8px 1px 1px;
  margin: 4px;

  height: 3.6rem;

  box-shadow: 0px 0px 2px 1px rgb(0 0 0 / 10%), 2px 2px 2px 1px rgb(0 0 0 / 10%);
  background: ${(p) =>
    p.rarity === 0
      ? "#C0C0C0"
      : p.rarity === 1
      ? "#00B2F6"
      : p.rarity === 2
      ? "#FFAE00"
      : "#FF6600"};
  color: #333333;
`;

const CharacterImage = styled(ImgCard)`
  height: 100%;
  width: 50px;

  margin-right: 2px;

  > .gatsby-image-wrapper {
    background: #aaaaaa;
  }
`;
