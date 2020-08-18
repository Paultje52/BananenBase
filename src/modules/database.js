const colors = require("../colors.js");
const Database = require("../constructors/Database.js");

module.exports = exports = class DatabaseModule extends require("../constructors/Module.js") {
  constructor() {
    super({
      name: "database",
      toConfigure: {
        name: "required.string",
        development: "optional.boolean",
        guildSettings: "optional.object",
        userSettings: "optional.object",
        inMemory: "optional.boolean",
        compression: "optional.boolean"
      },
      dependencies: ["json-config-store", "sqlite3", "lzjs"]
    });
  }

  afterConfigure() {
    this.database = new Database({
      development: this.options.development,
      cwd: process.cwd(),
      name: this.options.name,
      inMemory: this.options.inMemory,
      compression: this.options.compression
    });

    this.database.isReady().then(() => {
      console.log(`${colors("[Database]").cyan().done()} Database ${colors(this.options.name).green().done()} is ready!`);
    });

    this.BananenBase.database = this.database;
    this.BananenBase.client.db = this.database;
    this.defaults = {
      user: this.options.userSettings || {},
      guild: this.options.guildSettings || {}
    }
  }

  async onMessage(message, continues) {
    if (!continues) return false;
    message.author.dbId = `user-${message.author.id}`;
    message.author.settings = await this.database.get(message.author.dbId);
    if (!message.author.settings) message.author.settings = this.defaults.user;

    message.guild.dbId = `guild-${message.guild.id}`;
    message.guild.settings = await this.database.get(message.guild.dbId);
    if (!message.guild.settings) message.guild.settings = this.defaults.guild;
  }
}