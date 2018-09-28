module.exports = class Checker {
  constructor(client) {
    this.client = client;
  }

  help(cmd, message) {
    if (!cmd.enabled) return false;
    cmd.permissions.me.forEach(permission => {
      if (permission === "basicPermissions") {
        this.client.config.commandConfig.basicPermissions.me.forEach(perm => {
          if (!message.channel.permissionsFor(message.guild.me).has(perm)) return false;
        });
      } else if (!message.channel.permissionsFor(message.guild.me).has(permission)) return false;
    });
    cmd.permissions.user.forEach(permission => {
      if (permission === "basicPermissions") {
        this.client.config.commandConfig.basicPermissions.user.forEach(perm => {
          if (!message.channel.permissionsFor(message.member).has(perm)) return false;
        });
      } else if (permission === "BOT_OWNER") {
        if (!this.client.config.botOwner.includes(message.author.id)) return false;
      } else if (!message.channel.permissionFor(message.member).has(permission)) return false;
    });
    let level = message.calculateLevel.server(message);
    if (level < cmd.levels.server) return false;
    level = message.calculateLevel.user(message);
    if (level < cmd.levels.user) return false;
    if (!cmd.extraCheck(message, this.client)) return false;
    return true;
  }

  command(cmd, message) {
    if (!cmd.enabled) return;
    let missingPerm = false;
    let missing = [];
    cmd.permissions.me.forEach(permission => {
      if (permission === "basicPermissions") {
        this.client.config.commandConfig.basicPermissions.me.forEach(perm => {
          if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
            missingPerm = true;
            missing.push(perm);
          }
        });
      } else if (!message.channel.permissionsFor(message.guild.me).has(permission)) {
        missingPerm = true;
        missing.push(perm);
      }
    });
    if (missingPerm) return message.channel.send(new message.embed("error").setError(`Ik mis de volgende permissies: \`${missing.join("\` **|** \`")}\`!`));
    missingPerm = false;
    missing = [];
    cmd.permissions.user.forEach(permission => {
      if (permission === "basicPermissions") {
        this.client.config.commandConfig.basicPermissions.user.forEach(perm => {
          if (!message.channel.permissionsFor(message.member).has(perm)) {
            missingPerm = true;
            missing.push(perm);
          }
        });
      } else if (permission === "BOT_OWNER") {
        if (!this.client.config.botOwner.includes(message.author.id)) {
          missingPerm = true;
          missing.push("BOT_OWNER");
        }
      } else if (!message.channel.permissionFor(message.member).has(permission)) {
        missingPerm = true;
        missing.push(perm);
      }
    });
    if (missingPerm) return message.channel.send(new message.embed("error").setError(`Jij mist de volgende permissies: \`${missing.join("\` **|** \`")}\``));
    let level = message.calculateLevel.server(message);
    if (level < cmd.levels.server) message.channel.send(new message.embed("error").setError("Deze server heeft niet de goede serverlevel!"));
    level = message.calculateLevel.user(message);
    if (level < cmd.levels.user) message.channel.send(new message.embed("error").setError("Jij hebt niet de goede userlevel!"));
    return true;
  }
}
