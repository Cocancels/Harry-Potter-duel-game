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
const Game = require("./classes/game");
const spells = require("./constants/spells");

const routes = require("./routes"); // Import your routes

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

const rooms = [];

routes(app, rooms, database);

const createCharacterFromUser = (user) => {
  const character = new Character(
    user.id,
    user.firstname,
    user.lastname,
    user.character.maxHealth,
    user.character.maxMana,
    user.character.attack,
    spells,
    user.nickname
  );

  return character;
};

const createCharacter = (character) => {
  const newCharacter = new Character(
    character.id,
    character.firstname,
    character.lastname,
    character.maxHealth,
    character.maxMana,
    character.attack,
    spells,
    character.nickname
  );

  return newCharacter;
};

const createLog = (room, message) => {
  const newLog = {
    id: room.logs.length + 1,
    message: message,
    createdAt: new Date(),
  };

  return newLog;
};

// Socket connection
io.on("connection", (socket) => {
  // Update rooms
  socket.on("updateRooms", () => {
    io.emit("roomsUpdated", rooms);
  });

  // Create room
  socket.on("createRoom", (name) => {
    const room = {
      id: rooms.length + 1,
      users: [],
      characters: [],
      name: name,
      game: null,
      messages: [],
      logs: [],
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
        const character = createCharacterFromUser(actualUser);

        room.users.push(actualUser);
        room.characters.push(character);

        actualRoom = room;
        return room;
      }
    });

    if (actualRoom.users.length === 2) {
      actualRoom.users.map((user) => {
        user.isReadyToPlay = false;
      });
    }

    const log = createLog(actualRoom, `${actualUser.nickname} joined the room`);
    actualRoom.logs.push(log);

    io.to(roomToJoin.id).emit("roomJoined", actualRoom);
  });

  // Start game
  socket.on("startGame", (characters, actualRoom) => {
    const newCharacters = characters.map((character) => {
      return createCharacter(character);
    });

    const game = new Game(newCharacters, actualRoom.id);

    game.startGame();
    actualRoom.game = game;

    const actualRoomIndex = rooms.findIndex(
      (room) => room.id === actualRoom.id
    );

    rooms[actualRoomIndex] = actualRoom;

    actualRoom.logs = game.logs;

    io.to(actualRoom.id).emit("gameStarted", game, actualRoom);
  });

  // Cast spell
  socket.on("castSpell", (actualRoom, character, target, castedSpell) => {
    const updatedRoom = rooms.find((room) => room.id === actualRoom.id);
    const thisSpell = spells.find((spell) => spell.id === castedSpell);
    const casterCharacter = updatedRoom.game.characters.find(
      (c) => c.id === character.id
    );
    const targetCharacter = updatedRoom.game.characters.find(
      (character) => character.id === target.id
    );
    const game = updatedRoom.game;

    game.characters.map((actualCharacter) => {
      if (actualCharacter.id === character.id) {
        socket.action = actualCharacter.castSpell.bind(
          actualCharacter,
          thisSpell,
          targetCharacter
        );
        socket.character = casterCharacter;
      }
    });

    const room = io.sockets.adapter.rooms.get(actualRoom.id);

    let canExecute = true;

    for (const socketId of room) {
      const socket = io.sockets.sockets.get(socketId);
      if (!socket.action) {
        canExecute = false;
        break;
      }
    }

    if (canExecute) {
      for (const socketId of room) {
        const socket = io.sockets.sockets.get(socketId);

        game.handleUserTurn(socket.character, socket.action);
        socket.action = null;
      }
      if (!game.isGameOver()) game.endTurn();
    } else {
      return;
    }

    const updatedGame = updatedRoom.game;

    updatedRoom.characters = updatedGame.characters;
    updatedRoom.logs = updatedGame.logs;

    io.to(actualRoom.id).emit("gameUpdated", updatedGame, updatedRoom);
  });

  // Set ready
  socket.on("setReady", (actualRoom, actualUser) => {
    let newActualUser;

    actualRoom.users.map((user) => {
      if (user.id === actualUser.id) {
        user.isReadyToPlay = !user.isReadyToPlay;
        newActualUser = user;
      }
    });

    rooms.map((room) => {
      if (room.id === actualRoom.id) {
        room = actualRoom;
      }
    });

    const log = createLog(
      actualRoom,
      `${actualUser.nickname} is ready to play`
    );

    actualRoom.logs.push(log);

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

  // Disconnect
  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});

module.exports = io;
