import Spell from "../spell";

class PetrificusTotalus extends Spell {
  constructor() {
    super(4, "Petrificus Totalus", "Etourdit la cible", "status", 20, 1);
  }

  cast(character) {
    character.setStunned(this.power);
  }
}

export default PetrificusTotalus;
