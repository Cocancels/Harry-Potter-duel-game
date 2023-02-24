class Spell {
  constructor(id, name, description, type, cost, power) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.cost = cost;
    this.power = power;
  }

  getManaCost() {
    return this.cost;
  }
}

module.exports = Spell;
