const BananenBase = require("../src/BananenBase");

let bot = new BananenBase("TOKEN");

bot.setConfig(require("./config.json"));
bot.addModule(["loader", "alias", "database", "messageflags", "args"]);
bot.addModule("security", {
  defaultPermissions: {
    user: ["SEND_MESSAGES"],
    bot: ["EMBED_LINKS"]
  },
  permissionNames: {
    botOwner: (message, BananenBase) => {
      let botOwners = ["327462385361092621", "259776081316282368"];
      return botOwners.includes(message.author.id);
    }
  }
})

bot.ready((BananenBase) => {
  BananenBase.start();
}).then(() => {
  console.log("BananenBase is ready!");
});