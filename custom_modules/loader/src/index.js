const chalk = require('chalk');
const fs = require('fs');
module.exports.load = async (type, client) => {
  if (type === "command") {
    await fs.readdir(`${client.dirname}/commands/`, (err, files) => {
      console.log(`Commands laden...`);
      let ii = 0;
      if (err) throw (err);
      files.forEach(file => {
        if (file.endsWith(".js")) {
          let props = require(`${client.dirname}/commands/${file}`);
          client.commands.set(props.help.name, props);
          ii++;
          console.log(`   ${chalk.green("COMMAND")}: ${ii}: ${props.help.name} is succesvol geladen!`);
        } else {
          try {
            fs.readdir(`${client.dirname}/commands/${file}/`, (err, bestanden) => {
              if (err) throw (err);
              bestanden.forEach(bestand => {
                let props = require(`${client.dirname}/commands/${file}/${bestand}`);
                client.commands.set(props.help.name, props);
                ii++;
                console.log(`   ${chalk.green("COMMAND")}: ${ii}: ${props.help.name} is succesvol geladen!`);
              })
            })
          } catch(err) {
            if (err) throw (err);
          }
        }
      })
    })
  } else if (type === "event") {
    fs.readdir(`${client.dirname}/events/`, (err, files) => {
      if (err) return console.error(err);
      console.log(`Events laden...`);
      let i = 0;
      files.forEach(file => {
        let eventFunction = require(`${client.dirname}/events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`   ${chalk.blue("EVENT")}: ${i + 1}: ${eventName} is succesvol geladen!`);
        if (eventFunction.config === undefined) return;
        if (eventFunction.config.enable === undefined) return;
        if (eventFunction.config.enable !== true) return;
        i++;
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
      });
    });
  } else if (type === "process_event") {
    fs.readdir(`${client.dirname}/process_events/`, (err, files) => {
      if (err) return console.error(err);
      console.log(`Process events laden...`);
      let i = 0;
      files.forEach(file => {
        let processEventFunction = require(`${client.dirname}/process_events/${file}`);
        let processEventName = file.split(".")[0];
        console.log(`   ${chalk.yellow("PROCESS_EVENT")}: ${i + 1}: ${processEventName} is succesvol geladen!`);
        if (processEventFunction.config === undefined) return;
        if (processEventFunction.config.enable === undefined) return;
        if (processEventFunction.config.enable !== true) return;
        i++;
        process.on(processEventName, (...args) => processEventFunction.run(client, ...args));
      });
    });
  } else throw "Kies uit COMMAND, EVENT of PROCESS_EVENT!";
}
