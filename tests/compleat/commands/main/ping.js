// Loading in the command consturctor
const command = require("bananenbase").command;

// Exporting the class
module.exports = class ping extends command {
  constructor(client) { // When the command is being constructed
    super(client, { // Construct the command properly with the command constructor.
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

  async run(message, args) { // When a user runs the command.
    let start = Date.now();
    let msg = await message.channel.send("Pinging...");
    msg.edit(`:ping_pong: ${Date.now()-start}ms`);
  }
}
