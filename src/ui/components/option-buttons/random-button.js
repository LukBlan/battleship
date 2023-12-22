import { emit } from '../../../services/pub-sub';

function emitPlaceShipInRandomLocationEvent() {
  emit('place-ships-in-random-location', null);
}

function randomButton() {
  const button = document.createElement('button');

  button.innerText = 'Random';
  button.classList.add('option-button');
  button.addEventListener('click', emitPlaceShipInRandomLocationEvent);
  return button;
}
export { randomButton };
