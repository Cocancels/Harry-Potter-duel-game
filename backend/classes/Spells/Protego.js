const Spell = require("../Spell");

class Protego extends Spell {
  constructor() {
    super(3, "Protego", "Vous protège du prochain sort", "status", 20, 1);
  }

  cast(character) {
    character.setProtected(this.power);
  }
}

module.exports = Protego;
