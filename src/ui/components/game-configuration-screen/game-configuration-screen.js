import './game-configuration-screen.css';
import { randomButton } from '../random-button/random-button';

function createFooter() {
  const footer = document.createElement('div');
  const button = randomButton();

  footer.classList.add('footer');
  footer.append(button);
  return footer;
}

function gameConfigurationScreen() {
  const screen = document.createElement('div');
  const board = document.createElement('div');
  const title = document.createElement('h2');
  const shipSection = document.createElement('div');
  const footer = createFooter();

  board.classList.add('board');
  shipSection.classList.add('ships-section');
  screen.classList.add('configuration-screen');
  title.innerText = 'Arrange your boats';
  title.classList.add('configuration-title');

  screen.append(title);
  screen.append(board);
  screen.append(shipSection);
  screen.append(footer);
  return screen;
}

export { gameConfigurationScreen };
