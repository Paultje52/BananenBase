module.exports = async function(message, question, limit = 60000) {
  const filter = m => m.author.id === message.author.id;
  await message.channel.send(question);
  try {
    const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
    return collected.first().content;
  } catch(err) {
    return false;
  }
}
