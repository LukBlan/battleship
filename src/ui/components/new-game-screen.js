import './new-game-screen.css';

function createNewGameOption() {
  const div = document.createElement('div');
  div.innerText = 'New Game';
  return div;
}

function newGameScreen() {
  const container = document.createElement('div');
  const newGameOption = createNewGameOption();
  container.classList.add('new-game-screen');
  container.append(newGameOption);
  return container;
}

export { newGameScreen };
