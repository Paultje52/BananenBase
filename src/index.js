// Needed packages
const discord = require("discord.js"); // Interact with the discord api
const chalk = require("chalk"); // Color in the console
const moment = require("moment"); // Time loggin

// Needed files
const error = require("./error.js"); // Outputting errors
const load = require("./load.js"); // Loading the commands, events, etc
const messageEvent = require("./bot/message.js"); // Basic message handling

// Exports the main class
exports = module.exports = class BananenBase {
  constructor(options = {}) {
    // Options
    if (!options.token) return error("No token found to run the discord bot!");
    this.token = options.token;

    if (typeof options.bot === "string") this.bot = require(`${process.cwd()}\\${options.bot}`);
    else if (typeof options.bot === "undefined") this.bot = function() {return true;};
    else this.bot = options.bot;

    if (typeof options.settings === "boolean") this.settings = options.settings;
    else this.settings = true;

    if (typeof options.botConfig === "string") this.botConfig = require(`${process.cwd()}\\${options.botConfig}`);
    else if (typeof options.botConfig === "undefined") this.botConfig = {};
    else this.botConfig = options.botConfig;

    if (options.prefix) this.prefix = options.prefix;
    else if (this.botConfig.prefix) this.prefix = this.botConfig.prefix;
    else this.prefix = ".";

    if (!this.botConfig.botOwners) this.botConfig.botOwners = [];
    if (this.settings) {
      if (!this.botConfig.guildSettings) this.botConfig.guildSettings = {prefix: this.prefix};
      if (!this.botConfig.authorSettings) this.botConfig.authorSettings = {};
      if (!this.botConfig.authorGuildSettings) this.botConfig.authorGuildSettings = {};
    }

    if (!options.ignore) options.ignore = {};
    if (typeof options.ignore.bot !== "boolean") options.ignore.bot = true;
    if (typeof options.ignore.pm !== "boolean") options.ignore.pm = false;
    this.ignore = options.ignore;

    if (typeof options.server === "undefined") this.server = false;
    else if (typeof options.server === "string") this.server = require(`${process.cwd()}/${options.server}`);
    else this.server = options.server;

    if (typeof options.consoleFunctions === "boolean") this.consoleFunctions = options.consoleFunctions;
    else if (typeof options.consoleFunctions === "undefined") this.consoleFunctions = true;
    else return error("Invaled type for console functions!");

    if (!options.permissionLevels) this.botConfig.permissionLevels = [];
    else this.botConfig.permissionLevels = options.permissionLevels;
    if (typeof this.botConfig.permissionLevels === "string") this.botConfig.permissionLevels = require(`${process.cwd()}/${this.botConfig.permissionLevels}`);

    // if (!options.activeCommands) this.activeCommands = ["help"];
    // else this.activeCommands = options.activeCommands;

    if (typeof options.pmPrefix !== "boolean") this.pmPrefix = false;
    else this.pmPrefix = options.pmPrefix;

    this.webPort = options.webPort;
    if (typeof this.webPort !== "number") this.webPort = 8080;


    // Console functions
    if (this.consoleFunctions) {
      console.info = function(text = "") {
        if (typeof text === "object") {
          console.log(chalk.green(`[${moment().format("HH:mm:ss ms")}]`));
          console.log(text);
        } else console.log(`${chalk.green(`[${moment().format("HH:mm:ss ms")}]`)} ${text}`);
      }
      console.debug = function(text = "") {
        if (typeof text === "object") {
          console.log(chalk.blue(`[${moment().format("HH:mm:ss ms")}]`));
          console.log(text);
        } else console.log(`${chalk.blue(`[${moment().format("HH:mm:ss ms")}]`)} ${text}`);
      }
      console.warn = function(text = "") {
        if (typeof text === "object") {
          console.log(chalk.yellow(`[${moment().format("HH:mm:ss ms")}]`));
          console.log(text);
        } else console.log(`${chalk.yellow(`[${moment().format("HH:mm:ss ms")}]`)} ${text}`);
      }
      console.error = error;
    }


    this.databaseIsReady = true;
    if (typeof options.database === "object") {
      this.databaseIsReady = false;
      let funcObject = false;
      setTimeout(async () => {
        try {
          await options.database.set("_tmp.bb_bananenbase/test", "temp");
          await options.database.get("_tmp.bb_bananenbase/test");
          await options.database.delete("_tmp.bb_bananenbase/test");
          funcObject = true;
        } catch(e) {}
      });
      if (funcObject) this.database = options.database;
      else {
        if (!options.database.package) return error("Invaled database object!");
        options.database.cwd = process.cwd();
        if (options.database.package === "json") {
          if (!options.database.name) return error("Invaled database object: No database name for json")
          let jsonSystem;
          let status = false;
          try {
            jsonSystem = require("json-config-store");
            status = true;
          } catch(e) {
            console.log("No json-config-store package found, installing it...");
            require("child_process").exec("npm i -s json-config-store", (a, b, c) => {
              if (a || c) return error(a || c);
              jsonSystem = require("json-config-store");
              console.log("json-config-store successfull installed!\n");
              status = true;
            });
          }
          let interval = setInterval(() => {
            if (status) {
              clearInterval(interval);
              this.database = new jsonSystem({
                cwd: options.database.cwd,
                configName: options.database.dbName
              });
              this.databaseIsReady = true;
            }
          });
        } else if (options.database.package === "keyv") {
          if (!options.database.type) return error("No type of keyv storage!");
          if (!options.database.code) return error("No code for keyv storage!");
          if (!["redis", "mongodb", "sqlite", "postgresql", "mysql"].includes(options.database.type)) return error("Invaled type of storage for keyv!");
          let keyv;
          let status = false;
          try {
            keyv = require("keyv");
            require(`@keyv/${options.database.type}`);
            status = true;
          } catch(e) {
            console.log(`No keyv/@keyv/${options.database.type} package found, installing it...`);
            require("child_process").exec(`npm i -s keyv @keyv/${options.database.type}`, (a, b, c) => {
              if (a || c) return error(a || c);
              keyv = require("keyv");
              console.log(`keyv/@keyv/${options.database.type} successfull installed!\n`);
              status = true;
            });
          }
          let interval = setInterval(() => {
            if (status) {
              clearInterval(interval);
              this.database = new keyv(`${options.database.type}://${options.database.code}`);
              this.database.on("error", (err) => {
                error(`Database error: ${err}`);
              });
              this.databaseIsReady = true;
            }
          });
        } else if (options.database.package === "enmap") {
          if (!options.database.name) return error("No name for the enmap database!");
          let enmap;
          this.databaseIsReady = false;
          try {
            enmap = require("enmap");
          } catch(e) {
            return error("Enmap is not installed. It can't be installed automaticly, so look at the install guide of enmap: https://enmap.evie.codes/install");
          }
          this.database = new enmap({name: options.database.name});
          this.database.defer.then(() => {
            this.databaseIsReady = true;
          });
        } else return error("Invaled storage package! If you have a package that needs to be added here, please contact me: 'paul52games@gmail.com'.");
      }
    } else this.database = new Map();

    if (!options.clientSettings) this.clientSettings = {
      disableEveryone: true,
      messageCacheMaxSize: 100,
      messageCacheLifetime: 240,
      messageSweepInterval: 300,
      autoReconnect: true
    };
    else this.clientSettings = options.clientSettings;


    // Discord client
    let int = setInterval(() => {
      if (this.databaseIsReady) {
        clearInterval(int);
        this.client = new discord.Client(options.clientSettings);
        this.client.login(this.token);
        this.client.config = this.botConfig;
        this.client.mainConfig = this;
        this.client.db = this.database;
        this.client.database = this.client.db;
        this.client.settings = this.settings;
        this.client.prefix = this.prefix;
        this.client.activeCommands = this.activeCommands;
        this.client.ignore = this.ignore;

        if (this.mysqlDatabase) this.client.db.query = util.promisify(this.database.query);
        delete this.token;
        load(this);

        // Bot is ready
        this.client.on("ready", () => {
          console.info(`${chalk.yellow(this.client.user.username)} is now online!\n`);
          this.bot(this.client);

          if (this.server) {
            let status = false;
            let packages = {};
            try {
              packages.express = require("express");
              packages.ejs = require("ejs");
              packages.bodyParser = require("body-parser");
              packages.cors = require("cors");
              packages.btoa = require("btoa");
              packages.fetch = require("node-fetch");
              packages.request = require("request");
              packages.randomString = require("random-string");
              status = true;
            } catch(e) {
              console.log(`No required wep-app packages found, installing the required packages... (express, ejs, body-parser, cors, btoa, node-fetch, request, random-string)`);
              require("child_process").exec(`npm i -s express ejs body-parser cors btoa node-fetch request random-string`, (a, b, c) => {
                if (a || c) return error(a || c);
                packages.express = require("express");
                packages.ejs = require("ejs");
                packages.bodyParser = require("body-parser");
                packages.cors = require("cors");
                packages.btoa = require("btoa");
                packages.fetch = require("node-fetch");
                packages.request = require("request");
                packages.randomString = require("random-string");
                console.log(`Required web-app packages successfull installed!\n`);
                status = true;
              });
            }
            let interval = setInterval(async () => {
              if (status) {
                clearInterval(interval);
                let app = packages.express();
                app.use(packages.cors());
                app.use(packages.bodyParser.urlencoded({extended: false}));
                app.use(packages.bodyParser.json());
                app.use((req, res, next) => {
                  res.randomString = (length = 25) => {
                    return packages.randomString({length: length});
                  }
                  res.sendDiscordLogin = (options) => {
                    if (!options) return error("No options for the send discord login!");
                    if (!options.clientID || !options.redirect) return error("Invalid options object!");
                    options.scope = ["identify", "email", "guilds"];
                    return res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${options.clientID}&redirect_uri=${encodeURIComponent(options.redirect)}&response_type=code&scope=${options.scope.join("%20")}`);
                  }
                  res.handleDiscordLogin = (options) => {
                    return new Promise(async (resolve, reject) => {
                      if (!options) return error("No req or options for handeling the discord login!");
                      if (!options.clientID || !options.clientSecret || !options.redirect) return error("Invalid options object!");
                      if (req.query.error) {
                        return reject(req.query.error);
                      }
                      if (!req.query.code) return res.status(400).json({message: "Error!", error: true, errorMessage: "Invaled paramaters!"});
                      let code = req.query.code;
                      let creds = packages.btoa(`${options.clientID}:${options.clientSecret}`);
                      let response = await packages.fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(options.redirect)}`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Basic ${creds}`,
                          }
                        });
                      let json = await response.json();
                      if (json.error) return reject(json.error);
                      packages.request({url: "http://discordapp.com/api/users/@me", json: true, auth: {bearer: json.access_token}}, (err, response, body) => {
                        if (err) return reject(err);
                        packages.tmp = body;
                        packages.request({url: "http://discordapp.com/api/users/@me/guilds", json: true, auth: {bearer: json.access_token}}, (err, response, b) => {
                          if (err) return reject(err);
                          packages.tmp.guilds = b;
                          resolve(packages.tmp);
                          delete packages.tmp;
                        });
                      });
                    });
                  }
                  next();
                });
                app.listen(this.webPort, () => {
                  console.info(`Web app is online on port ${this.webPort}!\n`);
                });
                this.server(app, this.client);
              }
            });
          }
        });

        // Bot message
        this.client.on("message", (message) => {messageEvent(this.client, message)});
      }
    });
  }
}

// Exports the event+command file
exports.event = require("./bot/constructors/event.js");
exports.command = require("./bot/constructors/command.js");
exports.processEvent = require("./bot/constructors/processEvent.js");
exports.function = require("./bot/constructors/function.js");
