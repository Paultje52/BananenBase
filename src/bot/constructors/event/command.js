const events = require("events");

module.exports = class BananenBase_Event_Command extends events {
  constructor(help, check = {}) {
    super();

    this.help = help;

    if (typeof this.help.enabled !== "boolean") this.enabled = true;
    else this.enabled = this.help.enabled;
    if (!this.help.description) this.help.description = "No description";
    if (!this.help.category) this.help.category = "";
    if (!this.help.subCommands) this.help.subCommands = [];
    this.guildOnly = this.help.guildOnly;
    if (typeof this.guildOnly !== "boolean") this.guildOnly = false;

    if (!check.permLevel) this.permLevel = 0;
    else this.permLevel = check.permLevel;
    if (!check.func) this.check = () => {return true};
    else this.check = check.func;
    if (!check.permissions) check.permissions = {};
    if (!check.permissions.me) check.permissions.me = [];
    if (!check.permissions.user) check.permissions.user = [];
    this.permissions = check.permissions;
  }

  setClient(client) {
    this.client = client;
  }

  run(message, args, client) {
    this.emit("run", message, args, client);
  }

  runInPM(message, args, client) {
    if (this._events.runInPM) this.emit("runInPM", message, args, client);
    else this.emit("run", message, args, client);
  }
}
