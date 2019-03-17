// Packages
const discord = require("discord.js");

// No guilds message handler
const noGuildHandler = require("./nl_message_no_guild.js");

// The export function
module.exports = async (client, message) => {
  this.client = client;
  // Error
  message.error = function(err) {
    message.channel.send(new discord.RichEmbed()
      .setTitle("Er ging iets fout!")
      .setColor("#ff0000")
      .setDescription(err)
    );
  }

  // Basic checking
  if (message.author.bot && this.client.ignore.bot) return;
  if (!message.guild) {
    if (this.client.ignore.pm) return;
    return noGuildHandler(client, message);
  }

  if (this.client.settings) {
    // Database loading: Guild settings
    message.guild.dbId = `guild-${message.guild.id}`;
    message.guild.settings = await this.client.db.get(message.guild.dbId);
    if (!message.guild.settings) message.guild.settings = this.client.config.guildSettings;
    message.guild.updateDB = async function() {
      await this.client.db.set(message.guild.dbId, message.guild.settings);
      return message.guild.settings;
    }
    message.guild.updateDB();

    // Database loading: User settings
    message.author.dbId = `author-${message.author.id}`;
    message.author.settings = await this.client.db.get(message.author.dbId);
    if (!message.author.settings) message.author.settings = this.client.config.authorSettings;
    message.author.updateDB = async function() {
      await this.client.db.set(message.author.dbId, message.author.settings);
      return message.author.settings;
    }
    message.author.updateDB();

    // Databaase loading: Per guild user settings
    message.author.guildDbId = `guild-${message.guild.id}-author-${message.author.id}`;
    message.author.guildSettings = await this.client.db.get(message.author.dbId);
    if (!message.author.guildSettings) message.author.guildSettings = this.client.config.authorGuildSettings;
    message.author.updateGuildDB = async function() {
      await this.client.db.set(message.author.dbId, message.author.guildSettings);
      return message.author.guildSettings;
    }
    message.author.updateGuildDB();

    if (this.client.keepTrackOfDatabase) {
      let users = await this.client.db.get("users");
      if (!users) users = [];
      if (!users.includes(`author-${message.author.id}`)) users.push(`author-${message.author.id}`);
      await this.client.db.set("users", users);

      let guildUser = await this.client.db.get("guild-user");
      if (!guildUser) guildUser = [];
      if (!guildUser.includes(`guild-${message.guild.id}-author-${message.author.id}`)) guildUser.push(`guild-${message.guild.id}-author-${message.author.id}`);
      await this.client.db.set("guild-user", guildUser);

      let guilds = await this.client.db.get("guilds");
      if (!guilds) guilds = [];
      if (!guilds.includes(`guild-${message.guild.id}`)) guilds.push(`guild-${message.guild.id}`);
      await this.client.db.set("guilds", guilds);
    }

    // A custom embed
    message.embed = function() {
      if (message.guild.settings.embed) {
        let embed = new discord.RichEmbed();
        if (message.guild.settings.embed.footerImage === "BOTAVATAR") message.guild.settings.embed.footerImage = `https://cdn.discordapp.com/avatars/${this.client.user.id}/${this.client.user.avatar}.png`;
        if (message.guild.settings.embed.color) embed.setColor(message.guild.settings.embed.color);
        if (message.guild.settings.embed.thumbnail) embed.setThumbnail(message.guild.settings.embed.thumbnail);
        if (message.guild.settings.embed.footerText && !message.guild.settings.embed.footerImage) embed.setFooter(message.guild.settings.embed.footerText);
        else if (!message.guild.settings.embed.footerText && message.guild.settings.embed.footerImage) embed.setFooter("", message.guild.settings.embed.footerImage);
        else if (message.guild.settings.embed.footerText && message.guild.settings.embed.footerImage) embed.setFooter(message.guild.settings.embed.footerText, message.guild.settings.embed.footerImage);
        if (message.guild.settings.embed.time) embed.setTimestamp();
        if (message.guild.settings.embed.url) embed.setURL(message.guild.settings.embed.url);
        return embed;
      } else return new discord.RichEmbed();
    }

    // Prefix, command, args
    if (!message.content.toLowerCase().startsWith(message.guild.settings.prefix)) return;
    this.args = message.content.slice(message.guild.settings.prefix.length).trim().split(/ +/g);
    this.command = this.args.shift().toLowerCase();
  } else {
    // Message embed
    message.embed = function() {
      return new discord.RichEmbed();
    }

    if (!message.content.toLowerCase().startsWith(this.client.prefix)) return;
    this.args = message.content.slice(this.client.prefix).trim().split(/ +/g);
    this.command = this.args.shift().toLowerCase();
  }

  // Flags
  this.arg = [];
  message.flags = [];
  this.args.forEach(arg => {
    if (arg.toLowerCase().startsWith("-")) message.flags.push(arg.split("-")[1].toLowerCase());
    else this.arg.push(arg);
  });
  this.args = this.arg;

  // Finding the command
  this.cmd = this.client.commands.get(this.command) || this.client.subCommands.get(this.command);
  if (!this.cmd) return;

  // Checking if the channel is active with something
  let activeChannels = await this.client.db.get("activeChannels");
  if (!activeChannels) activeChannels = [];
  if (activeChannels.includes(message.channel.id)) return message.react("❌");

  // Checking command permissions
  this.cmdPermission = await this.cmd.check(this.client, message, this.args, true);
  if (!this.cmdPermission) return;

  // CommandLevel
  this.cmdLevelCheck = this.client.config.permissionLevels[this.cmd.permLevel];
  if (this.cmdLevelCheck)this.cmdLevelCheck = await this.cmdLevelCheck(this.client, message, this.args);
  else this.cmdLevelCheck = false;
  if (!this.cmdLevelCheck) return message.channel.send(message.embed()
    .setTitle("Geen permissie!")
    .setColor("#ff0000")
    .setDescription(`Het commando **${this.cmd.help.name}** heeft permissie level **${this.cmd.permLevel}** nodig, en die heb jij niet!`)
  );

  // Bot permissions
  this.member = message.guild.members.get(this.client.user.id);
  this.botPermissions = this.member.permissions;
  this.missing = [];
  this.cmd.permissions.me.forEach(perm => {
    if (perm === "BOT_OWNER") {
      if (!this.client.config.botOwners.includes(this.client.user.id)) this.missing.push(perm);
    } else if (!this.botPermissions.has(perm)) this.missing.push(perm);
  });
  this.client.defaultPermissions.forEach(perm => {
    if (perm === "BOT_OWNER") {
      if (!this.client.config.botOwners.includes(this.client.user.id)) this.missing.push(perm);
    } else if (!this.botPermissions.has(perm)) this.missing.push(perm);
  });
  if (this.missing.length !== 0) {
    try {
      return message.channel.send(message.embed()
        .setTitle("Geen permissie!")
        .setColor("#ff0000")
        .setDescription(`Ik mis de volgende permissies:\n- **${this.missing.join("**\n- **")}**`)
      );
    } catch(e) {
      return message.channel.send(`Ik mis de volgende permissies:\n- **${this.missing.join("**\n- **")}**`);
    }
  }

  // User permissions
  this.userPerms = message.member.permissions;
  this.missing = [];
  this.cmd.permissions.user.forEach(perm => {
    if (perm === "BOT_OWNER") {
      if (!this.client.config.botOwners.includes(message.author.id)) this.missing.push(perm);
    } else if (!this.userPerms.has(perm)) this.missing.push(perm);
  });
  if (this.missing.length !== 0) {
    return message.channel.send(message.embed()
      .setTitle("Geen permissie!")
      .setColor("#ff0000")
      .setDescription(`Je mist de volgende permissies:\n- **${this.missing.join("**\n- **")}**`)
    );
  }

  // Checking if the bot is restarting
  if (this.client.restarting) return message.error("De bot is opnieuw aan het opstarten, probeer het later nog een keer!");

  // Running the command
  if (this.cmd.prepare) await this.cmd.prepare(message, this.arg);
  await this.cmd.run(message, this.args, this.client);
  if (this.cmd.done) await this.cmd.done(message, this.args);
}
