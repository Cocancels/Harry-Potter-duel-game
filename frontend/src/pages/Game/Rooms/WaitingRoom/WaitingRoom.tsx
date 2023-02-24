import { useState, useEffect } from "react";
import Button from "../../../../components/Button/Button";
import { Room } from "../../../../interfaces/Room";
import { User } from "../../../../interfaces/User";
import "./WaitingRoom.css";

interface WaitingRoomProps {
  room: Room | undefined;
  actualUser: User | undefined;
  handleSetReady: () => void;
  handleStartGame: () => void;
}

export const WaitingRoom = (props: WaitingRoomProps) => {
  const { room, actualUser, handleSetReady, handleStartGame } = props;
  const [hasEnoughPlayers, setHasEnoughPlayers] = useState<boolean>(false);
  const [usersInRoom, setUsersInRoom] = useState<number>(0);
  const [usersReady, setUsersReady] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(-1);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (room?.users.length === 2) {
      setHasEnoughPlayers(true);
    } else {
      setHasEnoughPlayers(false);
    }

    room && setUsersInRoom(room?.users.length);

    getUsersReady();
  }, [room]);

  useEffect(() => {
    if (countdown > 0 && countdown !== -1) {
      setShowModal(true);
      const interval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    } else {
      setShowModal(false);
      countdown !== -1 && handleStartGame();
    }
  }, [countdown]);

  const getUsersReady = () => {
    let usersReady = 0;
    room?.users.forEach((user) => {
      if (user.isReadyToPlay) {
        usersReady++;
      }
    });
    setUsersReady(usersReady);

    if (usersReady === 2) {
      startGame();
    }
  };

  const startGame = () => {
    setCountdown(3);
  };

  return (
    <div className="waiting-room">
      <div className={showModal ? "modal-overlay" : ""}>
        {showModal && (
          <div className="modal-box">
            <p>Game starting in {countdown}...</p>
          </div>
        )}
      </div>
      <Button
        className={
          actualUser?.isReadyToPlay ? "not-ready-button" : "ready-button"
        }
        onClick={handleSetReady}
        label={
          !hasEnoughPlayers
            ? `Minimum 2 joueurs, il manque ${usersInRoom} joueurs`
            : actualUser?.isReadyToPlay
            ? "Pas prêt"
            : "Prêt"
        }
        disabled={!hasEnoughPlayers}
      />
      <div className="users-ready">
        <p>
          {usersReady}/{usersInRoom} joueurs prêts
        </p>
      </div>
    </div>
  );
};
