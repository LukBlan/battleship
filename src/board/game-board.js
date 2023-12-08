class GameBoard {
  constructor(boardFactory) {
    this.board = boardFactory.createBoard();
  }

  getBoard() {
    return this.board;
  }

  placeShip(ship, coordinates) {

  }
}

export { GameBoard };
