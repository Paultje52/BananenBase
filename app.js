const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const client = new Discord.Client();
const { prefix, token, supportcategory, managerrole } = require("./botconfig.json");
const yt = require("ytdl-core");
const ffmpegbinaries = require("ffmpeg-binaries");
const opusscript = require("opusscript");
const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');
const search = require('youtube-search');
const youtubeThumbnail = require('youtube-thumbnail');
let queue = {};

c = new Discord.Client({
	autoReconnect: true
});
	
 client.on("ready", async () => {
  console.log(`${client.user.username} is nu aan!!`);
  console.log(`Tijd voor een feestje!!!`);
  client.user.setActivity("https://zeuven.eu/")
});


client.on("message", async message => {
    let msg = message.content.toUpperCase();
    if(message.author.bot) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
      if(message.channel.id === "441347817781592065") {
if(cmd === `${prefix}ticket`){
    message.delete();
    } else {
        message.delete();
        return message.channel.send(`${message.author.username}, dit is geen !ticket command!`).then(msg => {msg.delete(15000)});
    }
}  

if(cmd === `kanker` | cmd === `kk` | cmd === `kkr`){
    message.delete();
    return message.channel.send(`Aub niet schelden! **${message.author.username}**`);
    }
    
    if(cmd === `${prefix}ikwiltesten`){   
    const guildMember = message.member;
  var memberrole = message.guild.roles.find(`name`, `Member`)
  if(!memberrole) return message.channel.send("Er is geen role genaamt `Member`!");
  guildMember.addRole(memberrole)
  message.channel.send(`**${message.author.username}** heeft nu de role Member!`)
  }

if(message.channel.id === "440975195659042826") {
    message.react("440976176358490113")
    message.react("440976220902129695")
    message.react("440976259204251658")
}

if(message.channel.id === "423865237356412929") {
  let vraagEmbed = new Discord.RichEmbed()
  .setTitle("**Algemene vraag**")
  .setColor("#42f1f4")
  .addField("Door", `-<@${message.author.id}>`)
  .setDescription(message);

  let vraagChannel = message.guild.channels.find(`name`, "➥vragen");
  if(!vraagChannel) return message.channel.send("Er bestaat geen #➥vragen kanaal");

  vraagChannel.send(vraagEmbed);
  message.delete();
return message.channel.send(`${message.author.username}, je vraag is doorgegeven!`);
  return;
}

if(message.channel.id === "419917431189012481") {
  let vraagEmbed = new Discord.RichEmbed()
  .setTitle("**Website/Bot vraag**")
  .setColor("#42f1f4")
  .addField("Door", `-<@${message.author.id}>`)
  .setDescription(message);

  let vraagChannel = message.guild.channels.find(`name`, "➥vragen");
  if(!vraagChannel) return message.channel.send("Er bestaat geen #➥vragen kanaal");

  vraagChannel.send(vraagEmbed);
  message.delete();
return message.channel.send(`${message.author.username}, je vraag is doorgegeven!`);
  return;
}

if(message.channel.id === "419917402416087040") {
  let vraagEmbed = new Discord.RichEmbed()
  .setTitle("**Website/Bot bug**")
  .setColor("#42f1f4")
  .addField("Door", `-<@${message.author.id}>`)
  .setDescription(message);

  let vraagChannel = message.guild.channels.find(`name`, "➥vragen");
  if(!vraagChannel) return message.channel.send("Er bestaat geen #➥vragen kanaal");

  vraagChannel.send(vraagEmbed);
  message.delete();
return message.channel.send(`${message.author.username}, je bug is doorgegeven!`);
  return;
}

if(message.channel.id === "419918361464537099") {
  let vraagEmbed = new Discord.RichEmbed()
  .setTitle("**Design vraag**")
  .setColor("#42f1f4")
  .addField("Door", `-<@${message.author.id}>`)
  .setDescription(message);

  let vraagChannel = message.guild.channels.find(`name`, "➥vragen");
  if(!vraagChannel) return message.channel.send("Er bestaat geen #➥vragen kanaal");

  vraagChannel.send(vraagEmbed);
  message.delete();
return message.channel.send(`${message.author.username}, je vraag is doorgegeven!`);
  return;
}

if(message.channel.id === "419918571867602954") {
  let vraagEmbed = new Discord.RichEmbed()
  .setTitle("**Youtube vraag**")
  .setColor("#42f1f4")
  .addField("Door", `-<@${message.author.id}>`)
  .setDescription(message);

  let vraagChannel = message.guild.channels.find(`name`, "➥vragen");
  if(!vraagChannel) return message.channel.send("Er bestaat geen #➥vragen kanaal");

  vraagChannel.send(vraagEmbed);
  message.delete();
return message.channel.send(`${message.author.username}, je vraag is doorgegeven!`);
  return;
}

if(message.channel.id === "441341731175137290") {
  let vraagEmbed = new Discord.RichEmbed()
  .setTitle("**Verkoop vraag**")
  .setColor("#42f1f4")
  .addField("Door", `-<@${message.author.id}>`)
  .setDescription(message);

  let vraagChannel = message.guild.channels.find(`name`, "➥vragen");
  if(!vraagChannel) return message.channel.send("Er bestaat geen #➥vragen kanaal");

  vraagChannel.send(vraagEmbed);
  message.delete();
return message.channel.send(`${message.author.username}, je vraag is doorgegeven!`);
  return;
}
    
if(message.channel.id === "434482938718060563") {
    message.react("👍")
    message.react("👎")
}

if(message.channel.id === "444870229806546944") {
    message.react("👍")
    message.react("👎")
}
if(message.channel.id === "435004661888450561") {
    message.react("👍")
    message.react("👎")
}

if(message.channel.id === "435004846681227266") {
    message.react("👍")
    message.react("👎")
}

if(message.channel.id === "419918537973432320") {
    message.react("👍")
    message.react("👎")
}

if(message.channel.id === "419918657330610196") {
    message.react("👍")
    message.react("👎")
}
  
  
    if(cmd === `${prefix}hey`){
        message.delete();
    return message.channel.send("Hey, how you doing. Well im doing just fine. I lied i’m dieing inside. :gun:");
    }

    if(cmd === `${prefix}help`){   
        let bicon = client.user.displayAvatarURL;
        if (!args[0]) {
            let botembed = new Discord.RichEmbed()
            .setDescription(":regional_indicator_h:  :regional_indicator_e:  :regional_indicator_l:  :regional_indicator_p:")
            .setColor("#42f1f4")
            .setThumbnail(bicon)
            .addField("!help info", "Zie alle informatie commands")
            .addField("!help moderatie", "Zie alle moderatie commands")
            .addField("!help fun", "Zie alle fun commands")
            .addField("!help kopen", "Zie alle commands voor het kopen van producten")
            .addField("!help muziek", "Zie alle commands voor het afspelen van muziek")
            .setFooter("Created by TijsEijs", client.user.displayAvatarURL)
            return message.channel.send(botembed);
        } else {
            if (args[0] === "info") {
                let botembed = new Discord.RichEmbed()
                .setDescription(":regional_indicator_i:  :regional_indicator_n:  :regional_indicator_f:  :regional_indicator_o:")
                .setColor("#42f1f4")
                .setThumbnail(bicon)
                .addField("!serverinfo", "Krijg info over de server")
                .addField("!prijslijst", "Zie onze prijzen")
                .addField("!site", "Onze website")
                .addField("!botinfo", "Bot informatie")
                .setFooter("Created by TijsEijs", client.user.displayAvatarURL)
                return message.channel.send(botembed);
            } else {
                if (args[0] === "moderatie") {
                    let botembed = new Discord.RichEmbed()
                    .setDescription(":regional_indicator_m:  :regional_indicator_o:  :regional_indicator_d:")
                    .setColor("#42f1f4")
                    .setThumbnail(bicon)
                    .addField("**Al deze commands zijn te gebruiken met de perm:**", "**Manage messages**")
                    .addField("!kick", "Kick een lid")
                    .addField("!ban", "Ban een persoon")
                    .addField("!warn", "Waarschuw een persoon")
                    .addField("!clean", "Delete een aantal berichten")
                    .addField("!nieuws", "Deel iets nieuws")
                    .setFooter("Created by TijsEijs", client.user.displayAvatarURL)
  
  return message.channel.send(botembed);
        } else {
            if (args[0] === "fun") {
            let botembed = new Discord.RichEmbed()
    .setDescription(":regional_indicator_f:  :regional_indicator_u:  :regional_indicator_n:")
  .setColor("#42f1f4")
  .setThumbnail(bicon)
.addField("!hey", "How are you doing ?")
.addField("!7", "ZEUVEN")
.addField("!vraag", "Stel een vraag aan onze geest")
.addField("!kopofmunt", "Gooi een muntje op")
  .setFooter("Created by TijsEijs", client.user.displayAvatarURL)
  
  return message.channel.send(botembed);
        } else {
            if (args[0] === "kopen") {
            let botembed = new Discord.RichEmbed()
    .setDescription(":regional_indicator_k:  :regional_indicator_o:  :regional_indicator_p:  :regional_indicator_e:  :regional_indicator_n:")
  .setColor("#42f1f4")
  .setThumbnail(bicon)
.addField("!ticket", "Maak een ticket aan om aan te geven wat u wilt kopen")
  .setFooter("Created by TijsEijs", client.user.displayAvatarURL)
  
  return message.channel.send(botembed);
        } else {
            if (args[0] === "muziek") {
            let botembed = new Discord.RichEmbed()
    .setDescription(":regional_indicator_m:  :regional_indicator_u:  :regional_indicator_z:  :regional_indicator_i:  :regional_indicator_e:  :regional_indicator_k:")
  .setColor("#42f1f4")
  .setThumbnail(bicon)
.addField("!speel (nummer)", "Speel een nummer af")
.addField("!skip", "Skip het nummer")
.addField("!stop", "Stop de muziekbot")
.addField("!volume", "Verander het volume van de bot")
.addField("!np", "Bekijk wat er nu speelt")
.addField("!queue", "Bekijk wat er in de wachtrij staat")
.addField("!pause", "Pauzeer de bot")
.addField("!resume", "Laat de bot verder spelen")
  .setFooter("Created by TijsEijs", client.user.displayAvatarURL)
  
  return message.channel.send(botembed);
        }
    }
    }
        }
            }
        }
    }


  if(cmd === `${prefix}prijslijst`){

  let bicon = client.user.displayAvatarURL;
  if (!args[0]) {
  let botembed = new Discord.RichEmbed()
  .setDescription(":regional_indicator_p:  :regional_indicator_r:  :regional_indicator_i:  :regional_indicator_j:  :regional_indicator_s:  :regional_indicator_l:  :regional_indicator_i:  :regional_indicator_j:  :regional_indicator_s:  :regional_indicator_t:")
  .setColor("#42f1f4")
  .setThumbnail(bicon)
  .addField("Website's", "!prijslijst websites")
  .addField("Designs", "!prijslijst designs")
  .addField("Discord Bot's", "!prijslijst bots")
  .addField("MC Hosting", "!prijslijst mc")
  .setFooter("Created by TijsEijs", client.user.displayAvatarURL)

  return message.channel.send(botembed);
} else {
    if (args[0] === "websites") {
      let botembed = new Discord.RichEmbed()
  .setDescription(":regional_indicator_w:  :regional_indicator_e:  :regional_indicator_b:  :regional_indicator_s:  :regional_indicator_i:  :regional_indicator_t:  :regional_indicator_e:  :regional_indicator_s:")
  .setColor("#42f1f4")
  .setThumbnail(bicon)
  .addField("Kleine Website", "€3,00")
  .addField("Normale Website", "€4,00")
  .addField("Grote Website", "Prijs op aanvraag")
  .addField("Kleine Website + Hosting", "€1,49 p/m + €3,00")
  .addField("Normale Website + Hosting", "€1,49 p/m + €4,00")
  .addField("Kleine Website + NL Domein + Hosting", "€1,49 p/m + €3,00 + €7,00 p/j",)
  .addField("Normale Website + NL Domein + Hosting", "€1,49 p/m + 4,00 + €7,00 p/j",)
  .addField("Grote Website + NL Domein + Hosting", "Prijs op aanvraag",)
  .addField("Website Hosting", "€1,49 p/m")
  .addField("NL Domein", "€7,00 p/j",)
  .setFooter("Created by TijsEijs", client.user.displayAvatarURL)

  return message.channel.send(botembed);
    } else {
        if (args[0] === "designs") {
            let botembed = new Discord.RichEmbed()
    .setDescription(":regional_indicator_d:  :regional_indicator_e:  :regional_indicator_s:  :regional_indicator_i:  :regional_indicator_g:  :regional_indicator_n:  :regional_indicator_s:")
  .setColor("#42f1f4")
  .setThumbnail(bicon)
  .addField("Minecraft skin", "€1,00",)
  .addField("Logo Simpel", "€0,75")
  .addField("Logo Gemiddeld", "€1,00",)
  .addField("YT Banner Makkelijk", "€1,25")
  .addField("YT Banner Moeilijk", "€1,75",)
  .addField("Merch design Makkelijk", "€1,75")
  .addField("Merch design Gemiddeld", "€2,25",)
  .addField("Merch design Moeilijk", "€2,75")
  .setFooter("Created by TijsEijs", client.user.displayAvatarURL)
  
  return message.channel.send(botembed);
        } else {
            if (args[0] === "bots") {
            let botembed = new Discord.RichEmbed()
    .setDescription(":regional_indicator_d:  :regional_indicator_i:  :regional_indicator_s:  :regional_indicator_c:  :regional_indicator_o:  :regional_indicator_r:  :regional_indicator_d:            :regional_indicator_b:  :regional_indicator_o:  :regional_indicator_t:  :regional_indicator_s:")
  .setColor("#42f1f4")
  .setThumbnail(bicon)
  .addField("Basis Bot", "€2,50")
  .addField("Gevorderde Bot", "€3,50")
  .addField("Moeilijke Bot", "Prijs op aanvraag")
  .addField("1 maand Bot Hosting", "€0,75 p/m")
  .addField("1 jaar Bot Hosting", "€9 p/j")
  .setFooter("Created by TijsEijs", client.user.displayAvatarURL)
  
  return message.channel.send(botembed);
            } else {
    if (args[0] === "mc") {
      let botembed = new Discord.RichEmbed()
  .setDescription(":regional_indicator_m: :regional_indicator_c:")
  .setColor("#42f1f4")
  .setThumbnail(bicon)
  .addField("Voor MC hosting verwijzen wij u door naar Zeuven Hosting", "https://discord.gg/DNgyTYT")
  .setFooter("Created by TijsEijs", client.user.displayAvatarURL)

  return message.channel.send(botembed);
        
    }
        }
            }
        }
  }
}


if(cmd === `${prefix}kick`){

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Deze persoon bestaat niet!");
  let kReason = args.join(" ").slice(22);
  if(!kReason)
  return message.reply("Geef een reden waarom je hem wilt kicken!");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Dit kan jij niet!");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan jij niet kicken!");
  let kickEmbed = new Discord.RichEmbed()
  .setDescription("**Kick**")
  .setColor("#FF5500")
  .addField("Gebruiker", `${kUser.user.username}`)
  .addField("Gekicked door", `<@${message.author.id}>`)
  .addField("Kanaal waarin gekicked", message.channel)
  .addField("Reden", kReason);

  let kickChannel = message.guild.channels.find(`name`, "➥modlog");
  if(!kickChannel) return message.channel.send("Er bestaat geen #➥modlog kanaal");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
  message.delete();
return message.channel.send(`${kUser.user.username} is succesvol gekicked`);
  return;
}

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Deze persoon bestaat niet!");
    let bReason = args.join(" ").slice(22);
    if(!bReason)
    return message.reply("Geef een reden waarom je hem wilt Bannen!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Dit kan jij niet!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan niet worden gebanned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#FF2A00")
    .addField("Gebruiker", `${bUser.user.username}`)
    .addField("Geband door", `<@${message.author.id}>`)
    .addField("Kanaal waarin geband", message.channel)
    .addField("Reden", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "➥modlog");
    if(!incidentchannel) return message.channel.send("Er bestaat geen #➥modlog kanaal");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
return message.channel.send(`${bUser.user.username} is succesvol geband`);

    return;
  }
  
  if(cmd === `${prefix}warn`){


    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Deze persoon bestaat niet!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("dit kan jij niet");
    let rreason = args.join(" ").slice(22);
    if(!rreason)
    return message.reply("Geef een reden waarom je hem wilt Waarschuwen!");

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("**Waarschuwingen**")
    .setColor("#FFAA00")
    .addField("Gebruiker", `${rUser.user.username}`)
    .addField("Gewaarschuwd door", `${message.author}`)
    .addField("Kanaal waarin gewarnd", message.channel)
    .addField("Reden", rreason);

    let reportschannel = message.guild.channels.find(`name`, "➥modlog");
    if(!reportschannel) return message.channel.send("Er bestaat geen #➥modlog kanaal");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
return message.channel.send(`${rUser.user.username} is succesvol gewarnd`);
    return;
  }


  if(cmd === `${prefix}serverinfo`){

  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription(":regional_indicator_s: :regional_indicator_e:   :regional_indicator_r: :regional_indicator_v: :regional_indicator_e:   :regional_indicator_r:")
  .setColor("#42f1f4")
  .setThumbnail(sicon)
  .addField("Discord naam", message.guild.name)
  .addField("Alle personen", message.guild.memberCount)
  .addField("Bot Creator", "TijsEijs#0302")
  .addField("Bot Creator Discord", "https://discord.gg/FnHFQmA");

  return message.channel.send(serverembed);
}

  if(cmd === `${prefix}website`){
message.delete();
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("Onze website is :link:**https://zeuven.eu**", "Neem gerust een kijkje :D");
  return message.channel.send(serverembed);

}


if (message.content.toLowerCase().startsWith(prefix + "botinfo")) {
            const os = require("os");
        const usememory = Math.round(os.freemem() / 1000000)
        const totalmemory = Math.round(os.totalmem() / 1000000)
        const freememory = totalmemory - usememory
    let embed = new Discord.RichEmbed().setTitle(":regional_indicator_b:  :regional_indicator_o:  :regional_indicator_t:  :regional_indicator_i:  :regional_indicator_n:  :regional_indicator_f:  :regional_indicator_o:").setColor("#42f1f4").setFooter("Created by TijsEijs", client.user.displayAvatarURL).setDescription(`**Servers**: ${client.guilds.size}\n**Channels:** ${client.channels.size}\n**Gebruikers:** ${client.users.size}\n**Uptime:** ${Math.floor(process.uptime())} seconds\n**NodeJS versie:** ${process.version} seconds\n**Bot Creator:** TijsEijs#0302\n**Bot Creator Discord:** https://discord.gg/fA6Y6Ey`);
    message.channel.send({embed});    
}

  if(cmd === `${prefix}site`){
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("Onze website is :link:**https://zeuven.eu**", "Neem gerust een kijkje :D");
  return message.channel.send(serverembed);

}

  if(cmd === `${prefix}ikhoudvanzeuven`){

  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField(":heart: love to",`<@${message.author.id}>`);
  return message.channel.send(serverembed);

}

    if (msg.startsWith(prefix + 'CLEAN')) {
        async function purge() {
            message.delete();
            if (!message.member.roles.find("name", "Service")) { 
                message.channel.send('Je hebt de \`Service\` role nodig om dit command uit te voeren.'); 
                return;
            }
            if (isNaN(args[0])) {
                message.channel.send('Gebruik aub een nummer +1 wat je wilt verwijderen om het command uit te voeren. \n Zoals: ' + prefix + 'clean <amount>');
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' berichten gevonden, aan het verwijderen...');
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }
        purge();

    }
 
 if (message.content.toLowerCase().startsWith(prefix + "botbericht")) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Dit mag jij niet!");
        if (!args[0]) return message.channel.send("Je moet wel opgeven wat je wilt zeggen!")
            message.delete()
            let sicon = message.guild.iconURL;
            let NieuwsEmbed = new Discord.RichEmbed()
            .setThumbnail(sicon)
            .setTitle("Mededeling")
            .setColor("#0c28b2")
            .setDescription(`**_${args.splice(0).join(" ")}_**\n-Het Zeuven staffteam`)
            message.channel.send(NieuwsEmbed)
}
  
 if(cmd === `${prefix}7`){
message.delete();
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("ZEUVEN", ":D");
  return message.channel.send(serverembed);

}

  if(cmd === `${prefix}77`){
message.delete();
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("ZEUVENENZEUVENTIG", ":D");
  return message.channel.send(serverembed);

}

  if(cmd === `${prefix}777`){
message.delete();
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("ZEUVENHONDERDZEUVENENZEUVENTIG", ":D");
  return message.channel.send(serverembed);

}

  if(cmd === `${prefix}7777`){
message.delete();
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("ZEUVENDUIZENDZEUVENHONDERDENZEUVENENZEUVENTIG", ":D");
  return message.channel.send(serverembed);

}

  if(cmd === `${prefix}77777`){
message.delete();
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("ZEUVENENZEUVENTIGDUIZENDZEUVENHONDERDZEUVENENZEUVENTIG", ":D");
  return message.channel.send(serverembed);
  
}

  if(cmd === `${prefix}777777`){
message.delete();
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("ZEUVENHONDERDZEUVENENZEUVENTIGDUIZENDZEUVENHONDERDZEUVENENZEUVENTIG", ":D");
  return message.channel.send(serverembed);

}

  if(cmd === `${prefix}7777777`){
message.delete();
  let serverembed = new Discord.RichEmbed()
  .setColor("#42f1f4")
  .addField("ZEUVENMILJOENZEUVENHONDERDZEUVENENZEUVENTIGDUIZENDZEUVENHONDERDZEUVENENZEUVENTIG", ":D");
  return message.channel.send(serverembed);

}

if (message.content.toLowerCase().startsWith(prefix + "vraag")) {
                    if (!args[0]) return message.channel.send("Je moet wel een vraag opgeven van minimaal 3 woorden!")
                    if (!args[1]) return message.channel.send("Je moet wel een vraag opgeven van minimaal 3 woorden!")

                    vraagantwoord = [
                        "zeker weten!",
                        "ja",
                        "dat ik denk van wel",
                        "misschien",
                        "dat ik het echt niet zou weten!",
                        "dat ik denk van niet",
                        "nee",
                        "dat ik zeker weet van niet!",
                        "dat je AUB eerst even zelf moet nadenken voordat je mij het vraagt!"
                    ];

                    var antwoord = vraagantwoord[Math.floor(Math.random() * vraagantwoord.length)]

                    let embed = new Discord.RichEmbed()
                    .setTitle("Vraag:")
                    .setColor("#42f1f4")
                    .addField(`${args.splice(0).join(" ")} - ${message.author.tag}`, `Mijn antwoord daarop is **${antwoord}**`)
                    message.channel.send({embed})
}

        if (message.content.toLowerCase().startsWith(prefix + "kopofmunt")) {
                    var coinantwoord = [
                        "kop",
                        "munt"
                    ];

                    var antwoord = coinantwoord[Math.floor(Math.random() * coinantwoord.length)]

                    let embed = new Discord.RichEmbed()
                    .setTitle("Kop of Munt")
                    .setColor("#42f1f4")
                    .addField(`Ik gooi een muntje op voor ${message.author.tag}`, `Het is **${antwoord}** geworden!`)
                    message.channel.send({embed})
        }
        
            if (message.content.toLowerCase().startsWith(prefix + "nieuws")) {
                if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("dit kan jij niet!");
                    if (!args[0]) return message.channel.send("Je moet wel opgeven wat je wilt mededelen!")
                        message.delete()
                        let NieuwsEmbed = new Discord.RichEmbed()
                        .setTitle("Nieuws")
                        .setColor("#42f1f4")
                        .setDescription(`**_${args.splice(0).join(" ")}_**\nHet Zeuven Staffteam`)
                        let NieuwsChannel = message.guild.channels.find(`name`, "➥nieuws");
                        if(!NieuwsChannel) return message.channel.send("Er bestaat geen #➥nieuws kanaal");
                        NieuwsChannel.send("@everyone")
                        NieuwsChannel.send(NieuwsEmbed);
            }
            
 if (message.content.toLowerCase().startsWith(prefix + 'play')) {
    if (!args[0]) {
      if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Je moet eerst muziek toevoegen met \`${prefix}play <Zoekterm>\``);
      var voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) return message.channel.send("Je moet wel in een voicechannel zitten!");
      if (queue[message.guild.id].playing) return message.channel.sendMessage('Ik speel al muziek!');
      voiceChannel.join();
      let dispatcher;
      queue[message.guild.id].playing = true;
      (function play(song) {
        if (song === undefined) return message.channel.sendMessage('De wachtrij is leeg, dus ik stop met afspelen!').then(() => {
          queue[message.guild.id].playing = false;
          message.member.voiceChannel.leave();
        });
        message.channel.sendMessage(`Ik speel nu **${song.title}** voor **${song.requester}**`);
        dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : passe });
        let collector = message.channel.createCollector(m => m);
        collector.on('message', msg => {
          var arg = msg.content.split(" ").slice(1);
          if (msg.content.toLowerCase().startsWith(prefix + "np")) {
            var plat = "youtube";
            if (plat === "youtube") {
              var opts = {
                maxResults: 1,
                key: 'AIzaSyDtotP2-t9UOsJ3m6hVRkahiZs8G5Zigl8'
              };
              search(`${song.title}`, opts, function(err, results) {
                if (err) return console.log(err);
                let embed = new Discord.RichEmbed().setTitle("Music").setColor("#00ff00").setDescription(`**Song:** \`${results[0].title}\`\n**Requester:** \`${song.requester}\`\n**URL:** ${results[0].link}\n**Description:** \`${results[0].description}\`\n**Channel:** \`${results[0].channelTitle}\`\n**Time playing:** \`${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}\``)
                message.channel.send({embed})
              })
            } else {
              let embed = new Discord.RichEmbed().setTitle("Music").setColor("#00ff00").setDescription(`\n**URL:** \`${song.url}\`\n**Time playing:** \`${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}\``)
              message.channel.send({embed})
            }
          }
          if (msg.content.toLowerCase().startsWith(prefix + "stop")) {
            message.channel.send("Ik ben gestopt met spelen!");
            voiceChannel.leave()
          }
          if (msg.content.toLowerCase().startsWith(prefix + "skip")) {
              message.channel.send("Ik heb het liedje geskipt!")
              return dispatcher.end()
          }
          if (msg.content.toLowerCase().startsWith(prefix + "volume")) {
            if (!arg[0]) return message.channel.send("Je moet wel een volume opgeven!")
            if (Number(arg[0]) > 200 || Number(arg[0]) < 0) return message.channel.send("Je moet wel een volume opgeven tussen `0` en `200`!")
            var newvolume = Number(arg[0]) / 100
            message.channel.send(`Het volume is veranderd naar ${newvolume}!`)
            dispatcher.setVolume(newvolume)
          }
          if (msg.content.toLowerCase().startsWith(prefix + "pause")) {
            message.channel.send("De player staat op pauze!")
            dispatcher.pause()
          }
          if (msg.content.toLowerCase().startsWith(prefix + "resume")) {
            message.channel.send("De player gaat weer verder!")
            dispatcher.resume()
          }
        });
        dispatcher.on('end', () => {
          collector.stop();
          play(queue[message.guild.id].songs.shift());
        });
        dispatcher.on('error', (err) => {
          return message.channel.sendMessage('Er ging iets fout: ' + err).then(() => {
            collector.stop();
            play(queue[message.guild.id].songs.shift());
          });
        });
      })(queue[message.guild.id].songs.shift());
    } else {
      let url = message.content.split(' ')[1];
      if (url == '' || url === undefined) return message.channel.sendMessage(`Je moet wel een url opgeven!`);
      if (args[0].toLowerCase().startsWith("https://www.youtube.com/")) {
        yt.getInfo(url, (err, info) => {
          if(err) return message.channel.sendMessage('Geen goede YouTube link: ' + err);
          if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
          queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
          message.channel.sendMessage(`**${info.title}** is nu in de queue! Doe \`${prefix}play\` om het af te spelen als je dit nog niet hebt gedaan!`);
        });
      } else {
        message.channel.send("Ik ben aan het zoeken...")
        .then(msg => {
          var opts = {
            maxResults: 1,
            key: 'AIzaSyDtotP2-t9UOsJ3m6hVRkahiZs8G5Zigl8'
          };

          search(`${args.splice(0).join(" ")}`, opts, function(err, results) {
            if (err) return console.log(err);
            msg.edit(`Gevonden: ${results[0].link}`)
            var url = results[0].link
            yt.getInfo(url, (err, info) => {
              if (err) return message.channel.sendMessage('Geen goede YouTube link: ' + err);
              if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
              var plat = "youtube";
              queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username, platform: plat});
              if (queue[message.guild.id].playing) return message.channel.send(`**${info.title}** is nu in de queue toegevoegd!`)
              if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Je moet eerst muziek toevoegen met \`${prefix}play <URL>\``);
              var voiceChannel = message.member.voiceChannel;
              if (!voiceChannel) return message.channel.send("Je moet wel in een voicechannel zitten!");
              voiceChannel.join();
              if (queue[message.guild.id].playing) return message.channel.sendMessage('Ik speel al muziek!');
              let dispatcher;
              queue[message.guild.id].playing = true;
              (function play(song) {
                if (song === undefined) return message.channel.sendMessage('De wachtrij is leeg, dus ik stop met afspelen!').then(() => {
                  queue[message.guild.id].playing = false;
                  message.member.voiceChannel.leave();
                });
                message.channel.sendMessage(`Ik speel nu **${song.title}** voor **${song.requester}**`);
                dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }));
                let collector = message.channel.createCollector(m => m);
                collector.on('message', msg => {
                  var arg = msg.content.split(" ").slice(1);
                  if (msg.content.toLowerCase().startsWith(prefix + "np")) {
                    var opts = {
                      maxResults: 1,
                      key: 'AIzaSyDtotP2-t9UOsJ3m6hVRkahiZs8G5Zigl8'
                    };
                    search(`${song.title}`, opts, function(err, results) {
                      if (err) return console.log(err);
                      let embed = new Discord.RichEmbed().setTitle("Music").setColor("#42f1f4").setDescription(`**Song:** \`${results[0].title}\`\n**Requester:** \`${song.requester}\`\n**URL:** ${results[0].link}\n**Description:** \`${results[0].description}\`\n**Channel:** \`${results[0].channelTitle}\`\n**Time playing:** \`${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}\``)
                      message.channel.send({embed})
                    })
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "stop")) {
                    message.channel.send("Ik ben gestopt met spelen!");
                    voiceChannel.leave()
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "skip")) {
                      message.channel.send("Ik heb het liedje geskipt!")
                      return dispatcher.end()
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "volume")) {
                    if (!arg[0]) return message.channel.send("Je moet wel een volume opgeven!")
                    if (Number(arg[0]) > 200 || Number(arg[0]) < 0) return message.channel.send("Je moet wel een volume opgeven tussen `0` en `200`!")
                    var newvolume = Number(arg[0]) / 100
                    message.channel.send(`Het volume is veranderd naar ${newvolume}!`)
                    dispatcher.setVolume(newvolume)
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "pause")) {
                    message.channel.send("De player staat op pauze!")
                    dispatcher.pause()
                  }
                  if (msg.content.toLowerCase().startsWith(prefix + "resume")) {
                    message.channel.send("De player gaat weer verder!")
                    dispatcher.resume()
                  }
                });
                dispatcher.on('end', () => {
                  collector.stop();
                  play(queue[message.guild.id].songs.shift());
                });
                dispatcher.on('error', (err) => {
                  return message.channel.sendMessage('Er ging iets fout: ' + err).then(() => {
                    collector.stop();
                    play(queue[message.guild.id].songs.shift());
                  });
                });
              })(queue[message.guild.id].songs.shift());
            });
          });
        })
      }
    }
  }

  if (message.content.toLowerCase().startsWith(prefix + 'queue')) {
    if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Er zijn geen liedjes in de queue! Voeg liedjes toe met \`${prefix}play <URL>\``);
    let tosend = [];
    queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. **${song.title}** aangevraagd door **${song.requester}**`);});
    message.channel.sendMessage(`De music queue van ${message.guild.name}: Nu zijn er \`${tosend.length}\` liedjes in de wachtrij! ${(tosend.length > 15 ? '[ALLEEN DE EERSTE 15 KAN JE ZIEN]' : '')}\n${tosend.slice(0,15).join('\n')}`);
  }

if(cmd === `${prefix}review`){
    var sterren = Number(args[0]);
    var text = args.splice(1).join(" ");
    if (!sterren) return message.channel.send("Je moet wel een aantal sterren opgeven (1 tot 5)");
    if (!text || text.length < 25) return message.channel.send("Je moet wel een text opgeven die minimaal 25 tekens lang is!");
    const embed = new Discord.RichEmbed().setTitle("Review");
    if (sterren === 1) {
      embed.setColor("#ff2100");
      embed.setDescription(`User: _${message.author.username}_\nSterren: :star:\nReview: _${text}_`);
    } else if (sterren === 2) {
      embed.setColor("#ff6a00");
      embed.setDescription(`User: _${message.author.username}_\nSterren: :star: :star:\nReview: _${text}_`);
    } else if (sterren === 3) {
      embed.setColor("#ffe900");
      embed.setDescription(`User: _${message.author.username}_\nSterren: :star: :star: :star:\nReview: _${text}_`);
    } else if (sterren === 4) {
      embed.setColor("#b2ff00");
      embed.setDescription(`User: _${message.author.username}_\nSterren: :star: :star: :star: :star:\nReview: _${text}_`);
    } else if (sterren === 5) {
      embed.setColor("#54ff00");
      embed.setDescription(`User: _${message.author.username}_\nSterren: :star: :star: :star: :star: :star:\nReview: __${text}__`);
    } else {
      return message.channel.send("Je moet een aantal sterren opgeven dat ligt tussen 1 en 5!");
    }
    try {
      message.guild.channels.find("name",`➥reviews`).send(embed);
    } catch(err) {
      return message.channel.send(`Ik kon de review niet verzenden in #➥reviews!`);
    }
    message.delete();
    message.channel.send("De review is verzonden! Kijk in je PM als je hem nog een keer wilt bekijken, of kijk in de review channel!").then(msg => {msg.delete(5000)});
    message.author.send(embed);
  }
  
        if(message.channel.id === "441627019898388500") {
if(cmd === `${prefix}review`){
    message.delete();
    } else {
        message.delete();
        return message.channel.send(`${message.author.username}, dit is geen !review command!`).then(msg => {msg.delete(15000)});
    }
} 

});

client.on("message", message => {
  if (message.author.bot || message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
    if (command == "ticket") {
    const normal = message.author.username.toLowerCase().replace(/[^a-z0-9]/g, '');
    const theSupport = message.guild.channels.get(supportcategory);
    const userChannel = message.guild.channels.find('name', normal);
    const supportrole = message.guild.roles.find('name', 'Service');
    if (!theSupport) return message.channel.send(`Er is geen support categorie gevonden! Gelieve dit te melden bij de Owner!`);
    message.channel.send(`Creating channel...`).then(m => {
    message.guild.createChannel(`➥${normal}`, 'text')
        .then(c => {
          c.overwritePermissions(message.guild.id, {
            READ_MESSAGES: false
          });
          c.overwritePermissions(message.author.id, {
            READ_MESSAGES: true
          });
            c.overwritePermissions(supportrole.id, {
              READ_MESSAGES: true
            });
          c.setParent(theSupport);
          c.send({embed: {
          color: 3447003,
          description: `Hallo ${message.author.tag}, stuur hier je aanvraag voor onze <@&419918040608669697>, <@&419914184369766401> of <@&424253821628186653>. Natuurlijk kan je ook een vraag stellen over een van onze services`
          }}).then(message => {
          message.pin();
          })
          m.edit(`Kanaal aangemaakt! ${c}`)
        });
      });
  }
   if (command == "sluit") {
    if (!message.member.roles.some(r => [`${managerrole}`].includes(r.name))) return message.channel.send("dit kan jij niet!");
    message.channel.delete();
  }
});

client.login( token );