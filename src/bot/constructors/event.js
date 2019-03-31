module.exports = exports = class BananenBase_Event {
  constructor(client, object) {
    this.client = client;
    this.enabled = object.enabled;
    if (typeof this.enabled !== "boolean") this.enabled = true;
    this.name = object.name;
  }
};

exports.event = require("./event/event.js");
