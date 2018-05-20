exports.run = (client, data, config, start, message, queue) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("Je kunt me alleen in een server gebruiken!");

  const settingsBestand = require("../guildSettings.js");
  settingsBestand.run(config, data, message);

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (!command.startsWith(data.get(`${message.guild.id}.prefix`))) return;

  let cmd = client.commands.get(command.slice(data.get(`${message.guild.id}.prefix`).length));
  if (cmd) cmd.run(client, message, args, data, config, queue);
}

exports.config = {
  enable: true
}
