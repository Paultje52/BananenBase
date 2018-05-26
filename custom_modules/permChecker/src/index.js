const chalk = require('chalk');
module.exports.check = (type, client) => {
  if (type === "run") {
    let message = client.messsage;
    let args = client.args;
    let cmd = client.cmd;
    let config = client.config;
    let data = client.data;
    let dirname = client.dirname;
    try {
      const command = require(`${dirname}/commands/${cmd.help.category}/${cmd.help.name}.js`);
    } catch(err) {
      try {
        const command = require(`${dirname}/commands/${cmd.help.name}.js`);
      } catch(err) {
        if (err) throw chalk.red("Command niet kunnen vinden!");
      }
      const command = require(`${dirname}/commands/${cmd.help.name}.js`);
    }
    const command = require(`${dirname}/commands/${cmd.help.category}/${cmd.help.name}.js`);
    try {
      let enable = command.help.enable;
      let guildPermission = command.help.guildPermission;
      let userPermission = command.help.userPermission;
      let guildOnly = command.config.guildOnly;
    } catch(err) {
      if (err) throw chalk.red(`${cmd} heeft geen complete config!`);
    }
    let enable = command.config.enable;
    let guildPermission = command.config.guildPermission;
    let userPermission = command.config.userPermission;
    let guildOnly = command.config.guildOnly;
    if (enable !== true) return;
    if (guildOnly === true && message.channel.type === "dm") return client.message.channel.send(`Je kunt het command **${command.help.name}** niet uitvoeren in PM!\nReden: **Is disabled in PM**`);
    if (client.guild === false && guildPermission !== 0) return client.message.channel.send(`Je kunt het command **${command.help.name}** niet uitvoeren in PM!\nReden: **Heeft guild permissions**`);
    if (client.guild === false && userPermission !== 0) return client.message.channel.send(`Je kunt het command **${command.help.name}** niet uitvoeren in PM!\nReden: **Heeft user permissions**`);
    if (client.guild === true) {
      if (guildPermission === 1 && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id) && !client.guildPermission2.includes(client.message.guild.id) && !client.guildPermission1.includes(client.message.guild.id)) return;
      if (guildPermission === 2 && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id) && !client.guildPermission2.includes(client.message.guild.id)) return;
      if (guildPermission === 3 && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id)) return;
      if (guildPermission === 4 && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id)) return;
      if (guildPermission === 5 && !client.guildPermission5.includes(client.message.guild.id)) return;
      if (userPermission === 1 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role1`)].includes(r.name))) return;
      if (userPermission === 2 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role2`)].includes(r.name))) return;
      if (userPermission === 3 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role3`)].includes(r.name))) return;
      if (userPermission === 4 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role4`)].includes(r.name))) return;
      if (userPermission === 5 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role5`)].includes(r.name))) return;
      command.run(client);
    } else {
      command.run(client);
    }
  } else if (type === "help") {
    let message = client.messsage;
    let args = client.args;
    let cmd = client.cmd;
    let config = client.config;
    let data = client.data;
    let dirname = client.dirname;
    try {
      const command = require(`${dirname}/commands/${cmd.help.category}/${cmd.help.name}.js`);
    } catch(err) {
      try {
        const command = require(`${dirname}/commands/${cmd.help.name}.js`);
      } catch(err) {
        if (err) throw chalk.red("Command niet kunnen vinden!");
      }
      const command = require(`${dirname}/commands/${cmd.help.name}.js`);
    }
    const command = require(`${dirname}/commands/${cmd.help.category}/${cmd.help.name}.js`);
    let enable = command.config.enable;
    let guildPermission = command.config.guildPermission;
    let userPermission = command.config.userPermission;
    let guildOnly = command.config.guildOnly;
    if (enable !== true) return false;
    if (guildOnly === true && message.channel.type === "dm") return false;
    if (client.guild === false && guildPermission !== 0) return false;
    if (client.guild === false && userPermission !== 0) return false;
    if (client.guild === true) {
      if (guildPermission === 1 && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id) && !client.guildPermission2.includes(client.message.guild.id) && !client.guildPermission1.includes(client.message.guild.id)) return false;
      if (guildPermission === 2 && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id) && !client.guildPermission2.includes(client.message.guild.id)) return false;
      if (guildPermission === 3 && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id)) return false;
      if (guildPermission === 4 && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id)) return false;
      if (guildPermission === 5 && !client.guildPermission5.includes(client.message.guild.id)) return false;
      if (userPermission === 1 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role1`)].includes(r.name))) return false;
      if (userPermission === 2 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role2`)].includes(r.name))) return false;
      if (userPermission === 3 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role3`)].includes(r.name))) return false;
      if (userPermission === 4 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role4`)].includes(r.name))) return false;
      if (userPermission === 5 && client.message.author.id !== client.message.guild.owner.id && !client.message.member.roles.some(r => [data.get(`${client.message.guild.id}.role.role5`)].includes(r.name))) return false;
      return true;
    } else return true;
  } else throw chalk.red(`Type ${type} is niet geldig! Kies uit HELP of RUN!`);
}
