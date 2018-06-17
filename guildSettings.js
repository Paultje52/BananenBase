exports.run = async (client, message) => {
  if (message.channel.type === "dm") {
    return false;
  } else {
    const data = new client.dataModule({path: `${client.dirname}/guildSettings`, name: `${message.guild.id}.json`});
    if (!data.get(`prefix`)) data.set(`prefix`, client.config.main.prefix);
    if (!data.get(`role.role1`)) data.set(`role.role1`, `rol1`);
    if (!data.get(`role.role2`)) data.set(`role.role2`, `rol2`);
    if (!data.get(`role.role3`)) data.set(`role.role3`, `rol3`);
    if (!data.get(`role.role4`)) data.set(`role.role4`, `rol4`);
    if (!data.get(`role.role5`)) data.set(`role.role5`, `rol5`);
    client.data = data;
    return true;
  }
}
