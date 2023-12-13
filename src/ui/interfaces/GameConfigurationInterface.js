import { gameConfigurationScreen } from '../components/game-configuration-screen/game-configuration-screen';
import { subscribe } from '../../services/pub-sub';

class GameConfigurationInterface {
  constructor(gameSection) {
    this.gameSection = gameSection;
  }

  init() {
    subscribe('displayConfigurationScreen', this.renderGameConfiguration.bind(this));
  }

  renderGameConfiguration() {
    const gameConfiguration = gameConfigurationScreen();
    this.gameSection.append(gameConfiguration);
  }
}

export { GameConfigurationInterface };
