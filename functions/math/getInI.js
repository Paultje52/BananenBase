exports.run = async (client, string) => {
  if (!string) throw "Geen string opgegeven!"
  return Number(string);
}
exports.help = {
  name: "getInI",
  category: "math"
}
exports.config = {
  enable: true
}
