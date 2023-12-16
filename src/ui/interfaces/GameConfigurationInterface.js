import { gameConfigurationScreen } from '../components/game-configuration-screen/game-configuration-screen';
import { subscribe } from '../../services/pub-sub';

class GameConfigurationInterface {
  constructor(gameSection, ships, boardSize) {
    this.gameSection = gameSection;
    this.ships = ships;
    this.boardSize = boardSize;
  }

  init() {
    subscribe('configure-new-game', this.renderGameConfiguration.bind(this));
  }

  renderGameConfiguration() {
    const gameConfiguration = gameConfigurationScreen(this.ships, this.boardSize);
    this.gameSection.append(gameConfiguration);
  }
}

export { GameConfigurationInterface };
