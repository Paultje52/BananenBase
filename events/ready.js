exports.run = (client, data, config, start, niets, queue) => {
  console.log(`Ik ben online in ${Date.now() - start}ms! Ik heet ${client.user.username} en ik zit in ${client.guilds.size} servers bij ${client.users.size - 1} members in ${client.channels.size} channels!`)
}

exports.config = {
  enable: true
}
