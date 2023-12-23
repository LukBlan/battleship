import { Location } from '../location';
import { Coordinates } from '../coordinates';

class GameBoard {
  constructor(boardFactory, size) {
    this.boardFactory = boardFactory;
    this.board = boardFactory.createBoard(size);
    this.allLocatedShips = new Map();
    this.shipCount = 0;
    this.size = size;
  }

  setBoard(newBoard) {
    this.board = newBoard;
  }

  getHiddenBoard() {
    const notShipMarks = this.boardFactory.notShipMarks();

    return this.board.map(
      (boardRow) => boardRow.map((element) => {
        if (!notShipMarks.includes(element)) {
          return this.boardFactory.whiteSpace();
        }
        return element;
      }),
    );
  }

  getBoard() {
    return this.board;
  }

  removeShipFromLocation(locationObject, row, column) {
    const boardMark = this.board[row][column];
    const { coordinates, ship, horizontal } = locationObject;
    let xPosition = coordinates.getX();
    let yPosition = coordinates.getY();
    const shipLength = ship.getLength();

    for (let i = 0; i < shipLength; i += 1) {
      this.board[yPosition][xPosition] = this.boardFactory.whiteSpace();

      if (horizontal) {
        xPosition += 1;
      } else {
        yPosition += 1;
      }
    }

    this.allLocatedShips.delete(boardMark);
  }

  getLocationObject(row, column) {
    const boardMark = this.board[row][column];
    return this.allLocatedShips.get(boardMark);
  }

  getRotateLocation(locationObject, row, column) {
    const { coordinates, ship, horizontal } = locationObject;
    const locationRow = coordinates.getY();
    const locationColumn = coordinates.getX();
    const newRow = (horizontal) ? (row - (column - locationColumn)) : row;
    const newColumn = (horizontal) ? column : (column - (row - locationRow));
    return new Location(new Coordinates(newColumn, newRow), ship, !horizontal);
  }

  rotateShip(row, column) {
    const locationObject = this.getLocationObject(row, column);
    const rotateLocation = this.getRotateLocation(locationObject, row, column);
    this.removeShipFromLocation(locationObject, row, column);
    this.placeShip(rotateLocation);
  }

  canRotateShipOnLocation(row, column) {
    const locationObject = this.getLocationObject(row, column);
    const futureBoard = new GameBoard(this.boardFactory, this.size);
    const newLocation = this.getRotateLocation(locationObject, row, column);
    const boardCopy = this.boardFactory.generateCopy(this.board);
    futureBoard.setBoard(boardCopy);
    futureBoard.removeShipFromLocation(locationObject, row, column);
    return futureBoard.canPlaceShip(newLocation);
  }

  attackPlace(coordinates) {
    const xPosition = coordinates.getX();
    const yPosition = coordinates.getY();
    const boardMark = this.board[xPosition][yPosition];

    if (this.allLocatedShips.has(boardMark)) {
      const location = this.allLocatedShips.get(boardMark);
      const { ship } = location;
      ship.hit();
      this.board[xPosition][yPosition] = this.boardFactory.hitBoardMark();
    } else {
      this.board[xPosition][yPosition] = this.boardFactory.missBoardMark();
    }
  }

  allShipAreSunk() {
    const allLocationsObjects = this.allLocatedShips.values();
    return Array.from(allLocationsObjects).every((locationObject) => {
      const { ship } = locationObject;
      return ship.isSunk();
    });
  }

  canPlaceShip(locationObject) {
    return this.#notOutOfBoard(locationObject) && this.#notShipAlreadyOnPlace(locationObject);
  }

  placeShip(locationObject) {
    const { coordinates, ship, horizontal } = locationObject;
    let xPosition = coordinates.getX();
    let yPosition = coordinates.getY();
    const shipLength = ship.getLength();
    const shipMark = this.shipCount.toString();

    for (let i = 0; i < shipLength; i += 1) {
      this.board[yPosition][xPosition] = shipMark;

      if (horizontal) {
        xPosition += 1;
      } else {
        yPosition += 1;
      }
    }

    this.allLocatedShips.set(shipMark, locationObject);
    this.shipCount += 1;
  }

  #notOutOfBoard(locationObject) {
    const { coordinates, ship, horizontal } = locationObject;
    const indexPosition = (horizontal) ? coordinates.getX() : coordinates.getY();
    const shipDeltaIndex = ship.length - 1;
    return indexPosition >= 0 && (indexPosition + shipDeltaIndex) < this.size;
  }

  #notShipAlreadyOnPlace(locationObject) {
    const { coordinates, ship, horizontal } = locationObject;
    const shipLength = ship.getLength();
    let xPosition = coordinates.getX();
    let yPosition = coordinates.getY();
    let notShipOnPlace = true;

    for (let i = 0; i < shipLength; i += 1) {
      notShipOnPlace = notShipOnPlace && this.emptyLocation(yPosition, xPosition);

      if (horizontal) {
        xPosition += 1;
      } else {
        yPosition += 1;
      }
    }

    return notShipOnPlace;
  }

  emptyLocation(row, column) {
    return this.board[row][column] === this.boardFactory.whiteSpace();
  }
}

export { GameBoard };
