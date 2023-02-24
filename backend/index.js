const express = require("express");
const cors = require("cors");
const http = require("http");
const database = require("./db");

const socketIo = require("socket.io", {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const Character = require("./classes/character");

const routes = require("./routes"); // Import your routes

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

const rooms = [];

routes(app, rooms, database);

const createCharacter = (user) => {
  const character = new Character(
    user.id,
    user.firstname,
    user.lastname,
    user.character.maxHealth,
    user.character.maxMana,
    user.character.attack,
    [],
    user.nickname
  );

  return character;
};

// Socket connection
io.on("connection", (socket) => {
  socket.on("updateRooms", () => {
    io.emit("roomsUpdated", rooms);
  });

  socket.on("createRoom", (name) => {
    const room = {
      id: rooms.length + 1,
      users: [],
      characters: [],
      name: name,
      game: null,
      messages: [],
    };

    rooms.push(room);
    socket.join(room.name);
    io.emit("roomCreated", rooms);
  });

  // Join room
  socket.on("joinRoom", (roomToJoin, actualUser) => {
    let actualRoom;

    rooms.map((room) => {
      if (room.id === roomToJoin.id && room.users.length < 2) {
        socket.join(roomToJoin.id);
        const character = createCharacter(actualUser);

        room.users.push(actualUser);
        room.characters.push(character);

        actualRoom = room;
        return room;
      }
    });

    io.to(roomToJoin.id).emit("roomJoined", actualRoom);
  });

  socket.on("startGame", (actualRoom, game) => {
    actualRoom.game = game;
    io.to(actualRoom.id).emit("gameStarted", actualRoom);
  });

  socket.on("updateGame", (actualRoom, game) => {
    actualRoom.game = game;

    io.to(actualRoom.id).emit("gameUpdated", actualRoom);
  });

  socket.on("setReady", (actualRoom, actualUser) => {
    let newActualUser;

    actualRoom.users.map((user) => {
      if (user.id === actualUser.id) {
        user.isReadyToPlay = !user.isReadyToPlay;
        newActualUser = user;
      }
    });

    io.to(actualRoom.id).emit("readySet", actualRoom, newActualUser);
  });

  // Send message
  socket.on("sendMessage", (actualRoom, message) => {
    const newMessage = { ...message, createdAt: new Date() };

    const updatedRoom =
      rooms.find((room) => room.id === actualRoom.id) || actualRoom;

    updatedRoom.messages.push(newMessage);

    rooms.map((room) => {
      if (room.id === actualRoom.id) {
        room.messages = updatedRoom.messages;
      }
    });

    io.to(actualRoom.id).emit("messageSent", updatedRoom.messages);
  });

  // Leave room
  socket.on("leaveRoom", (actualRoom, actualUser) => {
    rooms.map((room) => {
      if (room.id === actualRoom.id) {
        room.users = room.users.filter((user) => user.id !== actualUser.id);
        room.characters = room.characters.filter(
          (character) => character.id !== actualUser.id
        );

        return room;
      }
    });

    const updatedRoom = rooms.find((room) => room.id === actualRoom.id);

    socket.leave(actualRoom.id);
    io.to(actualRoom.id).emit("roomLeft", updatedRoom);
  });

  // End game
  socket.on("endGame", (actualRoom, results) => {
    const { winner, loser } = results;

    const sql = `UPDATE users SET wins = wins + 1 WHERE id = '${winner.id}';
                  UPDATE users SET loses = loses + 1 WHERE id = '${loser.id}';`;

    database.query(sql);

    io.to(actualRoom.id).emit("gameEnded", results);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
