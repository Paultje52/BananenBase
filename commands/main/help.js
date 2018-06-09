const Discord = require("discord.js");
exports.run = async (client) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  console.log(client.function.getInI(client, "1"));
  if (!args[0]) {
    if (client.guild === true) {
      let prefix = data.get(`${message.guild.id}.prefix`);
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
      let prefix = data.get(`${message.guild.id}.prefix`);
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
            let prefix = data.get(`${message.guild.id}.prefix`);
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
            let prefix = data.get(`${message.guild.id}.prefix`);
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
  usage: "help [command]",
  description: "Krijg hulp met de bot!",
  category: "main"
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
