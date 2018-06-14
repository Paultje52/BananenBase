const consoleModule = require("readline");
const fs = require('fs');
const loader = require("./custom_modules/loader");
const chalk = require("chalk");

//Nu maken wij de console line in zodat je commands (zoals restart) kan doen!
module.exports.run = async (client) => {
  const consoleCommands = await consoleModule.createInterface({input: process.stdin, output: process.stdout});
  consoleCommands.on('line', async (input) => {
    let args = input.split(" ").slice(1);
    let command = input.split(" ")[0];

    if (command.toLowerCase() === "restart" || command.toLowerCase() === "rs") {
      console.log("<---> Bot herstarten...");
      setTimeout(function() {
        process.exit();
      }, Math.floor(Math.random() * 2500));
    } else if (command.toLowerCase() === "reload" || command.toLowerCase() === "rl") {
      if (!args[0]) return console.log("Geef een command op");
      if (client.commands.get(args[0])) {
        let props = client.commands.get(args[0]);
        if (props.help.category === "none") {
          delete require.cache[require.resolve(`./commands/${props.help.name}.js`)];
          let prop = require(`./commands/${props.help.name}.js`);
          client.commands.delete(args[0]);
          client.commands.set(args[0], prop);
          console.log(`${args[0]} is herladen!`);
        } else {
          delete require.cache[require.resolve(`./commands/${props.help.category}/${props.help.name}.js`)];
          let prop = require(`./commands/${props.help.category}/${props.help.name}.js`);
          client.commands.delete(args[0]);
          client.commands.set(args[0], prop);
          console.log(`${args[0]} is herladen!`);
        }
      } return console.log("Command niet gevonden!");
    } else return console.log(`<---> ${chalk.red(command)} is geen geldig command, kies uit RESTART!`);
  });
}
