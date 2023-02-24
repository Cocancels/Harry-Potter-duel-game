import Spell from "../spell";

class Avadakedavra extends Spell {
  constructor() {
    super(
      5,
      "Avadakedavra",
      "Lance une attaque mortelle sur votre adversaire",
      "damage",
      0,
      100
    );
  }

  cast(character) {
    character.takeDamage(this.power);
  }
}

export default Avadakedavra;
