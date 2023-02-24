import Spell from "../spell";

class Attackus extends Spell {
  constructor() {
    super(
      0,
      "Attackus",
      "Lance une attaque simple sur votre adversaire",
      "damage",
      0,
      10
    );
  }

  cast(character) {
    character.takeDamage(this.power);
  }
}

export default Attackus;
