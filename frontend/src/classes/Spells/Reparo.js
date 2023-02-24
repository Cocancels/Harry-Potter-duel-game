import Spell from "../spell";

class Reparo extends Spell {
  constructor() {
    super(2, "Reparo", "Lance un sort de soin", "utility", 10, 10);
  }

  cast(character) {
    character.heal(this.power);
  }
}

export default Reparo;
