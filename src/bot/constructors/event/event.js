const events = require("events");

module.exports = class BananenBase_Event_Event extends events {
  constructor(object) {
    super();

    this.enabled = object.enabled;
    if (typeof this.enabled !== "boolean") this.enabled = true;
    this.name = object.name;
  }

  setClient(client) {
    this.client = client;
  }

  run(...args) {
    this.emit("run", this.client, ...args);
  }
};
