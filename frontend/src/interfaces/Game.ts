import { Character } from "./Character";

export interface Game {
  characters: Character[];
  currentTurn: number;
  currentPlayer: Character;
  opponentPlayer: Character;
  isStarted: boolean;
}
