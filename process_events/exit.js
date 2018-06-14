exports.run = (client, error) => {
  if (error) throw error;
  client.destroy;
}

exports.config = {
  enable: true
}
