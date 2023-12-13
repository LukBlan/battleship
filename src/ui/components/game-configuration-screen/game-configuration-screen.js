import './game-configuration-screen.css';

function gameConfigurationScreen() {
  const screen = document.createElement('div');
  screen.classList.add('configuration-screen');
  screen.innerText = 'Arrange your boats';
  return screen;
}

export { gameConfigurationScreen };
