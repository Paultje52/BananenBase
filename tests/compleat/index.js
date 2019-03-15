// Requireing the package
const BananenBase = require("bananenbase");

// Constructing the base
new BananenBase({
  token: "TOKEN", // Your bot token
  database: { // The database
    package: "json", // DO NOT USE JSON FOR PUBLIC BOTS! Use it only for testing.
    name: ".tmp_database.json"
  },
  language: "EN", // The language
  bot: (client) => {
    // Do things when the client is ready.
  },
  settings: true, // Enable the settings
  botConfig: { // Set the bot config, can also be a name of the file where the config is in
    botOwners: ["YourUserID"]
  },
  prefix: "!!", // The default prefix
  ignore: { // Ignore things?
    bot: false, // Don't ignore bots
    pm: false // Don't ignore PM messages
  },
  server: "server.js", // Enableing a server system?
  consoleFunctions: true, // Enable different console functions, like console.info and console.debug.
  permissionLevels: [ // Setting the different permission levels. If you don't add this, permission level 0 will allways return true.
    (client, message, args) => { // Permission level 0
      return true; // Return true = The user may run the command
      // Return false = The user may not run the command.
    }
  ],
  pmPrefix: false, // Do the users have to use the prefix in the PM?
  webPort: 10000 // The web port, default = 8080
});
