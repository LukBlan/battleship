import { newGameScreen } from '../components/new-game-screen';

class Menu {
  constructor() {
    this.gameSection = document.querySelector('.game-section');
    this.menuButton = document.querySelector('.menu-button');
    this.menuElement = newGameScreen();
  }

  init() {
    this.menuButton.addEventListener('click', this.toggleMenuOnScreen.bind(this));
    this.toggleMenuOnScreen();
  }

  toggleMenuOnScreen() {
    if (this.gameSection.contains(this.menuElement)) {
      this.gameSection.removeChild(this.menuElement);
    } else {
      this.gameSection.append(this.menuElement);
    }
  }
}

export { Menu };
