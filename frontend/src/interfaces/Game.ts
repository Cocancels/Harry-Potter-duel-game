import { Character } from "./Character";
import { Log } from "./Log";

export interface Game {
  characters: Character[];
  currentTurn: number;
  currentPlayer: Character;
  opponentPlayer: Character;
  isStarted: boolean;
  isFinished: boolean;
  results: {
    winner: Character;
    loser: Character;
  };
  logs: Log[];
}
