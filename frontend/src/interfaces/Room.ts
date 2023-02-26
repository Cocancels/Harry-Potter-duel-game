import { Character } from "./Character";
import { Log } from "./Log";
import { Message } from "./Message";
import { User } from "./User";

export interface Room {
  id: number;
  name: string;
  users: User[];
  characters: Character[];
  messages: Message[];
  logs: Log[];
}
