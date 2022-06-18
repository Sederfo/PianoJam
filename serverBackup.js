const express = require("express");
const app = express();
// use CORS
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// port the server is running on
const PORT = 5000;

// socket listener
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("Welcome to CORS server ");
});
app.get("/api", (req, res) => {
  //res.send('This has CORS enabled ')
  //res.set('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "application/json");
  
  
  res.json({ users: ["user1", "user10"] });
});
app.listen(PORT, () => {
  
});

http.listen(PORT, () => {
  
});
