class Character {
  constructor(
    id,
    firstname,
    lastname,
    maxHealth = 100,
    maxMana = 0,
    attack = 10,
    spells,
    nickname
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.maxHealth = maxHealth;
    this.maxMana = maxMana;
    this.health = maxHealth;
    this.mana = maxMana;
    this.attack = attack;
    this.spells = spells;
    this.status = [];
    this.isProtected = 0;
    this.isStunned = 0;
    this.nickname = nickname;
    this.isReady = false;
  }

  isAlive() {
    return this.health > 0;
  }

  addSpell(spell) {
    this.spells.push(spell);
  }

  removeSpell(spell) {
    this.spells = this.spells.filter((s) => s !== spell);
  }

  takeDamage(damage) {
    if (this.isProtected > 0) {
      this.isProtected--;
      if (this.isProtected === 0) {
        this.status = this.status.filter((status) => status !== "protected");
      }
      console.log(
        `${this.firstname} ${this.lastname} is protected, no damage taken !`
      );
      return;
    }
    this.health -= damage;
  }

  heal(heal) {
    this.health += heal;
  }

  setProtected(turn) {
    if (!this.status.includes("protected")) {
      this.status.push("protected");
    }
    this.isProtected = turn;
  }

  setStunned(turn) {
    if (!this.status.includes("stunned")) {
      this.status.push("stunned");
    }
    this.isStunned = turn;
  }

  getSpellFromId(id) {
    return this.spells.find((spell) => spell.id === id);
  }

  castSpell(spell, character) {
    if (this.isStunned > 0) {
      console.log(
        `${this.firstname} ${this.lastname} is stunned, no spell cast !`
      );
      return;
    }

    if (spell.getManaCost() > this.mana) {
      console.log("Not enough mana");
      return;
    }

    this.mana -= spell.getManaCost();
    spell.cast(character);
    console.log(
      `${this.firstname} ${this.lastname} casts ${spell.name} on ${character.firstname} ${character.lastname}`
    );
    console.log(
      `${character.firstname} ${character.lastname} has ${character.health} health left`
    );
  }

  autoAttack(character) {
    character.takeDamage(this.attack);
    console.log(
      `${this.firstname} ${this.lastname} attacks ${character.firstname} ${character.lastname}`
    );
    console.log(
      `${character.firstname} ${character.lastname} has ${character.health} health left`
    );
  }
}

module.exports = Character;
