const chalk = require("chalk");

module.exports = class BananenBase_Function {
  constructor(client, object) {
    this.client = client;
    this.enabled = object.enabled;
    if (typeof this.enabled !== "boolean") this.enabled = true;
    this.name = object.name;
  }

  async run(...args) {
    return await this.t.run(...args);
  }
}
