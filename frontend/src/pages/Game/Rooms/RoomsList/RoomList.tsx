import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import { Room } from "../../../../interfaces/Room";
import { User } from "../../../../interfaces/User";
import "./RoomList.css";
interface RoomListProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
  handleCreateRoom: (name: string) => void;
}

export const RoomList = (props: RoomListProps) => {
  const { rooms, onRoomClick, handleCreateRoom } = props;
  const [roomName, setRoomName] = useState<string>("");

  return (
    <>
      <div className="room-list">
        {rooms.map((room) => (
          <Button
            className="room-button"
            label={`${room.name} : ${room.users.length} / 2`}
            onClick={() => onRoomClick(room)}
            key={room.id}
          />
        ))}
        <div className="room-creation-container">
          <input type="text" onChange={(e) => setRoomName(e.target.value)} />
          <Button
            className="create-room-button"
            label="Create room"
            onClick={() => handleCreateRoom(roomName)}
          />
        </div>
      </div>
    </>
  );
};
