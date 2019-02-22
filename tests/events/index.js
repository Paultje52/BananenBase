// Requireing the package
const BananenBase = require("bananenbase");

// Constructing the base
new BananenBase({
  token: "TOKEN", // Your bot token
  database: { // The database
    package: "json", // DO NOT USE JSON FOR PUBLIC BOTS! Use it only for testing.
    name: ".tmp_database.json"
  }
});
