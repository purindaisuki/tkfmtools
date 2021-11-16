import React from "react";
import styled from "styled-components";
import Header from "components/Header";
import { useLanguage } from "containers/LanguageProvider";

const BattleHelp = (): JSX.Element => {
  const { pageString }: any = useLanguage();

  return (
    <div>
      {pageString.battle.index.help.map(
        (item: { title: string; content: string[] }, ind: number) => (
          <React.Fragment key={ind}>
            <SettingHeader title={item.title} />
            {item.content.map((text, ind) => (
              <TextWrapper key={ind}>{text}</TextWrapper>
            ))}
          </React.Fragment>
        )
      )}
    </div>
  );
};

const SettingHeader = styled(Header)`
  margin-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  font-size: 1rem;
`;
const TextWrapper = styled.div`
  padding: 0.4rem 0;
  font-size: 0.875rem;
`;

export default BattleHelp;
