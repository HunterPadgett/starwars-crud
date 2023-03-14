const express = require("express");
const app = express();

// what to do when user goes to home page aka '/'
// We normally abbreviate `request` to `req` and `response` to `res`.
// we serve up the index.html when user req homepage using the sendFile method
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");

});

// create a server that browsers can connect to
app.listen(3000, () => {
 console.log(`we listenin' on... http://localhost:3000`);
});
