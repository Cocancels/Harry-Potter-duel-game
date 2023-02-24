class Game {
  constructor(
    characters,
    currentTurn,
    currentPlayer,
    opponentPlayer,
    isStarted
  ) {
    this.characters = characters;
    this.currentTurn = currentTurn;
    this.currentPlayer = currentPlayer;
    this.opponentPlayer = opponentPlayer;
    this.isStarted = isStarted;
  }

  endTurn() {
    this.currentTurn = this.currentTurn + 1;
    this.currentPlayer = this.opponentPlayer;
    this.opponentPlayer = this.getOpponentPlayer();
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

  handleProtected() {
    if (this.currentPlayer.isProtected > 0) {
      this.currentPlayer.setProtected(this.currentPlayer.isProtected - 1);
      console.log(
        `${this.currentPlayer.firstName} ${this.currentPlayer.lastName} loses 1 turn of protection, ${this.currentPlayer.isProtected} left`
      );

      if (this.currentPlayer.isProtected === 0) {
        this.currentPlayer.status = this.currentPlayer.status.filter(
          (status) => status !== "protected"
        );
      }
    }
  }

  handleStun() {
    if (this.currentPlayer.isStunned > 0) {
      this.currentPlayer.setStunned(this.currentPlayer.isStunned - 1);
      console.log(
        `${this.currentPlayer.firstName} ${this.currentPlayer.lastName} loses 1 turn of stun, ${this.currentPlayer.isStunned} left`
      );

      if (this.currentPlayer.isStunned === 0) {
        this.currentPlayer.status = this.currentPlayer.status.filter(
          (status) => status !== "stunned"
        );
      }
    }
  }

  handleUserTurn(spell, target) {
    if (this.currentPlayer.isAlive()) {
      this.handleProtected();
      this.currentPlayer.castSpell(spell, target);

      this.handleStun();
      this.endTurn();
    }
  }

  getOpponentPlayer() {
    return this.characters.find(
      (character) => character.id !== this.currentPlayer.id
    );
  }

  getRandomCharacter() {
    return this.characters[Math.floor(Math.random() * this.characters.length)];
  }

  startGame() {
    this.currentPlayer = this.getRandomCharacter();
    this.opponentPlayer = this.getOpponentPlayer();
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
