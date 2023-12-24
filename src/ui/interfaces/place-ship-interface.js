import { emit, subscribe } from '../../services/pub-sub';
import { getBoardCoordinatesFromClick, getIndexOfElementInParent } from '../../services/board-cordinates-from-click';

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
      const column = getIndexOfElementInParent(event.target);
      const row = getIndexOfElementInParent(event.target.parentElement);
      emit('rotate-ship', { column, row });
    }
  }

  init() {
    subscribe('delta-ship-position', this.setDeltaPosition.bind(this));
    subscribe('ship-location-coordinates', this.placeShip.bind(this));
  }

  placeShip(placeShipObject) {
    const coordinates = getBoardCoordinatesFromClick(placeShipObject.coordinates, this.boardElement);
    const { row } = coordinates;
    const column = coordinates.column - this.deltaPosition;
    const { shipLength } = placeShipObject;
    emit('place-ship', { row, column, shipLength });
  }
}

export { PlaceShipInterface };
