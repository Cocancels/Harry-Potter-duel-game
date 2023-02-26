import { useState } from "react";
import { User } from "../../../../interfaces/User";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./RoomInfos.css";
import { ChatBox } from "../ChatBox/ChatBox";
import { useSelector } from "react-redux";

interface RoomInfosProps {
  socket: any;
}

export const RoomInfos = (props: RoomInfosProps) => {
  const actualRoom = useSelector((state: any) => state.ActualRoom);
  const actualUser = useSelector((state: any) => state.User);

  const { socket } = props;

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
              {actualRoom?.users.map((user: User) => (
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
          <div className="room-infos-roomId">Room ID: {actualRoom?.id}</div>
          <div></div>
        </div>

        <ChatBox socket={socket} />
      </div>
    </>
  );
};
