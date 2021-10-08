import React from "react";
import { PageProps } from "gatsby";
import { BattleApp, BattleBoard } from "components/battle";

const BattlePage = ({ location }: PageProps): JSX.Element => (
  <BattleApp location={location} board={BattleBoard} />
);

export default BattlePage;
