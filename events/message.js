exports.run = async (client, message) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  if (message.author.bot) return;

  const settingsBestand = require("../guildSettings.js");
  client.guild = await settingsBestand.run(client, message);

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (client.guild === true && !command.toLowerCase().startsWith(client.data.get(`prefix`))) return;
  if (client.guild === false && !command.toLowerCase().startsWith(client.config.main.prefix)) return;

  if (client.guild === true) {
    let cmd1 = client.commands.get(command.slice(client.data.get(`prefix`).length));
    let cmd2 = client.subCommands.get(command.slice(client.data.get(`prefix`).length));
    if (cmd1 || cmd2) {
      client.message = message;
      client.args = args;
      client.cmd = cmd1;
      if (client.cmd === undefined) client.cmd = cmd2;
      permChecker.check("run", client);
    }
  } else {
    let cmd1 = client.commands.get(command.slice(client.config.main.prefix));
    let cmd2 = client.subCommands.get(command.slice(client.config.main.prefix));
    if (cmd1 || cmd2) {
      client.message = message;
      client.args = args;
      client.cmd = cmd1;
      if (client.cmd === undefined) client.cmd = cmd2;
      permChecker.check("run", client);
    }
  }
}
exports.config = {
  enable: true
}
