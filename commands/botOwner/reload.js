const Discord = require("discord.js");
exports.run = async (client) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (!args[0]) return message.channel.send("Geef een command op");
  if (client.commands.get(args[0])) {
    let props = client.commands.get(args[0]);
    if (props.help.category === "none") {
      delete require.cache[require.resolve(`${client.dirname}/commands/${props.help.name}.js`)];
      let prop = require(`${client.dirname}/commands/${props.help.name}.js`);
      client.commands.delete(args[1]);
      client.commands.set(args[1], prop);
      message.channel.send(`${args[0]} is herladen!`);
    } else {
      delete require.cache[require.resolve(`${client.dirname}/commands/${props.help.category}/${props.help.name}.js`)];
      let prop = require(`${client.dirname}/commands/${props.help.category}/${props.help.name}.js`);
      client.commands.delete(args[1]);
      client.commands.set(args[1], prop);
      message.channel.send(`${args[0]} is herladen!`);
    }
  } else return message.channel.send("Command niet gevonden!");
}
exports.help = {
  name: "reload",
  usage: "reload <command>",
  description: "Herlaad iets in de bot!",
  category: "botOwner",
  extraCommands: ["rl"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 6,
  guildOnly: false
}
