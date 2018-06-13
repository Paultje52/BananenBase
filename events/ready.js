exports.run = (client, ...args) => {
  if (client.startType === "startup") {
    console.log(`\nIk ben online in ${Date.now() - client.start}ms! Ik heet ${client.user.username} en ik zit in ${client.guilds.size} servers bij ${client.users.size - 1} members in ${client.channels.size} channels!`);
  } else if (client.startType === 'restart' && client.restartLog === false) {
    client.restartLog = true;
    console.log(`\nIk ben in ${Date.now() - client.start}ms herstart! Ik heet ${client.user.username} en ik zit in ${client.guilds.size} servers bij ${client.users.size - 1} members in ${client.channels.size} channels!`);
  }
}
exports.config = {
  enable: true
}
