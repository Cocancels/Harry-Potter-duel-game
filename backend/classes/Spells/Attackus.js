const Spell = require("../Spell");

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
    if (character.isProtected > 0) {
      character.isProtected--;
      if (character.isProtected === 0) {
        character.status = character.status.filter(
          (status) => status !== "protected"
        );
      }
      return this.sendMessage(
        `${character.firstname} ${character.lastname} is protected and takes no damage`
      );
    }

    return this.sendMessage(character.takeDamage(this.power));
  }
}

module.exports = Attackus;
