exports.run = (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send("Je kunt me alleen in een server gebruiken!");

  const settingsBestand = require("../guildSettings.js");
  settingsBestand.run(client.config, client.data, message);

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (!command.startsWith(client.data.get(`${message.guild.id}.prefix`))) return;

  let cmd = client.commands.get(command.slice(client.data.get(`${message.guild.id}.prefix`).length));
  if (cmd) {
    if (!cmd.help.enable && !cmd.help && cmd.help.enable !== true) return;
    cmd.run(client, message, args);
  }
}
exports.config = {
  enable: true
}
