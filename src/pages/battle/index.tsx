import React from "react";
import { PageProps } from "gatsby";
import { useLanguage } from "containers/LanguageProvider";
import Head from "components/Head";
import { BattleApp, BattleBoard } from "components/battle";

const BattlePage = ({ location }: PageProps): JSX.Element => {
  const { pageString }: any = useLanguage();

  return (
    <>
      <Head
        title={pageString.battle.index.helmet.title}
        description={pageString.battle.index.helmet.description}
        path="/battle/"
      />
      <BattleApp location={location} board={BattleBoard} />
    </>
  );
};

export default BattlePage;
