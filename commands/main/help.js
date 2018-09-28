module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.config = {
      enabled: true,
      help: {
        name: "help",
        category: "Main",
        usage: "help [command/categorie]",
        description: "Krijg hulp met een command!",
        subCommands: ["h", "?"]
      },
      permissions: {
        me: ["basicPermissions"],
        user: ["basicPermissions"]
      },
      levels: {
        server: 0,
        user: 0
      },
      extraCheck: (message, client) => {
        return true;
      }
    }
  }
  prepare() {
    return {
      message: (message) => {
        return `**${message.author.username},** ik laat het help command!`
      },
      // startTyping: true,
      run: (message) => {
        console.log(`${message.author.username} runt het command HELP in ${message.guild.name}...`);
      }
    }
  }
  async run(message, args) {
    if (!args[0]) {
      let cmd = {data: {}, names: []};
      await message.commands.commands.forEach(command => {
        if (message.check.help(command.config, message)) {
          if (!cmd.data[command.config.help.category]) {
            cmd.data[command.config.help.category] = `\`${this.client.config.prefix}${command.config.help.usage}\`\n`;
            cmd.names.push(command.config.help.category);
          } else cmd.data[command.config.help.category] += `\`${this.client.config.prefix}${command.config.help.usage}\`\n`;
        }
      });
      let embed = new message.embed().setTitle("Help").setDescription("Alles met **<>** is verplicht. Alles met **[]** is optioneel!");
      for (let i = 0; i < cmd.names.length; i++) {
        embed.addField(`**__${cmd.names[i]}__**`, cmd.data[cmd.names[i]], true);
      }
      message.channel.send(embed);
    } else {
      let cmd = this.client.commands.commands.get(args[0].toLowerCase()) || this.client.commands.subCommands.get(args[0].toLowerCase());
      if (cmd && message.check.help(cmd.config, message)) {
        let subCommands = "";
        if (cmd.config.help.subCommands.length === 0) subCommands += "Geen subCommands!";
        cmd.config.help.subCommands.forEach(subCommand => {
          subCommands+= `\n- ${subCommand}`;
        });
        message.channel.send(new message.embed().setTitle(cmd.config.help.name).setDescription(`Categorie: **${cmd.config.help.category}**\nGebruik: **${cmd.config.help.usage}**\nBeschrijving: **${cmd.config.help.description}**\nSub commands (**${cmd.config.help.subCommands.length}**):${subCommands}`))
      } else {
        let commands = "";
        await this.client.commands.commands.forEach(async (command) => {
          if (command.config.help.category.toLowerCase() !== args.join(" ").toLowerCase()) {
            if (message.check.help(command.config, message)) {
              commands+=`\`${this.client.config.prefix}${command.config.help.usage}\` - ${command.config.help.description}\n`;
            }
          }
        });
        if (commands.length === 0) return message.channel.send(new message.embed("error").setError("Geen commands of categorieën gevonden!"));
        message.channel.send(new message.embed().setTitle(args.join(" ")).setDescription(commands));
      }
    }
  }
  done() {
    return {
      deleteMessage: true,
      // stopTyping: true,
      run: (a, client) => {
        console.log(`Klaar met het runnen van command #${client.storage.get("total.commandNumber")}!\n`);
      }
    }
  }
}
