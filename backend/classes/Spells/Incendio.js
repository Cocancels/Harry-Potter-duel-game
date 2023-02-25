const Spell = require("../Spell");

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
    return this.sendMessage(character.takeDamage(this.power));
  }
}

module.exports = Incendio;
