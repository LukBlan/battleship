class GameBoard {
  constructor(boardFactory, size) {
    this.boardFactory = boardFactory;
    this.board = boardFactory.createBoard(size);
    this.allLocatedShips = new Map();
    this.shipCount = 0;
    this.size = size;
  }

  getBoard() {
    return this.board;
  }

  getLocationObject(row, column) {
    const boardMark = this.board[row][column];
    return this.allLocatedShips.get(boardMark);
  }

  getNewCoordinatesFromPlacedShip(row, column) {
    const positionObject = this.getLocationObject(row, column);
    const { ship, coordinates, horizontal } = positionObject;
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
    console.log(locationObject);
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
    return (indexPosition + shipDeltaIndex) < this.size;
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

      i += 1;
    }

    return notShipOnPlace;
  }

  emptyLocation(row, column) {
    return this.board[row][column] === this.boardFactory.whiteSpace();
  }
}

export { GameBoard };
