// Needed packages
const fsscanner = require("fsscanner");
const chalk = require("chalk");
const fs = require("fs");

// Exports
module.exports = function(t) {
  t.client.commands = new Map(); // Creates the commands map
  t.client.subCommands = new Map(); // Creates the subCommands map
  if (fs.existsSync(`${process.cwd()}/commands`)) { // If the commands folder exists
    fsscanner.scan(`${process.cwd()}/commands`, [fsscanner.criteria.pattern(".js"), fsscanner.criteria.type("F")], (err, results) => { // Search for commands
      if (err) throw err;
      if (!results || results.length === 0) return;
      results.forEach(result => {
        let c = require(result);
        try {
          c = new c(t.client);
        } catch(e) {
          c.setClient(t.client);
        }
        if (!c.enabled) return;
        c.help.dir = result;
        t.client.commands.set(c.help.name, c);

        c.help.subCommands.forEach(subCommand => {
          t.client.subCommands.set(subCommand, c);
        });
      });
      console.info(`${chalk.green(results.length)} command(s) and ${chalk.green(t.client.subCommands.size)} subcommand(s) loaded!`);
    });
  }

  if (fs.existsSync(`${process.cwd()}/events`)) { // If the events folder exists
    fsscanner.scan(`${process.cwd()}/events`, [fsscanner.criteria.pattern(".js"), fsscanner.criteria.type("F")], (err, results) => { // Search for commands
      if (err) throw err;
      if (!results || results.length === 0) return;
      results.forEach(result => {
        let c = require(result);
        try {
          c = new c(t.client);
        } catch(e) {
          c.setClient(t.client);
        }
        if (!c.enabled) return;
        c.dir = result;
        t.client.on(c.name, (...args) => c.run(...args));
      });
      console.info(`${chalk.green(results.length)} event(s) loaded!`);
    });
  }

  if (fs.existsSync(`${process.cwd()}/process_events`)) { // If the process events folder exists
    fsscanner.scan(`${process.cwd()}/process_events`, [fsscanner.criteria.pattern(".js"), fsscanner.criteria.type("F")], (err, results) => { // Search for commands
      if (err) throw err;
      if (!results || results.length === 0) return;
      results.forEach(result => {
        let c = require(result);
        try {
          c = new c(t.client);
        } catch(e) {
          c.setClient(t.client);
        }
        if (!c.enabled) return;
        c.dir = result;
        process.on(c.name, (...args) => c.run(...args));
      });
      console.info(`${chalk.green(results.length)} process event(s) loaded!`);
    });
  }
}
