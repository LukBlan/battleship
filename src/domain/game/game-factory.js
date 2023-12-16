import { Game } from './game';
import { HumanPlayer } from '../players/HumanPlayer';

class GameFactory {
  constructor(boardBuilder) {
    this.boardBuilder = boardBuilder;
  }

  reset() {
    this.boardBuilder.reset();
  }

  create() {
    const playerBoard = this.boardBuilder.build();
    const humanPlayer = new HumanPlayer(playerBoard);
    return new Game([humanPlayer]);
  }
}

export { GameFactory };
