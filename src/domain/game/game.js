class Game {
  constructor(players) {
    this.players = players;
    this.turnOrder = 0;
  }

  currentPlayer() {
    this.players[this.turnOrder];
  }
}

export { Game };
