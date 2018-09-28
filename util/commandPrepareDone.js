module.exports = class commandPrepareDone {
  constructor(client, message) {
    this.client = client;
    this.message = message;
  }

  async use(cmd) {
    if (cmd.message) {
      this.msg = cmd.message(this.message, this.client);
      this.msg = await this.message.channel.send(this.msg);
    }
    if (cmd.startTyping) this.message.channel.startTyping();
    if (cmd.stopTyping) this.message.channel.stopTyping(true);
    if (cmd.run) cmd.run(this.message, this.client);
    if (cmd.deleteMessage) if (this.msg) this.msg.delete();
  }
}
