import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../../interfaces/Message";
import { setRoom } from "../../../../store/ActualRoom/room";
import "./ChatBox.css";
import { MessageItem } from "./Message/Message";

interface ChatBoxProps {
  socket: any;
}

export const ChatBox = (props: ChatBoxProps) => {
  const actualUser = useSelector((state: any) => state.User);
  const actualRoom = useSelector((state: any) => state.ActualRoom);

  const dispatch = useDispatch();

  const { socket } = props;

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

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
      actualRoom && dispatch(setRoom({ ...actualRoom, messages: messages }));
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
