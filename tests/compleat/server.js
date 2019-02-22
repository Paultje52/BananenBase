// Exporting the app function.
// Here you can handle your web application.

// App = The express app
// Client = The discord.js client
module.exports = function(app, client) {
  app.get("/", (req, res) => { // Index: redirect to the auth page for your discord app
    res.sendDiscordLogin({ // Send the discord login
      clientID: "CLIENTID", // Your clientID
      redirect: "http://localhost:10000/callback" // The redirect url
    });
  });

  app.get("/callback", async (req, res) => { // Handling the discord login
    let output = await res.handleDiscordLogin({ // Requesting the token etc from the discord API
      clientID: "CLIENTID", // Your client ID
      clientSecret: "CLIENTSECRET", // Your client secret
      redirect: "http://localhost:10000/callback" // The redirect url, must be the same as sending the discord login.
    });
    console.log(output); // Logs the userdata (including mail) and servers
  });
}
