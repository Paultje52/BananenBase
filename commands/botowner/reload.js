const scan = require("fsscanner");

module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.config = {
      enabled: true,
      help: {
        name: "reload",
        category: "Bot owner",
        usage: "reload <command>",
        description: "Herlaat een command!",
        subCommands: ["rl", "herlaat", "r"]
      },
      permissions: {
        me: ["basicPermissions"],
        user: ["basicPermissions", "BOT_OWNER"]
      },
      levels: {
        server: 0,
        user: 5
      },
      extraCheck: (message, client) => {
        return true;
      }
    }
  }
  prepare() {
    return {
      run: (message) => {
        console.log(`${message.author.username} runt het command RELOAD in ${message.guild.name}...`);
      }
    }
  }
  async run(message, args) {
    if (!args[0]) return message.channel.send(new message.embed("error").setError("Je moet een command of `all` opgeven!"));
    if (args[0].toLowerCase() === "all") {
      await this.client.commands.commands.forEach(command => {
        delete require.cache[require.resolve(`../${command.config.help.dir}`)];
      });
      this.client.commands.commands.clear();
      this.client.commands.subCommands.clear();
      scan.scan("./commands", [scan.criteria.pattern(".js"), scan.criteria.type("F")], (err, results) => {
        if (err) throw err;
        if (!results) results = [];
        results.forEach(result => {
          let c = require(`../../${result}`);
          c = new c(this.client);
          if (c.config.enabled === true) {
            c.config.help.dir = `../${result}`;
            this.client.commands.commands.set(c.config.help.name, c);
            c.config.help.subCommands.forEach(subCommand => {
              this.client.commands.subCommands.set(subCommand, c);
            });
          }
        });
        message.channel.send(`**${results.length}** commands zijn herladen!`);
      });
    } else {
      let cmd = this.client.commands.commands.get(args[0].toLowerCase()) || this.client.commands.subCommands.get(args[0].toLowerCase());
      if (!cmd) return message.channel.send(new message.embed("error").setError("Geen command gevonden!"));
      delete require.cache[require.resolve(`../${cmd.config.help.dir}`)];
      this.client.commands.commands.delete(cmd.config.help.name);
      let command = require(`../${cmd.config.help.dir}`);
      command = new command(this.client);
      command.config.help.dir = cmd.config.help.dir;
      this.client.commands.commands.set(command.config.help.name, command);
      message.channel.send(`Het command **${command.config.help.name}** is herladen!`);
    }
  }
  done() {
    return {
      run: (a, client) => {
        console.log(`Klaar met het runnen van het command #${client.storage.get("total.commandNumber")}!\n`);
      }
    }
  }
}
