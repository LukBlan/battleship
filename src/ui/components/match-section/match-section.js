import './match-section.css';

function matchSection() {
  const container = document.createElement('div');
  const playerBoard = document.createElement('div');
  const computerBoard = document.createElement('div');

  container.classList.add('match-section');
  playerBoard.classList.add('player-board');
  computerBoard.classList.add('computer-board');

  container.append(playerBoard);
  container.append(computerBoard);
  return container;
}

export { matchSection };
