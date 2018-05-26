exports.run = async (client, message) => {
  let data = client.data;
  if (message.channel.type === "dm") {
    return false;
  } else {
    if (!data.get(`${message.guild.id}.prefix`)) data.set(`${message.guild.id}.prefix`, `!`);
    if (!data.get(`${message.guild.id}.role.role1`)) data.set(`${message.guild.id}.role.role1`, `rol1`);
    if (!data.get(`${message.guild.id}.role.role2`)) data.set(`${message.guild.id}.role.role2`, `rol2`);
    if (!data.get(`${message.guild.id}.role.role3`)) data.set(`${message.guild.id}.role.role3`, `rol3`);
    if (!data.get(`${message.guild.id}.role.role4`)) data.set(`${message.guild.id}.role.role4`, `rol4`);
    if (!data.get(`${message.guild.id}.role.role5`)) data.set(`${message.guild.id}.role.role5`, `rol5`);
      return true;
  }
}
