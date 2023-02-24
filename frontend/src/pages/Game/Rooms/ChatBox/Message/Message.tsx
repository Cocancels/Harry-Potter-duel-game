import { Message } from "../../../../../interfaces/Message";
import "./Message.css";

interface MessageProps {
  message: Message;
  actualUser?: any;
}

export const MessageItem = (props: MessageProps) => {
  const { message, actualUser } = props;

  const formatDate = (date: Date) => {
    const newDate = new Date(date);

    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const isCurrentUser = () => {
    return actualUser && actualUser.id === message.user?.id;
  };

  return (
    <div
      className={`chat-box-message ${isCurrentUser() ? "current-user" : ""}`}
    >
      <p className="message-header">
        {message.user?.nickname} {isCurrentUser() ? " (You)" : ""} -{" "}
        {formatDate(message.createdAt)}
      </p>
      <p>{message.content}</p>
    </div>
  );
};
