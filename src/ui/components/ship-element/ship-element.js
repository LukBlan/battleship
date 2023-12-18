import './ship-element.css';
import { emit } from '../../../services/pub-sub';

function generateShipElement(size) {
  const container = document.createElement('div');
  container.classList.add('ship');
  container.draggable = true;

  for (let i = 0; i < size; i += 1) {
    const shipBlock = document.createElement('div');
    shipBlock.classList.add('ship-block');
    container.append(shipBlock);
  }

  return container;
}

function getBlockNearToMouse(allShipBlocks, xMousePosition) {
  return Array.from(allShipBlocks).reduce((nearBlock, currentBlock) => {
    const rectangle = currentBlock.getBoundingClientRect();
    const xCenter = rectangle.x + rectangle.width / 2;
    const currentOffset = Math.abs(xMousePosition - xCenter);
    currentBlock.offset = currentOffset;

    if (currentOffset < nearBlock.offset) {
      return currentBlock;
    }

    return nearBlock;
  }, { offset: Number.POSITIVE_INFINITY });
}

function getBlockSelected(event) {
  const xPosition = event.clientX;
  const allShipBlocks = event.target.childNodes;
  const nearBlock = getBlockNearToMouse(allShipBlocks, xPosition);
  const index = Array.from(allShipBlocks).indexOf(nearBlock);
  emit('delta-ship-position', index);
}

function locateShipOnGrid(event) {
  const xPosition = event.clientX;
  const yPosition = event.clientY;
  const coordinateObject = { xPosition, yPosition };
  emit('ship-location-coordinates', coordinateObject);
}

function shipElement(size) {
  const ship = generateShipElement(size);
  ship.addEventListener('dragstart', getBlockSelected);
  ship.addEventListener('dragend', locateShipOnGrid);
  return ship;
}

export { shipElement };
