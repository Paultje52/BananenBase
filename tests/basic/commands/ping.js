// Loading the command consturctor
const command = require("bananenbase").command;

// The command class
module.exports = class ping extends command {
  constructor(client) { // Constructor, the discord.js client will be with it.
    super(client, { // Making a valid command with the command constructor.
      name: "ping" // The name of the command - The only thing that is required.
    });
  }

  async run(message) { // When the command is runned. You can use here the parameters message, args, client
    let start = Date.now();
    let msg = await message.channel.send("Pinging...");
    msg.edit(`:ping_pong: ${Date.now()-start}ms`);
  }
}
