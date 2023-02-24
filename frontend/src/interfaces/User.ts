import { Character } from "./Character";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  nickname: string;
  password: string;
  wins: number;
  loses: number;
  house: string;
  character: Character;
  isReadyToPlay: boolean;
}
