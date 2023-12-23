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
    this.emitEventBasedOnShipsAvailable();
  }

  emitEventBasedOnShipsAvailable() {
    let eventName = 'ships-available';

    if (this.availableShips.length === 0) {
      eventName = 'all-ships-on-board';
    }

    emit(eventName, null);
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
      this.emitShip();
    }
  }

  removeAvailableShip(removeShip) {
    const index = this.availableShips.findIndex(
      (ship) => ship.getLength() === removeShip.getLength(),
    );
    const remainingElements = this.availableShips.filter((value, shipIndex) => index !== shipIndex);
    this.setInitialShips(remainingElements);
  }

  reset(availableShips) {
    this.board = new GameBoard(this.boardFctory, this.size);
    this.setInitialShips(availableShips);
    this.emitBoard();
    this.emitShip();
  }

  placeInRandomPosition() {
    this.availableShips.forEach((ship) => {
      this.placeShipInRandomPosition(ship);
    });
    this.setInitialShips([]);
    this.emitBoard();
    this.emitShip();
  }

  placeShipInRandomPosition(ship) {
    const randomRow = Math.floor(Math.random() * this.size);
    const randomColumn = Math.floor(Math.random() * this.size);
    const horizontal = Math.random() < 0.5;
    const randomLocation = new Location(new Coordinates(randomRow, randomColumn), ship, horizontal);

    if (this.board.canPlaceShip(randomLocation)) {
      this.board.placeShip(randomLocation);
    } else {
      this.placeShipInRandomPosition(ship);
    }
  }

  emitBoard() {
    const board = this.board.getBoard();
    emit('board-change', board);
  }

  emitShip() {
    emit('ship-change', this.availableShips);
  }
}

export { GameBoardBuilder };
