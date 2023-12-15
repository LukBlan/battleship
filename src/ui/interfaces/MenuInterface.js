import { newGameButton } from '../components/new-game-button/new-game-button';
import { emit } from '../../services/pub-sub';

class MenuInterface {
  constructor(gameSection) {
    this.gameSection = gameSection;
    this.menuButton = document.querySelector('.menu-button');
    this.newGameButton = newGameButton();
    this.onClick = this.emitDisplayConfigurationScreen.bind(this);
  }

  init() {
    this.menuButton.addEventListener('click', this.toggleMenuOnScreen.bind(this));
    this.toggleMenuOnScreen();
  }

  toggleMenuOnScreen() {
    if (this.gameSection.contains(this.newGameButton)) {
      this.newGameButton.removeEventListener('click', this.onClick);
      this.gameSection.removeChild(this.newGameButton);
    } else {
      this.gameSection.append(this.newGameButton);
      this.newGameButton.addEventListener('click', this.onClick);
    }
  }

  emitDisplayConfigurationScreen() {
    this.toggleMenuOnScreen();
    emit('displayConfigurationScreen', null);
  }
}

export { MenuInterface };
