// Needed packages
const chalk = require("chalk"); // Color in the console
const moment = require("moment"); // Time loggin

// Exports
module.exports = function(error = "unknown error") { // Exports a function with a error parameter, with a unknown error as default.
  console.log(new Error(chalk.blue(`[${moment().format("HH:mm:ss ms")}] `) + error)); // Returns a new error, with date and color format.
}
