import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import useCharacterStats from "hooks/useCharacterStats";
import { useTeamData } from "containers/TeamDataProvider";
import { useLanguage } from "containers/LanguageProvider";
import CharStatsSelect from "components/CharStatsSelect";
import ImageSupplier from "components/ImageSupplier";
import IconButton from "components/IconButton";
import { HpIcon, AttackIcon, ChangeIcon, DeleteIcon } from "components/icon";
import charMap from "data/charMap";

const SlotOperationButton = ({ children, onClick, tooltipText }) => (
  <StyledButton onClick={onClick} tooltipText={tooltipText}>
    {children}
  </StyledButton>
);

const StyledButton = styled(IconButton)`
  && {
    width: 1.2rem;
    height: 1.2rem;
    padding: 0;
    margin: 0 0.4rem;
  }
`;

const SlotOperationButtons = ({ handleChange, handleDelete }) => {
  const { pageString } = useLanguage();

  return (
    <BtnsWrapper>
      <SlotOperationButton
        onClick={handleChange}
        tooltipText={pageString.team.build.changeTooltip}
      >
        {ChangeIcon}
      </SlotOperationButton>
      <SlotOperationButton
        onClick={handleDelete}
        tooltipText={pageString.team.build.deleteTooltip}
      >
        {DeleteIcon}
      </SlotOperationButton>
    </BtnsWrapper>
  );
};

const BtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 1rem;
  height: calc(100% - 1.6rem);
  @media screen and (max-width: 768px) {
    flex-direction: row;
    z-index: 2;
    top: auto;
    bottom: -1.4rem;
    right: 0.4rem;
    height: auto;
  }
`;

const CharSlotContent = ({
  char,
  index,
  handleSelectModalOpen,
  handleCharDelete,
}) => {
  const { currentTeam, actions } = useTeamData();
  const { setCurrentTeam } = actions;

  const [charStats, setCharStats] = useCharacterStats(char);

  const { userLanguage, charString } = useLanguage();

  const onSelect = (newCharState) => {
    setCharStats(newCharState);

    const newTeam = JSON.parse(JSON.stringify(currentTeam));
    newTeam.characters[index] = newCharState;

    setCurrentTeam(newTeam);
  };

  useEffect(() => {
    setCharStats(char);
  }, [char]);

  return (
    <>
      <SlotCharAvatar name={`char_small_${char.id}`} isBackground alt="" />
      <CharName $lang={userLanguage}>
        <span>
          {charString.name[char.id].split(" ").slice(0, -1).join(" ")}
        </span>
        <span>{charString.name[char.id].split(" ").slice(-1)[0]}</span>
      </CharName>
      <CharPositionText>
        {charString.tags[charMap[char.id].tags.position]}
      </CharPositionText>
      <CharStatsSelect
        char={char}
        levelInputId={`level-input-${index}`}
        onSelect={onSelect}
      />
      <SlotOperationButtons
        handleChange={handleSelectModalOpen}
        handleDelete={handleCharDelete}
      />
      <CharStats>
        <div>
          {AttackIcon}
          <span>{isNaN(charStats.ATK) ? "-" : charStats.ATK}</span>
        </div>
        <div>
          {HpIcon}
          <span>{isNaN(charStats.HP) ? "-" : charStats.HP}</span>
        </div>
      </CharStats>
    </>
  );
};

const SlotCharAvatar = styled(ImageSupplier)`
  position: relative;
  z-index: 1;
  left: 0;
  width: calc(4.4rem + 4%);
  height: 5rem;
  background-repeat: no-repeat;
  background-size: 8rem 8rem;
  background-position: calc(50% - 1rem) -2rem;
  background-color: rgba(0, 0, 0, 0);
`;
const CharName = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 0.4rem;
  left: calc(5rem + 4%);
  font-size: ${(props) => (props.$lang === "ja" ? "1.2rem" : "x-large")};
  transition: all 0.3s ease;
  > span:first-child {
    font-size: ${(props) => (props.$lang === "ja" ? ".9rem" : "medium")};
  }
  @media screen and (max-width: 768px) {
    align-items: flex-end;
    left: auto;
    right: calc(96% - 6.5rem);
    font-size: ${(props) => (props.$lang === "ja" ? "1rem" : "large")};
    > span:first-child {
      font-size: ${(props) => (props.$lang === "ja" ? ".8rem" : "small")};
    }
  }
`;
const CharPositionText = styled.span`
  position: absolute;
  z-index: 1;
  bottom: 0.1rem;
  left: calc(9.2rem + 4%);
  font-size: small;
  @media screen and (max-width: 768px) {
    left: auto;
    right: calc(96% - 6.5rem);
  }
`;
const CharStats = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  bottom: 0;
  left: calc(14rem + 5%);
  width: calc(95% - 14rem);
  height: 1.6rem;
  svg {
    width: 1.2rem;
    height: 1.2rem;
    fill: ${(props) => props.theme.colors.onSurface};
  }
  span {
    position: relative;
    z-index: 1;
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    margin: 0.2rem;
  }
  div {
    margin-right: 0.6rem;
  }
  div:last-child {
    margin-right: 0;
  }
  @media screen and (max-width: 768px) {
    bottom: -1.6rem;
    left: calc(5rem + 5%);
    width: calc(95% - 6rem);
    padding-left: 1rem;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: skew(30deg);
      transform-origin: 0 0;
      mask: linear-gradient(270deg, transparent 1rem, #000 75%);
      border: 1px solid ${(props) => props.theme.colors.shadow};
      border-top: none;
      border-right: none;
      background: linear-gradient(
        270deg,
        transparent 1rem,
        ${(props) => props.theme.colors.shadow + "33"} 75%
      );
    }
  }
`;

const CharSlot = React.forwardRef(
  (
    {
      char,
      provided,
      isDragging,
      index,
      handleSelectModalOpen,
      handleCharDelete,
    },
    ref
  ) => {
    const { pageString } = useLanguage();

    return (
      <StyledSlot
        $colorNumber={charMap[char?.id]?.tags.attribute}
        $isDragging={isDragging}
        $isEmpty={char?.id === undefined}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={ref}
      >
        {char?.id ? (
          <CharSlotContent
            char={char}
            index={index}
            handleSelectModalOpen={handleSelectModalOpen}
            handleCharDelete={handleCharDelete}
          />
        ) : (
          <EmptySlotContent onClick={handleSelectModalOpen}>
            {pageString.team.build.emptySlotText}
          </EmptySlotContent>
        )}
      </StyledSlot>
    );
  }
);

const StyledSlot = styled.div`
  position: relative;
  z-index: 1;
  left: 0.6rem;
  right: 0;
  width: calc(100% - 0.5rem);
  height: 5rem;
  margin: 0 0 0.6rem;
  span {
    white-space: pre;
    text-shadow: 0 0 2px ${(props) => props.theme.colors.surface},
      -2px 0 2px ${(props) => props.theme.colors.surface},
      2px 0 2px ${(props) => props.theme.colors.surface},
      0 -2px 2px ${(props) => props.theme.colors.surface},
      0 2px 2px ${(props) => props.theme.colors.surface},
      2px 2px 2px ${(props) => props.theme.colors.surface},
      2px -2px 2px ${(props) => props.theme.colors.surface},
      -2px 2px 2px ${(props) => props.theme.colors.surface},
      -2px -2px 2px ${(props) => props.theme.colors.surface};
  }
  &:before {
    content: "";
    position: absolute;
    left: -0.6rem;
    height: 100%;
    width: 0;
    border: 0.25rem solid transparent;
    border-right: 0.4rem solid
      ${(props) =>
        props.$colorNumber !== undefined
          ? props.theme.chart.colors[props.$colorNumber]
          : props.theme.colors.dropdownHover};
    border-left: 0;
    ${(props) =>
      props.$isDragging
        ? `border-top: none;
        border-bottom: none;`
        : ""}
    transition: border 0.3s ease;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid ${(props) => props.theme.colors.shadow + "80"};
    border-left: none;
    border-right: none;
    background: linear-gradient(
      180deg,
      ${(props) =>
        props.$isDragging
          ? props.theme.colors.surface
          : props.theme.colors.shadow + "0D"},
      ${(props) =>
        props.$isDragging
          ? props.theme.colors.shadow
          : props.theme.colors.shadow + "66"}
    );
    background-size: 100% 200%;
    clip-path: ${(props) =>
      props.$isEmpty
        ? "none"
        : `polygon(
            0 0,
            100% 0,
            100% calc(100% - 1.6rem),
            calc(14rem + 5%) calc(100% - 1.6rem),
            calc(12.6rem + 5%) 100%,0 100%
        )
        `};
  }
  &:hover {
    :before {
      border-top: none;
      border-bottom: none;
    }
    :after {
      background-size: 100% 100%;
    }
  }
  @media screen and (max-width: 768px) {
    margin: 0 0 ${(props) => (props.$isEmpty ? ".6" : "2.2")}rem;
    &:after {
      clip-path: none;
    }
    &:hover > div:last-child:after {
      background: ${(props) => props.theme.colors.shadow + "4D"};
    }
  }
`;
const EmptySlotContent = styled(Button)`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  && .MuiButton-label {
    position: absolute;
    top: 50%;
    left: calc(5rem + 4%);
    width: auto;
    height: 0;
    font-size: x-large;
    color: ${(props) => props.theme.colors.shadow};
    @media screen and (max-width: 768px) {
      left: calc(3.2rem + 3%);
      font-size: large;
    }
  }
  &:before {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: calc(0.2rem + 2%);
    content: "+";
    color: ${(props) => props.theme.colors.shadow};
    font-size: 4rem;
    line-height: 0;
    text-align: center;
    text-shadow: none;
  }
  &:after {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    content: "";
    width: 8rem;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.25) 25%,
      transparent
    );
  }
`;

export default CharSlot;
