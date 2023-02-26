import { Spell } from "./Spell";

export interface Character {
  id?: number;
  firstname: string;
  lastname: string;
  maxHealth: number;
  maxMana: number;
  health: number;
  mana: number;
  attack: number;
  defense: number;
  speed: number;
  spells: Spell[];
  status: string[];
  isProtected: number;
  isStunned: number;
  nickname: string;
  isReady: boolean;
}
