import { subscribe } from '../../services/pub-sub';

class GameController {
  constructor(gameFactory) {
    this.game = null;
    this.gameFactory = gameFactory;
  }

  init() {
    subscribe('configure-new-game', this.newGameConfiguration.bind(this));
  }

  newGameConfiguration() {
    this.gameFactory.reset();
  }
}

export { GameController };
