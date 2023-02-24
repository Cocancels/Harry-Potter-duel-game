import { User } from "./User";
import { Room } from "./Room";

export interface Message {
  content: string;
  user: User | undefined;
  room: Room | undefined;
  createdAt: Date;
}
