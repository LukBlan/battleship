import { emit } from '../../../services/pub-sub';

function emitResetShips() {
  emit('reset-ships', null);
}

function resetButton() {
  const button = document.createElement('button');

  button.innerText = 'Reset';
  button.classList.add('option-button');
  button.addEventListener('click', emitResetShips);
  return button;
}
export { resetButton };
