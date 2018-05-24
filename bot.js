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
      consoleModule = require("readline"),
      dataModule = require("./custom_modules/data");

//Ook maken wij de discord client aan en laten wij die inloggen met de token die in de config.json staat. Ook maken we een command variable!
const client = new Discord.Client({autoReconnect: true});
client.login(config.token);
client.commands = new Discord.Collection();

//Nu maken wij de database aan!
const data = new dataModule({path: __dirname});

//En dan nu de variables in client, zodat de bot sneller is en alle variables worden meegenomen!
client.queue = {};
client.data = data;
client.config = config;
client.start = start;

//Nu maken wij de console line in zodat je commands (zoals restart) kan doen!
const consoleCommands = consoleModule.createInterface({input: process.stdin, output: process.stdout});
consoleCommands.on('line', async (input) => {
    let args = input.split(" ").slice(1);
    let command = input.split(" ")[0];

    if (command.toLowerCase() === "restart" || command.toLowerCase() === "rs") {
      console.log("<---> Bot herstarten...");
      setTimeout(function(){
        delete require.cache[require.resolve(`./config.json`)];
        fs.readdir("./commands/", (err, files) => {
          if (err) throw (err);
          files.forEach(file => {
            if (file.endsWith(".js")) {
              delete require.cache[require.resolve(`./commands/${file}`)];
            } else {
              try {
                fs.readdir(`./commands/${file}/`, (err, bestanden) => {
                  if (err) throw (err);
                  bestanden.forEach(bestand => {
                    delete require.cache[require.resolve(`./commands/${file}/${bestand}`)];
                  })
                })
              } catch(err) {
                if (err) throw (err);
              }
            }
          })
        })
        fs.readdir("./events/", (err, files) => {
          if (err) throw (err);
          files.forEach(file => {
            if (file.endsWith(".js")) {
              delete require.cache[require.resolve(`./events/${file}`)];
            } else {
              try {
                fs.readdir(`./events/${file}/`, (err, bestanden) => {
                  if (err) throw (err);
                  bestanden.forEach(bestand => {
                    delete require.cache[require.resolve(`./events/${file}/${bestand}`)];
                  })
                })
              } catch(err) {
                if (err) throw (err);
              }
            }
          })
        })
        fs.readdir("./process_events/", (err, files) => {
          if (err) throw (err);
          files.forEach(file => {
            if (file.endsWith(".js")) {
              delete require.cache[require.resolve(`./process_events/${file}`)];
            } else {
              try {
                fs.readdir(`./process_events/${file}/`, (err, bestanden) => {
                  if (err) throw (err);
                  bestanden.forEach(bestand => {
                    delete require.cache[require.resolve(`./process_events/${file}/${bestand}`)];
                  })
                })
              } catch(err) {
                if (err) throw (err);
              }
            }
          })
        })
        console.log("<---> Bot herstart!")
      }, 1000)
    } else if (command.toLowerCase() === "stop" || command.toLowerCase() === "st") {
      await console.log("Ik stop...");
      process.exit();
    } else console.log(`<---> ${chalk.red(command)} is geen geldig command, kies uit RESTART of STOP!`);
});

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
  console.log(`Events laden...`);
  let i = 0;
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`   ${chalk.blue("EVENT")}: ${i + 1}: ${eventName}.js is succesvol geladen!`);
    if (eventFunction.config === undefined) return;
    if (eventFunction.config.enable === undefined) return;
    if (eventFunction.config.enable !== true) return;
    i++;
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

//Als je een nodejs app runt, heb je ook process events, zoals 'exit'. Die worden er hier gebruikt!
fs.readdir("./process_events/", (err, files) => {
  if (err) return console.error(err);
  console.log(`Process events laden...`);
  let i = 0;
  files.forEach(file => {
    let processEventFunction = require(`./process_events/${file}`);
    let processEventName = file.split(".")[0];
    console.log(`   ${chalk.yellow("PROCESS_EVENT")}: ${i + 1}: ${processEventName}.js is succesvol geladen!`);
    if (processEventFunction.config === undefined) return;
    if (processEventFunction.config.enable === undefined) return;
    if (processEventFunction.config.enable !== true) return;
    i++;
    process.on(processEventName, (...args) => processEventFunction.run(...args));
  });
});
