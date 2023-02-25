const Spell = require("../Spell");

class Reparo extends Spell {
  constructor() {
    super(2, "Reparo", "Lance un sort de soin", "utility", 10, 10);
  }

  cast(character) {
    return this.sendMessage(character.heal(this.power));
  }
}

module.exports = Reparo;
