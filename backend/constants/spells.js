const Attackus = require("../classes/Spells/Attackus");
const Avadakedavra = require("../classes/Spells/Avadakedavra");
const Incendio = require("../classes/Spells/Incendio");
const PetrificusTotalus = require("../classes/Spells/PetrificusTotalus");
const Protego = require("../classes/Spells/Protego");
const Reparo = require("../classes/Spells/Reparo");

const spells = [
  new Attackus(),
  new Incendio(),
  new Reparo(),
  new Protego(),
  new PetrificusTotalus(),
  new Avadakedavra(),
];

module.exports = spells;
