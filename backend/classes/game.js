class Game {
  constructor(characters) {
    this.characters = characters;
    this.currentTurn = 0;
    this.isStarted = false;
    this.isFinished = false;
    this.results = null;
    this.logs = [];
  }

  endTurn() {
    this.currentTurn = this.currentTurn + 1;

    this.characters.forEach((character) => {
      if (character.isAlive()) {
        this.handleStun(character);
        this.handleProtected(character);
      }
    });

    this.sendMessage(`End of turn ${this.currentTurn}`);
  }

  endGame() {
    this.isFinished = true;
    this.results = {
      winner: this.getWinner(),
      loser: this.getLoser(),
    };

    this.sendMessage(`
      Game finished
      Winner: ${this.results.winner.firstname} ${this.results.winner.lastname}
      Loser: ${this.results.loser.firstname} ${this.results.loser.lastname}
    `);
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
      this.sendMessage(
        `${character.firstname} ${character.lastname} loses 1 turn of protection, ${character.isProtected} left`
      );

      if (character.isProtected === 0) {
        character.status = character.status.filter(
          (status) => status !== "protected"
        );

        this.sendMessage(
          `${character.firstname} ${character.lastname} is no longer protected`
        );
      }
    }
  }

  handleStun(character) {
    if (character.isStunned > 0) {
      character.setStunned(character.isStunned - 1);
      this.sendMessage(
        `${character.firstname} ${character.lastname} loses 1 turn of stun, ${character.isStunned} left`
      );

      if (character.isStunned === 0) {
        character.status = character.status.filter(
          (status) => status !== "stunned"
        );

        this.sendMessage(
          `${character.firstname} ${character.lastname} is no longer stunned`
        );
      }
    }
  }

  handleUserTurn(character, action) {
    if (character.isAlive()) {
      if (character.isStunned > 0) {
        this.handleStun(character);
        return;
      }

      const messages = action();

      messages.forEach((message) => this.sendMessage(message));

      // check if game is over
      if (this.isGameOver()) {
        this.endGame();
      }
    }
  }

  getRandomCharacter() {
    return this.characters[Math.floor(Math.random() * this.characters.length)];
  }

  startGame() {
    this.currentTurn = 1;
    this.isStarted = true;
    this.sendMessage("Game started");
  }

  getWinner() {
    return this.characters.filter((character) => character.isAlive())[0];
  }

  getLoser() {
    return this.characters.filter((character) => !character.isAlive())[0];
  }

  sendMessage(message) {
    const newMessage = {
      id: this.logs.length,
      message: message,
      createdAt: new Date(),
    };
    this.logs.push(newMessage);
  }
}

module.exports = Game;
