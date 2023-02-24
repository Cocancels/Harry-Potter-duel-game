import { useEffect, useState } from "react";
import "./game.css";
import { User } from "../../interfaces/User";
import { Room } from "../../interfaces/Room";
import { io } from "socket.io-client";
import { RoomList } from "./Rooms/RoomsList/RoomList";
import CharacterComponent from "../../components/Character/Character";
import { isOdd } from "../../utils/numberOddEven";
import { Character } from "../../interfaces/Character";
import Button from "../../components/Button/Button";
import { UserInterface } from "./UserInterface/UserInterface";
import { Game } from "../../interfaces/Game";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
});

export const GamePage = () => {
  const [actualRoom, setActualRoom] = useState<Room>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [actualUser, setActualUser] = useState<User>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    getActualUser();
    fetchRooms();
  }, []);

  useEffect(() => {
    handleSocket();
  }, [actualUser, game, rooms, actualRoom]);

  const handleSocket = () => {
    socket.on("roomCreated", (rooms: Room[]) => {
      setRooms(rooms);
    });

    socket.on("roomJoined", (room: Room) => {
      const actualRoom = room;
      const actualRooms = rooms.map((r) =>
        r.id === actualRoom.id ? actualRoom : r
      );
      setRooms(actualRooms);
      setActualRoom(actualRoom);
      setCharacters(actualRoom.characters);
    });

    socket.on("roomsUpdated", (rooms: Room[]) => {
      setRooms(rooms);
    });

    socket.on("roomLeft", (room: Room) => {
      setActualRoom(room);
      actualUser && setActualUser({ ...actualUser, isReadyToPlay: false });
    });

    socket.on("readySet", (room: Room, user: User) => {
      setActualRoom(room);

      if (actualUser?.id === user.id) {
        setActualUser(user);
      }
    });

    socket.on("gameStarted", (game: Game, actualRoom: Room) => {
      setGame(game);
      setActualRoom(actualRoom);
    });

    socket.on("gameUpdated", (game: Game, actualRoom: Room) => {
      setGame(game);
      setCharacters(game.characters);
      setActualRoom({ ...actualRoom, characters: game.characters });
    });
  };

  const fetchRooms = () => {
    fetch("http://localhost:3001/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.rooms);
      });
  };

  const getActualUser = () => {
    const user = localStorage.getItem("actualUser");
    if (user) {
      setActualUser(JSON.parse(user));
    }

    return user;
  };

  const createRoom = (name: string) => {
    socket.emit("createRoom", name);
  };

  const joinRoom = (room: Room) => {
    socket.emit("joinRoom", room, actualUser);
    socket.emit("updateRooms");
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", actualRoom, actualUser);
    socket.emit("updateRooms");
    setActualRoom(undefined);
  };

  const setReady = () => {
    socket.emit("setReady", actualRoom, actualUser);
    socket.emit("updateRooms");
  };

  const startGame = () => {
    socket.emit("startGame", characters, actualRoom);
    socket.emit("updateRooms");
  };

  useEffect(() => {
    if (actualRoom) {
      setCharacters(actualRoom.characters);
    }
  }, [actualRoom]);

  return (
    <div className="game-container">
      {actualUser && !actualRoom ? (
        <RoomList
          rooms={rooms}
          handleCreateRoom={createRoom}
          onRoomClick={joinRoom}
        />
      ) : (
        <div>
          <Button
            className="cancel-button"
            label="Leave room"
            onClick={leaveRoom}
          />
        </div>
      )}

      {/* {results?.winner && (
        <div className="results-modal">
          <div className="results-modal-content">
            <h1>Results: </h1>
            <p>
              Gagnant: <span>{results?.winner.firstName}</span>
            </p>
            <p>
              Perdant: <span>{results?.loser.firstName}</span>
            </p>
            <p>
              Nombre de tours: <span>{turn}</span>
            </p>
            <Button
              className="cancel-button"
              label="Close"
              onClick={() => {
                setResults(undefined);
                handleLeaveRoom();
              }}
            />
          </div>
        </div>
      )} */}

      <div className="game-characters-container">
        {actualRoom &&
          characters.map((character: Character, index: number) => (
            <CharacterComponent
              key={character.id}
              character={character}
              flip={isOdd(index) ? true : false}
              actualUser={actualUser}
            />
          ))}
      </div>

      {actualRoom && (
        <UserInterface
          actualUser={actualUser}
          actualRoom={actualRoom}
          game={game}
          handleSetReady={setReady}
          handleStartGame={startGame}
          socket={socket}
        />
      )}
    </div>
  );
};
