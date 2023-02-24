import { Room } from "../../../interfaces/Room";
import { User } from "../../../interfaces/User";
import { SpellSelection } from "./SpellSelection/SpellSelection";
import "./UserInterface.css";
import { WaitingRoom } from "../Rooms/WaitingRoom/WaitingRoom";
import { Game } from "../../../interfaces/Game";

interface UserInterfaceProps {
  actualUser: User | undefined;
  actualRoom: Room;
  game: Game | undefined;
  socket: any;
  handleSetReady: () => void;
  handleStartGame: () => void;
}

export const UserInterface = (props: UserInterfaceProps) => {
  const {
    actualUser,
    actualRoom,
    game,
    socket,
    handleSetReady,
    handleStartGame,
  } = props;

  return (
    <div className="user-interface">
      {game && game.isStarted ? (
        <SpellSelection
          characters={game.characters}
          currentPlayer={game.currentPlayer}
          actualUser={actualUser}
          actualRoom={actualRoom}
          isGameStarted={game.isStarted}
          socket={socket}
        />
      ) : (
        <WaitingRoom
          room={actualRoom}
          actualUser={actualUser}
          handleSetReady={handleSetReady}
          handleStartGame={handleStartGame}
        />
      )}

      {/* <RoomInfos
        room={actualRoom}
        actualUser={actualUser}
        socket={socket}
        setActualRoom={setActualRoom}
      /> */}
    </div>
  );
};
