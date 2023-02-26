import { SpellSelection } from "./SpellSelection/SpellSelection";
import "./UserInterface.css";
import { WaitingRoom } from "../Rooms/WaitingRoom/WaitingRoom";
import { Game } from "../../../interfaces/Game";
import { Character } from "../../../interfaces/Character";
import { RoomInfos } from "../Rooms/RoomInfos/RoomInfos";
import { Logs } from "../Rooms/Logs/Logs";

interface UserInterfaceProps {
  characters: Character[];
  game: Game | undefined;
  socket: any;
  hasChosenSpell: boolean;
  setHasChosenSpell: (hasChosenSpell: boolean) => void;
  handleSetReady: () => void;
  handleStartGame: () => void;
}

export const UserInterface = (props: UserInterfaceProps) => {
  const {
    characters,
    game,
    socket,
    hasChosenSpell,
    handleSetReady,
    handleStartGame,
    setHasChosenSpell,
  } = props;

  return (
    <div className="user-interface">
      {game && game.isStarted ? (
        <SpellSelection
          characters={characters}
          isGameStarted={game.isStarted}
          socket={socket}
          hasChosenSpell={hasChosenSpell}
          setHasChosenSpell={setHasChosenSpell}
        />
      ) : (
        <WaitingRoom
          handleSetReady={handleSetReady}
          handleStartGame={handleStartGame}
        />
      )}

      <Logs />

      <RoomInfos socket={socket} />
    </div>
  );
};
