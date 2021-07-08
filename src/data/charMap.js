const charData = require("./character.json");

const charMap = charData.reduce((map, c) => {
  const { id, ...rest } = c;
  map[id] = rest;
  return map;
}, {});

module.exports = charMap;
