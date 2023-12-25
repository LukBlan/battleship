import './match-section.css';

function createPlayerSection(titleText, className) {
  const playerSection = document.createElement('div');
  const title = document.createElement('h3');
  const playerBoard = document.createElement('div');

  playerSection.classList.add('player-section');
  title.classList.add('player-title');
  title.innerText = titleText;
  playerBoard.classList.add(className);
  playerSection.append(title);
  playerSection.append(playerBoard);

  return playerSection;
}

function matchSection() {
  const container = document.createElement('div');
  const playerBoard = createPlayerSection('Player Board', 'player-board');
  const computerBoard = createPlayerSection('Computer Board', 'computer-board');

  container.classList.add('match-section');
  container.classList.add('main-content-screen');
  container.append(playerBoard);
  container.append(computerBoard);
  return container;
}

export { matchSection };
