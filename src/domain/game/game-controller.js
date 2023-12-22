import { subscribe } from '../../services/pub-sub';

class GameController {
  constructor(gameFactory) {
    this.game = null;
    this.gameFactory = gameFactory;
  }

  init() {
    subscribe('configure-new-game', this.newGameConfiguration.bind(this));
    subscribe('start-game', this.newGame.bind(this));
    this.gameFactory.init();
  }

  newGame() {
    this.game = this.gameFactory.create();
    this.game.emitBoards();
  }

  newGameConfiguration() {
    this.gameFactory.reset();
  }
}

export { GameController };
