import './board-grid.css';

function generateCell(cellState, boardFactory) {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  if (cellState !== boardFactory.whiteSpace()
    && cellState !== boardFactory.hitBoardMark()
    && cellState !== boardFactory.missBoardMark()) {
    const shipBlock = document.createElement('div');
    shipBlock.classList.add('ship-block');
    cell.append(shipBlock);
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
