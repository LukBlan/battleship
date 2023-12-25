import './game-over-screen.css';

function gameOverScreen(message) {
  const container = document.createElement('div');
  const title = document.createElement('h3');
  const body = document.createElement('p');

  container.classList.add('game-over-screen');
  title.innerText = 'Game Over';
  body.innerText = message;
  container.append(title);
  container.append(body);

  return container;
}

export { gameOverScreen };
