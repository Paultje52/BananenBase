module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.config = {
      enabled: true,
      help: {
        name: "ping",
        category: "Main",
        usage: "ping",
        description: "Test mijn reactiesnelheid!",
        subCommands: []
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
        console.log(`${message.author.username} runt het command PING in ${message.guild.name}...`);
      }
    }
  }
  async run(message, args) {
    this.start = Date.now();
    this.msg = await message.channel.send("Pinging...");
    this.msg.edit(`:ping_pong: Reactietijd: **${Math.floor((Date.now()-this.start)-this.client.ping)}ms**\n:blue_heart: DiscordAPI: **${Math.floor(this.client.ping)}ms**`);
  }
  done() {
    return {
      run: (a, client) => {
        console.log(`Klaar met het runnen van command #${client.storage.get("total.commandNumber")}!\n`);
      }
    }
  }
}
