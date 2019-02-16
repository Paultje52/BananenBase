// Packages
const discord = require("discord.js");

// Export
module.exports = async (client, message) => {
  message.embed = () => {return new discord.RichEmbed()};

  let args;
  let command;
  if (client.pmPrefix) {
    if (!message.content.toLowerCase().startsWith(client.prefix)) return;
    args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();
  } else {
    args = message.content.split(/ +/g);
    command = args.shift().toLowerCase();
  }

  // Flags
  let arg = [];
  message.flags = [];
  args.forEach(ar => {
    if (ar.toLowerCase().startsWith("-")) message.flags.push(ar.split("-")[1].toLowerCase());
    else arg.push(ar);
  });
  args = arg;

  // Finding the command
  let cmd = client.commands.get(command) || client.subCommands.get(command);
  if (!cmd) return;

  // Checking if command is guild only
  if (cmd.guildOnly) return message.error("You can only use this command in guilds.");

  // CommandLevel
  this.cmdLevelCheck = client.config.permissionLevels[cmd.permLevel];
  if (this.cmdLevelCheck) await this.cmdLevelCheck(client, message, args, false);
  if (!this.cmdLevelCheck) return message.channel.send(message.embed().setTitle("No permission!").setDescription(`The **${this.cmd.help.name}** command requires permission level **${this.cmd.permLevel}**, but you don't have it!`));

  // Checking if the bot is restarting
  if (client.restarting) return message.error("The bot is restarting, use me later!");

  // Running the command
  if (cmd.prepare) await cmd.prepare(message, arg);
  if (cmd.runInPM) await cmd.runInPM(message, args, client);
  else await cmd.run(message, args, client);
  if (cmd.done) await cmd.done(message, args);
}
