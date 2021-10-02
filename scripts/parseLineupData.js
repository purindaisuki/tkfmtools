const calcCharStats = require("../src/utils/calcCharStats");
const lineups = require("../src/data/lineup_raw_data.json");
const gtagLineups = require("../src/data/line_up_data_gtag.json");
const charData = require("../src/data/character.json");
const fs = require("fs");

const data = lineups.reduce((newData, lineup) => {
  let total = 0;
  let neko = lineup.find((c) => c.id === "302");
  let aiko = lineup.find((c) => c.id === "209");

  if (!neko || !aiko) return newData;
  neko = calcCharStats(neko);
  if (neko.ATK * neko.HP < 2207534) return newData;
  aiko = calcCharStats(aiko);
  if (aiko.ATK * aiko.HP < 2563120) return newData;

  lineup.forEach((c) => {
    const { ATK, HP } = calcCharStats(c);
    const cp = ATK * HP;
    total += cp;
    if (!newData[c.id]) {
      newData[c.id] = [];
    }
    newData[c.id].push(cp);
  });

  newData.total.push(total);
  return newData;
}, gtagLineups);

charData.forEach((c) => {
  if (!Object.keys(data).includes(c.id)) {
    data[c.id] = [];
  }
});

Object.values(data).forEach((c) => c.sort((a, b) => a / 1000000 - b / 1000000));

fs.writeFile("./src/data/line_up_data.json", JSON.stringify(data), (err) => {
  if (err) console.log(err);
});
