import './new-game-button.css';
import { emit } from '../../../services/pub-sub';

function emitConfigurationEvent() {
  emit('configure-new-game', null);
}

function newGameButton() {
  const button = document.createElement('button');

  button.addEventListener('click', emitConfigurationEvent);
  button.innerText = 'New Game';
  button.classList.add('new-game-button');
  button.classList.add('option-button');
  return button;
}

export { newGameButton };
