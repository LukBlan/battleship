import { emit } from '../../../services/pub-sub';
import './random-button.css';

function emitPlaceShipInRandomLocationEvent() {
  emit('place-ships-in-random-location', null);
}

function randomButton() {
  const button = document.createElement('button');

  button.innerText = 'Random';
  button.classList.add('random-button');
  button.addEventListener('click', emitPlaceShipInRandomLocationEvent);
  return button;
}
export { randomButton };
