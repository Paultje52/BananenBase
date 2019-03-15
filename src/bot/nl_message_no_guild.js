// Packages
const discord = require("discord.js");

// Export
module.exports = async (client, message) => {
  message.embed = () => {return new discord.RichEmbed()};

  if (client.settings) {
    // Database loading: User settings
    message.author.dbId = `author-${message.author.id}`;
    message.author.settings = await client.db.get(message.author.dbId);
    if (!message.author.settings) message.author.settings = client.config.authorSettings;
    message.author.updateDB = async function() {
      await client.db.set(message.author.dbId, message.author.settings);
      return message.author.settings;
    }
    message.author.updateDB();
  }

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
  if (cmd.guildOnly) return message.error("Je kan dit commando alleen in een server gebruiken.");

  // CommandLevel
  this.cmdLevelCheck = client.config.permissionLevels[cmd.permLevel];
  if (this.cmdLevelCheck) await this.cmdLevelCheck(client, message, args, false);
  if (!this.cmdLevelCheck) return message.channel.send(message.embed()
    .setTitle("Geen permissie!")
    .setColor("#ff0000")
    .setDescription(`Het commando **${this.cmd.help.name}** heeft permissie level **${this.cmd.permLevel}** nodig, maar die heb jij niet!`)
  );

  // Checking if the bot is restarting
  if (client.restarting) return message.error("De bot is opnieuw aan het opstarten, probeer het later nog een keer!");

  // Running the command
  if (cmd.prepare) await cmd.prepare(message, arg);
  if (cmd.runInPM) await cmd.runInPM(message, args, client);
  else await cmd.run(message, args, client);
  if (cmd.done) await cmd.done(message, args);
}
