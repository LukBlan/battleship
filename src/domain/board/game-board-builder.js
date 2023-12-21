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
    this.availableShips = null;
  }

  init() {
    subscribe('place-ship', this.placeShip.bind(this));
    subscribe('rotate-ship', this.rotateShip.bind(this));
  }

  setInitialShips(availableShips) {
    this.availableShips = availableShips;
  }

  build() {
    return this.board;
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
      this.removeAvailableShip(ship);
      this.emitBoard();
    }
  }

  removeAvailableShip(removeShip) {
    const index = this.availableShips.findIndex(
      (ship) => ship.getLength() === removeShip.getLength(),
    );
    this.availableShips.splice(index, 1);
  }

  reset(availableShips) {
    this.board = new GameBoard(this.boardFctory, this.size);
    this.availableShips = availableShips;
    this.emitBoard();
  }

  emitBoard() {
    const board = this.board.getBoard();
    emit('board-change', { board, ships: this.availableShips });
  }
}

export { GameBoardBuilder };
