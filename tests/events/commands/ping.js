// Loading the command consturctor: the event part
const command = require("bananenbase").command.event;

let ping = new command({ // Making the command
  name: "ping" // The name of the command
});

// When the command is runned
ping.on("run", async (message, args, client) => {
  let start = Date.now();
  let msg = await message.channel.send("Pinging...");
  msg.edit(`:ping_pong: ${Date.now()-start}ms`);
});

// When the command is runned in PM
ping.on("runInPM", (message, args, client) => {
  message.channel.send("Run in PM!");
});

// exports
module.exports = ping;
