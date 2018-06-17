const Discord = require("discord.js");
exports.run = async (client) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  let capitalizeFirstLetter = client.function.capitalizeFirstLetter;
  let cmdData = {};
  let cmdName = {};
  let cmd = [];
  if (!args[0]) {
    if (client.guild === true) {
      let prefix = data.get(`prefix`);
      let embed = new Discord.RichEmbed()
        .setTitle("Help")
        .setColor("#00ff00")
      await client.commands.forEach(async (command) => {
        client.message = message;
        client.cmd = command;
        let value = await permChecker.check("help", client);
        if (value !== true) return;
        cmdName[command.help.category] = command.help.category;
        if (!cmdData[command.help.category]) {
          cmdData[command.help.category] = `\`${prefix}${command.help.usage}\`\n`;
          cmd.push(command.help.category);
        } else {
          cmdData[command.help.category] += `\`${prefix}${command.help.usage}\`\n`;
        }
      });
      embed.setDescription(`**<>** Verplicht\n**[]** Niet verplicht`);
      let i;
      for (i = 0; i < Object.keys(cmdData).length; i++) {
        let name = await capitalizeFirstLetter.run(client, cmd[i]);
        let commands = await capitalizeFirstLetter.run(client, cmdData[cmd[i]]);
        embed.addField(name, commands, true);
      }
      message.channel.send(embed);
    } else {
      let prefix = "!";
      let embed = new Discord.RichEmbed()
        .setTitle("Help")
        .setColor("#00ff00")
      let cmds = '';
      await client.commands.forEach(async (command) => {
        client.message = message;
        client.cmd = command;
        let value = await permChecker.check("help", client);
        if (value !== true) return;
        cmds += `\`${prefix}${command.help.usage}\` - **${command.help.description}**\n`
      });
      embed.setDescription(`**<>** Verplicht\n**[]** Niet verplicht\n\n${cmds}`);
      message.channel.send(embed);
    }
  } else {
    if (client.guild === true) {
      let prefix = data.get(`prefix`);
      let embed = new Discord.RichEmbed()
        .setTitle(`Help: Categorie ${args[0]}`)
        .setColor("#00ff00")
      let cmds = '';
      await client.commands.filter(c=>c.help.category.toLowerCase() === args[0]).forEach(async (command) => {
        client.message = message;
        client.cmd = command;
        let value = await permChecker.check("help", client);
        if (value !== true) return;
        cmds += `\`${prefix}${command.help.usage}\` - **${command.help.description}**\n`
      });
      if (cmds === '') {
        try {
          if (client.guild === true) {
            let prefix = data.get(`prefix`);
            let cmd = client.commands.get(args[0]);
            let value = await permChecker.check("help", client);
            if (value !== true) return;
            let embed = new Discord.RichEmbed()
              .setDescription(`Command: **${cmd.help.name}**\nGebruik: **${prefix}${cmd.help.usage}**\nBeschrijving: **${cmd.help.description}**\nCategorie: **${cmd.help.category}**`)
              .setColor("#00ff00")
              .setTitle(`Help: ${args[0]}`);
            message.channel.send(embed);
          } else {
            let prefix = "!";
            let cmd = client.commands.get(args[0]);
            let value = await permChecker.check("help", client);
            if (value !== true) return;
            let embed = new Discord.RichEmbed()
              .setDescription(`Command: **${cmd.help.name}**\nGebruik: **${prefix}${cmd.help.usage}**\nBeschrijving: **${cmd.help.description}**\nCategorie: **${cmd.help.category}**`)
              .setColor("#00ff00")
              .setTitle(`Help: command ${args[0]}`);
            message.channel.send(embed);
          }
        } catch (err) {
          return message.reply(`ik heb het command/categorie **${args[0]}** niet kunnen vinden!`);
        }
      } else {
        embed.setDescription(`**<>** Verplicht\n**[]** Niet verplicht\n\n${cmds}`);
        message.channel.send(embed);
      }
    } else {
      let prefix = "!";
      let embed = new Discord.RichEmbed()
        .setTitle(`Help: Categorie ${args[0]}`)
        .setColor("#00ff00")
      let cmds = '';
      await client.commands.filter(c=>c.help.category.toLowerCase() === args[0]).forEach(async (command) => {
        client.message = message;
        client.cmd = command;
        let value = await permChecker.check("help", client);
        if (value !== true) return;
        cmds += `\`${prefix}${command.help.usage}\` - **${command.help.description}**\n`
      });
      if (cmds === '') {
        try {
          if (client.guild === true) {
            let prefix = data.get(`prefix`);
            let cmd = client.commands.get(args[0]);
            let value = await permChecker.check("help", client);
            if (value !== true) return;
            let embed = new Discord.RichEmbed()
              .setDescription(`Command: **${cmd.help.name}**\nGebruik: **${prefix}${cmd.help.usage}**\nBeschrijving: **${cmd.help.description}**\nCategorie: **${cmd.help.category}**`)
              .setColor("#00ff00")
              .setTitle(`Help: ${args[0]}`);
            message.channel.send(embed);
          } else {
            let prefix = "!";
            let cmd = client.commands.get(args[0]);
            let value = await permChecker.check("help", client);
            if (value !== true) return;
            let embed = new Discord.RichEmbed()
              .setDescription(`Command: **${cmd.help.name}**\nGebruik: **${prefix}${cmd.help.usage}**\nBeschrijving: **${cmd.help.description}**\nCategorie: **${cmd.help.category}**`)
              .setColor("#00ff00")
              .setTitle(`Help: ${args[0]}`);
            message.channel.send(embed);
          }
        } catch (err) {
          return message.reply(`ik heb het command/categorie **${args[0]}** niet kunnen vinden!`);
        }
      } else {
        embed.setDescription(`**<>** Verplicht\n**[]** Niet verplicht\n\n${cmds}`);
        message.channel.send(embed);
      }
    }
  }
}
exports.help = {
  name: "help",
  usage: "help <command>",
  description: "Krijg hulp met de bot!",
  category: "main",
  extraCommands: ["h"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
