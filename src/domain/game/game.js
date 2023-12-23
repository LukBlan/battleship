class Game {
  constructor(players) {
    this.players = players;
    this.turnOrder = 0;
  }

  getCurrentPlayer() {
    return this.players[this.turnOrder];
  }

  getOpponentPlayer() {
    const playerIndex = (this.turnOrder + 1) % this.players.length;
    return this.players[playerIndex];
  }

  emitBoards() {
    this.players.forEach((player) => player.emitBoard());
  }
}

export { Game };
