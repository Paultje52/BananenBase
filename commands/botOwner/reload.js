const Discord = require("discord.js");
exports.run = async (client) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (!args[0]) return message.channel.send("Geef een type op!");
  if (args[0].toLowerCase() !== "function" && args[0].toLowerCase() !== "command" && args[0].toLowerCase() !== "event" && args[0].toLowerCase() !== "process_events") return message.channel.send("Kies uit FUNCTION, COMMAND, EVENT of PROCESS_EVENTS!");
  if (args[0].toLowerCase() === "command") {
    if (!args[1]) return message.channel.send("Geef een command op");
    if (client.commands.get(args[1])) {
      let props = client.commands.get(args[1]);
      if (props.help.category === "none") {
        delete require.cache[require.resolve(`${client.dirname}/commands/${props.help.name}.js`)];
        let prop = require(`${client.dirname}/commands/${props.help.name}.js`);
        client.commands.delete(args[1]);
        client.commands.set(args[1], prop);
        message.channel.send(`${args[1]} is herladen!`);
      } else {
        delete require.cache[require.resolve(`${client.dirname}/commands/${props.help.category}/${props.help.name}.js`)];
        let prop = require(`${client.dirname}/commands/${props.help.category}/${props.help.name}.js`);
        client.commands.delete(args[1]);
        client.commands.set(args[1], prop);
        message.channel.send(`${args[1]} is herladen!`);
      }
    } return message.channel.send("Command niet gevonden!");
  } else if (args[0].toLowerCase() === "function") {
    if (!args[1]) return message.channel.send("Geef een functie op");
    if (client.functions.get(args[1])) {
      let props = client.commands.get(args[1]);
      if (props.help.category === "none") {
        delete require.cache[require.resolve(`${client.dirname}/functions/${props.help.name}.js`)];
        let prop = require(`${client.dirname}/functions/${props.help.name}.js`);
        client.functions.delete(args[1]);
        client.functions.set(args[1], prop);
        client.function[prop.help.name] = prop;
        message.channel.send(`${args[1]} is herladen!`);
      } else {
        delete require.cache[require.resolve(`${client.dirname}/functions/${props.help.category}/${props.help.name}.js`)];
        let prop = require(`${client.dirname}/functions/${props.help.category}/${props.help.name}.js`);
        client.functions.delete(args[1]);
        client.functions.set(args[1], prop);
        client.function[prop.help.name] = prop;
        message.channel.send(`${args[1]} is herladen!`);
      }
    } return message.channel.send("Functie niet gevonden!");
  } else if (args[0].toLowerCase() === "event") {
    if (!args[1]) return message.channel.send("Geef een event op");
    try {
      let prop = require(`${client.dirname}/events/${args[1]}.js`);
    } catch(err) {
      return message.channel.send("Event niet gevonden!");
    }
    delete require.cache[require.resolve(`${client.dirname}/events/${args[1]}.js`)];
    let prop = require(`${client.dirname}/events/${args[1]}.js`);
    if (prop.config === undefined) return;
    if (prop.config.enable === undefined) return;
    if (prop.config.enable !== true) return;
    client.on(prop.help.name, (...args) => prop.run(client, ...args));
    message.channel.send(`Event ${args[1]} herladen!`);
  } else if (args[0].toLowerCase() === "process_event") {
    if (!args[1]) return message.channel.send("Geef een process event op");
    try {
      let prop = require(`${client.dirname}/process_events/${args[1]}.js`);
    } catch(err) {
      return message.channel.send("Process event niet gevonden!");
    }
    delete require.cache[require.resolve(`${client.dirname}/process_events/${args[1]}.js`)];
    let prop = require(`${client.dirname}/process_events/${args[1]}.js`);
    if (prop.config === undefined) return;
    if (prop.config.enable === undefined) return;
    if (prop.config.enable !== true) return;
    process.on(prop.help.name, (...args) => prop.run(client, ...args));
  }
}
exports.help = {
  name: "reload",
  usage: "reload <type> <ding>",
  description: "Herlaad iets in de bot!",
  category: "botOwner"
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 6,
  guildOnly: false
}
