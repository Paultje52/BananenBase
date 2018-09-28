const scan = require("fsscanner");

module.exports = class Event {
  constructor(client) {
    this.client = client;
    this.config = {
      enabled: true,
      name: "ready"
    }
  }
  async run(commands, ...args) {
    console.log(`\nIk ben online als ${this.client.user.username}!\n\n\n\n\n`);

    if (this.client.storage.has("reboot")) {
      this.start = this.client.storage.get("reboot");
      if (!this.start.rebooting) return;
      this.guild = this.client.guilds.find("id", this.start.ids.guild);
      this.channel = this.guild.channels.find("id", this.start.ids.channel);
      this.messages = await this.channel.fetchMessages({limit: 50});
      this.messages.forEach(message => {
        if (message.id === this.start.ids.message) message.edit(`Succesvol herstart in **${Date.now() - this.start.start}ms**!`);
      });
      this.client.storage.delete("reboot");
    }
  }
}
