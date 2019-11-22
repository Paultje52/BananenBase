'use strict';

// Needed packages
const discord = require("discord.js"); // Interact with the discord api
const chalk = require("chalk"); // Color in the console
const moment = require("moment"); // Time loggin

// Needed files
const load = require("./load.js"); // Loading the commands, events, etc
const messageEvent = require("./bot/message.js"); // Basic message handling
const nl_messageEvent = require("./bot/nl_message.js"); // Basic message handling: Dutch

// Exports the main class
exports = module.exports.BananenBase = class BananenBase {
  constructor(options = {}) {
    // Options
    if (!options.language) this._language = "EN";
    else this._language = options.language;
    if (!["EN", "NL"].includes(this._language)) throw Error("Invalid language!");

    switch (this._language) {
      case "EN":
        options.message = messageEvent;
        break;
      case "NL":
        options.message = nl_messageEvent;
        break;
    }

    this._message = options.message;
    if (!this._message) this._message = messageEvent;

    this._requiredPermissions = options.requiredPermissions;
    if (!this._requiredPermissions) this._requiredPermissions = ["READ_MESSAGES", "SEND_MESSAGES"];

    if (!options.token) throw Error("No token found to run the discord bot!");
    this._token = options.token;

    this._keepTrackOfDatabase = options.keepTrackOfDatabase;
    if (typeof this._keepTrackOfDatabase !== "boolean") this._keepTrackOfDatabase = false;

    this._triggerMessageUpdates = options.triggerMessageUpdates;
    if (typeof this._triggerMessageUpdates !== "boolean") this._triggerMessageUpdates = false;

    if (typeof options.bot === "string") this._bot = require(`${process.cwd()}\\${options.bot}`);
    else if (typeof options.bot === "undefined") this._bot = function() {return true;};
    else this._bot = options.bot;

    if (typeof options.settings === "boolean") this._settings = options.settings;
    else this._settings = true;

    if (typeof options.botConfig === "string") this._botConfig = require(`${process.cwd()}\\${options.botConfig}`);
    else if (typeof options.botConfig === "undefined") this._botConfig = {};
    else this._botConfig = options.botConfig;

    if (options.prefix) this._prefix = options.prefix;
    else if (this._botConfig.prefix) this._prefix = this._botConfig.prefix;
    else this._prefix = ".";

    if (!this._botConfig.botOwners) this._botConfig.botOwners = [];
    if (this._settings) {
      if (!this._botConfig.guildSettings) this._botConfig.guildSettings = {prefix: this._prefix};
      if (!this._botConfig.authorSettings) this._botConfig.authorSettings = {};
      if (!this._botConfig.authorGuildSettings) this._botConfig.authorGuildSettings = {};
    }

    if (!options.ignore) options.ignore = {};
    if (typeof options.ignore.bot !== "boolean") options.ignore.bot = true;
    if (typeof options.ignore.pm !== "boolean") options.ignore.pm = false;
    this._ignore = options.ignore;

    if (typeof options.server === "undefined") this._server = false;
    else if (typeof options.server === "string") this._server = require(`${process.cwd()}/${options.server}`);
    else this._server = options.server;

    if (typeof options.consoleFunctions === "boolean") this._consoleFunctions = options.consoleFunctions;
    else if (typeof options.consoleFunctions === "undefined") this._consoleFunctions = true;
    else throw Error("Invaled type for console functions!");

    if (!options.permissionLevels) this._botConfig.permissionLevels = [() => {return true}];
    else this._botConfig.permissionLevels = options.permissionLevels;
    if (typeof this._botConfig.permissionLevels === "string") this._botConfig.permissionLevels = require(`${process.cwd()}/${this._botConfig.permissionLevels}`);

    // if (!options.activeCommands) this._activeCommands = ["help"];
    // else this._activeCommands = options.activeCommands;

    if (typeof options.pmPrefix !== "boolean") this._pmPrefix = false;
    else this._pmPrefix = options.pmPrefix;

    this._webPort = options.webPort;
    if (typeof this._webPort !== "number") this._webPort = 8080;

    this._commandErrorThrowing = options.commandErrorThrowing;
    if (typeof this._commandErrorThrowing !== "boolean") this._commandErrorThrowing = true;

    this._eventEmitterMaxFuncions = options.eventEmitterMaxFuncions;
    if (typeof this._eventEmitterMaxFuncions !== "number") this._eventEmitterMaxFuncions = 10;

    // Console functions
    if (this._consoleFunctions) {
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
    }


    this._databaseIsReady = true;
    if (typeof options.database === "object") {
      this._databaseIsReady = false;
      let funcObject = false;
      setTimeout(async () => {
        try {
          await options.database.set("_tmp.bb_bananenbase/test", "temp");
          await options.database.get("_tmp.bb_bananenbase/test");
          await options.database.delete("_tmp.bb_bananenbase/test");
          funcObject = true;
        } catch(e) {}
      });
      if (funcObject) this._database = options.database;
      else {
        if (!options.database.package) throw Error("Invaled database object!");
        options.database.cwd = process.cwd();
        if (options.database.package === "json") {
          if (!options.database.name) throw Error("Invaled database object: No database name for json")
          let jsonSystem;
          let status = false;
          try {
            jsonSystem = require("json-config-store");
            status = true;
          } catch(e) {
            console.log("No json-config-store package found, installing it...");
            require("child_process").exec("npm i -s json-config-store", (a, b, c) => {
              if (a || c) throw Error(a || c);
              jsonSystem = require("json-config-store");
              console.log("json-config-store successfull installed!\n");
              status = true;
            });
          }
          let interval = setInterval(() => {
            if (status) {
              clearInterval(interval);
              this._database = new jsonSystem({
                cwd: options.database.cwd,
                configName: options.database.dbName
              });
              this._databaseIsReady = true;
            }
          });
        } else if (options.database.package === "keyv") {
          if (!options.database.type) throw Error("No type of keyv storage!");
          if (!options.database.code) throw Error("No code for keyv storage!");
          if (!["redis", "mongodb", "sqlite", "postgresql", "mysql"].includes(options.database.type)) throw Error("Invaled type of storage for keyv!");
          let keyv;
          let status = false;
          try {
            keyv = require("keyv");
            require(`@keyv/${options.database.type}`);
            status = true;
          } catch(e) {
            console.log(`No keyv/@keyv/${options.database.type} package found, installing it...`);
            require("child_process").exec(`npm i -s keyv @keyv/${options.database.type}`, (a, b, c) => {
              if (a || c) throw Error(a || c);
              keyv = require("keyv");
              console.log(`keyv/@keyv/${options.database.type} successfull installed!\n`);
              status = true;
            });
          }
          let interval = setInterval(() => {
            if (status) {
              clearInterval(interval);
              this._database = new keyv(`${options.database.type}://${options.database.code}`);
              this._database.on("error", (err) => {
                console.log(`Database error: ${err}`);
                process.exit();
              });
              this._databaseIsReady = true;
            }
          });
        } else if (options.database.package === "enmap") {
          if (!options.database.name) throw Error("No name for the enmap database!");
          let enmap;
          this._databaseIsReady = false;
          try {
            enmap = require("enmap");
          } catch(e) {
            throw Error("Enmap is not installed. It can't be installed automaticly, so look at the install guide of enmap: https://enmap.evie.codes/install");
          }
          this._database = new enmap({name: options.database.name});
          this._database.defer.then(() => {
            this._databaseIsReady = true;
          });
        } else throw Error("Invaled storage package! If you have a package that needs to be added here, please contact me: 'paul52games@gmail.com'.");
      }
    } else this._database = new Map();

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
      if (this._databaseIsReady) {
        clearInterval(int);
        this.client = new discord.Client(options.clientSettings);
        this.client.setMaxListeners(this._eventEmitterMaxFuncions);
        this.client.login(this._token);
        this.client.config = this._botConfig;
        this.client.mainConfig = this;
        this.client.db = this._database;
        this.client.database = this.client.db;
        this.client.settings = this._settings;
        this.client.prefix = this._prefix;
        this.client.activeCommands = this._activeCommands;
        this.client.defaultPermissions = this._requiredPermissions;
        this.client.ignore = this._ignore;
        this.client.keepTrackOfDatabase = this._keepTrackOfDatabase;
        this.client._triggerMessageUpdates = this._triggerMessageUpdates;
        this.client._commandErrorThrowing = this._commandErrorThrowing;
        if (this._language === "EN") {
          this.client.stop = (reason = "I want to") => {
            console.log(chalk.red(`Stopping because ${reason}`));
            setInterval(async () => {
              let activeChannels = await this._database.get("activeChannels");
              if (!activeChannels) activeChannels = [];
              if (activeChannels.length !== 0) return console.log(`Waiting for ${activeChannels.length} active channels...`);
              process.exit();
            }, 1000);
          }
          this.client.language = "en";
        } else if (this._language === "NL") {
          this.client.stop = (reason = "ik dat wilt") => {
            console.log(chalk.red(`Stoppen omdat ${reason}`));
            setInterval(async () => {
              let activeChannels = await this._database.get("activeChannels");
              if (!activeChannels) activeChannels = [];
              if (activeChannels.length !== 0) return console.log(`Wachten op ${activeChannels.length} actieve kanalen...`);
              process.exit();
            }, 1000);
          }
          this.client.language = "nl";
        }

        delete this._token;
        load(this);

        // Bot is ready
        this.client.on("ready", () => {
          if (this.client.language === "en") console.info(`${chalk.yellow(this.client.user.username)} is now online!\n`);
          else if (this.client.language === "nl") console.info(`${chalk.yellow(this.client.user.username)} is nu online!\n`);
          this._bot(this.client);

          if (this._server) {
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
                if (a || c) throw Error(a || c);
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
                    if (!options) throw Error("No options for the send discord login!");
                    if (!options.clientID || !options.redirect) throw Error("Invalid options object!");
                    if (!options.scope) options.scope = [];
                    ["identify", "email", "guilds"].forEach(thing => {
                      if (!options.scope.includes(thing)) options.scope.push(thing);
                    });
                    return res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${options.clientID}&redirect_uri=${encodeURIComponent(options.redirect)}&response_type=code&scope=${options.scope.join("%20")}`);
                  }
                  res.handleDiscordLogin = (options) => {
                    return new Promise(async (resolve, reject) => {
                      if (!options) throw Error("No req or options for handeling the discord login!");
                      if (!options.clientID || !options.clientSecret || !options.redirect) throw Error("Invalid options object!");
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
                        packages.tmp.accesToken = json.access_token;
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
                app.listen(this._webPort, () => {
                  console.info(`Web app is online on port ${this._webPort}!\n`);
                });
                this._server(app, this.client);
              }
            });
          }
        });

        // Bot message
        this.client.on("message", (message) => {this._message(this.client, message)});
        if (this._triggerMessageUpdates) {
          this.client._sendMessagesMap = new Map();
          this.client.sendMessage = (channel, message, content) => {
            return new Promise(async (resolve) => {
              let msg;
              if (!this.client._sendMessagesMap.has(message.id)) msg = await channel.send(content);
              else msg = await this.client._sendMessagesMap.get(message.id).edit(content);
              this.client._sendMessagesMap.set(message.id, msg);
              resolve(msg);
            });
          }
          this.client.on("messageUpdate", (o, n) => {this._message(this.client, n)});
        }
      }
    });
  }
}

// Exports the event+command file
exports.event = require("./bot/constructors/event.js");
exports.command = require("./bot/constructors/command.js");
exports.process_event = require("./bot/constructors/processEvent.js");
exports.version = "v3.2.9";