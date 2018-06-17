const Discord = require("discord.js");
exports.run = async (client) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  let clean = client.function.clean;
  if (!args[0]) return message.reply("geef code op!");
  if (args.join(" ").includes("token")) return message.reply("je kan mijn token niet opvragen!");
  message.channel.send(":large_orange_diamond: **Bezig met uitvoeren...**").then(async msg => {
    try {
        const code = args.join(" ");
        let evaled = await eval(code);
        if (typeof evaled !== "string") {
          evaled = await require("util").inspect(evaled);
        }
        await msg.edit(`:white_check_mark: **Het ging goed:** \`\`\`xl\n${clean.run(client, evaled)}\`\`\``);
      } catch (err) {
        await msg.edit(`🔴 **Er ging iets fout:** \`\`\`xl\n${clean.run(client, err)}\n\`\`\``);
      }
  })
}
exports.help = {
  name: "eval",
  usage: "eval <code>",
  description: "Voer nodejs commands uit met de bot!",
  category: "botOwner",
  extraCommands: ["e"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 6,
  guildOnly: false
}
