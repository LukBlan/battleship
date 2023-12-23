function getCellFromPositions(coordinate, boardElement) {
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

function getBoardCoordinatesFromClick(coordinates, boardElement) {
  const cell = getCellFromPositions(coordinates, boardElement);
  const column = getIndexOfElementInParent(cell);
  const row = getIndexOfElementInParent(cell.parentElement);
  return { row, column };
}

export { getBoardCoordinatesFromClick, getIndexOfElementInParent };
