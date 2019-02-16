const chalk = require("chalk");

module.exports = class BananenBase_ProcessEvent {
  constructor(client, object) {
    this.client = client;
    this.enabled = object.enabled;
    if (typeof this.enabled !== "boolean") this.enabled = true;
    this.name = object.name;
    this.description = object.description;
    if (!this.description) this.description = "A BananenBase process event";
  }

  async run(...args) {
    return await this.t.run(...args);
  }
}
