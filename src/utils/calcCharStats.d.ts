interface CalcCharacterPotentialArgs {
  id: string;
  from: [number, number];
  to: [number, number];
  potentialType: number;
}

declare const calcCharPotential: ({
  id,
  from,
  to,
  potentialType,
}: CalcCharacterPotentialArgs) => {
  items: { [key: string]: number };
  money: number;
  buff: { ATK: number; HP: number; PASSIVE: number };
};

export const calcCharPotential;

interface CalcCharacterStatsArgs {
  id: string;
  level: number;
  potential: number;
  potentialSub: boolean[];
  discipline: string | number;
  star: number;
}

declare const calcCharStats: ({
  id,
  level,
  potential,
  potentialSub,
  discipline,
  star,
}: CalcCharacterStatsArgs) => { ATK: number; HP: number };

export default calcCharStats;
