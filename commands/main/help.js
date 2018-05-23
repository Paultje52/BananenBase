const Discord = require("discord.js");
exports.run = async (client, message, args, data, config, queue) => {
  if (args[0] == "test") {
    await client.category.forEach(category => {
      await category.forEach(command => {
        console.log(`${category} => ${command.name.}`);
      })
    })
    await return;
  }
  if (!args[0]) {
    let prefix = data.get(`${message.guild.id}.prefix`)
    let embed = new Discord.RichEmbed()
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
