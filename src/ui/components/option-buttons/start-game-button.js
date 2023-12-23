import { emit } from '../../../services/pub-sub';
import './option-buttons.css';

function startGameButton() {
  const button = document.createElement('button');
  button.innerText = 'Start';
  button.classList.add('option-button');
  button.classList.add('deactivate');
  button.classList.add('start-game-button');
  return button;
}
export { startGameButton };
