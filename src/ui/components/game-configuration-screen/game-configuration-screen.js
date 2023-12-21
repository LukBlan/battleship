import './game-configuration-screen.css';

function generateShipSection(ships) {
  const container = document.createElement('div');

  ships.forEach((ship) => {
    container.append(ship);
  });

  return container;
}

function gameConfigurationScreen() {
  const screen = document.createElement('div');
  const board = document.createElement('div');
  const title = document.createElement('h2');
  const shipSection = document.createElement('div');

  board.classList.add('board');
  shipSection.classList.add('ships-section');
  screen.classList.add('configuration-screen');
  title.innerText = 'Arrange your boats';
  title.classList.add('configuration-title');

  screen.append(title);
  screen.append(board);
  screen.append(shipSection);
  return screen;
}

export { gameConfigurationScreen };
