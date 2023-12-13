import './game-configuration-screen.css';
import { boardGrid } from '../board-grid/board-grid';

function gameConfigurationScreen(ships) {
  const screen = document.createElement('div');
  const board = boardGrid(10);
  const title = document.createElement('h2');

  ships.forEach((ship) => {
    screen.append(ship);
  });
  screen.classList.add('configuration-screen');
  title.innerText = 'Arrange your boats';

  screen.append(title);
  screen.append(board);

  return screen;
}

export { gameConfigurationScreen };
