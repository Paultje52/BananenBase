// Run on start
require("./runOnStart.js")();

// Packages
const bananenbaseClient = require("./util/client.js");

// Client
let client = new bananenbaseClient({
  disableEveryone: true,
  messageCacheMaxSize: 100,
  messageCacheLifetime: 240,
  messageSweepInterval: 300,
  autoReconnect: true
});
