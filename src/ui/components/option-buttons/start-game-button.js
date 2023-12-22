import { emit } from '../../../services/pub-sub';

function emitStartGameEvent() {
  emit('start-game', null);
}

function startGameButton() {
  const button = document.createElement('button');
  button.innerText = 'Start';
  button.classList.add('option-button');
  button.addEventListener('click', emitStartGameEvent);
  return button;
}
export { startGameButton };
