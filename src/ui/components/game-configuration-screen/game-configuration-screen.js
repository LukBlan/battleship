import './game-configuration-screen.css';
import { boardGrid } from '../board-grid/board-grid';

function generateShipSection(ships) {
  const container = document.createElement('div');

  ships.forEach((ship) => {
    container.append(ship);
  });

  return container;
}

function gameConfigurationScreen(ships, size) {
  const screen = document.createElement('div');
  const board = boardGrid(size);
  const title = document.createElement('h2');
  const shipSection = generateShipSection(ships);

  screen.classList.add('configuration-screen');
  title.innerText = 'Arrange your boats';
  title.classList.add('configuration-title');

  screen.append(title);
  screen.append(board);
  screen.append(shipSection);
  return screen;
}

export { gameConfigurationScreen };
