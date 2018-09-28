const scan = require("fsscanner");

module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.config = {
      enabled: true,
      help: {
        name: "test",
        category: "Main",
        usage: "test",
        description: "Test een functie!",
        subCommands: ["t"]
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
      run: (message) => {
        console.log(`${message.author.username} runt het command TEST in ${message.guild.name}...`);
      }
    }
  }
  async run(message, args) {
    message.channel.send(this.client.functions.test());
  }
  done() {
    return {
      run: (a, client) => {
        console.log(`Klaar met het runnen van het command #${client.storage.get("total.commandNumber")}!\n`);
      }
    }
  }
}
