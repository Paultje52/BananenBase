//Eerst zeggen wij in de console dat we gaan opstarten. Ook zetten we de variable 'start' naar de datum dat het op het moment dat de bot wordt gerunt is!
console.log("Ik start op!");
let start = Date.now();

//Nu gaan we de packages inladen!
const Discord = require("discord.js")
      consoleCommands = require("./consoleCommands.js"),
      loader = require("./custom_modules/loader"),
      dataModule = require("./custom_modules/data");

//Ook maken wij de discord client aan en maken we een command variable!
const client = new Discord.Client({autoReconnect: true});
client.commands = new Discord.Collection();
client.functions = new Discord.Collection();

//En dan nu de variables in client, zodat de bot sneller is en alle variables worden meegenomen!
client.queue = {};
client.dataModule = dataModule;
client.start = start;
client.data = undefined;
client.dirname = __dirname;
client.restartLog = false;
client.startType = "startup";
client.guildPermission1 = [`425643727953068042`]; //Alle servers met server permission 1. Voorbeeld: [`ID1`, `ID2`, `ID3`]
client.guildPermission2 = []; //Alle servers met server permission 2. Voorbeeld: [`ID1`, `ID2`, `ID3`]
client.guildPermission3 = []; //Alle servers met server permission 3. Voorbeeld: [`ID1`, `ID2`, `ID3`]
client.guildPermission4 = []; //Alle servers met server permission 4. Voorbeeld: [`ID1`, `ID2`, `ID3`]
client.guildPermission5 = []; //Alle servers met server permission 5. Voorbeeld: [`ID1`, `ID2`, `ID3`]

//We laden de console commands in!
consoleCommands.run(client);

//Nu laden wij de commands in!
setTimeout(function() {
  loader.load("command", client);
}, 100);

//We hebben ook events, die worden hier goed uitgevoerd!
loader.load("event", client);

//Als je een nodejs app runt, heb je ook process events, zoals 'exit'. Die worden er hier gebruikt!
loader.load("process_event", client);

//Je kan ook functies aanmaken die je overal kan gebruiken met 'client.FUNCTIENAAM.run(client)'!
setTimeout(function() {
  loader.load("function", client);
}, 200);

//Als je meerdere configs wilt hebben, gaat dat ook!
setTimeout(function() {
  loader.load("config", client);
}, 300);

//Als alles gedaan is, start de bot op!
setTimeout(function() {
  client.login(client.config.main.token);
}, 500);
