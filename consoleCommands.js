const consoleModule = require("readline");
const fs = require('fs');
const loader = require("./custom_modules/loader");
const chalk = require("chalk");

//Nu maken wij de console line in zodat je commands (zoals restart) kan doen!
module.exports.run = async (client) => {
  const consoleCommands = await consoleModule.createInterface({input: process.stdin, output: process.stdout});
  consoleCommands.on('line', async (input) => {
      let args = input.split(" ").slice(1);
      let command = input.split(" ")[0];

      if (command.toLowerCase() === "restart" || command.toLowerCase() === "rs") {
        client.restartLog = false;
        client.start = Date.now();
        client.startType = "restart";
        console.log("<---> Bot herstarten...");
        client.start = Date.now();
        //Bot stoppen
        client.destroy();
        setTimeout(async function(){
          //Alles deleten
          try {
            delete require.cache[require.resolve(`./guildSettings.js`)];
            delete require.cache[require.resolve(`./config/main/main.json`)];
          } catch(err) {}
          fs.readdir("./commands/", (err, files) => {
            if (err) throw (err);
            files.forEach(file => {
              if (file.endsWith(".js")) {
                delete require.cache[require.resolve(`./commands/${file}`)];
                let commandName = file.split(".js")[0];
                client.commands.delete(commandName);
              } else {
                try {
                  fs.readdir(`./commands/${file}/`, (err, bestanden) => {
                    if (err) throw (err);
                    bestanden.forEach(bestand => {
                      if (bestand.endsWith(".js")) {
                        delete require.cache[require.resolve(`./commands/${file}/${bestand}`)];
                        let commandName = bestand.split(".js")[0];
                        client.commands.delete(commandName);
                      }
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

          //Opnieuw laden
          setTimeout(function() {
            loader.load("command", client);
          }, 100);
          loader.load("event", client);
          loader.load("process_event", client);
          setTimeout(function() {
            loader.load("function", client);
          }, 200);
          setTimeout(function() {
            loader.load("config", client);
          }, 300);

          //Bot starten
          await client.login(client.config.main.token);
          console.log("<---> Bot herstart!")
        }, Math.round(Math.random() * 5000 + 1));
      } else if (command.toLowerCase() === "stop" || command.toLowerCase() === "st") {
        await console.log("<---> Ik stop...");
        process.exit();
      } else if (command.toLowerCase() === "guilds" || command.toLowerCase() === "servers") {
        if (client.guilds.size === 0) return console.log(`<---> Ik zit in geen enkele ${command}!`)
        let guilds = "";
        let guildcount = client.guilds.size;
        let i = 0;
        let servers = '\n';
        await client.guilds.forEach(async (guild) => {
            i++
            await guild.channels.forEach(async (channel) => {
                let invite = await channel.createInvite({maxUses: 1, maxAge: 0});
                servers += `**${guild.name}**: ${invite}\n`;
                return;
            })
            if (i === Number(guildcount)) {
              console.log(`<---> ${servers}`);
              return;
            }
        })
      } else return console.log(`<---> ${chalk.red(command)} is geen geldig command, kies uit RESTART of STOP!`);
  });
}
