import './new-game-button.css';

function newGameButton() {
  const button = document.createElement('button');
  button.innerText = 'New Game';
  button.classList.add('new-game-button');
  button.classList.add('option-button');
  return button;
}

export { newGameButton };
