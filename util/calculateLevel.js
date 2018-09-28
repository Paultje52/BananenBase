module.exports = class calculateLevel {
  constructor(client) {
    this.client = client;
  }
  server(message) {
    for (let i = 0; i < this.client.config.commandConfig.levels.server.length; i++) {
      let level = this.client.config.commandConfig.levels.server[i];
      if (!level.level.includes(message.guild.id)) return i;
      if (i === this.client.config.commandConfig.levels.server.length-1) return this.client.config.commandConfig.levels.server.length;
    }
  }
  user(message) {
    let totalRoleLevel = this.client.config.commandConfig.levels.user.length;
    totalRoleLevel = totalRoleLevel+1;
    if (this.client.config.botOwner.includes(message.author.id)) return this.client.config.commandConfig.levels.user.length+2;
    if (message.author.id === message.guild.owner.id) return totalRoleLevel;
    for (let i = 0; i < this.client.config.commandConfig.levels.user; i++) {
      let role = this.client.config.commandConfig.levels.user[i];
      if (!message.member.roles.some(r => role.includes(r.name))) return i;
      if (i === this.client.config.commandConfig.levels.user.length) return this.client.config.commandConfig.levels.user.length;
    }
  }
}
