const Discord = require("discord.js");

module.exports = class Embed {
  constructor(type) {
    if (!type) type = "normal";
    this.type = type;
    this.embed = new Discord.RichEmbed();
    this.embed.setTimestamp()
    if (this.type === "error") this.embed.setTitle(":x: ERROR! :x:").setColor("#ff0000");
    else if (this.type === "normal") this.embed.setColor("RANDOM");
  }
  // Thumbnail
  setThumbnail(url) {
    this.embed.setThumbnail(url);
    return this.embed;
  }
  // Time
  setTimestamp(time) {
    this.embed.setTimestamp(time);
    return this.embed;
  }
  // Author
  setAuthor(name, icon, url) {
    this.embed.setAuthor(name, icon, url);
    return this.embed;
  }
  // Url
  setURL(url) {
    this.embed.url = url;
    return this.embed;
  }
  // Titel
  setTitle(title) {
    this.embed.setTitle(title);
    return this.embed;
  }
  // Beschrijving
  setDescription(description) {
    this.embed.setDescription(description);
    return this.embed;
  }
  // Kleur
  setColor(color) {
    this.embed.setColor(color);
    return this.embed;
  }
  // Footer
  setFooter(text, icon) {
    this.embed.setFooter(text, icon);
    return this.embed;
  }
  // Image
  setImage(url) {
    this.embed.setImage(url);
    return this.embed;
  }
  // Error
  setError(error) {
    this.embed.setDescription(`Er ging iets fout! **${error}**!`);
    return this.embed;
  }
  // addField
  addField(name, value, inline = true) {
    this.embed.addField(name, value, inline);
    return this.embed;
  }
  // addBlank Field
  addBlankField(inline = false) {
    this.embed.addBlankField(inline);
    return this.embed;
  }
}
