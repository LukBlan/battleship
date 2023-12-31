import './game-configuration-screen.css';
import { randomButton } from '../option-buttons/random-button';
import { resetButton } from '../option-buttons/reset-button';
import { startGameButton } from '../option-buttons/start-game-button';

function createFooter() {
  const footer = document.createElement('div');
  const randomBtn = randomButton();
  const resetBtn = resetButton();
  const startBtn = startGameButton();

  footer.classList.add('footer');
  footer.append(randomBtn);
  footer.append(resetBtn);
  footer.append(startBtn);
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
  screen.classList.add('main-content-screen');
  title.innerText = 'Arrange your boats';
  title.classList.add('configuration-title');

  screen.append(title);
  screen.append(board);
  screen.append(shipSection);
  screen.append(footer);
  return screen;
}

export { gameConfigurationScreen };
