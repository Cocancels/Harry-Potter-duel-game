class Character {
  constructor(
    id,
    firstname,
    lastname,
    maxHealth = 100,
    maxMana = 100,
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
    this.defense = 0;
    this.speed = 0;
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

      return this.sendMessage(
        `${this.firstname} ${this.lastname} is protected and takes no damage`
      );
    }
    this.health -= damage;

    return this.sendMessage(
      `${this.firstname} ${this.lastname} takes ${damage} damage`
    );
  }

  heal(heal) {
    if (this.health + heal > this.maxHealth) {
      heal = this.maxHealth - this.health;
    }

    this.health += heal;

    return this.sendMessage(
      `${this.firstname} ${this.lastname} heals ${heal} health`
    );
  }

  setProtected(turn) {
    if (!this.status.includes("protected")) {
      this.status.push("protected");
    }
    this.isProtected = turn;

    return this.sendMessage(
      `${this.firstname} ${this.lastname} is protected for ${turn} turns`
    );
  }

  setStunned(turn) {
    if (!this.status.includes("stunned")) {
      this.status.push("stunned");
    }
    this.isStunned = turn;

    return this.sendMessage(
      `${this.firstname} ${this.lastname} is stunned for ${turn} turns`
    );
  }

  getSpellFromId(id) {
    return this.spells.find((spell) => spell.id === id);
  }

  castSpell(spell, character) {
    let messages = [];

    if (this.isStunned > 0) {
      return;
    }

    if (spell.getManaCost() > this.mana) {
      messages.push(
        this.sendMessage(
          `${this.firstname} ${this.lastname} does not have enough mana to cast ${spell.name}`
        )
      );

      return messages;
    }

    this.mana -= spell.getManaCost();

    const castMessage =
      this.id === character.id
        ? `${this.firstname} ${this.lastname} casts ${spell.name} on himself`
        : `${this.firstname} ${this.lastname} casts ${spell.name} on ${character.firstname} ${character.lastname}`;

    messages.push(castMessage);
    messages.push(spell.cast(character));

    return messages;
  }

  sendMessage(message) {
    return message;
  }
}

module.exports = Character;
