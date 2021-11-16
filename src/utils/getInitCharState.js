const getInitCharState = (charId) => ({
  id: charId,
  level: "",
  star: !charId ? "" : 4 - parseInt(charId[0]),
  bond: 1,
  discipline: !charId ? "" : charId[0] === "4" ? "-" : 0,
  potential: 1,
  potentialSub: Array(6).fill(false),
});

export default getInitCharState;
