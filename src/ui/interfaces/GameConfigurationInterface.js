import { gameConfigurationScreen } from '../components/game-configuration-screen/game-configuration-screen';
import { subscribe } from '../../services/pub-sub';

class GameConfigurationInterface {
  constructor(gameSection, ships) {
    this.gameSection = gameSection;
    this.ships = ships;
  }

  init() {
    subscribe('displayConfigurationScreen', this.renderGameConfiguration.bind(this));
  }

  renderGameConfiguration() {
    const gameConfiguration = gameConfigurationScreen(this.ships);
    this.gameSection.append(gameConfiguration);
  }
}

export { GameConfigurationInterface };
