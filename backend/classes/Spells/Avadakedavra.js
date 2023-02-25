const Spell = require("../Spell");

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
    return this.sendMessage(character.takeDamage(this.power));
  }
}

module.exports = Avadakedavra;
