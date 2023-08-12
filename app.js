const { Socket } = require("engine.io");
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chat message", (message, room_id) => {
    socket.to(room_id).emit("chat_message_res", message);
  });
  socket.on("Join_room", (room_id) => {
    socket.join(room_id);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("public/index.html");
});

server.listen(3000, () => {
  console.log(`server run on port 3000`);
});
