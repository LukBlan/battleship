import './board-grid.css';
import { emit, subscribe } from '../../../services/pub-sub';

let whiteSpaceMark = null;
let hitMark = null;
let missMark = null;
let deltaShipPosition = null;
let boardElement = null;

function setDeltaPosition(deltaPosition) {
  deltaShipPosition = deltaPosition;
}

function getCellFromPositions(coordinate) {
  const { xPosition } = coordinate;
  const { yPosition } = coordinate;
  const allBoardChildren = Array.from(boardElement.childNodes)
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

function getIndexOfElementInParent(cell) {
  const parent = cell.parentElement;
  return Array.from(parent.children).indexOf(cell);
}

function placeShip(placeShipObject) {
  const cell = getCellFromPositions(placeShipObject);
  const { shipLength } = placeShipObject;
  const column = getIndexOfElementInParent(cell) - deltaShipPosition;
  const row = getIndexOfElementInParent(cell.parentElement);
  emit('place-ship', { row, column, shipLength });
}

subscribe('delta-ship-position', setDeltaPosition);
subscribe('ship-location-coordinates', placeShip);

function generateCell(cellState) {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  if (cellState !== whiteSpaceMark && cellState !== hitMark && cellState !== missMark) {
    const shipBlock = document.createElement('div');
    shipBlock.classList.add('ship-block');
    cell.append(shipBlock);
  }
  return cell;
}

function generateBoard(board) {
  const container = document.createElement('div');
  const gridSize = board.length;

  for (let i = 0; i < gridSize; i += 1) {
    const row = document.createElement('div');

    for (let j = 0; j < gridSize; j += 1) {
      const cellState = board[i][j];
      const cell = generateCell(cellState);
      row.append(cell);
    }
    container.append(row);
  }

  return container;
}

function setBoardFactoryValues(boardFactory) {
  whiteSpaceMark = boardFactory.whiteSpace();
  hitMark = boardFactory.hitBoardMark();
  missMark = boardFactory.missBoardMark();
}

function boardGrid(board, boardFactory) {
  setBoardFactoryValues(boardFactory);
  const container = generateBoard(board);
  container.classList.add('board');
  boardElement = container;
  return container;
}

export { boardGrid };
