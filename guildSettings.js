exports.run = (config, data, message) => {
  if (!data.get(`${message.guild.id}.prefix`)) data.set(`${message.guild.id}.prefix`, `!`);
}
