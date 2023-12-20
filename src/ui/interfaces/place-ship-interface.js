import { emit, subscribe } from '../../services/pub-sub';

class PlaceShipInterface {
  constructor() {
    this.deltaPosition = null;
    this.boardElement = null;
  }

  setDeltaPosition(newDelta) {
    this.deltaPosition = newDelta;
  }

  setBoardElement(newElement) {
    newElement.addEventListener('click', this.rotateShip.bind(this));
    this.boardElement = newElement;
  }

  rotateShip(event) {
    if (event.target.classList.contains('ship-block')) {
      this.horizontalPosition = !this.horizontalPosition;
      const column = this.getIndexOfElementInParent(event.target);
      const row = this.getIndexOfElementInParent(event.target.parentElement);
      emit('rotate-ship', { column, row });
    }
  }

  init() {
    subscribe('delta-ship-position', this.setDeltaPosition.bind(this));
    subscribe('ship-location-coordinates', this.placeShip.bind(this));
  }

  getCellFromPositions(coordinate) {
    const { xPosition } = coordinate;
    const { yPosition } = coordinate;
    const allBoardChildren = Array.from(this.boardElement.childNodes)
      .map((children) => Array.from(children.childNodes)).flat();

    return allBoardChildren.reduce((nearCell, actualCell) => {
      const actualRectangle = actualCell.getBoundingClientRect();
      const yOffset = actualRectangle.y + (actualRectangle.height / 2);
      const xOffset = actualRectangle.x + (actualRectangle.width / 2);
      const xDistance = (xPosition - xOffset) ** 2;
      const yDistance = (yPosition - yOffset) ** 2;
      const distance = Math.sqrt(xDistance + yDistance);
      actualCell.distance = distance;

      if (distance < nearCell.distance) {
        return actualCell;
      }
      return nearCell;
    }, { distance: Number.POSITIVE_INFINITY });
  }

  getIndexOfElementInParent(cell) {
    const parent = cell.parentElement;
    return Array.from(parent.children).indexOf(cell);
  }

  placeShip(placeShipObject) {
    const cell = this.getCellFromPositions(placeShipObject);
    const { shipLength } = placeShipObject;
    const column = this.getIndexOfElementInParent(cell) - this.deltaPosition;
    const row = this.getIndexOfElementInParent(cell.parentElement);
    emit('place-ship', { row, column, shipLength });
  }
}

export { PlaceShipInterface };
