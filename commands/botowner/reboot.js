module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.config = {
      enabled: true,
      help: {
        name: "reboot",
        category: "Bot owner",
        usage: "reboot",
        description: "Herstart mij!",
        subCommands: ["herstart", "restart"]
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
        console.log(`${message.author.username} runt het command REBOOT in ${message.guild.name}...`);
      }
    }
  }
  async run(message, args) {
    let result = await this.client.functions.awaitmsg(message, "Weet je zeker dan je de bot wilt herstarten? Stuur **herstart** om mij te laten herstarten!");
    if (result !== "herstart") return message.reply("Ik herstart niet!");
    let msg = await message.channel.send("Ik ben aan het herstarten <a:loading:495125611753504769>");
    this.client.storage.set("reboot", {rebooting: true, start: Date.now(), ids: {guild: message.guild.id, channel: message.channel.id, message: msg.id}});
    setTimeout(function(){process.exit(1)}, 1000);
  }
  done() {
    return {
      run: (a, client) => {
        console.log(`Klaar met het runnen van het command #${client.storage.get("total.commandNumber")}!\n`);
      }
    }
  }
}
