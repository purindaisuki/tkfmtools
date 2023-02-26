import charMap from "data/charMap";

const getInitCharState = (charId) => {
  const { rarity } = charMap[charId];

  return {
    id: charId,
    level: "",
    star: !charId ? "" : rarity,
    bond: 1,
    discipline: !charId ? "" : rarity === 0 ? "-" : 0,
    potential: 1,
    potentialSub: Array(6).fill(false),
  };
};

export default getInitCharState;
