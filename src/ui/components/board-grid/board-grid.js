import './board-grid.css';

function toggleHoverEffect(event) {
  event.target.classList.toggle('hover-effect');
}

function addDragOverEffects(cell) {
  cell.addEventListener('dragenter', toggleHoverEffect);
  cell.addEventListener('dragleave', toggleHoverEffect);
}

function generateCell(cellState, boardFactory) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  addDragOverEffects(cell);

  if (!boardFactory.notShipMarks().includes(cellState)) {
    cell.classList.add('ship-block');
  } else if (boardFactory.isMissMark(cellState)) {
    cell.classList.add('miss-mark');
    cell.innerText = 'X';
  } else if (boardFactory.isHitMark(cellState)) {
    cell.classList.add('ship-block');
    cell.classList.add('hit-mark');
  }
  return cell;
}

function generateBoard(board, boardFactory) {
  const container = document.createElement('div');
  container.addEventListener('dragover', (event) => { event.preventDefault(); });

  const gridSize = board.length;

  for (let i = 0; i < gridSize; i += 1) {
    const row = document.createElement('div');

    for (let j = 0; j < gridSize; j += 1) {
      const cellState = board[i][j];
      const cell = generateCell(cellState, boardFactory);
      row.append(cell);
    }

    container.append(row);
  }

  return container;
}

function boardGrid(board, boardFactory) {
  const container = generateBoard(board, boardFactory);
  container.classList.add('board');
  return container;
}

export { boardGrid };
