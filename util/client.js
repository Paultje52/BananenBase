const Discord = require("discord.js");
const scan = require("fsscanner");
const enmap = require("enmap");

module.exports = class Client {
  constructor(options) {
    // Discord Client
    this.client = new Discord.Client(options);

    // Client opties
    this.client.config = require("../config.json");
    this.client.login(this.client.config.token);
    this.client.settings = new enmap({name: "Guild settings"});
    this.client.storage = new enmap({name: "Storage"});

    // Storage database
    this.client.storage.defer.then(() => {
      this.client.storage.ensure("total.commandNumber", 0);
      this.client.storage.ensure("total.messageNumber", 0);
      this.client.storage.set("session.commandNumber", 0);
      this.client.storage.set("session.messageNumber", 0);
    });

    // Commands inladen
    this.commands = new Map();
    this.subCommands = new Map();
    scan.scan("./commands", [scan.criteria.pattern(".js"), scan.criteria.type("F")], (err, results) => {
      if (err) throw err;
      if (!results) results = [];
      results.forEach(result => {
        let c = require(`../${result}`);
        c = new c(this.client);
        if (c.config.enabled === true) {
          c.config.help.dir = `../${result}`;
          this.commands.set(c.config.help.name, c);
          c.config.help.subCommands.forEach(subCommand => {
            this.subCommands.set(subCommand, c);
          });
        }
      });
      console.log(`${results.length} commands geladen!`);
    });
    scan.scan("./events/client", [scan.criteria.pattern(".js"), scan.criteria.type("F")], (err, results) => {
      if (err) throw err;
      if (!results) results = [];
      results.forEach(result => {
        let e = require(`../${result}`);
        e = new e(this.client);
        this.client.on(e.config.name, (...args) => e.run(this.client.commands, ...args));
      });
      console.log(`${results.length} client events geladen!`);
    });
    scan.scan("./events/process", [scan.criteria.pattern(".js"), scan.criteria.type("F")], (err, results) => {
      if (err) throw err;
      if (!results) results = [];
      results.forEach(result => {
        let e = require(`../${result}`);
        let name = result.split("\\");
        name = name[name.length-1].split(".js")[0];
        process.on(name, (...args) => e(...args));
      });
      console.log(`${results.length} process events geladen!`);
    });
    scan.scan("./functions", [scan.criteria.pattern(".js"), scan.criteria.type("F")], (err, results) => {
      if (err) throw err;
      if (!results) results = [];
      this.client.functions = {};
      results.forEach(result => {
        let name = result.split("\\");
        name = name[name.length-1].split(".js")[0];
        this.client.functions[name] = require(`../${result}`);
      });
      console.log(`${results.length} functies ingeladen!`);
    });
    this.client.commands = {commands: this.commands, subCommands: this.subCommands};


    // Klaar!
    return this.client;
  }
}
