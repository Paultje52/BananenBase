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
          try {
            c.setClient(t.client);
          } catch(er) {
            if (c.run && (c.help || c.check || c.options)) { // This is called when you arn't using the syntax right, but we can use it as a command.
              console.warn(`${result} - Export isn't made with a default constructor. It can happen that not everything is working like it is supposed to.`);
              if (c.options) c.check = c.options;

              c.enabled = c.help.enabled || c.check.enabled || false;
              c.guildOnly = c.help.guildOnly || c.check.guildOnly || false;
              c.permLevel = c.help.permLevel || c.check.permLevel || 0;
              c.func = c.help.check || c.help.func || c.check.check || c.check.func || function() {return true;};
              c.permissions = {
                me: c.help.permissions.me || c.check.permissions.me || c.permissions.me || [],
                user: c.help.permissions.user || c.check.permissions.user || c.permissions.user || []
              };
              c.help = {
                name: c.help.name || c.check.name,
                description: c.help.description || c.check.description || "",
                category: c.help.category || c.check.category || "",
                subCommands: c.help.subCommands || c.check.subCommands || [],
                args: c.help.args || c.check.args || []
              };
            } else return console.error(`Error in file ${result}: invalid syntax: Exports must be with a default constructor!`);
          }
        }
        if (!c.enabled) return;
        c.help.dir = result;
        if (!c.help.name) return console.error(`Error in file ${result}: No command name!`);
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
};
