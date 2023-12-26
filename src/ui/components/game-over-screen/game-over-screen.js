import './game-over-screen.css';
import { newGameButton } from '../new-game-button/new-game-button';

function gameOverScreen(message) {
  const container = document.createElement('div');
  const title = document.createElement('h3');
  const body = document.createElement('p');
  const button = newGameButton();

  container.classList.add('game-over-screen');
  title.innerText = 'Game Over';
  body.innerText = message;
  button.classList.add('option-button');
  button.classList.remove('new-game-button');

  container.append(title);
  container.append(body);
  container.append(button);

  return container;
}

export { gameOverScreen };
