import { GameBoard } from './game-board';
import { emit, subscribe } from '../../services/pub-sub';
import { Coordinates } from '../coordinates';
import { Ship } from '../ship';

class GameBoardBuilder {
  constructor(boardFactory, size) {
    this.boardFctory = boardFactory;
    this.size = size;
    this.board = null;
  }

  init() {
    subscribe('place-ship', this.placeShip.bind(this));
  }

  placeShip(coordinateObject) {
    const { row, column } = coordinateObject;
    const coordinate = new Coordinates(column, row);
    this.board.placeShip(new Ship(3), coordinate, true);
    this.emitBoard();
  }

  reset() {
    this.board = new GameBoard(this.boardFctory, this.size);
    this.emitBoard();
  }

  emitBoard() {
    const grid = this.board.getBoard();
    emit('board-change', grid);
  }
}

export { GameBoardBuilder };
