import { useState } from "react";
import { Room } from "../../../../interfaces/Room";
import { User } from "../../../../interfaces/User";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./RoomInfos.css";
import { ChatBox } from "../ChatBox/ChatBox";

interface RoomInfosProps {
  room: Room | undefined;
  actualUser: User | undefined;
  socket: any;
  setActualRoom: (room: Room) => void;
}

export const RoomInfos = (props: RoomInfosProps) => {
  const { room, actualUser, socket, setActualRoom } = props;

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {openModal && (
        <div className="room-infos-modal">
          <div className="room-infos-modal-content">
            <AiOutlineCloseCircle
              size={30}
              color="red"
              className="room-infos-modal-close"
              onClick={() => setOpenModal(false)}
            />

            <div className="room-infos-modal-header">
              <h2>Room Infos</h2>
            </div>
            <ul>
              {room?.users.map((user) => (
                <li key={user.id}>
                  {user.nickname}
                  {user.id === actualUser?.id && " (You)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="room-infos-container">
        <div className="room-infos">
          <HiOutlineInformationCircle
            className="room-infos-icon"
            onClick={() => setOpenModal(true)}
            size={30}
          />
          <div className="room-infos-roomId">Room ID: {room?.id}</div>
          <div></div>
        </div>

        <ChatBox
          actualUser={actualUser}
          socket={socket}
          actualRoom={room}
          setActualRoom={setActualRoom}
        />
      </div>
    </>
  );
};
