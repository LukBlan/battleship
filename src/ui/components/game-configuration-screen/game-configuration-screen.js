import './game-configuration-screen.css';

function gameConfigurationScreen() {
  const screen = document.createElement('div');
  const board = document.createElement('div');
  const title = document.createElement('h2');
  const shipSection = document.createElement('div');
  const footer = document.createElement('div');

  board.classList.add('board');
  shipSection.classList.add('ships-section');
  screen.classList.add('configuration-screen');
  title.innerText = 'Arrange your boats';
  title.classList.add('configuration-title');
  footer.classList.add('footer');

  screen.append(title);
  screen.append(board);
  screen.append(shipSection);
  screen.append(footer);
  return screen;
}

export { gameConfigurationScreen };
