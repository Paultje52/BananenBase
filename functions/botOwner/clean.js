exports.run = async (client, string) => {
  if (!string) throw "Geen string opgegeven!"
  if (typeof(string) === "string") {
    return string.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return string;
  }
}
exports.help = {
  name: "clean",
  category: "botOwner"
}
exports.config = {
  enable: true
}
