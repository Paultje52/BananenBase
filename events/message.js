exports.run = async (client, message) => {
  const permChecker = require("permChecker");
  if (message.author.bot) return;

  const settingsBestand = require("../guildSettings.js");
  client.guild = await settingsBestand.run(client, message);

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (client.guild === true && !command.toLowerCase().startsWith(client.data.get(`${message.guild.id}.prefix`))) return;
  if (client.guild === false && !command.toLowerCase().startsWith("!")) return;

  if (client.guild === true) {
    let cmd = client.commands.get(command.slice(client.data.get(`${message.guild.id}.prefix`).length));
    if (cmd) {
      client.message = message;
      client.args = args;
      client.cmd = cmd;
      permChecker.check("run", client);
    }
  } else {
    let cmd = client.commands.get(command.slice(1));
    if (cmd) {
      client.message = message;
      client.args = args;
      client.cmd = cmd;
      permChecker.check("run", client);
    }
  }
}
exports.config = {
  enable: true
}
