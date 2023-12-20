import { GameBoard } from './game-board';
import { emit, subscribe } from '../../services/pub-sub';
import { Coordinates } from '../coordinates';
import { Ship } from '../ship';
import { Location } from '../location';

class GameBoardBuilder {
  constructor(boardFactory, size) {
    this.boardFctory = boardFactory;
    this.size = size;
    this.board = null;
  }

  init() {
    subscribe('place-ship', this.placeShip.bind(this));
    subscribe('rotate-ship', this.rotateShip.bind(this));
  }

  rotateShip(boardCoordinate) {
    const { row, column } = boardCoordinate;

    if (this.board.canRotateShipOnLocation(row, column)) {
      this.board.rotateShip(row, column);
      this.emitBoard();
    }
  }

  placeShip(placeShipObject) {
    const { row, column, shipLength } = placeShipObject;
    const coordinates = new Coordinates(column, row);
    const ship = new Ship(shipLength);
    const locationObject = new Location(coordinates, ship, true);

    if (this.board.canPlaceShip(locationObject)) {
      this.board.placeShip(locationObject);
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
