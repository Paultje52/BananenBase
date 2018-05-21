const Discord = require("discord.js");
exports.run = async (client, message, args, data, config, queue) => {
  if (!args[0]) {
    let prefix = data.get(`${message.guild.id}.prefix`)
    let embed = new Discord.RichEmbed()
    // .setDescription(`**<>** Verplicht\n**[]** Niet verplict\n\n**${prefix}help**\n*Open dit helpmenu*\n**${prefix}shop <sub categorie> <voorwerp> [aantal]**\n*Koop iets*\n**${prefix}inv [gebruiker]**\n*Open jouw of iemand anders inventory*\n**${prefix}level**\n*Bekijk jouw level en XP*\n**${prefix}open <pack> [aantal]**\n*Open een pack voor rewards*\n**${prefix}pay <gebruiker> <aantal>**\n*Geef een gebruiker een bepaald aantal geld*\n**${prefix}trade <gebruiker> <pack> [aantal]**\n*Geef een gebruiker een bepaald aantal packs*\n**${prefix}beveiliging <niveau> <tijd in uren>**\n*Koop een beveiliging tegen de dieven*`)
    .setTitle("Help")
    .setColor("#00ff00")
    let cmds = '';
    await client.commands.forEach(command => {
      cmds += `\`${prefix}${command.help.usage}\` - **${command.help.description}**\n`
    });
    embed.setDescription(`**<>** Verplicht\n**[]** Niet verplicht\n\n${cmds}`);
    message.channel.send(embed);
  } else {
    try {
      let cmd = client.commands.get(args[0]);
      let embed = new Discord.RichEmbed()
      .setDescription(`Command: **${cmd.help.name}**\nGebruik: **${data.get(`${message.guild.id}.prefix`)}${cmd.help.usage}**\nBeschrijving: **${cmd.help.description}**\nCategorie: **${cmd.help.category}**`)
      .setColor("#42f1f4")
      .setTitle(`Help: ${args[0]}`);
      message.channel.send(embed);
    } catch(err) {
      return message.reply(`ik heb het command **${args[0]}** niet kunnen vinden!`);
    }
  }
}
exports.help = {
  name: "help",
  usage: "help [command]",
  description: "Krijg hulp over de bot!",
  category: "main"
}
