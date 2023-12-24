import { subscribe } from '../../services/pub-sub';

class GameController {
  constructor(gameFactory) {
    this.game = null;
    this.gameFactory = gameFactory;
  }

  init() {
    subscribe('configure-new-game', this.newGameConfiguration.bind(this));
    subscribe('start-game', this.newGame.bind(this));
    subscribe('next-turn', this.nextTurn.bind(this));
    this.gameFactory.init();
  }

  newGame() {
    this.game = this.gameFactory.create();
    this.game.emitBoards();
    this.nextTurn();
  }

  nextTurn() {
    const currentPlayer = this.game.getCurrentPlayer();
    const opponentPlayer = this.game.getOpponentPlayer();
    this.game.increaseTurnOrder();
    currentPlayer.makeMoveTo(opponentPlayer);
  }

  newGameConfiguration() {
    this.gameFactory.reset();
  }
}

export { GameController };
