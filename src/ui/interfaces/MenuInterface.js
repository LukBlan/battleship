import { newGameButton } from '../components/new-game-button/new-game-button';
import { emit } from '../../services/pub-sub';

class MenuInterface {
  constructor(gameSection) {
    this.gameSection = gameSection;
    this.menuButton = document.querySelector('.menu-button');
    this.newGameButton = newGameButton();
  }

  init() {
    this.menuButton.addEventListener('click', this.toggleMenuOnScreen.bind(this));
    this.toggleMenuOnScreen();
  }

  toggleMenuOnScreen() {
    if (this.gameSection.contains(this.newGameButton)) {
      this.gameSection.removeChild(this.newGameButton);
      this.newGameButton.removeEventListener('click', this.emitDisplayConfigurationScreen.bind(this));
    } else {
      this.gameSection.append(this.newGameButton);
      this.newGameButton.addEventListener('click', this.emitDisplayConfigurationScreen.bind(this));
    }
  }

  emitDisplayConfigurationScreen() {
    this.toggleMenuOnScreen();
    emit('displayConfigurationScreen', null);
  }
}

export { MenuInterface };
