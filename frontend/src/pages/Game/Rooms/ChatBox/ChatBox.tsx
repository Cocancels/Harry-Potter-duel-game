import { useEffect, useState } from "react";
import { Message } from "../../../../interfaces/Message";
import { Room } from "../../../../interfaces/Room";
import { User } from "../../../../interfaces/User";
import "./ChatBox.css";
import { MessageItem } from "./Message/Message";

interface ChatBoxProps {
  actualRoom: Room | undefined;
  actualUser: User | undefined;
  setActualRoom: (room: Room) => void;
  socket: any;
}

export const ChatBox = (props: ChatBoxProps) => {
  const { actualRoom, actualUser, setActualRoom, socket } = props;

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [room, setRoom] = useState<Room | undefined>(actualRoom);

  const handleSendMessage = () => {
    const newMessage: Message = {
      content: message,
      user: actualUser,
      room: actualRoom,
      createdAt: new Date(),
    };
    socket.emit("sendMessage", actualRoom, newMessage);
    setMessage("");
  };

  useEffect(() => {
    socket.on("messageSent", (messages: Message[]) => {
      setMessages(messages);
      room && setRoom({ ...room, messages });
    });
  }, []);

  useEffect(() => {
    actualRoom && setMessages(actualRoom.messages);
  }, [actualRoom]);

  return (
    <div className="chat-box">
      <div></div>
      <div className="chat-box-messages">
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} actualUser={actualUser} />
        ))}
      </div>
      <div className="chat-box-message-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};
