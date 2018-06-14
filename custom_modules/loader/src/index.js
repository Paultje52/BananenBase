const chalk = require('chalk');
const fs = require('fs');
const SRJ = require('self-reload-json')
module.exports.load = async (type, client) => {
  if (type === "command") {
    await fs.readdir(`${client.dirname}/commands/`, (err, files) => {
      console.log(chalk.bold.underline("\nCommands inladen..."));
      let ii = 0;
      if (err) throw (err);
      files.forEach(file => {
        if (file.endsWith(".js")) {
          let props = require(`${client.dirname}/commands/${file}`);
          client.commands.set(props.help.name, props);
          ii++;
          console.log(`   ${chalk.green("COMMAND")}: ${ii}: ${chalk.bold(props.help.name)} is succesvol geladen!`);
        } else {
          try {
            fs.readdir(`${client.dirname}/commands/${file}/`, (err, bestanden) => {
              if (err) throw (err);
              bestanden.forEach(bestand => {
                let props = require(`${client.dirname}/commands/${file}/${bestand}`);
                client.commands.set(props.help.name, props);
                ii++;
                console.log(`   ${chalk.green("COMMAND")}: ${ii}: ${chalk.bold(props.help.name)} is succesvol geladen!`);
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
      console.log(chalk.bold.underline("\nEvents inladen..."));
      let i = 0;
      files.forEach(file => {
        let eventFunction = require(`${client.dirname}/events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`   ${chalk.blue("EVENT")}: ${i + 1}: ${chalk.bold(eventName)} is succesvol geladen!`);
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
      console.log(chalk.bold.underline("\nProcess events inladen..."));
      let i = 0;
      files.forEach(file => {
        let processEventFunction = require(`${client.dirname}/process_events/${file}`);
        let processEventName = file.split(".")[0];
        console.log(`   ${chalk.yellow("PROCESS_EVENT")}: ${i + 1}: ${chalk.bold(processEventName)} is succesvol geladen!`);
        if (processEventFunction.config === undefined) return;
        if (processEventFunction.config.enable === undefined) return;
        if (processEventFunction.config.enable !== true) return;
        i++;
        process.on(processEventName, (...args) => processEventFunction.run(client, ...args));
      });
    });
  } else if (type === "function") {
    client.function = {};
    await fs.readdir(`${client.dirname}/functions/`, (err, files) => {
      console.log(chalk.bold.underline("\nFunctions inladen..."));
      let i = 0;
      if (err) throw (err);
      files.forEach(file => {
        if (file.endsWith(".js")) {
          let props = require(`${client.dirname}/functions/${file}`);
          client.function[props.help.name] = props;
          client.functions.set(props.help.name, props);
          i++;
          console.log(`   ${chalk.magenta("FUNCTION")}: ${i}: ${chalk.bold(props.help.name)} is succesvol geladen!`);
        } else {
          try {
            fs.readdir(`${client.dirname}/functions/${file}/`, (err, bestanden) => {
              if (err) throw (err);
              bestanden.forEach(bestand => {
                let props = require(`${client.dirname}/functions/${file}/${bestand}`);
                client.function[props.help.name] = props;
                client.functions.set(props.help.name, props);
                i++;
                console.log(`   ${chalk.magenta("FUNCTION")}: ${i}: ${chalk.bold(props.help.name)} is succesvol geladen!`);
              })
            })
          } catch(err) {
            if (err) throw (err);
          }
        }
      })
    })
  } else if (type === "config") {
    client.config = {};
    await fs.readdir(`${client.dirname}/config/`, (err, files) => {
      console.log(chalk.bold.underline("\nConfigs inladen..."));
      let i = 0;
      files.forEach(file => {
        if (file.toLowerCase().startsWith("temp")) return;
        if (file.endsWith(".json")) {
          let props = new SRJ(`${client.dirname}/config/${file}/${bestand}`);
          props.on("updated", () => {console.log(`Config ${chalk.bold(bestand.split(".")[0])} is succesvol geupdate!`)});
          client.config[bestand.split(".")[0]] = props;
          i++;
          console.log(`   ${chalk.cyan("CONFIG")}: ${i}: ${chalk.bold(bestand.split(".")[0])} is succesvol geladen!`);
        } else {
          try {
            fs.readdir(`${client.dirname}/config/${file}/`, (err, bestanden) => {
              bestanden.forEach(bestand => {
                if (file.toLowerCase().startsWith("temp")) return;
                let props = new SRJ(`${client.dirname}/config/${file}/${bestand}`);
                props.on("updated", () => {console.log(`Config ${chalk.bold(bestand.split(".")[0])} is succesvol geupdate!`)});
                client.config[bestand.split(".")[0]] = props;
                i++;
                console.log(`   ${chalk.cyan("CONFIG")}: ${i}: ${chalk.bold(bestand.split(".")[0])} is succesvol geladen!`);
              })
            })
          } catch(err) {
            if (err) throw (err);
          }
        }
      })
    })
  } else throw "Kies uit COMMAND, EVENT, PROCESS_EVENT, FUNCTION of CONFIG!";
}
