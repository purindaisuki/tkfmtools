import { useCallback, useState } from "react";
import calcCharStats from "utils/calcCharStats";
import charMap from "data/charMap";

const getCharStatsValue = (charState) => {
  if (typeof charState.potentialSub !== "object") {
    const newPotentialSub = [...Array(6).keys()].map(
      (i) => i < charState.potentialSub
    );
    charState.potentialSub = newPotentialSub;
  }

  return calcCharStats({
    ...charState,
    level: charState.level === "" ? "-" : charState.level,
    discipline: charState.discipline === "-" ? 0 : charState.discipline,
    ...charMap[charState.id].stats,
  });
};

const useCharacterStats = (initCharState) => {
  const [stats, setStats] = useState(getCharStatsValue(initCharState));

  const setCharacterStats = useCallback(
    (charState) => setStats(getCharStatsValue(charState)),
    []
  );

  return [stats, setCharacterStats];
};

export default useCharacterStats;
