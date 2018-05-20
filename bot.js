//Eerst zeggen wij in de console dat we gaan opstarten. Ook zetten we de variable 'start' naar de datum dat het op het moment dat de bot wordt gerunt is!
console.log("Ik start op!");
let start = Date.now();

//Nu gaan we de packages inladen!
const Discord = require("discord.js"),
      fs = require("fs"),
      config = require("./config.json"),
      yt = require("ytdl-core"),
      ffmpegbinaries = require("ffmpeg-binaries"),
      cheerio = require("cheerio"),
      snekfetch = require("snekfetch"),
      querystring = require("querystring"),
      search = require("youtube-search"),
      chalk = require("chalk"),
      dataModule = require("./custom_modules/data");

console.log(require('discord.js').version);

//Ook maken wij de discord client aan en laten wij die inloggen met de token die in de config.json staat. Ook maken we een command variable!
const client = new Discord.Client({autoReconnect: true});
client.login(config.token);
client.commands = new Discord.Collection();
let queue = {};

//Nu maken wij de database aan!
const data = new dataModule({path: __dirname});

//Nu laden wij de commands in!
setTimeout(function() {
  fs.readdir("./commands/", (err, files) => {
    console.log(`Commands laden...`);
    let ii = 0;
    if (err) throw (err);
    files.forEach(file => {
      if (file.endsWith(".js")) {
        let props = require(`./commands/${file}`);
        client.commands.set(props.help.name, props);
        ii++;
        console.log(`   ${chalk.green("COMMAND")}: ${ii}: ${file} is succesvol geladen!`);
      } else {
        try {
          fs.readdir(`./commands/${file}/`, (err, bestanden) => {
            if (err) throw (err);
            bestanden.forEach(bestand => {
              let props = require(`./commands/${file}/${bestand}`);
              client.commands.set(props.help.name, props);
              ii++;
              console.log(`   ${chalk.green("COMMAND")}: ${ii}: ${bestand} is succesvol geladen!`);
            })
          })
        } catch(err) {
          if (err) throw (err);
        }
      }
    })
  })
}, 10)

//We hebben ook events, die worden hier goed uitgevoerd!
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  console.log(`events laden...`);
  let i = 0;
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`   ${chalk.blue("EVENT")}: ${i + 1}: ${eventName}.js is succesvol geladen!`);
    if (eventFunction.config === undefined) return;
    if (eventFunction.config.enable === undefined) return;
    if (eventFunction.config.enable !== true) return;
    i++;
    client.on(eventName, (...args) => eventFunction.run(client, data, config, start, ...args, queue));
  });
});

process.on('unhandledRejection', console.error);
