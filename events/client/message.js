module.exports = class Event {
  constructor(client) {
    this.client = client;
    this.config = {
      enabled: true,
      name: "message"
    }
  }
  async run(commands, message) {
    message.embed = require("../../util/embed.js");
    message.calculateLevel = require("../../util/calculateLevel.js");
    message.calculateLevel = new message.calculateLevel(this.client);
    message.check = require("../../util/check.js");
    message.commandPrepareDone = require("../../util/commandPrepareDone.js");
    message.check = new message.check(this.client, message.calculateLevel);
    message.commands = commands;
    message.commandPrepareDone = new message.commandPrepareDone(this.client, message);

    if (this.client.config.igrone.bot === true && message.author.bot) return;
    if (this.client.config.igrone.pm === true && message.channel.type === "dm") {
      if (this.client.config.igrone.bot === true) return message.channel.send(new message.embed("error").setError("Je kunt mij niet in DM gebruiken"));
      else return;
    }

    this.client.storage.math("total.messageNumber", "+", 1);
    this.client.storage.math("session.messageNumber", "+", 1);

    message.args = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
    message.command = message.args.shift().toLowerCase();
    message.mentions = {
      user: message.mentions.users.first(),
      member: message.mentions.members.first() || message.guild.members.get(message.args[0]),
      role: message.mentions.roles.first() || message.guild.roles.get(message.args[0]),
      channel: message.mentions.channels.first() || message.guild.channels.get(message.args[0])
    };

    let command = message.commands.commands.get(message.command) || message.commands.subCommands.get(message.command.toString());
    if (!command) return;
    if (message.check.command(command.config, message) !== true) return;

    this.client.storage.math("total.commandNumber", "+", 1);
    this.client.storage.math("session.commandNumber", "+", 1);

    await message.commandPrepareDone.use(command.prepare());
    await command.run(message, message.args);
    await message.commandPrepareDone.use(command.done());
  }
}
