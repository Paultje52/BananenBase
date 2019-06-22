# BananenBase
Welcome on the github page of the official BananenBase NPM Package!

The BananenBase is a NodeJS framework for making discord bots. You can use it very easy. No need for making your own command handler or cloning one from github.

## Features
- Easy to use: Only one line of code required to setup and load everything
- Fast: Everything is optimised, so you can make a fast Discord bot
- Easy databases: Auto install databases and use them with a simple get/set
- Custom settings:
  - Guild - Every guild
  - Author - Every author, cross-guild
  - AuthorGuild - Every author, per guild
- Advanced command settings: Don't write 15 lines of code, only for checking if a user may run a command.
- Easy-to-use dashboard setup, with a simple discord login system

## Dependencies
_Those dependencies are installed automatically_
- Discord.js - Connect to the Discord API
- Chalk - Color in the console
- Fsscanner - Scan dirs
- Moment - Time logs

## Todo
**Version 3.3.0**
- [ ] Include setup file (auto generate settings with some options) and install package file if no packages are installed (For things like petrodolcy) 
- [ ] Update dependencies in [package.json](package.json)
- [ ] Trigger commands on message edit (option, by default false)
- [ ] Better error handling

**Version 3.3.1**
- [ ] Easy to make logs: Just a simple option to specify which types of logs you want and in which channel you want it (Can also be changed in the database when set to)

**Version 3.3.2**
- [ ] Compleat docs (including API reference) in Github Wiki

**Version 3.4.0**
- [ ] Easy session cookie handling for the dashboard (check if an user is logged in, if not, send he/she to the login page and logout support)
- [ ] Load all the settings of an user (guild settings that he/she can acces, user settings and for each guild the user settings) with **one function**
- [ ] Run the dashboard without setting up the discord bot! That means that you can use the BananenBase also for a NodeJS website!

## Examples
Read more examples [here](/tests).

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
    (client, message, args) => { // Permission level 0
      return true;
    }, (client, message, args) => { // Permission level 1
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
      func: (client, message, args) => { // Extra check
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
