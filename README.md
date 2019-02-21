# BananenBase
Welcome on the github page of the official BananenBase NPM Package!

The BananenBase is a NodeJS framework for making discord bots. You can use it very easy. No need for making your own command handler or cloning one from github.

## Features
- Easy to use: Only one line of code required to setup and load everything
- Fast: Everything is optimised, so you can use a fast Discord bot
- Easy databases: Auto install databases and use them with a simple get/set
- Custom settings:
  - Guild - Every guild
  - Author - Every author, cross-guild
  - AuthorGuild - Every author, per guild
- Advanced command settings: Don't write 15 lines of code, only for checking if a user may run a command.
- Easy-to-use dashboard setup, with a simple discord login system

## Dependencies
- Discord.js - Connect to the Discord API
- Chalk - Color in the console
- Fsscanner - Scan dirs
- Moment - Time logs

## Examples

### Index.js
```js
const BananenBase = require("bananenbase");

new BananenBase({
  token: "BOTTOKEN",
  database: {
    package: "keyv",
    type: "sqlite",
    code: `${process.cwd()}/database.sqlite`
  },
  permissionLevels: [
    (message, args, client) => { // Permission level 0
      return true;
    }, (message, args, client) => { // Permission level 1
      if (client.config.botOwners.includes(message.author.id)) return true; // A bot owner
      else return false; // No bot owner
    }
  ],
  server: "server.js"
});
```

### Server.js
```js
module.exports = function(app, client) {
  app.get("/", (req, res) => { // Index: redirect to the auth page for your discord app
    res.sendDiscordLogin({
      clientID: "CLIENTID",
      redirect: "http://localhost:8080/callback"
    });
  });

  app.get("/callback", async (req, res) => { // Handling the discord login
    let output = await res.handleDiscordLogin({ // Requesting the token etc from the discord API
      clientID: "CLIENTID",
      clientSecret: "CLIENTSECRET",
      redirect: "http://localhost:8080/callback"
    });
    console.log(output); // Logs the userdata (including mail) and servers
  });
}
```

### commands/util/ping.js
```js
const command = require("bananenbase").command;

module.exports = class ping extends command {
  constructor(client) {
    super(client, {
      name: "ping", // The name of the command - The only thing that is required.
      description: "Ping-Pong", // The description of the command
      enabled: true, // Is the command enabled?
      category: "Main", // The category
      subcommands: ["pong"], // The subcommands
      args: ["thing: required", "other: optional"], // Uses the text before the :
      guildOnly: false // Use only on guilds?
    }, {
      permLevel: 0, // Permission level 0
      permissions: { // Required permissions
        me: ["MANAGE_MESSAGES"], // All the permissions that the bots needs to have
        user: ["MANAGE_MESSAGES"] // All the permissions that the user needs to have
      },
      func: (message, args, client) => { // Extra check
        return true;
      }
    });
  }
  
  async run(message, args) {
    let start = Date.now();
    let msg = await message.channel.send("Pinging...");
    msg.edit(`:ping_pong: ${Date.now()-start}ms`);
  }
}
