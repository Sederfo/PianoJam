//imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const http = require("http");
const { Server } = require("socket.io");
const { faker } = require("@faker-js/faker");

const app = express();
app.use(cors({origin: "*",}));
app.use(express.json());

require("dotenv").config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//dictionary with guest names
var clients = {};

//dictionary with online rooms and their details
onlineRooms = {};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateGuestID() {
  return randomIntFromInterval(1, 999999);
}

io.on("connection", (socket) => {
  clients[socket.id] = { name: "Guest" + generateGuestID() };
  console.log("User", clients[socket.id].name, "connected");

  //emit the guestID to the client
  socket.emit("receive-guest-id", clients[socket.id].name);

  socket.on("get-guest-id", () => {
    socket.emit("receive-guest-id", clients[socket.id].name);
  });

  socket.on("sign-in", (username) => {
    console.log(clients[socket.id].name, "signed in as", username);
    clients[socket.id].name = username;
  });

  socket.on("sign-out", () => {
    console.log(clients[socket.id].name, "signed out");
    clients[socket.id].name = "Guest" + generateGuestID();
  });

  socket.on("disconnect", () => {
    console.log(clients[socket.id].name, "disconnected");
    delete clients[socket.id]; //Delete client
  });

  socket.on("send-note-activated", (data) => {
    socket.to(data.room).emit("receive-note-activated", data);
  });

  socket.on("send-note-deactivated", (data) => {
    socket.to(data.room).emit("receive-note-deactivated", data);
  });

  socket.on("create-room", (data) => {
    onlineRooms[data.roomId] = data;
  });

  socket.on("join-room", (room, username) => {
    socket.join(room);
    console.log(io.sockets.adapter.rooms)

    try {
      socket.emit("send-rooms", getRoomsAndUsers());

      onlineUsers = [];
      io.sockets.adapter.rooms.get(room).forEach((user) => {
        onlineUsers.push(clients[user].name);
      });
      socket.to(room).emit("receive-online-users", onlineUsers);
    } catch (error) {
      console.error(error);
      console.error(onlineRooms);
    }
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    try {
      onlineUsers = [];
      io.sockets.adapter.rooms.get(room).forEach((user) => {
        onlineUsers.push(clients[user].name);
      });
      socket.to(room).emit("receive-online-users", onlineUsers);
    } catch (error) {
      //
    }
  });

  socket.on("get-online-usernames", (room) => {
    let onlineUsers = [];
    try {
      io.sockets.adapter.rooms.get(room).forEach((id) => {
        onlineUsers.push(clients[id].name);
      });
    } catch (e) {
      console.error(e);
    }

    socket.emit("receive-online-usernames", onlineUsers);
  });

  socket.on("get-rooms", () => {
    try {
      response = getRoomsAndUsers();
      socket.emit("send-rooms", response);
    } catch (error) {}
  });

  socket.on("send-chat-message", (data) => {
    socket.broadcast.to(data.room).emit("receive-chat-message", {
      ...data,
      username: clients[socket.id].name,
    });
  });

  socket.on("get-room-info", (room) => {
    socket.emit("receive-room-info", getRoomInfo(room));
  });
});

//router
app.use("/api/auth", userRoutes);

app.get("/api/rooms/roomid", (req, res, next) => {
  try {
    const roomId = faker.word
      .adjective()
      .concat(faker.music.genre())
      .replace(/\s/g, "");

    while (getActiveRooms(io).includes(roomId)) {
      roomId = faker.word
        .adjective()
        .concat(faker.music.genre())
        .replace(/\s/g, "");
    }
    return res.json({ status: true, roomId });
  } catch (ex) {
    next(ex);
  }
});

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((error) => {
    console.error(error);
  });

server.listen(process.env.PORT, () => {});

function getActiveRooms(io) {
  const arr = Array.from(io.sockets.adapter.rooms);
  const filtered = arr.filter((room) => !room[1].has(room[0]));
  const res = filtered.map((i) => i[0]);
  return res;
}

function getRoomInfo(room) {
  if (room in onlineRooms) {
    try {
      let onlineUsers = [];
      io.sockets.adapter.rooms.get(room).forEach((id) => {
        onlineUsers.push(clients[id].name);
      });
      return {
        ...onlineRooms[room],
        onlineUsers: onlineUsers,
      };
    } catch (e) {
      return { ...onlineRooms[room] };
    }
  } else {
    return false;
  }
}

function getRoomsAndUsers() {
  const rooms = getActiveRooms(io);

  const response = rooms.map((room) => {
    const onlineUsers = [...io.sockets.adapter.rooms.get(room)];
    const roomSettings = onlineRooms[room];
    const maxPlayers = roomSettings.maxPlayers;
    const chatEnabled = roomSettings.chatEnabled;

    return {
      roomId: room,
      onlineUsers,
      maxPlayers,
      chatEnabled,
    };
  });

  return response;
}
