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

  placeShip(placeShipObject) {
    const { row, column, shipLength } = placeShipObject;
    const coordinate = new Coordinates(column, row);
    const ship = new Ship(shipLength);

    if (this.board.canPlaceShip(coordinate, ship, true)) {
      this.board.placeShip(new Ship(shipLength), coordinate, true);
      this.emitBoard();
    }
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
