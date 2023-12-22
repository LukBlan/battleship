class Game {
  constructor(players) {
    this.players = players;
    this.turnOrder = 0;
  }

  currentPlayer() {
    this.players[this.turnOrder];
  }

  emitBoards() {
    this.players.forEach((player) => player.emitBoard());
  }
}

export { Game };
