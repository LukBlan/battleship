class GameBoard {
  constructor(boardFactory, size) {
    this.whiteSpace = boardFactory.whiteSpace();
    this.hitMark = boardFactory.hitBoardMark();
    this.board = boardFactory.createBoard(size);
    this.ships = new Map();
    this.shipCount = 0;
    this.size = size;
  }

  attackPlace(coordinates) {
    const xPosition = coordinates.getX();
    const yPosition = coordinates.getY();
    const value = this.board[xPosition][yPosition];

    if (this.ships.has(value)) {
      const ship = this.ships.get(value);
      ship.hit();
    }
  }

  canPlaceShip(coordinates, ship, horizontal) {
    const shipLength = ship.getLength();
    return this.#notOutOfBoard(coordinates, shipLength, horizontal)
      && this.#notShipAlreadyOnPlace(coordinates, shipLength, horizontal);
  }

  placeShip(ship, coordinates, horizontal) {
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

    this.ships.set(shipMark, ship);
  }

  #notOutOfBoard(coordinates, objectLength, horizontal) {
    const position = (horizontal) ? coordinates.getX() : coordinates.getY();
    return (objectLength + position) < this.size;
  }

  #notShipAlreadyOnPlace(coordinates, shipLength, horizontal) {
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
    return this.board[row][column] === this.whiteSpace;
  }
}

export { GameBoard };
