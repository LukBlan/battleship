import './board-grid.css';
import { emit } from '../../../services/pub-sub';

let whiteSpaceMark = null;
let hitMark = null;
let missMark = null;

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

function placeShip(event) {
  const row = 1;
  const column = 0;

  if (event.target.classList.contains('cell')) {
    emit('place-ship', { row, column });
  }
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
  container.addEventListener('click', placeShip);
  return container;
}

export { boardGrid };
