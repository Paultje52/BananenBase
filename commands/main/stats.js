module.exports = class Command {
  constructor(client) {
    this.client = client;
    this.config = {
      enabled: true,
      help: {
        name: "stats",
        category: "Main",
        usage: "stats [servers/channels/users/emojis]",
        description: "Bekijk mijn statistieken!",
        subCommands: ["statistieken", "botstats"]
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
        console.log(`${message.author.username} runt het command STATS in ${message.guild.name}...`);
      }
    }
  }
  async run(message, args) {
    if (!args[0]) {
      this.totalSeconds = (this.client.uptime / 1000);
      this.hours = Math.floor(this.totalSeconds / 3600);
      this.totalSeconds %= 3600;
      this.minutes = Math.floor(this.totalSeconds / 60);
      this.seconds = Math.floor(this.totalSeconds % 60);
      this.shard = this.client.shard;
      if (this.shard === null) this.shard = "Geen shard systeem!";
      message.channel.send(
        new message.embed()
        .setTitle("Stats")
        .addField("__Online__", `Ik ben online voor **${this.hours} uren**, **${this.minutes} minuten** en **${this.seconds} seconden!**`)
        .addField("__Shard__", this.shard, true)
        .addField("__Memory__", `${Math.floor(process.memoryUsage().heapUsed/1024/1024)}MB in gebruik.`, true)
        .addField("__Bot__", `**Tag:** ${this.client.user.tag}\n**ID:** ${this.client.user.id}\n**Servers:** ${this.client.guilds.size}\n**Channels:** ${this.client.channels.size}\n**Users:** ${this.client.users.size}\n**Emojis:** ${this.client.emojis.size}`)
      );
    } else if (args[0].toLowerCase() === "servers") {
      this.thing = `- \`${this.client.guilds.map(g=>g.name).join("\`\n- \`")}\``;
      if (this.length > 2000) return message.channel.send(new message.embed("error").setError("Ik zit in teveel servers om te sturen!"));
      message.channel.send(`- \`${this.client.guilds.map(g=>g.name).join("\`\n- \`")}\``);
    } else if (args[0].toLowerCase() === "channels") {
      this.thing = `- \`${this.client.channels.map(g=>g.name).join("\`\n- \`")}\``;
      if (this.length > 2000) return message.channel.send(new message.embed("error").setError("Ik zit in teveel channels om te sturen!"));
      message.channel.send(`- \`${this.client.channels.map(g=>g.name).join("\`\n- \`")}\``);
    } else if (args[0].toLowerCase() === "users") {
      this.thing = `- \`${this.client.users.map(g=>g.tag).join("\`\n- \`")}\``;
      if (this.length > 2000) return message.channel.send(new message.embed("error").setError("Ik ken teveel users om te sturen!"));
      message.channel.send(`- \`${this.client.users.map(g=>g.tag).join("\`\n- \`")}\``);
    } else if (args[0].toLowerCase() === "emojis") {
      this.thing = `- \`${this.client.emojis.map(g=>g).join("\`\n- \`")}\``;
      if (this.length > 2000) return message.channel.send(new message.embed("error").setError("Ik ken teveel emojis om te sturen!"));
      message.channel.send(this.client.emojis.map(g=>g).join(" "));
    } else return message.channel.send(new message.embed("error").setError("Kies uit __servers__, __channels__, __users__ of __emojis__!"));
  }
  done() {
    return {
      run: (a, client) => {
        console.log(`Klaar met het runnen van command #${client.storage.get("total.commandNumber")}!\n`);
      }
    }
  }
}
