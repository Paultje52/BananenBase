// De package inladen
const BananenBase = require("bananenbase");

// De basis maken
new BananenBase({
  token: "TOKEN", // Your discord bot token
  database: { // De database
    package: "json", // GEBRUIK NOOIT JSON VOOR BOTS DIE JE NIET AAN HET TESTEN BENT!
    name: ".tmp_database.json"
  },
  language: "NL" // De taal "Nederlands"
});
