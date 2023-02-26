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
    let month: string | number = newDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const year = newDate.getFullYear();
    let hours: string | number = newDate.getHours();
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes: string | number = newDate.getMinutes();
    let seconds: string | number = newDate.getSeconds();

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
