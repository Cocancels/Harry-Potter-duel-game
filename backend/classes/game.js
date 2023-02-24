class Game {
  constructor(characters) {
    this.characters = characters;
    this.currentTurn = 0;
    this.isStarted = false;
  }

  endTurn() {
    this.currentTurn = this.currentTurn + 1;
  }

  endGame() {
    return {
      winner: this.getWinner(),
      loser: this.getLoser(),
    };
  }

  isGameOver() {
    let aliveCharacters = 0;
    for (let character of this.characters) {
      if (character.isAlive()) {
        aliveCharacters++;
      }
    }

    return aliveCharacters < 2;
  }

  handleProtected(character) {
    if (character.isProtected > 0) {
      character.setProtected(character.isProtected - 1);
      console.log(
        `${character.firstname} ${character.lastname} loses 1 turn of protection, ${character.isProtected} left`
      );

      if (character.isProtected === 0) {
        character.status = character.status.filter(
          (status) => status !== "protected"
        );
      }
    }
  }

  handleStun(character) {
    if (character.isStunned > 0) {
      character.setStunned(character.isStunned - 1);
      console.log(
        `${character.firstname} ${character.lastname} loses 1 turn of stun, ${character.isStunned} left`
      );

      if (character.isStunned === 0) {
        character.status = character.status.filter(
          (status) => status !== "stunned"
        );
      }
    }
  }

  handleUserTurn(character, action) {
    if (character.isAlive()) {
      this.handleProtected(character);
      action;
      this.handleStun(character);
    }
  }

  getRandomCharacter() {
    return this.characters[Math.floor(Math.random() * this.characters.length)];
  }

  startGame() {
    this.isStarted = true;
  }

  getWinner() {
    return this.characters.filter((character) => character.isAlive())[0];
  }

  getLoser() {
    return this.characters.filter((character) => !character.isAlive())[0];
  }

  sendMessage(message) {
    return message;
  }
}

module.exports = Game;
