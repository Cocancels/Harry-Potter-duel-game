import { Character } from "./Character";
import { Message } from "./Message";
import { User } from "./User";

export interface Room {
  id: number;
  name: string;
  users: User[];
  characters: Character[];
  messages: Message[];
}
