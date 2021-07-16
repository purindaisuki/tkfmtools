import React from "react";
import styled from "styled-components";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { useLanguage } from "containers/LanguageProvider";
import Table from "components/Table";
import { HPBar } from ".";
import { IGameState, ILog } from "types/battle";
import Scrollable from "containers/Scrollable";

const LogCell = ({
  children,
  colSpan,
}: {
  children: React.ReactNode;
  colSpan?: number;
}): JSX.Element => (
  <TableCell align="center" size="small" colSpan={colSpan}>
    <TextWrapper>{children}</TextWrapper>
  </TableCell>
);

const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: small;
`;

const MoveLog = ({
  G,
  moveLog,
}: {
  G: IGameState;
  moveLog: ILog;
}): JSX.Element => {
  const { charString, skillString }: any = useLanguage();
  const fromCharacter =
    G.lineups[
      moveLog.from.isEnemy
        ? moveLog.player === "0"
          ? "1"
          : "0"
        : moveLog.player
    ][moveLog.from.position];
  const toCharacter = moveLog.to.isEnemy
    ? G.lineups[moveLog.player === "0" ? "1" : "0"][moveLog.to.position]
    : G.lineups[moveLog.player][moveLog.to.position];

  return (
    <TableRow>
      <LogCell>
        <CharacterTextWrapper
          $isEnemy={
            moveLog.from.isEnemy
              ? moveLog.player === "0"
              : moveLog.player === "1"
          }
        >
          {`${charString.name[fromCharacter.id]} (${
            fromCharacter.teamPosition + 1
          })`}
        </CharacterTextWrapper>
      </LogCell>
      <LogCell>{"⭢"}</LogCell>
      <LogCell>{`${moveLog.value ? moveLog.value : ""} (${(
        skillString.type[moveLog.type] as string
      ).replace(" {value}", "")})`}</LogCell>
      {moveLog.value || moveLog.from.position !== moveLog.to.position ? (
        <>
          <LogCell>{"⭢"}</LogCell>
          <LogCell>
            <CharacterTextWrapper
              $isEnemy={
                moveLog.to.isEnemy
                  ? moveLog.player === "0"
                  : moveLog.player === "1"
              }
            >
              {`${charString.name[toCharacter.id]} (${
                toCharacter.teamPosition + 1
              })`}
            </CharacterTextWrapper>
          </LogCell>
          <LogCell>
            <HPTextWrapper>{`${moveLog.to.HP}${
              moveLog.to.shield ? ` (${moveLog.to.shield})` : ""
            }`}</HPTextWrapper>
            <LogHPBar
              HPPercent={(moveLog.to.HP / toCharacter.maxHP) * 100}
              shieldPercent={(moveLog.to.shield / toCharacter.maxHP) * 100}
              originalHPPercent={
                (moveLog.to.originalHP / toCharacter.maxHP) * 100
              }
              originalShieldPercent={
                (moveLog.to.originalShield / toCharacter.maxHP) * 100
              }
            />
          </LogCell>
        </>
      ) : null}
    </TableRow>
  );
};

const CharacterTextWrapper = styled.span<{ $isEnemy: boolean }>`
  color: ${(props) =>
    props.theme.colors[props.$isEnemy ? "secondary" : "onSurface"]};
`;
const HPTextWrapper = styled(TextWrapper)`
  margin-left: 0.3rem;
  font-size: 0.75rem;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const LogHPBar = styled(HPBar)`
  width: 6.5rem;
  margin-top: 0;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

type Props = {
  G: IGameState;
};

export const BattleLog = ({ G }: Props): JSX.Element => {
  const { pageString }: any = useLanguage();
  let counter = 0;

  return (
    <TableWrapper>
      <Table>
        <TableBody>
          {G.log.map((logPerTurn, ind) => (
            <React.Fragment key={ind}>
              <TableRow>
                <LogCell colSpan={6}>
                  <TurnTextWrapper>
                    {`${pageString.battle.index.turn} ${
                      Math.floor(ind / 2) + 1
                    } (${
                      pageString.battle.index.log[
                        ind % 2 === 0 ? "you" : "enemy"
                      ]
                    })`}
                  </TurnTextWrapper>
                </LogCell>
              </TableRow>
              {logPerTurn.map((logPerMove) => (
                <MoveLog G={G} key={counter++} moveLog={logPerMove} />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled(Scrollable)`
  max-height: calc(80vh - 2.7rem);
  overflow-x: hidden;
  overflow-y: auto;
  tr {
    > td:nth-child(even) {
      padding: 0;
    }
  }
`;
const TurnTextWrapper = styled(TextWrapper)`
  font-weight: bold;
`;
