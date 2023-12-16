import { GameBoard } from './game-board';

class GameBoardBuilder {
  constructor(boardFactory, size) {
    this.boardFctory = boardFactory;
    this.size = size;
    this.board = new GameBoard(boardFactory, size);
  }

  reset() {
    this.board = new GameBoard(this.boardFctory, this.size);
  }
}

export { GameBoardBuilder };
