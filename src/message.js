module.exports = async (message, BananenBase) => {
  if (message.author.bot) return;
  message.recivedTimestamp = Date.now();

  BananenBase.debug(`\nNew message: "${message.content}", from user with ID "${message.author.id}". Date: ${Date.now()}`);

  message.tmp = {};
  if (!message.guild) return BananenBase.debug(">>> Can't handle message: Is not in a guild!");

  let canGoFuther = true;
  // BananenBase.modules = BananenBase.modules.sort((a, b) => a.priority-b.priority);
  for (let i in BananenBase.modules) {
    if (Object.keys(BananenBase.modules[i]).length === 0) break;
    let res = await BananenBase.modules[i].internal_BB_Execute("onMessage", message, canGoFuther);
    if (typeof res === "boolean" && !res) {
      canGoFuther = BananenBase.modules[i];
      break;
    }
  }
  if (canGoFuther !== true) return BananenBase.debug(`>>> (1/3) Can't go further because of "${canGoFuther.name}"`);
  
  BananenBase.client.emit("BananenBase.Message", message);

  let prefix = BananenBase.config.prefix;
  if (message.guild && message.guild.settings && message.guild.settings.prefix) prefix = message.guild.settings.prefix;
  if (message.author && message.author.settings && message.author.settings.prefix) prefix = message.guild.author.prefix;
  if (!prefix) prefix = ".";
  message.prefix = prefix;

  if (!message.content.toLowerCase().startsWith(prefix)) return BananenBase.debug(`>>> Message didn't start with prefix (${prefix})`);
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  let cmd = BananenBase.commands[command] || message.tmp.command;
  if (!cmd) return BananenBase.debug(`>>> Didn't find a command with: ${command}!`);
  delete message.tmp;

  message.args = args;
  for (let i = 0; i < BananenBase.modules.length; i++) {
    if (Object.keys(BananenBase.modules[i]).length === 0) break;
    let res = await BananenBase.modules[i].internal_BB_Execute("beforeCommandExecute", message, cmd, canGoFuther);
    if (typeof res === "boolean" && !res) {
      canGoFuther = BananenBase.modules[i];
      break;
    }
  }
  if (canGoFuther !== true) return BananenBase.debug(`>>> (2/3) Can't go further because of "${canGoFuther.name}"`);
  delete message.args;

  BananenBase.debug(`>>> Command running: ${cmd.help.name}!`);
  await cmd.run(message, args);
  
  for (let i = 0; i < BananenBase.modules.length; i++) {
    if (Object.keys(BananenBase.modules[i]).length === 0) break;
    let res = await BananenBase.modules[i].internal_BB_Execute("afterCommandExecute", message, cmd, canGoFuther);
    if (typeof res === "boolean" && !res) {
      canGoFuther = BananenBase.modules[i];
      break;
    }
  }
  if (canGoFuther !== true) return BananenBase.debug(`>>> (3/3) Can't go further because of "${canGoFuther.name}"`);

  BananenBase.debug(`>>> Message executing chain completed without any errors! Time took: ${Date.now()-message.recivedTimestamp}ms`);
}