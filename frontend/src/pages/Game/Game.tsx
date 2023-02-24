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

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
});

export const GamePage = () => {
  const [actualRoom, setActualRoom] = useState<Room>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [actualUser, setActualUser] = useState<User>();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getActualUser();
    fetchRooms();

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
      console.log("roomLeft", room);
      setActualRoom(room);
    });
  }, []);

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

      {/*
      {actualRoom && (
        <UserInterface
          characters={characters}
          rooms={rooms}
          currentPlayer={currentPlayer}
          actualUser={actualUser}
          actualRoom={actualRoom}
          isGameStarted={isGameStarted}
          chooseTarget={chooseTarget}
          handleChoseSpell={handleChoseSpell}
          handleTargetSelection={handleTargetSelection}
          onCreateRoomClick={createRoom}
          onRoomClick={joinRoom}
          handleSetReady={handleSetReady}
          handleStartGame={handleStartGame}
          socket={socket}
          setActualRoom={setActualRoom}
        />
      )} */}
    </div>
  );
};
