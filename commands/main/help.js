const Discord = require("discord.js");
exports.run = async (client) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  let capitalizeFirstLetter = client.function.capitalizeFirstLetter;
  let cmds = "";
  let i;
  let prefix;
  if (message.channel.type === "dm") prefix = config.main.prefix;
  else prefix = data.get("prefix");
  if (!args[0]) {
    let cmdDingen = {};
    cmdDingen.name = {};
    cmdDingen.data = {};
    cmdDingen.overige = [];
    await client.commands.forEach(async (command) => {
      client.message = message;
      client.cmd = command;
      let value = await permChecker.check("help", client);
      if (value !== true) return;
      cmdDingen.name[command.help.category] = command.help.category;
      if (!cmdDingen.data[command.help.category]) {
        cmdDingen.data[command.help.category] = `\`${prefix}${command.help.usage}\`\n`;
        cmdDingen.overige.push(command.help.category);
      } else {
        cmdDingen.data[command.help.category] += `\`${prefix}${command.help.usage}\`\n`;
      }
    });
    let embed = new Discord.RichEmbed().setTitle("Help").setColor("#00ff00").setDescription(`**<>** is verpicht. **[]** is optioneel.`);
    for (i = 0; i < Object.keys(cmdDingen.data).length; i++) {
      let name = await capitalizeFirstLetter.run(client, cmdDingen.overige[i]);
      let commands = await capitalizeFirstLetter.run(client, cmdDingen.data[cmdDingen.overige[i]]);
      embed.addField(`__${name}__`, commands, true);
    }
    message.channel.send(embed);
  } else {
    let cmd = client.commands.get(args[0]);
    if (cmd === undefined) cmd = client.subCommands.get(args[0]);
    if (cmd) {
      for (i = 0; i < cmd.help.extraCommands.length; i++) {
        cmds += `**- **\`${cmd.help.extraCommands[i]}\`\n`;
      }
      message.channel.send({embed: new Discord.RichEmbed().setTitle("Help").setColor("#00ff00").setDescription(`**<>** is verpicht. **[]** is optioneel.\nHelp voor het command **${args[0]}**:\n**Naam:** ${cmd.help.name}\n**Gebruik:** \`${prefix}${cmd.help.usage}\`\n**Beschrijving:** ${cmd.help.description}\n**Categorie:** ${cmd.help.category}\n**Extra commands (${cmd.help.extraCommands.length}):** \n${cmds}`)});
    } else {
      await client.commands.filter(c => args[0].toLowerCase() === c.help.category.toLowerCase()).forEach(async (command) => {
        client.message = message;
        client.cmd = command;
        let value = await permChecker.check("help", client);
        if (value !== true) return;
        cmds += `\`${prefix}${command.help.usage}\` - **${command.help.description}**\n`;
      });
      if (cmds === "") return message.reply("geen command/category gevonden!");
      message.channel.send({embed: new Discord.RichEmbed().setTitle("Help").setColor("#00ff00").setDescription(`**<>** is verpicht. **[]** is optioneel.\nHelp voor de categorie **${args[0]}**:\n\n${cmds}`)});
    }
  }
}
exports.help = {
  name: "help",
  usage: "help <command>",
  description: "Krijg hulp met de bot!",
  category: "main",
  extraCommands: ["?"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
