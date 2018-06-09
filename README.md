# BananenBase
## De base van Dé discord bot

Welkom op de github van de BananenBase! De BananenBase is de discord.js framework/base waarop de BananenBot gemaakt is! Natuurlijk is de BananenBot veel aangepast, maar het meeste van die base zit ook hier in! 

## Pagina's
**Issues** Vraag hier support, laat een bug weten of stel een nieuw ding in deze framework voor!

**Pull requests** Gebruik dit maar niet, alles wordt hier toch afgekeurt!

**Wiki** Hier kan je de wiki vinden van de BananenBase! Op de wiki kan je uitleg vinden hoe jij jouw bot in deze framework kan maken!

**Insights** Hier kan je ziet hoeveel mensen de BananenBase gebruiken en al die soort nutteloze dingen...

## Voorbeelden
### Commands
```js
exports.run = async (client, message, args) => {
  //Zet hier neer wat er moet gebeuren als het command wordt uitgevoerd!
}
exports.help = {
  name: "NAAM",
  usage: "GEBRUIK",
  description: "BESCHRIJVING",
  category: "CATEGORIE",
  enable: true
}
```
Druk [hier](https://github.com/Paul52Games/BananenBase/wiki/Commands) voor meer informatie van commands!

### Events
```js
exports.run = (client, ...args) => {
  //Hier de event code
}
exports.config = {
  enable: true
}
```
Druk [hier](https://github.com/Paul52Games/BananenBase/wiki/Events) voor meer informatie van events!

### Process events
```js
exports.run = (client, ...args) => {
  //Hier de process event code
}
exports.config = {
  enable: true
}
```
Druk [hier](https://github.com/Paul52Games/BananenBase/wiki/Process-events) voor meer informatie van process events!

### Database
```js
data.set(`key`, `value`);
```
Druk [hier](https://github.com/Paul52Games/BananenBase/wiki/Database) voor meer informatie van de database!

### Functions
```js
exports.run = async (client, string = undefined) => {
  //Functie
}
exports.help = {
  name: "NAAM",
  category: "CATEGORIE"
}
exports.config = {
  enable: true
}
```
Druk [hier](https://github.com/Paul52Games/BananenBase/wiki/Functions) voor meer informatie van de functions!

### Configs
```json
{
  //Config tekst
}
```
Druk [hier](https://github.com/Paul52Games/BananenBase/wiki/Configs) voor meer informatie van de configs!
