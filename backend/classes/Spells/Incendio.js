import Spell from "../spell";

class Incendio extends Spell {
  constructor() {
    super(
      1,
      "Incendio",
      "Lance un incendie sur votre adversaire",
      "damage",
      10,
      20
    );
  }

  cast(character) {
    character.takeDamage(this.power);
  }
}

export default Incendio;
