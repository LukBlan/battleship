import './game-configuration-screen.css';
import { boardGrid } from '../board-grid/board-grid';

function gameConfigurationScreen() {
  const screen = document.createElement('div');
  const board = boardGrid(10);
  const title = document.createElement('h2');

  screen.classList.add('configuration-screen');
  title.innerText = 'Arrange your boats';

  screen.append(title);
  screen.append(board);

  return screen;
}

export { gameConfigurationScreen };
