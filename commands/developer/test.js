const Discord = require("discord.js");
const permChecker = require("permChecker");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (!args[0]) message.channel.send("Het lijkt te werken! Je hebt geen argumenten opgeven!");
  if (args[0]) message.channel.send("Het lijkt te werken! Je hebt argumenten op gegeven!")
}
exports.help = {
  name: "test",
  usage: "test [argumenten]",
  description: "Kijk of de bot werkt!",
  category: "developer"
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
