const fs = require("fs");
const teamData = require("../src/data/team.json");

Object.entries(teamData.__collections__.teams).forEach(([key, data]) => {
  if (data.chapter === "S") {
    const stage = parseInt(data.stage.slice(2));
    if (stage < 20) {
      delete teamData.__collections__.teams[key];
      return true;
    }
    teamData.__collections__.teams[key].stage = "S-" + (stage - 20);
    teamData.__collections__.teams[key].characters.forEach(c => {
        if (c.level > stage - 1) {
            c.level = stage - 1
        }
    })
  }
});

fs.writeFile("./updated.json", JSON.stringify(teamData), (err) => {
  if (err) console.log(err);
});
